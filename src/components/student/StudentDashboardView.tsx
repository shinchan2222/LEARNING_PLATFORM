'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Application, Internship, Submission, Certificate } from '@/types';
import { 
  ExternalLink, 
  ArrowRight, 
  RefreshCw, 
  Download,
  Check,
  ChevronDown,
  CheckCircle2,
  Lock,
  Send,
  Clock,
  AlertCircle,
  Award,
  Code2,
  Play,
  Terminal as TerminalIcon,
  CheckCircle,
  XCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import CertificateModal from './CertificateModal';
import PaymentModal from '@/components/payment/PaymentModal';

export const StudentDashboardView: React.FC = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  // Active tabs
  const [activeTab, setActiveTab] = useState<'internships' | 'submissions' | 'certificates' | 'tracker'>('internships');
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  // Milestone timeline interaction states
  const [expandedMilestones, setExpandedMilestones] = useState<Record<number, boolean>>({});
  const [inlineSubmitWeek, setInlineSubmitWeek] = useState<number | null>(2); // Default open for Milestone 02
  const [inlineGithub, setInlineGithub] = useState('');
  const [inlineLive, setInlineLive] = useState('');
  const [inlineNotes, setInlineNotes] = useState('');
  const [inlineSubmitting, setInlineSubmitting] = useState(false);
  const [inlineSuccessMsg, setInlineSuccessMsg] = useState('');

  // CI/CD Automated Test Suite Simulation
  const [ciRunning, setCiRunning] = useState(false);
  const [ciResult, setCiResult] = useState<{
    passed: boolean;
    tests: { name: string; duration: string; status: 'pass' | 'fail' }[];
    benchmark: string;
    coverage: string;
  } | null>(null);

  // Global Submission Form State (Tab 2)
  const [subWeek, setSubWeek] = useState<number>(1);
  const [subGithub, setSubGithub] = useState('');
  const [subLive, setSubLive] = useState('');
  const [subNotes, setSubNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

  // Modals
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null);
  const [pendingPaymentInternship, setPendingPaymentInternship] = useState<Internship | null>(null);

  const loadStudentData = async () => {
    if (!user) return;
    try {
      setLoading(true);
      // 1. Applications
      const appRes = await fetch(`/api/applications?userId=${user.id}`);
      const appData = await appRes.json();
      const apps = appData.applications || [];
      setApplications(apps);
      if (apps.length > 0 && !selectedApp) {
        // Prioritize Full Stack Development if available for the mockup focus
        const fullstackApp = apps.find((a: any) => a.internship?.domain === 'Full Stack Development');
        setSelectedApp(fullstackApp || apps[0]);
      }

      // 2. Submissions
      const subRes = await fetch(`/api/submissions?userId=${user.id}`);
      const subData = await subRes.json();
      setSubmissions(subData.submissions || []);

      // 3. Certificates
      const certRes = await fetch(`/api/certificates?userId=${user.id}`);
      const certData = await certRes.json();
      setCertificates(certData.certificates || []);
    } catch (err) {
      console.error('Failed to load student data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudentData();
  }, [user]);

  const toggleAccordion = (week: number) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [week]: !prev[week]
    }));
  };

  // Inline submit directly from Milestone 02 action area
  const handleInlineSubmit = async (e: React.FormEvent, weekNum: number, taskTitle: string) => {
    e.preventDefault();
    if (!selectedApp || !user) return;

    if (!inlineGithub.includes('github.com')) {
      alert('Please enter a valid GitHub repository URL (e.g. https://github.com/username/repo)');
      return;
    }

    setInlineSubmitting(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedApp.id,
          internshipId: selectedApp.internshipId,
          userId: user.id,
          weekNumber: weekNum,
          taskTitle: taskTitle,
          githubUrl: inlineGithub,
          liveUrl: inlineLive,
          notes: inlineNotes
        })
      });

      const data = await res.json();
      if (res.ok) {
        setInlineSuccessMsg(`Milestone 0${weekNum} work submitted successfully! Dr. Thorne has been notified for review.`);
        setInlineGithub('');
        setInlineLive('');
        setInlineNotes('');
        await loadStudentData();
        setTimeout(() => setInlineSuccessMsg(''), 7000);
      } else {
        alert(data.error || 'Failed to submit milestone work');
      }
    } catch (err) {
      console.error('Inline submission error:', err);
      alert('Network error submitting milestone');
    } finally {
      setInlineSubmitting(false);
    }
  };

  const handleRunCiSuite = () => {
    if (!inlineGithub) {
      alert('Please provide or auto-fill a GitHub repository URL first.');
      return;
    }
    setCiRunning(true);
    setCiResult(null);

    setTimeout(() => {
      setCiRunning(false);
      setCiResult({
        passed: true,
        tests: [
          { name: 'db:migration:integrity_check', duration: '142ms', status: 'pass' },
          { name: 'benchmark:p99_latency_sla (<15ms)', duration: '840ms', status: 'pass' },
          { name: 'concurrency:pool_exhaustion_stress', duration: '1.2s', status: 'pass' },
          { name: 'security:sql_injection_sanitization', duration: '310ms', status: 'pass' }
        ],
        benchmark: '12.4ms P99 @ 5,000 req/sec',
        coverage: '96.8% branch coverage'
      });
    }, 1800);
  };

  const handleSubmitMilestone = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp || !user) return;

    if (!subGithub.includes('github.com')) {
      alert('Please enter a valid GitHub repository link (e.g. https://github.com/username/repo)');
      return;
    }

    setSubmitting(true);
    try {
      const activeMilestone = selectedApp.internship?.syllabus?.find((s: any) => s.week === Number(subWeek));

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: selectedApp.id,
          internshipId: selectedApp.internshipId,
          userId: user.id,
          weekNumber: Number(subWeek),
          taskTitle: activeMilestone?.title || `Week ${subWeek} Assignment`,
          githubUrl: subGithub,
          liveUrl: subLive,
          notes: subNotes
        })
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitSuccessMsg(`Week ${subWeek} deliverable recorded. Dr. Thorne has been notified for review.`);
        setSubGithub('');
        setSubLive('');
        setSubNotes('');
        await loadStudentData();
        setTimeout(() => setSubmitSuccessMsg(''), 6000);
      } else {
        alert(data.error || 'Failed to submit milestone');
      }
    } catch (err) {
      console.error('Submission error:', err);
      alert('Network error submitting milestone');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 bg-[#fafaf9]">
        <div className="max-w-md w-full p-8 bg-white border border-neutral-200 text-center space-y-4">
          <div className="font-mono text-xs text-neutral-400">Authentication Required</div>
          <h2 className="text-xl font-medium tracking-tight text-neutral-900">Student Portal Access</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Please sign in to your student account to access your assigned research cohorts, weekly deliverables, and issued credentials.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="/login"
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium tracking-wide transition text-center"
            >
              Sign In with Student Account
            </a>
            <a
              href="/signup"
              className="w-full py-2.5 border border-neutral-200 text-neutral-700 hover:bg-neutral-50 text-xs font-medium transition text-center"
            >
              Create Account
            </a>
          </div>
        </div>
      </div>
    );
  }

  const enrolledApps = applications.filter((a) => a.status === 'enrolled' || a.status === 'completed');
  const pendingApps = applications.filter((a) => a.status === 'pending_payment');
  const approvedCount = submissions.filter((s) => s.status === 'approved').length;

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 selection:bg-neutral-200 selection:text-neutral-900 pb-16">
      {/* 1. Compact Unified Engineering Header Bar with WCAG AA Contrast */}
      <header className="border-b border-neutral-200/80 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
            {/* User Identity merged into compact, unified bar */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-medium text-xs flex items-center justify-center font-mono shrink-0 shadow-xs">
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div className="flex flex-wrap items-baseline gap-2 text-xs">
                <span className="font-semibold text-neutral-900">{user.name}</span>
                <span className="text-neutral-400">/</span>
                <span className="text-neutral-600 font-medium">{user.college || 'UC Berkeley'}</span>
                <span className="text-neutral-400">/</span>
                <span className="font-mono text-[11px] text-neutral-500">{user.id}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                  Active Intern
                </span>
              </div>
            </div>

            {/* High-level stats as a clean inline status line with monospace accents */}
            <div className="flex items-center gap-3 text-xs text-neutral-600 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-semibold px-1.5 py-0.5 bg-neutral-100 text-neutral-900 border border-neutral-300/80 rounded">
                    {enrolledApps.length}
                  </span>
                  <span className="text-neutral-600">cohorts</span>
                </div>
                <span className="text-neutral-300">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-semibold px-1.5 py-0.5 bg-neutral-100 text-neutral-900 border border-neutral-300/80 rounded">
                    {submissions.length}
                  </span>
                  <span className="text-neutral-600">submissions</span>
                </div>
                <span className="text-neutral-300">·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-semibold px-1.5 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-300/80 rounded">
                    {approvedCount}
                  </span>
                  <span className="text-neutral-600">passed</span>
                </div>
              </div>

              <span className="text-neutral-300 hidden sm:inline">|</span>

              <button
                onClick={loadStudentData}
                disabled={loading}
                className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 transition disabled:opacity-50"
                title="Sync live status"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>Sync</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Restrained Tab Navigation (Sentence Case, Mobile Touch-Scrollable) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-5 sm:gap-6 border-b border-neutral-200/80 text-xs overflow-x-auto whitespace-nowrap scrollbar-none">
          <button
            onClick={() => setActiveTab('internships')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 -mb-px shrink-0 ${
              activeTab === 'internships'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span>Internships & curriculum</span>
            <span className="font-mono text-[11px] text-neutral-500">
              ({enrolledApps.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 -mb-px shrink-0 ${
              activeTab === 'submissions'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span>Submit deliverable</span>
            <span className="font-mono text-[11px] text-neutral-500">
              ({submissions.length})
            </span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 -mb-px shrink-0 ${
              activeTab === 'certificates'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span>Credentials</span>
            {certificates.length > 0 && (
              <span className="font-mono text-[11px] text-neutral-700 bg-neutral-200/70 px-1.5 py-0.5 rounded">
                {certificates.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`pb-3 font-medium transition flex items-center gap-2 border-b-2 -mb-px shrink-0 ${
              activeTab === 'tracker'
                ? 'border-neutral-950 text-neutral-950 font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <span>Enrollment & billing</span>
            {pendingApps.length > 0 && (
              <span className="font-mono text-[11px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                {pendingApps.length} action required
              </span>
            )}
          </button>
        </nav>

        {/* ========================================================= */}
        {/* TAB 1: Internships & Action-Oriented Curriculum Timeline */}
        {/* ========================================================= */}
        {activeTab === 'internships' && (
          <div className="pt-7">
            {enrolledApps.length === 0 ? (
              <div className="p-12 text-center bg-white border border-neutral-200 rounded-lg">
                <div className="text-xs text-neutral-500 font-mono mb-2">
                  No active enrolments
                </div>
                <h3 className="text-base font-medium text-neutral-900 mb-1">
                  You are not currently enrolled in any research cohorts
                </h3>
                <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-5 leading-relaxed">
                  Browse our high-impact AI, Full Stack, Cloud, or Cybersecurity cohorts in the catalog to get started.
                </p>
                <a
                  href="/#catalog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-xs font-medium hover:bg-neutral-800 transition rounded-md"
                >
                  <span>Explore cohort catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Enhanced Cohort Selection Panel with Complete Visual Contrast */}
                <div className="lg:col-span-4 space-y-2.5">
                  <div className="text-xs font-medium text-neutral-700 px-1 flex items-center justify-between">
                    <span>Enrolled cohorts</span>
                    <span className="text-[11px] font-mono text-neutral-500">{enrolledApps.length} available</span>
                  </div>

                  <div className="space-y-2.5">
                    {enrolledApps.map((app) => {
                      const isSelected = selectedApp?.id === app.id;
                      const totalMilestones = app.internship?.syllabus?.length || 4;
                      const appApprovedCount = app.approvedSubmissionsCount || 0;
                      const progressPct = Math.min(100, Math.round((appApprovedCount / totalMilestones) * 100));

                      return (
                        <button
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-white border-neutral-900 shadow-sm ring-1 ring-neutral-900 text-neutral-950'
                              : 'bg-neutral-50/70 border-neutral-200 hover:border-neutral-300 hover:bg-white text-neutral-600'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] mb-1.5">
                            <span className={`font-semibold tracking-wide ${isSelected ? 'text-neutral-900' : 'text-neutral-500'}`}>
                              {app.internship?.domain}
                            </span>
                            {isSelected ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-neutral-900 text-white">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                              </span>
                            ) : app.status === 'completed' ? (
                              <span className="text-emerald-700 font-medium text-xs">Certified</span>
                            ) : (
                              <span className="text-neutral-500 font-mono">{progressPct}%</span>
                            )}
                          </div>

                          <div className={`text-xs leading-snug ${isSelected ? 'font-bold text-neutral-950' : 'font-medium text-neutral-800'}`}>
                            {app.internship?.title}
                          </div>

                          <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500 font-normal">
                            <span>{appApprovedCount} of {totalMilestones} passed</span>
                            <div className="w-20 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-300 rounded-full ${isSelected ? 'bg-neutral-900' : 'bg-neutral-400'}`}
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <p className="text-[11px] text-neutral-500 px-1 pt-1 leading-relaxed">
                    Select a cohort to focus on its next required deliverable and review professor grading.
                  </p>
                </div>

                {/* Right: Action-Oriented Curriculum Milestones Timeline */}
                {selectedApp && (
                  <div className="lg:col-span-8 bg-white border border-neutral-200 p-6 sm:p-7 rounded-xl shadow-xs">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-neutral-100">
                      <div className="space-y-1">
                        <div className="text-xs font-semibold text-neutral-600">
                          {selectedApp.internship?.domain} · {selectedApp.internship?.durationWeeks} Weeks
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight">
                          {selectedApp.internship?.title}
                        </h2>
                        <p className="text-xs text-neutral-600">
                          Principal Investigator: <span className="text-neutral-900 font-semibold">{selectedApp.internship?.instructor?.name || 'Dr. Thorne'}</span> ({selectedApp.internship?.instructor?.title || 'Stanford Systems & AI Lab'})
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {selectedApp.status === 'completed' ? (
                          <button
                            onClick={() => {
                              const cert = certificates.find((c) => c.internshipId === selectedApp.internshipId);
                              if (cert) setActiveCertificate(cert);
                              else setActiveTab('certificates');
                            }}
                            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium tracking-wide transition flex items-center gap-1.5 rounded-md"
                          >
                            <span>View certificate</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-xs font-mono text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded border border-neutral-200">
                            Cohort in progress
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Timeline Header */}
                    <div className="mt-7">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                          Curriculum milestones & evaluations
                        </h3>
                        <span className="text-[11px] text-neutral-500">
                          Follow the sequential path below to complete your internship
                        </span>
                      </div>

                      {/* Next Action Recommendation Banner */}
                      {(() => {
                        const syllabus = selectedApp.internship?.syllabus || [];
                        const currentActionable = syllabus.find((mod: any) => {
                          const sub = submissions.find(s => s.applicationId === selectedApp.id && s.weekNumber === mod.week);
                          return !sub || sub.status !== 'approved';
                        });
                        const currentSub = currentActionable 
                          ? submissions.find(s => s.applicationId === selectedApp.id && s.weekNumber === currentActionable.week)
                          : null;

                        if (!currentActionable && selectedApp.status === 'completed') {
                          return (
                            <div className="mb-6 p-4 bg-emerald-50/80 border border-emerald-200 rounded-lg flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-emerald-950">Curriculum Complete — Distinction Honors</h4>
                                  <p className="text-[11px] text-emerald-800 mt-0.5">
                                    All milestones have passed technical review. Your credential is authenticated and minted.
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => setActiveTab('certificates')}
                                className="shrink-0 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shadow-xs"
                              >
                                <Award className="w-3.5 h-3.5" />
                                View Certificate
                              </button>
                            </div>
                          );
                        }

                        if (currentSub?.status === 'under_review') {
                          return (
                            <div className="mb-6 p-4 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
                                  <Clock className="w-4 h-4 stroke-[2.5]" />
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-amber-950">Milestone {currentActionable?.week} Under Faculty Review</h4>
                                  <p className="text-[11px] text-amber-800 mt-0.5">
                                    Your pull request is queued for technical and benchmark evaluation. Expect feedback within 24-48 hours.
                                  </p>
                                </div>
                              </div>
                              <span className="text-[11px] font-mono text-amber-700 bg-amber-100/70 border border-amber-300 px-2.5 py-1 rounded">
                                Status: Review in progress
                              </span>
                            </div>
                          );
                        }

                        if (currentActionable) {
                          return (
                            <div className="mb-6 p-4 bg-blue-50/80 border border-blue-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                                  <Code2 className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-200/70 text-blue-800 px-1.5 py-0.5 rounded">
                                      Next Up
                                    </span>
                                    <h4 className="text-xs font-bold text-blue-950">
                                      Milestone {currentActionable.week}: {currentActionable.title}
                                    </h4>
                                  </div>
                                  <p className="text-[11px] text-blue-800 mt-0.5">
                                    Submit your pull request link and benchmark metrics to unlock faculty grading.
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setInlineSubmitWeek(currentActionable.week);
                                  setExpandedMilestones(prev => ({ ...prev, [currentActionable.week]: true }));
                                }}
                                className="shrink-0 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                              >
                                <ArrowRight className="w-3.5 h-3.5" />
                                Submit Milestone {currentActionable.week}
                              </button>
                            </div>
                          );
                        }

                        return null;
                      })()}

                      {/* Continuous Connected Vertical Timeline */}
                      <div className="relative border-l-2 border-neutral-200 ml-3.5 pl-6 sm:pl-8 space-y-8 my-2">
                        {(() => {
                          const syllabus = selectedApp.internship?.syllabus || [];
                          // Find the current actionable milestone (first unapproved milestone)
                          const currentActionable = syllabus.find((mod: any) => {
                            const sub = submissions.find(s => s.applicationId === selectedApp.id && s.weekNumber === mod.week);
                            return !sub || sub.status !== 'approved';
                          });
                          const currentActionableWeek = currentActionable?.week || 2;

                          return syllabus.map((mod: any) => {
                            const studentSub = submissions.find(
                              (s) => s.applicationId === selectedApp.id && s.weekNumber === mod.week
                            );

                            const isApproved = studentSub?.status === 'approved';
                            const isUnderReview = studentSub && studentSub.status === 'under_review';
                            const isRevision = studentSub?.status === 'revision_requested';
                            const isCurrentActionable = mod.week === currentActionableWeek && !isApproved;
                            const isUpcoming = mod.week > currentActionableWeek && !studentSub;
                            const isExpanded = !!expandedMilestones[mod.week];

                            return (
                              <div key={mod.week} className="relative">
                                {/* Timeline Node centered over connector line */}
                                <div className={`absolute -left-[32px] sm:-left-[40px] top-1 flex items-center justify-center`}>
                                  {isApproved ? (
                                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                                    </div>
                                  ) : isCurrentActionable ? (
                                    <div className="w-4 h-4 rounded-full bg-[#1e293b] ring-4 ring-slate-100 flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                                    </div>
                                  ) : (
                                    <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-300 bg-white" />
                                  )}
                                </div>

                                {/* CASE 1: Completed Milestone (Compacted Accordion) */}
                                {isApproved && (
                                  <div className="space-y-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                      <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                        <span className="font-mono text-xs font-bold text-neutral-400">
                                          0{mod.week}.
                                        </span>
                                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                                          {mod.title}
                                        </h4>
                                      </div>

                                      <div className="flex items-center gap-2 self-start sm:self-auto">
                                        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/80">
                                          Approved • {studentSub.score}/100
                                        </span>
                                        <button
                                          onClick={() => toggleAccordion(mod.week)}
                                          className="p-1 text-neutral-500 hover:text-neutral-900 transition-transform rounded"
                                          title={isExpanded ? 'Collapse milestone details' : 'Expand milestone details'}
                                        >
                                          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Collapsed/Expanded Accordion Details */}
                                    {isExpanded && (
                                      <div className="mt-3 pl-4 border-l-2 border-neutral-200 space-y-2 text-xs text-neutral-600 animate-fadeIn">
                                        <p className="leading-relaxed">{mod.description}</p>
                                        <div className="text-neutral-700">
                                          <span className="font-semibold text-neutral-900">Deliverable: </span>
                                          <span>{mod.deliverables}</span>
                                        </div>

                                        {studentSub?.feedback && (
                                          <div className="mt-2 pl-3 border-l-2 border-neutral-300 py-1 space-y-0.5">
                                            <div className="text-neutral-900 font-semibold flex items-center gap-1.5">
                                              <span>Dr. Thorne review:</span>
                                              <span className="font-mono text-neutral-600">({studentSub.score}/100)</span>
                                            </div>
                                            <p className="italic text-neutral-600">
                                              “{studentSub.feedback}”
                                            </p>
                                          </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-[11px] text-neutral-500">
                                          <a
                                            href={studentSub.githubUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-neutral-900 hover:underline flex items-center gap-1"
                                          >
                                            <span>Repository</span>
                                            <ExternalLink className="w-2.5 h-2.5" />
                                          </a>
                                          {studentSub.liveUrl && (
                                            <a
                                              href={studentSub.liveUrl}
                                              target="_blank"
                                              rel="noreferrer"
                                              className="text-neutral-700 hover:underline flex items-center gap-1"
                                            >
                                              <span>Live demo</span>
                                              <ExternalLink className="w-2.5 h-2.5" />
                                            </a>
                                          )}
                                          <span className="text-neutral-400 ml-auto">
                                            Submitted {formatDate(studentSub.submittedAt)}
                                          </span>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* CASE 2: Current Actionable Milestone (Primary CTA & Focused Data Entry Area) */}
                                {isCurrentActionable && (
                                  <div className="space-y-3.5">
                                    {/* Prominent Action Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                      <div className="flex items-baseline gap-2">
                                        <span className="font-mono text-xs font-bold text-neutral-900">
                                          0{mod.week}.
                                        </span>
                                        <h4 className="text-sm font-bold text-neutral-950">
                                          {mod.title}
                                        </h4>
                                      </div>

                                      {/* Prominent dark blue primary action button directly adjacent */}
                                      <button
                                        onClick={() => setInlineSubmitWeek(inlineSubmitWeek === mod.week ? null : mod.week)}
                                        className="px-4 py-2 rounded-md bg-[#1e293b] hover:bg-[#0f172a] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                                      >
                                        <span>Submit Work for Review</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                      </button>
                                    </div>

                                    <p className="text-xs text-neutral-700 leading-relaxed">
                                      {mod.description}
                                    </p>

                                    <div className="text-xs text-neutral-700">
                                      <span className="font-semibold text-neutral-900">Expected deliverable: </span>
                                      <span>{mod.deliverables}</span>
                                    </div>

                                    {/* Focused Data-Entry Area */}
                                    {inlineSubmitWeek === mod.week && (
                                      <div className="mt-4 bg-neutral-50/90 border border-neutral-300 rounded-lg p-4 sm:p-5 space-y-4">
                                        <div className="border-b border-neutral-200 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                          <div>
                                            <h5 className="text-xs font-bold text-neutral-900 tracking-tight">
                                              Provide GitHub repository link and benchmark URL
                                            </h5>
                                            <p className="text-[11px] text-neutral-500 mt-0.5">
                                              Submit your code, migration scripts, and benchmark evidence for Week {mod.week} evaluation.
                                            </p>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setInlineGithub('https://github.com/alexrivera-cs/database-indexing-pg');
                                              setInlineLive('https://benchmarks.alexrivera.cs/p99-latency');
                                              setInlineNotes('Implemented partial B-Tree indexing on customer_orders(created_at, status). Configured PgBouncer transaction pooling reducing P99 latency from 180ms to 12ms under 5k RPS.');
                                            }}
                                            className="self-start sm:self-auto px-2.5 py-1 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 rounded text-[11px] font-mono font-medium shadow-xs transition-colors flex items-center gap-1.5"
                                          >
                                            <span>⚡</span> Auto-fill Demo PR
                                          </button>
                                        </div>

                                        {inlineSuccessMsg && (
                                          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
                                            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>{inlineSuccessMsg}</span>
                                          </div>
                                        )}

                                        <form onSubmit={(e) => handleInlineSubmit(e, mod.week, mod.title)} className="space-y-3.5 text-xs">
                                          <div>
                                            <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                                              GitHub repository URL <span className="text-rose-500">*</span>
                                            </label>
                                            <input
                                              type="url"
                                              required
                                              value={inlineGithub}
                                              onChange={(e) => setInlineGithub(e.target.value)}
                                              placeholder="https://github.com/alexrivera-cs/database-indexing-pg"
                                              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-xs font-mono text-neutral-900 bg-white outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                                              Benchmark / Live Deployment URL (Optional)
                                            </label>
                                            <input
                                              type="url"
                                              value={inlineLive}
                                              onChange={(e) => setInlineLive(e.target.value)}
                                              placeholder="https://benchmarks.alexrivera.cs or Grafana metrics link"
                                              className="w-full px-3 py-2 border border-neutral-300 rounded-md text-xs font-mono text-neutral-900 bg-white outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                                            />
                                          </div>

                                          <div>
                                            <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                                              Implementation Notes & Query Optimization Highlights
                                            </label>
                                            <textarea
                                              rows={3}
                                              value={inlineNotes}
                                              onChange={(e) => setInlineNotes(e.target.value)}
                                              placeholder="Summarize indexing strategy (B-Tree vs Hash), EXPLAIN ANALYZE latency gains, and connection pool sizing with PgBouncer..."
                                              className="w-full p-3 border border-neutral-300 rounded-md text-xs text-neutral-900 bg-white outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 resize-y"
                                            />
                                          </div>

                                          {/* Automated CI/CD Testing Suite Simulation */}
                                          <div className="bg-neutral-900 text-neutral-100 rounded-md p-3.5 space-y-2.5 font-mono text-[11px]">
                                            <div className="flex items-center justify-between border-b border-neutral-700/80 pb-2">
                                              <div className="flex items-center gap-2">
                                                <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
                                                <span className="font-semibold text-white">CI/CD Pre-Submission Check</span>
                                              </div>
                                              <button
                                                type="button"
                                                onClick={handleRunCiSuite}
                                                disabled={ciRunning}
                                                className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50"
                                              >
                                                {ciRunning ? (
                                                  <>
                                                    <span className="w-2.5 h-2.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    <span>Running Suites...</span>
                                                  </>
                                                ) : (
                                                  <>
                                                    <Play className="w-3 h-3 fill-current" />
                                                    <span>Run Automated Checks</span>
                                                  </>
                                                )}
                                              </button>
                                            </div>

                                            {ciResult ? (
                                              <div className="space-y-2 pt-1 animate-fadeIn">
                                                <div className="flex items-center justify-between text-[10px] text-neutral-400">
                                                  <span>Checks: 4/4 Passed</span>
                                                  <span>{ciResult.benchmark}</span>
                                                </div>
                                                <div className="space-y-1">
                                                  {ciResult.tests.map((t, idx) => (
                                                    <div key={idx} className="flex items-center justify-between text-neutral-300">
                                                      <div className="flex items-center gap-1.5">
                                                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                                                        <span>{t.name}</span>
                                                      </div>
                                                      <span className="text-neutral-500">{t.duration}</span>
                                                    </div>
                                                  ))}
                                                </div>
                                                <div className="pt-1 border-t border-neutral-800 flex items-center justify-between text-[10px] text-emerald-400">
                                                  <span>✓ Artifacts verified & benchmarks met</span>
                                                  <span>{ciResult.coverage}</span>
                                                </div>
                                              </div>
                                            ) : (
                                              <p className="text-[10px] text-neutral-400">
                                                Optional: Run automated test suite against your repo to ensure SLA latency requirements are met before Dr. Thorne evaluates.
                                              </p>
                                            )}
                                          </div>

                                          <div className="pt-1 flex items-center justify-between gap-3">
                                            <button
                                              type="submit"
                                              disabled={inlineSubmitting}
                                              className="px-4 py-2 rounded-md bg-[#1e293b] hover:bg-[#0f172a] text-white text-xs font-semibold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                                            >
                                              <Send className="w-3.5 h-3.5" />
                                              <span>{inlineSubmitting ? 'Submitting Work...' : `Submit Milestone 0${mod.week} for Review`}</span>
                                            </button>

                                            <span className="text-[11px] text-neutral-500 font-mono">
                                              Evaluator: Dr. Thorne
                                            </span>
                                          </div>
                                        </form>
                                      </div>
                                    )}
                                  </div>
                                )}

                                {/* CASE 3: Upcoming / Deprioritized Milestones (Reduced Cognitive Load) */}
                                {isUpcoming && (
                                  <div className="opacity-60 space-y-1.5 transition-opacity hover:opacity-85">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                      <div className="flex items-baseline gap-2">
                                        <span className="font-mono text-xs text-neutral-400">
                                          0{mod.week}.
                                        </span>
                                        <h4 className="text-xs sm:text-sm font-medium text-neutral-600">
                                          {mod.title}
                                        </h4>
                                      </div>

                                      <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                                        <Lock className="w-3 h-3" />
                                        Upcoming • Not yet actionable
                                      </span>
                                    </div>

                                    <p className="text-xs text-neutral-500 leading-relaxed">
                                      {mod.description}
                                    </p>

                                    <div className="text-[11px] text-neutral-500">
                                      <span className="font-medium text-neutral-600">Deliverable: </span>
                                      <span>{mod.deliverables}</span>
                                    </div>
                                  </div>
                                )}

                                {/* CASE 4: Under Review or Revision (if student submitted recently) */}
                                {!isApproved && !isCurrentActionable && !isUpcoming && studentSub && (
                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-baseline gap-2">
                                        <span className="font-mono text-xs text-neutral-500">0{mod.week}.</span>
                                        <h4 className="text-xs sm:text-sm font-bold text-neutral-900">{mod.title}</h4>
                                      </div>
                                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 border border-neutral-300">
                                        Under evaluation by Dr. Thorne
                                      </span>
                                    </div>
                                    <p className="text-xs text-neutral-600">{mod.description}</p>
                                  </div>
                                )}
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: Project Submission Portal */}
        {/* ========================================================= */}
        {activeTab === 'submissions' && (
          <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Clean Form */}
            <div className="lg:col-span-6 bg-white p-6 border border-neutral-200 rounded-lg space-y-5">
              <div>
                <h3 className="text-base font-medium text-neutral-900">
                  Submit milestone deliverable
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Provide your version-controlled repository and notes for professor review.
                </p>
              </div>

              {submitSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-md flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{submitSuccessMsg}</span>
                </div>
              )}

              {enrolledApps.length === 0 ? (
                <div className="text-xs text-neutral-500 py-6">
                  Please enroll in an internship track before submitting project deliverables.
                </div>
              ) : (
                <form onSubmit={handleSubmitMilestone} className="space-y-4 text-xs">
                  {/* Select Program */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Target cohort
                    </label>
                    <select
                      value={selectedApp?.id}
                      onChange={(e) => {
                        const app = applications.find((a) => a.id === e.target.value);
                        if (app) setSelectedApp(app);
                      }}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-xs text-neutral-900 outline-none focus:border-neutral-900"
                    >
                      {enrolledApps.map((app) => (
                        <option key={app.id} value={app.id}>
                          {app.internship?.title} ({app.internship?.domain})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Select Milestone Week */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Milestone module
                    </label>
                    <select
                      value={subWeek}
                      onChange={(e) => setSubWeek(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md bg-white text-xs text-neutral-900 outline-none focus:border-neutral-900"
                    >
                      {(selectedApp?.internship?.syllabus || [1, 2, 3, 4]).map((m: any, i: number) => {
                        const weekNum = typeof m === 'object' ? m.week : i + 1;
                        const title = typeof m === 'object' ? m.title : `Week ${weekNum}`;
                        return (
                          <option key={weekNum} value={weekNum}>
                            Week {String(weekNum).padStart(2, '0')}: {title}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* GitHub URL */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      GitHub repository URL <span className="text-neutral-900 font-bold">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={subGithub}
                      onChange={(e) => setSubGithub(e.target.value)}
                      placeholder="https://github.com/username/project-repo"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md text-xs font-mono text-neutral-900 outline-none focus:border-neutral-900"
                    />
                    <span className="text-[11px] text-neutral-400 mt-1 block font-mono">
                      Ensure repository is public or accessible to Dr. Thorne.
                    </span>
                  </div>

                  {/* Live Demo URL */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Live deployment URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={subLive}
                      onChange={(e) => setSubLive(e.target.value)}
                      placeholder="https://demo-service.vercel.app"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md text-xs font-mono text-neutral-900 outline-none focus:border-neutral-900"
                    />
                  </div>

                  {/* Implementation Notes */}
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1.5">
                      Implementation notes & architecture highlights
                    </label>
                    <textarea
                      rows={4}
                      value={subNotes}
                      onChange={(e) => setSubNotes(e.target.value)}
                      placeholder="Summarize key architectural trade-offs, benchmarks, or specific modules where you would like feedback..."
                      className="w-full p-3 border border-neutral-300 rounded-md text-xs text-neutral-900 outline-none focus:border-neutral-900 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium tracking-wide transition rounded-md disabled:opacity-50"
                  >
                    {submitting ? 'Submitting deliverable…' : 'Submit milestone for review'}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Submission Activity Log */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs text-neutral-500 px-1">
                Recent submissions & feedback ({submissions.length})
              </div>

              {submissions.length === 0 ? (
                <div className="p-8 text-center bg-white border border-neutral-200 text-xs text-neutral-500 rounded-lg">
                  No submissions recorded yet. Use the form to submit your Week 1 repository.
                </div>
              ) : (
                <div className="border border-neutral-200 divide-y divide-neutral-200 bg-white rounded-lg">
                  {submissions.map((sub) => (
                    <div key={sub.id} className="p-4 space-y-2 text-xs">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xs text-neutral-400">
                            W{String(sub.weekNumber).padStart(2, '0')}
                          </span>
                          <span className="font-medium text-neutral-900">
                            {sub.taskTitle}
                          </span>
                        </div>

                        <div>
                          {sub.status === 'approved' ? (
                            <span className="text-emerald-800 font-medium">
                              Approved · <span className="font-mono">{sub.score}/100</span>
                            </span>
                          ) : sub.status === 'revision_requested' ? (
                            <span className="text-amber-800 font-medium">
                              Revision needed
                            </span>
                          ) : (
                            <span className="text-neutral-500">
                              Under review
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="font-mono text-xs">
                        <a
                          href={sub.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-neutral-800 hover:underline inline-flex items-center gap-1"
                        >
                          <span>{sub.githubUrl.replace('https://github.com/', '')}</span>
                          <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
                        </a>
                      </div>

                      {sub.notes && (
                        <p className="text-xs text-neutral-600 italic pt-0.5">
                          Student notes: {sub.notes}
                        </p>
                      )}

                      {sub.feedback && (
                        <div className="mt-2 pl-3 border-l-2 border-neutral-300 py-0.5 space-y-0.5">
                          <div className="flex items-center justify-between text-neutral-700">
                            <span className="font-medium">Dr. Thorne feedback</span>
                            <span className="font-mono text-neutral-500">{sub.score}/100</span>
                          </div>
                          <p className="text-neutral-600 italic">
                            &ldquo;{sub.feedback}&rdquo;
                          </p>
                        </div>
                      )}

                      <div className="text-[11px] font-mono text-neutral-400 text-right pt-1">
                        Submitted {formatDate(sub.submittedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: Credentials & Certificates View */}
        {/* ========================================================= */}
        {activeTab === 'certificates' && (
          <div className="pt-8 space-y-6">
            <div className="bg-white border border-neutral-200 p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 border-b border-neutral-100">
                <div>
                  <h3 className="text-base font-medium text-neutral-900">
                    Official certificates of completion
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Issued with cryptographically unique credential IDs upon passing all weekly milestones.
                  </p>
                </div>
              </div>

              {certificates.length === 0 ? (
                <div className="py-12 text-center text-xs text-neutral-500 space-y-2">
                  <div className="font-medium text-neutral-700">
                    No certificates issued yet
                  </div>
                  <p className="max-w-md mx-auto text-neutral-500 leading-relaxed">
                    Complete all weekly milestone deliverables in your enrolled internship track. Once Dr. Thorne reviews and approves your final project, your certificate will be generated and signed here.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-6 border border-neutral-200 bg-[#fafaf9] flex flex-col justify-between space-y-6 rounded-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-mono text-neutral-700">
                            {cert.credentialId}
                          </span>
                          <span className="text-neutral-800 font-medium">
                            Grade: {cert.grade}
                          </span>
                        </div>

                        <div>
                          <div className="text-xs text-neutral-500">
                            Research Internship
                          </div>
                          <h4 className="text-base font-medium text-neutral-950 mt-0.5">
                            {cert.internshipTitle}
                          </h4>
                        </div>

                        <p className="text-xs text-neutral-600">
                          Conferred to <span className="font-medium text-neutral-900">{cert.studentName}</span> on {cert.issueDate}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                        <span className="text-xs text-neutral-500">
                          Signatory: {cert.instructorName}
                        </span>

                        <button
                          onClick={() => setActiveCertificate(cert)}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium tracking-wide transition flex items-center gap-1.5 rounded-md"
                        >
                          <Download className="w-3 h-3" />
                          <span>Preview PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: Application & Payment Tracker */}
        {/* ========================================================= */}
        {activeTab === 'tracker' && (
          <div className="pt-8 space-y-6">
            <div className="bg-white border border-neutral-200 p-6 space-y-6 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-neutral-100">
                <div>
                  <h3 className="text-base font-medium text-neutral-900">
                    Enrollment, billing & credential ledger
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Track enrollment status, fee verification, and credential eligibility.
                  </p>
                </div>
              </div>

              <div className="border border-neutral-200 divide-y divide-neutral-200 rounded-lg">
                {applications.map((app) => {
                  const isPaid = app.paymentStatus === 'paid';
                  const isCompleted = app.status === 'completed';

                  return (
                    <div key={app.id} className="p-5 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-xs text-neutral-500">
                            {app.internship?.domain} · Applied {formatDate(app.appliedAt)}
                          </span>
                          <h4 className="text-sm font-medium text-neutral-900">
                            {app.internship?.title}
                          </h4>
                        </div>

                        <div>
                          {!isPaid ? (
                            <button
                              onClick={() => setPendingPaymentInternship(app.internship)}
                              className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-medium tracking-wide transition rounded-md"
                            >
                              Complete payment ({formatCurrency(app.internship?.price || 0)})
                            </button>
                          ) : (
                            <span className="text-xs text-emerald-800 inline-flex items-center gap-1.5 font-medium">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                              Payment verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Clean Linear Milestone Stepper (Responsive 2-col on mobile, 4-col on desktop) */}
                      <div className="pt-2">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="border-t-2 border-neutral-900 pt-2 space-y-0.5">
                            <span className="text-neutral-900 font-medium block">1. Application</span>
                            <span className="text-[11px] text-neutral-500 block">Submitted</span>
                          </div>
                          <div className={`border-t-2 pt-2 space-y-0.5 ${isPaid ? 'border-neutral-900' : 'border-amber-500'}`}>
                            <span className={`font-medium block ${isPaid ? 'text-neutral-900' : 'text-amber-800'}`}>2. Payment</span>
                            <span className="text-[11px] text-neutral-500 block">{isPaid ? 'Cleared' : 'Pending'}</span>
                          </div>
                          <div className={`border-t-2 pt-2 space-y-0.5 ${isPaid ? 'border-neutral-900' : 'border-neutral-200'}`}>
                            <span className={`font-medium block ${isPaid ? 'text-neutral-900' : 'text-neutral-400'}`}>3. Milestones</span>
                            <span className="text-[11px] text-neutral-400 block">{isPaid ? 'In progress' : 'Locked'}</span>
                          </div>
                          <div className={`border-t-2 pt-2 space-y-0.5 ${isCompleted ? 'border-neutral-900' : 'border-neutral-200'}`}>
                            <span className={`font-medium block ${isCompleted ? 'text-neutral-900' : 'text-neutral-400'}`}>4. Credential</span>
                            <span className="text-[11px] text-neutral-400 block">{isCompleted ? 'Issued' : 'Pending'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Details Snippet */}
                      {app.paymentDetails && (
                        <div className="p-3 bg-neutral-50 border border-neutral-200 flex flex-wrap items-center justify-between text-xs text-neutral-600 gap-2 rounded-md">
                          <div>
                            <span className="text-neutral-500">Transaction ID: </span>
                            <span className="font-mono text-neutral-900">{app.paymentDetails.transactionId}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Method: </span>
                            <span className="text-neutral-800">{app.paymentDetails.method}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500">Amount: </span>
                            <span className="text-neutral-900 font-medium">{formatCurrency(app.paymentDetails.amount)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          certificate={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}

      {/* Payment Gateway Modal */}
      {pendingPaymentInternship && (
        <PaymentModal
          internship={pendingPaymentInternship}
          user={user}
          onClose={() => setPendingPaymentInternship(null)}
          onSuccess={() => {
            loadStudentData();
          }}
        />
      )}
    </div>
  );
};

export default StudentDashboardView;
