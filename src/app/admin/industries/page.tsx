'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Briefcase,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Search,
  MoreHorizontal,
  Eye,
  EyeOff,
  ExternalLink,
  FileText,
  HelpCircle,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface IndustryPage {
  id: string;
  slug: string;
  title: string;
  meta_description: string | null;
  hero_heading: string | null;
  hero_subheading: string | null;
  intro_content: string | null;
  educational_content: string | null;
  vendor_type_id: string | null;
  faq_items: { question: string; answer: string }[] | null;
  related_industries: string[] | null;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface VendorType {
  id: string;
  name: string;
  slug: string;
}

const emptyPage = {
  slug: '',
  title: '',
  meta_description: '',
  hero_heading: '',
  hero_subheading: '',
  intro_content: '',
  educational_content: '',
  vendor_type_id: null as string | null,
  faq_items: [] as { question: string; answer: string }[],
  related_industries: [] as string[],
  is_published: false,
  sort_order: 0,
};

export default function IndustryPagesAdmin() {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<IndustryPage[]>([]);
  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<IndustryPage | null>(null);
  const [formData, setFormData] = useState(emptyPage);
  const [saving, setSaving] = useState(false);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
    fetchVendorTypes();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('industry_pages' as any)
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      if (data) setPages(data as unknown as IndustryPage[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load industry pages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchVendorTypes() {
    try {
      const { data, error } = await supabase
        .from('vendor_types' as any)
        .select('id, name, slug')
        .order('name', { ascending: true });

      if (error) throw error;
      if (data) setVendorTypes(data as unknown as VendorType[]);
    } catch (error) {
      console.error('Error fetching vendor types:', error);
    }
  }

  function openCreateDialog() {
    setEditingPage(null);
    setFormData(emptyPage);
    setIsDialogOpen(true);
  }

  function openEditDialog(page: IndustryPage) {
    setEditingPage(page);
    setFormData({
      slug: page.slug,
      title: page.title,
      meta_description: page.meta_description || '',
      hero_heading: page.hero_heading || '',
      hero_subheading: page.hero_subheading || '',
      intro_content: page.intro_content || '',
      educational_content: page.educational_content || '',
      vendor_type_id: page.vendor_type_id,
      faq_items: page.faq_items || [],
      related_industries: page.related_industries || [],
      is_published: page.is_published,
      sort_order: page.sort_order,
    });
    setIsDialogOpen(true);
  }

  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function addFaqItem() {
    if (!newFaqQuestion || !newFaqAnswer) {
      toast({
        title: 'Error',
        description: 'Both question and answer are required',
        variant: 'destructive',
      });
      return;
    }
    setFormData({
      ...formData,
      faq_items: [...formData.faq_items, { question: newFaqQuestion, answer: newFaqAnswer }],
    });
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  }

  function removeFaqItem(index: number) {
    setFormData({
      ...formData,
      faq_items: formData.faq_items.filter((_, i) => i !== index),
    });
  }

  async function handleSave() {
    if (!formData.title) {
      toast({
        title: 'Error',
        description: 'Title is required',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      const slug = formData.slug || generateSlug(formData.title);
      const data = {
        slug,
        title: formData.title,
        meta_description: formData.meta_description || null,
        hero_heading: formData.hero_heading || null,
        hero_subheading: formData.hero_subheading || null,
        intro_content: formData.intro_content || null,
        educational_content: formData.educational_content || null,
        vendor_type_id: formData.vendor_type_id || null,
        faq_items: formData.faq_items.length > 0 ? formData.faq_items : null,
        related_industries: formData.related_industries.length > 0 ? formData.related_industries : null,
        is_published: formData.is_published,
        sort_order: formData.sort_order,
        updated_at: new Date().toISOString(),
      };

      if (editingPage) {
        const { error } = await supabase
          .from('industry_pages' as any)
          .update(data)
          .eq('id', editingPage.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Industry page updated successfully' });
      } else {
        const { error } = await supabase.from('industry_pages' as any).insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Industry page created successfully' });
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
    if (!confirm('Are you sure you want to delete this industry page?')) return;

    try {
      const { error } = await supabase.from('industry_pages' as any).delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Industry page deleted successfully' });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete industry page',
        variant: 'destructive',
      });
    }
  }

  async function togglePublished(page: IndustryPage) {
    try {
      const { error } = await supabase
        .from('industry_pages' as any)
        .update({ is_published: !page.is_published, updated_at: new Date().toISOString() })
        .eq('id', page.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  const filteredPages = pages.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && p.is_published) ||
      (statusFilter === 'draft' && !p.is_published);
    return matchesSearch && matchesStatus;
  });

  const getVendorTypeName = (id: string | null) => {
    if (!id) return 'None';
    const type = vendorTypes.find((t) => t.id === id);
    return type?.name || 'Unknown';
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Briefcase className="h-8 w-8" />
            Industry Pages
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage service industry resource pages
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Industry Page
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search industry pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
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
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{pages.length}</p>
                <p className="text-sm text-muted-foreground">Total Pages</p>
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
                  {pages.filter((p) => p.is_published).length}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <EyeOff className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">
                  {pages.filter((p) => !p.is_published).length}
                </p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {pages.reduce((acc, p) => acc + (p.faq_items?.length || 0), 0)}
                </p>
                <p className="text-sm text-muted-foreground">FAQ Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pages Table */}
      <Card>
        <CardHeader>
          <CardTitle>Industry Pages</CardTitle>
          <CardDescription>
            {filteredPages.length} page{filteredPages.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredPages.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Page</th>
                    <th className="text-left p-3 font-medium">Vendor Type</th>
                    <th className="text-left p-3 font-medium">Content</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPages.map((page) => (
                    <tr key={page.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div>
                          <p className="font-medium">{page.title}</p>
                          <p className="text-sm text-muted-foreground">/services/{page.slug}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{getVendorTypeName(page.vendor_type_id)}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1" title="FAQ Items">
                            <HelpCircle className="h-4 w-4 text-blue-500" />
                            {page.faq_items?.length || 0}
                          </span>
                          <span className="flex items-center gap-1" title="Has Educational Content">
                            <FileText className="h-4 w-4 text-green-500" />
                            {page.educational_content ? 'Yes' : 'No'}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={page.is_published ? 'default' : 'secondary'}
                          className="cursor-pointer"
                          onClick={() => togglePublished(page)}
                        >
                          {page.is_published ? (
                            <Eye className="h-3 w-3 mr-1" />
                          ) : (
                            <EyeOff className="h-3 w-3 mr-1" />
                          )}
                          {page.is_published ? 'Published' : 'Draft'}
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
                            <DropdownMenuItem onClick={() => openEditDialog(page)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <a
                                href={`/services/${page.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Page
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(page.id)}
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
              No industry pages found. Add your first to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Page Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPage ? 'Edit Industry Page' : 'Add Industry Page'}</DialogTitle>
            <DialogDescription>
              {editingPage ? 'Update page details' : 'Create a new industry resource page'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Jewish Funeral Homes"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor_type">Vendor Type</Label>
                <Select
                  value={formData.vendor_type_id || 'none'}
                  onValueChange={(v) => setFormData({ ...formData, vendor_type_id: v === 'none' ? null : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {vendorTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sort_order">Sort Order</Label>
                <Input
                  id="sort_order"
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="SEO meta description (150-160 characters)"
                rows={2}
              />
            </div>

            {/* Hero Section */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Hero Section</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hero_heading">Hero Heading</Label>
                  <Input
                    id="hero_heading"
                    value={formData.hero_heading}
                    onChange={(e) => setFormData({ ...formData, hero_heading: e.target.value })}
                    placeholder="Main page heading"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero_subheading">Hero Subheading</Label>
                  <Input
                    id="hero_subheading"
                    value={formData.hero_subheading}
                    onChange={(e) => setFormData({ ...formData, hero_subheading: e.target.value })}
                    placeholder="Subheading text"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">Content</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="intro_content">Introduction</Label>
                  <Textarea
                    id="intro_content"
                    value={formData.intro_content}
                    onChange={(e) => setFormData({ ...formData, intro_content: e.target.value })}
                    placeholder="Introduction paragraph"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="educational_content">Educational Content (Markdown)</Label>
                  <Textarea
                    id="educational_content"
                    value={formData.educational_content}
                    onChange={(e) => setFormData({ ...formData, educational_content: e.target.value })}
                    placeholder="## Section Title&#10;&#10;Content goes here...&#10;&#10;### Subsection&#10;&#10;More content..."
                    rows={8}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Items */}
            <div className="border-t pt-4">
              <h3 className="font-medium mb-3">FAQ Items</h3>
              {formData.faq_items.length > 0 && (
                <div className="space-y-2 mb-4">
                  {formData.faq_items.map((faq, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{faq.question}</p>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFaqItem(index)}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <div className="space-y-2">
                <Input
                  placeholder="Question"
                  value={newFaqQuestion}
                  onChange={(e) => setNewFaqQuestion(e.target.value)}
                />
                <Textarea
                  placeholder="Answer"
                  value={newFaqAnswer}
                  onChange={(e) => setNewFaqAnswer(e.target.value)}
                  rows={2}
                />
                <Button variant="outline" size="sm" onClick={addFaqItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </div>
            </div>

            {/* Status */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="is_published">Published</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingPage ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
