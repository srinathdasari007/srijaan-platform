/*
  # Update email configuration with new password

  Updates the SMTP password in the email_config table with a new value.
  This ensures the old password is no longer stored in the database.
*/

UPDATE email_config
SET 
  smtp_password = 'your-new-app-password',  -- Replace with your new App Password
  updated_at = now()
WHERE id = (SELECT id FROM email_config LIMIT 1);