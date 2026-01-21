import { Metadata } from "next";
import { notFound } from "next/navigation";
import { notableFigures } from "@/data/notableFigures";
import NotableFigureContent from "@/components/notable/NotableFigureContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for all notable figures
export async function generateStaticParams() {
  return notableFigures.map((figure) => ({
    id: figure.id,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const figure = notableFigures.find(f => f.id === id);

  if (!figure) {
    return {
      title: 'Notable Figure Not Found | Jewish Obits',
    };
  }

  const description = figure.biography
    ? figure.biography.substring(0, 160) + '...'
    : figure.excerpt;

  return {
    title: `${figure.name} - ${figure.category} | Jewish Obits`,
    description,
    keywords: [
      figure.name,
      figure.hebrewName,
      figure.category,
      'Jewish memorial',
      'notable Jewish figures',
      'Holocaust remembrance',
    ].filter(Boolean),
    openGraph: {
      title: `${figure.name} - Memorial | Jewish Obits`,
      description,
      type: 'profile',
      images: figure.image ? [
        {
          url: figure.image,
          width: 1200,
          height: 630,
          alt: figure.name,
        }
      ] : undefined,
      url: `https://jewishobituary.com/notable/${figure.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${figure.name} - Memorial`,
      description,
      images: figure.image ? [figure.image] : undefined,
    },
    alternates: {
      canonical: `https://jewishobituary.com/notable/${figure.id}`,
    },
  };
}

export default async function NotableFigurePage({ params }: PageProps) {
  const { id } = await params;
  const figure = notableFigures.find(f => f.id === id);

  if (!figure) {
    notFound();
  }

  return <NotableFigureContent figure={figure} />;
}
