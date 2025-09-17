/*
  # Update email configuration with actual credentials
  
  This migration updates the email configuration with real Gmail credentials.
  
  1. Changes
     - Updates SMTP credentials with actual Gmail values
     - Sets admin email for receiving contact form submissions
  
  2. Security
     - Maintains existing RLS policies
     - Only accessible by service role
*/

UPDATE email_config
SET 
  smtp_hostname = 'smtp.gmail.com',
  smtp_username = 'your.actual.email@gmail.com',  -- REPLACE THIS with your Gmail
  smtp_password = 'your-16-char-app-password',    -- REPLACE THIS with your Gmail App Password
  admin_email = 'your.actual.email@gmail.com',    -- REPLACE THIS with your Gmail
  updated_at = now()
WHERE id = (SELECT id FROM email_config LIMIT 1);