'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Share2, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';


export default function ArticleUnveilingCeremonyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-4" asChild>
            <Link href="/resources"><ArrowLeft className="mr-2 h-4 w-4" />Back to Resources</Link>
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge>Jewish Customs</Badge>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />9 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Planning an Unveiling Ceremony: Honoring Memory with a Headstone Dedication
          </h1>

          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            The unveiling ceremony marks the dedication of a headstone, typically occurring 11-12 months after burial, providing closure and a lasting memorial.
          </p>

          <div className="flex gap-3">
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" />Share Article</Button>
            <Button variant="outline"><Download className="mr-2 h-4 w-4" />Download PDF</Button>
          </div>
        </div>
      </section>

      <article className="py-12 px-4">
        <div className="max-w-4xl mx-auto prose prose-lg max-w-none">
          <p className="text-foreground">The unveiling ceremony represents an important milestone in the Jewish mourning process, bringing family and friends together to dedicate the permanent marker that will memorialize their loved one for generations to come.</p>

          <h2 className="text-foreground">When to Hold an Unveiling</h2>
          <p className="text-foreground">Jewish tradition typically holds unveiling ceremonies 11-12 months after death, though customs vary by community. This timing allows the family to complete the formal year of mourning while the stone is being prepared.</p>

          <h2 className="text-foreground">Planning the Ceremony</h2>
          <p className="text-foreground">Most unveilings are brief, intimate gatherings of 15-30 minutes, including prayers, readings, and personal reflections. Contact your rabbi or cantor to officiate and guide the ceremony.</p>
        </div>
      </article>

      <Footer />
    </div>
  );
}
