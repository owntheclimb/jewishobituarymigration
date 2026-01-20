'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Settings,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const webhookUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/api/webhooks/rb2b`
    : 'https://jewishobituary.com/api/webhooks/rb2b';

  function copyToClipboard(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure integrations and portal settings
        </p>
      </div>

      <div className="space-y-6">
        {/* RB2B Settings */}
        <Card>
          <CardHeader>
            <CardTitle>RB2B Integration</CardTitle>
            <CardDescription>
              Configure RB2B webhook to capture leads in your database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Webhook URL</Label>
              <div className="flex gap-2 mt-1">
                <Input value={webhookUrl} readOnly className="font-mono text-sm" />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(webhookUrl, 'webhook')}
                >
                  {copied === 'webhook' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Add this URL to your RB2B webhook settings to automatically store
                identified visitors in Supabase.
              </p>
            </div>

            <div className="pt-4 border-t">
              <a
                href="https://app.rb2b.com/settings/webhooks"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Configure in RB2B
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Analytics Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Integration</CardTitle>
            <CardDescription>
              External analytics tools connected to this site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Microsoft Clarity</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Session recordings and heatmaps
                </p>
                <p className="text-sm font-mono bg-muted p-2 rounded mb-3">
                  ID: v46eh408ed
                </p>
                <a
                  href="https://clarity.microsoft.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open Dashboard
                  </Button>
                </a>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">PostHog</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Product analytics and event tracking
                </p>
                <p className="text-sm font-mono bg-muted p-2 rounded mb-3 truncate">
                  Key: phc_Y38x...LBEB
                </p>
                <a
                  href="https://us.posthog.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open Dashboard
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supabase Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Database</CardTitle>
            <CardDescription>
              Supabase project information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Project ID</Label>
                <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                  pinwpummsftjsqvszchs
                </p>
              </div>
              <div>
                <Label>Region</Label>
                <p className="text-sm font-mono bg-muted p-2 rounded mt-1">
                  us-east-2
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <a
                href="https://supabase.com/dashboard/project/pinwpummsftjsqvszchs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open Supabase Dashboard
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Environment Variables Reference */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              Required environment variables for this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg p-4 font-mono text-sm space-y-1">
              <p># Supabase</p>
              <p>NEXT_PUBLIC_SUPABASE_URL=https://pinwpummsftjsqvszchs.supabase.co</p>
              <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...</p>
              <p>SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (server only)</p>
              <p></p>
              <p># Analytics (already in code, but can be env vars)</p>
              <p>NEXT_PUBLIC_CLARITY_ID=v46eh408ed</p>
              <p>NEXT_PUBLIC_POSTHOG_KEY=phc_Y38x...LBEB</p>
              <p>NEXT_PUBLIC_RB2B_KEY=LNKLDHE30DOJ</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
