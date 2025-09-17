/*
  # Add support for multiple email recipients
  
  1. Changes
     - Adds a secondary_emails column to store additional recipient emails
     - Updates the existing email configuration with multiple recipients
  
  2. Security
     - Maintains existing RLS policies
     - Only accessible by service role
*/

-- Add new column for secondary email recipients
ALTER TABLE email_config 
ADD COLUMN IF NOT EXISTS secondary_emails text[] DEFAULT '{}';

-- Update the configuration with multiple recipients
UPDATE email_config
SET 
  secondary_emails = ARRAY['second.email@example.com'],  -- Replace with your second email
  updated_at = now()
WHERE id = (SELECT id FROM email_config LIMIT 1);