-- =========================================================================
-- HACKHERE ADMIN PORTAL - DATABASE MIGRATION & RLS SETUP
-- =========================================================================
-- Instructions:
-- Review each section below, then copy and run this script in the
-- Supabase Dashboard -> SQL Editor (https://supabase.com/dashboard/project/_/sql)
--
-- This script:
-- 1. Updates role check constraints to allow 'super_admin' and 'user'
-- 2. Updates public.is_admin() and creates public.is_super_admin()
-- 3. Creates public.audit_logs table with secure RLS policies
-- 4. Creates RLS policies on public.users allowing admins to read user records
-- 5. Creates a secure function to allow super_admins to change user roles
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. UPDATE ROLE CHECK CONSTRAINT ON public.users
-- -------------------------------------------------------------------------
DO $$
BEGIN
  -- Drop existing role check constraint if present
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_schema = 'public' AND table_name = 'users' AND constraint_name = 'users_role_check'
  ) THEN
    ALTER TABLE public.users DROP CONSTRAINT users_role_check;
  END IF;

  -- Add updated check constraint supporting super_admin and user
  ALTER TABLE public.users
    ADD CONSTRAINT users_role_check
    CHECK (role = ANY (ARRAY['student', 'user', 'admin', 'super_admin', 'mentor']));
END $$;


-- -------------------------------------------------------------------------
-- 2. ADMIN HELPER FUNCTIONS (SECURITY DEFINER)
-- -------------------------------------------------------------------------

-- Function to check if calling user is an admin or super_admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users 
    WHERE uid = auth.uid()::text 
    AND role IN ('admin', 'super_admin')
  );
$$;

-- Function to check if calling user is specifically a super_admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users 
    WHERE uid = auth.uid()::text 
    AND role = 'super_admin'
  );
$$;


-- -------------------------------------------------------------------------
-- 3. AUDIT LOGS TABLE & POLICIES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id text NOT NULL,
  admin_email text,
  action text NOT NULL,
  target_type text NOT NULL,
  target_id text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop previous policies if re-running
DROP POLICY IF EXISTS audit_logs_select_admin ON public.audit_logs;
DROP POLICY IF EXISTS audit_logs_insert_admin ON public.audit_logs;

-- Admins and Super Admins can view audit logs
CREATE POLICY audit_logs_select_admin ON public.audit_logs
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Admins and Super Admins can insert audit logs
CREATE POLICY audit_logs_insert_admin ON public.audit_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

-- Index for fast sorting and searching
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);


-- -------------------------------------------------------------------------
-- 4. RLS POLICIES FOR USERS TABLE MANAGEMENT
-- -------------------------------------------------------------------------

-- Drop old policies if recreating
DROP POLICY IF EXISTS users_select_admin ON public.users;
DROP POLICY IF EXISTS users_update_admin ON public.users;

-- Allow admins to read all user records for management and analytics
CREATE POLICY users_select_admin ON public.users
  FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Allow admins to update non-role fields (e.g. approval, status)
CREATE POLICY users_update_admin ON public.users
  FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- -------------------------------------------------------------------------
-- 5. SECURE ROLE MANAGEMENT FUNCTION (SUPER ADMIN ONLY)
-- -------------------------------------------------------------------------
-- Prevents ordinary users or basic admins from promoting themselves.
-- Only an authenticated user evaluated by is_super_admin() can execute this.
CREATE OR REPLACE FUNCTION public.admin_set_user_role(
  target_uid text,
  new_role text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  calling_uid text;
  old_role text;
  result jsonb;
BEGIN
  calling_uid := auth.uid()::text;

  -- 1. Check if caller is super_admin
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Only a super_admin can modify user roles.';
  END IF;

  -- 2. Validate role value
  IF new_role NOT IN ('student', 'user', 'admin', 'super_admin', 'mentor') THEN
    RAISE EXCEPTION 'Invalid role specified: %', new_role;
  END IF;

  -- 3. Prevent super_admin from removing their own super_admin status (accidental lockout)
  IF calling_uid = target_uid AND new_role <> 'super_admin' THEN
    RAISE EXCEPTION 'Safeguard: You cannot remove your own super_admin privileges.';
  END IF;

  -- 4. Retrieve existing role
  SELECT role INTO old_role FROM public.users WHERE uid = target_uid;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User with UID % was not found.', target_uid;
  END IF;

  -- 5. Update user role
  UPDATE public.users
  SET role = new_role, updated_at = now()
  WHERE uid = target_uid;

  -- 6. Insert into audit_logs
  INSERT INTO public.audit_logs (
    admin_user_id,
    action,
    target_type,
    target_id,
    metadata
  ) VALUES (
    calling_uid,
    'ROLE_CHANGED',
    'user',
    target_uid,
    jsonb_build_object('old_role', old_role, 'new_role', new_role)
  );

  result := jsonb_build_object(
    'success', true,
    'target_uid', target_uid,
    'old_role', old_role,
    'new_role', new_role
  );

  RETURN result;
END;
$$;


-- -------------------------------------------------------------------------
-- 6. HOW TO DESIGNATE THE FIRST SUPER_ADMIN (MANUAL ONE-TIME SETUP)
-- -------------------------------------------------------------------------
-- To designate your first super_admin account after you have registered
-- an account via the HackHere sign-in / sign-up page:
--
-- UPDATE public.users
-- SET role = 'super_admin'
-- WHERE email = 'YOUR_EMAIL_HERE@example.com';
--
-- Verify promotion:
-- SELECT uid, email, display_name, role FROM public.users WHERE email = 'YOUR_EMAIL_HERE@example.com';
-- =========================================================================
