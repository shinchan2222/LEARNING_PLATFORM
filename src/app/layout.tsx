import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Seceon | AI-Driven Threat Detection & Comprehensive Cybersecurity Platform',
  description: 'Our AI Kills Active Attacks in 90 Seconds. Seceon provides real-time AI-driven cybersecurity with aiSIEM, aiXDR, and OTM Platform for modern enterprises and MSSPs.',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen flex flex-col selection:bg-[#5A9955] selection:text-white bg-[#071323] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}