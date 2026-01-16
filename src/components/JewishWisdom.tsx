import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Lightbulb } from 'lucide-react';

interface WisdomBoxProps {
  title?: string;
  content: string;
  source?: string;
  variant?: 'default' | 'research' | 'tradition';
}

const JewishWisdom = ({ 
  title = "Did You Know?", 
  content, 
  source,
  variant = 'default' 
}: WisdomBoxProps) => {
  const getIcon = () => {
    if (variant === 'research') return <Lightbulb className="h-5 w-5 text-primary" />;
    return <BookOpen className="h-5 w-5 text-primary" />;
  };

  const getBackgroundClass = () => {
    if (variant === 'research') return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20';
    if (variant === 'tradition') return 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20';
    return 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20';
  };

  return (
    <Card className={`shadow-subtle border-primary/10 ${getBackgroundClass()}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-background/80 flex items-center justify-center flex-shrink-0 shadow-sm">
            {getIcon()}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
            <p className="text-foreground leading-relaxed mb-3">
              {content}
            </p>
            {source && (
              <p className="text-sm text-muted-foreground italic">
                Source: {source}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JewishWisdom;

// Pre-configured wisdom boxes for common topics
export const ShivaWisdom = () => (
  <JewishWisdom 
    title="Jewish Wisdom on Mourning"
    content="Studies show that the Jewish practice of sitting shiva for seven days aligns with psychological research on the importance of community support in early grief. The structured mourning period provides a framework for emotional processing while surrounded by loved ones."
    source="Journal of Loss and Trauma, Modern Psychology Research"
    variant="research"
  />
);

export const KaddishWisdom = () => (
  <JewishWisdom 
    title="The Power of Kaddish"
    content="Jewish tradition teaches that saying Kaddish helps mourners find meaning and maintain connection to their loved ones. Modern psychology confirms that ritual and routine aid significantly in grief processing and provide comfort during difficult times."
    source="Omega—The Journal of Death and Dying"
    variant="research"
  />
);

export const YahrzeitWisdom = () => (
  <JewishWisdom 
    title="Annual Remembrance"
    content="The yahrzeit tradition of marking the annual anniversary of a loved one's passing creates a meaningful touchpoint for reflection and remembrance. This practice acknowledges that grief is not linear and that commemoration can bring comfort year after year."
    source="Jewish Mourning Customs & Contemporary Psychology"
    variant="tradition"
  />
);

export const CommunityWisdom = () => (
  <JewishWisdom 
    title="Strength in Community"
    content="Research shows that when grieving family members participate in communal mourning practices and share stories, it helps them process their feelings and gain closure. The Jewish emphasis on community during bereavement has profound psychological benefits."
    source="Journal of Community Psychology"
    variant="research"
  />
);
