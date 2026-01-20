'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Settings,
  Save,
  RefreshCw,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2,
  Search,
  Shield,
  Loader2,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Json } from '@/integrations/supabase/types';

interface SiteSettings {
  site_name: string;
  site_tagline: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  social_facebook: string;
  social_twitter: string;
  social_instagram: string;
  social_linkedin: string;
  seo_title_template: string;
  seo_default_description: string;
  google_verification: string;
  features_enabled: {
    payments: boolean;
    newsletter: boolean;
    virtualCandles: boolean;
  };
}

const defaultSettings: SiteSettings = {
  site_name: 'Jewish Obituary',
  site_tagline: 'Honoring Jewish Lives',
  contact_email: '',
  contact_phone: '',
  address: '',
  social_facebook: '',
  social_twitter: '',
  social_instagram: '',
  social_linkedin: '',
  seo_title_template: '%s | Jewish Obituary',
  seo_default_description: 'A dignified platform for honoring and remembering Jewish lives.',
  google_verification: '',
  features_enabled: {
    payments: false,
    newsletter: true,
    virtualCandles: true,
  },
};

export default function SettingsEditPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('key, value');

      if (error) throw error;

      if (data) {
        const loadedSettings = { ...defaultSettings };
        data.forEach((item) => {
          const key = item.key as keyof SiteSettings;
          if (key in loadedSettings) {
            try {
              // Parse JSON values
              const value = typeof item.value === 'string' ? JSON.parse(item.value as string) : item.value;
              (loadedSettings[key] as SiteSettings[typeof key]) = value;
            } catch {
              // If not JSON, use as-is
              (loadedSettings[key] as SiteSettings[typeof key]) = item.value as SiteSettings[typeof key];
            }
          }
        });
        setSettings(loadedSettings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to load settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      // Update each setting
      const updates = Object.entries(settings).map(async ([key, value]) => {
        const jsonValue: Json = typeof value === 'object' ? value as Json : value;

        const { error } = await supabase
          .from('admin_settings')
          .upsert(
            {
              key,
              value: jsonValue,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'key' }
          );
        if (error) throw error;
      });

      await Promise.all(updates);

      toast({
        title: 'Success',
        description: 'Settings saved successfully',
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings className="h-8 w-8" />
            Edit Site Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your site settings and branding
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/settings">
            <Button variant="outline">Back to Settings</Button>
          </Link>
          <Button variant="outline" onClick={fetchSettings}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General
            </CardTitle>
            <CardDescription>
              Basic site information and branding
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name}
                  onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  placeholder="Jewish Obituary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site_tagline">Tagline</Label>
                <Input
                  id="site_tagline"
                  value={settings.site_tagline}
                  onChange={(e) => setSettings({ ...settings, site_tagline: e.target.value })}
                  placeholder="Honoring Jewish Lives"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Contact Information
            </CardTitle>
            <CardDescription>
              Contact details displayed on the site
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_email">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email Address
                </Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  placeholder="contact@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone Number
                </Label>
                <Input
                  id="contact_phone"
                  value={settings.contact_phone}
                  onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
                  placeholder="(555) 555-5555"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">
                <MapPin className="h-4 w-4 inline mr-1" />
                Address
              </Label>
              <Textarea
                id="address"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="123 Main Street, City, State 12345"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Social Media
            </CardTitle>
            <CardDescription>
              Social media profile links
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="social_facebook">Facebook URL</Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook}
                  onChange={(e) => setSettings({ ...settings, social_facebook: e.target.value })}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_twitter">Twitter/X URL</Label>
                <Input
                  id="social_twitter"
                  value={settings.social_twitter}
                  onChange={(e) => setSettings({ ...settings, social_twitter: e.target.value })}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_instagram">Instagram URL</Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram}
                  onChange={(e) => setSettings({ ...settings, social_instagram: e.target.value })}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="social_linkedin">LinkedIn URL</Label>
                <Input
                  id="social_linkedin"
                  value={settings.social_linkedin}
                  onChange={(e) => setSettings({ ...settings, social_linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SEO Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              SEO Settings
            </CardTitle>
            <CardDescription>
              Search engine optimization configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo_title_template">Title Template</Label>
              <Input
                id="seo_title_template"
                value={settings.seo_title_template}
                onChange={(e) => setSettings({ ...settings, seo_title_template: e.target.value })}
                placeholder="%s | Jewish Obituary"
              />
              <p className="text-sm text-muted-foreground">
                Use %s as placeholder for page title. Example: &quot;Home | Jewish Obituary&quot;
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo_default_description">Default Meta Description</Label>
              <Textarea
                id="seo_default_description"
                value={settings.seo_default_description}
                onChange={(e) => setSettings({ ...settings, seo_default_description: e.target.value })}
                placeholder="A dignified platform for honoring and remembering Jewish lives."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google_verification">Google Site Verification Code</Label>
              <Input
                id="google_verification"
                value={settings.google_verification}
                onChange={(e) => setSettings({ ...settings, google_verification: e.target.value })}
                placeholder="google-site-verification=XXXXXXXXXXXX"
              />
              <p className="text-sm text-muted-foreground">
                The content value from Google Search Console verification meta tag
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Toggles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Feature Toggles
            </CardTitle>
            <CardDescription>
              Enable or disable site features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Payments</Label>
                <p className="text-sm text-muted-foreground">
                  Enable payment processing for products and services
                </p>
              </div>
              <Switch
                checked={settings.features_enabled.payments}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    features_enabled: { ...settings.features_enabled, payments: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Show newsletter signup forms
                </p>
              </div>
              <Switch
                checked={settings.features_enabled.newsletter}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    features_enabled: { ...settings.features_enabled, newsletter: checked },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Virtual Candles</Label>
                <p className="text-sm text-muted-foreground">
                  Allow visitors to light virtual memorial candles
                </p>
              </div>
              <Switch
                checked={settings.features_enabled.virtualCandles}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    features_enabled: { ...settings.features_enabled, virtualCandles: checked },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fixed save button at bottom */}
      <div className="sticky bottom-0 bg-background border-t py-4 mt-6 -mx-8 px-8">
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={fetchSettings}>
            Reset Changes
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
