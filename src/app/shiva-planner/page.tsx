'use client';

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, CheckCircle2, Clock, Home, Mail, Users, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import MealTrainCoordinator from "@/components/shiva/MealTrainCoordinator";

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

interface ShivaData {
  homePreparation: ChecklistItem[];
  prayerServices: {
    morningTime: string;
    eveningTime: string;
    notes: string;
  };
  notificationTemplate: string;
}

const defaultHomePreparation: ChecklistItem[] = [
  { id: "mirrors", label: "Cover all mirrors in the home", completed: false },
  { id: "seating", label: "Arrange low seating (boxes, stools, or low chairs)", completed: false },
  { id: "candles", label: "Set up memorial candle (burns for 7 days)", completed: false },
  { id: "prayerBooks", label: "Arrange prayer books (siddurim) for visitors", completed: false },
  { id: "washStation", label: "Set up hand-washing station by entrance", completed: false },
  { id: "foodArea", label: "Prepare area for food donations", completed: false },
  { id: "signInBook", label: "Place sign-in book for visitors", completed: false },
  { id: "photos", label: "Display photos of the deceased", completed: false },
  { id: "tissues", label: "Stock tissues throughout the home", completed: false },
  { id: "parking", label: "Arrange parking for visitors", completed: false },
];

export default function ShivaPlanner() {
  const [shivaData, setShivaData] = useState<ShivaData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("shivaPlanner");
      return saved ? JSON.parse(saved) : {
        homePreparation: defaultHomePreparation,
        prayerServices: {
          morningTime: "8:00 AM",
          eveningTime: "7:00 PM",
          notes: ""
        },
        notificationTemplate: `Dear Friends and Family,

We are gathering to observe shiva for [Name of Deceased] at [Address].

Shiva Hours:
Morning Service: [Time]
Evening Service: [Time]

The family welcomes visitors during these times to share memories and offer comfort.

With gratitude,
[Your Name]`
      };
    }
    return {
      homePreparation: defaultHomePreparation,
      prayerServices: {
        morningTime: "8:00 AM",
        eveningTime: "7:00 PM",
        notes: ""
      },
      notificationTemplate: `Dear Friends and Family,

We are gathering to observe shiva for [Name of Deceased] at [Address].

Shiva Hours:
Morning Service: [Time]
Evening Service: [Time]

The family welcomes visitors during these times to share memories and offer comfort.

With gratitude,
[Your Name]`
    };
  });

  useEffect(() => {
    localStorage.setItem("shivaPlanner", JSON.stringify(shivaData));
  }, [shivaData]);

  const toggleChecklistItem = (id: string) => {
    setShivaData(prev => ({
      ...prev,
      homePreparation: prev.homePreparation.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    }));
  };

  const completedCount = shivaData.homePreparation.filter(item => item.completed).length;
  const totalCount = shivaData.homePreparation.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const exportToPDF = () => {
    const content = `
SHIVA PLANNING CHECKLIST

Home Preparation (${completedCount}/${totalCount} completed):
${shivaData.homePreparation.map(item => `${item.completed ? '[x]' : '[ ]'} ${item.label}`).join('\n')}

Prayer Services:
Morning Service: ${shivaData.prayerServices.morningTime}
Evening Service: ${shivaData.prayerServices.eveningTime}
Notes: ${shivaData.prayerServices.notes}

Community Notification:
${shivaData.notificationTemplate}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'shiva-planning-checklist.txt';
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Checklist exported successfully");
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent("Shiva Planning Information");
    const body = encodeURIComponent(shivaData.notificationTemplate);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    toast.success("Opening email client...");
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
                  Shiva Planning Guide
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  An interactive checklist to help you prepare for sitting shiva with dignity and ease during this difficult time.
                </p>

                {/* Progress Overview */}
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{completedCount} of {totalCount} completed</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button onClick={exportToPDF} variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Export Checklist
                  </Button>
                  <Button onClick={shareByEmail} variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share by Email
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-5xl">
              <Tabs defaultValue="preparation" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="preparation" className="gap-2">
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">Home Prep</span>
                  </TabsTrigger>
                  <TabsTrigger value="services" className="gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="hidden sm:inline">Services</span>
                  </TabsTrigger>
                  <TabsTrigger value="meals" className="gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="hidden sm:inline">Meals</span>
                  </TabsTrigger>
                  <TabsTrigger value="notification" className="gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="hidden sm:inline">Notify</span>
                  </TabsTrigger>
                </TabsList>

                {/* Home Preparation Tab */}
                <TabsContent value="preparation" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        Home Preparation Checklist
                      </CardTitle>
                      <CardDescription>
                        Essential tasks to prepare your home for sitting shiva
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {shivaData.homePreparation.map((item) => (
                          <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <Checkbox
                              id={item.id}
                              checked={item.completed}
                              onCheckedChange={() => toggleChecklistItem(item.id)}
                            />
                            <label
                              htmlFor={item.id}
                              className={`flex-1 text-sm font-medium leading-none cursor-pointer ${
                                item.completed ? 'line-through text-muted-foreground' : ''
                              }`}
                            >
                              {item.label}
                            </label>
                            {item.completed && <CheckCircle2 className="w-5 h-5 text-primary" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Prayer Services Tab */}
                <TabsContent value="services" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Prayer Service Schedule
                      </CardTitle>
                      <CardDescription>
                        Set times for morning and evening services
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="morningTime">Morning Service (Shacharit)</Label>
                          <Input
                            id="morningTime"
                            type="time"
                            value={shivaData.prayerServices.morningTime}
                            onChange={(e) => setShivaData(prev => ({
                              ...prev,
                              prayerServices: { ...prev.prayerServices, morningTime: e.target.value }
                            }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="eveningTime">Evening Service (Mincha/Maariv)</Label>
                          <Input
                            id="eveningTime"
                            type="time"
                            value={shivaData.prayerServices.eveningTime}
                            onChange={(e) => setShivaData(prev => ({
                              ...prev,
                              prayerServices: { ...prev.prayerServices, eveningTime: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="serviceNotes">Additional Notes</Label>
                        <Textarea
                          id="serviceNotes"
                          placeholder="Add any special instructions, rabbi contact info, or service details..."
                          value={shivaData.prayerServices.notes}
                          onChange={(e) => setShivaData(prev => ({
                            ...prev,
                            prayerServices: { ...prev.prayerServices, notes: e.target.value }
                          }))}
                          rows={4}
                        />
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Service Guidelines:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>- Services require a minyan (10 Jewish adults)</li>
                          <li>- Morning service typically lasts 30-45 minutes</li>
                          <li>- Evening services can be combined (Mincha/Maariv)</li>
                          <li>- Contact your rabbi to help coordinate services</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Meal Coordination Tab */}
                <TabsContent value="meals" className="mt-6">
                  <MealTrainCoordinator />
                </TabsContent>

                {/* Community Notification Tab */}
                <TabsContent value="notification" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Community Notification Template
                      </CardTitle>
                      <CardDescription>
                        Customize this message to inform family and friends about shiva
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea
                        value={shivaData.notificationTemplate}
                        onChange={(e) => setShivaData(prev => ({
                          ...prev,
                          notificationTemplate: e.target.value
                        }))}
                        rows={12}
                        className="font-mono text-sm"
                      />
                      <div className="flex gap-3">
                        <Button onClick={shareByEmail} className="gap-2">
                          <Mail className="w-4 h-4" />
                          Send via Email
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(shivaData.notificationTemplate).then(() => {
                              toast.success("Template copied to clipboard");
                            }).catch(() => {
                              toast.error("Failed to copy template");
                            });
                          }}
                        >
                          Copy to Clipboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
