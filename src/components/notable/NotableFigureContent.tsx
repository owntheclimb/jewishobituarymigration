'use client';

import Link from "next/link";
import Script from "next/script";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import VirtualCandle from "@/components/memorial/VirtualCandle";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Heart, Share2, BookOpen, Users, Calendar, MapPin, Quote } from "lucide-react";
import { NotableFigure, notableFigures } from "@/data/notableFigures";
import { generatePersonSchema, generateBreadcrumbSchema, schemaToString } from "@/lib/schema";

interface NotableFigureContentProps {
  figure: NotableFigure;
}

const NotableFigureContent = ({ figure }: NotableFigureContentProps) => {
  const [hasLitCandle, setHasLitCandle] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${figure.name} - Jewish Obits`,
        text: figure.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleLightCandle = () => {
    setHasLitCandle(true);
    toast.success('Virtual candle lit', {
      description: `Your light shines in memory of ${figure.name}`
    });
  };

  const relatedFigures = notableFigures
    .filter(f => f.id !== figure.id && (f.category === figure.category))
    .slice(0, 3);

  // Parse dates for schema (extracting years from "1897-1994" format)
  const parseDates = (dates: string) => {
    const parts = dates.split(' - ');
    return {
      birthDate: parts[0] || undefined,
      deathDate: parts[1] || undefined,
    };
  };

  const { birthDate, deathDate } = parseDates(figure.dates);

  // Generate Person schema for rich results
  const personSchema = useMemo(() => generatePersonSchema({
    name: figure.name,
    alternateName: figure.hebrewName || undefined,
    birthDate,
    deathDate,
    description: figure.biography || figure.excerpt,
    image: figure.image,
    url: `https://jewishobituary.com/notable/${figure.id}`,
    birthPlace: figure.location || undefined,
    jobTitle: figure.category,
  }), [figure, birthDate, deathDate]);

  // Generate breadcrumb schema
  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema([
    { name: 'Home', url: 'https://jewishobituary.com' },
    { name: 'Notable Figures', url: 'https://jewishobituary.com/notable' },
    { name: figure.name, url: `https://jewishobituary.com/notable/${figure.id}` },
  ]), [figure]);

  return (
    <div className="min-h-screen bg-background">
      {/* Schema.org structured data for rich search results */}
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(personSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToString(breadcrumbSchema) }}
      />

      <Navbar />

      {/* Breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/notable">Notable Figures</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{figure.name}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square rounded-lg overflow-hidden shadow-elegant">
              <img
                src={figure.image}
                alt={figure.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <Badge className="mb-4">{figure.category}</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{figure.name}</h1>
              <p className="text-xl text-muted-foreground mb-2">{figure.hebrewName}</p>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <span>{figure.dates}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-4 w-4" />
                <span>{figure.location}</span>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleLightCandle}
                  disabled={hasLitCandle}
                >
                  <Heart className={`mr-2 h-5 w-5 ${hasLitCandle ? 'fill-current' : ''}`} />
                  {hasLitCandle ? 'Candle Lit' : 'Light a Candle'}
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare}>
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-elegant">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Life Story</h2>
            </div>

            <p className="text-lg leading-relaxed mb-8 text-foreground">
              {figure.biography}
            </p>

            {figure.quote && (
              <div className="relative pl-6 border-l-2 border-primary/30 italic mb-8">
                <Quote className="absolute -left-3 -top-1 h-6 w-6 text-primary bg-background" />
                <p className="text-xl text-muted-foreground leading-relaxed">
                  "{figure.quote}"
                </p>
                <p className="text-sm text-muted-foreground mt-2">- {figure.name}</p>
              </div>
            )}

            <Separator className="my-8" />

            <div>
              <h3 className="text-2xl font-bold mb-4">Notable Achievements</h3>
              <ul className="space-y-3">
                {figure.achievements?.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-foreground">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </section>

      {/* Virtual Candle */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <VirtualCandle obituaryId={figure.id} entityType="notable_figure" />
        </div>
      </section>

      {/* Related Figures */}
      {relatedFigures.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">More Notable Figures</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedFigures.map((related) => (
                <Card key={related.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300">
                  <div className="aspect-square bg-muted">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <Badge className="mb-3 text-xs">{related.category}</Badge>
                    <h3 className="text-xl font-bold mb-2">{related.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {related.excerpt}
                    </p>
                    <Button size="sm" variant="outline" className="w-full" asChild>
                      <Link href={`/notable/${related.id}`}>View Memorial</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default NotableFigureContent;
