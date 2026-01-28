'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Phone,
  Search,
  MapPin,
  Calendar,
  Truck,
  Clock,
  Heart,
  Flower,
  Gift,
  TreePine,
  ShoppingCart,
  Filter,
  Star,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

// Image imports for categories (these are ok as they don't go to cart)
import categoryBouquets from "@/assets/category-bouquets.jpg";
import categorySprays from "@/assets/category-sprays.jpg";
import categoryPlants from "@/assets/category-plants.jpg";
import categoryBaskets from "@/assets/category-baskets.jpg";
import categoryKeepsakes from "@/assets/category-keepsakes.jpg";
import categoryTrees from "@/assets/category-trees.jpg";
import flowersHeroBg from "@/assets/flowers-hero-bg.jpg";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price: number | null;
  description: string | null;
  short_description: string | null;
  image_url: string | null;
  category_id: string | null;
  featured: boolean;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

const Flowers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          supabase
            .from('products' as any)
            .select('*')
            .eq('status', 'active')
            .order('featured', { ascending: false })
            .order('sort_order', { ascending: true }),
          supabase
            .from('product_categories' as any)
            .select('*')
            .eq('active', true)
            .order('sort_order', { ascending: true }),
        ]);

        if (productsRes.data && productsRes.data.length > 0) {
          setProducts(productsRes.data as unknown as Product[]);
        }
        if (categoriesRes.data && categoriesRes.data.length > 0) {
          setDbCategories(categoriesRes.data as unknown as Category[]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categories = [
    {
      id: "bouquets",
      name: "Bouquets",
      icon: Flower,
      description: "Hand-arranged fresh flowers",
      image: categoryBouquets.src
    },
    {
      id: "sprays",
      name: "Standing Sprays",
      icon: Flower,
      description: "Elegant funeral arrangements",
      image: categorySprays.src
    },
    {
      id: "plants",
      name: "Plants",
      icon: TreePine,
      description: "Living remembrances",
      image: categoryPlants.src
    },
    {
      id: "baskets",
      name: "Baskets",
      icon: Gift,
      description: "Comfort & gourmet gifts",
      image: categoryBaskets.src
    },
    {
      id: "keepsakes",
      name: "Keepsakes",
      icon: Heart,
      description: "Lasting memorial items",
      image: categoryKeepsakes.src
    },
    {
      id: "trees",
      name: "Memorial Trees",
      icon: TreePine,
      description: "Plant a living tribute",
      image: categoryTrees.src
    }
  ];

  // Fallback products if database is empty
  // Using stable /public URLs to prevent cart image breakage across deployments
  const fallbackProducts = [
    {
      id: "1",
      name: "Peaceful White Lilies",
      price: 89.99,
      category: "bouquets",
      rating: 4.8,
      image: "/images/peaceful-white-lilies.jpg",
      description: "Elegant white lilies and roses arranged with care"
    },
    {
      id: "2",
      name: "Garden of Grace Standing Spray",
      price: 149.99,
      category: "sprays",
      rating: 4.9,
      image: "/images/garden-of-grace-spray.jpg",
      description: "Professional funeral standing arrangement"
    },
    {
      id: "3",
      name: "Comfort Planter",
      price: 64.99,
      category: "plants",
      rating: 4.7,
      image: "/images/comfort-planter.jpg",
      description: "Living peace lily in decorative planter"
    },
    {
      id: "4",
      name: "Sympathy Fruit & Gourmet Basket",
      price: 79.99,
      category: "baskets",
      rating: 4.6,
      image: "/images/sympathy-gift-basket.jpg",
      description: "Thoughtful collection of gourmet treats"
    },
    {
      id: "5",
      name: "Memorial Wind Chimes",
      price: 34.99,
      category: "keepsakes",
      rating: 4.8,
      image: "/images/memorial-wind-chimes.jpg",
      description: "Beautiful keepsake with gentle sounds"
    },
    {
      id: "6",
      name: "Remembrance Rose Bouquet",
      price: 69.99,
      category: "bouquets",
      rating: 4.9,
      image: "/images/remembrance-rose-bouquet.jpg",
      description: "Stunning roses in remembrance colors"
    }
  ];

  // Use database products if available, otherwise fallback
  const displayProducts = products.length > 0
    ? products.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: getCategorySlug(p.category_id),
        rating: 4.8,
        image: p.image_url || '/images/peaceful-white-lilies.jpg',
        description: p.short_description || p.description || ''
      }))
    : fallbackProducts;

  function getCategorySlug(categoryId: string | null): string {
    if (!categoryId) return 'all';
    const cat = dbCategories.find(c => c.id === categoryId);
    return cat?.slug || 'all';
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative py-24 px-4 bg-gradient-to-br from-background/90 to-background/80 overflow-hidden"
        style={{
          backgroundImage: `url(${flowersHeroBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/75 to-background/85"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Send Sympathy Flowers & Gifts
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Express your condolences with thoughtfully curated flowers and gifts,
            delivered with care when words aren't enough
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-background/95 backdrop-blur-sm p-4 rounded-2xl shadow-elegant">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Delivery address or funeral home"
                className="pl-12 h-12 text-base border-0 bg-muted/50 focus:bg-background"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input type="date" className="pl-12 h-12 text-base border-0 bg-muted/50 focus:bg-background" />
            </div>
            <Button
              size="lg"
              className="gap-2 h-12 px-8 font-semibold shadow-subtle hover:shadow-elegant"
              onClick={() => {
                document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search className="h-5 w-5" />
              Shop Flowers
            </Button>
          </div>
        </div>
      </section>

      {/* Assistance Bar */}
      <section className="bg-primary/5 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 text-center">
            <Phone className="h-5 w-5 text-primary" />
            <p className="text-foreground">
              <span className="font-semibold">Need help ordering?</span> We're here for you.
              <span className="ml-2 font-semibold text-primary">Call (954) 744-3432</span>
            </p>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6 text-foreground">Shop by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect way to express your sympathy and show your care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card
                  key={category.id}
                  className="group overflow-hidden shadow-subtle hover:shadow-xl transition-all duration-500 hover:scale-[1.03] cursor-pointer border-0 bg-background/80 backdrop-blur-sm"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/90 rounded-full backdrop-blur-sm">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-serif">{category.name}</CardTitle>
                    <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      variant="outline"
                      className="w-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Shop {category.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4 text-foreground">Featured Sympathy Arrangements</h2>
              <p className="text-lg text-muted-foreground max-w-lg">Our most popular and highly-rated selections, chosen with care</p>
            </div>

            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 h-11">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="col-span-3 flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayProducts
                .filter(product => selectedCategory === "all" || product.category === selectedCategory)
                .map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden shadow-subtle hover:shadow-xl transition-all duration-500 hover:scale-[1.02] bg-background border-border/50 flex flex-col h-full"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">({product.rating})</span>
                    </div>
                    <CardTitle className="text-xl font-serif mb-2 leading-tight">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">{product.description}</p>
                      <div className="mt-auto">
                      <p className="text-2xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1 font-medium" asChild>
                          <Link href={`/product/${product.id}`}>View Details</Link>
                        </Button>
                        <Button
                          className="gap-2 font-medium shadow-subtle hover:shadow-elegant"
                          onClick={() => addItem({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            category: product.category
                          })}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Delivery Guidance */}
      <section className="py-16 px-4 bg-muted/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4 text-foreground">Delivery Information</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to ensuring your flowers arrive exactly when and where they're needed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-subtle bg-background/80 backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-foreground">Same-Day Available</h3>
              <p className="text-muted-foreground leading-relaxed">
                Order by 2 PM for same-day delivery in most areas. Perfect for last-minute arrangements.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-subtle bg-background/80 backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-foreground">Funeral Home Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                We coordinate directly with funeral homes nationwide to ensure timely, respectful delivery.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-subtle bg-background/80 backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-foreground">Order Tracking</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get updates from arrangement to delivery, so you know your tribute has arrived safely.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help make ordering as easy and comforting as possible
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-6">
            <AccordionItem value="choosing" className="border border-border/50 rounded-xl px-6 shadow-sm bg-muted/20">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                How do I choose the right arrangement?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                Consider your relationship to the deceased, the setting (funeral home, graveside, or home),
                and any known preferences. Our customer service team can help guide you through the selection process
                and ensure your tribute perfectly expresses your sentiments.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="card-message" className="border border-border/50 rounded-xl px-6 shadow-sm bg-muted/20">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                What should I write on the card?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                Keep messages brief and heartfelt. Simple phrases like "With deepest sympathy,"
                "Thinking of you during this difficult time," or "In loving memory" are appropriate.
                Avoid religious references unless you know the family's beliefs. Personal memories or
                acknowledgments of the person's impact can be especially meaningful.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="funeral-delivery" className="border border-border/50 rounded-xl px-6 shadow-sm bg-muted/20">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                Can you deliver to funeral homes?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                Yes, we coordinate with funeral homes nationwide to ensure respectful, timely delivery.
                We'll need the funeral home name, address, and service date/time. We recommend ordering
                at least 24 hours in advance for funeral home deliveries to ensure proper coordination
                and placement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="substitutions" className="border border-border/50 rounded-xl px-6 shadow-sm bg-muted/20">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                What if you need to make substitutions?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                We may substitute flowers of equal or greater value to ensure timely delivery while
                maintaining the overall look, feel, and color scheme of your chosen arrangement.
                If you have specific flower requirements or preferences, please note them in your order
                comments, and we'll do our best to accommodate them.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Flowers;
