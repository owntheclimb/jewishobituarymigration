import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BookText, Scale, Globe, ExternalLink } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type SourceType = 'book' | 'talmud' | 'halacha' | 'website';

interface Source {
  title: string;
  author?: string;
  type: SourceType;
  section?: string;
  url?: string;
}

interface SourcesCitationProps {
  sources: Source[];
  title?: string;
}

const typeIcons: Record<SourceType, LucideIcon> = {
  book: BookText,
  talmud: BookOpen,
  halacha: Scale,
  website: Globe,
};

const typeLabels: Record<SourceType, string> = {
  book: 'Books & Publications',
  talmud: 'Talmudic Sources',
  halacha: 'Halachic Sources',
  website: 'Online Resources',
};

export function SourcesCitation({ sources, title = 'Sources & References' }: SourcesCitationProps) {
  // Group sources by type
  const groupedSources = sources.reduce(
    (acc, source) => {
      if (!acc[source.type]) {
        acc[source.type] = [];
      }
      acc[source.type].push(source);
      return acc;
    },
    {} as Record<SourceType, Source[]>
  );

  // Define display order
  const typeOrder: SourceType[] = ['talmud', 'halacha', 'book', 'website'];
  const orderedTypes = typeOrder.filter((type) => groupedSources[type]?.length > 0);

  return (
    <Card className="mt-12 border-t-4 border-primary/30 bg-muted/30">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-6">
          {orderedTypes.map((type) => {
            const Icon = typeIcons[type];
            const sourcesOfType = groupedSources[type];

            return (
              <div key={type}>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {typeLabels[type]}
                </h4>
                <ul className="space-y-2">
                  {sourcesOfType.map((source, index) => (
                    <li key={index} className="text-sm text-foreground/80">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary hover:underline inline-flex items-start gap-1 group"
                        >
                          <span>
                            {source.author && <span>{source.author}. </span>}
                            <em>{source.title}</em>
                            {source.section && <span>. {source.section}</span>}
                          </span>
                          <ExternalLink className="h-3 w-3 flex-shrink-0 mt-1 opacity-50 group-hover:opacity-100" />
                        </a>
                      ) : (
                        <>
                          {source.author && <span>{source.author}. </span>}
                          <em>{source.title}</em>
                          {source.section && <span>. {source.section}</span>}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
