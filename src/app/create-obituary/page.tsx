'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, MapPin, Camera, Heart, GraduationCap, Building, Shield, X, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { z } from 'zod';

import createHeroImageAsset from '@/assets/memorial-tree.jpg';
const createHeroImage = createHeroImageAsset.src;

const obituarySchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(200, "Name must be less than 200 characters"),
  dateOfBirth: z.string().optional(),
  dateOfDeath: z.string().optional(),
  location: z.string().max(200, "Location must be less than 200 characters").optional(),
  city: z.string().max(100, "City must be less than 100 characters").optional(),
  state: z.string().optional(),
  biography: z.string().max(10000, "Biography must be less than 10000 characters").optional(),
  funeralDetails: z.string().max(5000, "Funeral details must be less than 5000 characters").optional(),
  photoUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

const CreateObituary = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    dateOfDeath: '',
    location: '',
    city: '',
    state: '',
    biography: '',
    funeralDetails: '',
    photoUrl: ''
  });
  const [highSchools, setHighSchools] = useState<string[]>([]);
  const [colleges, setColleges] = useState<string[]>([]);
  const [militaryBranches, setMilitaryBranches] = useState<string[]>([]);
  const [newHighSchool, setNewHighSchool] = useState('');
  const [newCollege, setNewCollege] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [settings, setSettings] = useState({
    allowPublicUploads: true,
    guestbookEnabled: true,
    requireModerationForUploads: true,
    maxVideoSeconds: 120,
  });

  const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const serviceAffiliationOptions = [
    'Army',
    'Navy',
    'Air Force',
    'Marines',
    'Coast Guard',
    'Space Force',
    'Hatzalah',
    'Chevra Kadisha Member',
  ];

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const uploadPhotoFile = async (file: File): Promise<string> => {
    if (!user) {
      throw new Error('You must be signed in to upload a photo.');
    }

    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload a valid image file.');
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Image must be smaller than 10MB.');
    }

    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('memorial-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      throw new Error(uploadError.message || 'Photo upload failed.');
    }

    const { data: publicUrlData } = supabase.storage
      .from('memorial-media')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handlePhotoUpload = async () => {
    if (!photoFile) {
      toast({
        title: 'No file selected',
        description: 'Choose an image from your device first.',
        variant: 'destructive',
      });
      return;
    }

    setUploadingPhoto(true);
    try {
      const publicUrl = await uploadPhotoFile(photoFile);
      setFormData(prev => ({ ...prev, photoUrl: publicUrl }));
      toast({
        title: 'Photo uploaded',
        description: 'Your image is uploaded and ready to publish.',
      });
    } catch (error: any) {
      toast({
        title: 'Photo upload failed',
        description: error?.message || 'Please try another image.',
        variant: 'destructive',
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let resolvedPhotoUrl = formData.photoUrl;

      // If the user picked a device photo but didn't upload manually, upload it during submit.
      if (!resolvedPhotoUrl && photoFile) {
        resolvedPhotoUrl = await uploadPhotoFile(photoFile);
        setFormData(prev => ({ ...prev, photoUrl: resolvedPhotoUrl }));
      }

      // Validate form data
      const validationResult = obituarySchema.safeParse({
        ...formData,
        photoUrl: resolvedPhotoUrl,
      });
      if (!validationResult.success) {
        const errorMessage = validationResult.error.issues[0]?.message || "Invalid input";
        toast({
          title: "Validation Error",
          description: errorMessage,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Validate arrays
      if (highSchools.some(s => s.length > 200)) {
        toast({
          title: "Validation Error",
          description: "School names must be less than 200 characters",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (colleges.some(c => c.length > 200)) {
        toast({
          title: "Validation Error",
          description: "College names must be less than 200 characters",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data: obituaryId, error: obituaryError } = await (supabase as any).rpc(
        'create_obituary_with_relations',
        {
          p_user_id: user.id,
          p_full_name: formData.fullName,
          p_date_of_birth: formData.dateOfBirth || null,
          p_date_of_death: formData.dateOfDeath || null,
          p_location: formData.location || null,
          p_city: formData.city || null,
          p_state: formData.state || null,
          p_high_schools: highSchools,
          p_colleges: colleges,
          p_military_branches: militaryBranches,
          p_biography: formData.biography || null,
          p_funeral_details: formData.funeralDetails || null,
          p_photo_url: resolvedPhotoUrl || null,
          p_allow_public_uploads: settings.allowPublicUploads,
          p_guestbook_enabled: settings.guestbookEnabled,
          p_require_moderation_for_uploads: settings.requireModerationForUploads,
          p_max_video_seconds: settings.maxVideoSeconds,
        }
      );

      if (obituaryError) throw obituaryError;

      if (!obituaryId) {
        throw new Error('Failed to create obituary — no ID returned from server.');
      }

      toast({
        title: "Obituary Created",
        description: "The obituary has been published successfully.",
      });
      router.push(`/obituary/${obituaryId}`);
    } catch (error: any) {
      console.error('Error creating obituary:', error);

      // Provide helpful error message based on error type
      let errorMessage = "Something went wrong. Please try again.";
      if (error?.message?.includes('permission') || error?.message?.includes('policy')) {
        errorMessage = "Permission error. Please ensure you're logged in and try again.";
      } else if (error?.message?.includes('duplicate')) {
        errorMessage = "This obituary may already exist.";
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast({
        title: "Error Creating Obituary",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addHighSchool = () => {
    if (newHighSchool.trim() && !highSchools.includes(newHighSchool.trim())) {
      setHighSchools([...highSchools, newHighSchool.trim()]);
      setNewHighSchool('');
    }
  };

  const removeHighSchool = (school: string) => {
    setHighSchools(highSchools.filter(s => s !== school));
  };

  const addCollege = () => {
    if (newCollege.trim() && !colleges.includes(newCollege.trim())) {
      setColleges([...colleges, newCollege.trim()]);
      setNewCollege('');
    }
  };

  const removeCollege = (college: string) => {
    setColleges(colleges.filter(c => c !== college));
  };

  const toggleMilitaryBranch = (branch: string) => {
    if (militaryBranches.includes(branch)) {
      setMilitaryBranches(militaryBranches.filter(b => b !== branch));
    } else {
      setMilitaryBranches([...militaryBranches, branch]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: `url(${createHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Honor Their Legacy
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md max-w-2xl mx-auto">
              Create a beautiful tribute that celebrates a life well-lived
            </p>
          </div>
        </div>
      </div>

      {/* Auth Status Banner */}
      {user && (
        <div className="container mx-auto px-4 pt-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex items-center gap-2 mb-4">
              <Badge variant="secondary" className="gap-1">
                <User className="h-3 w-3" />
                Signed in
              </Badge>
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-4">Create an Obituary</h2>
            <p className="text-muted-foreground text-lg">
              Share their story and preserve their memory for generations to come
            </p>
          </div>

          <Card className="p-8 bg-background/80 backdrop-blur-lg border border-border/50 shadow-elegant animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Community Information Section */}
              <div className="space-y-6 border-t border-border/20 pt-6">
                <h3 className="text-lg font-semibold text-foreground">Community Information</h3>
                <p className="text-sm text-muted-foreground">Optional: Help others find this obituary by adding community connections</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-foreground flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-foreground">State</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                      <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary/50">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* High Schools */}
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    High Schools
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={newHighSchool}
                      onChange={(e) => setNewHighSchool(e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="Enter high school name"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighSchool())}
                    />
                    <Button type="button" onClick={addHighSchool} variant="outline">Add</Button>
                  </div>
                  {highSchools.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {highSchools.map((school) => (
                        <Badge key={school} variant="secondary" className="gap-1">
                          {school}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeHighSchool(school)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Colleges */}
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Colleges & Universities
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={newCollege}
                      onChange={(e) => setNewCollege(e.target.value)}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                      placeholder="Enter college/university name"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCollege())}
                    />
                    <Button type="button" onClick={addCollege} variant="outline">Add</Button>
                  </div>
                  {colleges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {colleges.map((college) => (
                        <Badge key={college} variant="secondary" className="gap-1">
                          {college}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeCollege(college)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Service Affiliations */}
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Military & Service Affiliations
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {serviceAffiliationOptions.map((branch) => (
                      <Button
                        key={branch}
                        type="button"
                        variant={militaryBranches.includes(branch) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleMilitaryBranch(branch)}
                        className="justify-start"
                      >
                        {branch}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Memorial Settings Section */}
              <div className="space-y-6 border-t border-border/20 pt-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Memorial Settings</h3>
                  <p className="text-sm text-muted-foreground">Configure how visitors can interact with this memorial</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div>
                      <Label className="font-medium">Allow Public Uploads</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Let visitors upload photos and videos
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border"
                      checked={settings.allowPublicUploads}
                      onChange={(e) =>
                        setSettings(prev => ({ ...prev, allowPublicUploads: e.target.checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div>
                      <Label className="font-medium">Enable Guest Book</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Allow visitors to leave condolences
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border"
                      checked={settings.guestbookEnabled}
                      onChange={(e) =>
                        setSettings(prev => ({ ...prev, guestbookEnabled: e.target.checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div>
                      <Label className="font-medium">Require Moderation</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Review content before it appears publicly
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-border"
                      checked={settings.requireModerationForUploads}
                      onChange={(e) =>
                        setSettings(prev => ({ ...prev, requireModerationForUploads: e.target.checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-video-duration">Max Visitor Video Duration (seconds)</Label>
                    <Input
                      id="max-video-duration"
                      type="number"
                      min="30"
                      max="300"
                      value={settings.maxVideoSeconds}
                      onChange={(e) => {
                        const parsedValue = parseInt(e.target.value || '120', 10);
                        const clamped = Math.min(300, Math.max(30, Number.isNaN(parsedValue) ? 120 : parsedValue));
                        setSettings(prev => ({ ...prev, maxVideoSeconds: clamped }));
                      }}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                    />
                    <p className="text-xs text-muted-foreground">
                      This applies to visitor-uploaded videos on the memorial page.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfDeath" className="text-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date of Death
                  </Label>
                  <Input
                    id="dateOfDeath"
                    name="dateOfDeath"
                    type="date"
                    value={formData.dateOfDeath}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photoUrl" className="text-foreground flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Profile Photo
                </Label>
                <div className="grid gap-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      id="photoUpload"
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                      className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePhotoUpload}
                      disabled={!photoFile || uploadingPhoto}
                    >
                      {uploadingPhoto ? 'Uploading...' : 'Upload from Device'}
                    </Button>
                  </div>
                  <Input
                    id="photoUrl"
                    name="photoUrl"
                    value={formData.photoUrl}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Or paste image URL (https://example.com/photo.jpg)"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  You can upload directly from your phone/computer, or paste a public image URL.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biography" className="text-foreground">Life Story</Label>
                <Textarea
                  id="biography"
                  name="biography"
                  value={formData.biography}
                  onChange={handleInputChange}
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 resize-none"
                  placeholder="Share their story, achievements, passions, and the memories that made them special..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="funeralDetails" className="text-foreground">Funeral & Service Details</Label>
                <Textarea
                  id="funeralDetails"
                  name="funeralDetails"
                  value={formData.funeralDetails}
                  onChange={handleInputChange}
                  rows={4}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 resize-none"
                  placeholder="Include service date, time, location, and any special instructions..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="flex-1 border-border/50 hover:bg-muted/50 transition-all duration-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !formData.fullName}
                  className="flex-1 bg-warm-gradient text-primary-foreground hover:shadow-elegant transition-all duration-300"
                >
                  {loading ? 'Publishing...' : 'Publish Obituary'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateObituary;
