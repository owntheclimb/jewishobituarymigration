'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flame, Heart, BookOpen, Users, ArrowRight } from 'lucide-react';

const survivors = [
  {
    id: 'survivor-1',
    name: 'Miriam Sarah Levy',
    hebrewName: 'מרים שרה לוי',
    dates: '1932-2024',
    camp: 'Auschwitz Survivor',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    story: 'Survived Auschwitz and dedicated her life to Holocaust education, ensuring future generations would never forget.',
    candles: 3421,
    memories: 187
  },
  {
    id: 'survivor-2',
    name: 'Isaac Rosenbaum',
    hebrewName: 'יצחק רוזנבאום',
    dates: '1928-2023',
    camp: 'Bergen-Belsen Survivor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    story: 'Liberated from Bergen-Belsen in 1945, became a prominent voice for remembrance and reconciliation.',
    candles: 2876,
    memories: 156
  },
  {
    id: 'survivor-3',
    name: 'Ruth Goldberg',
    hebrewName: 'רות גולדברג',
    dates: '1930-2024',
    camp: 'Hidden Child Survivor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    story: 'Hidden by a Christian family in Poland, dedicated her life to interfaith dialogue and understanding.',
    candles: 4102,
    memories: 203
  },
  {
    id: 'survivor-4',
    name: 'Abraham Stein',
    hebrewName: 'אברהם שטיין',
    dates: '1925-2022',
    camp: 'Dachau Survivor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    story: 'Author of multiple testimonies, spoke at schools and universities worldwide about his experiences.',
    candles: 3654,
    memories: 178
  },
  {
    id: 'survivor-5',
    name: 'Esther Weinstein',
    hebrewName: 'אסתר ויינשטיין',
    dates: '1931-2023',
    camp: 'Mauthausen Survivor',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    story: 'Reunited with family after the war, established a foundation supporting Holocaust education.',
    candles: 2943,
    memories: 142
  },
  {
    id: 'survivor-6',
    name: 'David Klein',
    hebrewName: 'דוד קליין',
    dates: '1929-2024',
    camp: 'Treblinka Survivor',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    story: 'One of the few survivors of Treblinka, devoted his life to bearing witness and teaching tolerance.',
    candles: 5234,
    memories: 267
  }
];

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
              "For the dead and the living, we must bear witness. Not only are we responsible for the memories of the dead, we are also responsible for what we are doing with those memories."
            </p>
            <p className="text-sm text-muted-foreground text-right">- Elie Wiesel</p>
          </div>
        </div>
      </section>

      {/* Featured Survivor */}
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
                  src={survivors[0].image}
                  alt={survivors[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="mb-4 w-fit">{survivors[0].camp}</Badge>
                <h3 className="text-3xl font-bold mb-2">{survivors[0].name}</h3>
                <p className="text-muted-foreground mb-1">{survivors[0].hebrewName}</p>
                <p className="text-muted-foreground mb-6">{survivors[0].dates}</p>

                <p className="text-foreground leading-relaxed mb-6">
                  {survivors[0].story}
                </p>

                <div className="flex items-center gap-6 mb-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Flame className="h-4 w-4" />
                    {survivors[0].candles.toLocaleString()} candles lit
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {survivors[0].memories} memories
                  </span>
                </div>

                <div className="flex gap-3">
                  <Button asChild>
                    <Link href={`/memorial/${survivors[0].id}`}>
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

      {/* Survivors Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Remembered with Love & Honor</h2>
            <p className="text-muted-foreground">
              Each survivor carried an extraordinary story of resilience, courage, and hope. Their memories are eternal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {survivors.slice(1).map((survivor) => (
              <Card key={survivor.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                <div className="aspect-[4/3] bg-muted overflow-hidden">
                  <img
                    src={survivor.image}
                    alt={survivor.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3 text-xs">
                    {survivor.camp}
                  </Badge>
                  <h3 className="text-xl font-bold mb-1">{survivor.name}</h3>
                  <p className="text-sm text-muted-foreground mb-1">{survivor.hebrewName}</p>
                  <p className="text-sm text-muted-foreground mb-4">{survivor.dates}</p>

                  <p className="text-sm text-foreground mb-4 line-clamp-3">
                    {survivor.story}
                  </p>

                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {survivor.candles.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {survivor.memories}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link href={`/memorial/${survivor.id}`}>View Memorial</Link>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Flame className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Holocaust Survivor Memorials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Educational Resources */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Holocaust Education Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Learn about the Holocaust, its history, and the importance of remembrance through curated educational materials.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/resources/holocaust-education">
                    Explore Resources
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-elegant transition-all">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Support Holocaust Education
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">
                  Support organizations dedicated to Holocaust education, remembrance, and combating antisemitism.
                </p>
                <Button variant="outline" asChild>
                  <Link href="/charities/holocaust">
                    View Organizations
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
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
          <Button size="lg" asChild>
            <Link href="/create-obituary">
              <Heart className="mr-2 h-5 w-5" />
              Create Memorial
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HolocaustMemorial;
