'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MapPin, Calendar } from 'lucide-react';

interface RelatedObituary {
  id: string;
  full_name: string;
  photo_url: string | null;
  city: string | null;
  state: string | null;
  date_of_death: string | null;
  date_of_birth: string | null;
  high_schools: string[] | null;
  colleges: string[] | null;
  military_branches: string[] | null;
}

interface RelatedObituariesProps {
  currentObituaryId: string;
  city: string | null;
  state: string | null;
  highSchools: string[];
  colleges: string[];
  militaryBranches: string[];
  dateOfBirth: string | null;
  dateOfDeath: string | null;
}

const RelatedObituaries = ({
  currentObituaryId,
  city,
  state,
  highSchools,
  colleges,
  militaryBranches,
  dateOfBirth,
  dateOfDeath,
}: RelatedObituariesProps) => {
  const [relatedObituaries, setRelatedObituaries] = useState<RelatedObituary[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Calculate age from dates
  const calculateAge = (birth: string | null, death: string | null) => {
    if (!birth || !death) return null;
    const birthDate = new Date(birth);
    const deathDate = new Date(death);
    return deathDate.getFullYear() - birthDate.getFullYear();
  };

  const ageAtDeath = calculateAge(dateOfBirth, dateOfDeath);

  useEffect(() => {
    fetchRelatedObituaries();
  }, [currentObituaryId, city]);

  const fetchRelatedObituaries = async () => {
    try {
      setLoading(true);

      // Build a relevance score query
      const query = supabase
        .from('obituaries')
        .select('id, full_name, photo_url, city, state, date_of_death, date_of_birth, high_schools, colleges, military_branches')
        .eq('published', true)
        .eq('visibility', 'public')
        .neq('id', currentObituaryId)
        .limit(20);

      // Try with strongest filters first, then broaden
      let results: RelatedObituary[] = [];

      // Level 1: Same city
      if (city) {
        const { data } = await query.eq('city', city);
        if (data && data.length > 0) results = data as RelatedObituary[];
      }

      // Level 2: Same state
      if (results.length < 4 && state) {
        const { data } = await query.eq('state', state);
        if (data) {
          const merged = [...results, ...data.filter(d => !results.some(r => r.id === d.id))];
          results = merged.slice(0, 20) as RelatedObituary[];
        }
      }

      // Level 3: Any published obituaries as fallback
      if (results.length < 4) {
        const { data } = await query.order('created_at', { ascending: false });
        if (data) {
          const merged = [...results, ...data.filter(d => !results.some(r => r.id === d.id))];
          results = merged.slice(0, 20) as RelatedObituary[];
        }
      }

      // Level 4: Similar time period (within 1 year)
      if (results.length < 4 && dateOfDeath) {
        const deathDate = new Date(dateOfDeath);
        const oneYearBefore = new Date(deathDate);
        oneYearBefore.setFullYear(deathDate.getFullYear() - 1);
        const oneYearAfter = new Date(deathDate);
        oneYearAfter.setFullYear(deathDate.getFullYear() + 1);

        const { data } = await query
          .gte('date_of_death', oneYearBefore.toISOString().split('T')[0])
          .lte('date_of_death', oneYearAfter.toISOString().split('T')[0]);
        if (data) {
          const merged = [...results, ...data.filter(d => !results.some(r => r.id === d.id))];
          results = merged.slice(0, 6);
        }
      }

      // Score and sort results by relevance
      const scoredResults = results.map(obit => {
        let score = 0;
        if (obit.city && obit.city === city) score += 10;
        if (obit.state && obit.state === state) score += 7;
        
        // Check for school overlaps
        const schoolOverlaps = [
          ...highSchools.filter(s => obit.high_schools?.includes(s)),
          ...colleges.filter(c => obit.colleges?.includes(c)),
        ];
        score += schoolOverlaps.length * 8;

        // Military service overlap
        if (militaryBranches.some(b => obit.military_branches?.includes(b))) score += 6;

        // Age proximity (calculate from dates)
        const otherAge = calculateAge(obit.date_of_birth, obit.date_of_death);
        if (ageAtDeath && otherAge) {
          const ageDiff = Math.abs(ageAtDeath - otherAge);
          if (ageDiff <= 5) score += 5;
          else if (ageDiff <= 10) score += 3;
          else if (ageDiff <= 20) score += 1;
        }

        return { ...obit, score };
      });

      scoredResults.sort((a, b) => b.score - a.score);
      setRelatedObituaries(scoredResults.slice(0, 6));
    } catch (error) {
      console.error('Error fetching related obituaries:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            You May Also Know
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (relatedObituaries.length === 0) {
    return null;
  }

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-5 w-5 text-primary" />
          You May Also Know
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Others from the same community who have passed
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedObituaries.map(obit => (
            <Card
              key={obit.id}
              className="group hover:shadow-md transition-all duration-300 cursor-pointer border-border/50 overflow-hidden"
              onClick={() => router.push(`/obituary/${obit.id}`)}
            >
              {obit.photo_url ? (
                <div className="w-full h-48 overflow-hidden bg-muted">
                  <img
                    src={obit.photo_url}
                    alt={obit.full_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary/30" />
                </div>
              )}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {obit.full_name}
                </h3>
                
                {(obit.city || obit.state) && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">
                      {[obit.city, obit.state].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}

                {obit.date_of_death && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(obit.date_of_death)}</span>
                  </div>
                )}

                {obit.date_of_birth && obit.date_of_death && (
                  <Badge variant="secondary" className="text-xs">
                    Age {calculateAge(obit.date_of_birth, obit.date_of_death)}
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>

        {relatedObituaries.length >= 6 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              onClick={() => router.push('/search')}
              className="gap-2"
            >
              <Users className="h-4 w-4" />
              Explore More Memorials
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelatedObituaries;
