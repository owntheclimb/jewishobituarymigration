'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Search,
  Star,
  MoreHorizontal,
  Eye,
  EyeOff,
  Flame,
  Heart,
  Calendar,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface NotableFigure {
  id: string;
  name: string;
  slug: string;
  hebrew_name: string | null;
  birth_date: string | null;
  death_date: string | null;
  birth_year: number | null;
  death_year: number | null;
  bio: string | null;
  short_bio: string | null;
  image_url: string | null;
  category: string | null;
  subcategory: string | null;
  notable_for: string | null;
  candle_count: number;
  memory_count: number;
  featured: boolean;
  status: string;
  created_at: string;
}

const categories = [
  { value: 'holocaust', label: 'Holocaust Victims' },
  { value: 'israeli-heroes', label: 'Israeli Heroes' },
  { value: 'religious-leaders', label: 'Religious Leaders' },
  { value: 'scientists', label: 'Scientists' },
  { value: 'artists', label: 'Artists & Entertainers' },
  { value: 'activists', label: 'Activists' },
  { value: 'athletes', label: 'Athletes' },
  { value: 'politicians', label: 'Politicians' },
  { value: 'other', label: 'Other' },
];

const emptyFigure = {
  name: '',
  slug: '',
  hebrew_name: '',
  birth_date: '',
  death_date: '',
  birth_year: null as number | null,
  death_year: null as number | null,
  bio: '',
  short_bio: '',
  image_url: '',
  category: 'other',
  subcategory: '',
  notable_for: '',
  featured: false,
  status: 'published',
};

