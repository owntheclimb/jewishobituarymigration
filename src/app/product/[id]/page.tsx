'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RatingStars from '@/components/product/RatingStars';
import ProductReviews from '@/components/product/ProductReviews';
import { useCart } from '@/contexts/CartContext';
import {
  ShoppingCart,
  Heart,
  Share2,
  CheckCircle,
  Truck,
  Shield,
  Clock,
  ArrowLeft,
  Package,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

// Import images
import peacefulWhiteLilies from '@/assets/peaceful-white-lilies.jpg';
import gardenOfGraceSpray from '@/assets/garden-of-grace-spray.jpg';
import comfortPlanter from '@/assets/comfort-planter.jpg';
import sympathyGiftBasket from '@/assets/sympathy-gift-basket.jpg';
import memorialWindChimes from '@/assets/memorial-wind-chimes.jpg';
import remembranceRoseBouquet from '@/assets/remembrance-rose-bouquet.jpg';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  fullDescription: string;
  features: string[];
  kosher: boolean;
  deliveryInfo: string;
}

const ProductDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  // Product database - in production this would come from your backend
  const products: { [key: string]: Product } = {
    '1': {
      id: 1,
      name: 'Peaceful White Lilies',
      price: 89.99,
      category: 'bouquets',
      rating: 4.8,
      reviewCount: 127,
      image: peacefulWhiteLilies.src,
      images: [peacefulWhiteLilies.src, peacefulWhiteLilies.src, peacefulWhiteLilies.src],
      description: 'Elegant white lilies and roses arranged with care',
      fullDescription: 'Our Peaceful White Lilies arrangement embodies serenity and grace during difficult times. Hand-selected white Oriental lilies are perfectly complemented by premium white roses, delicate baby\'s breath, and lush greenery. Each stem is carefully arranged by our expert florists to create a stunning tribute that conveys your deepest sympathies with elegance and respect.',
      features: [
        'Premium white Oriental lilies',
        'Fresh white roses',
        'Delicate baby\'s breath and greenery',
        'Arranged by expert florists',
        'Delivered in elegant vase',
        'Guaranteed fresh for 7+ days'
      ],
      kosher: true,
      deliveryInfo: 'Same-day delivery available if ordered by 2 PM EST'
    },
    '2': {
      id: 2,
      name: 'Garden of Grace Standing Spray',
      price: 149.99,
      category: 'sprays',
      rating: 4.9,
      reviewCount: 89,
      image: gardenOfGraceSpray.src,
      images: [gardenOfGraceSpray.src, gardenOfGraceSpray.src, gardenOfGraceSpray.src],
      description: 'Professional funeral standing arrangement',
      fullDescription: 'The Garden of Grace Standing Spray is a magnificent tribute featuring an abundant selection of premium flowers in soft, comforting tones. This professional arrangement is designed to stand beside a casket or at the service entrance, creating a beautiful focal point that honors the memory of your loved one with dignity and grace.',
      features: [
        'Large 6-foot standing arrangement',
        'Premium mixed flowers',
        'Elegant easel included',
        'Professional design',
        'Direct funeral home delivery',
        'Freshness guaranteed'
      ],
      kosher: true,
      deliveryInfo: 'Delivered directly to funeral home with advance notice'
    },
    '3': {
      id: 3,
      name: 'Comfort Planter',
      price: 64.99,
      category: 'plants',
      rating: 4.7,
      reviewCount: 156,
      image: comfortPlanter.src,
      images: [comfortPlanter.src, comfortPlanter.src, comfortPlanter.src],
      description: 'Living peace lily in decorative planter',
      fullDescription: 'The Comfort Planter offers a lasting living memorial with its elegant peace lily plant. Known for its air-purifying qualities and graceful white blooms, this peace lily arrives in a beautiful ceramic planter, providing comfort that endures long after the service. A thoughtful gift that continues to grow and flourish as a living tribute.',
      features: [
        'Mature peace lily plant',
        'Decorative ceramic planter',
        'Low maintenance and hardy',
        'Air purifying qualities',
        'Symbolic white blooms',
        'Care instructions included'
      ],
      kosher: true,
      deliveryInfo: 'Ships within 2-3 business days'
    },
    '4': {
      id: 4,
      name: 'Sympathy Fruit & Gourmet Basket',
      price: 79.99,
      category: 'baskets',
      rating: 4.6,
      reviewCount: 203,
      image: sympathyGiftBasket.src,
      images: [sympathyGiftBasket.src, sympathyGiftBasket.src, sympathyGiftBasket.src],
      description: 'Thoughtful collection of gourmet treats',
      fullDescription: 'Our Sympathy Fruit & Gourmet Basket provides nourishment and comfort during difficult times. Carefully curated with fresh seasonal fruits, premium nuts, gourmet crackers, artisanal cheeses, and sweet treats, this generous basket offers something for everyone. Perfect for shiva visits or to provide sustenance for grieving families.',
      features: [
        'Fresh seasonal fruits',
        'Premium nuts and dried fruits',
        'Gourmet crackers and cheeses',
        'Kosher certified items',
        'Elegant presentation basket',
        'Serves 8-12 people'
      ],
      kosher: true,
      deliveryInfo: 'Perfect for shiva house delivery - arrives same or next day'
    },
    '5': {
      id: 5,
      name: 'Memorial Wind Chimes',
      price: 34.99,
      category: 'keepsakes',
      rating: 4.8,
      reviewCount: 342,
      image: memorialWindChimes.src,
      images: [memorialWindChimes.src, memorialWindChimes.src, memorialWindChimes.src],
      description: 'Beautiful keepsake with gentle sounds',
      fullDescription: 'These Memorial Wind Chimes create a peaceful, lasting tribute with their gentle melodies. Crafted from premium materials with a weather-resistant finish, they feature carefully tuned chimes that produce harmonious tones when touched by the breeze. The personalized charm can be engraved with a name, date, or meaningful phrase, creating a cherished keepsake that brings comfort for years to come.',
      features: [
        'Premium metal construction',
        'Weather-resistant finish',
        'Harmoniously tuned chimes',
        'Optional personalization',
        'Includes hanging hook',
        'Lifetime guarantee'
      ],
      kosher: false,
      deliveryInfo: 'Ships within 3-5 business days (personalization adds 2-3 days)'
    },
    '6': {
      id: 6,
      name: 'Remembrance Rose Bouquet',
      price: 69.99,
      category: 'bouquets',
      rating: 4.9,
      reviewCount: 178,
      image: remembranceRoseBouquet.src,
      images: [remembranceRoseBouquet.src, remembranceRoseBouquet.src, remembranceRoseBouquet.src],
      description: 'Stunning roses in remembrance colors',
      fullDescription: 'The Remembrance Rose Bouquet features exquisite premium roses in soft, comforting hues. Each rose is hand-selected at its peak freshness and expertly arranged with complementary greenery and delicate accents. This classic arrangement expresses your sympathy with timeless elegance and shows your support during a difficult time.',
      features: [
        'Two dozen premium roses',
        'Soft remembrance colors',
        'Lush greenery accents',
        'Hand-arranged by experts',
        'Elegant presentation vase',
        'Guaranteed fresh for 10+ days'
      ],
      kosher: true,
      deliveryInfo: 'Same-day delivery available in most areas'
    }
  };

  const product = products[id || '1'];

  useEffect(() => {
    if (!product) {
      router.push('/flowers');
    }
  }, [product, router]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    addItem({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      deliveryDate,
      giftMessage: giftMessage || undefined
    }, quantity);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const relatedProducts = Object.values(products)
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/flowers" className="hover:text-foreground transition-colors">Flowers & Gifts</Link>
          <span>/</span>
          <span className="text-foreground capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <Button
          variant="ghost"
          className="mb-6 gap-2"
          asChild
        >
          <Link href="/flowers">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-0 shadow-elegant">
              <div className="relative aspect-square bg-muted">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.kosher && (
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Kosher Certified
                  </Badge>
                )}
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-primary scale-105 shadow-md'
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="outline" className="capitalize">{product.category}</Badge>
                <RatingStars rating={product.rating} size="sm" />
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              <h1 className="text-4xl font-serif font-bold text-foreground mb-4 leading-tight">
                {product.name}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="text-4xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </div>
            </div>

            <Separator />

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery-date">Delivery Date (Optional)</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="delivery-date"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 gap-2 h-14 text-lg font-semibold shadow-subtle"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-6"
                  onClick={() => {
                    setIsFavorite(!isFavorite);
                    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
                  }}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-14 px-6"
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Features */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Delivery Info */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="text-center p-4 border-border/50">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Over $100</p>
              </Card>
              <Card className="text-center p-4 border-border/50">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Same Day</p>
                <p className="text-xs text-muted-foreground">Order by 2 PM</p>
              </Card>
              <Card className="text-center p-4 border-border/50">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium">Guaranteed</p>
                <p className="text-xs text-muted-foreground">Fresh & Safe</p>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
            <TabsTrigger value="message">Gift Message</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">Product Description</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {product.fullDescription}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="delivery" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">Delivery Information</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {product.deliveryInfo}
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2">Important Notes:</p>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>We coordinate with funeral homes for timely delivery</li>
                    <li>Photos are representative; actual arrangement may vary</li>
                    <li>Substitutions may be made based on availability</li>
                    <li>Contact us for international delivery options</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="message" className="mt-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">Add a Personal Message</h3>
                <p className="text-muted-foreground mb-4">
                  Include a heartfelt message with your arrangement (optional)
                </p>
                <Textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="With deepest sympathy..."
                  rows={4}
                  maxLength={200}
                  className="mb-2"
                />
                <p className="text-xs text-muted-foreground">
                  {giftMessage.length}/200 characters
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reviews */}
        <ProductReviews
          productId={product.id}
          averageRating={product.rating}
          totalReviews={product.reviewCount}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-serif font-bold mb-8">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden border-border/50 hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <RatingStars rating={relatedProduct.rating} size="sm" className="mb-2" />
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
