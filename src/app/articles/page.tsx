'use client';

import { useState } from 'react';
import Script from "next/script";
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Search, TrendingUp, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateBreadcrumbSchema, schemaToString } from '@/lib/schema';

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://jewishobituary.com' },
  { name: 'Articles', url: 'https://jewishobituary.com/articles' },
]);

const articles = [
  {
    id: 'understanding-shiva',
    title: 'Understanding the Jewish Practice of Sitting Shiva',
    category: 'Jewish Customs',
    readTime: '8 min',
    views: '12.5K',
    date: '2024-01-15',
    excerpt: 'When a Jewish person loses a close family member, the community gathers to provide comfort during a sacred time called "sitting Shiva."',
    image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop',
  },
  {
    id: 'kaddish-mourners-prayer',
    title: 'Kaddish: The Mourner\'s Prayer Explained',
    category: 'Jewish Customs',
    readTime: '10 min',
    views: '10.2K',
    date: '2024-01-20',
    excerpt: 'Understanding one of Judaism\'s most sacred prayers and its role in the mourning process.',
    image: 'https://images.unsplash.com/photo-1518414922567-18f2ab3e2f6f?w=800&h=400&fit=crop',
  },
  {
    id: 'jewish-funeral-traditions',
    title: 'Understanding Jewish Funeral Traditions',
    category: 'Jewish Customs',
    readTime: '12 min',
    views: '15.8K',
    date: '2024-01-10',
    excerpt: 'A comprehensive guide to Jewish funeral customs, from preparation to burial.',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=400&fit=crop',
  },
  {
    id: 'yahrzeit-explained',
    title: 'Yahrzeit: Honoring the Anniversary of a Death',
    category: 'Jewish Customs',
    readTime: '6 min',
    views: '6.7K',
    date: '2024-02-01',
    excerpt: 'The annual remembrance of a loved one\'s passing, Yahrzeit is a meaningful tradition that keeps their memory alive year after year.',
    image: 'https://images.unsplash.com/photo-1518414922567-18f2ab3e2f6f?w=800&h=400&fit=crop',
  },
  {
    id: 'writing-meaningful-obituary',
    title: 'How to Write a Meaningful Jewish Obituary',
    category: 'Writing Guide',
    readTime: '10 min',
    views: '8.3K',
    date: '2024-01-25',
    excerpt: 'Creating an obituary that honors your loved one\'s life can feel overwhelming. This comprehensive guide walks you through every step.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop',
  },
];

const categories = [
  'All Categories',
  'Jewish Customs',
  'Writing Guide',
  'Grief Support',
  'Practical Guides',
  'Planning',
];

const ArticlesIndex = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('recent');

  const filteredArticles = articles
    .filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Categories' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'popular') return parseInt(b.views.replace('K', '000')) - parseInt(a.views.replace('K', '000'));
      return 0;
    });

  return (
    <div className="min-h-screen bg-background">
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Articles & Guides</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive resources on Jewish traditions, funeral planning, grief support, and meaningful ways to honor loved ones.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="flex-1">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory !== 'All Categories') && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="gap-1">
                  Search: {searchTerm}
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-foreground">×</button>
                </Badge>
              )}
              {selectedCategory !== 'All Categories' && (
                <Badge variant="secondary" className="gap-1">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All Categories')} className="ml-1 hover:text-foreground">×</button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-muted-foreground">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/resources/${article.id}`}>
                <Card className="overflow-hidden h-full hover:shadow-elegant transition-all duration-300 group">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="outline">{article.category}</Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {article.views} views
                      </span>
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All Categories');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.filter(cat => cat !== 'All Categories').map((category) => (
              <Button
                key={category}
                variant="outline"
                className="h-auto py-4 px-6 justify-start"
                onClick={() => setSelectedCategory(category)}
              >
                <div className="text-left">
                  <div className="font-semibold">{category}</div>
                  <div className="text-xs text-muted-foreground">
                    {articles.filter(a => a.category === category).length} articles
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticlesIndex;