export default function PagesManagementPage() {
  const [loading, setLoading] = useState(true);
  const [figures, setFigures] = useState<NotableFigure[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFigure, setEditingFigure] = useState<NotableFigure | null>(null);
  const [formData, setFormData] = useState(emptyFigure);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notable_figures' as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setFigures(data as unknown as NotableFigure[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load notable figures',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingFigure(null);
    setFormData(emptyFigure);
    setIsDialogOpen(true);
  }

  function openEditDialog(figure: NotableFigure) {
    setEditingFigure(figure);
    setFormData({
      name: figure.name,
      slug: figure.slug,
      hebrew_name: figure.hebrew_name || '',
      birth_date: figure.birth_date || '',
      death_date: figure.death_date || '',
      birth_year: figure.birth_year,
      death_year: figure.death_year,
      bio: figure.bio || '',
      short_bio: figure.short_bio || '',
      image_url: figure.image_url || '',
      category: figure.category || 'other',
      subcategory: figure.subcategory || '',
      notable_for: figure.notable_for || '',
      featured: figure.featured,
      status: figure.status,
    });
    setIsDialogOpen(true);
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async function handleSave() {
    if (!formData.name) {
      toast({
        title: 'Error',
        description: 'Name is required',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const slug = formData.slug || generateSlug(formData.name);
      const data = {
        name: formData.name,
        slug,
        hebrew_name: formData.hebrew_name || null,
        birth_date: formData.birth_date || null,
        death_date: formData.death_date || null,
        birth_year: formData.birth_year || null,
        death_year: formData.death_year || null,
        bio: formData.bio || null,
        short_bio: formData.short_bio || null,
        image_url: formData.image_url || null,
        category: formData.category || null,
        subcategory: formData.subcategory || null,
        notable_for: formData.notable_for || null,
        featured: formData.featured,
        status: formData.status,
        updated_at: new Date().toISOString(),
      };

      if (editingFigure) {
        const { error } = await supabase
          .from('notable_figures' as any)
          .update(data)
          .eq('id', editingFigure.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Notable figure updated successfully' });
      } else {
        const { error } = await supabase.from('notable_figures' as any).insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Notable figure created successfully' });
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: unknown) {
      console.error('Error saving:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this notable figure?')) return;

    try {
      const { error } = await supabase.from('notable_figures' as any).delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Notable figure deleted successfully' });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete notable figure',
        variant: 'destructive',
      });
    }
  }

  async function toggleStatus(figure: NotableFigure) {
    const newStatus = figure.status === 'published' ? 'draft' : 'published';
    try {
      const { error } = await supabase
        .from('notable_figures' as any)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', figure.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  async function toggleFeatured(figure: NotableFigure) {
    try {
      const { error } = await supabase
        .from('notable_figures' as any)
        .update({ featured: !figure.featured, updated_at: new Date().toISOString() })
        .eq('id', figure.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating featured:', error);
    }
  }

  const filteredFigures = figures.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.hebrew_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.notable_for?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getCategoryLabel = (value: string | null) => {
    const cat = categories.find((c) => c.value === value);
    return cat?.label || 'Unknown';
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8" />
            Content Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage notable figures and content
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Notable Figure
        </Button>
      </div>

      <Tabs defaultValue="notable">
        <TabsList className="mb-6">
          <TabsTrigger value="notable" className="gap-2">
            <Users className="h-4 w-4" />
            Notable Figures ({figures.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notable">
          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notable figures..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={fetchData}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-2xl font-bold">{figures.length}</p>
                    <p className="text-sm text-muted-foreground">Total Figures</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {figures.filter((f) => f.status === 'published').length}
                    </p>
                    <p className="text-sm text-muted-foreground">Published</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {figures.reduce((acc, f) => acc + f.candle_count, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Candles Lit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      {figures.reduce((acc, f) => acc + f.memory_count, 0)}
                    </p>
                    <p className="text-sm text-muted-foreground">Memories Shared</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Figures Table */}
          <Card>
            <CardHeader>
              <CardTitle>Notable Figures</CardTitle>
              <CardDescription>
                {filteredFigures.length} figure{filteredFigures.length !== 1 ? 's' : ''} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">Loading...</div>
              ) : filteredFigures.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Person</th>
                        <th className="text-left p-3 font-medium">Category</th>
                        <th className="text-left p-3 font-medium">Dates</th>
                        <th className="text-left p-3 font-medium">Stats</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFigures.map((figure) => (
                        <tr key={figure.id} className="border-b hover:bg-muted/50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              {figure.image_url ? (
                                <Image
                                  src={figure.image_url}
                                  alt={figure.name}
                                  width={40}
                                  height={40}
                                  className="w-10 h-10 object-cover rounded-full"
                                />
                              ) : (
                                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                                  <Users className="h-5 w-5 text-muted-foreground" />
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium">{figure.name}</p>
                                  {figure.featured && (
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  )}
                                </div>
                                {figure.hebrew_name && (
                                  <p className="text-sm text-muted-foreground">{figure.hebrew_name}</p>
                                )}
                                {figure.notable_for && (
                                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                    {figure.notable_for}
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge variant="outline">{getCategoryLabel(figure.category)}</Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1 text-sm">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {figure.birth_year || formatDate(figure.birth_date) || '?'} -{' '}
                              {figure.death_year || formatDate(figure.death_date) || '?'}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-3 text-sm">
                              <span className="flex items-center gap-1">
                                <Flame className="h-4 w-4 text-orange-500" />
                                {figure.candle_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className="h-4 w-4 text-red-500" />
                                {figure.memory_count}
                              </span>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge
                              variant={figure.status === 'published' ? 'default' : 'secondary'}
                              className="cursor-pointer"
                              onClick={() => toggleStatus(figure)}
                            >
                              {figure.status === 'published' ? (
                                <Eye className="h-3 w-3 mr-1" />
                              ) : (
                                <EyeOff className="h-3 w-3 mr-1" />
                              )}
                              {figure.status}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openEditDialog(figure)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFeatured(figure)}>
                                  <Star className="h-4 w-4 mr-2" />
                                  {figure.featured ? 'Remove Featured' : 'Make Featured'}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(figure.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No notable figures found. Add your first to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Figure Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingFigure ? 'Edit Notable Figure' : 'Add Notable Figure'}</DialogTitle>
            <DialogDescription>
              {editingFigure ? 'Update details' : 'Add a new notable figure to the memorial'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hebrew_name">Hebrew Name</Label>
                <Input
                  id="hebrew_name"
                  value={formData.hebrew_name}
                  onChange={(e) => setFormData({ ...formData, hebrew_name: e.target.value })}
                  placeholder="Hebrew name"
                  dir="rtl"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input
                  id="subcategory"
                  value={formData.subcategory}
                  onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                  placeholder="Optional subcategory"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notable_for">Notable For</Label>
              <Input
                id="notable_for"
                value={formData.notable_for}
                onChange={(e) => setFormData({ ...formData, notable_for: e.target.value })}
                placeholder="e.g., Holocaust survivor, Nobel laureate, etc."
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birth_year">Birth Year</Label>
                <Input
                  id="birth_year"
                  type="number"
                  value={formData.birth_year || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      birth_year: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="1920"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="death_year">Death Year</Label>
                <Input
                  id="death_year"
                  type="number"
                  value={formData.death_year || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      death_year: e.target.value ? parseInt(e.target.value) : null,
                    })
                  }
                  placeholder="2000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birth_date">Birth Date</Label>
                <Input
                  id="birth_date"
                  type="date"
                  value={formData.birth_date}
                  onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="death_date">Death Date</Label>
                <Input
                  id="death_date"
                  type="date"
                  value={formData.death_date}
                  onChange={(e) => setFormData({ ...formData, death_date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="short_bio">Short Bio</Label>
              <Textarea
                id="short_bio"
                value={formData.short_bio}
                onChange={(e) => setFormData({ ...formData, short_bio: e.target.value })}
                placeholder="Brief biography (2-3 sentences)"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Full Biography</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Detailed biography"
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
              {formData.image_url && (
                <div className="mt-2">
                  <Image
                    src={formData.image_url}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) => setFormData({ ...formData, status: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Featured</Label>
                <div className="flex items-center gap-2 h-10">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">Show as featured</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingFigure ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
