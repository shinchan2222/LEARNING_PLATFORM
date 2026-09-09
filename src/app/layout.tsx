import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'CS Research & Industry Internships | Dr. Aris Thorne',
  description: 'Premier online Computer Science internships across AI/ML, Full Stack Development, Cloud & DevOps, and Cybersecurity. Directed by Dr. Aris Thorne.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
