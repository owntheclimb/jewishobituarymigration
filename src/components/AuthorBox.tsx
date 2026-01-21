'use client';

import Image from 'next/image';
import { Author, getDefaultAuthor } from '@/data/authors';

interface AuthorBoxProps {
  author?: Author;
  showCredentials?: boolean;
  className?: string;
}

/**
 * AuthorBox component for E-E-A-T signals
 * Displays author attribution on article pages
 */
export function AuthorBox({ author, showCredentials = true, className = '' }: AuthorBoxProps) {
  const displayAuthor = author || getDefaultAuthor();

  return (
    <div className={`flex items-start gap-4 py-6 border-y border-border ${className}`}>
      {/* Author Avatar */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted flex-shrink-0">
        {displayAuthor.image ? (
          <Image
            src={displayAuthor.image}
            alt={displayAuthor.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-xl font-semibold">
            {displayAuthor.name.charAt(0)}
          </div>
        )}
      </div>

      {/* Author Info */}
      <div className="flex-1">
        <p className="font-semibold text-foreground">{displayAuthor.name}</p>
        <p className="text-sm text-muted-foreground">{displayAuthor.title}</p>

        {showCredentials && displayAuthor.credentials.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {displayAuthor.credentials.map((credential) => (
              <span
                key={credential}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
              >
                {credential}
              </span>
            ))}
          </div>
        )}

        {displayAuthor.bio && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {displayAuthor.bio}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Compact author attribution for article headers
 */
export function AuthorByline({ author, date }: { author?: Author; date?: string }) {
  const displayAuthor = author || getDefaultAuthor();

  return (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
        {displayAuthor.image ? (
          <Image
            src={displayAuthor.image}
            alt={displayAuthor.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-sm font-semibold">
            {displayAuthor.name.charAt(0)}
          </div>
        )}
      </div>
      <div>
        <span className="text-foreground font-medium">{displayAuthor.name}</span>
        {date && (
          <>
            <span className="mx-2">·</span>
            <span>{date}</span>
          </>
        )}
      </div>
    </div>
  );
}
