import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FacetSelectProps {
  type: 'city' | 'highschool' | 'college' | 'military';
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const FacetSelect = ({ type, value, onValueChange, placeholder }: FacetSelectProps) => {
  const [options, setOptions] = useState<Array<{ name: string; slug: string }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('name, slug')
          .eq('type', type)
          .order('name');

        if (error) throw error;
        setOptions(data || []);
      } catch (error) {
        console.error('Error fetching communities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [type]);

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (type) {
      case 'city': return 'Select a city';
      case 'highschool': return 'Select a high school';
      case 'college': return 'Select a college';
      case 'military': return 'Select military branch';
      default: return 'Select an option';
    }
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={getPlaceholder()} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All {type === 'military' ? 'branches' : `${type}s`}</SelectItem>
        {loading ? (
          <SelectItem value="loading" disabled>Loading...</SelectItem>
        ) : (
          options.map((option) => (
            <SelectItem key={option.slug} value={option.slug}>
              {option.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  );
};

export default FacetSelect;