'use client';

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, Heart, CheckCircle, Edit, Download, Send } from "lucide-react";

const ObituaryHelper = () => {
  const [step, setStep] = useState<"form" | "preview" | "edit">("form");
  const [tone, setTone] = useState("warm");
  const [formData, setFormData] = useState({
    fullName: "",
    hebrewName: "",
    dateOfBirth: "",
    dateOfDeath: "",
    age: "",
    residence: "",
    spouse: "",
    children: "",
    parents: "",
    siblings: "",
    education: "",
    career: "",
    synagogue: "",
    organizations: "",
    hobbies: "",
    accomplishments: "",
    charities: "",
    funeralDetails: "",
  });

  const [generatedObit, setGeneratedObit] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateObituary = () => {
    // Mock AI generation - creates a personalized obituary based on inputs
    const obit = `${formData.fullName}${formData.hebrewName ? ` (${formData.hebrewName})` : ""}, beloved ${formData.spouse ? "husband and " : ""}father, passed away peacefully on ${formData.dateOfDeath || "[date]"} at the age of ${formData.age || "[age]"}.

Born ${formData.dateOfBirth ? `on ${formData.dateOfBirth}` : ""} in ${formData.residence || "[city]"}, ${formData.fullName} was a cherished member of the community for many years. ${formData.education ? `He graduated from ${formData.education} and ` : ""}${formData.career ? `built a distinguished career in ${formData.career}.` : ""}

${formData.synagogue ? `A devoted member of ${formData.synagogue}, ${formData.fullName} was deeply committed to his faith and community.` : ""} ${formData.organizations ? `He was actively involved in ${formData.organizations}.` : ""} ${formData.hobbies ? `In his free time, he enjoyed ${formData.hobbies}.` : ""}

${formData.accomplishments ? `Among his many accomplishments, ${formData.accomplishments}` : ""} His warmth, wisdom, and generous spirit touched all who knew him.

${formData.fullName} is survived by his loving ${formData.spouse ? `wife ${formData.spouse}` : "family"}${formData.children ? `; children ${formData.children}` : ""}${formData.parents ? `; and parents ${formData.parents}` : ""}. ${formData.siblings ? `He is also survived by siblings ${formData.siblings}.` : ""}

${formData.funeralDetails || "Funeral arrangements will be announced."}

${formData.charities ? `In lieu of flowers, memorial contributions may be made to ${formData.charities}.` : ""}

May his memory be a blessing.`;

    setGeneratedObit(obit);
    setStep("preview");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <PenTool className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">The Words You Need</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Losing a loved one is overwhelming. Finding the right words to honor their memory shouldn't add to your burden. Our AI-powered ObituaryHelper creates a beautiful, personalized tribute in minutes.
          </p>
          {step === "form" && (
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => document.getElementById("form-start")?.scrollIntoView({ behavior: "smooth" })}>
                <Heart className="mr-2 h-5 w-5" />
                Start Writing Now - It's Free
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/help">View Examples</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-primary">
                1
              </div>
              <h3 className="font-semibold mb-2">Tell Us About Them</h3>
              <p className="text-sm text-muted-foreground">Answer a few questions about your loved one's life, family, and accomplishments.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-primary">
                2
              </div>
              <h3 className="font-semibold mb-2">We'll Create a Draft</h3>
              <p className="text-sm text-muted-foreground">Our intelligent writing assistant generates a personalized obituary.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-primary">
                3
              </div>
              <h3 className="font-semibold mb-2">Make It Yours</h3>
              <p className="text-sm text-muted-foreground">Edit, customize, and perfect the tribute until it feels just right.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-primary">
                4
              </div>
              <h3 className="font-semibold mb-2">Publish & Share</h3>
              <p className="text-sm text-muted-foreground">Post to your memorial page and share with family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form/Preview/Edit Section */}
      <section className="py-16 px-4" id="form-start">
        <div className="max-w-4xl mx-auto">
          {step === "form" && (
            <Card className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Create Your Obituary</h2>
                <p className="text-muted-foreground">Fill in as much information as you can. Don't worry if you don't have everything - we'll work with what you provide.</p>
              </div>

              {/* Tone Selection */}
              <div className="mb-8">
                <Label className="text-base font-semibold mb-3 block">Choose a Tone</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {["traditional", "modern", "warm", "formal"].map((t) => (
                    <Button
                      key={t}
                      variant={tone === t ? "default" : "outline"}
                      onClick={() => setTone(t)}
                      className="capitalize"
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="John David Cohen"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hebrewName">Hebrew Name (optional)</Label>
                      <Input
                        id="hebrewName"
                        value={formData.hebrewName}
                        onChange={(e) => handleInputChange("hebrewName", e.target.value)}
                        placeholder="Yochanan ben Avraham"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfDeath">Date of Passing</Label>
                      <Input
                        id="dateOfDeath"
                        type="date"
                        value={formData.dateOfDeath}
                        onChange={(e) => handleInputChange("dateOfDeath", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age at Passing</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        placeholder="75"
                      />
                    </div>
                    <div>
                      <Label htmlFor="residence">City/State of Residence</Label>
                      <Input
                        id="residence"
                        value={formData.residence}
                        onChange={(e) => handleInputChange("residence", e.target.value)}
                        placeholder="Miami, FL"
                      />
                    </div>
                  </div>
                </div>

                {/* Family */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Family</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="spouse">Spouse</Label>
                      <Input
                        id="spouse"
                        value={formData.spouse}
                        onChange={(e) => handleInputChange("spouse", e.target.value)}
                        placeholder="Sarah Cohen"
                      />
                    </div>
                    <div>
                      <Label htmlFor="children">Children (separate with commas)</Label>
                      <Input
                        id="children"
                        value={formData.children}
                        onChange={(e) => handleInputChange("children", e.target.value)}
                        placeholder="Michael, Rebecca, and Daniel"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parents">Parents</Label>
                      <Input
                        id="parents"
                        value={formData.parents}
                        onChange={(e) => handleInputChange("parents", e.target.value)}
                        placeholder="Abraham and Ruth Cohen"
                      />
                    </div>
                    <div>
                      <Label htmlFor="siblings">Siblings</Label>
                      <Input
                        id="siblings"
                        value={formData.siblings}
                        onChange={(e) => handleInputChange("siblings", e.target.value)}
                        placeholder="David and Esther"
                      />
                    </div>
                  </div>
                </div>

                {/* Life & Career */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Life & Career</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => handleInputChange("education", e.target.value)}
                        placeholder="University of Miami"
                      />
                    </div>
                    <div>
                      <Label htmlFor="career">Career/Profession</Label>
                      <Textarea
                        id="career"
                        value={formData.career}
                        onChange={(e) => handleInputChange("career", e.target.value)}
                        placeholder="Describe their career or profession"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="hobbies">Hobbies & Interests</Label>
                      <Textarea
                        id="hobbies"
                        value={formData.hobbies}
                        onChange={(e) => handleInputChange("hobbies", e.target.value)}
                        placeholder="What did they enjoy doing?"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Community & Jewish Life */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Community & Jewish Life</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="synagogue">Synagogue/Temple</Label>
                      <Input
                        id="synagogue"
                        value={formData.synagogue}
                        onChange={(e) => handleInputChange("synagogue", e.target.value)}
                        placeholder="Temple Beth Shalom"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organizations">Organizations & Affiliations</Label>
                      <Textarea
                        id="organizations"
                        value={formData.organizations}
                        onChange={(e) => handleInputChange("organizations", e.target.value)}
                        placeholder="Community groups, volunteer work, memberships"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accomplishments">Special Accomplishments</Label>
                      <Textarea
                        id="accomplishments"
                        value={formData.accomplishments}
                        onChange={(e) => handleInputChange("accomplishments", e.target.value)}
                        placeholder="Awards, achievements, or special contributions"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Service & Memorial */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Service & Memorial Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="funeralDetails">Funeral/Memorial Service Details</Label>
                      <Textarea
                        id="funeralDetails"
                        value={formData.funeralDetails}
                        onChange={(e) => handleInputChange("funeralDetails", e.target.value)}
                        placeholder="Service date, time, location, Shiva information"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="charities">Preferred Memorial Charities</Label>
                      <Input
                        id="charities"
                        value={formData.charities}
                        onChange={(e) => handleInputChange("charities", e.target.value)}
                        placeholder="American Jewish Joint Distribution Committee"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    size="lg"
                    onClick={generateObituary}
                    disabled={!formData.fullName}
                    className="flex-1"
                  >
                    <PenTool className="mr-2 h-5 w-5" />
                    Generate Obituary
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {step === "preview" && (
            <div className="space-y-6">
              <Card className="p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold">Your Obituary Draft</h2>
                  </div>
                  <Button variant="outline" onClick={() => setStep("form")}>
                    Back to Form
                  </Button>
                </div>

                <div className="prose prose-lg max-w-none mb-8">
                  <div className="whitespace-pre-line text-foreground leading-relaxed">
                    {generatedObit}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-6 border-t">
                  <Button size="lg" onClick={() => setStep("edit")}>
                    <Edit className="mr-2 h-5 w-5" />
                    Edit & Customize
                  </Button>
                  <Button size="lg" variant="outline">
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/create-obituary">
                      <Send className="mr-2 h-5 w-5" />
                      Publish to Memorial Page
                    </Link>
                  </Button>
                </div>
              </Card>

              {/* Testimonial */}
              <Card className="p-6 bg-primary/5">
                <p className="text-muted-foreground italic mb-2">
                  "This tool helped me find the words when I couldn't think straight. It captured my father's essence perfectly."
                </p>
                <p className="text-sm font-semibold">- Sarah L., Chicago</p>
              </Card>
            </div>
          )}

          {step === "edit" && (
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Edit Your Obituary</h2>
                <p className="text-muted-foreground">Make any changes you'd like to personalize the tribute.</p>
              </div>

              <Textarea
                value={generatedObit}
                onChange={(e) => setGeneratedObit(e.target.value)}
                rows={20}
                className="font-serif text-base leading-relaxed"
              />

              <div className="flex flex-wrap gap-4 pt-6">
                <Button size="lg" onClick={() => setStep("preview")}>
                  Preview Changes
                </Button>
                <Button size="lg" variant="outline">
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/create-obituary">
                    <Send className="mr-2 h-5 w-5" />
                    Publish to Memorial Page
                  </Link>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ObituaryHelper;
