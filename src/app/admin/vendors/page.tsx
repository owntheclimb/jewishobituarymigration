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
  Building2,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  MoreHorizontal,
  Eye,
  EyeOff,
  CheckCircle,
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

interface Vendor {
  id: string;
  name: string;
  slug: string;
  type_id: string | null;
  description: string | null;
  short_description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  logo_url: string | null;
  featured: boolean;
  verified: boolean;
  status: string;
  created_at: string;
}

interface VendorType {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
}

const emptyVendor = {
  name: '',
  slug: '',
  type_id: null as string | null,
  description: '',
  short_description: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  logo_url: '',
  featured: false,
  verified: false,
  status: 'active',
};

export default function VendorsPage() {
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [formData, setFormData] = useState(emptyVendor);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [vendorsRes, typesRes] = await Promise.all([
        supabase
          .from('vendors')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('vendor_types')
          .select('*')
          .order('sort_order', { ascending: true }),
      ]);

      if (vendorsRes.data) setVendors(vendorsRes.data);
      if (typesRes.data) setVendorTypes(typesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load vendors',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingVendor(null);
    setFormData(emptyVendor);
    setIsDialogOpen(true);
  }

  function openEditDialog(vendor: Vendor) {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      slug: vendor.slug,
      type_id: vendor.type_id,
      description: vendor.description || '',
      short_description: vendor.short_description || '',
      phone: vendor.phone || '',
      email: vendor.email || '',
      website: vendor.website || '',
      address: vendor.address || '',
      city: vendor.city || '',
      state: vendor.state || '',
      zip: vendor.zip || '',
      logo_url: vendor.logo_url || '',
      featured: vendor.featured,
      verified: vendor.verified,
      status: vendor.status,
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
        description: 'Vendor name is required',
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
        type_id: formData.type_id || null,
        description: formData.description || null,
        short_description: formData.short_description || null,
        phone: formData.phone || null,
        email: formData.email || null,
        website: formData.website || null,
        address: formData.address || null,
        city: formData.city || null,
        state: formData.state || null,
        zip: formData.zip || null,
        logo_url: formData.logo_url || null,
        featured: formData.featured,
        verified: formData.verified,
        status: formData.status,
        updated_at: new Date().toISOString(),
      };

      if (editingVendor) {
        const { error } = await supabase
          .from('vendors')
          .update(data)
          .eq('id', editingVendor.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Vendor updated successfully' });
      } else {
        const { error } = await supabase.from('vendors').insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Vendor created successfully' });
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: unknown) {
      console.error('Error saving vendor:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save vendor';
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
    if (!confirm('Are you sure you want to delete this vendor?')) return;

    try {
      const { error } = await supabase.from('vendors').delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Vendor deleted successfully' });
      fetchData();
    } catch (error) {
      console.error('Error deleting vendor:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete vendor',
        variant: 'destructive',
      });
    }
  }

  async function toggleStatus(vendor: Vendor) {
    const newStatus = vendor.status === 'active' ? 'inactive' : 'active';
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', vendor.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  async function toggleFeatured(vendor: Vendor) {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ featured: !vendor.featured, updated_at: new Date().toISOString() })
        .eq('id', vendor.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating featured:', error);
    }
  }

  async function toggleVerified(vendor: Vendor) {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ verified: !vendor.verified, updated_at: new Date().toISOString() })
        .eq('id', vendor.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating verified:', error);
    }
  }

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.state?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    const matchesType = typeFilter === 'all' || v.type_id === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getTypeName = (typeId: string | null) => {
    if (!typeId) return 'Uncategorized';
    const type = vendorTypes.find((t) => t.id === typeId);
    return type?.name || 'Unknown';
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Vendors
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage funeral homes, florists, and service providers
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {vendorTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{vendors.length}</p>
                <p className="text-sm text-muted-foreground">Total Vendors</p>
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
                  {vendors.filter((v) => v.status === 'active').length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">
                  {vendors.filter((v) => v.featured).length}
                </p>
                <p className="text-sm text-muted-foreground">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">
                  {vendors.filter((v) => v.verified).length}
                </p>
                <p className="text-sm text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
          <CardDescription>
            {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredVendors.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Vendor</th>
                    <th className="text-left p-3 font-medium">Type</th>
                    <th className="text-left p-3 font-medium">Location</th>
                    <th className="text-left p-3 font-medium">Contact</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {vendor.logo_url ? (
                            <Image
                              src={vendor.logo_url}
                              alt={vendor.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{vendor.name}</p>
                              {vendor.verified && (
                                <CheckCircle className="h-4 w-4 text-blue-500" />
                              )}
                              {vendor.featured && (
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{vendor.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{getTypeName(vendor.type_id)}</Badge>
                      </td>
                      <td className="p-3">
                        {vendor.city || vendor.state ? (
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {[vendor.city, vendor.state].filter(Boolean).join(', ')}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          {vendor.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              {vendor.phone}
                            </div>
                          )}
                          {vendor.email && (
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              {vendor.email}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={vendor.status === 'active' ? 'default' : 'secondary'}
                          className="cursor-pointer"
                          onClick={() => toggleStatus(vendor)}
                        >
                          {vendor.status === 'active' ? (
                            <Eye className="h-3 w-3 mr-1" />
                          ) : (
                            <EyeOff className="h-3 w-3 mr-1" />
                          )}
                          {vendor.status}
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
                            <DropdownMenuItem onClick={() => openEditDialog(vendor)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleFeatured(vendor)}>
                              <Star className="h-4 w-4 mr-2" />
                              {vendor.featured ? 'Remove Featured' : 'Make Featured'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleVerified(vendor)}>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              {vendor.verified ? 'Remove Verified' : 'Mark Verified'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(vendor.id)}
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
              No vendors found. Add your first vendor to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Vendor Types Overview */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Vendor Types</CardTitle>
          <CardDescription>Overview of vendor categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {vendorTypes.map((type) => (
              <Card key={type.id}>
                <CardContent className="p-4">
                  <h3 className="font-medium">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.slug}</p>
                  <p className="text-sm mt-2">
                    {vendors.filter((v) => v.type_id === type.id).length} vendors
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vendor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingVendor ? 'Edit Vendor' : 'Add Vendor'}</DialogTitle>
            <DialogDescription>
              {editingVendor ? 'Update vendor details' : 'Create a new vendor listing'}
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
                  placeholder="Vendor name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type_id || 'none'}
                  onValueChange={(v) => setFormData({ ...formData, type_id: v === 'none' ? null : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No type</SelectItem>
                    {vendorTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief vendor description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed vendor description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 555-5555"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@vendor.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">
                  <Globe className="h-4 w-4 inline mr-1" />
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://vendor.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="123 Main Street"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="State"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input
                  id="zip"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  placeholder="12345"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                placeholder="https://example.com/logo.jpg"
              />
              {formData.logo_url && (
                <div className="mt-2">
                  <Image
                    src={formData.logo_url}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
                  <span className="text-sm">Featured vendor</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Verified</Label>
                <div className="flex items-center gap-2 h-10">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <span className="text-sm">Verified vendor</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingVendor ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
