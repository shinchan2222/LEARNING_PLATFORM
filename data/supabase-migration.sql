-- ==========================================================
-- Supabase / PostgreSQL Migration Script for DEVops Platform
-- Generated: 2026-09-19T15:29:39.143Z
-- Paste this entire script into your Supabase SQL Editor
-- ==========================================================

-- Enable UUID and JSON extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


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


-- ==========================================================
-- DATA INSERTS
-- ==========================================================

-- Table: admin_users (1 rows)
INSERT INTO admin_users (email, password_hash, created_at) VALUES ('admin@devops.com', '$2b$12$vvB7kc45IqSiBPfRctKSJuzQ1oOtYOh2WArfVi48fAsg1S8kBkufK', '2026-09-17 16:26:43');

-- Table: services (6 rows)
INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index, created_at) VALUES ('Code2', 'Custom Software Development', 'Tailored solutions built for your exact business needs.', 'From ERP and CRM systems to full-scale SaaS platforms — we architect, develop, and maintain software that scales.', '["ERP & CRM Systems","SaaS Platform Development","Business Process Automation","Legacy System Modernization","Third-Party Integrations"]', '#0B63E5', '#EFF6FF', 0, NULL);
INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index, created_at) VALUES ('Globe', 'Website Development', 'Stunning websites that convert visitors into customers.', 'We design and build pixel-perfect, fast-loading websites — from corporate portals to e-commerce storefronts.', '["Corporate & Portfolio Websites","E-Commerce & Online Stores","High-Converting Landing Pages","CMS Integrations","Performance & SEO Optimization"]', '#7C3AED', '#F5F3FF', 1, NULL);
INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index, created_at) VALUES ('Smartphone', 'Mobile App Development', 'iOS, Android & cross-platform apps users love.', 'We build intuitive, high-performance mobile applications using React Native and Flutter.', '["iOS & Android Native Apps","React Native & Flutter","App Store Optimization","Push Notifications","Payment Gateway Integration"]', '#059669', '#ECFDF5', 2, NULL);
INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index, created_at) VALUES ('Palette', 'UI/UX Design', 'Interfaces designed for delight and conversion.', 'Our design team creates wireframes, interactive prototypes, and complete design systems.', '["User Research & Personas","Wireframing & Prototyping","Design System Creation","Figma Deliverables","Accessibility Compliance"]', '#DC2626', '#FEF2F2', 3, NULL);
INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index, created_at) VALUES ('Cloud', 'Cloud & DevOps', 'Scalable cloud infrastructure and CI/CD automation.', 'We set up, manage, and optimize cloud infrastructure on AWS, Azure, and GCP.', '["AWS, Azure & GCP Setup","Docker & Kubernetes","CI/CD Pipeline Automation","Infrastructure as Code","24/7 Monitoring"]', '#F59E0B', '#FFFBEB', 4, NULL);
INSERT INTO services (icon, title, short_desc, description, features, color, light_color, order_index, created_at) VALUES ('Server', 'API & Backend Development', 'Robust, secure APIs powering your digital products.', 'From RESTful APIs to GraphQL and microservices — we build the backend infrastructure that connects everything.', '["REST API & GraphQL","Microservices Architecture","Database Design","Authentication & Security","Third-Party Integrations"]', '#0891B2', '#ECFEFF', 5, NULL);

-- Table: portfolio (3 rows)
INSERT INTO portfolio (title, category, description, tech, color, created_at) VALUES ('RetailFlow ERP', 'Enterprise Software', 'A fully custom ERP platform for a retail chain managing 50+ stores — real-time inventory, payroll, supplier management, and analytics.', '["React","Node.js","PostgreSQL","AWS"]', '#0B63E5', NULL);
INSERT INTO portfolio (title, category, description, tech, color, created_at) VALUES ('MedConnect App', 'Mobile Application', 'A telemedicine React Native app connecting 80,000+ patients with certified doctors for video consultations and prescriptions.', '["React Native","Firebase","Node.js","Stripe"]', '#059669', NULL);
INSERT INTO portfolio (title, category, description, tech, color, created_at) VALUES ('LaunchPad SaaS', 'Web Platform', 'A multi-tenant B2B SaaS platform for startup accelerators to manage cohorts, mentor sessions, and investor communications.', '["Next.js","Python","MongoDB","GCP"]', '#7C3AED', NULL);

