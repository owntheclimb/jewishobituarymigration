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
  Package,
  Plus,
  RefreshCw,
  Edit,
  Trash2,
  Search,
  DollarSign,
  Tag,
  Star,
  MoreHorizontal,
  Eye,
  EyeOff,
  FolderOpen,
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

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  category_id: string | null;
  image_url: string | null;
  status: string;
  featured: boolean;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
}

const emptyProduct = {
  name: '',
  slug: '',
  description: '',
  short_description: '',
  price: 0,
  compare_at_price: null as number | null,
  category_id: null as string | null,
  image_url: '',
  status: 'active',
  featured: false,
};

export default function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState(emptyProduct);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '' });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        supabase
          .from('products' as any)
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('product_categories' as any)
          .select('*')
          .order('sort_order', { ascending: true }),
      ]);

      if (productsRes.data) setProducts(productsRes.data as unknown as Product[]);
      if (categoriesRes.data) setCategories(categoriesRes.data as unknown as Category[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function openCreateDialog() {
    setEditingProduct(null);
    setFormData(emptyProduct);
    setIsDialogOpen(true);
  }

  function openEditDialog(product: Product) {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || '',
      short_description: product.short_description || '',
      price: product.price,
      compare_at_price: product.compare_at_price,
      category_id: product.category_id,
      image_url: product.image_url || '',
      status: product.status,
      featured: product.featured,
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
    if (!formData.name || !formData.price) {
      toast({
        title: 'Error',
        description: 'Name and price are required',
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
        description: formData.description || null,
        short_description: formData.short_description || null,
        price: formData.price,
        compare_at_price: formData.compare_at_price || null,
        category_id: formData.category_id || null,
        image_url: formData.image_url || null,
        status: formData.status,
        featured: formData.featured,
        updated_at: new Date().toISOString(),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products' as any)
          .update(data)
          .eq('id', editingProduct.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Product updated successfully' });
      } else {
        const { error } = await supabase.from('products' as any).insert(data);
        if (error) throw error;
        toast({ title: 'Success', description: 'Product created successfully' });
      }

      setIsDialogOpen(false);
      fetchData();
    } catch (error: unknown) {
      console.error('Error saving product:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save product';
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
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const { error } = await supabase.from('products' as any).delete().eq('id', id);
      if (error) throw error;
      toast({ title: 'Success', description: 'Product deleted successfully' });
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product',
        variant: 'destructive',
      });
    }
  }

  async function toggleStatus(product: Product) {
    const newStatus = product.status === 'active' ? 'draft' : 'active';
    try {
      const { error } = await supabase
        .from('products' as any)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', product.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  async function toggleFeatured(product: Product) {
    try {
      const { error } = await supabase
        .from('products' as any)
        .update({ featured: !product.featured, updated_at: new Date().toISOString() })
        .eq('id', product.id);
      if (error) throw error;
      fetchData();
    } catch (error) {
      console.error('Error updating featured:', error);
    }
  }

  async function handleSaveCategory() {
    if (!categoryForm.name) {
      toast({ title: 'Error', description: 'Category name is required', variant: 'destructive' });
      return;
    }

    try {
      const slug = categoryForm.slug || generateSlug(categoryForm.name);
      const { error } = await supabase.from('product_categories' as any).insert({
        name: categoryForm.name,
        slug,
        description: categoryForm.description || null,
      });
      if (error) throw error;
      toast({ title: 'Success', description: 'Category created successfully' });
      setIsCategoryDialogOpen(false);
      setCategoryForm({ name: '', slug: '', description: '' });
      fetchData();
    } catch (error: unknown) {
      console.error('Error saving category:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save category';
      toast({ title: 'Error', description: errorMessage, variant: 'destructive' });
    }
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return 'Uncategorized';
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || 'Unknown';
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8" />
            Products
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your product catalog
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsCategoryDialogOpen(true)}>
            <FolderOpen className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
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
                <SelectItem value="active">Active</SelectItem>
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
              <Package className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-sm text-muted-foreground">Total Products</p>
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
                  {products.filter((p) => p.status === 'active').length}
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
                  {products.filter((p) => p.featured).length}
                </p>
                <p className="text-sm text-muted-foreground">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{categories.length}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Product</th>
                    <th className="text-left p-3 font-medium">Category</th>
                    <th className="text-left p-3 font-medium">Price</th>
                    <th className="text-left p-3 font-medium">Status</th>
                    <th className="text-left p-3 font-medium">Featured</th>
                    <th className="text-left p-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {product.image_url ? (
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover rounded"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                              <Package className="h-5 w-5 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge variant="outline">{getCategoryName(product.category_id)}</Badge>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{product.price.toFixed(2)}</span>
                          {product.compare_at_price && (
                            <span className="text-sm text-muted-foreground line-through ml-2">
                              ${product.compare_at_price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        <Badge
                          variant={product.status === 'active' ? 'default' : 'secondary'}
                          className="cursor-pointer"
                          onClick={() => toggleStatus(product)}
                        >
                          {product.status === 'active' ? (
                            <Eye className="h-3 w-3 mr-1" />
                          ) : (
                            <EyeOff className="h-3 w-3 mr-1" />
                          )}
                          {product.status}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(product)}
                        >
                          <Star
                            className={`h-4 w-4 ${
                              product.featured ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                            }`}
                          />
                        </Button>
                      </td>
                      <td className="p-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(product)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(product.id)}
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
              No products found. Create your first product to get started.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Categories Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Categories
          </CardTitle>
          <CardDescription>Organize your products into categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardContent className="p-4">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.slug}</p>
                  <p className="text-sm mt-2">
                    {products.filter((p) => p.category_id === category.id).length} products
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
            <DialogDescription>
              {editingProduct ? 'Update product details' : 'Create a new product'}
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
                  placeholder="Product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Auto-generated from name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief product description"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed product description"
                rows={4}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compare_at_price">Compare at Price</Label>
                <Input
                  id="compare_at_price"
                  type="number"
                  step="0.01"
                  value={formData.compare_at_price || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compare_at_price: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  placeholder="Original price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category_id || 'none'}
                  onValueChange={(v) => setFormData({ ...formData, category_id: v === 'none' ? null : v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No category</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
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
                    <SelectItem value="active">Active</SelectItem>
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
                  <span className="text-sm">Show as featured product</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>Create a new product category</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="cat_name">Name *</Label>
              <Input
                id="cat_name"
                value={categoryForm.name}
                onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                placeholder="Category name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat_slug">Slug</Label>
              <Input
                id="cat_slug"
                value={categoryForm.slug}
                onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                placeholder="Auto-generated from name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cat_description">Description</Label>
              <Textarea
                id="cat_description"
                value={categoryForm.description}
                onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                placeholder="Category description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>Create Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
