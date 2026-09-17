// src/pages/admin/AdminAuditLogsPage.jsx
import React, { useState, useEffect } from 'react';
import {
  ScrollText,
  Search,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Calendar,
  User,
  Shield,
  Clock,
  ChevronLeft,
  ChevronRight,
  Database,
  Terminal,
} from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { fetchAuditLogs } from '../../lib/auditLogger';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const loadLogs = async () => {
    setLoading(true);
    setErrorMessage(null);
    setUnavailable(false);

    try {
      const result = await fetchAuditLogs(100);
      if (result.unavailable) {
        setUnavailable(true);
        setErrorMessage(result.error);
        setLogs([]);
      } else if (!result.success) {
        setErrorMessage(result.error);
        setLogs([]);
      } else {
        setLogs(result.data || []);
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      (log.admin_email || '').toLowerCase().includes(q) ||
      (log.action || '').toLowerCase().includes(q) ||
      (log.target_type || '').toLowerCase().includes(q) ||
      (log.target_id || '').toLowerCase().includes(q);

    const matchAction =
      actionFilter === 'all' ||
      log.action?.toLowerCase() === actionFilter.toLowerCase();

    return matchSearch && matchAction;
  });

  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout
      title="Security & System Audit Logs"
      subtitle="Cryptographically tracked administrative operations recorded in the database."
    >
      {/* AUDIT LOG UNAVAILABLE BANNER (IF TABLE NOT MIGRATED) */}
      {unavailable && (
        <div className="bg-[#111820] border-2 border-amber-800/60 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-700/50 flex items-center justify-center text-amber-400 shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-serif text-white">
                Audit Logging Database Table Not Detected
              </h3>
              <p className="text-xs text-[#8CA2AD] leading-relaxed">
                As per enterprise security rules, client-side fallback storage is strictly disabled. The database table <code className="text-[#61C8D4] font-mono">public.audit_logs</code> has not yet been executed in your Supabase project.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#080B10] border border-[#263640] space-y-2 text-xs font-mono text-[#DCE8EB]">
            <p className="text-[#8CA2AD]">To activate persistent audit logging:</p>
            <p className="text-[#61C8D4]">
              1. Open your Supabase Dashboard → SQL Editor.
            </p>
            <p className="text-[#61C8D4]">
              2. Execute the migration script generated in <span className="text-white underline">supabase_admin_setup.sql</span>.
            </p>
          </div>

          <div className="pt-1 flex items-center gap-3">
            <button
              onClick={loadLogs}
              className="px-4 py-2 rounded-xl bg-[#263640] hover:bg-[#344550] text-white font-mono text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Check Database Again</span>
            </button>
          </div>
        </div>
      )}

      {/* FILTERS AND SEARCH */}
      {!unavailable && (
        <div className="bg-[#111820] border border-[#263640] rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8CA2AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit logs by admin email, action, or target ID..."
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
                value={actionFilter}
                onChange={(e) => {
                  setActionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl bg-[#080B10] border border-[#263640] text-xs font-mono text-[#DCE8EB] focus:outline-none focus:border-[#61C8D4]"
              >
                <option value="all">All Actions</option>
                <option value="ADMIN_LOGIN">ADMIN_LOGIN</option>
                <option value="ROLE_CHANGED">ROLE_CHANGED</option>
                <option value="ADMIN_LOGOUT">ADMIN_LOGOUT</option>
                <option value="USER_UPDATED">USER_UPDATED</option>
              </select>

              <button
                onClick={loadLogs}
                disabled={loading}
                className="p-2.5 rounded-xl bg-[#080B10] border border-[#263640] hover:border-[#61C8D4] text-[#DCE8EB] transition-colors"
                title="Refresh Audit Records"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#61C8D4]' : ''}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-[#8CA2AD]">
            <span>Displaying {filteredLogs.length} audit records</span>
            <span className="text-emerald-400 font-bold">● Database Auditing Live</span>
          </div>
        </div>
      )}

      {/* AUDIT LOG TABLE */}
      {!unavailable && (
        <div className="bg-[#111820] border border-[#263640] rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#080B10] border-b border-[#263640] text-[10px] font-mono uppercase tracking-wider text-[#8CA2AD]">
                <tr>
                  <th className="py-3.5 px-5">Timestamp</th>
                  <th className="py-3.5 px-4">Admin Principal</th>
                  <th className="py-3.5 px-4">Action</th>
                  <th className="py-3.5 px-4">Target Type</th>
                  <th className="py-3.5 px-4">Metadata Payload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#263640]/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#8CA2AD] font-mono">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto text-[#61C8D4] mb-2" />
                      <span>Reading audit logs from database...</span>
                    </td>
                  </tr>
                ) : paginatedLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-[#8CA2AD] font-mono">
                      No audit operations recorded matching search criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#080B10]/50 transition-colors">
                      <td className="py-3.5 px-5 font-mono text-[11px] text-[#8CA2AD] whitespace-nowrap">
                        {log.created_at ? new Date(log.created_at).toLocaleString() : '—'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-white truncate block">
                          {log.admin_email || 'System'}
                        </span>
                        <span className="font-mono text-[10px] text-[#8CA2AD] truncate block select-all">
                          {log.admin_user_id}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${
                            log.action?.includes('LOGIN')
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800'
                              : log.action?.includes('ROLE')
                              ? 'bg-purple-950/60 text-purple-300 border-purple-800'
                              : 'bg-[#080B10] text-[#61C8D4] border-[#263640]'
                          }`}
                        >
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#DCE8EB]">
                        {log.target_type} {log.target_id && `(${log.target_id})`}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[10px] text-[#8CA2AD]">
                        <pre className="max-w-xs truncate bg-[#080B10] p-1.5 rounded border border-[#263640]">
                          {typeof log.metadata === 'object'
                            ? JSON.stringify(log.metadata)
                            : String(log.metadata || '{}')}
                        </pre>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

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
      )}
    </AdminLayout>
  );
}
