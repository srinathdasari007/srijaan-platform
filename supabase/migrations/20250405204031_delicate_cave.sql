/*
  # Update email configuration

  1. Changes
    - Updates the email configuration with the new Gmail credentials
    - Ensures secure handling of SMTP credentials
  
  2. Security
    - Maintains existing RLS policies
    - Only accessible via service role
*/

UPDATE email_config
SET 
  smtp_username = 'your.email@gmail.com',  -- Replace with your Gmail address
  smtp_password = 'your-app-password',     -- Replace with the App Password you just generated
  admin_email = 'your.email@gmail.com',    -- Replace with your Gmail address
  updated_at = now()
WHERE id = (SELECT id FROM email_config LIMIT 1);