'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Heart,
  Share2,
  Upload,
  Calendar,
  MapPin,
  Camera,
  MessageCircle,
  Users,
  Gift,
  Download,
  Phone
} from "lucide-react";

const Memorial = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Memorial Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  Sarah Elizabeth Cohen
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  March 15, 1938 - January 8, 2025
                </p>
                <p className="text-lg leading-relaxed text-foreground">
                  A beloved mother, grandmother, and teacher who touched countless lives with her wisdom, kindness, and unwavering faith.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Memorial
                </Button>
                <Button className="gap-2">
                  <Heart className="h-4 w-4" />
                  Add to Memorial
                </Button>
              </div>
            </div>

            {/* Right - Portrait */}
            <div className="relative">
              <div className="aspect-[3/4] max-w-md mx-auto relative overflow-hidden rounded-3xl shadow-elegant">
                <img
                  src="/lovable-uploads/35c4ed12-3dfb-430c-90fd-9f27d985e1c4.png"
                  alt="Sarah Elizabeth Cohen"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Memorial Navigation */}
      <section className="px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="stories">Stories</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* About Card */}
                <Card className="shadow-subtle">
                  <CardHeader>
                    <CardTitle>About Sarah</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Sarah dedicated her life to education, spending 35 years as an elementary school teacher.
                      She was known for her patience, creativity, and the way she made every child feel special.
                      A devoted wife to Robert for 52 years, loving mother to three children, and proud grandmother
                      to seven grandchildren, Sarah's legacy lives on through the countless lives she touched.
                    </p>
                  </CardContent>
                </Card>

                {/* Highlights Card */}
                <Card className="shadow-subtle">
                  <CardHeader>
                    <CardTitle>Life Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="font-semibold">Family</p>
                        <p className="text-sm text-muted-foreground">3 Children, 7 Grandchildren</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <MapPin className="h-6 w-6 text-primary mx-auto mb-2" />
                        <p className="font-semibold">Hometown</p>
                        <p className="text-sm text-muted-foreground">Chicago, Illinois</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Life Timeline */}
              <Card className="shadow-subtle">
                <CardHeader>
                  <CardTitle>Life Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {[
                      { year: "1938", event: "Born in Chicago, Illinois" },
                      { year: "1960", event: "Graduated from Northwestern University" },
                      { year: "1962", event: "Married Robert Cohen" },
                      { year: "1963", event: "Started teaching career" },
                      { year: "1998", event: "Retired after 35 years of teaching" },
                      { year: "2025", event: "Passed peacefully surrounded by family" }
                    ].map((item, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-16 text-sm font-semibold text-primary">{item.year}</div>
                        <div className="flex-1 text-muted-foreground">{item.event}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Photo Gallery</h2>
                <Button className="gap-2">
                  <Upload className="h-4 w-4" />
                  Add Photos
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-2xl flex items-center justify-center group cursor-pointer hover:scale-[1.02] transition-transform">
                    <Camera className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Stories & Guestbook Tab */}
            <TabsContent value="stories" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Memory */}
                <Card className="shadow-subtle">
                  <CardHeader>
                    <CardTitle>Share a Memory</CardTitle>
                    <CardDescription>Tell us about a special moment with Sarah</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Your name" />
                    <Textarea
                      placeholder="Share your memory or story..."
                      className="min-h-[120px]"
                    />
                    <div className="flex gap-2">
                      <Button className="gap-2">
                        <Heart className="h-4 w-4" />
                        Share Memory
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <Heart className="h-4 w-4" />
                        Light a Candle
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Memory Stream */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Recent Memories</h3>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="shadow-subtle">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">Family Member</p>
                            <p className="text-sm text-muted-foreground mb-2">2 hours ago</p>
                            <p className="text-muted-foreground">
                              Sarah always had the most beautiful garden. I remember spending summer afternoons with her, learning about different flowers...
                            </p>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="ghost" className="gap-1">
                                <Heart className="h-3 w-3" />
                                5
                              </Button>
                              <Button size="sm" variant="ghost" className="gap-1">
                                <MessageCircle className="h-3 w-3" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <h2 className="text-2xl font-bold">Memorial Services</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-subtle">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Funeral Service
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-semibold">January 12, 2025 at 10:00 AM</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Temple Beth Shalom, 123 Main St, Chicago, IL</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Add to Calendar</Button>
                      <Button size="sm" variant="outline">View Map</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-subtle">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Shiva
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="font-semibold">January 13-19, 2025</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Cohen Family Home</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Daily 7:00 PM - 9:00 PM
                    </p>
                    <Button size="sm" variant="outline">Get Directions</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Donations Tab */}
            <TabsContent value="donations" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Honor Sarah's Memory</h2>
                <p className="text-muted-foreground">
                  Make a donation to causes that were important to Sarah
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-subtle">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      Education Foundation
                    </CardTitle>
                    <CardDescription>Supporting teachers and students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">$2,450</p>
                        <p className="text-sm text-muted-foreground">raised from 23 donors</p>
                      </div>
                      <Button className="w-full">Donate Now</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-subtle">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Local Food Bank
                    </CardTitle>
                    <CardDescription>Helping families in need</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">$1,875</p>
                        <p className="text-sm text-muted-foreground">raised from 15 donors</p>
                      </div>
                      <Button className="w-full">Donate Now</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Invite Family to Help Build this Memorial</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let loved ones contribute photos, stories, and memories to create a complete tribute
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Email address" className="flex-1" />
            <Button>Send Invitation</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Memorial;
