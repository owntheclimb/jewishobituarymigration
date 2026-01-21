import { Card, CardContent } from '@/components/ui/card';
import { Quote, ExternalLink } from 'lucide-react';

interface ExpertQuoteProps {
  quote: string;
  expertName: string;
  credentials: string;
  source?: string;
  sourceUrl?: string;
  variant?: 'default' | 'prominent';
}

export function ExpertQuote({
  quote,
  expertName,
  credentials,
  source,
  sourceUrl,
  variant = 'default',
}: ExpertQuoteProps) {
  const isProminent = variant === 'prominent';

  return (
    <Card
      className={`border-l-4 border-primary/70 shadow-sm ${
        isProminent
          ? 'bg-gradient-to-br from-primary/5 via-background to-primary/5'
          : 'bg-[hsl(var(--background-soft))]'
      }`}
    >
      <CardContent className={isProminent ? 'p-8' : 'p-6'}>
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center ${
              isProminent ? 'w-12 h-12' : 'w-10 h-10'
            }`}
          >
            <Quote className={`text-primary ${isProminent ? 'h-6 w-6' : 'h-5 w-5'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <blockquote
              className={`italic text-foreground/90 leading-relaxed mb-3 ${
                isProminent ? 'text-lg' : 'text-base'
              }`}
            >
              "{quote}"
            </blockquote>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{expertName}</p>
              <p className="text-sm text-muted-foreground">{credentials}</p>
              {source && (
                <p className="text-sm text-muted-foreground">
                  {sourceUrl ? (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <em>{source}</em>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <em>{source}</em>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
