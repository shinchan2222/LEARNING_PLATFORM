'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Internship, Application, Submission, Domain } from '@/types';
import { 
  ShieldCheck, 
  Users, 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Award, 
  Search, 
  Filter, 
  RefreshCw,
  Send,
  X,
  FileCheck,
  GraduationCap,
  Mail,
  Building2,
  UserCheck
} from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import { formatCurrency, formatDate } from '@/lib/utils';
import confetti from 'canvas-confetti';

export const AdminDashboardView: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'grading' | 'internships' | 'applicants' | 'users'>('grading');
  
  // Data states
  const [stats, setStats] = useState<any>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState<'all' | 'student' | 'admin'>('all');
  const [loading, setLoading] = useState(true);

  // Grading Modal State
  const [gradingSub, setGradingSub] = useState<any | null>(null);
  const [gradeScore, setGradeScore] = useState<number>(95);
  const [gradeFeedback, setGradeFeedback] = useState<string>('Well architected solution with clean code and robust tests.');
  const [gradeStatus, setGradeStatus] = useState<'approved' | 'revision_requested'>('approved');
  const [submittingGrade, setSubmittingGrade] = useState(false);

  // New Internship Modal State
  const [newInternshipModal, setNewInternshipModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDomain, setNewDomain] = useState<Domain>('AI/ML');
  const [newDuration, setNewDuration] = useState(8);
  const [newFee, setNewFee] = useState(299);
  const [newLevel, setNewLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDescription, setNewDescription] = useState('');
  const [newPrereqs, setNewPrereqs] = useState('Python, Data Structures & Algorithms, Basic Git');
  const [newSeats, setNewSeats] = useState(30);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Stats
      const statsRes = await fetch('/api/admin/stats');
      const statsData = await statsRes.json();
      setStats(statsData.stats);

      // Internships
      const intRes = await fetch('/api/internships');
      const intData = await intRes.json();
      setInternships(intData.internships || []);

      // Submissions
      const subRes = await fetch('/api/submissions');
      const subData = await subRes.json();
      setSubmissions(subData.submissions || []);

      // Applications
      const appRes = await fetch('/api/applications');
      const appData = await appRes.json();
      setApplications(appData.applications || []);

      // Users Directory
      const usersRes = await fetch('/api/admin/users');
      const usersData = await usersRes.json();
      setUsersList(usersData.users || []);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradingSub) return;
    setSubmittingGrade(true);

    try {
      const res = await fetch(`/api/submissions/${gradingSub.id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          score: gradeScore,
          feedback: gradeFeedback,
          status: gradeStatus,
          gradedBy: user?.name || 'Dr. Aris Thorne'
        })
      });

      const data = await res.json();
      if (res.ok) {
        if (data.certificateIssued) {
          try {
            confetti({ particleCount: 80, spread: 60 });
          } catch {}
          alert(`Milestone graded and milestone completion verified! Official certificate issued for ${gradingSub.student?.name}!`);
        }
        setGradingSub(null);
        await fetchAdminData();
      } else {
        alert(data.error || 'Failed to submit grade');
      }
    } catch (err) {
      console.error('Grade error:', err);
      alert('Network error submitting grade');
    } finally {
      setSubmittingGrade(false);
    }
  };

  const handleCreateInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          domain: newDomain,
          durationWeeks: newDuration,
          fee: newFee,
          level: newLevel,
          description: newDescription,
          prerequisites: newPrereqs.split(',').map((p) => p.trim()),
          seatsTotal: newSeats,
          syllabus: [
            {
              week: 1,
              title: `${newDomain} Architecture Foundations`,
              description: 'Setting up baseline development environments and core interfaces.',
              deliverables: 'Architecture design document and repository prototype.'
            },
            {
              week: 2,
              title: 'Implementation & Algorithmic Optimization',
              description: 'Coding primary pipeline and conducting load benchmarks.',
              deliverables: 'Functional service implementation with unit tests.'
            },
            {
              week: 3,
              title: 'Integration, Deployment & Peer Review',
              description: 'Deploying containerized service and performing verification.',
              deliverables: 'Production deployment URL and final technical report.'
            }
          ]
        })
      });

      if (res.ok) {
        setNewInternshipModal(false);
        setNewTitle('');
        setNewDescription('');
        await fetchAdminData();
        alert('New internship cohort published successfully!');
      }
    } catch (err) {
      console.error('Create error:', err);
    }
  };

  const toggleInternshipStatus = async (id: string, currentStatus: boolean) => {
    try {
      await fetch(`/api/internships/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isOpen: !currentStatus })
      });
      await fetchAdminData();
    } catch (err) {
      console.error('Toggle status error:', err);
    }
  };

  const pendingSubmissions = submissions.filter((s) => s.status === 'under_review');
  const gradedSubmissions = submissions.filter((s) => s.status !== 'under_review');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Profile Banner */}
      <div className="bg-slate-900 text-white border-b border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Dr. Aris Thorne"
                className="w-16 h-16 rounded-2xl border-2 border-indigo-400 object-cover shadow-md"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">Dr. Aris Thorne</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Lead Faculty & Principal Investigator
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Stanford Computer Science & Distributed AI Systems Group
                </p>
                <div className="text-[11px] text-slate-400 font-mono mt-1">
                  Faculty Admin Portal • Managing Cohorts, Applications & GitHub Grading
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchAdminData}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors"
                title="Refresh Admin State"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Tuition Collected</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white">
                {formatCurrency(stats?.totalRevenue || 0)}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Active Interns</span>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-indigo-400">
                {stats?.enrolledStudents || 0}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Pending Reviews</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400">
                {pendingSubmissions.length}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/60">
              <div className="flex items-center justify-between text-slate-400 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider">Certified Graduates</span>
                <Award className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400">
                {stats?.completedCertificates || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('grading')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'grading'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GithubIcon className="w-4 h-4" />
            <span>Submission & Grading Hub</span>
            {pendingSubmissions.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                {pendingSubmissions.length} to grade
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('internships')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'internships'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Internship Catalog Manager</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
              {internships.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('applicants')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'applicants'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applicant & Payment Manager</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'users'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>User Accounts & Directory</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px]">
              {usersList.length}
            </span>
          </button>
        </div>

        {/* TAB 1: Grading Hub */}
        {activeTab === 'grading' && (
          <div className="mt-6 space-y-6">
            {/* Pending Submissions Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Pending Milestone Submissions Awaiting Evaluation
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review student code repositories, provide numerical scores and rubric feedback.
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {pendingSubmissions.length} Pending
                </span>
              </div>

              {pendingSubmissions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-xs text-slate-500">
                  All submitted milestones have been reviewed! No pending queues.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingSubmissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl border border-amber-200 bg-amber-50/20 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-mono font-bold">
                            WEEK {sub.weekNumber}
                          </span>
                          <span className="font-bold text-slate-900 text-sm">{sub.student?.name}</span>
                          <span className="text-xs text-slate-400 font-normal">({sub.student?.college})</span>
                        </div>

                        <div className="text-xs font-semibold text-indigo-700">
                          {sub.internship?.title}
                        </div>

                        <div className="text-xs text-slate-600 line-clamp-1">
                          Task: {sub.taskTitle}
                        </div>

                        <div className="flex items-center gap-3 pt-1 text-xs">
                          <a
                            href={sub.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-indigo-600 font-mono hover:underline bg-white px-2 py-0.5 rounded border border-slate-200"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                            <span>Inspect Code Repo</span>
                            <ExternalLink className="w-3 h-3 ml-0.5" />
                          </a>

                          {sub.liveUrl && (
                            <a
                              href={sub.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-slate-700 hover:underline bg-white px-2 py-0.5 rounded border border-slate-200"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live App</span>
                            </a>
                          )}
                        </div>

                        {sub.notes && (
                          <div className="text-[11px] text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                            Student Notes: {sub.notes}
                          </div>
                        )}
                      </div>

                      <div>
                        <button
                          onClick={() => {
                            setGradingSub(sub);
                            setGradeScore(95);
                            setGradeFeedback('Strong architectural design and adherence to requirements.');
                          }}
                          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Grade & Give Feedback</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Previously Graded Submissions Section */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Evaluation History & Completed Milestone Grades
              </h3>

              <div className="space-y-3">
                {gradedSubmissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{sub.student?.name}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-indigo-600 font-medium">{sub.internship?.title}</span>
                        <span className="text-slate-400">•</span>
                        <span className="font-mono text-slate-500">Week {sub.weekNumber}</span>
                      </div>
                      <p className="text-slate-600 mt-1 italic">
                        Feedback: “{sub.feedback}”
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold">
                        Score: {sub.score} / 100
                      </span>
                      <a
                        href={sub.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-white"
                        title="View GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Internship Manager */}
        {activeTab === 'internships' && (
          <div className="mt-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Active Computer Science Cohorts
                  </h3>
                  <p className="text-xs text-slate-500">
                    Publish new research tracks, update seat capacities, or close enrollment.
                  </p>
                </div>
                <button
                  onClick={() => setNewInternshipModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Internship</span>
                </button>
              </div>

              <div className="space-y-4">
                {internships.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                          {item.domain}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {item.isOpen ? 'Active Enrollment' : 'Closed'}
                        </span>
                        <span className="text-xs text-slate-400">
                          {item.seatsLeft} of {item.seatsTotal} seats remaining
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                      <div className="text-right">
                        <span className="text-slate-400 block text-[10px]">Tuition</span>
                        <span className="font-extrabold text-slate-900">{formatCurrency(item.fee)}</span>
                      </div>

                      <button
                        onClick={() => toggleInternshipStatus(item.id, item.isOpen)}
                        className={`px-3 py-1.5 rounded-lg font-semibold text-xs border transition-colors ${
                          item.isOpen
                            ? 'border-rose-300 text-rose-700 hover:bg-rose-50'
                            : 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {item.isOpen ? 'Close Cohort' : 'Open Cohort'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Applicant & Payment Manager */}
        {activeTab === 'applicants' && (
          <div className="mt-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Applicant Roster & Payment Verifications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inspect student payment transactions and enrollment statuses.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">Student Name</th>
                      <th className="py-3 px-3">Internship Program</th>
                      <th className="py-3 px-3">Payment Status</th>
                      <th className="py-3 px-3">Transaction Info</th>
                      <th className="py-3 px-3">Enrollment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{app.user?.name}</div>
                          <div className="text-[11px] text-slate-500">{app.user?.college}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800 line-clamp-1 max-w-xs">{app.internship?.title}</div>
                          <div className="text-[10px] text-indigo-600 font-mono">{app.internship?.domain}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            app.paymentStatus === 'paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            <CheckCircle2 className="w-3 h-3" />
                            {app.paymentStatus === 'paid' ? 'PAID' : 'PENDING'}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-600">
                          {app.paymentDetails ? (
                            <div>
                              <div>{app.paymentDetails.transactionId}</div>
                              <div className="text-[10px] text-slate-400">{app.paymentDetails.method} • {formatCurrency(app.paymentDetails.amount)}</div>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">No payment record</span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            app.status === 'completed'
                              ? 'bg-purple-100 text-purple-800'
                              : app.status === 'enrolled'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: User Accounts & Directory */}
        {activeTab === 'users' && (
          <div className="mt-6 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-indigo-600" />
                    Registered Accounts & User Directory
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Search and inspect all registered student interns, evaluators, and faculty profiles.
                  </p>
                </div>

                {/* Filter and Search Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, email, college..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64 transition-all"
                    />
                    {userSearchQuery && (
                      <button
                        onClick={() => setUserSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Role Filter Chips */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                    <button
                      onClick={() => setUserRoleFilter('all')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        userRoleFilter === 'all'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      All ({usersList.length})
                    </button>
                    <button
                      onClick={() => setUserRoleFilter('student')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        userRoleFilter === 'student'
                          ? 'bg-white text-indigo-600 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Students ({usersList.filter((u) => u.role === 'student').length})
                    </button>
                    <button
                      onClick={() => setUserRoleFilter('admin')}
                      className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                        userRoleFilter === 'admin'
                          ? 'bg-white text-purple-600 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Faculty ({usersList.filter((u) => u.role === 'admin').length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-3">User Profile</th>
                      <th className="py-3 px-3">System Role</th>
                      <th className="py-3 px-3">Academic Institution</th>
                      <th className="py-3 px-3">Email Contact</th>
                      <th className="py-3 px-3">Enrollments & Progress</th>
                      <th className="py-3 px-3">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {usersList
                      .filter((u) => {
                        const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
                        const q = userSearchQuery.toLowerCase().trim();
                        const matchesSearch =
                          !q ||
                          u.name?.toLowerCase().includes(q) ||
                          u.email?.toLowerCase().includes(q) ||
                          u.college?.toLowerCase().includes(q) ||
                          u.id?.toLowerCase().includes(q);
                        return matchesRole && matchesSearch;
                      })
                      .map((account) => (
                        <tr key={account.id} className="hover:bg-slate-50 transition-colors">
                          {/* Profile */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-3">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={account.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + account.name}
                                alt={account.name}
                                className="w-9 h-9 rounded-full object-cover border border-slate-200 bg-slate-100 flex-shrink-0"
                              />
                              <div>
                                <div className="font-bold text-slate-900 flex items-center gap-1.5">
                                  <span>{account.name}</span>
                                </div>
                                <div className="text-[10px] font-mono text-slate-400">
                                  {account.id}
                                </div>
                                {account.headline && (
                                  <div className="text-[11px] text-slate-500 line-clamp-1 max-w-xs">
                                    {account.headline}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Role */}
                          <td className="py-3 px-3">
                            {account.role === 'admin' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                                <ShieldCheck className="w-3 h-3" />
                                Faculty Admin
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <GraduationCap className="w-3 h-3" />
                                Student Intern
                              </span>
                            )}
                          </td>

                          {/* Institution */}
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5 text-slate-700">
                              <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                              <span className="font-medium text-slate-800">
                                {account.college || 'Not specified'}
                              </span>
                            </div>
                          </td>

                          {/* Email */}
                          <td className="py-3 px-3">
                            <a
                              href={`mailto:${account.email}`}
                              className="text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 font-mono text-[11px]"
                            >
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span>{account.email}</span>
                            </a>
                          </td>

                          {/* Cohorts & Progress */}
                          <td className="py-3 px-3">
                            {account.role === 'admin' ? (
                              <span className="text-slate-400 italic text-[11px]">Program Overseer</span>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-900">
                                    {account.enrolledCount || 0} enrolled
                                  </span>
                                  <span className="text-slate-400">·</span>
                                  <span className="text-slate-600">
                                    {account.approvedSubmissionsCount || 0} passed
                                  </span>
                                </div>
                                {account.applications && account.applications.length > 0 && (
                                  <div className="flex flex-wrap gap-1 max-w-xs">
                                    {account.applications.map((app: any) => (
                                      <span
                                        key={app.id}
                                        className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[9px] font-medium text-slate-700 truncate max-w-[150px]"
                                        title={app.internshipTitle}
                                      >
                                        {app.internshipTitle}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Joined Date */}
                          <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                            {account.joinedAt ? formatDate(account.joinedAt) : 'N/A'}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {/* Empty State */}
                {usersList.filter((u) => {
                  const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
                  const q = userSearchQuery.toLowerCase().trim();
                  return (
                    matchesRole &&
                    (!q ||
                      u.name?.toLowerCase().includes(q) ||
                      u.email?.toLowerCase().includes(q) ||
                      u.college?.toLowerCase().includes(q) ||
                      u.id?.toLowerCase().includes(q))
                  );
                }).length === 0 && (
                  <div className="text-center py-12 text-slate-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-slate-600">No user accounts found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try adjusting your search criteria or clearing filters.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Grading Modal */}
      {gradingSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Grade Milestone Submission
                </h3>
              </div>
              <button
                onClick={() => setGradingSub(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGradeSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">{gradingSub.student?.name}</div>
                <div className="text-slate-600">{gradingSub.internship?.title} • Week {gradingSub.weekNumber}</div>
                <div className="pt-1">
                  <a
                    href={gradingSub.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-mono hover:underline flex items-center gap-1"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>{gradingSub.githubUrl}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Score (0 to 100)
                </label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  required
                  value={gradeScore}
                  onChange={(e) => setGradeScore(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm font-bold font-mono outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Evaluation Verdict
                </label>
                <select
                  value={gradeStatus}
                  onChange={(e) => setGradeStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="approved">Approve Milestone (Pass)</option>
                  <option value="revision_requested">Request Revisions</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Faculty Feedback & Code Review Comments
                </label>
                <textarea
                  rows={4}
                  required
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Detail strengths, code smells, or performance notes..."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGradingSub(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingGrade}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submittingGrade ? 'Publishing...' : 'Save & Post Grade'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Internship Modal */}
      {newInternshipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  Publish New CS Research Internship
                </h3>
              </div>
              <button
                onClick={() => setNewInternshipModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInternship} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Internship Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus & Raft Implementations"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Domain</label>
                  <select
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value as Domain)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white outline-none"
                  >
                    <option value="AI/ML">AI/ML</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Data Science">Data Science</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Wks)</label>
                  <input
                    type="number"
                    min={4}
                    max={16}
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tuition ($)</label>
                  <input
                    type="number"
                    min={0}
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Seats</label>
                  <input
                    type="number"
                    min={1}
                    value={newSeats}
                    onChange={(e) => setNewSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide an overview of the technical focus and research methodology..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-xs outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Prerequisites (comma separated)</label>
                <input
                  type="text"
                  placeholder="Python, C++, Linear Algebra"
                  value={newPrereqs}
                  onChange={(e) => setNewPrereqs(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewInternshipModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-xl text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  Publish Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardView;
