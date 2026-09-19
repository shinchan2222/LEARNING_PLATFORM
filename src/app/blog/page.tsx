import { getDb } from '@/lib/db';
import Link from 'next/link';
import { Navbar } from '@/components/devops/Navbar';
import { Footer } from '@/components/devops/Footer';

export const metadata = {
  title: 'Blog - DEVops Solutions',
  description: 'Latest insights, tutorials, and news from DEVops Solutions.',
};

export default function BlogIndexPage() {
  const db = getDb();
  
  // Fetch published blog posts
  const posts = db.prepare('SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC').all() as any[];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="space-y-4 mb-16 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Our Blog
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Thoughts, tutorials, and insights on software development, cloud infrastructure, and building scalable products.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-slate-500 text-center py-20 bg-white rounded-2xl border border-slate-200">
            No blog posts published yet. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col"
              >
                <div className="p-7 flex flex-col flex-grow">
                  <div className="text-xs font-bold text-[#0B63E5] mb-3 uppercase tracking-wider">
                    {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#0B63E5] transition-colors mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="text-xs font-bold text-slate-400 group-hover:text-[#0B63E5] transition-colors flex items-center gap-1">
                    Read Article →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
