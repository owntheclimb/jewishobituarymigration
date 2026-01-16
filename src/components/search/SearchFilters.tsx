import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, SlidersHorizontal, X, Search } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import FacetSelect from '@/components/FacetSelect';

export interface SearchFilterValues {
  searchTerm: string;
  hebrewName: string;
  cityFilter: string;
  stateFilter: string;
  highSchoolFilter: string;
  collegeFilter: string;
  militaryFilter: string;
  synagogueFilter: string;
  occupationFilter: string;
  dateFrom: string;
  dateTo: string;
  ageMin: string;
  ageMax: string;
  holocaustSurvivor: boolean;
  hasMilitaryService: boolean;
}

interface SearchFiltersProps {
  filters: SearchFilterValues;
  onChange: (filters: SearchFilterValues) => void;
}

const FILTER_STORAGE_KEY = 'jewish-obits-search-filters';

const SearchFilters = ({ filters, onChange }: SearchFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load saved filters from localStorage on mount
  useEffect(() => {
    const savedFilters = localStorage.getItem(FILTER_STORAGE_KEY);
    if (savedFilters) {
      try {
        const parsed = JSON.parse(savedFilters);
        // Don't restore searchTerm, only advanced filters
        onChange({ ...filters, ...parsed, searchTerm: filters.searchTerm });
      } catch (e) {
        console.error('Failed to parse saved filters:', e);
      }
    }
  }, []);

  // Save filters to localStorage when they change
  useEffect(() => {
    const { searchTerm, ...advancedFilters } = filters;
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(advancedFilters));
  }, [filters]);

  const updateFilter = (key: keyof SearchFilterValues, value: string | boolean) => {
    onChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    const clearedFilters = {
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
    };
    onChange(clearedFilters);
    localStorage.removeItem(FILTER_STORAGE_KEY);
    setShowAdvanced(false);
  };

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => {
      if (key === 'searchTerm') return false;
      if (typeof value === 'boolean') return value === true;
      return value !== '';
    }
  );

  const activeFilterCount = Object.entries(filters).filter(
    ([key, value]) => {
      if (key === 'searchTerm') return false;
      if (typeof value === 'boolean') return value === true;
      return value !== '';
    }
  ).length;

  return (
    <div className="space-y-4">
      {/* Main Search */}
      <div className="relative">
        <Input
          value={filters.searchTerm}
          onChange={(e) => updateFilter('searchTerm', e.target.value)}
          className="pl-10 h-12 bg-background/80 backdrop-blur-lg border-border/50 shadow-sm"
          placeholder="Search by name, location, Hebrew name, or biography..."
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (key === 'searchTerm' || !value || (typeof value === 'boolean' && !value)) return null;
            
            const filterLabels: Record<string, string> = {
              hebrewName: 'Hebrew Name',
              cityFilter: 'City',
              stateFilter: 'State',
              highSchoolFilter: 'High School',
              collegeFilter: 'College',
              militaryFilter: 'Military',
              synagogueFilter: 'Synagogue',
              occupationFilter: 'Occupation',
              dateFrom: 'From',
              dateTo: 'To',
              ageMin: 'Min Age',
              ageMax: 'Max Age',
              holocaustSurvivor: 'Holocaust Survivor',
              hasMilitaryService: 'Military Service',
            };

            return (
              <Badge key={key} variant="secondary" className="gap-1">
                <span className="text-xs font-medium">{filterLabels[key]}:</span>
                <span className="text-xs">{typeof value === 'boolean' ? 'Yes' : value}</span>
                <button
                  onClick={() => updateFilter(key as keyof SearchFilterValues, typeof value === 'boolean' ? false : '')}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Advanced Filters Toggle */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <div className="flex items-center justify-between">
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="gap-2 shadow-sm">
              <SlidersHorizontal className="h-4 w-4" />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
              {hasActiveFilters && (
                <Badge variant="default" className="ml-1 px-2 py-0.5 rounded-full text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </CollapsibleTrigger>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="gap-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
              Clear All
            </Button>
          )}
        </div>

        <CollapsibleContent className="mt-4">
          <Card className="p-6 space-y-6 bg-muted/30 shadow-sm">
            {/* Search Fields Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Search Fields</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hebrew-name">Hebrew Name</Label>
                  <Input
                    id="hebrew-name"
                    value={filters.hebrewName}
                    onChange={(e) => updateFilter('hebrewName', e.target.value)}
                    placeholder="e.g., שרה בת אברהם"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={filters.occupationFilter}
                    onChange={(e) => updateFilter('occupationFilter', e.target.value)}
                    placeholder="e.g., Teacher, Doctor..."
                  />
                </div>
              </div>
            </div>

            {/* Date & Age Filters Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Date & Age</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date-from" className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Date of Death From
                  </Label>
                  <Input
                    id="date-from"
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => updateFilter('dateFrom', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-to" className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    Date of Death To
                  </Label>
                  <Input
                    id="date-to"
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => updateFilter('dateTo', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age-min">Age From</Label>
                  <Input
                    id="age-min"
                    type="number"
                    min="0"
                    max="120"
                    value={filters.ageMin}
                    onChange={(e) => updateFilter('ageMin', e.target.value)}
                    placeholder="Min age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age-max">Age To</Label>
                  <Input
                    id="age-max"
                    type="number"
                    min="0"
                    max="120"
                    value={filters.ageMax}
                    onChange={(e) => updateFilter('ageMax', e.target.value)}
                    placeholder="Max age"
                  />
                </div>
              </div>
            </div>

            {/* Location Filters Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Location</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <FacetSelect
                    type="city"
                    value={filters.cityFilter}
                    onValueChange={(value) => updateFilter('cityFilter', value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={filters.stateFilter}
                    onChange={(e) => updateFilter('stateFilter', e.target.value)}
                    placeholder="e.g., NY, CA, FL..."
                  />
                </div>
              </div>
            </div>

            {/* Community & Affiliations Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Community & Affiliations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="synagogue">Synagogue</Label>
                  <Input
                    id="synagogue"
                    value={filters.synagogueFilter}
                    onChange={(e) => updateFilter('synagogueFilter', e.target.value)}
                    placeholder="e.g., Temple Beth El..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>High School</Label>
                  <FacetSelect
                    type="highschool"
                    value={filters.highSchoolFilter}
                    onValueChange={(value) => updateFilter('highSchoolFilter', value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>College</Label>
                  <FacetSelect
                    type="college"
                    value={filters.collegeFilter}
                    onValueChange={(value) => updateFilter('collegeFilter', value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Military Branch</Label>
                  <FacetSelect
                    type="military"
                    value={filters.militaryFilter}
                    onValueChange={(value) => updateFilter('militaryFilter', value)}
                  />
                </div>
              </div>
            </div>

            {/* Special Categories Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Special Categories</h3>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="holocaust-survivor"
                    checked={filters.holocaustSurvivor}
                    onCheckedChange={(checked) => updateFilter('holocaustSurvivor', checked as boolean)}
                  />
                  <Label
                    htmlFor="holocaust-survivor"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Holocaust Survivor
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="military-service"
                    checked={filters.hasMilitaryService}
                    onCheckedChange={(checked) => updateFilter('hasMilitaryService', checked as boolean)}
                  />
                  <Label
                    htmlFor="military-service"
                    className="text-sm font-normal cursor-pointer"
                  >
                    Has Military Service
                  </Label>
                </div>
              </div>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SearchFilters;
