import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface CommunityBadgeProps {
  type: 'city' | 'highschool' | 'college' | 'military';
  name: string;
  slug: string;
  variant?: 'default' | 'secondary' | 'outline';
}

const CommunityBadge = ({ type, name, slug, variant = 'outline' }: CommunityBadgeProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'city': return '🏙️';
      case 'highschool': return '🎓';
      case 'college': return '🏫';
      case 'military': return '🎖️';
      default: return '';
    }
  };

  return (
    <Link href={`/communities/${type}/${slug}`}>
      <Badge variant={variant} className="hover:bg-muted/80 transition-colors cursor-pointer">
        <span className="mr-1">{getIcon(type)}</span>
        {name}
      </Badge>
    </Link>
  );
};

export default CommunityBadge;