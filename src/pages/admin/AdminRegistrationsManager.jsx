// src/pages/admin/AdminRegistrationsManager.jsx
import React, { useState, useEffect } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  Download,
  Calendar,
  BookOpen,
  User,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  AlertCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { supabase, isSupabaseConfigured } from '../../lib/supabaseClient';

export default function AdminRegistrationsManager() {
  const [activeTab, setActiveTab] = useState('meetup'); // 'meetup', 'program', 'mentorship'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data sets
  const [meetupRegs, setMeetupRegs] = useState([]);
  const [programRegs, setProgramRegs] = useState([]);
  const [mentorshipRegs, setMentorshipRegs] = useState([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      setLoading(false);
      setError('Supabase is not configured in .env.');
      return;
    }

    try {
      // 1. Fetch Meetup Registrations
      const { data: mData, error: mError } = await supabase
        .from('registrations')
        .select(`
          id,
          user_name,
          user_email,
          user_phone,
          status,
          is_checked_in,
          created_at,
          meetup_id,
          meetup (
            id,
            title,
            start_date_time,
            venue
          )
        `)
        .order('created_at', { ascending: false });

      if (mData) {
        setMeetupRegs(
          mData.map((r) => ({
            id: r.id,
            name: r.user_name || 'Participant',
            email: r.user_email || '—',
            phone: r.user_phone || '—',
            eventTitle: r.meetup?.title || 'Meetup Event',
            venue: r.meetup?.venue || '—',
            status: r.status || (r.is_checked_in ? 'checked_in' : 'registered'),
            createdAt: r.created_at,
            raw: r,
          }))
        );
      }

      // 2. Fetch Program Registrations
      const { data: pData, error: pError } = await supabase
        .from('program_registrations')
        .select(`
          id,
          user_name,
          user_email,
          user_mobile,
          status,
          submitted_at,
          created_at,
          answers,
          programs (
            id,
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (pData) {
        setProgramRegs(
          pData.map((r) => ({
            id: r.id,
            name: r.user_name || 'Builder',
            email: r.user_email || '—',
            phone: r.user_mobile || '—',
            eventTitle: r.programs?.title || 'Program Track',
            venue: 'Virtual / Campus',
            status: r.status || 'submitted',
            createdAt: r.submitted_at || r.created_at,
            answers: r.answers,
            raw: r,
          }))
        );
      }

      // 3. Fetch Mentorship Registrations
      const { data: mentData, error: mentError } = await supabase
        .from('mentorship_registrations')
        .select(`
          id,
          status,
          role,
          created_at,
          mentorship_programs (
            id,
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (mentData) {
        setMentorshipRegs(
          mentData.map((r) => ({
            id: r.id,
            name: 'Mentorship Candidate',
            email: '—',
            phone: '—',
            eventTitle: r.mentorship_programs?.title || 'Mentorship Program',
            venue: 'Online Cohort',
            status: r.status || 'pending',
            createdAt: r.created_at,
            raw: r,
          }))
        );
      }
    } catch (err) {
      console.error('[AdminRegistrations] Error loading registrations:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Determine current active dataset
  const currentDataset =
    activeTab === 'meetup'
      ? meetupRegs
      : activeTab === 'program'
      ? programRegs
      : mentorshipRegs;

  const filteredRegistrations = currentDataset.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.eventTitle.toLowerCase().includes(q);

    const matchStatus =
      statusFilter === 'all' ||
      r.status.toLowerCase() === statusFilter.toLowerCase();

    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage) || 1;
  const paginatedList = filteredRegistrations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export to CSV functionality
  const handleExportCSV = () => {
    if (filteredRegistrations.length === 0) return;

    const headers = ['Name', 'Email', 'Event / Program', 'Status', 'Registered At'];
    const rows = filteredRegistrations.map((r) => [
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.eventTitle.replace(/"/g, '""')}"`,
      `"${r.status.replace(/"/g, '""')}"`,
      `"${r.createdAt ? new Date(r.createdAt).toISOString() : ''}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hackhere_${activeTab}_registrations.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout
      title="Registrations & Cohort Roster"
      subtitle="Examine event submissions, evaluate team applications, and export rosters securely."
    >
      {/* TABS SELECTOR */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#263640] pb-4">
        {[
          { id: 'meetup', label: 'Meetups & Hackathons', count: meetupRegs.length, icon: Calendar },
          { id: 'program', label: 'Program Challenges', count: programRegs.length, icon: BookOpen },
          { id: 'mentorship', label: 'Mentorship Cohorts', count: mentorshipRegs.length, icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setCurrentPage(1);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? 'bg-[#61C8D4] text-[#080B10] shadow-md shadow-cyan-950/40'
                  : 'bg-[#111820] text-[#8CA2AD] hover:text-white border border-[#263640]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#080B10] text-[#61C8D4]' : 'bg-[#080B10] text-[#8CA2AD]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-[#111820] border border-[#263640] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8CA2AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by participant name, email, or event title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#080B10] border border-[#263640] text-white text-xs placeholder:text-[#8CA2AD] focus:outline-none focus:border-[#61C8D4]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-[#080B10] border border-[#263640] text-xs font-mono text-[#DCE8EB] focus:outline-none focus:border-[#61C8D4]"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="checked_in">Checked In</option>
              <option value="pending">Pending</option>
            </select>

            <button
              onClick={handleExportCSV}
              disabled={filteredRegistrations.length === 0}
              className="px-4 py-2 rounded-xl bg-[#263640] hover:bg-[#344550] text-white text-xs font-mono font-bold flex items-center gap-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Download className="w-3.5 h-3.5 text-[#61C8D4]" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-[#8CA2AD]">
          <span>
            Displaying {filteredRegistrations.length} registrations in current filter view
          </span>
        </div>
      </div>

      {/* REGISTRATIONS TABLE */}
      <div className="bg-[#111820] border border-[#263640] rounded-3xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#080B10] border-b border-[#263640] text-[10px] font-mono uppercase tracking-wider text-[#8CA2AD]">
              <tr>
                <th className="py-3.5 px-5">Participant</th>
                <th className="py-3.5 px-4">Event / Program</th>
                <th className="py-3.5 px-4">Venue / Mode</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Registered At</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#263640]/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8CA2AD] font-mono">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto text-[#61C8D4] mb-2" />
                    <span>Loading registration rosters...</span>
                  </td>
                </tr>
              ) : paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8CA2AD] font-mono">
                    No registrations found matching the specified parameters.
                  </td>
                </tr>
              ) : (
                paginatedList.map((reg) => (
                  <tr key={reg.id} className="hover:bg-[#080B10]/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <div>
                        <p className="font-semibold text-white truncate">{reg.name}</p>
                        <p className="text-[11px] font-mono text-[#8CA2AD] truncate">{reg.email}</p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="text-white font-medium truncate max-w-[220px]">{reg.eventTitle}</p>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#8CA2AD]">
                      {reg.venue}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-block text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#080B10] text-[#61C8D4] border border-[#263640]">
                        {reg.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-[#8CA2AD]">
                      {reg.createdAt ? new Date(reg.createdAt).toLocaleDateString() : '—'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedRecord(reg)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#263640] bg-[#080B10] hover:border-[#61C8D4] hover:text-[#61C8D4] text-[#DCE8EB] text-xs font-mono font-semibold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="p-4 bg-[#080B10] border-t border-[#263640] flex items-center justify-between text-xs font-mono text-[#8CA2AD]">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg border border-[#263640] hover:bg-[#111820] disabled:opacity-30 disabled:cursor-not-allowed text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg border border-[#263640] hover:bg-[#111820] disabled:opacity-30 disabled:cursor-not-allowed text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* REGISTRATION DETAIL MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#111820] border-2 border-[#263640] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#263640] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#61C8D4] font-bold">
                  Registration Metadata
                </span>
                <h3 className="text-lg font-serif text-white mt-0.5">{selectedRecord.name}</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 rounded-xl text-[#8CA2AD] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="p-3 rounded-xl bg-[#080B10] border border-[#263640] space-y-1.5">
                <p className="text-[11px] font-mono text-[#8CA2AD]">Event / Program:</p>
                <p className="text-white font-semibold">{selectedRecord.eventTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#080B10] border border-[#263640]">
                  <p className="text-[11px] font-mono text-[#8CA2AD]">Email Address:</p>
                  <p className="text-white truncate font-mono text-[11px] mt-0.5">{selectedRecord.email}</p>
                </div>
                <div className="p-3 rounded-xl bg-[#080B10] border border-[#263640]">
                  <p className="text-[11px] font-mono text-[#8CA2AD]">Mobile / Phone:</p>
                  <p className="text-white font-mono text-[11px] mt-0.5">{selectedRecord.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#080B10] border border-[#263640]">
                  <p className="text-[11px] font-mono text-[#8CA2AD]">Status:</p>
                  <p className="text-[#61C8D4] font-mono uppercase font-bold text-[11px] mt-0.5">
                    {selectedRecord.status}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#080B10] border border-[#263640]">
                  <p className="text-[11px] font-mono text-[#8CA2AD]">Submission Time:</p>
                  <p className="text-white font-mono text-[11px] mt-0.5">
                    {selectedRecord.createdAt
                      ? new Date(selectedRecord.createdAt).toLocaleString()
                      : '—'}
                  </p>
                </div>
              </div>

              {selectedRecord.answers && (
                <div className="p-3 rounded-xl bg-[#080B10] border border-[#263640] space-y-1">
                  <p className="text-[11px] font-mono text-[#8CA2AD]">Custom Form Responses:</p>
                  <pre className="text-[10px] font-mono text-[#DCE8EB] overflow-x-auto p-2 rounded bg-[#111820] border border-[#263640]">
                    {JSON.stringify(selectedRecord.answers, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-5 py-2.5 rounded-full bg-[#263640] hover:bg-[#344550] text-white text-xs font-mono font-bold transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
