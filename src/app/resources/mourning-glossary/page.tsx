'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  BookOpen,
  ArrowLeft,
  Volume2,
  ChevronDown,
  ChevronUp,
  Star,
  Clock,
  Heart,
  Users,
  Home,
  Flame,
  Calendar,
} from 'lucide-react';

interface GlossaryTerm {
  term: string;
  hebrew: string;
  pronunciation: string;
  definition: string;
  usage?: string;
  related?: string[];
  category: string;
}

const CATEGORIES = [
  { id: 'all', label: 'All Terms', icon: BookOpen },
  { id: 'mourning-periods', label: 'Mourning Periods', icon: Clock },
  { id: 'prayers', label: 'Prayers & Blessings', icon: Star },
  { id: 'customs', label: 'Customs & Rituals', icon: Flame },
  { id: 'people', label: 'People & Roles', icon: Users },
  { id: 'places', label: 'Places', icon: Home },
  { id: 'memorial', label: 'Memorial', icon: Heart },
  { id: 'calendar', label: 'Calendar & Dates', icon: Calendar },
];

const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Mourning Periods
  {
    term: 'Aninut',
    hebrew: 'אנינות',
    pronunciation: 'ah-nee-NOOT',
    definition: 'The period between death and burial when the mourner (onen) is exempt from positive commandments. This is a time of intense grief when the focus is solely on caring for the deceased and preparing for burial.',
    usage: 'During aninut, the mourner does not eat meat, drink wine, or engage in pleasurable activities.',
    related: ['Onen', 'Kevurah'],
    category: 'mourning-periods',
  },
  {
    term: 'Shiva',
    hebrew: 'שבעה',
    pronunciation: 'SHIH-vah',
    definition: 'The seven-day mourning period following burial. Mourners traditionally sit on low chairs, refrain from work, and receive visitors who come to comfort them. The word comes from the Hebrew word for "seven."',
    usage: '"We are sitting shiva at 123 Main Street from Sunday through Friday."',
    related: ['Shiva Call', 'Nichum Aveilim', 'Aveilut'],
    category: 'mourning-periods',
  },
  {
    term: 'Sheloshim',
    hebrew: 'שלושים',
    pronunciation: 'shloh-SHEEM',
    definition: 'The thirty-day mourning period following burial. During this time, mourners gradually return to normal activities but still observe certain restrictions such as not attending celebrations or listening to live music.',
    usage: 'The sheloshim period ends thirty days after burial.',
    related: ['Shiva', 'Aveilut'],
    category: 'mourning-periods',
  },
  {
    term: 'Yahrzeit',
    hebrew: 'יארצייט',
    pronunciation: 'YAHR-tzite',
    definition: 'The annual anniversary of a death according to the Hebrew calendar. On this day, mourners light a memorial candle, recite Kaddish, and often visit the grave.',
    usage: 'Her yahrzeit falls on the 15th of Tishrei this year.',
    related: ['Ner Neshama', 'Kaddish', 'Yizkor'],
    category: 'mourning-periods',
  },
  {
    term: 'Aveilut',
    hebrew: 'אבילות',
    pronunciation: 'ah-vay-LOOT',
    definition: 'The general Hebrew term for mourning. It encompasses all periods and practices of Jewish mourning, from aninut through the year of mourning for parents.',
    related: ['Avel', 'Shiva', 'Sheloshim'],
    category: 'mourning-periods',
  },
  // Prayers & Blessings
  {
    term: 'Kaddish',
    hebrew: 'קדיש',
    pronunciation: 'KAH-dish',
    definition: 'The mourner\'s prayer recited in memory of the deceased. Despite being associated with mourning, the Kaddish does not mention death but rather sanctifies God\'s name. It is recited during services for eleven months after burial and on the yahrzeit.',
    usage: 'A minyan is required to say Kaddish.',
    related: ['Minyan', 'Yahrzeit', 'Yizkor'],
    category: 'prayers',
  },
  {
    term: 'Yizkor',
    hebrew: 'יזכור',
    pronunciation: 'yiz-KOHR',
    definition: 'Memorial prayers recited four times a year: on Yom Kippur, Shemini Atzeret, the last day of Passover, and the second day of Shavuot. The word means "may [God] remember."',
    usage: 'Many congregants stay for Yizkor services to remember their loved ones.',
    related: ['Kaddish', 'Yahrzeit'],
    category: 'prayers',
  },
  {
    term: 'El Malei Rachamim',
    hebrew: 'אל מלא רחמים',
    pronunciation: 'ayl mah-LAY rah-khah-MEEM',
    definition: 'A prayer meaning "God, full of compassion" recited at funerals, unveilings, yahrzeit, and Yizkor services. It asks God to shelter the soul of the deceased under the wings of the Divine Presence.',
    related: ['Yizkor', 'Hesped'],
    category: 'prayers',
  },
  {
    term: 'Tziduk HaDin',
    hebrew: 'צידוק הדין',
    pronunciation: 'tzee-DOOK hah-DEEN',
    definition: 'Meaning "justification of the judgment," this prayer acknowledges God\'s righteousness even in times of loss. It is recited at the funeral and cemetery.',
    related: ['El Malei Rachamim', 'Hesped'],
    category: 'prayers',
  },
  {
    term: 'Baruch Dayan HaEmet',
    hebrew: 'ברוך דיין האמת',
    pronunciation: 'bah-ROOKH dah-YAHN hah-eh-MET',
    definition: 'The blessing meaning "Blessed is the True Judge," recited upon hearing of a death. It acknowledges God\'s sovereignty even in times of sorrow.',
    usage: 'Upon receiving news of a death, one says "Baruch Dayan HaEmet."',
    category: 'prayers',
  },
  {
    term: 'Hamakom',
    hebrew: 'המקום',
    pronunciation: 'hah-mah-KOHM',
    definition: 'One of the names for God, literally meaning "The Place." Used in the traditional condolence phrase: "HaMakom yenachem etchem b\'toch she\'ar avlei Tzion v\'Yerushalayim" (May God comfort you among the mourners of Zion and Jerusalem).',
    usage: 'When leaving a shiva house, visitors say the Hamakom blessing.',
    related: ['Nichum Aveilim', 'Shiva'],
    category: 'prayers',
  },
  // Customs & Rituals
  {
    term: 'Kriah',
    hebrew: 'קריעה',
    pronunciation: 'kree-AH',
    definition: 'The ritual tearing of a garment as a sign of mourning. For parents, the tear is made on the left side (over the heart); for other relatives, on the right. Today, a black ribbon is often torn instead.',
    usage: 'The kriah is performed just before the funeral service.',
    related: ['Avel', 'Shiva'],
    category: 'customs',
  },
  {
    term: 'Tahara',
    hebrew: 'טהרה',
    pronunciation: 'tah-hah-RAH',
    definition: 'The ritual purification and washing of the body before burial, performed by the Chevra Kadisha. It is considered a great mitzvah as the deceased cannot repay the kindness.',
    related: ['Chevra Kadisha', 'Tachrichim'],
    category: 'customs',
  },
  {
    term: 'Tachrichim',
    hebrew: 'תכריכים',
    pronunciation: 'tahkh-ree-KHEEM',
    definition: 'Simple white burial shrouds in which the deceased is dressed. They symbolize equality in death—all are buried in the same simple garments, regardless of wealth or status.',
    related: ['Tahara', 'Aron'],
    category: 'customs',
  },
  {
    term: 'Seudat Havra\'ah',
    hebrew: 'סעודת הבראה',
    pronunciation: 'soo-DAHT hahv-rah-AH',
    definition: 'The meal of condolence served to mourners upon returning from the cemetery. Traditionally prepared by friends or neighbors, it includes round foods like eggs and lentils, symbolizing the cycle of life.',
    usage: 'The community prepared a seudat havra\'ah for the family.',
    related: ['Nichum Aveilim', 'Shiva'],
    category: 'customs',
  },
  {
    term: 'Shiva Call',
    hebrew: 'ביקור אבלים',
    pronunciation: 'SHIH-vah kohl',
    definition: 'A condolence visit to the mourners during the shiva period. Visitors comfort the bereaved, share memories, and may bring food. Traditional etiquette suggests waiting for the mourner to speak first.',
    usage: 'We made a shiva call to offer our condolences.',
    related: ['Shiva', 'Nichum Aveilim'],
    category: 'customs',
  },
  {
    term: 'Unveiling',
    hebrew: 'הקמת מצבה',
    pronunciation: 'un-VAY-ling',
    definition: 'The ceremony dedicating the headstone or monument, typically held within the first year after burial. A cloth covering the stone is removed, prayers are recited, and family members often speak.',
    related: ['Matzevah', 'El Malei Rachamim'],
    category: 'customs',
  },
  {
    term: 'Shmirah',
    hebrew: 'שמירה',
    pronunciation: 'shmee-RAH',
    definition: 'The practice of guarding or watching over the body from death until burial. Traditionally, the body is never left alone, and psalms are read as a sign of respect.',
    related: ['Chevra Kadisha', 'Tahara'],
    category: 'customs',
  },
  {
    term: 'Kevurah',
    hebrew: 'קבורה',
    pronunciation: 'keh-voo-RAH',
    definition: 'Burial. Jewish law requires burial as soon as possible after death, typically within 24-48 hours. Cremation is traditionally prohibited in Orthodox Judaism.',
    related: ['Aron', 'Beit Olam'],
    category: 'customs',
  },
  {
    term: 'Hesped',
    hebrew: 'הספד',
    pronunciation: 'HEHS-ped',
    definition: 'A eulogy or funeral oration honoring the deceased. Traditionally, it includes praise of the person\'s character and deeds, and aims to bring those present to tears.',
    related: ['Levaya', 'El Malei Rachamim'],
    category: 'customs',
  },
  {
    term: 'Nichum Aveilim',
    hebrew: 'ניחום אבלים',
    pronunciation: 'nee-KHOOM ah-vay-LEEM',
    definition: 'The mitzvah of comforting mourners. This includes visiting during shiva, attending the funeral, and providing emotional and practical support during the mourning period.',
    related: ['Shiva Call', 'Hamakom'],
    category: 'customs',
  },
  // People & Roles
  {
    term: 'Avel',
    hebrew: 'אבל',
    pronunciation: 'ah-VAYL',
    definition: 'A mourner. In Jewish law, one becomes an avel for seven close relatives: mother, father, son, daughter, brother, sister, and spouse. The plural is "aveilim."',
    related: ['Aveilut', 'Shiva'],
    category: 'people',
  },
  {
    term: 'Onen',
    hebrew: 'אונן',
    pronunciation: 'oh-NAYN',
    definition: 'A mourner during the period between death and burial (aninut). The onen is exempt from positive commandments as they focus entirely on arranging the burial.',
    related: ['Aninut', 'Avel'],
    category: 'people',
  },
  {
    term: 'Chevra Kadisha',
    hebrew: 'חברה קדישא',
    pronunciation: 'KHEV-rah kah-DEE-shah',
    definition: 'The "holy society" - volunteers who prepare the body for burial through tahara (ritual washing) and dressing in tachrichim (shrouds). This is considered one of the highest forms of chesed (kindness).',
    related: ['Tahara', 'Tachrichim'],
    category: 'people',
  },
  {
    term: 'Niftar/Nifteret',
    hebrew: 'נפטר/נפטרת',
    pronunciation: 'nif-TAHR / nif-TEH-ret',
    definition: 'The deceased (male/female). Literally means "one who has departed." A respectful term used instead of "dead person."',
    usage: 'The niftar was known for his generosity.',
    category: 'people',
  },
  {
    term: 'Meis Mitzvah',
    hebrew: 'מת מצוה',
    pronunciation: 'mayss MITZ-vah',
    definition: 'A deceased person with no one to care for their burial. Caring for such a person takes precedence over almost all other commandments, even for a High Priest or Nazirite.',
    category: 'people',
  },
  // Places
  {
    term: 'Beit Olam',
    hebrew: 'בית עולם',
    pronunciation: 'bayt oh-LAHM',
    definition: 'Literally "eternal home" - a euphemism for a cemetery. Other terms include "beit chaim" (house of life) and "beit kevarot" (house of graves).',
    related: ['Kevurah', 'Matzevah'],
    category: 'places',
  },
  {
    term: 'Ohel',
    hebrew: 'אהל',
    pronunciation: 'OH-hel',
    definition: 'A structure built over a grave, particularly of a great rabbi or tzaddik. People visit to pray and leave notes requesting blessings.',
    category: 'places',
  },
  {
    term: 'Beit Tahara',
    hebrew: 'בית טהרה',
    pronunciation: 'bayt tah-hah-RAH',
    definition: 'The room or building where the tahara (ritual purification) of the body is performed before burial.',
    related: ['Tahara', 'Chevra Kadisha'],
    category: 'places',
  },
  // Memorial
  {
    term: 'Ner Neshama',
    hebrew: 'נר נשמה',
    pronunciation: 'nehr neh-shah-MAH',
    definition: 'A memorial candle, literally "soul candle." It is lit on the yahrzeit and on Yom Kippur, Shemini Atzeret, Passover, and Shavuot. The candle burns for approximately 24 hours.',
    usage: 'We lit a ner neshama on her yahrzeit.',
    related: ['Yahrzeit', 'Yizkor'],
    category: 'memorial',
  },
  {
    term: 'Matzevah',
    hebrew: 'מצבה',
    pronunciation: 'mah-TZAY-vah',
    definition: 'A headstone or monument placed on a grave. It typically includes the deceased\'s Hebrew and English names, birth and death dates, and an epitaph.',
    related: ['Unveiling', 'Beit Olam'],
    category: 'memorial',
  },
  {
    term: 'Aliyah L\'Kever',
    hebrew: 'עליה לקבר',
    pronunciation: 'ah-lee-YAH leh-KEH-ver',
    definition: 'Visiting a grave. It is customary to visit the graves of loved ones before the High Holidays, on a yahrzeit, and on the anniversary of a parent\'s death.',
    usage: 'We made an aliyah l\'kever before Rosh Hashanah.',
    related: ['Beit Olam', 'Yahrzeit'],
    category: 'memorial',
  },
  {
    term: 'Matzeivat Zikaron',
    hebrew: 'מצבת זכרון',
    pronunciation: 'mah-TZAY-vet zee-kah-ROHN',
    definition: 'A memorial plaque, often placed in a synagogue, listing names of deceased members with their yahrzeit dates. Electric lights next to names are illuminated on the yahrzeit.',
    related: ['Yahrzeit', 'Ner Neshama'],
    category: 'memorial',
  },
  {
    term: 'Zichrono/Zichronah Livracha',
    hebrew: 'זכרונו/זכרונה לברכה',
    pronunciation: 'zikh-roh-NOH / zikh-roh-NAH lee-vrah-KHAH',
    definition: 'May his/her memory be a blessing (abbreviated z"l). A phrase added after mentioning a deceased person\'s name, expressing the wish that their memory continue to inspire.',
    usage: 'My grandmother, Sarah, zichronah livracha, loved to bake challah.',
    category: 'memorial',
  },
  {
    term: 'Alav/Aleha HaShalom',
    hebrew: 'עליו/עליה השלום',
    pronunciation: 'ah-LAHV / ah-LAY-hah hah-shah-LOHM',
    definition: 'Peace be upon him/her (abbreviated a"h). A phrase added when mentioning a deceased person, wishing them peace in the afterlife.',
    usage: 'My father, alav hashalom, was a teacher for forty years.',
    related: ['Zichrono Livracha'],
    category: 'memorial',
  },
  // Calendar & Dates
  {
    term: 'Adar',
    hebrew: 'אדר',
    pronunciation: 'ah-DAHR',
    definition: 'The twelfth month of the Jewish calendar (February-March). In leap years, there are two Adars (Adar I and Adar II). Yahrzeits for deaths in a regular Adar are observed in Adar II during leap years.',
    related: ['Yahrzeit'],
    category: 'calendar',
  },
  {
    term: 'Cheshvan',
    hebrew: 'חשון',
    pronunciation: 'KHEHSH-vahn',
    definition: 'The eighth month of the Jewish calendar (October-November). Also called Marcheshvan. The month has no holidays and is sometimes called "bitter" Cheshvan.',
    category: 'calendar',
  },
  {
    term: 'Tishrei',
    hebrew: 'תשרי',
    pronunciation: 'TISH-ray',
    definition: 'The seventh month of the Jewish calendar (September-October) but the first month of the Jewish civil year. Contains the High Holidays (Rosh Hashanah and Yom Kippur) and Sukkot.',
    category: 'calendar',
  },
  {
    term: 'Elul',
    hebrew: 'אלול',
    pronunciation: 'eh-LOOL',
    definition: 'The sixth month of the Jewish calendar (August-September). A time of introspection before the High Holidays. Many visit graves during this month.',
    related: ['Aliyah L\'Kever'],
    category: 'calendar',
  },
  // Additional Important Terms
  {
    term: 'Aron',
    hebrew: 'ארון',
    pronunciation: 'ah-ROHN',
    definition: 'A coffin. Jewish tradition requires a simple wooden casket without metal or elaborate decorations, emphasizing equality in death.',
    related: ['Kevurah', 'Tachrichim'],
    category: 'customs',
  },
  {
    term: 'Levaya',
    hebrew: 'לוויה',
    pronunciation: 'leh-vah-YAH',
    definition: 'A funeral or funeral procession. Literally means "accompanying," referring to the mitzvah of accompanying the deceased to their final resting place.',
    related: ['Hesped', 'Kevurah'],
    category: 'customs',
  },
  {
    term: 'Halvayas HaMeis',
    hebrew: 'הלוית המת',
    pronunciation: 'hahl-vah-YAHT hah-MAYSS',
    definition: 'Escorting the dead - the mitzvah of accompanying the deceased to burial. Traditionally, all who see a funeral procession should join for at least four cubits.',
    related: ['Levaya'],
    category: 'customs',
  },
  {
    term: 'Tzedakah',
    hebrew: 'צדקה',
    pronunciation: 'tzeh-dah-KAH',
    definition: 'Charitable giving. It is customary to give tzedakah in memory of the deceased, often to causes they supported or to Jewish organizations.',
    usage: 'In lieu of flowers, donations can be made to tzedakah.',
    category: 'customs',
  },
  {
    term: 'Olam HaBa',
    hebrew: 'עולם הבא',
    pronunciation: 'oh-LAHM hah-BAH',
    definition: 'The World to Come - the afterlife in Jewish belief. While beliefs vary, the concept provides comfort that the soul continues after physical death.',
    related: ['Neshama'],
    category: 'memorial',
  },
  {
    term: 'Neshama',
    hebrew: 'נשמה',
    pronunciation: 'neh-shah-MAH',
    definition: 'The soul. In Jewish thought, the neshama is the divine spark within each person that returns to God after death.',
    related: ['Olam HaBa', 'Ner Neshama'],
    category: 'memorial',
  },
  {
    term: 'Minyan',
    hebrew: 'מניין',
    pronunciation: 'min-YAHN',
    definition: 'A quorum of ten Jewish adults required for certain prayers, including Kaddish. During shiva, services are held at the mourner\'s home with a minyan.',
    usage: 'We need a minyan to say Kaddish.',
    related: ['Kaddish', 'Shiva'],
    category: 'prayers',
  },
  {
    term: 'Kadosh',
    hebrew: 'קדוש',
    pronunciation: 'kah-DOHSH',
    definition: 'Holy or sacred. Someone who died sanctifying God\'s name (such as in the Holocaust) is referred to as a kadosh or martyr.',
    usage: 'The Six Million kedoshim who perished in the Holocaust.',
    category: 'memorial',
  },
];

