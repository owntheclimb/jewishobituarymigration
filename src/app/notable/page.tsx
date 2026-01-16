'use client';

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, BookOpen, Heart, Users } from "lucide-react";
import { notableFigures } from "@/data/notableFigures";

const categories = [
  { name: "All", icon: Star },
  { name: "Rabbis & Religious Leaders", icon: BookOpen },
  { name: "Artists & Entertainers", icon: Heart },
  { name: "Scientists & Academics", icon: BookOpen },
  { name: "Israeli Leaders", icon: Users },
  { name: "Business & Philanthropy", icon: Users },
  { name: "Holocaust Survivors", icon: Star },
];

const NotableFigures = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [displayCount, setDisplayCount] = useState(11);

  // Filter logic
  const filteredFigures = notableFigures.filter(figure => {
    const matchesSearch = figure.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         figure.hebrewName.includes(searchQuery) ||
                         figure.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ||
                           figure.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const handleLightCandle = (figureName: string) => {
    toast.success('Virtual candle lit', {
      description: `Your light shines in memory of ${figureName}`
    });
  };

  const handleToggleFavorite = (figureId: string, figureName: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(figureId)) {
        newSet.delete(figureId);
        toast.info(`Removed ${figureName} from favorites`);
      } else {
        newSet.add(figureId);
        toast.success(`Added ${figureName} to favorites`);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Notable Jewish Figures</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Honoring the lives and legacies of prominent Jewish individuals who made lasting contributions to our world. May their memories be a blessing.
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 px-4 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.name}
                  variant={selectedCategory === cat.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  <cat.icon className="h-4 w-4 mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Figure */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">Featured Memorial</Badge>
            <h2 className="text-3xl font-bold mb-4">In Remembrance</h2>
          </div>

          <Card className="overflow-hidden hover:shadow-elegant transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="aspect-[4/3] bg-muted">
                <img
                  src={notableFigures[0].image}
                  alt={notableFigures[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className="mb-4 w-fit">{notableFigures[0].category}</Badge>
                <h3 className="text-3xl font-bold mb-2">{notableFigures[0].name}</h3>
                <p className="text-muted-foreground mb-1">{notableFigures[0].hebrewName}</p>
                <p className="text-muted-foreground mb-4">{notableFigures[0].dates}</p>
                <p className="text-foreground leading-relaxed mb-6">{notableFigures[0].excerpt}</p>

                <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                  <span>{notableFigures[0].candles.toLocaleString()} candles lit</span>
                  <span>{notableFigures[0].memories.toLocaleString()} memories shared</span>
                </div>

                <div className="flex gap-3">
                  <Button asChild>
                    <Link href={`/notable/${notableFigures[0].id}`}>View Memorial</Link>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleLightCandle(notableFigures[0].name)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Light a Candle
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Notable Figures Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Remembered with Love</h2>
            <p className="text-muted-foreground">
              Celebrating the lives of Jewish leaders, artists, thinkers, and humanitarians who shaped our world.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFigures.slice(1, displayCount).map((figure) => (
              <Card key={figure.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src={figure.image}
                    alt={figure.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <Badge className="mb-3 text-xs">{figure.category}</Badge>
                  <h3 className="text-xl font-bold mb-1">{figure.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{figure.hebrewName}</p>
                  <p className="text-sm text-muted-foreground mb-3">{figure.dates}</p>
                  <p className="text-sm text-foreground mb-4 line-clamp-2">{figure.excerpt}</p>

                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <span>{figure.candles.toLocaleString()} candles</span>
                    <span>{figure.memories.toLocaleString()} memories</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={`/notable/${figure.id}`}>View Memorial</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant={favorites.has(figure.id) ? "default" : "outline"}
                      onClick={() => handleToggleFavorite(figure.id, figure.name)}
                    >
                      <Heart className={`h-3 w-3 ${favorites.has(figure.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Load More */}
          {displayCount < filteredFigures.length && (
            <div className="text-center mt-12">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setDisplayCount(prev => Math.min(prev + 12, filteredFigures.length))}
              >
                Load More Memorials ({filteredFigures.length - displayCount} remaining)
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Honor a Loved One</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create a lasting tribute for someone special in your life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create-obituary">
                <Heart className="mr-2 h-5 w-5" />
                Create Memorial
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" />
                Search Obituaries
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotableFigures;
