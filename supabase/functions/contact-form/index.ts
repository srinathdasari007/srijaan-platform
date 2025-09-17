import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      throw new Error('Name, email, and message are required');
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Store in Supabase as backup
    const { error: dbError } = await supabaseClient
      .from('contact_submissions')
      .insert([{ 
        name, 
        email, 
        message,
        status: 'new'
      }]);

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Google Sheets Integration
    const GOOGLE_SHEETS_URL = Deno.env.get('GOOGLE_SHEETS_WEBHOOK_URL');
    
    if (GOOGLE_SHEETS_URL) {
      try {
        const sheetsResponse = await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
          }),
        });

        if (!sheetsResponse.ok) {
          console.error('Google Sheets error:', await sheetsResponse.text());
        } else {
          console.log('Successfully sent to Google Sheets');
        }
      } catch (sheetsError) {
        console.error('Error sending to Google Sheets:', sheetsError);
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Message sent successfully',
        timestamp: new Date().toISOString()
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});