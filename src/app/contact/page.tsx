'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import contactTeamHero from '@/assets/contact-team-hero.jpg';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be less than 2000 characters')
});

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      toast({
        title: "Validation Error",
        description: firstError.message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      toast({
        title: "Message sent!",
        description: result.message || "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      details: ["(954) 744-3432"],
      description: "Available 24/7 for urgent matters"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      details: ["info@neshamajfs.com"],
      description: "We respond within 24 hours"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Hours",
      details: ["Monday - Sunday: 24/7"],
      description: "We're always here when you need us"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />

      {/* Hero Image Section */}
      <div className="relative w-full h-[36rem] overflow-hidden">
        <img
          src={contactTeamHero.src}
          alt="Friendly professional team in modern office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're here to help you during this difficult time. Reach out to us with any questions,
            concerns, or if you need assistance creating a meaningful tribute.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="p-6 bg-background/80 backdrop-blur-lg border border-border/50 shadow-subtle hover:shadow-elegant transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {info.title}
                      </h3>
                      <div className="space-y-1 mb-2">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-muted-foreground text-xs">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="p-8 bg-background/80 backdrop-blur-lg border border-border/50 shadow-elegant animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-foreground">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                  placeholder="What can we help you with?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300 resize-none"
                  placeholder="Please provide details about your inquiry..."
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-warm-gradient text-primary-foreground hover:shadow-elegant transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Card>
        </div>

        <Card className="p-8 bg-background/80 backdrop-blur-lg border border-border/50 shadow-elegant text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-4">Emergency Support</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            If you need immediate assistance with urgent obituary matters or technical issues,
            our emergency support team is available 24/7 to help you.
          </p>
          <a href="mailto:info@neshamajfs.com">
            <Button className="bg-warm-gradient text-primary-foreground hover:shadow-elegant transition-all duration-300">
              Contact Emergency Support
            </Button>
          </a>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
