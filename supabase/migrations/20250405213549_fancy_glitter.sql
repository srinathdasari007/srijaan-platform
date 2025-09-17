/*
  # Update email configuration with Gmail credentials
  
  1. Changes
     - Updates SMTP configuration with actual Gmail credentials
     - Sets admin email for receiving contact form submissions
  
  2. Security
     - Maintains existing RLS policies
     - Only accessible by service role
*/

UPDATE email_config
SET 
  smtp_hostname = 'smtp.gmail.com',
  smtp_username = 'marketing.srijaan@gmail.com',
  smtp_password = 'nmzc cwyv lvfb whbj',
  admin_email = 'marketing.srijaan@gmail.com',
  updated_at = now()
WHERE id = (SELECT id FROM email_config LIMIT 1);