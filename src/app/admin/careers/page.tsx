'use client';

import React, { useState, useEffect } from 'react';
import {
  Briefcase, Users, Plus, Pencil, Trash2, CheckCircle2,
  X, ExternalLink, Download, AlertCircle, RefreshCw, Eye
} from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  salary_range: string;
  is_active: boolean;
  created_at: string;
}

interface Application {
  id: number;
  job_id: number | null;
  job_title: string;
  name: string;
  email: string;
  phone: string | null;
  linkedin: string | null;
  portfolio: string | null;
  cover_letter: string | null;
  resume_url: string | null;
  status: 'new' | 'reviewed' | 'interviewing' | 'rejected' | 'hired';
  created_at: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'New', color: '#2563EB', bg: '#EFF6FF' },
  reviewed: { label: 'Reviewed', color: '#D97706', bg: '#FEF3C7' },
  interviewing: { label: 'Interviewing', color: '#7C3AED', bg: '#F5F3FF' },
  hired: { label: 'Hired', color: '#059669', bg: '#ECFDF5' },
  rejected: { label: 'Rejected', color: '#DC2626', bg: '#FEF2F2' },
};

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'applications'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Application filters & selection
  const [appFilter, setAppFilter] = useState('all');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  // Job Modal
  const [jobModal, setJobModal] = useState<{ open: boolean; job: Partial<Job> | null }>({
    open: false,
    job: null,
  });

  const loadData = async () => {
    setLoading(true);
    setError('');
    try {
      const [jobsRes, appsRes] = await Promise.all([
        fetch('/api/admin/careers/jobs'),
        fetch('/api/admin/careers/applications'),
      ]);

      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        if (Array.isArray(jobsData)) setJobs(jobsData);
      }
      if (appsRes.ok) {
        const appsData = await appsRes.json();
        if (Array.isArray(appsData)) setApplications(appsData);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load careers data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save Job (Create or Update)
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobModal.job) return;

    setError('');
    const isEdit = Boolean(jobModal.job.id);
    const url = isEdit ? `/api/admin/careers/jobs/${jobModal.job.id}` : '/api/admin/careers/jobs';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobModal.job),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save job');

      setSuccess(isEdit ? 'Job updated successfully' : 'Job created successfully');
      setJobModal({ open: false, job: null });
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error saving job');
    }
  };

  // Delete Job
  const handleDeleteJob = async (id: number) => {
    if (!confirm('Are you sure you want to delete this job posting?')) return;
    try {
      const res = await fetch(`/api/admin/careers/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete job');
      setSuccess('Job deleted successfully');
      loadData();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error deleting job');
    }
  };

  // Toggle Job Active Status
  const handleToggleActive = async (job: Job) => {
    try {
      const res = await fetch(`/api/admin/careers/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !job.is_active }),
      });
      if (!res.ok) throw new Error('Failed to update job status');
      loadData();
    } catch (err: any) {
      setError(err.message || 'Error updating job status');
    }
  };

  // Update Application Status
  const handleUpdateAppStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/careers/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: status as any } : a))
      );
      if (selectedApp?.id === id) {
        setSelectedApp((prev) => (prev ? { ...prev, status: status as any } : null));
      }
    } catch (err: any) {
      setError(err.message || 'Error updating status');
    }
  };

  // Delete Application
  const handleDeleteApp = async (id: number) => {
    if (!confirm('Are you sure you want to delete this candidate application?')) return;
    try {
      const res = await fetch(`/api/admin/careers/applications/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete application');
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selectedApp?.id === id) setSelectedApp(null);
      setSuccess('Application deleted');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Error deleting application');
    }
  };

  // Export Applications to CSV
  const exportAppsToCSV = () => {
    if (applications.length === 0) return;
    const headers = ['ID', 'Date', 'Candidate Name', 'Email', 'Phone', 'Applied Role', 'Status', 'LinkedIn', 'Portfolio', 'Cover Note'];
    const rows = applications.map((a) => [
      a.id,
      `"${new Date(a.created_at).toISOString().replace('T', ' ').substring(0, 19)}"`,
      `"${(a.name || '').replace(/"/g, '""')}"`,
      `"${(a.email || '').replace(/"/g, '""')}"`,
      `"${(a.phone || '').replace(/"/g, '""')}"`,
      `"${(a.job_title || '').replace(/"/g, '""')}"`,
      `"${(a.status || 'new').replace(/"/g, '""')}"`,
      `"${(a.linkedin || '').replace(/"/g, '""')}"`,
      `"${(a.portfolio || a.resume_url || '').replace(/"/g, '""')}"`,
      `"${(a.cover_letter || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `devops-candidates-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApps = appFilter === 'all'
    ? applications
    : applications.filter((a) => a.status === appFilter);

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Careers & Hiring Portal</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage open positions, review candidate resumes, and track applicants.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'jobs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Open Positions ({jobs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'applications' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Applicants ({applications.length})</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* TAB 1: JOBS MANAGEMENT */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() =>
                setJobModal({
                  open: true,
                  job: {
                    title: '',
                    department: 'Engineering',
                    location: 'Remote',
                    type: 'Full-time',
                    experience: '3+ years',
                    description: '',
                    requirements: [],
                    responsibilities: [],
                    salary_range: '',
                    is_active: true,
                  },
                })
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0B63E5] hover:bg-blue-600 rounded-xl shadow-md shadow-blue-200 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Opening</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="divide-y divide-slate-100">
              {jobs.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">No job openings created yet.</div>
              ) : (
                jobs.map((job) => (
                  <div key={job.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900">{job.title}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            job.is_active
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {job.is_active ? 'Active' : 'Draft / Closed'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[#0B63E5]">{job.department}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        {job.salary_range && (
                          <>
                            <span>•</span>
                            <span className="text-slate-700 font-medium">{job.salary_range}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(job)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-white transition-colors text-slate-600"
                      >
                        {job.is_active ? 'Deactivate' : 'Publish'}
                      </button>
                      <button
                        onClick={() => setJobModal({ open: true, job })}
                        aria-label="Edit job"
                        className="p-2 text-slate-500 hover:text-[#0B63E5] hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        aria-label="Delete job"
                        className="p-2 text-slate-500 hover:text-red-500 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: APPLICATIONS MANAGEMENT */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Status filters */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'new', 'reviewed', 'interviewing', 'hired', 'rejected'].map((st) => (
                <button
                  key={st}
                  onClick={() => setAppFilter(st)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-colors ${
                    appFilter === st
                      ? 'bg-[#0B63E5] text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-[#0B63E5]'
                  }`}
                >
                  {st} (
                  {st === 'all'
                    ? applications.length
                    : applications.filter((a) => a.status === st).length}
                  )
                </button>
              ))}
            </div>

            <button
              onClick={exportAppsToCSV}
              disabled={applications.length === 0}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#0B63E5] hover:text-[#0B63E5] rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5 text-[#0B63E5]" />
              <span>Export Candidates CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Applicant list */}
            <div className="lg:col-span-5 space-y-2">
              {filteredApps.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
                  No applications found for this filter.
                </div>
              ) : (
                filteredApps.map((app) => {
                  const cfg = STATUS_CONFIG[app.status] || STATUS_CONFIG.new;
                  const isSelected = selectedApp?.id === app.id;
                  return (
                    <button
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`w-full text-left bg-white border rounded-2xl p-4 transition-all hover:shadow-md ${
                        isSelected ? 'border-[#0B63E5] shadow-md ring-1 ring-[#0B63E5]' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="font-bold text-sm text-slate-900 truncate">{app.name}</div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ color: cfg.color, backgroundColor: cfg.bg }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-[#0B63E5] truncate">{app.job_title}</div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">{app.email}</div>
                      <div className="text-[10px] text-slate-400 mt-2">
                        {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Applicant details */}
            <div className="lg:col-span-7">
              {!selectedApp ? (
                <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 text-sm">
                  Select a candidate from the left to view profile and application notes.
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900">{selectedApp.name}</h2>
                      <div className="text-sm font-semibold text-[#0B63E5] mt-0.5">
                        Role: {selectedApp.job_title}
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Applied on {new Date(selectedApp.created_at).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteApp(selectedApp.id)}
                      aria-label="Delete application"
                      className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-50 transition-colors"
                      title="Delete application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Candidate contact cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
                      <span className="text-slate-400 font-medium">Email</span>
                      <div>
                        <a href={`mailto:${selectedApp.email}`} className="font-bold text-[#0B63E5] hover:underline">
                          {selectedApp.email}
                        </a>
                      </div>
                    </div>
                    {selectedApp.phone && (
                      <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
                        <span className="text-slate-400 font-medium">Phone</span>
                        <div>
                          <a href={`tel:${selectedApp.phone}`} className="font-bold text-slate-900 hover:underline">
                            {selectedApp.phone}
                          </a>
                        </div>
                      </div>
                    )}
                    {selectedApp.linkedin && (
                      <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
                        <span className="text-slate-400 font-medium">LinkedIn</span>
                        <div>
                          <a
                            href={selectedApp.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-[#0B63E5] hover:underline inline-flex items-center gap-1"
                          >
                            <span>View Profile</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                    {(selectedApp.portfolio || selectedApp.resume_url) && (
                      <div className="bg-slate-50 p-3.5 rounded-xl space-y-1">
                        <span className="text-slate-400 font-medium">Portfolio / Resume</span>
                        <div>
                          <a
                            href={selectedApp.portfolio || selectedApp.resume_url || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-[#0B63E5] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cover note */}
                  {selectedApp.cover_letter && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Candidate Note / Cover Letter
                      </h4>
                      <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 leading-relaxed whitespace-pre-line border border-slate-100">
                        {selectedApp.cover_letter}
                      </div>
                    </div>
                  )}

                  {/* Pipeline Stage Updater */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Update Candidate Stage
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {(['new', 'reviewed', 'interviewing', 'hired', 'rejected'] as const).map((stage) => {
                        const cfg = STATUS_CONFIG[stage];
                        const isCurrent = selectedApp.status === stage;
                        return (
                          <button
                            key={stage}
                            onClick={() => handleUpdateAppStatus(selectedApp.id, stage)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize border transition-all ${
                              isCurrent
                                ? 'border-transparent shadow-sm'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                            style={{
                              backgroundColor: isCurrent ? cfg.color : undefined,
                              color: isCurrent ? '#ffffff' : undefined,
                            }}
                          >
                            {cfg.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* JOB CREATION / EDIT MODAL */}
      {jobModal.open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <button
              onClick={() => setJobModal({ open: false, job: null })}
              aria-label="Close modal"
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleSaveJob} className="space-y-4">
              <h2 className="text-xl font-black text-slate-900">
                {jobModal.job?.id ? 'Edit Job Opening' : 'Post New Job Opening'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Role Title *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Senior Frontend Architect"
                    value={jobModal.job?.title || ''}
                    onChange={(e) =>
                      setJobModal((m) => ({ ...m, job: { ...m.job, title: e.target.value } }))
                    }
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Department *</label>
                  <select
                    value={jobModal.job?.department || 'Engineering'}
                    onChange={(e) =>
                      setJobModal((m) => ({ ...m, job: { ...m.job, department: e.target.value } }))
                    }
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Design">Design</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Product">Product</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Location *</label>
                  <input
                    required
                    type="text"
                    placeholder="Remote / New York"
                    value={jobModal.job?.location || ''}
                    onChange={(e) =>
                      setJobModal((m) => ({ ...m, job: { ...m.job, location: e.target.value } }))
                    }
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Type</label>
                  <select
                    value={jobModal.job?.type || 'Full-time'}
                    onChange={(e) =>
                      setJobModal((m) => ({ ...m, job: { ...m.job, type: e.target.value } }))
                    }
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Salary Range</label>
                  <input
                    type="text"
                    placeholder="$100k - $130k"
                    value={jobModal.job?.salary_range || ''}
                    onChange={(e) =>
                      setJobModal((m) => ({ ...m, job: { ...m.job, salary_range: e.target.value } }))
                    }
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Overview / Description *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summary of the role and scope..."
                  value={jobModal.job?.description || ''}
                  onChange={(e) =>
                    setJobModal((m) => ({ ...m, job: { ...m.job, description: e.target.value } }))
                  }
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Key Responsibilities (one per line)</label>
                  <textarea
                    rows={4}
                    placeholder="Build web applications&#10;Mentor team members&#10;Design APIs"
                    value={jobModal.job?.responsibilities?.join('\n') || ''}
                    onChange={(e) =>
                      setJobModal((m) => ({
                        ...m,
                        job: {
                          ...m.job,
                          responsibilities: e.target.value.split('\n').filter((x) => x.trim()),
                        },
                      }))
                    }
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Requirements (one per line)</label>
                  <textarea
                    rows={4}
                    placeholder="3+ years TypeScript&#10;Experience with Docker&#10;Strong communication skills"
                    value={jobModal.job?.requirements?.join('\n') || ''}
                    onChange={(e) =>
                      setJobModal((m) => ({
                        ...m,
                        job: {
                          ...m.job,
                          requirements: e.target.value.split('\n').filter((x) => x.trim()),
                        },
                      }))
                    }
                    className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#0B63E5]/30 focus:border-[#0B63E5]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="job-active-checkbox"
                  type="checkbox"
                  checked={jobModal.job?.is_active ?? true}
                  onChange={(e) =>
                    setJobModal((m) => ({ ...m, job: { ...m.job, is_active: e.target.checked } }))
                  }
                  className="rounded border-slate-300 text-[#0B63E5] focus:ring-[#0B63E5]"
                />
                <label htmlFor="job-active-checkbox" className="text-xs font-bold text-slate-700">
                  Published and actively accepting applications
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setJobModal({ open: false, job: null })}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-[#0B63E5] hover:bg-blue-600 rounded-xl shadow-md transition-colors"
                >
                  Save Job Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
