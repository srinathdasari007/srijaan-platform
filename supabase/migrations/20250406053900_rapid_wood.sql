/*
  # Update email configuration with new receiver email

  1. Changes
     - Updates admin email address for receiving contact form submissions
     - Maintains existing SMTP configuration
  
  2. Security
     - Maintains existing RLS policies
     - Only accessible by service role
*/

UPDATE email_config
SET 
  admin_email = 'new.email@example.com',  -- Replace this with your desired email address
  updated_at = now()
WHERE id = (SELECT id FROM email_config LIMIT 1);