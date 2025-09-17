/*
  # Add email configuration

  This migration adds a secure way to store email configuration settings
  that can be accessed by our edge functions.

  1. New Table
    - email_config: Stores SMTP and email configuration
    - Only accessible by service role
  
  2. Security
    - RLS enabled and restricted to service role only
*/

-- Create a table to store email configuration
CREATE TABLE IF NOT EXISTS email_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  smtp_hostname text NOT NULL,
  smtp_username text NOT NULL,
  smtp_password text NOT NULL,
  admin_email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE email_config ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access this table
CREATE POLICY "Service role can manage email config" ON email_config
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert the initial configuration
INSERT INTO email_config (
  smtp_hostname,
  smtp_username,
  smtp_password,
  admin_email
) VALUES (
  'smtp.gmail.com',
  'your.email@gmail.com', -- Replace with your Gmail
  'your-app-password',    -- Replace with your Gmail App Password
  'your.email@gmail.com'  -- Replace with admin email
);

-- Function to get email config
CREATE OR REPLACE FUNCTION get_email_config()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  config_record email_config;
BEGIN
  SELECT * INTO config_record FROM email_config LIMIT 1;
  RETURN json_build_object(
    'smtp_hostname', config_record.smtp_hostname,
    'smtp_username', config_record.smtp_username,
    'smtp_password', config_record.smtp_password,
    'admin_email', config_record.admin_email
  );
END;
$$;