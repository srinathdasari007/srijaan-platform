/*
  # Create employee management tables

  1. New Tables
    - `employees`
      - Basic employee information and profile
    - `attendance_logs`
      - Daily attendance records including check-in/out times
    - `break_logs`
      - Break time tracking
    - `leave_requests`
      - Leave applications and tracking
    - `documents`
      - Employee documents and certificates
    - `learning_progress`
      - Training and course completion tracking

  2. Security
    - Enable RLS on all tables
    - Policies to ensure employees can only access their own data
*/

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  designation text,
  department text,
  join_date date DEFAULT CURRENT_DATE,
  leave_balance int DEFAULT 20,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Attendance logs
CREATE TABLE IF NOT EXISTS attendance_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id),
  check_in timestamptz,
  check_out timestamptz,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Break logs
CREATE TABLE IF NOT EXISTS break_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id),
  start_time timestamptz,
  end_time timestamptz,
  attendance_log_id uuid REFERENCES attendance_logs(id),
  created_at timestamptz DEFAULT now()
);

-- Leave requests
CREATE TABLE IF NOT EXISTS leave_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id),
  leave_type text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'pending',
  reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id),
  title text NOT NULL,
  type text NOT NULL,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Learning progress
CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id uuid REFERENCES employees(id),
  course_name text NOT NULL,
  status text DEFAULT 'in_progress',
  completion_percentage int DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE break_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;

-- Policies for employees table
CREATE POLICY "Users can view own profile" ON employees
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON employees
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policies for attendance_logs
CREATE POLICY "Users can view own attendance" ON attendance_logs
  FOR SELECT TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Users can create own attendance" ON attendance_logs
  FOR INSERT TO authenticated
  WITH CHECK (employee_id = auth.uid());

-- Policies for break_logs
CREATE POLICY "Users can view own breaks" ON break_logs
  FOR SELECT TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Users can manage own breaks" ON break_logs
  FOR ALL TO authenticated
  USING (employee_id = auth.uid())
  WITH CHECK (employee_id = auth.uid());

-- Policies for leave_requests
CREATE POLICY "Users can view own leaves" ON leave_requests
  FOR SELECT TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Users can manage own leaves" ON leave_requests
  FOR ALL TO authenticated
  USING (employee_id = auth.uid())
  WITH CHECK (employee_id = auth.uid());

-- Policies for documents
CREATE POLICY "Users can view own documents" ON documents
  FOR SELECT TO authenticated
  USING (employee_id = auth.uid());

-- Policies for learning_progress
CREATE POLICY "Users can view own progress" ON learning_progress
  FOR SELECT TO authenticated
  USING (employee_id = auth.uid());

CREATE POLICY "Users can update own progress" ON learning_progress
  FOR UPDATE TO authenticated
  USING (employee_id = auth.uid())
  WITH CHECK (employee_id = auth.uid());