-- Table: testimonials (3 rows)
INSERT INTO testimonials (quote, name, role, initials, rating, color, created_at) VALUES ('DEVops delivered our e-commerce platform 2 weeks ahead of schedule. The code quality is exceptional.', 'Sarah Mitchell', 'CEO, StyleVault Inc.', 'SM', 5, '#0B63E5', NULL);
INSERT INTO testimonials (quote, name, role, initials, rating, color, created_at) VALUES ('We hired DEVops to rebuild our CRM and performance improved by 300%. Our sales team''s productivity went through the roof.', 'James Okafor', 'CTO, Apex Financial', 'JO', 5, '#7C3AED', NULL);
INSERT INTO testimonials (quote, name, role, initials, rating, color, created_at) VALUES ('Our mobile app went from concept to App Store in 10 weeks. Users gave us 4.9 stars on launch day.', 'Priya Sharma', 'Founder, HealthBridge', 'PS', 5, '#059669', NULL);

-- Table: contacts (2 rows)
INSERT INTO contacts (name, email, service, message, status, created_at) VALUES ('Test User', 'test@test.com', '', 'Hello from test', 'new', '2026-09-19 01:20:57');
INSERT INTO contacts (name, email, service, message, status, created_at) VALUES ('Audit Bot', 'audit@test.com', 'Custom Software Development', 'Automated end-to-end verification message.', 'new', '2026-09-19 02:21:44');

-- Table: team_members (3 rows)
INSERT INTO team_members (name, role, bio, initials, color, created_at) VALUES ('Alex Johnson', 'CEO & Founder', 'Visionary technologist with 15+ years building enterprise software solutions across 3 continents.', 'AJ', '#0B63E5', NULL);
INSERT INTO team_members (name, role, bio, initials, color, created_at) VALUES ('Maria Chen', 'CTO', 'Full-stack architect specializing in scalable cloud-native systems and microservices.', 'MC', '#7C3AED', NULL);
INSERT INTO team_members (name, role, bio, initials, color, created_at) VALUES ('David Park', 'Lead Designer', 'Award-winning UI/UX designer with a passion for accessible, user-centered design systems.', 'DP', '#059669', NULL);

-- Table: stats (4 rows)
INSERT INTO stats (value, label, order_index) VALUES ('200+', 'Projects Delivered', 0);
INSERT INTO stats (value, label, order_index) VALUES ('150+', 'Happy Clients', 1);
INSERT INTO stats (value, label, order_index) VALUES ('6+', 'Years Experience', 2);
INSERT INTO stats (value, label, order_index) VALUES ('24/7', 'Support Available', 3);

-- Table: blog_posts (2 rows)
INSERT INTO blog_posts (title, slug, excerpt, content, author, published, created_at, updated_at) VALUES ('10 Signs You Need Custom Software Instead of Off-the-Shelf', '10-signs-you-need-custom-software', 'Not every business problem has a packaged solution. Here are 10 clear signs your team needs custom-built software.', 'Full article content goes here...', NULL, TRUE, '2026-09-17 16:26:43', NULL);
INSERT INTO blog_posts (title, slug, excerpt, content, author, published, created_at, updated_at) VALUES ('How We Cut Deployment Time by 80% with CI/CD Pipelines', 'cut-deployment-time-cicd', 'A step-by-step breakdown of how we automated deployments for a 50-developer team and went from weekly releases to multiple daily releases.', 'Full article content goes here...', NULL, TRUE, '2026-09-17 16:26:43', NULL);

-- Reset sequence generators to avoid primary key conflicts
SELECT setval('admin_users_id_seq', COALESCE((SELECT MAX(id) FROM admin_users), 1));
SELECT setval('services_id_seq', COALESCE((SELECT MAX(id) FROM services), 1));
SELECT setval('portfolio_id_seq', COALESCE((SELECT MAX(id) FROM portfolio), 1));
SELECT setval('testimonials_id_seq', COALESCE((SELECT MAX(id) FROM testimonials), 1));
SELECT setval('contacts_id_seq', COALESCE((SELECT MAX(id) FROM contacts), 1));
SELECT setval('team_members_id_seq', COALESCE((SELECT MAX(id) FROM team_members), 1));
SELECT setval('stats_id_seq', COALESCE((SELECT MAX(id) FROM stats), 1));
SELECT setval('blog_posts_id_seq', COALESCE((SELECT MAX(id) FROM blog_posts), 1));