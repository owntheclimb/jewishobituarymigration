import { Card, CardContent } from '@/components/ui/card';

interface DefinitionBoxProps {
  term: string;
  transliteration: string;
  meaning: string;
  definition: string;
  pronunciation?: string;
}

export function DefinitionBox({
  term,
  transliteration,
  meaning,
  definition,
  pronunciation,
}: DefinitionBoxProps) {
  return (
    <Card className="border-l-4 border-primary/50 bg-[hsl(var(--background-warm))]">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
          <div className="flex-shrink-0">
            <p className="text-2xl font-bold text-primary" dir="rtl" lang="he">
              {term}
            </p>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <span className="font-semibold text-foreground italic">{transliteration}</span>
              {pronunciation && (
                <span className="text-sm text-muted-foreground">({pronunciation})</span>
              )}
              <span className="text-sm text-muted-foreground">— "{meaning}"</span>
            </div>
            <p className="text-foreground/90 text-sm leading-relaxed">{definition}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DefinitionGridProps {
  children: React.ReactNode;
}

export function DefinitionGrid({ children }: DefinitionGridProps) {
  return <div className="grid gap-3 grid-cols-1 md:grid-cols-2">{children}</div>;
}