export default function MourningGlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesSearch =
        searchQuery === '' ||
        term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.hebrew.includes(searchQuery) ||
        term.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || term.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  const toggleExpanded = (term: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(term)) {
      newExpanded.delete(term);
    } else {
      newExpanded.add(term);
    }
    setExpandedTerms(newExpanded);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    return category?.icon || BookOpen;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Header */}
      <div className="bg-stone-900 text-white py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-stone-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-stone-800 rounded-xl">
              <BookOpen className="h-8 w-8 text-amber-400" />
            </div>
            <h1 className="text-4xl font-bold">Hebrew-English Mourning Glossary</h1>
          </div>

          <p className="text-xl text-stone-300 max-w-3xl">
            A comprehensive guide to Hebrew terms and concepts related to Jewish mourning traditions,
            customs, and practices.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b z-10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
              <Input
                type="text"
                placeholder="Search terms in English or Hebrew..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;
                return (
                  <Button
                    key={category.id}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="gap-1.5"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="mt-3 text-sm text-stone-500">
            Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} terms
          </div>
        </div>
      </div>

      {/* Glossary Terms */}
      <div className="container mx-auto px-4 py-8">
        {filteredTerms.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-stone-400 mb-2">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium mb-1">No terms found</h3>
            <p className="text-stone-500">Try adjusting your search or filter criteria.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredTerms.map((term) => {
              const isExpanded = expandedTerms.has(term.term);
              const CategoryIcon = getCategoryIcon(term.category);
              const category = CATEGORIES.find((c) => c.id === term.category);

              return (
                <Card key={term.term} className="overflow-hidden">
                  <CardHeader
                    className="cursor-pointer hover:bg-stone-50 transition-colors"
                    onClick={() => toggleExpanded(term.term)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{term.term}</CardTitle>
                          <span className="text-2xl font-hebrew">{term.hebrew}</span>
                          <Badge variant="secondary" className="gap-1">
                            <CategoryIcon className="h-3 w-3" />
                            {category?.label}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-stone-500">
                          <Volume2 className="h-4 w-4" />
                          <span className="italic">{term.pronunciation}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  {isExpanded && (
                    <CardContent className="border-t bg-stone-50/50 pt-4">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-stone-700 mb-1">Definition</h4>
                          <p className="text-stone-600 leading-relaxed">{term.definition}</p>
                        </div>

                        {term.usage && (
                          <div>
                            <h4 className="font-medium text-stone-700 mb-1">Example Usage</h4>
                            <p className="text-stone-600 italic">&ldquo;{term.usage}&rdquo;</p>
                          </div>
                        )}

                        {term.related && term.related.length > 0 && (
                          <div>
                            <h4 className="font-medium text-stone-700 mb-2">Related Terms</h4>
                            <div className="flex flex-wrap gap-2">
                              {term.related.map((relatedTerm) => (
                                <Badge
                                  key={relatedTerm}
                                  variant="outline"
                                  className="cursor-pointer hover:bg-stone-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSearchQuery(relatedTerm);
                                    setSelectedCategory('all');
                                  }}
                                >
                                  {relatedTerm}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="container mx-auto px-4 pb-12">
        <Card className="bg-stone-900 text-white">
          <CardHeader>
            <CardTitle>Quick Navigation by Letter</CardTitle>
            <CardDescription className="text-stone-400">
              Jump to terms starting with a specific letter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => {
                const hasTerms = GLOSSARY_TERMS.some((t) =>
                  t.term.toUpperCase().startsWith(letter)
                );
                return (
                  <Button
                    key={letter}
                    variant="ghost"
                    size="sm"
                    disabled={!hasTerms}
                    className={`w-10 h-10 ${
                      hasTerms
                        ? 'text-white hover:bg-stone-800'
                        : 'text-stone-600 cursor-not-allowed'
                    }`}
                    onClick={() => {
                      if (hasTerms) {
                        setSearchQuery(letter);
                        setSelectedCategory('all');
                      }
                    }}
                  >
                    {letter}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Resources */}
      <div className="bg-stone-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/tools/yahrzeit-calculator">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8 text-amber-600 mb-3" />
                  <h3 className="font-semibold mb-2">Yahrzeit Calculator</h3>
                  <p className="text-sm text-stone-600">
                    Calculate Hebrew dates for yahrzeits and memorial observances.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/shiva-planner">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <Home className="h-8 w-8 text-amber-600 mb-3" />
                  <h3 className="font-semibold mb-2">Shiva Planner</h3>
                  <p className="text-sm text-stone-600">
                    Plan and organize shiva observance with our comprehensive guide.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/vendors">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <Users className="h-8 w-8 text-amber-600 mb-3" />
                  <h3 className="font-semibold mb-2">Find a Chevra Kadisha</h3>
                  <p className="text-sm text-stone-600">
                    Locate burial societies and funeral service providers.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
