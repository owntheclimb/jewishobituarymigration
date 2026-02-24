'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

interface HistoricalFigure {
  id: string;
  name: string;
  hebrewName: string;
  date: string;
  year: number;
  category: string;
  description: string;
  imageUrl: string;
}

// Historical figures with real, properly-licensed photos
// All images are stored locally in /public/notable-figures/
const historicalFigures: HistoricalFigure[] = [
  {
    id: 'elie-wiesel',
    name: 'Elie Wiesel',
    hebrewName: 'אליעזר ויזל',
    date: 'July 2',
    year: 2016,
    category: 'Holocaust Survivor & Nobel Laureate',
    description: 'Author of "Night" and tireless advocate for human rights and remembrance.',
    imageUrl: '/notable-figures/elie-wiesel.jpg'
  },
  {
    id: 'rbg',
    name: 'Ruth Bader Ginsburg',
    hebrewName: 'רות ביידר גינזבורג',
    date: 'September 18',
    year: 2020,
    category: 'Supreme Court Justice',
    description: 'Champion of gender equality and women\'s rights, cultural icon.',
    imageUrl: '/notable-figures/ruth-bader-ginsburg.jpg'
  },
  {
    id: 'leonard-nimoy',
    name: 'Leonard Nimoy',
    hebrewName: 'לאונרד נימוי',
    date: 'February 27',
    year: 2015,
    category: 'Actor & Cultural Icon',
    description: 'Beloved as Mr. Spock on Star Trek, accomplished director and photographer.',
    imageUrl: '/notable-figures/leonard-nimoy.jpg'
  },
  {
    id: 'carl-reiner',
    name: 'Carl Reiner',
    hebrewName: 'קארל ריינר',
    date: 'June 29',
    year: 2020,
    category: 'Comedy Legend & Director',
    description: 'Emmy-winning comedy legend, creator of The Dick Van Dyke Show.',
    imageUrl: '/notable-figures/carl-reiner.jpg'
  },
  {
    id: 'gene-wilder',
    name: 'Gene Wilder',
    hebrewName: 'ג\'רום סילברמן',
    date: 'August 29',
    year: 2016,
    category: 'Actor & Comedian',
    description: 'Iconic actor known for Willy Wonka and Young Frankenstein.',
    imageUrl: '/notable-figures/gene-wilder.jpg'
  },
  {
    id: 'joan-rivers',
    name: 'Joan Rivers',
    hebrewName: 'יוענה מולינסקי',
    date: 'September 4',
    year: 2014,
    category: 'Comedian & Entertainment Pioneer',
    description: 'Groundbreaking comedian who broke barriers in entertainment.',
    imageUrl: '/notable-figures/joan-rivers.jpg'
  }
];

const OnThisDate = () => {
  const [currentFigure, setCurrentFigure] = useState<HistoricalFigure | null>(null);

  useEffect(() => {
    // In production, this would query by current date
    // For now, randomly select a figure (defer setState to avoid sync setState in effect)
    const randomIndex = Math.floor(Math.random() * historicalFigures.length);
    queueMicrotask(() => setCurrentFigure(historicalFigures[randomIndex]));
  }, []);

  if (!currentFigure) return null;

  return (
    <Card className="overflow-hidden shadow-elegant border-primary/20">
      <CardHeader className="bg-gradient-to-br from-primary/5 to-primary/10 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <Badge variant="secondary" className="font-semibold">
                On This Date
              </Badge>
            </div>
            <CardTitle className="text-2xl">In Jewish History</CardTitle>
            <CardDescription className="text-base mt-1">
              Remembering those who shaped our world
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20 shadow-subtle">
            <img 
              src={currentFigure.imageUrl} 
              alt={currentFigure.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-lg leading-tight">{currentFigure.name}</h3>
                <p className="text-sm text-muted-foreground">{currentFigure.hebrewName}</p>
              </div>
            </div>
            
            <Badge variant="outline" className="mb-3 text-xs">
              {currentFigure.category}
            </Badge>
            
            <p className="text-sm text-foreground mb-3 leading-relaxed">
              Passed away {currentFigure.date}, {currentFigure.year}
            </p>
            
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {currentFigure.description}
            </p>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" asChild>
                <Link href={`/notable/${currentFigure.id}`}>
                  View Memorial
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
              </Button>
              <Button size="sm" variant="ghost">
                <Heart className="h-3 w-3 mr-1" />
                Light Candle
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnThisDate;
