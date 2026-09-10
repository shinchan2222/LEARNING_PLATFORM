'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { CAREERTIQ_PROGRAMS } from '@/data/careertiqData';

export const CareerTiQFooter: React.FC = () => {
  return (
    <footer className="w-full font-sans">
      {/* Top Orange Subscribe to Newsletter Bar */}
      <div className="bg-[#FF7707] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight text-center md:text-left">
            Subscribe to Newsletter
          </h2>

          <form onSubmit={(e) => e.preventDefault()} className="w-full md:w-auto flex items-center justify-end">
            <div className="relative w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your mail"
                required
                className="w-full h-12 pl-6 pr-32 rounded-xl bg-white text-[#222222] text-sm outline-none shadow-md border-0 focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#007BC6] hover:text-[#FF7707] font-bold text-sm underline flex items-center gap-1.5 px-3 py-1.5 transition-colors"
              >
                <span>Send Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 22 12" fill="none">
                  <path d="M1 5.25C0.585786 5.25 0.25 5.58579 0.25 6C0.25 6.41421 0.585786 6.75 1 6.75V5.25ZM21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM1 6.75H21V5.25H1V6.75Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Container with Dark/Light grey blocks */}
      <div className="bg-[#FFFFFF] pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          
          {/* Logo Header Banner */}
          <div className="bg-[#222222] px-8 py-5 flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://careertiq.com/wp-content/uploads/2023/11/CareerTiQ-_Full_Blue-transparent_background-2.png" 
              alt="CareerTiQ"
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* 5-Column Navigation Strip on Grey Background */}
          <div className="bg-[#EEEEEE] px-8 py-10 grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
            
            {/* Column 1: Location & Copyright */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#757575] uppercase tracking-wider">Location</p>
              <div className="text-xs sm:text-[13px] text-[#222222] leading-relaxed">
                CareerTiQ Solutions Private Limited<br />
                Coimbatore,<br />
                Tamil Nadu – 641041<br />
                India.
              </div>
              <p className="text-xs text-[#757575] pt-4">© 2025 CareerTiQ</p>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#757575] uppercase tracking-wider">Company</p>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#222222]">
                <li><Link href="/#programs" className="hover:text-[#FF7707] transition-colors">Programs</Link></li>
                <li><Link href="/events" className="hover:text-[#FF7707] transition-colors">Events</Link></li>
                <li><Link href="/about" className="hover:text-[#FF7707] transition-colors">About Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#757575] uppercase tracking-wider">Resources</p>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#222222]">
                <li><Link href="/programs/deep-tech" className="hover:text-[#FF7707] transition-colors">DeepTech</Link></li>
                <li><Link href="/programs/fin-tech" className="hover:text-[#FF7707] transition-colors">FinTech</Link></li>
                <li><Link href="/programs/media-tech" className="hover:text-[#FF7707] transition-colors">MediaTech</Link></li>
                <li><Link href="/programs/international-languages" className="hover:text-[#FF7707] transition-colors">International Languages</Link></li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#757575] uppercase tracking-wider">Support</p>
              <ul className="space-y-1.5 text-xs sm:text-[13px] text-[#222222]">
                <li><Link href="/contact-us" className="hover:text-[#FF7707] transition-colors">Contact Us</Link></li>
                <li><Link href="/legal/terms" className="hover:text-[#FF7707] transition-colors">Terms &amp; Conditions</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-[#FF7707] transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/refund" className="hover:text-[#FF7707] transition-colors">Return and Refund Policy</Link></li>
                <li><Link href="/legal/whistleblower" className="hover:text-[#FF7707] transition-colors">Whistleblower Policy</Link></li>
              </ul>
            </div>

            {/* Column 5: Follow Us */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-[#757575] uppercase tracking-wider">Follow Us</p>
              
              <div className="flex items-center gap-3 text-black">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=100069953236117"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:text-[#0866FF] transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://twitter.com/careertiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:text-[#1D9BF0] transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@careertiq8823"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:text-[#F70000] transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/careertiq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#0073B1] transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.57 1.57 0 1 0 0 3.14 1.57 1.57 0 0 0 0-3.14z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/careertiq/?igsh=NHYzYTJxYmplaGI4"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#6F45C3] transition-colors"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>

              <p className="text-xs text-[#757575] pt-2">© 2024 CareerTiQ</p>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};