'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Heart, BookOpen, Users, ArrowRight, ExternalLink } from 'lucide-react';
import { notableFigures } from '@/data/notableFigures';

// Get Elie Wiesel from notable figures - a real Holocaust survivor
const elieWiesel = notableFigures.find(f => f.id === 'elie-wiesel');

const HolocaustMemorial = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Flame className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Honoring Holocaust Survivors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Remembering those who survived the darkest chapter of human history and dedicated their lives to ensuring we never forget. Their testimonies, courage, and resilience continue to inspire generations.
          </p>

          <div className="flex justify-center gap-2 mb-8">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Flame className="h-3 w-3 mr-2" />
              Never Forget
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <BookOpen className="h-3 w-3 mr-2" />
              Bear Witness
            </Badge>
            <Badge variant="secondary" className="text-sm py-2 px-4">
              <Users className="h-3 w-3 mr-2" />
              Unite for Tolerance
            </Badge>
          </div>

          <div className="prose prose-lg mx-auto text-left bg-card p-8 rounded-xl shadow-subtle border">
            <p className="text-foreground leading-relaxed italic">
              &quot;For the dead and the living, we must bear witness. Not only are we responsible for the memories of the dead, we are also responsible for what we are doing with those memories.&quot;
            </p>
            <p className="text-sm text-muted-foreground text-right">- Elie Wiesel</p>
          </div>
        </div>
      </section>

      {/* Featured Survivor - Elie Wiesel */}
      {elieWiesel && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <Badge variant="secondary" className="mb-4">Featured Memorial</Badge>
              <h2 className="text-3xl font-bold mb-4">In Loving Memory</h2>
            </div>

            <Card className="overflow-hidden shadow-elegant">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[4/3] bg-muted">
                  <img
                    src={elieWiesel.image}
                    alt={elieWiesel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge className="mb-4 w-fit">{elieWiesel.category}</Badge>
                  <h3 className="text-3xl font-bold mb-2">{elieWiesel.name}</h3>
                  <p className="text-muted-foreground mb-1">{elieWiesel.hebrewName}</p>
                  <p className="text-muted-foreground mb-6">{elieWiesel.dates}</p>

                  <p className="text-foreground leading-relaxed mb-6">
                    {elieWiesel.excerpt}
                  </p>

                  <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Flame className="h-4 w-4" />
                      {elieWiesel.candles.toLocaleString()} candles lit
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {elieWiesel.memories} memories
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button asChild>
                      <Link href={`/notable/${elieWiesel.id}`}>
                        View Memorial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline">
                      <Flame className="mr-2 h-4 w-4" />
                      Light Candle
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Holocaust Remembrance Resources */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Holocaust Remembrance Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access archives, testimonies, and educational resources to learn about and honor Holocaust survivors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Yad Vashem
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4 text-sm">
                  The World Holocaust Remembrance Center. Search their database of over 4.8 million names.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.yadvashem.org" target="_blank" rel="noopener noreferrer">
                    Visit Yad Vashem
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  USC Shoah Foundation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4 text-sm">
                  Access the Visual History Archive containing over 55,000 survivor testimonies.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://sfi.usc.edu" target="_blank" rel="noopener noreferrer">
                    View Archive
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Flame className="h-5 w-5 text-primary" />
                  United States Holocaust Memorial Museum
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4 text-sm">
                  America&apos;s national institution for Holocaust documentation, education, and research.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.ushmm.org" target="_blank" rel="noopener noreferrer">
                    Explore Museum
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="h-5 w-5 text-primary" />
                  Claims Conference
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4 text-sm">
                  Supporting Holocaust survivors and preserving their memory worldwide.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.claimscon.org" target="_blank" rel="noopener noreferrer">
                    Learn More
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Writing Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4 text-sm">
                  Our guide to writing meaningful obituaries for Holocaust survivors.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/resources/holocaust-survivor-obituary">
                    Read Guide
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-primary" />
                  International Tracing Service
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4 text-sm">
                  Search records of Nazi persecution and locate information about victims.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://arolsen-archives.org" target="_blank" rel="noopener noreferrer">
                    Search Archives
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Honor a Holocaust Survivor</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create a memorial to preserve their story and ensure their memory lives on forever.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create-obituary">
                <Heart className="mr-2 h-5 w-5" />
                Create Memorial
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/resources/holocaust-survivor-obituary">
                <BookOpen className="mr-2 h-5 w-5" />
                Writing Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HolocaustMemorial;
