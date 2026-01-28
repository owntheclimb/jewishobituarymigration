'use client';

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Heart, Users, HelpCircle, Search, Clock, TrendingUp } from "lucide-react";

const featuredArticles = [
  {
    id: "understanding-shiva",
    title: "Understanding the Jewish Practice of Sitting Shiva",
    category: "Jewish Customs",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&h=400&fit=crop",
    excerpt: "When a Jewish person loses a close family member, the community gathers to provide comfort during a sacred time called 'sitting Shiva.' Learn about this ancient tradition.",
    views: "12.5K"
  },
  {
    id: "writing-meaningful-obituary",
    title: "How to Write a Meaningful Jewish Obituary",
    category: "Writing Guide",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=400&fit=crop",
    excerpt: "Creating an obituary that honors your loved one's life can feel overwhelming. This comprehensive guide walks you through every step.",
    views: "8.3K"
  },
  {
    id: "yahrzeit-explained",
    title: "Yahrzeit: Honoring the Anniversary of a Death",
    category: "Jewish Customs",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518414922567-18f2ab3e2f6f?w=800&h=400&fit=crop",
    excerpt: "The annual remembrance of a loved one's passing, Yahrzeit is a meaningful tradition that keeps their memory alive year after year.",
    views: "6.7K"
  },
];

const articleCategories = [
  {
    name: "Jewish Funeral & Mourning Customs",
    icon: BookOpen,
    count: 12,
    articles: [
      "Understanding Jewish Funeral Traditions",
      "What to Expect at a Jewish Funeral",
      "Kaddish: The Mourner's Prayer Explained",
      "Sheloshim: The 30-Day Mourning Period",
    ]
  },
  {
    name: "Writing & Planning Guides",
    icon: Heart,
    count: 8,
    articles: [
      "Obituary Templates and Examples",
      "Writing a Hesped (Jewish Eulogy)",
      "Planning a Jewish Funeral Service",
      "How to Announce a Death in the Community",
    ]
  },
  {
    name: "Grief & Support",
    icon: Users,
    count: 10,
    articles: [
      "Coping with Loss: A Jewish Perspective",
      "Supporting Someone Sitting Shiva",
      "Making a Shiva Call: Etiquette and Customs",
      "Finding Meaning in Loss",
    ]
  },
  {
    name: "Practical Guides",
    icon: HelpCircle,
    count: 7,
    articles: [
      "Jewish Funeral Costs: What to Expect",
      "How to Choose a Jewish Funeral Home",
      "Estate Planning for Jewish Families",
      "Writing an Ethical Will (Tzava'ah)",
    ]
  },
];

