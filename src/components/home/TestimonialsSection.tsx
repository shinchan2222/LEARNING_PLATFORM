import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Maya Chen',
    role: 'M.S. in AI @ MIT',
    destination: 'Joined OpenAI as Member of Technical Staff',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    content:
      'Dr. Thorne’s deep learning cohort was unlike any online course. We implemented attention mechanisms from raw mathematical papers and optimized CUDA inference latency. The letter of recommendation opened doors for my dream job.',
    rating: 5,
    domain: 'AI/ML'
  },
  {
    name: 'Marcus Vance',
    role: 'CS Graduate @ Georgia Tech',
    destination: 'Cloud Infrastructure Engineer @ AWS',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content:
      'The Kubernetes and GitOps track gave me practical cluster debugging experience that directly translated to my AWS technical interviews. The feedback on every GitHub PR was detailed and brutally honest.',
    rating: 5,
    domain: 'Cloud & DevOps'
  },
  {
    name: 'Samantha Roy',
    role: 'Software Engineer @ Bloomberg',
    destination: 'Ex-Intern, Full-Stack Distributed Systems',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    content:
      'I went from building simple CRUD toys to designing distributed queues, idempotent transactions, and high-frequency WebSockets. The verifiable certificate is proudly pinned on my LinkedIn.',
    rating: 5,
    domain: 'Full Stack Development'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Verified Intern Feedback
          </h2>
          <h3 className="text-3xl font-extrabold text-slate-900">
            Trusted by Students Across 60+ Universities
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Real outcomes from students who turned their research milestones into top-tier careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">
                    {t.domain}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                  “{t.content}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-300"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {t.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    {t.destination}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
