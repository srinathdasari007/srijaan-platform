/*
  # Update admin email address
  
  1. Changes
     - Updates the admin email address for receiving contact form submissions
  
  2. Security
     - Maintains existing RLS policies
     - Only accessible by service role
*/

UPDATE email_config
SET 
  admin_email = 'marketing.srijaan@gmail.com',
  updated_at = now()
WHERE id = (SELECT id FROM email_config LIMIT 1);