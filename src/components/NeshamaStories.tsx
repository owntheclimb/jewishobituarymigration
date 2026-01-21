'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, Quote } from 'lucide-react';
import { notableFigures } from '@/data/notableFigures';

// Use all 6 notable figures - RBG featured, with different selections for variety
const featuredFigure = notableFigures[0]; // Ruth Bader Ginsburg
const sideFigures = [notableFigures[3], notableFigures[4]]; // Joan Rivers, Gene Wilder
const additionalFigures = [notableFigures[1], notableFigures[2], notableFigures[5]]; // Elie Wiesel, Leonard Nimoy, Carl Reiner

const NeshamaStories = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Lives Remembered
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-cormorant">
            Notable Jewish Figures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Honoring the lives and legacies of remarkable leaders who shaped our world
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Story */}
          <Card className="lg:col-span-2 overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 group">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={featuredFigure.image}
                alt={featuredFigure.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-8">
              <Badge className="mb-4">{featuredFigure.category}</Badge>
              <h3 className="text-3xl font-bold mb-1 font-cormorant">{featuredFigure.name}</h3>
              <p className="text-sm text-primary/70 mb-1">{featuredFigure.hebrewName}</p>
              <p className="text-muted-foreground mb-4">
                {featuredFigure.dates} • {featuredFigure.location}
              </p>

              <div className="space-y-4 mb-6">
                <p className="text-foreground leading-relaxed">
                  {featuredFigure.excerpt}
                </p>

                {featuredFigure.quote && (
                  <div className="relative pl-6 border-l-2 border-primary/30 italic">
                    <Quote className="absolute -left-2 -top-1 h-4 w-4 text-primary" />
                    <p className="text-muted-foreground">
                      "{featuredFigure.quote}"
                    </p>
                  </div>
                )}
              </div>

              <Button asChild>
                <Link href={`/notable/${featuredFigure.id}`}>
                  Read Full Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Side Stories */}
          <div className="lg:col-span-1 space-y-6">
            {sideFigures.map((figure) => (
              <Card key={figure.id} className="overflow-hidden shadow-subtle hover:shadow-elegant transition-all duration-300 group">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={figure.image}
                    alt={figure.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 text-xs">
                    {figure.category}
                  </Badge>
                  <h4 className="text-xl font-bold mb-1 font-cormorant">{figure.name}</h4>
                  <p className="text-xs text-primary/70 mb-1">{figure.hebrewName}</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {figure.dates}
                  </p>
                  <p className="text-sm text-foreground mb-4 line-clamp-2">
                    {figure.excerpt}
                  </p>
                  <Button size="sm" variant="ghost" className="p-0 h-auto" asChild>
                    <Link href={`/notable/${figure.id}`}>
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Figures Row - Show remaining 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {additionalFigures.map((figure) => (
            <Card key={figure.id} className="overflow-hidden shadow-subtle hover:shadow-elegant transition-all duration-300 group">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={figure.image}
                  alt={figure.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-5">
                <Badge variant="outline" className="mb-2 text-xs">
                  {figure.category}
                </Badge>
                <h4 className="text-lg font-bold mb-1 font-cormorant">{figure.name}</h4>
                <p className="text-xs text-primary/70 mb-1">{figure.hebrewName}</p>
                <p className="text-xs text-muted-foreground mb-2">
                  {figure.dates}
                </p>
                <Button size="sm" variant="ghost" className="p-0 h-auto text-sm" asChild>
                  <Link href={`/notable/${figure.id}`}>
                    View Memorial <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/notable">
              View All Notable Figures
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NeshamaStories;
