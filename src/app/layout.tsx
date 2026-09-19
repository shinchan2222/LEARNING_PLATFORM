import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devops-solutions.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DEVops | Custom Software, Websites & Mobile Apps',
    template: '%s | DEVops Solutions',
  },
  description:
    'DEVops is a full-service software company building custom software, stunning websites, powerful mobile apps, UI/UX designs, cloud solutions, and APIs — delivered on time, on budget.',
  keywords: [
    'custom software development',
    'website development',
    'mobile app development',
    'UI/UX design',
    'cloud solutions',
    'DevOps consulting',
    'API development',
    'software engineering agency',
  ],
  authors: [{ name: 'DEVops Solutions', url: siteUrl }],
  creator: 'DEVops Solutions',
  publisher: 'DEVops Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'DEVops | Custom Software, Websites & Mobile Apps',
    description:
      'We build reliable products, custom software, modern websites, and scalable mobile apps delivered on time and on budget.',
    url: siteUrl,
    siteName: 'DEVops Solutions',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEVops | Custom Software, Websites & Mobile Apps',
    description:
      'Full-service software company building custom software, websites, mobile apps, and cloud solutions.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col text-slate-900 bg-white font-sans selection:bg-[#0B63E5] selection:text-white">
        {children}
      </body>
    </html>
  );
}