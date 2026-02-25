'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Heart, Star, Shield, MapPin, Search, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

interface Hero {
  name: string;
  age?: number;
  unit: string;
  date: string;
  location: string;
  story: string;
  image: string;
}

const IsraeliHeroesMemorial = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [litCandles, setLitCandles] = useState<Set<number>>(new Set());

  const heroes: Hero[] = [
    {
      name: "Captain Omer Neutra",
      age: 22,
      unit: "77th Battalion, 7th Armored Brigade",
      date: "October 7, 2023",
      location: "Nova Music Festival, Re'im",
      story: "An American-Israeli officer from Valley Stream, New York, Omer was at the Nova music festival on the morning of October 7 when Hamas attacked. He was taken hostage while trying to shield other festival-goers. His body was returned to Israel in January 2025 as part of a ceasefire deal. Beloved by all who knew him, his memory lives on as a symbol of love for Israel and for life.",
      image: "/placeholder-memorial.svg",
    },
    {
      name: "Staff Sergeant Yosef Hieb",
      age: 20,
      unit: "Nahal Brigade",
      date: "October 7, 2023",
      location: "Kibbutz Be'eri",
      story: "Sacrificed his life protecting civilians during the Hamas assault on Kibbutz Be'eri on October 7. His courage and dedication to the people he was sworn to defend will never be forgotten. He ran toward the danger when others could not.",
      image: "/placeholder-memorial.svg",
    },
    {
      name: "Captain Eden Nimri",
      unit: "Unit 414, Combat Intelligence Collection Corps",
      date: "October 7, 2023",
      location: "Nahal Oz Military Base",
      story: "Armed and stationed at the shelter entrance, Eden positioned herself to defend dozens of unarmed female observers sheltering behind her. When terrorists stormed the shelter, she opened fire and held her ground until she ran out of ammunition. She gave her life so her fellow soldiers could survive. The IDF called her heroism extraordinary.",
      image: "/placeholder-memorial.svg",
    },
    {
      name: "Sergeant Shai Biton",
      unit: "Unit 414, Combat Intelligence Collection Corps",
      date: "October 7, 2023",
      location: "Nahal Oz Military Base",
      story: "One of only a handful of armed soldiers among the Nahal Oz observers, Shai engaged the terrorists who stormed the shelter where she and her fellow observers had taken cover. She managed to kill a terrorist before being killed herself — an act of extraordinary bravery while still wearing her sleeping clothes.",
      image: "/placeholder-memorial.svg",
    },
    {
      name: "Sergeant Roni Eshel",
      age: 19,
      unit: "Unit 414, Combat Intelligence Collection Corps",
      date: "October 7, 2023",
      location: "Nahal Oz Military Base",
      story: "One of 16 female surveillance soldiers killed at the Nahal Oz observation post. Roni and her fellow observers had been warning their commanders for months about suspicious Hamas training and activity along the Gaza border. Their reports were dismissed. She remained at her post, eyes on the fence, until the very end. She was 19 years old.",
      image: "/placeholder-memorial.svg",
    },
    {
      name: "Major Shilo Har-Even",
      unit: "13th Battalion, Golani Brigade",
      date: "October 7, 2023",
      location: "Nahal Oz Military Base",
      story: "Led a team of six Golani soldiers in a Namer armored carrier to retake the overrun Nahal Oz base and rescue soldiers still fighting inside. Wounded in the hand during the assault, Har-Even refused evacuation and continued to lead the counterattack. He was killed in action. His soldiers said he never stopped fighting for those left behind.",
      image: "/placeholder-memorial.svg",
    },
  ];

  const handleLightCandle = (index: number, name: string) => {
    setLitCandles((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
        toast(`Candle extinguished in memory of ${name}`);
      } else {
        next.add(index);
        toast.success(`A candle is lit in memory of ${name}`, {
          description: 'May their memory be a blessing — זכרונו לברכה',
        });
      }
      return next;
    });
  };

  const handleViewProfile = (name: string) => {
    const url = `https://qav2.izkor.mod.gov.il/en/fallen?q=${encodeURIComponent(name)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredHeroes = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hero.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hero.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/20">Israeli Heroes Memorial</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Honoring Those Who Fell Defending Israel
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A sacred space dedicated to remembering the brave soldiers and civilians who gave their lives protecting the State of Israel and the Jewish people.
          </p>
        </div>
      </section>

      {/* Search and Stats Section */}
      <section className="py-12 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground">2,847</div>
              <div className="text-sm text-muted-foreground">Fallen Soldiers</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground">1,423</div>
              <div className="text-sm text-muted-foreground">Civilian Victims</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground">89</div>
              <div className="text-sm text-muted-foreground">Medal of Valor Recipients</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-3xl font-bold text-foreground">47</div>
              <div className="text-sm text-muted-foreground">Memorial Sites</div>
            </Card>
          </div>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name, unit, or location..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Heroes */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Heroes</h2>
            <p className="text-muted-foreground text-lg">
              May their memory be a blessing and their sacrifice never forgotten
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredHeroes.map((hero, index) => {
              const candleLit = litCandles.has(index);
              return (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative">
                    <img
                      src={hero.image}
                      alt={hero.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-4 right-4 bg-primary/90">
                      זכרונו לברכה
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{hero.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {hero.age && <Badge variant="outline">Age {hero.age}</Badge>}
                      <Badge variant="outline">{hero.unit}</Badge>
                    </div>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p><strong className="text-foreground">Date:</strong> {hero.date}</p>
                      <p><strong className="text-foreground">Location:</strong> {hero.location}</p>
                    </div>
                    <p className="text-foreground leading-relaxed mb-4">{hero.story}</p>
                    <div className="flex gap-3">
                      <Button
                        variant={candleLit ? 'default' : 'outline'}
                        className={`flex-1 transition-all ${candleLit ? 'bg-amber-500 hover:bg-amber-600 border-amber-500 text-white' : ''}`}
                        onClick={() => handleLightCandle(index, hero.name)}
                      >
                        <Flame className={`mr-2 h-4 w-4 ${candleLit ? 'animate-pulse' : ''}`} />
                        {candleLit ? 'Candle Lit' : 'Light Memorial Candle'}
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleViewProfile(hero.name)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Full Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredHeroes.length === 0 && (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">No heroes found matching your search.</p>
            </Card>
          )}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Memorials</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Shield className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">IDF Soldiers</h3>
              <p className="text-muted-foreground mb-4">
                Honoring those who served in the Israel Defense Forces
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://qav2.izkor.mod.gov.il/en/fallen" target="_blank" rel="noopener noreferrer">
                  Browse All
                </a>
              </Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Heart className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">October 7th Victims</h3>
              <p className="text-muted-foreground mb-4">
                Remembering those lost in the October 7th attacks
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://www.nli.org.il/en/visit/exhibitions-and-displays/displays/7-october-victims" target="_blank" rel="noopener noreferrer">
                  Browse All
                </a>
              </Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Star className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Decorated Heroes</h3>
              <p className="text-muted-foreground mb-4">
                Medal of Valor and distinguished service members
              </p>
              <Button variant="outline" className="w-full" asChild>
                <a href="https://english.mod.gov.il/About/Legacy/Pages/National_Remembrance_Hall.aspx" target="_blank" rel="noopener noreferrer">
                  Browse All
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Memorial Actions */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
            <h2 className="text-3xl font-bold mb-4">Create a Memorial</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Honor the memory of a fallen hero by creating a lasting tribute
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/create-obituary">Create Memorial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/resources">Support Resources</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/holocaust-memorial">Holocaust Memorial</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IsraeliHeroesMemorial;
