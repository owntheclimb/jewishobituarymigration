'use client';

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, ArrowRight, BookOpen } from "lucide-react";
import { notableFigures } from "@/data/notableFigures";

// Transform notable figures to featured stories format (using real people with licensed photos)
const featuredStories = notableFigures.map((figure) => ({
  id: figure.id,
  name: figure.name,
  dates: figure.dates,
  location: figure.location || 'United States',
  imageUrl: figure.image,
  category: figure.category,
  excerpt: figure.excerpt,
}));

const categories = [
  { name: "All Stories", value: "all" },
  { name: "Legal & Justice", value: "Legal Pioneer" },
  { name: "Holocaust Survivors", value: "Holocaust Survivor" },
  { name: "Entertainment", value: "Actor" },
  { name: "Comedy", value: "Comedian" },
];

const FeaturedStories = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredStories = featuredStories.filter(story => {
    const matchesSearch = story.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         story.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || story.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Featured Life Stories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Beautifully written tributes that capture the essence of remarkable lives. Each story is a testament to the impact one person can have on their family, community, and the world.
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
                placeholder="Search stories by name, location, or keywords..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {filteredStories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-6">
                No stories found matching your search.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-muted-foreground">
                  Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story) => (
                  <Card key={story.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={story.imageUrl}
                        alt={story.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3 text-xs">{story.category}</Badge>
                      <h3 className="text-xl font-bold mb-1">{story.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {story.dates} - {story.location}
                      </p>
                      <p className="text-sm text-foreground mb-4 line-clamp-3">
                        {story.excerpt}
                      </p>
                      <Button size="sm" variant="outline" className="w-full group" asChild>
                        <Link href={`/notable/${story.id}`}>
                          Read Full Story
                          <ArrowRight className="ml-2 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Share Your Loved One's Story</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Every life has a story worth telling. Create a beautiful memorial to honor someone special.
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
                Browse Memorials
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturedStories;
