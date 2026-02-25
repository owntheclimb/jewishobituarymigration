import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate request (supports internal header and scheduled cron bearer token)
    const apiKey = req.headers.get('x-api-key');
    const authorization = req.headers.get('authorization');
    const internalApiKey = Deno.env.get('INTERNAL_API_KEY');
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
    const isInternalRequest = !!internalApiKey && apiKey === internalApiKey;
    const isCronBearerRequest = !!anonKey && authorization === `Bearer ${anonKey}`;

    if (!isInternalRequest && !isCronBearerRequest) {
      console.error('Unauthorized access attempt');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Keep-alive health check running...");

    // Perform a simple query to keep the database active
    const { count, error } = await supabase
      .from('obituaries')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Health check query error:', error);
      throw error;
    }

    console.log(`Health check successful. Database active. Obituaries count: ${count}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Health check successful",
        timestamp: new Date().toISOString(),
        count: count
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in keep-alive function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
