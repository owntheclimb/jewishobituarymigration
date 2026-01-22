'use client';

import { useState, useMemo } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Calendar,
  Calculator,
  ChevronRight,
  Download,
  Share2,
  Sun,
  Moon,
  Info,
  Clock,
  Flame,
  BookOpen,
} from 'lucide-react';
import { HDate, greg, Locale } from '@hebcal/core';

interface YahrzeitResult {
  year: number;
  hebrewDate: string;
  hebrewDateHebrew: string;
  gregorianDate: Date;
  gregorianDateFormatted: string;
  daysUntil: number;
  isPast: boolean;
}

export default function YahrzeitCalculator() {
  const [deathDate, setDeathDate] = useState('');
  const [sunsetOption, setSunsetOption] = useState<'before' | 'after' | 'unsure'>('unsure');
  const [deceasedName, setDeceasedName] = useState('');
  const [yearsToShow, setYearsToShow] = useState(10);
  const [results, setResults] = useState<YahrzeitResult[]>([]);
  const [originalHebrewDate, setOriginalHebrewDate] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const calculateYahrzeit = () => {
    if (!deathDate) return;

    const deathDateObj = new Date(deathDate + 'T12:00:00');

    // Adjust for sunset if death was after sunset (Jewish day starts at sunset)
    let adjustedDate = deathDateObj;
    if (sunsetOption === 'after') {
      adjustedDate = new Date(deathDateObj);
      adjustedDate.setDate(adjustedDate.getDate() + 1);
    }

    // Convert to Hebrew date
    const hd = new HDate(adjustedDate);
    const hebrewMonth = hd.getMonthName();
    const hebrewDay = hd.getDate();
    const hebrewYear = hd.getFullYear();

    // Store original Hebrew date
    setOriginalHebrewDate(`${hebrewDay} ${hebrewMonth} ${hebrewYear}`);

    // Calculate yahrzeits for the next N years
    const yahrzeits: YahrzeitResult[] = [];
    const today = new Date();
    const currentHebrewYear = new HDate(today).getFullYear();

    for (let i = 0; i <= yearsToShow; i++) {
      const yahrzeitYear = hebrewYear + i + 1; // Start from first yahrzeit

      try {
        // Create the yahrzeit Hebrew date
        const yahrzeitHd = new HDate(hebrewDay, hebrewMonth, yahrzeitYear);
        const gregDate = yahrzeitHd.greg();

        const daysUntil = Math.ceil((gregDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        const isPast = daysUntil < 0;

        yahrzeits.push({
          year: yahrzeitYear - hebrewYear,
          hebrewDate: `${hebrewDay} ${hebrewMonth} ${yahrzeitYear}`,
          hebrewDateHebrew: yahrzeitHd.renderGematriya(),
          gregorianDate: gregDate,
          gregorianDateFormatted: gregDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          daysUntil,
          isPast,
        });
      } catch (e) {
        // Skip if month doesn't exist in that year (e.g., Adar II in non-leap year)
        continue;
      }
    }

    setResults(yahrzeits);
    setShowResults(true);
  };

  const getNextYahrzeit = () => {
    return results.find((r) => !r.isPast && r.daysUntil >= 0);
  };

  const downloadICS = (yahrzeit: YahrzeitResult) => {
    const name = deceasedName || 'Loved One';
    const startDate = yahrzeit.gregorianDate;
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const formatDate = (d: Date) => {
      return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Jewish Obituary//Yahrzeit Calculator//EN
BEGIN:VEVENT
DTSTART;VALUE=DATE:${startDate.toISOString().split('T')[0].replace(/-/g, '')}
DTEND;VALUE=DATE:${endDate.toISOString().split('T')[0].replace(/-/g, '')}
SUMMARY:Yahrzeit - ${name}
DESCRIPTION:Light a yahrzeit candle at sunset the evening before in memory of ${name}.\\n\\nHebrew Date: ${yahrzeit.hebrewDate}\\n\\nTraditional observances:\\n- Light yahrzeit candle at sunset\\n- Recite Kaddish\\n- Visit the grave\\n- Give tzedakah (charity)
LOCATION:Home
BEGIN:VALARM
ACTION:DISPLAY
TRIGGER:-P1D
DESCRIPTION:Tomorrow is the yahrzeit of ${name}. Light candle at sunset.
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yahrzeit-${name.replace(/\s+/g, '-').toLowerCase()}-${startDate.getFullYear()}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareResults = async () => {
    const name = deceasedName || 'my loved one';
    const next = getNextYahrzeit();
    if (!next) return;

    const text = `The next yahrzeit for ${name} is ${next.gregorianDateFormatted} (${next.hebrewDate}).`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Yahrzeit Date',
          text,
          url: window.location.href,
        });
      } catch (e) {
        // User cancelled or share failed
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Link href="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/resources" className="hover:text-primary">Resources</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground">Yahrzeit Calculator</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                <Calculator className="h-4 w-4" />
                <span className="text-sm font-medium">Interactive Tool</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Yahrzeit Calculator
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Calculate the Hebrew date anniversary of your loved one's passing and find upcoming yahrzeit dates for years to come.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Input Form */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Enter Details
                      </CardTitle>
                      <CardDescription>
                        Provide the date of passing to calculate yahrzeits
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name of Deceased (Optional)</Label>
                        <Input
                          id="name"
                          placeholder="e.g., Sarah bat Avraham"
                          value={deceasedName}
                          onChange={(e) => setDeceasedName(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deathDate">Date of Passing *</Label>
                        <Input
                          id="deathDate"
                          type="date"
                          value={deathDate}
                          onChange={(e) => setDeathDate(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Did the passing occur after sunset?</Label>
                        <Select value={sunsetOption} onValueChange={(v) => setSunsetOption(v as typeof sunsetOption)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="before">
                              <span className="flex items-center gap-2">
                                <Sun className="h-4 w-4" /> Before Sunset
                              </span>
                            </SelectItem>
                            <SelectItem value="after">
                              <span className="flex items-center gap-2">
                                <Moon className="h-4 w-4" /> After Sunset
                              </span>
                            </SelectItem>
                            <SelectItem value="unsure">
                              <span className="flex items-center gap-2">
                                <Info className="h-4 w-4" /> Not Sure
                              </span>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          In Jewish tradition, the day begins at sunset. If the passing occurred after sunset, the Hebrew date is the following day.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="years">Years to Calculate</Label>
                        <Select value={yearsToShow.toString()} onValueChange={(v) => setYearsToShow(parseInt(v))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 years</SelectItem>
                            <SelectItem value="10">10 years</SelectItem>
                            <SelectItem value="20">20 years</SelectItem>
                            <SelectItem value="50">50 years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={calculateYahrzeit} className="w-full" disabled={!deathDate}>
                        <Calculator className="h-4 w-4 mr-2" />
                        Calculate Yahrzeits
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Info Card */}
                  <Card className="mt-6 bg-primary/5 border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium mb-1">About Yahrzeit</p>
                          <p className="text-muted-foreground">
                            Yahrzeit is the annual anniversary of a loved one's death on the Hebrew calendar. It's customary to light a 24-hour candle, recite Kaddish, and give charity.
                          </p>
                          <Link href="/articles/yahrzeit" className="text-primary hover:underline inline-flex items-center gap-1 mt-2">
                            <BookOpen className="h-3 w-3" />
                            Learn more about Yahrzeit
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results */}
                <div className="lg:col-span-3">
                  {showResults && results.length > 0 ? (
                    <div className="space-y-6">
                      {/* Hebrew Date */}
                      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-200/50">
                        <CardContent className="p-6">
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground mb-2">Original Hebrew Date of Passing</p>
                            <p className="text-2xl font-bold text-primary mb-1">{originalHebrewDate}</p>
                            {deceasedName && (
                              <p className="text-muted-foreground">for {deceasedName}</p>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Next Yahrzeit Highlight */}
                      {getNextYahrzeit() && (
                        <Card className="border-primary">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Flame className="h-5 w-5 text-orange-500" />
                                Next Yahrzeit
                              </CardTitle>
                              <Badge variant="secondary">
                                <Clock className="h-3 w-3 mr-1" />
                                {getNextYahrzeit()!.daysUntil} days away
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                              <div>
                                <p className="text-2xl font-bold">{getNextYahrzeit()!.gregorianDateFormatted}</p>
                                <p className="text-muted-foreground">{getNextYahrzeit()!.hebrewDate}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => downloadICS(getNextYahrzeit()!)}>
                                  <Download className="h-4 w-4 mr-1" />
                                  Add to Calendar
                                </Button>
                                <Button variant="outline" size="sm" onClick={shareResults}>
                                  <Share2 className="h-4 w-4 mr-1" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* All Yahrzeits */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Yahrzeits</CardTitle>
                          <CardDescription>
                            Light the yahrzeit candle at sunset the evening before
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-3 px-2 font-medium">Year</th>
                                  <th className="text-left py-3 px-2 font-medium">Gregorian Date</th>
                                  <th className="text-left py-3 px-2 font-medium">Hebrew Date</th>
                                  <th className="text-left py-3 px-2 font-medium"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {results.map((r, i) => (
                                  <tr
                                    key={i}
                                    className={`border-b hover:bg-muted/50 ${r.isPast ? 'opacity-50' : ''}`}
                                  >
                                    <td className="py-3 px-2">
                                      <Badge variant={r.isPast ? 'secondary' : 'outline'}>
                                        {r.year === 1 ? '1st' : r.year === 2 ? '2nd' : r.year === 3 ? '3rd' : `${r.year}th`}
                                      </Badge>
                                    </td>
                                    <td className="py-3 px-2">
                                      <div>
                                        <p className="font-medium">{r.gregorianDateFormatted}</p>
                                        {!r.isPast && r.daysUntil <= 30 && (
                                          <p className="text-xs text-primary">{r.daysUntil} days away</p>
                                        )}
                                      </div>
                                    </td>
                                    <td className="py-3 px-2 text-muted-foreground">
                                      {r.hebrewDate}
                                    </td>
                                    <td className="py-3 px-2">
                                      {!r.isPast && (
                                        <Button variant="ghost" size="sm" onClick={() => downloadICS(r)}>
                                          <Download className="h-4 w-4" />
                                        </Button>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card className="h-full min-h-[400px] flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Enter Details to Calculate</h3>
                        <p className="text-muted-foreground max-w-sm">
                          Enter the date of passing on the left to calculate the Hebrew date and upcoming yahrzeits.
                        </p>
                      </div>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Observance Guide */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Yahrzeit Observances</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Flame className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="font-medium mb-1">Light a Candle</h3>
                    <p className="text-sm text-muted-foreground">
                      Light a 24-hour yahrzeit candle at sunset the evening before
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-medium mb-1">Recite Kaddish</h3>
                    <p className="text-sm text-muted-foreground">
                      Attend services to recite the mourner's Kaddish prayer
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Calendar className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-medium mb-1">Visit the Grave</h3>
                    <p className="text-sm text-muted-foreground">
                      Visit the cemetery to honor and remember your loved one
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="font-medium mb-1">Give Tzedakah</h3>
                    <p className="text-sm text-muted-foreground">
                      Make a charitable donation in memory of the deceased
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
