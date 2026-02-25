'use client';

import { useState, useEffect, Suspense, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { supabase, supabasePublic } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { Search, Calendar, MapPin, Heart, ExternalLink, Flame, Star, Home, ChevronRight, Share2, Copy, Check, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommunityBadge from '@/components/CommunityBadge';
import SearchFilters, { SearchFilterValues } from '@/components/search/SearchFilters';
import ObituaryCard from '@/components/search/ObituaryCard';
import ObituaryCardSkeleton from '@/components/search/ObituaryCardSkeleton';
import SearchStats from '@/components/search/SearchStats';
import { transformObituary, UnifiedObituary, markAsNotable } from '@/lib/obituaryTransformer';

// Timeout constants
const DB_TIMEOUT_MS = 10000; // 10 seconds for database queries
const EXTERNAL_TIMEOUT_MS = 15000; // 15 seconds for external sources
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Obituary {
  id: string;
  full_name: string;
  hebrew_name?: string | null;
  date_of_birth: string | null;
  date_of_death: string | null;
  biography: string | null;
  location: string | null;
  city?: string | null;
  state?: string | null;
  high_schools?: string[] | null;
  colleges?: string[] | null;
  military_branches?: string[] | null;
  photo_url: string | null;
  created_at: string | null;
}

interface JewishObit {
  id: string;
  title: string;
  summary: string | null;
  source_name: string;
  source_url: string;
  image_url: string | null;
  published_at: string | null;
  created_at: string | null;
}

interface ScrapedObituary {
  id: string;
  name: string;
  date_of_death: string | null;
  published_at: string | null;
  city: string | null;
  state: string | null;
  source: string;
  source_url: string;
  snippet: string | null;
  created_at: string | null;
}

const SearchPageContent = () => {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const [obituaries, setObituaries] = useState<Obituary[]>([]);
  const [filteredObituaries, setFilteredObituaries] = useState<Obituary[]>([]);
  const [filters, setFilters] = useState<SearchFilterValues>({
    searchTerm: '',
    hebrewName: '',
    cityFilter: '',
    stateFilter: '',
    highSchoolFilter: '',
    collegeFilter: '',
    militaryFilter: '',
    synagogueFilter: '',
    occupationFilter: '',
    dateFrom: '',
    dateTo: '',
    ageMin: '',
    ageMax: '',
    holocaustSurvivor: false,
    hasMilitaryService: false,
  });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [dataTimedOut, setDataTimedOut] = useState(false); // Track if timeout occurred

  // AbortController ref for cleanup
  const abortControllerRef = useRef<AbortController | null>(null);

  // Combined external obituaries (Jewish RSS + Scraped)
  const [externalObits, setExternalObits] = useState<(JewishObit | ScrapedObituary)[]>([]);
  const [filteredExternalObits, setFilteredExternalObits] = useState<(JewishObit | ScrapedObituary)[]>([]);
  const [externalSearchTerm, setExternalSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [externalSourceFilter, setExternalSourceFilter] = useState('All');
  const [externalSortBy, setExternalSortBy] = useState('Most recent');
  const [externalLoading, setExternalLoading] = useState(true);
  const [externalError, setExternalError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 12;
  const visibleCount = currentPage * ITEMS_PER_PAGE;

  const { toast } = useToast();

  // State name mapping for full names
  const STATE_NAMES: Record<string, string> = {
    FL: 'Florida', NY: 'New York', CA: 'California', NJ: 'New Jersey',
    PA: 'Pennsylvania', IL: 'Illinois', MA: 'Massachusetts', TX: 'Texas',
    MD: 'Maryland', OH: 'Ohio', CT: 'Connecticut', AZ: 'Arizona',
    GA: 'Georgia', NC: 'North Carolina', VA: 'Virginia', MI: 'Michigan',
    WA: 'Washington', CO: 'Colorado', OR: 'Oregon', NV: 'Nevada'
  };

  const filteredUnifiedObituaries = useMemo<UnifiedObituary[]>(
    () => filteredObituaries.map(obit => markAsNotable(transformObituary(obit))),
    [filteredObituaries]
  );

  const filteredUnifiedExternalObits = useMemo<UnifiedObituary[]>(
    () => filteredExternalObits.map(obit => markAsNotable(transformObituary(obit))),
    [filteredExternalObits]
  );

  const externalStateOptions = useMemo(
    () =>
      Array.from(
        new Set(
          externalObits
            .map(obit => ('state' in obit ? obit.state : null))
            .filter((state): state is string => !!state)
        )
      ).sort((a, b) => a.localeCompare(b)),
    [externalObits]
  );

  const externalSourceOptions = useMemo(
    () =>
      Array.from(
        new Set(
          externalObits
            .map(obit => ('source_name' in obit ? obit.source_name : obit.source))
            .filter((source): source is string => !!source)
        )
      ).sort((a, b) => a.localeCompare(b)),
    [externalObits]
  );

  // Reset to page 1 when filters change - Note: In Next.js, we'd use router.push to update URL
  useEffect(() => {
    // In Next.js App Router, we would use useRouter().push() to update search params
    // For now, this effect is preserved but the URL update would need router integration
  }, [stateFilter, externalSourceFilter, externalSearchTerm, externalSortBy]);

  useEffect(() => {
    const applyExternalFilters = () => {
      let filtered = [...externalObits];

      // Apply state filter
      if (stateFilter !== 'All') {
        filtered = filtered.filter(obit => {
          if ('state' in obit && obit.state) {
            return obit.state === stateFilter;
          }
          return false;
        });
      }

      // Apply source filter
      if (externalSourceFilter !== 'All') {
        filtered = filtered.filter(obit => {
          const source = 'source_name' in obit ? obit.source_name : ('source' in obit ? obit.source : '');
          return source === externalSourceFilter;
        });
      }

      // Apply search term
      if (externalSearchTerm.trim()) {
        const searchLower = externalSearchTerm.toLowerCase();
        filtered = filtered.filter(obit => {
          const name = 'title' in obit ? obit.title : obit.name;
          const snippet = 'summary' in obit ? obit.summary : obit.snippet;
          const city = 'city' in obit ? obit.city : null;

          return name.toLowerCase().includes(searchLower) ||
            city?.toLowerCase().includes(searchLower) ||
            snippet?.toLowerCase().includes(searchLower);
        });
      }

      // Apply sorting
      if (externalSortBy === 'Most recent') {
        filtered.sort((a, b) => {
          const dateA = new Date(a.published_at || a.created_at || '');
          const dateB = new Date(b.published_at || b.created_at || '');

          if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
          if (isNaN(dateA.getTime())) return 1;
          if (isNaN(dateB.getTime())) return -1;

          return dateB.getTime() - dateA.getTime();
        });
      } else if (externalSortBy === 'Source') {
        filtered.sort((a, b) => {
          const sourceA = 'source_name' in a ? a.source_name : a.source;
          const sourceB = 'source_name' in b ? b.source_name : b.source;
          return sourceA.localeCompare(sourceB);
        });
      }

      setFilteredExternalObits(filtered);
    };

    applyExternalFilters();
  }, [stateFilter, externalSourceFilter, externalSearchTerm, externalSortBy, externalObits]);

  useEffect(() => {
    // Create new AbortController for this effect
    abortControllerRef.current = new AbortController();

    // Load both data sources with timeout protection
    const loadAllData = async () => {
      try {
        // Run both fetches in parallel with individual timeout protection
        await Promise.all([
          fetchObituaries(),
          fetchExternalObituaries(),
        ]);
      } catch (error) {
        // If aborted, don't update state
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('Error loading obituaries:', error);
      }
    };

    loadAllData();

    // Cleanup: abort any in-progress requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      let filtered = [...obituaries];

      // Apply search term filter
      if (filters.searchTerm) {
        filtered = filtered.filter(obituary =>
          obituary.full_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          obituary.location?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          obituary.biography?.toLowerCase().includes(filters.searchTerm.toLowerCase())
        );
      }

      // Apply Hebrew name filter (search in biography for now)
      if (filters.hebrewName) {
        filtered = filtered.filter(obituary =>
          obituary.hebrew_name?.toLowerCase().includes(filters.hebrewName.toLowerCase()) ||
          obituary.biography?.toLowerCase().includes(filters.hebrewName.toLowerCase())
        );
      }

      if (filters.stateFilter) {
        const stateFilter = filters.stateFilter.trim().toLowerCase();
        filtered = filtered.filter(obituary =>
          obituary.state?.toLowerCase() === stateFilter ||
          obituary.location?.toLowerCase().includes(stateFilter)
        );
      }

      // Apply date range filters
      if (filters.dateFrom || filters.dateTo) {
        filtered = filtered.filter(obituary => {
          if (!obituary.date_of_death) return false;
          const deathDate = new Date(obituary.date_of_death);

          if (filters.dateFrom && deathDate < new Date(filters.dateFrom)) {
            return false;
          }
          if (filters.dateTo && deathDate > new Date(filters.dateTo)) {
            return false;
          }
          return true;
        });
      }

      // Apply age range filters
      if (filters.ageMin || filters.ageMax) {
        filtered = filtered.filter(obituary => {
          if (!obituary.date_of_birth || !obituary.date_of_death) return false;
          const age = new Date(obituary.date_of_death).getFullYear() -
                      new Date(obituary.date_of_birth).getFullYear();

          if (filters.ageMin && age < parseInt(filters.ageMin)) {
            return false;
          }
          if (filters.ageMax && age > parseInt(filters.ageMax)) {
            return false;
          }
          return true;
        });
      }

      // Apply community filters
      if (filters.cityFilter || filters.highSchoolFilter || filters.collegeFilter || filters.militaryFilter) {
        const communityFilteredIds = new Set<string>();

        // Get community IDs for selected filters
        const communityQueries = [];
        if (filters.cityFilter) communityQueries.push({ type: 'city', slug: filters.cityFilter });
        if (filters.highSchoolFilter) communityQueries.push({ type: 'highschool', slug: filters.highSchoolFilter });
        if (filters.collegeFilter) communityQueries.push({ type: 'college', slug: filters.collegeFilter });
        if (filters.militaryFilter) communityQueries.push({ type: 'military', slug: filters.militaryFilter });

        for (const query of communityQueries) {
          const { data: community } = await supabasePublic
            .from('communities')
            .select('id')
            .eq('type', query.type)
            .eq('slug', query.slug)
            .single();

          if (community) {
            const { data: links } = await supabasePublic
              .from('community_links')
              .select('obituary_id')
              .eq('community_id', community.id);

            links?.forEach(link => communityFilteredIds.add(link.obituary_id));
          }
        }

        // Keep only obituaries linked to the requested communities
        filtered = filtered.filter(obituary => communityFilteredIds.has(obituary.id));
      }

      setFilteredObituaries(filtered);
    };

    applyFilters();
  }, [filters, obituaries]);

  const fetchObituaries = useCallback(async () => {
    // Check if request was aborted
    if (abortControllerRef.current?.signal.aborted) {
      return;
    }

    try {
      setLoadError(null);

      // Create a flag to track if timeout occurred
      let didTimeout = false;

      // Wrap the Supabase query with timeout protection
      // Use supabasePublic for faster queries without auth session waiting
      const fetchWithTimeout = async () => {
        const { data, error } = await supabasePublic
          .from('obituaries')
          .select('*')
          .eq('published', true)
          .eq('visibility', 'public')
          .order('created_at', { ascending: false })
          .limit(500); // Add limit to prevent loading too many records

        if (error) throw error;
        return data || [];
      };

      // Race between fetch and timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          didTimeout = true;
          reject(new Error('TIMEOUT'));
        }, DB_TIMEOUT_MS);
      });

      let data: Obituary[] = [];
      try {
        data = await Promise.race([fetchWithTimeout(), timeoutPromise]);
      } catch (e) {
        if (didTimeout) {
          console.warn('Obituaries fetch timed out after ' + DB_TIMEOUT_MS + 'ms');
          setDataTimedOut(true);
          data = [];
        } else {
          throw e;
        }
      }

      // Check again if aborted before updating state
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setObituaries(data);
      setFilteredObituaries(data);
    } catch (error) {
      // Don't update state if aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      console.error('Error fetching obituaries:', error);
      setLoadError('Failed to load obituaries. Please try refreshing the page.');
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const fetchExternalObituaries = useCallback(async () => {
    // Check if request was aborted
    if (abortControllerRef.current?.signal.aborted) {
      return;
    }

    try {
      setExternalError(null);

      // Create a flag to track if timeout occurred
      let didTimeout = false;

      // Wrap the external fetches with timeout protection
      // Use supabasePublic for faster queries without auth session waiting
      const fetchWithTimeout = async () => {
        // Fetch both Jewish RSS and scraped obituaries in parallel
        const [jewishResult, scrapedResult] = await Promise.all([
          supabasePublic
            .from('obits')
            .select('*')
            .order('published_at', { ascending: false, nullsFirst: false })
            .limit(1000), // Add limit to prevent loading too many records
          supabasePublic
            .from('scraped_obituaries')
            .select('*')
            .order('published_at', { ascending: false, nullsFirst: false })
            .limit(1000) // Add limit to prevent loading too many records
        ]);

        if (jewishResult.error) {
          console.error('Error fetching Jewish obituaries:', jewishResult.error);
        }
        if (scrapedResult.error) {
          console.error('Error fetching scraped obituaries:', scrapedResult.error);
        }

        // Combine both sources
        return [
          ...(jewishResult.data || []),
          ...(scrapedResult.data || [])
        ];
      };

      // Race between fetch and timeout
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          didTimeout = true;
          reject(new Error('TIMEOUT'));
        }, EXTERNAL_TIMEOUT_MS);
      });

      let combined: (JewishObit | ScrapedObituary)[] = [];
      try {
        combined = await Promise.race([fetchWithTimeout(), timeoutPromise]);
      } catch (e) {
        if (didTimeout) {
          console.warn('External obituaries fetch timed out after ' + EXTERNAL_TIMEOUT_MS + 'ms');
          setDataTimedOut(true);
          combined = [];
        } else {
          throw e;
        }
      }

      // Check again if aborted before updating state
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      setExternalObits(combined);
      setFilteredExternalObits(combined);
    } catch (error) {
      // Don't update state if aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      console.error('Error fetching external obituaries:', error);
      setExternalError('Failed to load external obituaries. Please try syncing.');
    } finally {
      if (!abortControllerRef.current?.signal.aborted) {
        setExternalLoading(false);
      }
    }
  }, []);

  const syncAllExternal = async () => {
    setSyncing(true);
    try {
      // Call both sync functions in parallel
      const [rssResult, scrapedResult] = await Promise.all([
        supabase.functions.invoke('parse-rss-feed'),
        supabase.functions.invoke('sync-obituaries-v2')
      ]);

      if (rssResult.error || scrapedResult.error) {
        console.error('Error syncing:', rssResult.error || scrapedResult.error);
        toast({
          title: "Error",
          description: "Failed to sync some obituaries. Please try again.",
          variant: "destructive",
        });
      } else {
        const rssCount = rssResult.data?.inserted || 0;
        const scrapedCount = scrapedResult.data?.total_inserted || scrapedResult.data?.inserted_or_updated || 0;
        toast({
          title: "Success",
          description: `All sources synced! ${rssCount + scrapedCount} obituaries updated.`,
        });
        // Refresh the local data
        await fetchExternalObituaries();
      }
    } catch (error) {
      console.error('Error calling sync functions:', error);
      toast({
        title: "Error",
        description: "Failed to sync obituaries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  // Copy obituary link to clipboard
  const copyObituaryLink = (obitId: string, name: string) => {
    const url = `${window.location.origin}/search#obit-${obitId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(obitId);
      toast({
        title: "Link copied!",
        description: `Share link for ${name} copied to clipboard`,
      });
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Count related obituaries by location or source
  const getRelatedCount = (type: 'state' | 'source', value: string) => {
    return externalObits.filter(obit => {
      if (type === 'state') {
        return 'state' in obit && obit.state === value;
      } else {
        const source = 'source_name' in obit ? obit.source_name : ('source' in obit ? obit.source : '');
        return source === value;
      }
    }).length;
  };

  const getAge = (birthDate: string | null, deathDate: string | null) => {
    if (!birthDate) return '';
    const birth = new Date(birthDate);
    const death = deathDate ? new Date(deathDate) : new Date();
    const age = death.getFullYear() - birth.getFullYear();
    return age > 0 ? `, Age ${age}` : '';
  };

  // Generate dynamic meta tags based on filters
  const generateMetaTitle = () => {
    const parts = ['Jewish Obituaries'];
    if (stateFilter !== 'All') {
      const stateNames: Record<string, string> = {
        FL: 'Florida', NY: 'New York', CA: 'California', NJ: 'New Jersey',
        PA: 'Pennsylvania', IL: 'Illinois', MA: 'Massachusetts', TX: 'Texas',
        MD: 'Maryland', OH: 'Ohio'
      };
      parts.push(`in ${stateNames[stateFilter] || stateFilter}`);
    }
    if (externalSourceFilter !== 'All') {
      parts.push(`from ${externalSourceFilter}`);
    }
    parts.push(`| Search ${externalObits.length}+ Memorials | Jewish Obits`);
    return parts.join(' ');
  };

  const generateMetaDescription = () => {
    if (stateFilter !== 'All') {
      return `Search ${filteredExternalObits.length}+ Jewish obituaries from ${stateFilter}. Browse memorials from funeral homes, Jewish communities, and publications across the United States. Honor and remember loved ones.`;
    }
    return `Search ${externalObits.length}+ Jewish obituaries from funeral homes, Jewish communities, and publications nationwide. Comprehensive obituary database from 50+ trusted sources. Honor and remember loved ones.`;
  };

  const generateKeywords = () => {
    const baseKeywords = [
      'Jewish obituaries',
      'Jewish memorials',
      'Jewish funeral notices',
      'obituary search',
      'Jewish death notices',
      'yahrzeit',
      'shiva announcements'
    ];

    if (stateFilter !== 'All') {
      baseKeywords.push(`${stateFilter} Jewish obituaries`, `Jewish obituaries ${stateFilter}`);
    }

    const sources = Array.from(new Set(
      externalObits.map(o => 'source_name' in o ? o.source_name : o.source)
    )).slice(0, 10);

    return [...baseKeywords, ...sources].join(', ');
  };

  // Generate structured data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Jewish Obits",
    "description": "Comprehensive Jewish obituary database preserving memories from communities across the United States",
    "url": "https://jewishobituary.com",
    "logo": "https://jewishobituary.com/logo.png",
    "sameAs": [
      "https://facebook.com/jewishobits",
      "https://twitter.com/jewishobits"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "url": "https://jewishobituary.com/contact"
    }
  };

  // Helper function to parse name into given and family name
  const parseName = (fullName: string) => {
    const nameParts = fullName.trim().split(' ');
    if (nameParts.length === 1) {
      return { givenName: nameParts[0], familyName: '' };
    }
    const familyName = nameParts[nameParts.length - 1];
    const givenName = nameParts.slice(0, -1).join(' ');
    return { givenName, familyName };
  };

  // Generate structured data for ItemList of external obituaries
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Jewish Obituaries Nationwide",
    "description": "Comprehensive listing of Jewish obituaries from funeral homes and communities across the United States",
    "numberOfItems": filteredExternalObits.length,
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "itemListElement": filteredExternalObits.slice(0, 100).map((obit, index) => {
      const title = 'title' in obit ? obit.title : obit.name;
      const dateOfDeath = 'date_of_death' in obit ? obit.date_of_death : null;
      const publishedAt = obit.published_at;
      const city = 'city' in obit ? obit.city : null;
      const state = 'state' in obit ? obit.state : null;
      const location = city && state ? `${city}, ${state}` : city || state || 'United States';
      const { givenName, familyName } = parseName(title);

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Person",
          "name": title,
          "givenName": givenName,
          "familyName": familyName,
          ...(dateOfDeath && { "deathDate": dateOfDeath }),
          "homeLocation": {
            "@type": "Place",
            "address": location
          },
          "url": obit.source_url,
          "sameAs": obit.source_url,
          ...(publishedAt && { "datePublished": publishedAt })
        }
      };
    })
  };

  // Generate CollectionPage schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Jewish Obituaries Search",
    "description": "Search and browse Jewish obituaries from communities nationwide",
    "url": "https://jewishobituary.com/search",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredExternalObits.length,
      "itemListElement": filteredExternalObits.slice(0, 100).map((obit, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": obit.source_url
      }))
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "Jewish Obits",
      "url": "https://jewishobituary.com"
    }
  };

  // Generate BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jewishobituary.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Search Obituaries",
        "item": "https://jewishobituary.com/search"
      },
      ...(stateFilter !== 'All' ? [{
        "@type": "ListItem",
        "position": 3,
        "name": `${stateFilter} Obituaries`,
        "item": `https://jewishobituary.com/search#state-${stateFilter}`
      }] : [])
    ]
  };

  // Generate FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I search for Jewish obituaries?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the search bar to search by name, city, or location. You can filter results by state, source, and sort by date or source. Our database includes obituaries from 50+ Jewish communities, funeral homes, and publications across the United States."
        }
      },
      {
        "@type": "Question",
        "name": "Where do these obituaries come from?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our obituaries are sourced from over 50 trusted Jewish funeral homes, community organizations, and publications nationwide. We aggregate content from sources including Orlando Jewish communities, Tampa Bay, South Florida, and many other regions to provide comprehensive coverage."
        }
      },
      {
        "@type": "Question",
        "name": "How often is the obituary database updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our database is updated continuously throughout the day. New obituaries are automatically synchronized from our partner sources multiple times daily to ensure you have access to the most current information."
        }
      },
      {
        "@type": "Question",
        "name": "Can I submit an obituary to Jewish Obits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can create a free memorial page on Jewish Obits. Click 'Create Obituary' to get started. Our platform allows you to honor your loved ones with photos, memories, guestbook entries, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Are all obituaries on this site Jewish?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Jewish Obits specializes in Jewish obituaries and memorials. Our sources are specifically Jewish funeral homes, synagogues, and Jewish community organizations across the United States."
        }
      }
    ]
  };

  // Generate Organization schemas for unique sources
  const getOrganizationSchemas = () => {
    const uniqueSources = Array.from(new Set(
      externalObits.map(o => 'source_name' in o ? o.source_name : o.source)
    ));

    return uniqueSources.map(source => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": source,
      "description": `Trusted source for Jewish obituaries and memorial notices`,
      "url": externalObits.find(o =>
        ('source_name' in o && o.source_name === source) ||
        ('source' in o && o.source === source)
      )?.source_url || '',
      "memberOf": {
        "@type": "Organization",
        "name": "Jewish Obits Network"
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-foreground mb-4">Find Obituaries</h1>
            <p className="text-muted-foreground text-lg">
              Loading obituaries...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <ObituaryCardSkeleton key={i} index={i} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state if there was a loading error
  if (loadError && obituaries.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h2 className="text-xl font-semibold mb-2">Unable to Load Obituaries</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">{loadError}</p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">

      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">
                  <Home className="h-4 w-4" />
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Search Obituaries</BreadcrumbPage>
            </BreadcrumbItem>
            {stateFilter !== 'All' && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{stateFilter} Obituaries</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-foreground mb-4">Find Obituaries</h1>
          <p className="text-muted-foreground text-lg">
            Search and browse obituaries to honor and remember loved ones
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <SearchFilters filters={filters} onChange={setFilters} />
        </div>

        {/* Timeout Warning Banner */}
        {dataTimedOut && (filteredObituaries.length === 0 || externalObits.length === 0) && (
          <div className="max-w-4xl mx-auto mb-6 p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-200">Connection Issue</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Some obituaries may not be showing due to a slow connection. Try refreshing the page or check back later.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900"
                  onClick={() => window.location.reload()}
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        )}

        {filteredObituaries.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {dataTimedOut
                ? 'Unable to Load Obituaries'
                : filters.searchTerm
                  ? 'No obituaries found'
                  : 'No obituaries yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {dataTimedOut
                ? 'There was a problem loading the obituaries. Please try refreshing the page.'
                : filters.searchTerm
                  ? 'Try adjusting your search filters'
                  : 'Be the first to create a meaningful tribute'
              }
            </p>
            <Link href="/create-obituary">
              <Button className="bg-gradient-elegant text-primary-foreground hover:shadow-glow transition-all duration-300">
                Create First Obituary
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                Found {filteredObituaries.length} {filteredObituaries.length === 1 ? 'obituary' : 'obituaries'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUnifiedObituaries.map((obituary, index) => (
                <ObituaryCard
                  key={obituary.id}
                  obituary={obituary}
                  onCopyLink={copyObituaryLink}
                  copiedId={copiedId}
                  index={index}
                />
              ))}
            </div>
          </>
        )}

        {filteredObituaries.length > 0 && (
          <div className="text-center mt-12 animate-fade-in">
            <p className="text-muted-foreground">
              {filters.searchTerm || filters.dateFrom || filters.dateTo || filters.cityFilter
                ? `Found ${filteredObituaries.length} matching obituaries`
                : `Showing ${filteredObituaries.length} obituaries`
              }
            </p>
          </div>
        )}

        {/* Jewish Obituaries Nationwide - Unified Section */}
        <div className="mt-16 pt-16 border-t border-primary/10">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center gap-3 mb-6 px-8 py-4 rounded-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10">
              <Star className="h-7 w-7 text-primary animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Jewish Obituaries Nationwide
              </h2>
              <Star className="h-7 w-7 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Honoring lives and preserving memories from Jewish communities, funeral homes, and publications across the United States
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                onClick={syncAllExternal}
                variant="outline"
                size="lg"
                className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 shadow-md hover:shadow-lg"
                disabled={syncing}
              >
                {syncing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Sync All Sources
                  </>
                )}
              </Button>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                {externalObits.length} obituaries
              </Badge>
            </div>
          </div>

          {/* Enhanced Unified Filters */}
          <div className="max-w-6xl mx-auto mb-12 animate-fade-in px-4">
            <div className="bg-gradient-to-br from-background via-muted/5 to-background rounded-2xl p-6 md:p-8 shadow-lg border border-primary/10">
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary/60" />
                <Input
                  value={externalSearchTerm}
                  onChange={(e) => setExternalSearchTerm(e.target.value)}
                  className="pl-12 pr-4 bg-background border-primary/20 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-14 text-base rounded-xl shadow-sm"
                  placeholder="Search by name, city, or description..."
                />
              </div>

              <div className="space-y-6">
                {/* State Filter Pills */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground px-1">Filter by State</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...externalStateOptions].map((state) => (
                      <Button
                        key={state}
                        variant={stateFilter === state ? "default" : "outline"}
                        size="sm"
                        onClick={() => setStateFilter(state)}
                        className={`transition-all duration-300 rounded-full ${
                          stateFilter === state
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'hover:bg-primary/10 hover:border-primary/30'
                        }`}
                      >
                        {state === 'All' ? 'All States' : (STATE_NAMES[state] || state)}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Source Filter Pills */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-foreground px-1">Filter by Source</label>
                  <div className="flex flex-wrap gap-2">
                    {['All', ...externalSourceOptions].map((source) => (
                      <Button
                        key={source}
                        variant={externalSourceFilter === source ? "default" : "outline"}
                        size="sm"
                        onClick={() => setExternalSourceFilter(source)}
                        className={`transition-all duration-300 rounded-full ${
                          externalSourceFilter === source
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'hover:bg-primary/10 hover:border-primary/30'
                        }`}
                      >
                        {source === 'All' ? 'All Sources' : source}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Controls */}
                <div className="space-y-3 pt-4 border-t border-primary/10">
                  <label className="text-sm font-semibold text-foreground px-1">Sort By</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={externalSortBy === 'Most recent' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExternalSortBy('Most recent')}
                      className={`transition-all duration-300 rounded-full ${
                        externalSortBy === 'Most recent'
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-primary/10 hover:border-primary/30'
                      }`}
                    >
                      Most Recent
                    </Button>
                    <Button
                      variant={externalSortBy === 'Source' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setExternalSortBy('Source')}
                      className={`transition-all duration-300 rounded-full ${
                        externalSortBy === 'Source'
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'hover:bg-primary/10 hover:border-primary/30'
                      }`}
                    >
                      Source
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Beautiful Unified Obituary Cards */}
          {externalLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {[...Array(6)].map((_, i) => (
                <ObituaryCardSkeleton key={i} index={i} />
              ))}
            </div>
          ) : filteredExternalObits.length === 0 ? (
            <div className="text-center py-16 animate-fade-in px-4">
              <div className="bg-gradient-to-br from-muted/20 to-transparent rounded-2xl p-12 max-w-md mx-auto border border-border/30">
                <div className="mb-6 relative">
                  <Heart className="mx-auto h-20 w-20 text-primary/30 mb-4" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  No obituaries found
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">
                  {externalSearchTerm || stateFilter !== 'All' || externalSourceFilter !== 'All'
                    ? 'Try adjusting your filters or search terms'
                    : 'Sync the latest obituaries to see more memorials'
                  }
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={syncAllExternal}
                    variant="default"
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-glow transition-all duration-300"
                    disabled={syncing}
                  >
                    {syncing ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-background border-t-transparent rounded-full" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        Sync Latest Obituaries
                      </>
                    )}
                  </Button>
                  {(externalSearchTerm || stateFilter !== 'All' || externalSourceFilter !== 'All') && (
                    <Button
                      onClick={() => {
                        setExternalSearchTerm('');
                        setStateFilter('All');
                        setExternalSourceFilter('All');
                      }}
                      variant="outline"
                      size="lg"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
            {/* Quick Statistics */}
            <SearchStats obituaries={filteredUnifiedExternalObits} visible={visibleCount} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {filteredUnifiedExternalObits.slice(0, visibleCount).map((obituary, index) => (
                <ObituaryCard
                  key={obituary.id}
                  obituary={obituary}
                  onCopyLink={copyObituaryLink}
                  copiedId={copiedId}
                  index={index}
                />
              ))}
            </div>

            {/* SEO-Friendly Pagination */}
            {filteredExternalObits.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center items-center gap-2 mt-16 px-4">
                <nav className="flex items-center gap-2" aria-label="Pagination">
                  {currentPage > 1 && (
                    <Link href={`/search?page=${currentPage - 1}`}>
                      <Button variant="outline" size="lg">
                        Previous
                      </Button>
                    </Link>
                  )}

                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.ceil(filteredExternalObits.length / ITEMS_PER_PAGE) }, (_, i) => i + 1)
                      .filter(page => {
                        const totalPages = Math.ceil(filteredExternalObits.length / ITEMS_PER_PAGE);
                        return page === 1 ||
                               page === totalPages ||
                               (page >= currentPage - 1 && page <= currentPage + 1);
                      })
                      .map((page, index, array) => (
                        <div key={page} className="flex items-center gap-2">
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="text-muted-foreground px-2">...</span>
                          )}
                          <Link href={`/search?page=${page}`}>
                            <Button
                              variant={currentPage === page ? "default" : "outline"}
                              size="lg"
                              className={currentPage === page ? "bg-primary text-primary-foreground" : ""}
                            >
                              {page}
                            </Button>
                          </Link>
                        </div>
                      ))}
                  </div>

                  {currentPage < Math.ceil(filteredExternalObits.length / ITEMS_PER_PAGE) && (
                    <Link href={`/search?page=${currentPage + 1}`}>
                      <Button variant="outline" size="lg">
                        Next
                      </Button>
                    </Link>
                  )}
                </nav>

                <p className="text-sm text-muted-foreground mt-4 font-medium text-center">
                  Page {currentPage} of {Math.ceil(filteredExternalObits.length / ITEMS_PER_PAGE)}
                  ({visibleCount} of {filteredExternalObits.length} obituaries)
                </p>
              </div>
            )}
            </>
          )}

          {filteredExternalObits.length > 0 && (
            <div className="text-center mt-20 animate-fade-in px-4">
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border border-primary/20 shadow-sm">
                <Badge variant="secondary" className="text-base font-bold px-3 py-1 bg-primary/10">
                  {filteredExternalObits.length}
                </Badge>
                <p className="text-muted-foreground font-medium text-sm md:text-base">
                  of {externalObits.length} obituaries
                  {stateFilter !== 'All' && (
                    <span className="text-primary font-semibold ml-1.5">
                      from {STATE_NAMES[stateFilter] || stateFilter}
                    </span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section with Schema */}
        <section className="mt-20 pt-16 border-t border-border/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Common questions about searching Jewish obituaries</p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-background/80 backdrop-blur-lg border border-border/30 shadow-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-3">How do I search for Jewish obituaries?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Use the search bar to search by name, city, or location. You can filter results by state, source, and sort by date or source. Our database includes obituaries from 50+ Jewish communities, funeral homes, and publications across the United States.
                </p>
              </Card>

              <Card className="p-6 bg-background/80 backdrop-blur-lg border border-border/30 shadow-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-3">Where do these obituaries come from?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our obituaries are sourced from over 50 trusted Jewish funeral homes, community organizations, and publications nationwide. We aggregate content from sources including Orlando Jewish communities, Tampa Bay, South Florida, and many other regions to provide comprehensive coverage.
                </p>
              </Card>

              <Card className="p-6 bg-background/80 backdrop-blur-lg border border-border/30 shadow-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-3">How often is the obituary database updated?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our database is updated continuously throughout the day. New obituaries are automatically synchronized from our partner sources multiple times daily to ensure you have access to the most current information.
                </p>
              </Card>

              <Card className="p-6 bg-background/80 backdrop-blur-lg border border-border/30 shadow-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-3">Can I submit an obituary to Jewish Obits?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes! You can create a free memorial page on Jewish Obits. Click 'Create Obituary' to get started. Our platform allows you to honor your loved ones with photos, memories, guestbook entries, and more.
                </p>
              </Card>

              <Card className="p-6 bg-background/80 backdrop-blur-lg border border-border/30 shadow-subtle">
                <h3 className="text-lg font-semibold text-foreground mb-3">Are all obituaries on this site Jewish?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Yes, Jewish Obits specializes in Jewish obituaries and memorials. Our sources are specifically Jewish funeral homes, synagogues, and Jewish community organizations across the United States.
                </p>
              </Card>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-primary/30 hover:bg-primary/10">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading search...</div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
