// src/lib/auditLogger.js
import { supabase, isSupabaseConfigured } from './supabaseClient';

/**
 * Log a sensitive administrative action directly to public.audit_logs in Supabase.
 * NOTE: As per security guidelines, client-side/localStorage fallback is strictly disabled.
 * If the audit_logs table is missing or unconfigured, it reports unavailable rather than pretending.
 */
export async function logAdminAction(action, targetType = 'system', targetId = null, metadata = {}) {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      unavailable: true,
      error: 'Supabase credentials are not configured in environment.'
    };
  }

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return {
        success: false,
        error: 'Unauthenticated: Cannot record administrative audit log without an active session.'
      };
    }

    const { error: insertError } = await supabase
      .from('audit_logs')
      .insert({
        admin_user_id: user.id,
        admin_email: user.email,
        action,
        target_type: targetType,
        target_id: targetId ? String(targetId) : null,
        metadata: metadata || {},
        created_at: new Date().toISOString()
      });

    if (insertError) {
      // 42P01 is PostgreSQL code for relation does not exist
      const isMissingTable = insertError.code === '42P01' || insertError.message?.includes('does not exist');
      console.warn('[AuditLogger] Could not record audit log to database:', insertError.message);
      return {
        success: false,
        unavailable: isMissingTable,
        error: isMissingTable ? 'audit_logs table not found in database.' : insertError.message
      };
    }

    return { success: true };
  } catch (err) {
    console.error('[AuditLogger] Unexpected error logging admin action:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Fetch audit logs from public.audit_logs
 */
export async function fetchAuditLogs(limit = 50, offset = 0) {
  if (!isSupabaseConfigured) {
    return {
      success: false,
      unavailable: true,
      data: [],
      error: 'Supabase is not configured.'
    };
  }

  try {
    const { data, error, count } = await supabase
      .from('audit_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      const isMissingTable = error.code === '42P01' || error.message?.includes('does not exist');
      return {
        success: false,
        unavailable: isMissingTable,
        data: [],
        count: 0,
        error: isMissingTable ? 'audit_logs table has not been created yet in Supabase.' : error.message
      };
    }

    return {
      success: true,
      unavailable: false,
      data: data || [],
      count: count || (data ? data.length : 0)
    };
  } catch (err) {
    return {
      success: false,
      unavailable: false,
      data: [],
      count: 0,
      error: err.message
    };
  }
}
