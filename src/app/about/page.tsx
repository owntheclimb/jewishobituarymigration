'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Award, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Compassionate Care",
      description: "We understand the importance of honoring life with dignity and respect during difficult times."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Family Focused",
      description: "Our services are designed to support families and communities in celebrating the lives of their loved ones."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Service",
      description: "We are committed to providing the highest quality obituary and memorial services with attention to detail."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Trust & Privacy",
      description: "We maintain the highest standards of privacy and security for all memorial content and personal information."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Jewish Obits</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Honoring Jewish lives and preserving legacies for generations. We believe every life deserves to be
            remembered with dignity, compassion, and connection to our rich Jewish heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Jewish Obits was founded with a singular purpose: to create a meaningful digital space where
                Jewish families can honor their loved ones while connecting to thousands of years of tradition
                and community.
              </p>
              <p>
                When our team experienced the loss of beloved family members, we struggled to find a platform that truly
                captured the essence of a Jewish life – not just the dates and facts, but the warmth of Shabbat
                dinners, the pride in cultural heritage, the commitment to tikkun olam (repairing the world),
                and the unbreakable bonds of family and community.
              </p>
              <p>
                We created Jewish Obits to fill that need. Our platform understands that a Jewish obituary is
                more than a life summary – it's a hesped (eulogy), a memorial, and a bridge between generations.
                We honor traditions like sitting shiva, observing yahrzeit, and saying Kaddish, while remaining
                welcoming to Jews of all denominations and even non-Jewish families seeking our compassionate services.
              </p>
              <p className="font-semibold text-foreground">
                Today, we serve thousands of families across the country, helping them create beautiful tributes
                that celebrate Jewish lives, preserve precious memories, and strengthen the bonds of community
                that have sustained the Jewish people for millennia.
              </p>
            </div>
          </div>

          <div className="animate-fade-in">
            <img
              src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop"
              alt="Team meeting"
              className="w-full h-80 object-cover rounded-lg shadow-subtle"
            />
          </div>
        </div>

        <div className="mb-16 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-6 bg-background/80 backdrop-blur-lg border border-border/50 shadow-subtle hover:shadow-elegant transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>


        <Card className="p-8 bg-background/80 backdrop-blur-lg border border-border/50 shadow-elegant text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you're honoring a loved one or planning ahead for the future, we're here to help you create
            meaningful tributes that celebrate life and preserve precious memories for generations to come.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-warm-gradient text-primary-foreground hover:shadow-elegant transition-all duration-300" asChild>
              <Link href="/create-obituary">Create an Obituary</Link>
            </Button>
            <Button variant="outline" className="border-border/50 hover:bg-muted/50" asChild>
              <Link href="/resources">Learn More</Link>
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default About;
