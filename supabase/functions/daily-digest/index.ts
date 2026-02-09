import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authenticate request
    const apiKey = req.headers.get('x-api-key');
    if (apiKey !== Deno.env.get('INTERNAL_API_KEY')) {
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

    console.log("Starting daily digest job...");

    // Get all active subscriptions with user and community data using secure function
    const { data: subscriptions, error: subError } = await supabase
      .rpc('get_profiles_for_digest');

    if (subError) {
      console.error('Error fetching subscriptions:', subError);
      throw subError;
    }

    console.log(`Found ${subscriptions?.length || 0} subscriptions to process`);

    // Get yesterday's date range
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStart = new Date(yesterday);
    yesterdayStart.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);

    let emailsSent = 0;

    for (const subscription of subscriptions || []) {
      try {
        const community = {
          id: subscription.community_id,
          name: subscription.community_name,
          type: subscription.community_type,
          slug: subscription.community_slug
        };
        const profile = {
          email: subscription.user_email,
          full_name: subscription.user_full_name
        };

        if (!community || !profile || !profile.email) {
          console.log(`Skipping subscription ${subscription.subscription_id} - missing data`);
          continue;
        }

        // Get obituaries for this community from yesterday
        const { data: obituaryIds } = await supabase
          .from('community_links')
          .select('obituary_id')
          .eq('community_id', community.id);

        if (!obituaryIds || obituaryIds.length === 0) {
          continue;
        }

        const { data: obituaries, error: obError } = await supabase
          .from('obituaries')
          .select('id, full_name, date_of_birth, date_of_death, created_at')
          .in('id', obituaryIds.map(link => link.obituary_id))
          .eq('published', true)
          .eq('visibility', 'public')
          .gte('created_at', yesterdayStart.toISOString())
          .lte('created_at', yesterdayEnd.toISOString());

        if (obError) {
          console.error(`Error fetching obituaries for community ${community.id}:`, obError);
          continue;
        }

        if (!obituaries || obituaries.length === 0) {
          console.log(`No new obituaries for community ${community.name}`);
          continue;
        }

        // Format obituary list for email
        const obituaryList = obituaries.map(obit => {
          const birthYear = obit.date_of_birth ? new Date(obit.date_of_birth).getFullYear() : '';
          const deathYear = obit.date_of_death ? new Date(obit.date_of_death).getFullYear() : '';
          const years = birthYear && deathYear ? ` (${birthYear} - ${deathYear})` : '';
          
          return `• ${obit.full_name}${years} - <a href="https://jewishobituary.com/obituary/${obit.id}" style="color: #2563eb; text-decoration: none;">Read obituary</a>`;
        }).join('\n');

        const communityIcon = community.type === 'city' ? '🏙️' : 
                           community.type === 'highschool' ? '🎓' : 
                           community.type === 'college' ? '🏫' : '🎖️';

        // Send email
        const emailResponse = await resend.emails.send({
          from: "Jewish Obituary <noreply@jewishobituary.com>",
          to: [profile.email],
          subject: `New obituaries in ${community.name}`,
          html: `
            <h2>${communityIcon} ${community.name} - Daily Digest</h2>
            <p>Hello ${profile.full_name || 'there'},</p>
            <p>There ${obituaries.length === 1 ? 'was' : 'were'} ${obituaries.length} new obituar${obituaries.length === 1 ? 'y' : 'ies'} published yesterday in ${community.name}:</p>
            
            <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-radius: 8px;">
              ${obituaryList}
            </div>
            
            <p>Our thoughts are with the families and friends during this time.</p>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
            <p style="color: #6b7280; font-size: 14px;">
              You're receiving this because you subscribed to updates for ${community.name}. 
              <a href="https://jewishobituary.com/communities" style="color: #2563eb;">Manage your subscriptions</a>
            </p>
          `,
        });

        if (emailResponse.error) {
          console.error(`Error sending email to ${profile.email}:`, emailResponse.error);
          continue;
        }

        // Update last_sent_at
        await supabase
          .from('subscriptions')
          .update({ last_sent_at: new Date().toISOString() })
          .eq('id', subscription.subscription_id);

        emailsSent++;
        console.log(`Sent digest to ${profile.email} for ${community.name} (${obituaries.length} obituaries)`);

      } catch (error) {
        console.error(`Error processing subscription ${subscription.subscription_id}:`, error);
      }
    }

    console.log(`Daily digest job completed. Sent ${emailsSent} emails.`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Sent ${emailsSent} digest emails`,
        processed: subscriptions?.length || 0
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in daily digest function:", error);
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