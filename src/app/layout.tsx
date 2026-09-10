import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'CareerTiQ | Corporate Skilling, Finishing School & Graduate Programs',
  description: 'Embrace Innovation! Experience Transformation! CareerTiQ prepares engineers and graduates in DeepTech, FinTech, MediaTech, and Global Corporate Languages.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-[#0B63E5] selection:text-white bg-white text-slate-900">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}