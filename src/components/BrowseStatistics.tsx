import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, GraduationCap, MapPin, Users, Briefcase, Star } from 'lucide-react';

interface StatItem {
  icon: React.ElementType;
  label: string;
  count: string;
  link: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: MapPin,
    label: 'Cities',
    count: '150+',
    link: '/communities/city',
    description: 'Communities across North America'
  },
  {
    icon: Building2,
    label: 'Synagogues',
    count: '200+',
    link: '/communities/synagogue',
    description: 'Houses of worship'
  },
  {
    icon: GraduationCap,
    label: 'Schools',
    count: '125+',
    link: '/communities/school',
    description: 'Educational institutions'
  },
  {
    icon: Users,
    label: 'Organizations',
    count: '80+',
    link: '/communities/organization',
    description: 'Jewish community groups'
  },
  {
    icon: Star,
    label: 'Notable Figures',
    count: '500+',
    link: '/notable',
    description: 'Leaders and pioneers'
  },
  {
    icon: Briefcase,
    label: 'Funeral Homes',
    count: '300+',
    link: '/funeral-homes',
    description: 'Service providers'
  }
];

const BrowseStatistics = () => {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse Our Growing Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover connections across Jewish communities, institutions, and memorials
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.link}
                className="group"
              >
                <Card className="h-full shadow-subtle hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:border-primary/30">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">
                      {stat.count}
                    </div>
                    <div className="font-semibold text-foreground mb-2">
                      {stat.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowseStatistics;
