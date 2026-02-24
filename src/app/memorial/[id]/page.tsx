'use client';

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { notableFigures } from "@/data/notableFigures";

// Map old story-* IDs to real notable figure IDs for redirects
const legacyStoryIdMap: Record<string, string> = {
  'story-1': 'rbg',
  'story-2': 'elie-wiesel',
  'story-3': 'leonard-nimoy',
};

const MemorialStoryDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Redirect legacy story-* IDs to /notable/ pages
  useEffect(() => {
    if (id && legacyStoryIdMap[id]) {
      queueMicrotask(() => setIsRedirecting(true));
      router.replace(`/notable/${legacyStoryIdMap[id]}`);
    }
  }, [id, router]);

  // Check if this is a notable figure ID that should go to /notable/
  useEffect(() => {
    if (id && notableFigures.find(f => f.id === id)) {
      queueMicrotask(() => setIsRedirecting(true));
      router.replace(`/notable/${id}`);
    }
  }, [id, router]);

  // Show loading while redirecting
  if (isRedirecting || legacyStoryIdMap[id] || notableFigures.find(f => f.id === id)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // For any other ID, show not found (real memorial IDs should use the obituary page)
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Memorial Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The memorial you&apos;re looking for could not be found. It may have been moved or removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/search">Search Memorials</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/featured-stories">View Featured Stories</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MemorialStoryDetail;
