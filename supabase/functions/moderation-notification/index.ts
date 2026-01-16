import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

// Input validation schema
const notificationSchema = z.object({
  obituaryId: z.string().uuid(),
  itemType: z.enum(['media_assets', 'memories', 'guestbook']),
  authorName: z.string().min(1).max(200),
  content: z.string().max(5000),
});

// HTML escaping function
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
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

    // Validate input
    const rawData = await req.json();
    const validatedData = notificationSchema.parse(rawData);
    const { obituaryId, itemType, authorName, content } = validatedData;
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    console.log("Processing moderation notification for:", { obituaryId, itemType, authorName });

    // Get obituary details and owner information using secure function
    const { data: obituary, error: obituaryError } = await supabase
      .from('obituaries')
      .select('full_name, user_id')
      .eq('id', obituaryId)
      .single();

    if (obituaryError) {
      console.error('Error fetching obituary:', obituaryError);
      throw obituaryError;
    }

    // Get profile data using secure function
    const { data: profileData, error: profileError } = await supabase
      .rpc('get_profile_for_notification', { obituary_user_id: obituary.user_id });

    if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw profileError;
    }

    if (!profileData || profileData.length === 0 || !profileData[0]?.email) {
      console.log('No owner email found for obituary:', obituaryId);
      return new Response(
        JSON.stringify({ message: "No owner email found" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const ownerEmail = profileData[0].email;
    const ownerName = escapeHtml(profileData[0].full_name || 'there');
    const deceasedName = escapeHtml(obituary.full_name);

    // Format content preview (escape HTML)
    const rawContentPreview = content.length > 150 
      ? content.substring(0, 150) + '...' 
      : content;
    const contentPreview = escapeHtml(rawContentPreview);

    const itemTypeDisplay = escapeHtml(
      itemType === 'media_assets' ? 'photo/video upload' :
      itemType === 'memories' ? 'memory' : 'guestbook entry'
    );
    const escapedAuthorName = escapeHtml(authorName);

    // Send notification email
    const emailResponse = await resend.emails.send({
      from: "Neshama Memorial <notifications@resend.dev>",
      to: [ownerEmail],
      subject: `New ${itemTypeDisplay} awaiting approval - ${deceasedName}'s memorial`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #7A2CC6; margin-bottom: 20px;">New Content Awaiting Approval</h2>
          
          <p>Hello ${ownerName},</p>
          
          <p>Someone has submitted a new ${itemTypeDisplay} for <strong>${deceasedName}'s memorial</strong> that requires your approval.</p>
          
          <div style="background-color: #f9fafb; border-left: 4px solid #7A2CC6; padding: 15px; margin: 20px 0;">
            <p><strong>From:</strong> ${escapedAuthorName}</p>
            <p><strong>Type:</strong> ${itemTypeDisplay}</p>
            <p><strong>Content preview:</strong></p>
            <p style="font-style: italic; color: #6b7280;">"${contentPreview}"</p>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${Deno.env.get('SUPABASE_URL')?.replace('supabase.co', 'lovable.app')}/obituary/${obituaryId}/moderation" 
               style="background-color: #7A2CC6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Review & Approve
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
            You can also visit the memorial page and click "Customize Memorial" to manage these settings.
          </p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />
          <p style="color: #9ca3af; font-size: 12px;">
            This notification was sent because you own this memorial page. 
            You can adjust notification settings in your memorial customization panel.
          </p>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error('Error sending notification email:', emailResponse.error);
      throw emailResponse.error;
    }

    console.log('Moderation notification sent successfully to:', ownerEmail);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Notification sent successfully",
        recipient: ownerEmail
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in moderation notification function:", error);
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