const popularArticles = [
  { title: "The Meaning of 'May Their Memory Be a Blessing'", views: "15.2K", readTime: "5 min" },
  { title: "What to Wear to a Jewish Funeral", views: "11.8K", readTime: "4 min" },
  { title: "Jewish Sympathy Card Messages", views: "9.4K", readTime: "6 min" },
  { title: "What to Bring to a Shiva House", views: "8.9K", readTime: "5 min" },
  { title: "Unveiling Ceremony: Dedicating a Headstone", views: "7.6K", readTime: "7 min" },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Grief Support & Resources</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive guides on Jewish traditions, funeral planning, and finding comfort during difficult times.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search articles, guides, and resources..."
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge variant="secondary" className="mb-2">Featured</Badge>
              <h2 className="text-3xl font-bold">Essential Reading</h2>
            </div>
            <Button variant="outline" asChild>
              <Link href="/resources/articles">View All Articles</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
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
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {article.views} views
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={article.id === 'understanding-shiva' ? '/articles/shiva' : article.id === 'writing-meaningful-obituary' ? '/articles/writing-obituary' : article.id === 'yahrzeit-explained' ? '/articles/yahrzeit' : `/resources/${article.id}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Article Categories Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground">
              Find articles and guides organized by topic to help you navigate Jewish traditions and grief support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articleCategories.map((category) => (
              <Card key={category.name} className="p-6 hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                    </div>
                    <ul className="space-y-2">
                      {category.articles.map((article) => {
                        let linkPath = '/resources';
                        if (article === 'Understanding Jewish Funeral Traditions') linkPath = '/articles/jewish-funeral';
                        else if (article === 'What to Expect at a Jewish Funeral') linkPath = '/articles/jewish-funeral';
                        else if (article === 'Kaddish: The Mourner\'s Prayer Explained') linkPath = '/articles/kaddish';
                        else if (article === 'Sheloshim: The 30-Day Mourning Period') linkPath = '/articles/sheloshim';
                        else if (article === 'Obituary Templates and Examples') linkPath = '/articles/writing-obituary';
                        else if (article === 'Writing a Hesped (Jewish Eulogy)') linkPath = '/articles/writing-obituary';
                        else if (article === 'Planning a Jewish Funeral Service') linkPath = '/articles/planning-funeral';
                        else if (article === 'How to Announce a Death in the Community') linkPath = '/articles/writing-obituary';
                        else if (article === 'Coping with Loss: A Jewish Perspective') linkPath = '/grief-support';
                        else if (article === 'Supporting Someone Sitting Shiva') linkPath = '/articles/shiva';
                        else if (article === 'Making a Shiva Call: Etiquette and Customs') linkPath = '/articles/shiva';
                        else if (article === 'Finding Meaning in Loss') linkPath = '/grief-support';
                        else if (article === 'Jewish Funeral Costs: What to Expect') linkPath = '/articles/jewish-funeral-costs';
                        else if (article === 'How to Choose a Jewish Funeral Home') linkPath = '/funeral-homes';
                        else if (article === 'Estate Planning for Jewish Families') linkPath = '/planning';
                        else if (article === 'Writing an Ethical Will (Tzava\'ah)') linkPath = '/articles/writing-obituary';
                        return (
                          <li key={article}>
                            <Link
                              href={linkPath}
                              className="text-sm text-muted-foreground hover:text-primary hover:underline transition-colors"
                            >
                              {article}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <Button variant="link" className="mt-3 p-0 h-auto" asChild>
                      <Link href="/resources/articles">
                        View all {category.count} articles
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles Sidebar Style */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Recently Added</h2>
              <p className="text-muted-foreground">Our latest articles and guides to support you.</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  id: 'kaddish-mourners-prayer',
                  title: "Kaddish: The Mourner's Prayer Explained",
                  category: 'Jewish Customs',
                  excerpt: "Understanding one of Judaism's most sacred prayers and its role in the mourning process.",
                  readTime: '10 min read',
                  date: 'Jan 20, 2024',
                  image: 'https://images.unsplash.com/photo-1518414922567-18f2ab3e2f6f?w=200&h=150&fit=crop'
                },
                {
                  id: 'jewish-funeral-traditions',
                  title: 'Understanding Jewish Funeral Traditions',
                  category: 'Jewish Customs',
                  excerpt: 'A comprehensive guide to Jewish funeral customs, from preparation to burial.',
                  readTime: '12 min read',
                  date: 'Jan 10, 2024',
                  image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&h=150&fit=crop'
                },
                {
                  id: 'sheloshim',
                  title: 'Sheloshim: The 30-Day Mourning Period',
                  category: 'Jewish Customs',
                  excerpt: 'Learn about the significance of the 30-day mourning period following a Jewish burial.',
                  readTime: '8 min read',
                  date: 'Jan 5, 2024',
                  image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=200&h=150&fit=crop'
                }
              ].map((article) => (
                <Link key={article.id} href={`/articles/${article.id === 'kaddish-mourners-prayer' ? 'kaddish' : article.id === 'jewish-funeral-traditions' ? 'jewish-funeral' : article.id}`}>
                  <Card className="p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer group">
                    <div className="flex gap-4">
                      <div className="w-32 h-24 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <Badge variant="outline" className="mb-2">{article.category}</Badge>
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                          <span>{article.date}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Most Popular
              </h3>
              <ul className="space-y-4">
                {popularArticles.map((article, index) => {
                  let linkPath = '/resources';
                  if (article.title.includes('Memory Be a Blessing')) linkPath = '/articles/kaddish';
                  else if (article.title.includes('What to Wear')) linkPath = '/articles/jewish-funeral';
                  else if (article.title.includes('Sympathy Card')) linkPath = '/articles/writing-obituary';
                  else if (article.title.includes('Shiva House')) linkPath = '/articles/shiva';
                  else if (article.title.includes('Unveiling Ceremony')) linkPath = '/articles/unveiling-ceremony';
                  return (
                    <li key={article.title} className="pb-4 border-b last:border-0 last:pb-0">
                      <Link
                        href={linkPath}
                        className="block group"
                      >
                      <div className="flex gap-3">
                        <span className="text-2xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              {article.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {article.readTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Need Personal Support?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our team is here to help you through this difficult time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">
                <Heart className="mr-2 h-5 w-5" />
                Contact Support
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/faq">
                <HelpCircle className="mr-2 h-5 w-5" />
                View FAQ
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
