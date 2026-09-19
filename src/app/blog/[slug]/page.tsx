import { Metadata } from 'next';
import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/devops/Navbar';
import { Footer } from '@/components/devops/Footer';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const db = getDb();
  const post = db.prepare('SELECT title, excerpt, created_at FROM blog_posts WHERE slug = ? AND published = 1').get(params.slug) as {
    title: string;
    excerpt: string;
    created_at: string;
  } | undefined;

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.created_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const db = getDb();
  
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ? AND published = 1').get(params.slug) as any;

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar />
      
      <main className="flex-grow max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-[#0B63E5] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
        
        <article className="space-y-8">
          <header className="space-y-4 pb-8 border-b border-slate-100">
            <div className="text-sm font-bold text-[#0B63E5] uppercase tracking-wider">
              {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="prose prose-slate prose-lg max-w-none text-slate-700 leading-relaxed space-y-4">
            {post.content.split('\n').map((paragraph: string, idx: number) => (
              paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
