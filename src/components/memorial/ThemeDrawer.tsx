import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Palette, Music, Settings2, TreePine, Cloud, Waves, Square } from 'lucide-react';

interface ThemeDrawerProps {
  obituaryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

interface ObituaryTheme {
  background_style: 'forest' | 'sky' | 'ocean' | 'plain';
  accent_color_hex: string;
  music_enabled: boolean;
}

interface ObituarySettings {
  allow_public_uploads: boolean | null;
  require_moderation_for_uploads: boolean | null;
  guestbook_enabled: boolean | null;
  max_video_seconds: number | null;
}

const ThemeDrawer = ({ obituaryId, open, onOpenChange, children }: ThemeDrawerProps) => {
  const { toast } = useToast();
  const [theme, setTheme] = useState<ObituaryTheme>({
    background_style: 'forest',
    accent_color_hex: '#7A2CC6',
    music_enabled: false
  });
  const [settings, setSettings] = useState<ObituarySettings>({
    allow_public_uploads: true,
    require_moderation_for_uploads: true,
    guestbook_enabled: true,
    max_video_seconds: 120
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [obituaryId, open]);

  const fetchData = async () => {
    try {
      // Fetch theme
      const { data: themeData, error: themeError } = await supabase
        .from('obituary_themes')
        .select('*')
        .eq('obituary_id', obituaryId)
        .single();

      if (themeError && themeError.code !== 'PGRST116') {
        throw themeError;
      }

      if (themeData) {
        setTheme({
          background_style: (themeData.background_style as 'forest' | 'sky' | 'ocean' | 'plain') || 'forest',
          accent_color_hex: themeData.accent_color_hex || '#7A2CC6',
          music_enabled: themeData.music_enabled ?? false
        });
      }

      // Fetch settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('obituary_settings')
        .select('*')
        .eq('obituary_id', obituaryId)
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError;
      }

      if (settingsData) {
        setSettings(settingsData);
      }

    } catch (error) {
      console.error('Error fetching theme data:', error);
      toast({
        title: "Error",
        description: "Failed to load memorial settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Save theme
      const { error: themeError } = await supabase
        .from('obituary_themes')
        .upsert({
          obituary_id: obituaryId,
          ...theme
        });

      if (themeError) throw themeError;

      // Save settings
      const { error: settingsError } = await supabase
        .from('obituary_settings')
        .upsert({
          obituary_id: obituaryId,
          ...settings
        });

      if (settingsError) throw settingsError;

      toast({
        title: "Settings saved",
        description: "Memorial customization has been updated",
      });

      onOpenChange(false);

    } catch (error: any) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save settings",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getBackgroundIcon = (style: string) => {
    switch (style) {
      case 'forest': return TreePine;
      case 'sky': return Cloud;
      case 'ocean': return Waves;
      case 'plain': return Square;
      default: return TreePine;
    }
  };

  const backgroundStyles = [
    { value: 'forest', label: 'Forest', description: 'Natural green tones' },
    { value: 'sky', label: 'Sky', description: 'Peaceful blue gradient' },
    { value: 'ocean', label: 'Ocean', description: 'Calming blue waters' },
    { value: 'plain', label: 'Plain', description: 'Simple and clean' }
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Customize Memorial
          </SheetTitle>
          <SheetDescription>
            Personalize the appearance and settings for this memorial page
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="py-8 text-center">
            <div className="animate-pulse text-muted-foreground">Loading settings...</div>
          </div>
        ) : (
          <div className="space-y-6 py-6">
            {/* Theme Section */}
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <h3 className="font-semibold">Appearance</h3>
                </div>

                <div className="space-y-3">
                  <Label>Background Style</Label>
                  <Select
                    value={theme.background_style}
                    onValueChange={(value: any) => setTheme(prev => ({ ...prev, background_style: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundStyles.map((style) => {
                        const Icon = getBackgroundIcon(style.value);
                        return (
                          <SelectItem key={style.value} value={style.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              <div className="text-left">
                                <div className="font-medium">{style.label}</div>
                                <div className="text-xs text-muted-foreground">{style.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="accent-color">Accent Color</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="accent-color"
                      type="color"
                      value={theme.accent_color_hex}
                      onChange={(e) => setTheme(prev => ({ ...prev, accent_color_hex: e.target.value }))}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      value={theme.accent_color_hex}
                      onChange={(e) => setTheme(prev => ({ ...prev, accent_color_hex: e.target.value }))}
                      placeholder="#7A2CC6"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    <Label htmlFor="music-enabled">Background Music</Label>
                  </div>
                  <Switch
                    id="music-enabled"
                    checked={theme.music_enabled}
                    onCheckedChange={(checked) => setTheme(prev => ({ ...prev, music_enabled: checked }))}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Visitors can choose to play peaceful background music
                </p>
              </div>
            </Card>

            {/* Settings Section */}
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  <h3 className="font-semibold">Memorial Settings</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow Public Uploads</Label>
                      <p className="text-xs text-muted-foreground">
                        Let visitors upload photos and videos
                      </p>
                    </div>
                    <Switch
                      checked={settings.allow_public_uploads ?? false}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, allow_public_uploads: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Moderation</Label>
                      <p className="text-xs text-muted-foreground">
                        Review uploads before they appear publicly
                      </p>
                    </div>
                    <Switch
                      checked={settings.require_moderation_for_uploads ?? false}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, require_moderation_for_uploads: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Guest Book</Label>
                      <p className="text-xs text-muted-foreground">
                        Allow visitors to leave condolences
                      </p>
                    </div>
                    <Switch
                      checked={settings.guestbook_enabled ?? false}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, guestbook_enabled: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-video">Max Video Duration (seconds)</Label>
                    <Input
                      id="max-video"
                      type="number"
                      min="30"
                      max="300"
                      value={settings.max_video_seconds ?? 120}
                      onChange={(e) => setSettings(prev => ({ ...prev, max_video_seconds: parseInt(e.target.value) || 120 }))}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3 pt-4">
              <Button onClick={saveChanges} disabled={saving} className="flex-1">
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ThemeDrawer;