'use client';

import React, { useRef, useState } from 'react';
import { Certificate } from '@/types';
import { 
  X, 
  Download, 
  Printer, 
  Share2, 
  Check, 
  Award, 
  ShieldCheck, 
  QrCode,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/verify?id=${certificate.credentialId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl my-auto overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Official Credential Verification
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Credential ID: {certificate.credentialId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="p-4 sm:p-8 bg-slate-100 flex justify-center">
          <div
            ref={certRef}
            id="printable-certificate"
            className="w-full max-w-[850px] bg-[#fcfbf9] text-slate-900 p-8 sm:p-12 rounded-xl border-[10px] border-[#1e293b] shadow-2xl relative overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          >
            {/* Elegant Inner Gold Border */}
            <div className="absolute inset-3 border-2 border-amber-500/60 pointer-events-none rounded-lg" />
            <div className="absolute inset-4 border border-dashed border-amber-400/40 pointer-events-none rounded-lg" />

            {/* Corner Filigree Accents */}
            <div className="absolute top-5 left-5 text-amber-500/80 text-xl font-serif">✦</div>
            <div className="absolute top-5 right-5 text-amber-500/80 text-xl font-serif">✦</div>
            <div className="absolute bottom-5 left-5 text-amber-500/80 text-xl font-serif">✦</div>
            <div className="absolute bottom-5 right-5 text-amber-500/80 text-xl font-serif">✦</div>

            {/* Certificate Header */}
            <div className="text-center space-y-2 relative z-10">
              <div className="inline-flex items-center justify-center gap-2 mx-auto">
                <div className="w-12 h-12 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center border-2 border-amber-400 shadow-md">
                  <ShieldCheck className="w-7 h-7" />
                </div>
              </div>

              <div className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
                STANFORD RESEARCH COMPUTING INITIATIVE
              </div>
              <h1 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-tight text-slate-900 uppercase">
                Certificate of Completion
              </h1>
              <p className="text-xs sm:text-sm font-sans font-medium text-slate-500 tracking-wide uppercase">
                Applied Computer Science Research & Engineering Internship
              </p>
            </div>

            {/* Certificate Body */}
            <div className="my-8 text-center space-y-4 relative z-10">
              <p className="text-xs sm:text-sm font-serif italic text-slate-600">
                This academic and professional certificate is proudly awarded to
              </p>

              <div className="py-2 border-b-2 border-slate-300 max-w-md mx-auto">
                <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-indigo-950 tracking-wide">
                  {certificate.studentName}
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
                for successfully completing the rigorous <span className="font-bold text-slate-900">{certificate.durationWeeks}-week</span> research program in <span className="font-bold text-indigo-900">{certificate.internshipTitle}</span> within the domain of <span className="font-semibold text-slate-900">{certificate.domain}</span>, fulfilling all architectural deliverables and engineering milestones with distinction.
              </p>

              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold">
                {certificate.grade}
              </div>
            </div>

            {/* Certificate Footer / Signatures & QR */}
            <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 items-end text-center relative z-10">
              {/* Date */}
              <div>
                <div className="text-xs font-bold text-slate-900 font-mono mb-1">
                  {certificate.issueDate}
                </div>
                <div className="border-t border-slate-400 pt-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  Issue Date
                </div>
              </div>

              {/* Verified Seal & QR */}
              <div className="flex flex-col items-center">
                <div className="p-2 bg-white rounded-lg border border-slate-300 shadow-xs mb-1">
                  <QrCode className="w-10 h-10 text-slate-800" />
                </div>
                <div className="text-[9px] font-mono text-slate-500">
                  {certificate.credentialId}
                </div>
              </div>

              {/* Professor Signature */}
              <div className="text-center">
                <div className="font-serif italic text-base sm:text-lg text-indigo-950 font-bold mb-1">
                  Dr. Aris Thorne
                </div>
                <div className="border-t border-slate-400 pt-1 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                  {certificate.instructorName}
                  <div className="text-[9px] font-normal lowercase text-slate-400">
                    Lead Faculty & Principal Investigator
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verifiable online at <span className="font-mono font-semibold text-slate-800">/verify?id={certificate.credentialId}</span></span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/verify?id=${certificate.credentialId}`}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <span>Public Verification Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Official PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
