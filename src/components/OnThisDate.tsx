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

// Sample historical figures - in production, this would come from a database
const historicalFigures: HistoricalFigure[] = [
  {
    id: 'elie-wiesel',
    name: 'Elie Wiesel',
    hebrewName: 'אליעזר ויזל',
    date: 'July 2',
    year: 2016,
    category: 'Holocaust Survivor & Nobel Laureate',
    description: 'Author of "Night" and tireless advocate for human rights and remembrance.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  },
  {
    id: 'rbg',
    name: 'Ruth Bader Ginsburg',
    hebrewName: 'רות ביידר גינזבורג',
    date: 'September 18',
    year: 2020,
    category: 'Supreme Court Justice',
    description: 'Champion of gender equality and women\'s rights, cultural icon.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=400&fit=crop'
  },
  {
    id: 'leonard-cohen',
    name: 'Leonard Cohen',
    hebrewName: 'אליעזר בן ניסן הכהן',
    date: 'November 7',
    year: 2016,
    category: 'Poet & Singer-Songwriter',
    description: 'Legendary artist whose profound lyrics touched millions worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop'
  },
  {
    id: 'albert-einstein',
    name: 'Albert Einstein',
    hebrewName: 'אברהם אלברט איינשטיין',
    date: 'April 18',
    year: 1955,
    category: 'Physicist & Nobel Laureate',
    description: 'Developed the theory of relativity, one of history\'s most influential scientists.',
    imageUrl: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop'
  },
  {
    id: 'golda-meir',
    name: 'Golda Meir',
    hebrewName: 'גּוֹלְדָּה מֵאִיר',
    date: 'December 8',
    year: 1978,
    category: 'Israeli Prime Minister',
    description: 'Israel\'s first female Prime Minister and founding leader of the nation.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  }
];

const OnThisDate = () => {
  const [currentFigure, setCurrentFigure] = useState<HistoricalFigure | null>(null);

  useEffect(() => {
    // In production, this would query by current date
    // For now, randomly select a figure
    const randomIndex = Math.floor(Math.random() * historicalFigures.length);
    setCurrentFigure(historicalFigures[randomIndex]);
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
