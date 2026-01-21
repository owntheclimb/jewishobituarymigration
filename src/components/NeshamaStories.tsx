import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, Quote } from 'lucide-react';
import { notableFigures } from '@/data/notableFigures';

interface FeaturedStory {
  id: string;
  name: string;
  dates: string;
  location: string;
  imageUrl: string;
  excerpt: string;
  quote: string;
  category: string;
}

// Transform notable figures to featured stories format (using real people with licensed photos)
const featuredStories: FeaturedStory[] = notableFigures.slice(0, 3).map((figure) => ({
  id: figure.id,
  name: figure.name,
  dates: figure.dates,
  location: figure.location || 'United States',
  imageUrl: figure.image,
  excerpt: figure.excerpt,
  quote: figure.quote || '',
  category: figure.category,
}));

const NeshamaStories = () => {
  const mainStory = featuredStories[0];
  const sideStories = featuredStories.slice(1);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Featured Stories
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Lives Remembered Forever
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Beautifully written tributes that capture the essence of remarkable lives and inspire us all
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Featured Story */}
          <Card className="lg:col-span-2 overflow-hidden shadow-elegant hover:shadow-lg transition-all duration-300 group">
            <div className="aspect-[16/9] overflow-hidden">
              <img 
                src={mainStory.imageUrl} 
                alt={mainStory.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <CardContent className="p-8">
              <Badge className="mb-4">{mainStory.category}</Badge>
              <h3 className="text-3xl font-bold mb-2">{mainStory.name}</h3>
              <p className="text-muted-foreground mb-4">
                {mainStory.dates} • {mainStory.location}
              </p>
              
              <div className="space-y-4 mb-6">
                <p className="text-foreground leading-relaxed">
                  {mainStory.excerpt}
                </p>
                
                <div className="relative pl-6 border-l-2 border-primary/30 italic">
                  <Quote className="absolute -left-2 -top-1 h-4 w-4 text-primary" />
                  <p className="text-muted-foreground">
                    "{mainStory.quote}"
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button asChild>
                  <Link href={`/notable/${mainStory.id}`}>
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline">
                  <Heart className="mr-2 h-4 w-4" />
                  Share Memory
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Side Stories */}
          <div className="lg:col-span-1 space-y-6">
            {sideStories.map((story) => (
              <Card key={story.id} className="overflow-hidden shadow-subtle hover:shadow-elegant transition-all duration-300 group">
                <div className="aspect-[16/9] overflow-hidden">
                  <img 
                    src={story.imageUrl} 
                    alt={story.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 text-xs">
                    {story.category}
                  </Badge>
                  <h4 className="text-xl font-bold mb-1">{story.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {story.dates}
                  </p>
                  <p className="text-sm text-foreground mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  <Button size="sm" variant="ghost" className="p-0 h-auto" asChild>
                    <Link href={`/notable/${story.id}`}>
                      Read More <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" asChild>
            <Link href="/featured-stories">
              View All Featured Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NeshamaStories;
