'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import memorialTree from "@/assets/memorial-tree.jpg";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  TreePine,
  Heart,
  Award,
  Users,
  Flower,
  MapPin,
  Calendar,
  Download,
  QrCode,
  Globe,
  Leaf,
  FileText,
  ArrowRight
} from "lucide-react";

const MemorialTrees = () => {
  const { addItem } = useCart();
  const [selectedPackage, setSelectedPackage] = useState("");
  const [dedicateName, setDedicateName] = useState("");
  const [dedicateMessage, setDedicateMessage] = useState("");

  const packages = [
    {
      id: "single",
      name: "Single Memorial Tree",
      price: "$29.99",
      description: "Plant one tree in a national forest to honor their memory",
      features: ["1 tree planted", "Digital certificate", "Registry entry", "Email notifications"]
    },
    {
      id: "grove",
      name: "Memorial Grove",
      price: "$149.99",
      description: "Create a small grove of 5 trees for a lasting tribute",
      features: ["5 trees planted", "Printed & digital certificates", "Registry entry", "Impact photos", "Family notifications"],
      popular: true
    },
    {
      id: "collective",
      name: "Collective Grove",
      price: "$39.99",
      description: "Start a campaign for family & friends to contribute trees",
      features: ["Unlimited contributors", "Group certificate", "Shared registry page", "Progress tracking", "Social sharing"]
    },
    {
      id: "bundle",
      name: "Tree + Flowers Bundle",
      price: "$84.99",
      description: "Memorial tree planting plus sympathy flower delivery",
      features: ["1 tree planted", "Fresh flower arrangement", "Both certificates", "Coordinated delivery"]
    }
  ];

  const impactStats = [
    { value: "15,247", label: "Trees Planted" },
    { value: "8.2M", label: "lbs CO2 Absorbed" },
    { value: "156", label: "Acres Restored" },
    { value: "2,341", label: "Families Honored" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full mb-8">
            <TreePine className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Plant a Tree in Their Memory
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Celebrate a beautiful life while helping restore forests for future generations.
            Each tree planted creates a living memorial that grows stronger with time.
          </p>

          <Button
            size="lg"
            className="gap-2 text-lg px-8 py-4"
            onClick={() => {
              document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <TreePine className="h-5 w-5" />
            Choose a Tree Package
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Creating a living memorial is simple and meaningful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Package",
                description: "Select the perfect memorial tree option for your loved one",
                icon: TreePine
              },
              {
                step: "2",
                title: "Personalize Dedication",
                description: "Add their name, dates, and a heartfelt message",
                icon: Heart
              },
              {
                step: "3",
                title: "Receive Certificate",
                description: "Get a beautiful digital and optional printed certificate",
                icon: Award
              },
              {
                step: "4",
                title: "Notify Family",
                description: "Share the memorial with family and friends",
                icon: Users
              }
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.step} className="text-center">
                  <div className="relative mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages-section" className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Memorial Tree Packages</h2>
            <p className="text-lg text-muted-foreground">
              Choose the tribute that best honors their memory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] relative ${
                  pkg.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 mx-auto">
                    <TreePine className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{pkg.price}</div>
                  <CardDescription className="text-sm">{pkg.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Leaf className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      addItem({
                        id: Math.floor(Math.random() * 10000),
                        name: pkg.name,
                        price: parseFloat(pkg.price.replace('$', '')),
                        image: memorialTree.src,
                        category: 'memorial-trees'
                      });
                    }}
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Certificate Editor */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Personalize Your Memorial Certificate</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Honoree Name</label>
                  <Input
                    placeholder="Enter the name of your loved one"
                    value={dedicateName}
                    onChange={(e) => setDedicateName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Memorial Message</label>
                  <Textarea
                    placeholder="Share a special message or memory..."
                    value={dedicateMessage}
                    onChange={(e) => setDedicateMessage(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Birth Date</label>
                    <Input type="date" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Passing Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="certificate" value="digital" defaultChecked />
                    <span className="text-sm">Digital only (free)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="certificate" value="printed" />
                    <span className="text-sm">Printed copy (+$12.99)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Certificate Preview */}
            <div className="bg-white p-8 rounded-2xl shadow-elegant border">
              <div className="text-center border-2 border-green-200 p-6 rounded-lg">
                <div className="flex justify-center mb-4">
                  <TreePine className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Memorial Tree Certificate</h3>
                <p className="text-gray-600 mb-4">
                  A tree has been planted in loving memory of
                </p>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {dedicateName || "Your Loved One"}
                </div>
                <p className="text-gray-600 mb-4">
                  {dedicateMessage || "Forever in our hearts and growing strong in nature"}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <QrCode className="h-6 w-6 text-gray-400" />
                    <span className="text-xs text-gray-500">Registry Link</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Registry */}
      <section className="py-16 px-4 bg-green-50 dark:bg-green-950/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Impact Stats */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Environmental Impact</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Every memorial tree planted helps restore damaged ecosystems, provides habitat for wildlife,
                and removes carbon dioxide from the atmosphere. Together, we're creating forests that will
                benefit the planet for generations to come.
              </p>

              <div className="grid grid-cols-2 gap-6">
                {impactStats.map((stat, idx) => (
                  <div key={idx} className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Dedications */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Recent Memorial Dedications</h3>
              <div className="space-y-4">
                {[
                  { name: "Robert Chen", trees: 1, location: "Olympic National Forest" },
                  { name: "Maria Santos", trees: 5, location: "Sequoia National Forest" },
                  { name: "David Thompson", trees: 3, location: "White Mountain National Forest" }
                ].map((dedication, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <TreePine className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{dedication.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {dedication.trees} tree{dedication.trees > 1 ? 's' : ''} - {dedication.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <span className="font-semibold">Reforestation Locations</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Trees are planted in areas most in need of restoration across national forests in California,
                  Oregon, Washington, and Colorado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about memorial tree planting
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="timeline">
              <AccordionTrigger>When will the tree be planted?</AccordionTrigger>
              <AccordionContent>
                Trees are planted during optimal planting seasons (spring and fall) to ensure the highest
                survival rate. You'll receive your certificate immediately, and we'll send photos and
                location details once planting is complete, typically within 2-4 months.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location">
              <AccordionTrigger>Where exactly are the trees planted?</AccordionTrigger>
              <AccordionContent>
                We work with the US Forest Service to plant trees in areas that have been damaged by
                wildfires, disease, or other natural disasters. Specific locations vary based on current
                restoration needs, but we focus on national forests in the western United States.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="certificate">
              <AccordionTrigger>What's included with the certificate?</AccordionTrigger>
              <AccordionContent>
                Each certificate includes the honoree's name, dedication message, planting date, and a
                QR code linking to their memorial registry page. Digital certificates are delivered
                immediately, while printed certificates are mailed within 5-7 business days.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tracking">
              <AccordionTrigger>Can I track the impact of my memorial tree?</AccordionTrigger>
              <AccordionContent>
                Yes! Each memorial tree is registered in our online database where you can view planting
                location, photos when available, and environmental impact metrics. You'll also receive
                annual updates on the forest restoration progress in your tree's area.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Cross-Navigation */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Complete Your Memorial Tribute</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-4 mx-auto">
                  <Flower className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle>Send Sympathy Flowers</CardTitle>
                <CardDescription>
                  Complement your tree planting with a beautiful floral arrangement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full gap-2">
                  Shop Flowers & Gifts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 mx-auto">
                  <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Create Memorial Page</CardTitle>
                <CardDescription>
                  Build a lasting online tribute with photos, stories, and memories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full gap-2">
                  Create Memorial
                  <ArrowRight className="h-4 w-4" />
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
