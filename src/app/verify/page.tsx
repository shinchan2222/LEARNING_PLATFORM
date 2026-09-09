'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Certificate } from '@/types';
import { 
  ShieldCheck, 
  Search, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  User, 
  ExternalLink,
  Printer
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CertificateModal from '@/components/student/CertificateModal';

function VerifyContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const [credentialId, setCredentialId] = useState(initialId);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullCert, setShowFullCert] = useState(false);

  const handleSearch = async (idToSearch?: string) => {
    const id = idToSearch || credentialId;
    if (!id.trim()) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/certificates?credentialId=${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (res.ok && data.certificate) {
        setCertificate(data.certificate);
      } else {
        setCertificate(null);
      }
    } catch {
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Academic Credential Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
              Verify completion certificates and research honors issued by Dr. Aris Thorne’s Computer Science Lab.
            </p>
          </div>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 mb-8">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                placeholder="Enter Credential ID (e.g. CS-STANFORD-2026-89412)"
                className="w-full pl-9 pr-3 py-2 text-sm font-mono border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              {loading ? 'Verifying...' : 'Verify Credential'}
            </button>
          </div>

          {/* Sample quick search links */}
          <div className="text-center text-xs text-slate-500 mb-8">
            <span>Try sample issued ID: </span>
            <button
              onClick={() => {
                setCredentialId('CS-STANFORD-2026-89412');
                handleSearch('CS-STANFORD-2026-89412');
              }}
              className="font-mono text-indigo-600 font-semibold underline hover:text-indigo-800"
            >
              CS-STANFORD-2026-89412
            </button>
          </div>

          {/* Verification Result */}
          {searched && (
            <div>
              {certificate ? (
                <div className="bg-white rounded-2xl border-2 border-emerald-400 p-6 sm:p-8 shadow-xl space-y-6 animate-fadeIn">
                  <div className="flex items-center gap-3 text-emerald-600 border-b border-slate-100 pb-4">
                    <CheckCircle2 className="w-8 h-8 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">
                        Authentic & Verified Faculty Credential
                      </h2>
                      <p className="text-xs text-slate-500">
                        Recorded on Stanford Research Computing Initiative ledger
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Awarded To</span>
                      <span className="text-base font-bold text-slate-900 block mt-0.5">{certificate.studentName}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Credential ID</span>
                      <span className="text-base font-mono font-bold text-indigo-600 block mt-0.5">{certificate.credentialId}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Research Track</span>
                      <span className="text-sm font-bold text-slate-900 block mt-0.5">{certificate.internshipTitle} ({certificate.domain})</span>
                      <span className="text-slate-500 text-[11px]">Duration: {certificate.durationWeeks} Weeks</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Honors Grade</span>
                      <span className="text-sm font-bold text-emerald-700 block mt-0.5">{certificate.grade}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Date Awarded</span>
                      <span className="text-sm font-semibold text-slate-800 block mt-0.5">{certificate.issueDate}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Signed: <span className="font-semibold text-slate-800">{certificate.instructorName}</span>
                    </div>

                    <button
                      onClick={() => setShowFullCert(true)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>Inspect Official Certificate</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center shadow-sm text-xs text-slate-600">
                  <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
                  <h3 className="text-base font-bold text-slate-900">No Credential Found</h3>
                  <p className="mt-1 text-slate-500">
                    The identifier <span className="font-mono font-bold text-slate-800">{credentialId}</span> could not be verified in our records. Please double-check the ID or contact the lab administrator.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {showFullCert && certificate && (
        <CertificateModal
          certificate={certificate}
          onClose={() => setShowFullCert(false)}
        />
      )}

      <Footer />
    </div>
  );
}

export default function VerifyPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center">Loading verification portal...</div>}>
      <VerifyContent />
    </React.Suspense>
  );
}
