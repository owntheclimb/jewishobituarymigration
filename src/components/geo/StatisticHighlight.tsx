import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatisticHighlightProps {
  value: string;
  label: string;
  source: string;
  sourceYear?: string;
  sourceUrl?: string;
  icon?: LucideIcon;
}

export function StatisticHighlight({
  value,
  label,
  source,
  sourceYear,
  sourceUrl,
  icon: Icon,
}: StatisticHighlightProps) {
  const sourceText = sourceYear ? `${source} (${sourceYear})` : source;

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-3xl font-bold text-primary mb-1">{value}</p>
            <p className="text-foreground/90 leading-relaxed mb-2">{label}</p>
            <p className="text-xs text-muted-foreground">
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline transition-colors"
                >
                  Source: {sourceText}
                </a>
              ) : (
                <>Source: {sourceText}</>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface StatisticGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
}

export function StatisticGrid({ children, columns = 3 }: StatisticGridProps) {
  return (
    <div
      className={`grid gap-4 ${
        columns === 2
          ? 'grid-cols-1 md:grid-cols-2'
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}
    >
      {children}
    </div>
  );
}
