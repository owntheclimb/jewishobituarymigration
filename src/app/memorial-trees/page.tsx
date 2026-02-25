'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  TreePine,
  Heart,
  Award,
  Users,
  Flower,
  MapPin,
  Globe,
  Leaf,
  ExternalLink,
  ArrowRight,
  Star
} from "lucide-react";

const MemorialTrees = () => {
  const [dedicateName, setDedicateName] = useState("");
  const [dedicateMessage, setDedicateMessage] = useState("");

  const jnfPrograms = [
    {
      id: "single",
      name: "Plant a Tree in Israel",
      priceRange: "From $18",
      description: "Plant a tree in Israel's forests to honor a loved one's memory",
      features: [
        "Tree planted in Israel",
        "Personalized certificate",
        "Dedication in JNF's Book of Life",
        "Email notification to family"
      ],
      href: "https://www.jnf.org/support/tree-planting-center"
    },
    {
      id: "grove",
      name: "Circle of Trees",
      priceRange: "From $180",
      description: "Plant 10 trees creating a grove in their memory",
      features: [
        "10 trees planted",
        "Framed certificate",
        "Grove dedication",
        "Location in Israel selected",
        "Family notification"
      ],
      href: "https://www.jnf.org/support/tree-planting-center",
      popular: true
    },
    {
      id: "forest",
      name: "Forest of Life",
      priceRange: "From $500",
      description: "A significant planting creating lasting impact in Israel",
      features: [
        "Multiple trees planted",
        "Personalized plaque option",
        "Special recognition",
        "Perpetual dedication",
        "Certificate suitable for framing"
      ],
      href: "https://www.jnf.org/support/tree-planting-center"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/30 dark:via-emerald-950/20 dark:to-green-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1800&q=80)' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/50 rounded-full mb-8 shadow-lg">
            <TreePine className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Plant a Tree in Israel
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            Honor their memory with a living tribute in the Land of Israel
          </p>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            For over 120 years, Jewish families have planted trees in Israel through JNF
            to celebrate life, honor loved ones, and contribute to Israel's renewal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 text-lg px-8 py-6 shadow-elegant"
              onClick={() => {
                document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <TreePine className="h-5 w-5" />
              Choose a Memorial Program
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-lg px-8 py-6"
              asChild
            >
              <a href="https://www.jnf.org" target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5" />
                Learn About JNF
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* JNF Partnership Banner */}
      <section className="py-8 px-4 bg-primary/5 border-y">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md p-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/JNF_logo.svg/200px-JNF_logo.svg.png"
                  alt="Jewish National Fund"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Official Partner: Jewish National Fund</h3>
                <p className="text-muted-foreground text-sm">
                  JNF has planted over 270 million trees in Israel since 1901
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Plant a Tree Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              A Timeless Jewish Tradition
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Planting a tree in Israel is one of the most meaningful ways to honor a Jewish life.
              As trees grow and flourish, they become living memorials that benefit future generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-subtle bg-gradient-to-b from-background to-green-50/50 dark:to-green-950/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 mx-auto">
                <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4">Honor Their Memory</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create a living tribute that grows stronger with each passing year,
                just as their memory lives on in your heart.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-subtle bg-gradient-to-b from-background to-green-50/50 dark:to-green-950/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 mx-auto">
                <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4">Connect to Israel</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each tree strengthens the Land of Israel, creating forests that
                provide shade, clean air, and natural beauty for generations.
              </p>
            </Card>

            <Card className="text-center p-8 border-0 shadow-subtle bg-gradient-to-b from-background to-green-50/50 dark:to-green-950/20">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6 mx-auto">
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4">Lasting Legacy</h3>
              <p className="text-muted-foreground leading-relaxed">
                A tree planted today will provide oxygen, habitat, and beauty
                for decades—a gift that keeps giving in their name.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs-section" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Memorial Tree Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the tribute that best honors their memory through JNF's tree planting programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {jnfPrograms.map((program) => (
              <Card
                key={program.id}
                className={`relative shadow-subtle hover:shadow-elegant transition-all duration-500 hover:scale-[1.02] ${
                  program.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {program.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-8">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 mx-auto">
                    <TreePine className="h-7 w-7 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl font-serif">{program.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mt-2">{program.priceRange}</div>
                  <CardDescription className="text-base mt-2">{program.description}</CardDescription>
                </CardHeader>

                <CardContent className="pb-8">
                  <ul className="space-y-3 mb-8">
                    {program.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Leaf className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full gap-2"
                    variant={program.popular ? "default" : "outline"}
                    asChild
                  >
                    <a href={program.href} target="_blank" rel="noopener noreferrer">
                      Plant Trees Through JNF
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              All tree planting is handled directly by the Jewish National Fund (JNF),
              a trusted organization with over 120 years of experience.
            </p>
            <Button variant="link" asChild>
              <a href="https://www.jnf.org/support/tree-planting-center" target="_blank" rel="noopener noreferrer" className="gap-2">
                View all JNF memorial programs
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Personalization Preview */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form Preview */}
            <div>
              <h2 className="text-3xl font-serif font-bold mb-6">
                Your Memorial Certificate
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                When you plant a tree through JNF, you'll receive a beautiful certificate
                that can be sent to the family or kept as a meaningful keepsake.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Honoree Name (Preview)</label>
                  <Input
                    placeholder="Enter the name of your loved one"
                    value={dedicateName}
                    onChange={(e) => setDedicateName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Memorial Message (Preview)</label>
                  <Textarea
                    placeholder="Share a special message or memory..."
                    value={dedicateMessage}
                    onChange={(e) => setDedicateMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/20 p-8 rounded-2xl shadow-elegant">
              <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border-2 border-green-200 dark:border-green-800">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <TreePine className="h-16 w-16 text-green-600" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Jewish National Fund</p>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                    Certificate of Tree Planting
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    A tree has been planted in Israel<br />in loving memory of
                  </p>
                  <div className="text-3xl font-serif font-bold text-foreground mb-4 min-h-[2.5rem]">
                    {dedicateName || "Your Loved One"}
                  </div>
                  <p className="text-muted-foreground italic max-w-sm mx-auto min-h-[3rem]">
                    "{dedicateMessage || "Forever in our hearts, growing strong in the Land of Israel"}"
                  </p>
                  <div className="mt-8 pt-4 border-t border-green-200 dark:border-green-800">
                    <p className="text-xs text-muted-foreground">
                      This living tribute grows in Israel's forests,<br />
                      a perpetual memorial for generations to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about planting memorial trees in Israel
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="what-is-jnf" className="border border-border/50 rounded-xl px-6 shadow-sm bg-background">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                What is JNF and why plant through them?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                The Jewish National Fund (JNF) was founded in 1901 and has planted over 270 million
                trees in Israel. It's the most trusted organization for memorial tree planting in the
                Jewish community, with a 120+ year track record of environmental stewardship in Israel.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="where-planted" className="border border-border/50 rounded-xl px-6 shadow-sm bg-background">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                Where exactly are the trees planted?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                Trees are planted throughout Israel in JNF forests and parks, including the Negev desert,
                Galilee, Jerusalem hills, and other regions. JNF plants trees where they're needed most—to
                combat desertification, provide recreational areas, or restore areas damaged by fire or war.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certificate" className="border border-border/50 rounded-xl px-6 shadow-sm bg-background">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                What certificate will the family receive?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                JNF provides beautiful certificates acknowledging the tree planting. You can have it sent
                directly to the bereaved family, or receive it yourself to present in person. Digital
                certificates are available immediately, and printed certificates are mailed within days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="when-planted" className="border border-border/50 rounded-xl px-6 shadow-sm bg-background">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                When will the tree actually be planted?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                Trees are planted during Israel's planting season (typically November through March)
                to ensure the highest survival rate. Your donation is used to plant trees during the
                next appropriate season. JNF has a survival rate of over 85% for planted trees.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tax-deductible" className="border border-border/50 rounded-xl px-6 shadow-sm bg-background">
              <AccordionTrigger className="text-left text-lg font-medium py-6 hover:no-underline">
                Is my donation tax-deductible?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6">
                Yes, JNF is a 501(c)(3) nonprofit organization. Your tree planting donation is
                tax-deductible to the full extent allowed by law. You'll receive a receipt for
                your records from JNF directly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Cross-Navigation */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-8">Complete Your Memorial Tribute</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4 mx-auto">
                  <Flower className="h-7 w-7 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-xl font-serif">Send Sympathy Flowers</CardTitle>
                <CardDescription className="text-base">
                  Express condolences with a beautiful floral arrangement delivered to the family
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <Link href="/flowers">
                    Shop Sympathy Flowers
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 mx-auto">
                  <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl font-serif">Create a Memorial Page</CardTitle>
                <CardDescription className="text-base">
                  Build a lasting online tribute with photos, stories, and memories to share
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full gap-2" asChild>
                  <Link href="/create-obituary">
                    Create Memorial
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MemorialTrees;
