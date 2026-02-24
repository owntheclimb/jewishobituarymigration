import { Resend } from "npm:resend@2.0.0";

interface HookUser {
  email: string;
  email_new?: string;
}

interface HookEmailData {
  token: string;
  token_hash: string;
  redirect_to?: string;
  email_action_type: string;
  site_url: string;
  token_new?: string;
  token_hash_new?: string;
}

interface HookPayload {
  user: HookUser;
  email_data?: HookEmailData;
  email?: HookEmailData;
}

const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");
const rawHookSecret = Deno.env.get("SEND_EMAIL_HOOK_SECRET") ?? "";
const defaultFrom = "Jewish Obituary <noreply@jewishobituary.com>";
const fromAddress = Deno.env.get("AUTH_EMAIL_FROM") ?? defaultFrom;
const siteName = Deno.env.get("AUTH_EMAIL_SITE_NAME") ?? "Jewish Obituary";
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const WEBHOOK_TOLERANCE_SECONDS = 300;

function escapeHtml(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;",
  };
  return input.replace(/[&<>"']/g, (char) => map[char]);
}

function buildVerifyUrl(tokenHash: string, actionType: string, redirectTo: string): string {
  const url = new URL(`${supabaseUrl}/auth/v1/verify`);
  url.searchParams.set("token", tokenHash);
  url.searchParams.set("type", actionType);
  url.searchParams.set("redirect_to", redirectTo);
  return url.toString();
}

function getSubject(actionType: string): string {
  switch (actionType) {
    case "signup":
      return `Confirm your ${siteName} account`;
    case "recovery":
      return `Reset your ${siteName} password`;
    case "magiclink":
      return `Your ${siteName} magic link`;
    case "invite":
      return `You are invited to ${siteName}`;
    case "email_change":
      return `Confirm your ${siteName} email change`;
    case "reauthentication":
      return `Confirm your ${siteName} reauthentication`;
    default:
      return `${siteName} account action required`;
  }
}

function getActionLabel(actionType: string): string {
  switch (actionType) {
    case "signup":
      return "confirm your account";
    case "recovery":
      return "reset your password";
    case "magiclink":
      return "sign in";
    case "invite":
      return "accept your invitation";
    case "email_change":
      return "confirm your email change";
    case "reauthentication":
      return "confirm this security action";
    default:
      return "continue";
  }
}

function renderEmailHtml(actionType: string, verifyUrl: string, otpToken?: string): string {
  const actionLabel = escapeHtml(getActionLabel(actionType));
  const safeUrl = escapeHtml(verifyUrl);
  const safeSiteName = escapeHtml(siteName);

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #111827; margin-bottom: 12px;">${safeSiteName}</h2>
      <p style="color: #374151; line-height: 1.5;">Please use the button below to ${actionLabel}.</p>
      <div style="margin: 24px 0;">
        <a href="${safeUrl}" style="display: inline-block; background: #7a2cc6; color: #ffffff; padding: 12px 18px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Continue
        </a>
      </div>
      ${otpToken
        ? `<p style="color:#374151; line-height:1.5;">If prompted, your code is: <strong>${escapeHtml(otpToken)}</strong></p>`
        : ""}
      <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin-top: 24px;">
        If you did not request this, you can safely ignore this email.
      </p>
    </div>
  `;
}

async function sendAuthEmail(to: string, subject: string, html: string) {
  const response = await resend.emails.send({
    from: fromAddress,
    to: [to],
    subject,
    html,
  });
  if (response.error) {
    throw new Error(response.error.message || "Failed to send auth email");
  }
}

function getHeader(headers: Record<string, string>, key: string): string | undefined {
  return headers[key.toLowerCase()] || headers[key] || undefined;
}

function textToBytes(input: string): Uint8Array {
  return new TextEncoder().encode(input);
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i += 1) {
    out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return out === 0;
}

function getCandidateKeys(secret: string): Uint8Array[] {
  const variants = new Set<string>();
  if (secret) variants.add(secret);
  if (secret.startsWith("v1,")) variants.add(secret.replace(/^v1,/, ""));
  variants.add(secret.replace(/^v1,whsec_/, ""));
  if (secret.startsWith("v1,")) variants.add(secret.replace(/^v1,/, "").replace(/^whsec_/, ""));

  const keys: Uint8Array[] = [];
  const seen = new Set<string>();

  for (const value of variants) {
    if (!value) continue;

    const utf8 = textToBytes(value);
    const utf8Id = Array.from(utf8).join(",");
    if (!seen.has(utf8Id)) {
      keys.push(utf8);
      seen.add(utf8Id);
    }

    try {
      const decoded = atob(value);
      const decodedBytes = new Uint8Array(decoded.length);
      for (let i = 0; i < decoded.length; i += 1) {
        decodedBytes[i] = decoded.charCodeAt(i);
      }
      const decodedId = Array.from(decodedBytes).join(",");
      if (!seen.has(decodedId)) {
        keys.push(decodedBytes);
        seen.add(decodedId);
      }
    } catch {
      // Not valid base64; ignore decoded variant.
    }
  }

  return keys;
}

async function computeSignature(keyBytes: Uint8Array, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, textToBytes(message));
  return bytesToBase64(new Uint8Array(signature));
}

async function verifyWebhookRequest(payloadText: string, headersInput: Headers): Promise<void> {
  const headers = Object.fromEntries(headersInput.entries());
  const msgId = getHeader(headers, "webhook-id");
  const msgTimestamp = getHeader(headers, "webhook-timestamp");
  const msgSignature = getHeader(headers, "webhook-signature");

  if (!msgId || !msgTimestamp || !msgSignature) {
    throw new Error("Missing required headers");
  }

  const ts = Number.parseInt(msgTimestamp, 10);
  if (Number.isNaN(ts)) {
    throw new Error("Invalid webhook timestamp");
  }

  const now = Math.floor(Date.now() / 1000);
  if (now - ts > WEBHOOK_TOLERANCE_SECONDS) {
    throw new Error("Message timestamp too old");
  }
  if (ts > now + WEBHOOK_TOLERANCE_SECONDS) {
    throw new Error("Message timestamp too new");
  }

  const passedSignatures = msgSignature
    .split(" ")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [version, signature] = entry.split(",");
      if (version === "v1") return signature;
      return "";
    })
    .filter(Boolean);

  if (passedSignatures.length === 0) {
    throw new Error("No v1 signature provided");
  }

  const signingPayload = `${msgId}.${ts}.${payloadText}`;
  const candidateKeys = getCandidateKeys(rawHookSecret);

  for (const keyBytes of candidateKeys) {
    const expectedSig = await computeSignature(keyBytes, signingPayload);
    for (const passed of passedSignatures) {
      if (safeEqual(expectedSig, passed)) {
        return;
      }
    }
  }

  throw new Error("No matching signature found");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  if (!rawHookSecret) {
    return new Response(
      JSON.stringify({ error: { http_code: 500, message: "Missing SEND_EMAIL_HOOK_SECRET" } }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!supabaseUrl) {
    return new Response(
      JSON.stringify({ error: { http_code: 500, message: "Missing SUPABASE_URL" } }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const payloadText = await req.text();
    await verifyWebhookRequest(payloadText, req.headers);
    const payload = JSON.parse(payloadText) as HookPayload;

    const user = payload.user;
    const emailData = payload.email_data || payload.email;
    if (!emailData) {
      throw new Error("Missing email metadata in hook payload");
    }
    const redirectTo = emailData.redirect_to || emailData.site_url;
    const actionType = emailData.email_action_type;

    if (!user?.email) {
      throw new Error("Missing recipient email");
    }

    // Secure email change can require two different confirmation messages.
    if (
      actionType === "email_change" &&
      user.email_new &&
      emailData.token_hash_new &&
      emailData.token &&
      emailData.token_hash &&
      emailData.token_new
    ) {
      // New email: token_new + token_hash
      const newEmailVerifyUrl = buildVerifyUrl(emailData.token_hash, actionType, redirectTo);
      const newEmailHtml = renderEmailHtml(actionType, newEmailVerifyUrl, emailData.token_new);
      await sendAuthEmail(user.email_new, getSubject(actionType), newEmailHtml);

      // Current email: token + token_hash_new
      const currentEmailVerifyUrl = buildVerifyUrl(emailData.token_hash_new, actionType, redirectTo);
      const currentEmailHtml = renderEmailHtml(actionType, currentEmailVerifyUrl, emailData.token);
      await sendAuthEmail(user.email, getSubject(actionType), currentEmailHtml);
    } else {
      const tokenHash = emailData.token_hash || emailData.token_hash_new || "";
      if (!tokenHash) {
        throw new Error("Missing token hash in send-email hook payload");
      }
      const verifyUrl = buildVerifyUrl(tokenHash, actionType, redirectTo);
      const html = renderEmailHtml(actionType, verifyUrl, emailData.token || emailData.token_new);
      await sendAuthEmail(user.email, getSubject(actionType), html);
    }

    return new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: {
          http_code: 401,
          message: error?.message || "Invalid webhook request",
        },
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }
});
