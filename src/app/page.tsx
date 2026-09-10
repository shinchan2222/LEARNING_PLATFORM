'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Cpu, 
  Coins, 
  Layers, 
  Globe2, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Award, 
  BookOpen, 
  Sparkles, 
  ChevronLeft,
  ChevronRight, 
  Mail, 
  Calendar,
  Building,
  TrendingUp,
  Download,
  GraduationCap
} from 'lucide-react';
import { CareerTiQNavbar } from '@/components/careertiq/Navbar';
import { CareerTiQFooter } from '@/components/careertiq/Footer';
import { 
  CAREERTIQ_PROGRAMS, 
  CAREERTIQ_PARTNERS, 
  CAREERTIQ_BLOGS, 
  CAREERTIQ_EVENTS 
} from '@/data/careertiqData';

export default function CareerTiQHomePage() {
  const [activeAboutTab, setActiveAboutTab] = useState<'mission' | 'vision' | 'values'>('mission');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const partners = [
    { name: 'fortinet', src: 'https://careertiq.com/wp-content/uploads/2024/04/fortinet-logowine-e1749792108640.png' },
    { name: 'IBM', src: 'https://careertiq.com/wp-content/uploads/2024/04/IBM_logo_in-1-e1749792096626.jpeg' },
    { name: 'Partner 3', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-11.34.49%E2%80%AFAM-e1749881173310.png' },
    { name: 'Partner 4', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.16.50%E2%80%AFAM.png' },
    { name: 'Partner 5', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-10.44.55%E2%80%AFAM.png' },
    { name: 'mkce', src: 'https://careertiq.com/wp-content/uploads/2024/04/mkce20logo-1.jpeg' },
    { name: 'Partner 7', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-10.45.09%E2%80%AFAM.png' },
    { name: 'Partner 8', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-10.44.44%E2%80%AFAM.png' },
    { name: 'Partner 9', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.25.38%E2%80%AFAM.png' },
    { name: 'Partner 10', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.18.04%E2%80%AFAM.png' },
    { name: 'Partner 11', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.20.14%E2%80%AFAM.png' },
    { name: 'Partner 12', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.21.06%E2%80%AFAM.png' },
    { name: 'Partner 13', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.18.56%E2%80%AFAM.png' },
    { name: 'prathyusa', src: 'https://careertiq.com/wp-content/uploads/2024/01/prathyusa-collge.jpg' },
    { name: 'grade-kce', src: 'https://careertiq.com/wp-content/uploads/2024/04/logo-grade-kce-2.png' },
    { name: 'Partner 17', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-11.32.18%E2%80%AFAM.png' },
    { name: 'Partner 18', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.22.40%E2%80%AFAM.png' },
    { name: 'Partner 19', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.22.34%E2%80%AFAM.png' },
    { name: 'Partner 20', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-13-at-11.22.48%E2%80%AFAM.png' },
    { name: 'evonsys', src: 'https://careertiq.com/wp-content/uploads/2024/01/evonsys.jpg' },
    { name: 'emurgo', src: 'https://careertiq.com/wp-content/uploads/2024/01/emurgo.jpg' },
    { name: 'Partner 23', src: 'https://careertiq.com/wp-content/uploads/2025/06/Screenshot-2025-06-14-at-11.34.10%E2%80%AFAM.png' }
  ];

  const testimonials = [
    {
      quote: "There is absolutely no doubt in my mind that without CareerTiQ, I would not have been able to chase my dream career which I was aspiring for.",
      name: "Simran Randhawa",
      designation: "Graphic Designer"
    },
    {
      quote: "CareerTiQ completely transformed my life! If you want to learn from the best, you have landed on the right place.",
      name: "Sean Austin",
      designation: "Tech Analyst"
    },
    {
      quote: "I feel enriched and confident enough to launch my own startup.\nThank you for showing me that we can be anyone we want to be all we have to do is take the first step",
      name: "Deon Dhillon",
      designation: "Entrepreneur"
    },
    {
      quote: "The faculty was outstanding and imparted an incredible leaning experience with comprehensive content and syllabus.",
      name: "Kopal Sharma",
      designation: "Data Scientist"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#222222] font-sans selection:bg-[#007BC6] selection:text-white">
      <CareerTiQNavbar />

      <main className="flex-1">
        {/* HERO SECTION - Exact Live CareerTiQ Style */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F7FD] via-[#F8FBFE] to-white pt-20 pb-20 md:pt-32 md:pb-28 text-center">
          <div className="max-w-5xl mx-auto px-4 relative z-10 space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#222222] leading-[1.25] tracking-tight">
              Embrace Innovation! <br />
              Experience Transformation!
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#555555] max-w-3xl mx-auto leading-relaxed font-normal">
              Commit to excellence with CareerTiQ, your next-gen EdTech platform that empowers you to thrive in the rapidly evolving global career landscape
            </p>

            <div className="pt-4">
              <Link
                href="/programs/deep-tech"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF7707] hover:bg-[#e06804] text-white font-bold text-sm sm:text-base shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>Get In Touch</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 22 12" fill="none">
                  <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="#FFFFFF"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 2: OUR PROGRAMS - Exact 4 Cards */}
        <section id="programs" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
                Our Programs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Card 1: DeepTech */}
              <div className="bg-white rounded-2xl p-7 text-center border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5">
                <div>
                  <div className="flex justify-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://careertiq.com/wp-content/uploads/2023/11/Frame-9.png" 
                      alt="DeepTech" 
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] mb-3 group-hover:text-[#007BC6] transition-colors">
                    DeepTech
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed text-justify mb-6">
                    Prepare for the most in-demand skill of the future by gaining in-depth knowledge about Artificial Intelligence, Machine learning, Data Analytics, Cyber Security and more.
                  </p>
                </div>
                <Link 
                  href="/programs/deep-tech" 
                  className="inline-flex items-center justify-center gap-2 text-[#007BC6] font-bold text-sm hover:text-[#FF7707] transition-colors pt-2"
                >
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 22 12" fill="none">
                    <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>

              {/* Card 2: FinTech */}
              <div className="bg-white rounded-2xl p-7 text-center border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5">
                <div>
                  <div className="flex justify-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://careertiq.com/wp-content/uploads/2023/11/Frame-11.png" 
                      alt="FinTech" 
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] mb-3 group-hover:text-[#007BC6] transition-colors">
                    FinTech
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed text-justify mb-6">
                    Discover and conquer the world of finance powered by technology and explore key areas like Digital disruption, P2P lending, Wealth Tech, Algo trading, Blockchain, Digital tokens and more.
                  </p>
                </div>
                <Link 
                  href="/programs/fin-tech" 
                  className="inline-flex items-center justify-center gap-2 text-[#007BC6] font-bold text-sm hover:text-[#FF7707] transition-colors pt-2"
                >
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 22 12" fill="none">
                    <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>

              {/* Card 3: MediaTech */}
              <div className="bg-white rounded-2xl p-7 text-center border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5">
                <div>
                  <div className="flex justify-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://careertiq.com/wp-content/uploads/2023/11/Frame-10.png" 
                      alt="MediaTech" 
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] mb-3 group-hover:text-[#007BC6] transition-colors">
                    MediaTech
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed text-justify mb-6">
                    Unlock possibilities of dream world by leaning Animation, VFX, Graphic Designing and UI/UX. From Digital Marketing converting your ideas into visuals with the help of technology to video production...
                  </p>
                </div>
                <Link 
                  href="/programs/media-tech" 
                  className="inline-flex items-center justify-center gap-2 text-[#007BC6] font-bold text-sm hover:text-[#FF7707] transition-colors pt-2"
                >
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 22 12" fill="none">
                    <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>

              {/* Card 4: International Languages */}
              <div className="bg-white rounded-2xl p-7 text-center border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1.5">
                <div>
                  <div className="flex justify-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://careertiq.com/wp-content/uploads/2023/11/Frame-12.png" 
                      alt="International Languages" 
                      className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#222222] mb-3 group-hover:text-[#007BC6] transition-colors">
                    International Languages
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed text-justify mb-6">
                    Connect with the world and access limitless opportunities with immersive programs in Japanese, French, German, Spanish, Mandarin, Korean and many more.
                  </p>
                </div>
                <Link 
                  href="/programs/international-languages" 
                  className="inline-flex items-center justify-center gap-2 text-[#007BC6] font-bold text-sm hover:text-[#FF7707] transition-colors pt-2"
                >
                  <span>Read More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 22 12" fill="none">
                    <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: OUR PARTNERS (Image Carousel) */}
        <section className="py-16 bg-[#FAFAFA] border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
                Our Partners
              </h2>
            </div>

            {/* Continuous Carousel */}
            <div className="relative overflow-hidden py-4">
              <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
                {[...partners, ...partners].map((p, idx) => (
                  <div key={idx} className="shrink-0 flex items-center justify-center p-3 bg-white rounded-xl shadow-xs border border-slate-100 hover:scale-105 transition-transform">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={p.src} 
                      alt={p.name} 
                      className="h-12 sm:h-14 max-w-[140px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: LEARNING REDEFINED, SUCCESS REDESIGNED! */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Mesa de Trabajo Illustration */}
              <div className="flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://careertiq.com/wp-content/uploads/2024/01/Mesa-de-trabajo-1-1.png"
                  alt="Learning Redefined Illustration"
                  className="max-w-full h-auto rounded-2xl"
                />
              </div>

              {/* Right Column: Mission / Vision / Values Tabs */}
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#222222] leading-tight">
                  Learning Redefined, <br />
                  <span className="text-[#007BC6]">Success Redesigned!</span>
                </h2>

                {/* Tab Controls */}
                <div className="flex items-center border-b border-slate-200 gap-8 pt-2">
                  <button
                    onClick={() => setActiveAboutTab('mission')}
                    className={`flex items-center gap-2 pb-3 font-bold text-base transition-colors border-b-2 ${
                      activeAboutTab === 'mission'
                        ? 'border-[#FF7707] text-[#FF7707]'
                        : 'border-transparent text-[#555555] hover:text-[#222222]'
                    }`}
                  >
                    <span>🎯 Mission</span>
                  </button>

                  <button
                    onClick={() => setActiveAboutTab('vision')}
                    className={`flex items-center gap-2 pb-3 font-bold text-base transition-colors border-b-2 ${
                      activeAboutTab === 'vision'
                        ? 'border-[#FF7707] text-[#FF7707]'
                        : 'border-transparent text-[#555555] hover:text-[#222222]'
                    }`}
                  >
                    <span>👁 Vision</span>
                  </button>

                  <button
                    onClick={() => setActiveAboutTab('values')}
                    className={`flex items-center gap-2 pb-3 font-bold text-base transition-colors border-b-2 ${
                      activeAboutTab === 'values'
                        ? 'border-[#FF7707] text-[#FF7707]'
                        : 'border-transparent text-[#555555] hover:text-[#222222]'
                    }`}
                  >
                    <span>💎 Values</span>
                  </button>
                </div>

                {/* Tab Content Paragraphs */}
                <div className="text-sm sm:text-base text-[#555555] leading-relaxed space-y-4 pt-2">
                  {activeAboutTab === 'mission' && (
                    <div className="space-y-4 animate-fadeIn">
                      <p>
                        We believe that talent is everywhere and so is technology and with our accessible and affordable programs everyone can be ready to harness every opportunity and unlock their unique potential.
                      </p>
                      <p>
                        CareerTiQ aims to give you all the essential tools you need. Whether you want to expand your knowledge by upskilling or learn something new to do a different job by reskilling, we are here to ensure you achieve your educational goals.
                      </p>
                    </div>
                  )}

                  {activeAboutTab === 'vision' && (
                    <div className="space-y-4 animate-fadeIn">
                      <p>
                        With our global community of learners and educators we strive to consistently offer new resources and ideas to support growth and be the leading EdTech platform providing enhanced learning experience and outcomes.
                      </p>
                      <p>
                        We envision transforming the way of learning by empowering ambitious individuals regardless of their location or background, with effective, equitable and engaging education which is comprehensive, user-friendly and cost effective.
                      </p>
                    </div>
                  )}

                  {activeAboutTab === 'values' && (
                    <div className="space-y-4 animate-fadeIn">
                      <p>
                        We usher innovation by expediting the process of learning with a Continuous Learning Culture and adapting to new approaches by listening to your needs with our innovative curriculum.
                      </p>
                      <p>
                        Our core values are to honour every student’s diversity, identity, experiences, purpose and learning style with our services including practical applications, expert instructors and unique learning models.
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: 1200+ SUCCESSFUL CAREERS AND COUNTING! (Curved Wave Section) */}
        <section className="relative bg-[#007BC6] text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Top Wave SVG */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-10 sm:h-14 fill-white">
              <path d="M790.5,93.1c-59.3-5.3-116.8-18-192.6-50c-29.6-12.7-76.9-31-100.5-35.9c-23.6-4.9-52.6-7.8-75.5-5.3 c-10.2,1.1-22.6,1.4-50.1,7.4c-27.2,6.3-58.2,16.6-79.4,24.7c-41.3,15.9-94.9,21.9-134,22.6C72,58.2,0,25.8,0,25.8V100h1000V65.3 c0,0-51.5,19.4-106.2,25.7C839.5,97,814.1,95.2,790.5,93.1z"/>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto pt-10 pb-6 relative z-10">
            
            <div className="text-center mb-16 space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                1200+ successful 
              </h2>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FFB067]">
                careers and counting!
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column: Description + Button + Group-22 Stars Badge */}
              <div className="space-y-6">
                <p className="text-base sm:text-lg text-blue-50 leading-relaxed max-w-lg">
                  We are dedicated to provide a highly transformative and personalized learning experience. Get to know what hundreds of professionals have to say who are now ahead of the curve and industry ready as alumni of CareerTiQ
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#FF7707] hover:bg-[#e06804] text-white font-bold text-sm shadow-md transition-all"
                  >
                    <span>Get In Touch</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 22 12" fill="none">
                      <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="#FFFFFF"/>
                    </svg>
                  </Link>

                  {/* Group-22.png Trust Rating Badge */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="https://careertiq.com/wp-content/uploads/2023/11/Group-22.png" 
                    alt="5 Star Rating" 
                    className="h-10 w-auto object-contain"
                  />
                </div>
              </div>

              {/* Right Column: Testimonial Card Slider */}
              <div className="relative bg-white text-[#222222] p-8 sm:p-10 rounded-2xl shadow-2xl">
                <div className="min-h-[160px] flex flex-col justify-between">
                  <p className="text-base sm:text-lg italic text-[#444444] leading-relaxed mb-6 whitespace-pre-line">
                    &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <strong className="block text-base font-bold text-[#1E1E1E]">
                        {testimonials[testimonialIndex].name}
                      </strong>
                      <span className="text-xs text-[#777777] font-medium">
                        {testimonials[testimonialIndex].designation}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#007BC6] hover:text-white flex items-center justify-center transition-colors text-slate-700"
                        aria-label="Previous Testimonial"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                        className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#007BC6] hover:text-white flex items-center justify-center transition-colors text-slate-700"
                        aria-label="Next Testimonial"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Wave SVG */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-10 sm:h-14 fill-white">
              <path d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7 c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4 c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"/>
            </svg>
          </div>
        </section>

        {/* SECTION 6: RECENT BLOGS - Exact Live CareerTiQ Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222]">
                Recent Blogs
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Blog 1: FinTech */}
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative overflow-hidden h-48 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://careertiq.com/wp-content/uploads/2024/01/fintech-300x169.jpg" 
                      alt="The Future of Finance" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#FF7707] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                      FinTech
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#007BC6] transition-colors line-clamp-2">
                      The Future of Finance: Exploring the Basics of FinTech and Career Opportunities!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] line-clamp-3 leading-relaxed">
                      The world of finance is changing rapidly, thanks to the introduction of new technologies and innovative solutions. Financial Technology, or...
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#888888]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>January 8, 2024</span>
                  </div>
                  <Link
                    href="/programs/fin-tech"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007BC6] group-hover:text-[#FF7707] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Blog 2: International Languages */}
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative overflow-hidden h-48 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://careertiq.com/wp-content/uploads/2024/01/international-language-300x169.jpg" 
                      alt="Unlocking the World" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#FF7707] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                      International languages
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#007BC6] transition-colors line-clamp-2">
                      Unlocking the World: The Power and Benefits of Learning a New Language
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] line-clamp-3 leading-relaxed">
                      In today’s increasingly globalized world, being bilingual or multilingual is more than just an impressive skill. It opens doors to...
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#888888]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>January 5, 2024</span>
                  </div>
                  <Link
                    href="/programs/international-languages"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007BC6] group-hover:text-[#FF7707] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Blog 3: DeepTech */}
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="relative overflow-hidden h-48 bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src="https://careertiq.com/wp-content/uploads/2024/01/ai-300x169.jpg" 
                      alt="Machine Learning Demystified" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-[#FF7707] text-white text-[11px] font-bold px-2.5 py-0.5 rounded">
                      DeepTech
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#007BC6] transition-colors line-clamp-2">
                      Machine Learning Demystified: A Brief Introduction and How It Works!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#666666] line-clamp-3 leading-relaxed">
                      Machine learning has become a buzzword in the tech industry, but what does it really mean and how does it...
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#888888]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>January 5, 2024</span>
                  </div>
                  <Link
                    href="/programs/deep-tech"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007BC6] group-hover:text-[#FF7707] transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <CareerTiQFooter />
    </div>
  );
}
