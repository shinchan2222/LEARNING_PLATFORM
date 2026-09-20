import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'devops.db');
const OUTPUT_PATH = path.join(process.cwd(), 'data', 'supabase-migration.sql');

function escapeSql(str: string | null | undefined): string {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.toString().replace(/'/g, "''")}'`;
}

function run() {
  console.log('🚀 Starting SQLite to Supabase / PostgreSQL SQL export...');

  if (!fs.existsSync(DB_PATH)) {
    console.error(`❌ SQLite database not found at ${DB_PATH}`);
    process.exit(1);
  }

  const db = new DatabaseSync(DB_PATH);

  const lines: string[] = [];

  lines.push('-- ==========================================================');
  lines.push('-- Supabase / PostgreSQL Migration Script for DEVops Platform');
  lines.push(`-- Generated: ${new Date().toISOString()}`);
  lines.push('-- Paste this entire script into your Supabase SQL Editor');
  lines.push('-- ==========================================================\n');

  lines.push('-- Enable UUID and JSON extensions if needed');
  lines.push('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n');

  // Schema Definitions
  lines.push(`
-- 1. admin_users
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. services
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  short_desc TEXT NOT NULL,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]'::jsonb,
  color TEXT NOT NULL,
  light_color TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. portfolio
CREATE TABLE IF NOT EXISTS portfolio (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  tech JSONB NOT NULL DEFAULT '[]'::jsonb,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  initials TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. contacts
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. team_members
CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  initials TEXT NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. stats
CREATE TABLE IF NOT EXISTS stats (
  id SERIAL PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0
);

-- 8. blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'DEVops Team',
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`);

  lines.push('\n-- ==========================================================');
  lines.push('-- DATA INSERTS');
  lines.push('-- ==========================================================\n');

  // Export tables
  const exportTable = (tableName: string, columns: string[], transform?: (row: any) => any) => {
    try {
      const rows = db.prepare(`SELECT * FROM ${tableName}`).all();
      if (rows.length === 0) return;

      lines.push(`-- Table: ${tableName} (${rows.length} rows)`);
      for (const row of rows as any[]) {
        const item = transform ? transform(row) : row;
        const vals = columns.map((col) => {
          const val = item[col];
          if (val === null || val === undefined) return 'NULL';
          if (typeof val === 'number') return val.toString();
          if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
          return escapeSql(val);
        });
        lines.push(`INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${vals.join(', ')});`);
      }
      lines.push('');
    } catch (err: any) {
      console.warn(`Could not export table ${tableName}:`, err.message);
    }
  };

  exportTable('admin_users', ['email', 'password_hash', 'created_at']);
  exportTable('services', ['icon', 'title', 'short_desc', 'description', 'features', 'color', 'light_color', 'order_index', 'created_at']);
  exportTable('portfolio', ['title', 'category', 'description', 'tech', 'color', 'created_at']);
  exportTable('testimonials', ['quote', 'name', 'role', 'initials', 'rating', 'color', 'created_at']);
  exportTable('contacts', ['name', 'email', 'service', 'message', 'status', 'created_at']);
  exportTable('team_members', ['name', 'role', 'bio', 'initials', 'color', 'created_at']);
  exportTable('stats', ['value', 'label', 'order_index']);
  exportTable('blog_posts', ['title', 'slug', 'excerpt', 'content', 'author', 'published', 'created_at', 'updated_at'], (row) => ({
    ...row,
    published: Boolean(row.published),
  }));

  lines.push('-- Reset sequence generators to avoid primary key conflicts');
  lines.push(`SELECT setval('admin_users_id_seq', COALESCE((SELECT MAX(id) FROM admin_users), 1));`);
  lines.push(`SELECT setval('services_id_seq', COALESCE((SELECT MAX(id) FROM services), 1));`);
  lines.push(`SELECT setval('portfolio_id_seq', COALESCE((SELECT MAX(id) FROM portfolio), 1));`);
  lines.push(`SELECT setval('testimonials_id_seq', COALESCE((SELECT MAX(id) FROM testimonials), 1));`);
  lines.push(`SELECT setval('contacts_id_seq', COALESCE((SELECT MAX(id) FROM contacts), 1));`);
  lines.push(`SELECT setval('team_members_id_seq', COALESCE((SELECT MAX(id) FROM team_members), 1));`);
  lines.push(`SELECT setval('stats_id_seq', COALESCE((SELECT MAX(id) FROM stats), 1));`);
  lines.push(`SELECT setval('blog_posts_id_seq', COALESCE((SELECT MAX(id) FROM blog_posts), 1));`);

  fs.writeFileSync(OUTPUT_PATH, lines.join('\n'), 'utf8');

  console.log(`✅ Successfully generated Supabase migration script at: ${OUTPUT_PATH}`);
  console.log(`📄 Total lines: ${lines.length}`);
}

run();
