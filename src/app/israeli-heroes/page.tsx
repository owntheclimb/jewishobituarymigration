'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Star, Shield, MapPin, Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const IsraeliHeroesMemorial = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const heroes = [
    {
      name: "Captain Omer Neutra",
      age: 22,
      unit: "77th Battalion, 7th Armored Brigade",
      date: "October 7, 2023",
      location: "Near Gaza Border",
      story: "Fell defending his country during the October 7th attack. Known for his leadership and dedication to his unit.",
      image: "/logo.png"
    },
    {
      name: "Staff Sergeant Yosef Hieb",
      age: 20,
      unit: "Nahal Brigade",
      date: "October 7, 2023",
      location: "Kibbutz Be'eri",
      story: "Sacrificed his life protecting civilians during the attack on Kibbutz Be'eri. His bravery saved dozens of lives.",
      image: "/logo.png"
    }
  ];

  const filteredHeroes = heroes.filter(hero =>
    hero.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hero.unit.toLowerCase().includes(searchQuery.toLowerCase())
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
            {filteredHeroes.map((hero, index) => (
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
                    <Badge variant="outline">Age {hero.age}</Badge>
                    <Badge variant="outline">{hero.unit}</Badge>
                  </div>
                  <div className="space-y-2 text-muted-foreground mb-4">
                    <p><strong className="text-foreground">Date:</strong> {hero.date}</p>
                    <p><strong className="text-foreground">Location:</strong> {hero.location}</p>
                  </div>
                  <p className="text-foreground leading-relaxed mb-4">{hero.story}</p>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Heart className="mr-2 h-4 w-4" />
                      Light Memorial Candle
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Full Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
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
              <Button variant="outline" className="w-full">Browse All</Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Heart className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">October 7th Victims</h3>
              <p className="text-muted-foreground mb-4">
                Remembering those lost in the October 7th attacks
              </p>
              <Button variant="outline" className="w-full">Browse All</Button>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <Star className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold mb-2">Decorated Heroes</h3>
              <p className="text-muted-foreground mb-4">
                Medal of Valor and distinguished service members
              </p>
              <Button variant="outline" className="w-full">Browse All</Button>
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
