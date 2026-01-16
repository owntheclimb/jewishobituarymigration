'use client';

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Heart, Share2, Calendar, MapPin, Quote, MessageCircle, ArrowRight } from "lucide-react";

const featuredStories = [
  {
    id: 'story-1',
    name: 'Rabbi David Goldstein',
    dates: '1945-2024',
    location: 'Brooklyn, New York',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=800&h=600&fit=crop',
    category: 'Community Leader',
    excerpt: 'For over 40 years, Rabbi Goldstein served his community with wisdom, compassion, and an unwavering commitment to Torah study. His door was always open, his counsel always sought, and his smile could light up the darkest of days.',
    quote: 'He taught us that every soul is precious, every question deserves thoughtful consideration, and every act of kindness creates ripples that extend far beyond our sight.',
    fullBiography: `Rabbi David Goldstein was born in 1945 in the heart of Brooklyn, New York, into a family deeply rooted in Jewish tradition. From an early age, he demonstrated an extraordinary love for learning and a gentle spirit that would define his life's work.

After completing his studies at Yeshiva University and receiving semicha (rabbinical ordination) from the Rabbi Isaac Elchanan Theological Seminary, Rabbi Goldstein dedicated his life to serving the Jewish community. He began his rabbinical career at Temple Beth Shalom in Brooklyn, where he would serve for over four decades.

Rabbi Goldstein was known for his profound scholarship, particularly in Talmudic studies, but what truly set him apart was his accessibility and warmth. His door was always open-literally and figuratively. Community members would often find him in his study late at night, poring over ancient texts, yet he would always put down his books to offer counsel, comfort, or simply a listening ear.

He established numerous educational programs, from children's Hebrew school to adult education classes, where he made complex Jewish concepts accessible and relevant to modern life. His weekly Torah study groups became legendary, attracting students from across New York and beyond.

Beyond his synagogue, Rabbi Goldstein was deeply involved in interfaith dialogue, believing that understanding between different religious communities was essential for a peaceful society. He served on several interfaith councils and was instrumental in establishing programs that brought together people of different faiths.

His legacy lives on through the hundreds of students he taught, the countless families he counseled through joys and sorrows, and the enduring example of a life lived in service to others. Rabbi Goldstein is survived by his wife of 55 years, Sarah, four children, and twelve grandchildren.`,
    timeline: [
      { year: '1945', event: 'Born in Brooklyn, New York' },
      { year: '1967', event: 'Graduated from Yeshiva University' },
      { year: '1970', event: 'Received rabbinical ordination' },
      { year: '1971', event: 'Became rabbi at Temple Beth Shalom' },
      { year: '1985', event: 'Established community education programs' },
      { year: '1995', event: 'Founded interfaith dialogue initiative' },
      { year: '2015', event: 'Celebrated 40 years of rabbinical service' },
      { year: '2024', event: 'Passed away peacefully surrounded by family' }
    ],
    memories: []
  },
  {
    id: 'story-2',
    name: 'Miriam Sarah Levy',
    dates: '1932-2024',
    location: 'Jerusalem, Israel',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop',
    category: 'Holocaust Survivor',
    excerpt: 'Miriam survived the unthinkable with grace and emerged as a beacon of hope for future generations. She dedicated her life to education, ensuring that the memories of those lost would never fade and that hatred would be met with understanding.',
    quote: 'From the ashes of despair, I chose to build a garden of remembrance. Each student I taught, each story I shared, was my way of saying: we remember, we persist, we triumph through love.',
    fullBiography: `Miriam Sarah Levy was born in 1932 in Warsaw, Poland, into a vibrant Jewish community that would soon face unimaginable horror. At age 7, her childhood ended abruptly when the Nazis invaded Poland. She spent three years in the Warsaw Ghetto before being transported to Auschwitz, where she lost her parents and two younger siblings.

Through a combination of luck, resilience, and the kindness of strangers, young Miriam survived. After liberation in 1945, she was placed in a children's home for orphaned Holocaust survivors. Despite her trauma, she showed remarkable strength and a determination to rebuild her life.

In 1948, Miriam immigrated to the newly established State of Israel, settling in Jerusalem. She completed her education, earned a teaching degree, and dedicated herself to ensuring that the Holocaust would never be forgotten. For over 40 years, she taught history and Hebrew literature, but her most profound impact came through her willingness to share her personal story.

Miriam spoke at schools, universities, and museums around the world, bearing witness to the Holocaust with dignity and grace. She participated in the establishment of Yad Vashem's educational programs and mentored younger generations of Holocaust educators. Her testimony was recorded by the USC Shoah Foundation, ensuring that her voice would continue to educate long after she was gone.

Despite the darkness she had experienced, Miriam chose hope. She married Yosef Levy, a fellow survivor, and they raised three children in Jerusalem. She found joy in her grandchildren and great-grandchildren, seeing in them the ultimate triumph over those who had tried to destroy the Jewish people.

Miriam's life was a testament to the power of resilience, the importance of memory, and the strength of the human spirit. She showed that from the deepest darkness, light can still emerge.`,
    timeline: [
      { year: '1932', event: 'Born in Warsaw, Poland' },
      { year: '1940', event: 'Warsaw Ghetto established' },
      { year: '1943', event: 'Transported to Auschwitz' },
      { year: '1945', event: 'Liberated from concentration camp' },
      { year: '1948', event: 'Immigrated to Israel' },
      { year: '1955', event: 'Became a teacher in Jerusalem' },
      { year: '1985', event: 'Began speaking publicly about Holocaust experiences' },
      { year: '2010', event: 'Testimony recorded for USC Shoah Foundation' },
      { year: '2024', event: 'Passed away in Jerusalem, surrounded by three generations' }
    ],
    memories: []
  },
  {
    id: 'story-3',
    name: 'Dr. Benjamin Rosenthal',
    dates: '1958-2024',
    location: 'Chicago, Illinois',
    imageUrl: 'https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=800&h=600&fit=crop',
    category: 'Physician & Philanthropist',
    excerpt: 'A renowned pediatric cardiologist who treated thousands of children, Dr. Rosenthal believed that healing extended beyond medicine. He established free clinics in underserved communities and mentored countless young physicians.',
    quote: 'Medicine is not just about fixing hearts-it\'s about understanding them, caring for them, and teaching others to do the same with compassion and humility.',
    fullBiography: `Dr. Benjamin Rosenthal was born in 1958 in Chicago to a family of educators and healthcare professionals. From a young age, he showed both intellectual brilliance and deep compassion for others-qualities that would define his medical career.

After graduating summa cum laude from Northwestern University, Dr. Rosenthal attended Harvard Medical School, where he developed a passion for pediatric cardiology. He completed his residency at Boston Children's Hospital, where he trained under some of the world's leading pediatric heart specialists.

In 1990, Dr. Rosenthal returned to Chicago and joined the faculty at University of Chicago Medical Center. Over his 34-year career, he became one of the nation's most respected pediatric cardiologists, known for his exceptional surgical skill and his gentle bedside manner. He performed thousands of surgeries, giving children with congenital heart defects the chance at healthy lives.

But Dr. Rosenthal's impact extended far beyond the operating room. Recognizing that many families lacked access to quality pediatric care, he established the Rosenthal Children's Heart Foundation in 2000. The foundation funded free clinics in underserved Chicago neighborhoods, providing screening, treatment, and follow-up care to children whose families couldn't afford it.

He was also a dedicated educator, mentoring over 100 medical residents and fellows. His students remember him as demanding but supportive, always pushing them to excellence while reminding them that medicine is as much about compassion as it is about science.

Dr. Rosenthal was actively involved in his synagogue, serving on the board and teaching in the religious school. He and his wife, Rachel, raised three children and instilled in them the values of service and compassion.

He passed away in 2024 after a brief illness, leaving behind a legacy measured not just in lives saved, but in the countless physicians he inspired and the model of compassionate care he embodied.`,
    timeline: [
      { year: '1958', event: 'Born in Chicago, Illinois' },
      { year: '1980', event: 'Graduated summa cum laude from Northwestern University' },
      { year: '1984', event: 'Graduated from Harvard Medical School' },
      { year: '1990', event: 'Joined faculty at University of Chicago Medical Center' },
      { year: '2000', event: 'Founded Rosenthal Children\'s Heart Foundation' },
      { year: '2010', event: 'Received American Heart Association Distinguished Service Award' },
      { year: '2020', event: 'Celebrated 30 years at University of Chicago' },
      { year: '2024', event: 'Passed away, leaving legacy of compassionate care' }
    ],
    memories: []
  }
];

const MemorialStoryDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [memory, setMemory] = useState("");
  const [hasSharedMemory, setHasSharedMemory] = useState(false);

  const story = featuredStories.find(s => s.id === id);

  if (!story) {
    router.push('/404');
    return null;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${story.name} - Jewish Obits`,
        text: story.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleShareMemory = () => {
    if (memory.trim()) {
      setHasSharedMemory(true);
      toast.success("Thank you for sharing your memory", {
        description: "Your tribute has been recorded"
      });
      setMemory("");
    }
  };

  const relatedStories = featuredStories
    .filter(s => s.id !== story.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="border-b bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/featured-stories">Featured Stories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>{story.name}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={story.imageUrl}
            alt={story.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="relative h-full flex items-end">
          <div className="max-w-4xl mx-auto px-4 pb-12 w-full">
            <Badge className="mb-4">{story.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-lg">
              {story.name}
            </h1>
            <div className="flex items-center gap-4 text-white/90 drop-shadow">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{story.dates}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{story.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="border-b py-6 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share Story
          </Button>
          <Button variant="outline">
            <Heart className="mr-2 h-4 w-4" />
            Light a Candle
          </Button>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-elegant mb-12">
            <div className="relative pl-6 border-l-2 border-primary/30 italic mb-8">
              <Quote className="absolute -left-3 -top-1 h-6 w-6 text-primary bg-background" />
              <p className="text-xl text-muted-foreground leading-relaxed">
                "{story.quote}"
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              {story.fullBiography.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-8 shadow-elegant mb-12">
            <h2 className="text-3xl font-bold mb-6">Life Timeline</h2>
            <div className="space-y-6">
              {story.timeline.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0 w-20 font-bold text-primary">
                    {item.year}
                  </div>
                  <div className="flex-1 pb-6 border-l-2 border-muted pl-6 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <p className="text-foreground">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Share a Memory */}
          <Card className="p-8 shadow-elegant">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold">Share a Memory</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              If you knew {story.name.split(' ')[0]}, please share a memory or tribute below.
            </p>
            <Textarea
              placeholder="Write your memory here..."
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              className="min-h-32 mb-4"
              disabled={hasSharedMemory}
            />
            <Button
              onClick={handleShareMemory}
              disabled={!memory.trim() || hasSharedMemory}
            >
              {hasSharedMemory ? "Thank You" : "Share Memory"}
            </Button>
          </Card>
        </div>
      </section>

      {/* Related Stories */}
      {relatedStories.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">More Featured Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedStories.map((related) => (
                <Card key={related.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 group">
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={related.imageUrl}
                      alt={related.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="outline" className="mb-3 text-xs">
                      {related.category}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">{related.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{related.dates}</p>
                    <p className="text-sm text-foreground mb-4 line-clamp-3">
                      {related.excerpt}
                    </p>
                    <Button size="sm" variant="ghost" className="p-0 h-auto" asChild>
                      <Link href={`/memorial/${related.id}`}>
                        Read Story <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 px-4 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Honor Your Loved One</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create a beautiful memorial to celebrate a life well lived.
          </p>
          <Button size="lg" asChild>
            <Link href="/create-obituary">
              <Heart className="mr-2 h-5 w-5" />
              Create Memorial
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MemorialStoryDetail;
