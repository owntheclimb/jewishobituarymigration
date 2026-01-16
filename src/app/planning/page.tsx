'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, FileText, Users, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Planning = () => {
  const planningSteps = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Gather Important Documents",
      description: "Collect birth certificates, social security cards, insurance policies, and legal documents.",
      details: ["Birth certificate", "Social security card", "Insurance policies", "Will and testament", "Financial documents"]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Notify Family & Friends",
      description: "Create a contact list and designate someone to help with notifications.",
      details: ["Immediate family", "Close friends", "Employer/colleagues", "Community organizations", "Service providers"]
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Arrange Services",
      description: "Plan funeral or memorial services, burial or cremation arrangements.",
      details: ["Funeral home selection", "Service type and location", "Burial or cremation", "Religious considerations", "Reception planning"]
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Handle Legal Matters",
      description: "Address estate matters, cancel accounts, and handle final arrangements.",
      details: ["Probate proceedings", "Bank account closure", "Insurance claims", "Property transfers", "Final tax returns"]
    }
  ];

  const resources = [
    {
      title: "Funeral Planning Guide",
      description: "Comprehensive guide to planning meaningful services",
      link: "/articles/jewish-funeral"
    },
    {
      title: "Legal Checklist",
      description: "Essential legal steps and documents needed",
      link: "/articles/planning-funeral"
    },
    {
      title: "Grief Resources",
      description: "Support and counseling resources for families",
      link: "/grief-support"
    },
    {
      title: "Financial Planning",
      description: "Managing costs and financial responsibilities",
      link: "/articles/jewish-funeral-costs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      {/* Hero Section with Video Background */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://cdn.pixabay.com/video/2023/06/17/167611-837244690_large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              End-of-Life Planning
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed">
              Planning ahead helps ensure your wishes are honored and reduces the burden on your loved ones during difficult times.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {planningSteps.map((step, index) => (
            <Card
              key={index}
              className="p-6 bg-background/80 backdrop-blur-lg border border-border/50 shadow-subtle hover:shadow-elegant transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Helpful Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="p-6 bg-background/80 backdrop-blur-lg border border-border/50 shadow-subtle hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {resource.description}
                </p>
                <Button variant="outline" className="w-full border-border/50 hover:bg-muted/50" asChild>
                  <Link href={resource.link}>Learn More</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-8 bg-background/80 backdrop-blur-lg border border-border/50 shadow-elegant text-center animate-fade-in">
          <Phone className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Need Personal Assistance?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our compassionate team is here to help guide you through the planning process.
            Contact us for personalized support and consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-warm-gradient text-primary-foreground hover:shadow-elegant transition-all duration-300" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button variant="outline" className="border-border/50 hover:bg-muted/50" asChild>
              <a href="tel:+15551234567">Call (555) 123-4567</a>
            </Button>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Planning;
