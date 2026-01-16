'use client';

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Globe, Clock, Info, ExternalLink, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Cemetery {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  denomination: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  visiting_hours: string | null;
  has_available_plots: boolean | null;
  custom_rules: string | null;
  latitude: number | null;
  longitude: number | null;
}

export default function CemeteryDirectory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedDenomination, setSelectedDenomination] = useState<string>("all");
  const [plotsAvailable, setPlotsAvailable] = useState<string>("all");

  const { data: cemeteries, isLoading } = useQuery({
    queryKey: ['cemeteries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cemeteries')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as Cemetery[];
    }
  });

  const filteredCemeteries = cemeteries?.filter(cemetery => {
    const matchesSearch = cemetery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cemetery.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cemetery.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesState = selectedState === "all" || cemetery.state === selectedState;
    const matchesDenomination = selectedDenomination === "all" || cemetery.denomination === selectedDenomination;
    const matchesPlots = plotsAvailable === "all" ||
                        (plotsAvailable === "yes" && cemetery.has_available_plots) ||
                        (plotsAvailable === "no" && !cemetery.has_available_plots);

    return matchesSearch && matchesState && matchesDenomination && matchesPlots;
  }) || [];

  const states = Array.from(new Set(cemeteries?.map(c => c.state) || [])).sort();
  const denominations = Array.from(new Set(cemeteries?.map(c => c.denomination).filter(Boolean) || [])).sort();

  const getDirectionsUrl = (cemetery: Cemetery) => {
    if (cemetery.latitude && cemetery.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${cemetery.latitude},${cemetery.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cemetery.location + ', ' + cemetery.city + ', ' + cemetery.state)}`;
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-primary/5 to-background py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                  Jewish Cemetery Directory
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Find sacred resting places that honor Jewish tradition and provide dignified burial according to halacha.
                </p>
              </div>
            </div>
          </section>

          {/* Search and Filters */}
          <section className="py-8 border-b bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by cemetery name or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-lg"
                  />
                </div>

                {/* Filters */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="All States" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All States</SelectItem>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedDenomination} onValueChange={setSelectedDenomination}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Denominations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Denominations</SelectItem>
                      {denominations.map(denom => (
                        <SelectItem key={denom} value={denom!}>{denom}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={plotsAvailable} onValueChange={setPlotsAvailable}>
                    <SelectTrigger>
                      <SelectValue placeholder="Plot Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cemeteries</SelectItem>
                      <SelectItem value="yes">Plots Available</SelectItem>
                      <SelectItem value="no">No Plots Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Results Count */}
                <p className="text-sm text-muted-foreground">
                  Found {filteredCemeteries.length} {filteredCemeteries.length === 1 ? 'cemetery' : 'cemeteries'}
                </p>
              </div>
            </div>
          </section>

          {/* Cemetery Listings */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                {isLoading ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Loading cemeteries...</p>
                  </div>
                ) : filteredCemeteries.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground mb-4">No cemeteries found matching your criteria.</p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedState("all");
                          setSelectedDenomination("all");
                          setPlotsAvailable("all");
                        }}
                      >
                        Clear Filters
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {filteredCemeteries.map((cemetery) => (
                      <Card key={cemetery.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-2xl mb-2">{cemetery.name}</CardTitle>
                              <CardDescription className="flex items-center gap-2 text-base">
                                <MapPin className="w-4 h-4" />
                                {cemetery.location}, {cemetery.city}, {cemetery.state}
                              </CardDescription>
                            </div>
                            <div className="flex flex-col gap-2">
                              {cemetery.denomination && (
                                <Badge variant="secondary">{cemetery.denomination}</Badge>
                              )}
                              {cemetery.has_available_plots && (
                                <Badge variant="default">Plots Available</Badge>
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {/* Contact Information */}
                          <div className="grid md:grid-cols-2 gap-4">
                            {cemetery.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <a href={`tel:${cemetery.phone}`} className="hover:underline">
                                  {cemetery.phone}
                                </a>
                              </div>
                            )}
                            {cemetery.email && (
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <a href={`mailto:${cemetery.email}`} className="hover:underline">
                                  {cemetery.email}
                                </a>
                              </div>
                            )}
                            {cemetery.visiting_hours && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>{cemetery.visiting_hours}</span>
                              </div>
                            )}
                            {cemetery.website && (
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-muted-foreground" />
                                <a
                                  href={cemetery.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:underline flex items-center gap-1"
                                >
                                  Visit Website
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Custom Rules */}
                          {cemetery.custom_rules && (
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{cemetery.custom_rules}</p>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              variant="default"
                              onClick={() => window.open(getDirectionsUrl(cemetery), '_blank')}
                              className="gap-2"
                            >
                              <MapPin className="w-4 h-4" />
                              Get Directions
                            </Button>
                            {cemetery.phone && (
                              <Button variant="outline" asChild>
                                <a href={`tel:${cemetery.phone}`}>Call Now</a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Information Section */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Important Information About Jewish Burial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                      Jewish tradition emphasizes the importance of burial in consecrated ground.
                      Each cemetery may have specific customs and requirements based on their denomination and community standards.
                    </p>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Before Visiting:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Call ahead to confirm visiting hours, especially before Shabbat and holidays</li>
                        <li>Dress modestly and respectfully</li>
                        <li>Men should wear a head covering (kippah)</li>
                        <li>Bring small stones to place on graves, following Jewish tradition</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Planning for Burial:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Contact the cemetery office to inquire about plot availability and pricing</li>
                        <li>Ask about specific burial customs and requirements</li>
                        <li>Verify the cemetery's kashrut standards if this is important to your family</li>
                        <li>Inquire about perpetual care and maintenance policies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
