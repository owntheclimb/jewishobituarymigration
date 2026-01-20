'use client';

import Link from "next/link";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { HelpCircle, Phone, Mail, MessageCircle, Heart, Search, FileText } from "lucide-react";
import faqHeroBg from "@/assets/faq-hero-bg.jpg";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Creating Obituaries",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          q: "How do I create an obituary?",
          a: "Creating an obituary is simple with our step-by-step process. Click 'Create an Obituary' from our homepage, fill in the required information about your loved one, choose from our professional templates, and publish. Our writing guides are available to help you craft a meaningful tribute."
        },
        {
          q: "How much does it cost to create an obituary?",
          a: "Basic obituary creation is free and includes publication on our platform. Premium features like enhanced memorial pages, unlimited photo uploads, and priority placement are available with our paid plans. Contact us for detailed pricing information."
        },
        {
          q: "Can I edit an obituary after it's published?",
          a: "Yes, you can edit most details of an obituary after publication. Simply log into your account and navigate to your published obituaries. However, major changes may require verification to maintain accuracy and respect for the deceased."
        },
        {
          q: "What information should I include in an obituary?",
          a: "A complete obituary typically includes: full name, age, date and place of death, biographical information, surviving family members, predeceased family members, funeral/memorial service details, and any special requests like donations in lieu of flowers."
        },
        {
          q: "Can I add photos and videos?",
          a: "Absolutely! You can add multiple photos and videos to create a rich memorial. Our platform supports various formats and provides secure storage for your precious memories. Premium accounts offer unlimited uploads."
        }
      ]
    },
    {
      title: "Finding Obituaries",
      icon: <Search className="h-5 w-5" />,
      questions: [
        {
          q: "How do I search for an obituary?",
          a: "Use our search function on the homepage or dedicated search page. You can search by name, location, date of death, funeral home, or keywords. Our advanced search allows filtering by specific criteria to help you find exactly what you're looking for."
        },
        {
          q: "Are all obituaries free to view?",
          a: "Yes, viewing obituaries is completely free. You can read obituaries, view photos, and sign guestbooks without any cost. Creating an account allows you to save favorite obituaries and receive notifications."
        },
        {
          q: "How far back do your records go?",
          a: "Our database includes obituaries from recent years and continues to grow. We're constantly working to digitize historical records and partner with funeral homes to expand our archive of Jewish obituaries and memorials."
        },
        {
          q: "Can I get notified about new obituaries?",
          a: "Yes, you can set up alerts for specific names, locations, or communities. Create a free account to manage your notification preferences and never miss an important obituary."
        }
      ]
    },
    {
      title: "Funeral Planning",
      icon: <Heart className="h-5 w-5" />,
      questions: [
        {
          q: "Do you provide funeral planning services?",
          a: "We connect you with trusted funeral homes and provide resources for planning Jewish funeral services. Our platform includes a directory of funeral homes, planning guides, and information about Jewish burial traditions and customs."
        },
        {
          q: "Can you help with obituary writing?",
          a: "Yes! We offer comprehensive writing guides, templates, and examples to help you create a meaningful obituary. Our support team can also provide guidance during this difficult time."
        },
        {
          q: "What about flowers and memorial gifts?",
          a: "Our platform connects you with local florists and gift providers who understand Jewish customs and traditions. You can order appropriate sympathy flowers, plants, or memorial gifts directly through our partners."
        },
        {
          q: "Do you offer grief support resources?",
          a: "We provide links to grief counseling resources, support groups, and information about sitting shiva. While we don't provide direct counseling, we connect families with appropriate professional support services."
        }
      ]
    },
    {
      title: "Account & Technical",
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          q: "Do I need an account to use the site?",
          a: "No account is required to view obituaries or basic site features. However, creating a free account allows you to save favorites, create obituaries, manage notifications, and access additional features."
        },
        {
          q: "How do I reset my password?",
          a: "Click 'Sign In' then 'Forgot Password' and enter your email address. You'll receive reset instructions within a few minutes. If you don't receive the email, check your spam folder or contact our support team."
        },
        {
          q: "Is my personal information secure?",
          a: "Yes, we take privacy and security seriously. All personal information is encrypted and stored securely. We never sell or share your personal data with third parties without your explicit consent."
        },
        {
          q: "Can I delete my account?",
          a: "Yes, you can delete your account at any time. Note that published obituaries may remain on the site for the benefit of families and communities, but your personal information will be removed."
        },
        {
          q: "I'm having technical issues. How can I get help?",
          a: "Our support team is here to help! Contact us through the support form, email, or phone. We typically respond within 24 hours and provide step-by-step assistance for any technical difficulties."
        }
      ]
    }
  ];

  // Generate FAQ schema for SEO
  const faqSchemaItems = faqCategories.flatMap(category =>
    category.questions.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSchemaItems
  };

  return (
    <div className="min-h-screen bg-background">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${faqHeroBg})` }}
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find answers to common questions about creating obituaries, finding loved ones, and using our platform
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-subtle hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {category.icon}
                    </div>
                    <CardTitle className="text-2xl">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                        <AccordionTrigger className="text-left hover:text-primary">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Still Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our compassionate support team is here to assist you during this difficult time
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300">
              <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Speak with our team directly
              </p>
              <p className="font-medium">(555) 123-4567</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300">
              <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Get detailed assistance
              </p>
              <p className="font-medium">support@jewishobits.com</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elegant transition-all duration-300">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Contact Form</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Send us a detailed message
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </Card>
          </div>

          <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 border">
            <p className="text-sm text-muted-foreground mb-3">
              Our support hours: Monday - Friday, 8 AM - 6 PM EST
            </p>
            <p className="text-sm text-muted-foreground">
              We typically respond to emails within 24 hours
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
