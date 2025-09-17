/*
  # Add demo user and employee record
  
  1. Changes
     - Creates a demo user in auth.users
     - Creates corresponding employee record
     - Sets up initial data for testing
  
  2. Security
     - Maintains existing RLS policies
     - Only accessible by service role
*/

-- Create demo user in auth.users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'demo@example.com',
  crypt('demo123', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"John Doe"}',
  false,
  'authenticated'
) ON CONFLICT (id) DO NOTHING;

-- Create employee record for demo user
INSERT INTO employees (
  id,
  full_name,
  designation,
  department,
  join_date,
  leave_balance
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'John Doe',
  'UI/UX Designer',
  'Design',
  CURRENT_DATE - INTERVAL '6 months',
  20
) ON CONFLICT (id) DO NOTHING;