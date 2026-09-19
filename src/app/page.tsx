import { Navbar } from '@/components/devops/Navbar';
import { HeroSection } from '@/components/devops/HeroSection';
import { ServicesSection } from '@/components/devops/ServicesSection';
import { WhyUsSection } from '@/components/devops/WhyUsSection';
import { TechStack } from '@/components/devops/TechStack';
import { ProcessSection } from '@/components/devops/ProcessSection';
import { PortfolioSection } from '@/components/devops/PortfolioSection';
import { TestimonialsSection } from '@/components/devops/TestimonialsSection';
import { StatsSection } from '@/components/devops/StatsSection';
import { CtaBanner } from '@/components/devops/CtaBanner';
import { ContactSection } from '@/components/devops/ContactSection';
import { Footer } from '@/components/devops/Footer';
import { getDb } from '@/lib/db';
import { SERVICES, PORTFOLIO, TESTIMONIALS, STATS } from '@/data/devopsData';

function parseJSON(str: string, fallback: any = []) {
  try { return JSON.parse(str); } catch { return fallback; }
}

export default function HomePage() {
  const db = getDb();
  
  const dbServices = db.prepare('SELECT * FROM services ORDER BY order_index').all() as any[];
  const services = dbServices.length > 0 ? dbServices.map(s => ({
    id: s.id.toString(),
    icon: s.icon,
    title: s.title,
    shortDesc: s.short_desc,
    description: s.description,
    features: parseJSON(s.features),
    color: s.color,
    lightColor: s.light_color,
  })) : SERVICES;

  const dbPortfolio = db.prepare('SELECT * FROM portfolio').all() as any[];
  const portfolio = dbPortfolio.length > 0 ? dbPortfolio.map(p => ({
    title: p.title,
    category: p.category,
    description: p.description,
    tech: parseJSON(p.tech),
    color: p.color,
  })) : PORTFOLIO;

  const dbTestimonials = db.prepare('SELECT * FROM testimonials').all() as any[];
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials.map(t => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    initials: t.initials,
    rating: t.rating,
    color: t.color,
  })) : TESTIMONIALS;

  const dbStats = db.prepare('SELECT * FROM stats ORDER BY order_index').all() as any[];
  const stats = dbStats.length > 0 ? dbStats.map(s => ({
    value: s.value,
    label: s.label,
  })) : STATS;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      {/* Sticky Navigation */}
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <ServicesSection services={services} />
        <WhyUsSection />
        <TechStack />
        <ProcessSection />
        <PortfolioSection portfolio={portfolio} />
        <TestimonialsSection testimonials={testimonials} />
        <StatsSection stats={stats} />
        <CtaBanner />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
