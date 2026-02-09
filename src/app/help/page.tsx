'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import writingHelpHero from "@/assets/writing-help-hero.jpg";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Heart, BookOpen, PenTool, Users, Star, ArrowRight, CheckCircle, Clock, FileText,
  Home, ChevronRight, Lightbulb, AlertTriangle, Quote, Sparkles, MessageCircle,
  FileCheck, Calendar, Image, Flame, UserCircle, ArrowLeft, Download, Video,
  TrendingUp, Award, Shield, Search, Menu, ListChecks
} from 'lucide-react';

const WritingHelp = () => {
  // Complete example obituaries
  const exampleObituaries = [
    {
      title: "Traditional & Formal Style",
      name: "Sarah Rebecca Cohen",
      content: "Sarah Rebecca (Goldstein) Cohen, 87, of Highland Park, passed away peacefully on March 15, 2024, surrounded by her loving family. Born in Brooklyn on June 3, 1936, to the late David and Miriam Goldstein, Sarah was a devoted wife, mother, grandmother, and pillar of her community.\n\nSarah graduated from Brooklyn College in 1957 with a degree in Education and dedicated 35 years to teaching elementary school in the Chicago Public Schools system. Her passion for nurturing young minds touched countless lives, and many former students credit her with inspiring their love of learning.\n\nShe married her beloved husband, Rabbi Jacob Cohen, in 1958, and together they raised four children while actively serving their synagogue community. Sarah was known for her legendary challah, her commitment to social justice, and her warm hospitality that made everyone feel like family.\n\nSarah is survived by her husband of 65 years, Rabbi Jacob Cohen; her children, Dr. Michael Cohen (Linda) of Skokie, Rachel Bernstein (David) of Evanston, Deborah Katz (Jonathan) of Jerusalem, and Joshua Cohen (Amy) of Highland Park; 12 grandchildren; and 5 great-grandchildren. She was predeceased by her brother, Samuel Goldstein.\n\nFuneral services will be held at 10:00 AM on March 17, 2024, at Congregation Beth Israel. Shiva will be observed at the Cohen residence. Memorial contributions may be made to the Jewish United Fund of Metropolitan Chicago."
    },
    {
      title: "Warm & Personal Style",
      name: "Benjamin 'Benny' Rosenberg",
      content: "Our beloved Benny left us far too soon on January 10, 2024, at age 54, but not before filling our lives with laughter, music, and countless memories we'll treasure forever.\n\nBenny was born in Philadelphia and grew up with a guitar in his hands and a joke on his lips. Anyone who knew him will tell you - he could light up a room with his infectious smile and make friends with absolutely anyone. His favorite saying was 'Life's too short for bad coffee or boring conversations,' and he lived by those words every single day.\n\nHe spent 25 years running Rosenberg's Deli, where he knew every customer's name, their usual order, and probably their entire life story. The deli wasn't just a business to Benny - it was his stage, his therapy couch, and his way of taking care of people through food and friendship.\n\nBenny loved hiking, playing blues guitar (badly, he'd admit with a grin), rooting for the Phillies even in their worst seasons, and cooking his famous brisket that could bring world peace if given the chance. He was proudest of his three kids, who inherited his sense of humor, his love of music, and unfortunately, his inability to carry a tune.\n\nHe leaves behind his wife of 30 years, Susan; his children Emily, Jake, and Sophie; his granddaughter Lily who was the absolute light of his life; his sister Ruth; and a deli full of people who loved him like family.\n\nA celebration of life will be held at the deli on Sunday at 2 PM - bring your stories, your appetite, and your best Benny impression. In lieu of flowers, order the pastrami on rye and remember to tip generously."
    },
    {
      title: "Brief & Dignified Style",
      name: "Dr. Rachel Levin",
      content: "Dr. Rachel Levin, 72, renowned cardiologist and humanitarian, passed away on December 5, 2023, after a brief illness.\n\nBorn in Tel Aviv and educated at Hebrew University and Johns Hopkins Medical School, Dr. Levin dedicated her career to advancing cardiac care and training the next generation of physicians. She served as Chief of Cardiology at Northwestern Memorial Hospital for 20 years.\n\nDr. Levin's pioneering research in women's heart health saved countless lives and earned her numerous accolades, including the American Heart Association's Distinguished Scientist Award. Yet those who knew her best will remember her compassion, her mentorship, and her unwavering commitment to patients regardless of their ability to pay.\n\nShe is survived by her husband of 40 years, Dr. Michael Morrison; her brother David Levin of Haifa; and generations of grateful students and patients.\n\nA memorial service will be held on December 10 at 11 AM at Temple Sholom. Memorial gifts may be directed to the Dr. Rachel Levin Scholarship Fund for Medical Students."
    },
    {
      title: "Story-Based Style",
      name: "Morris 'Moe' Katz",
      content: "Every Friday afternoon, Moe Katz could be found at the same diner booth, reading the paper, drinking too much coffee, and solving the world's problems with whoever stopped by to chat. On February 22, 2024, that booth sat empty for the first time in 40 years. Moe was 89.\n\nHis story began in a small shtetl in Poland, though he never talked much about those early years. What he did talk about was coming to America at 16 with $20 in his pocket and a fierce determination to build a life. He worked in a garment factory by day and went to night school, eventually opening Katz Brothers Tailoring with his late brother Samuel.\n\nMoe believed that every suit told a story - first dates, job interviews, weddings. He took pride in making people feel confident and cared for. When big box stores came to town, he adapted, offering alterations and building relationships that lasted decades.\n\nHe met his wife Esther at a USO dance in 1957. She thought he was the worst dancer she'd ever seen but loved that he tried anyway. They were married 58 years before she passed in 2015. Moe never quite recovered from losing her, but he kept showing up - for his kids, his grandkids, his Friday coffee, and his community.\n\nMoe is survived by his children Alan and Barbara; five grandchildren who adored their 'Zayde'; his tailoring shop that his grandson will continue; and a community that won't be the same without him.\n\nServices at Mount Sinai Cemetery, Sunday 1 PM. Donations to the Holocaust Memorial Museum would honor his memory."
    },
    {
      title: "Celebratory & Joyful Style",
      name: "Miriam 'Mimi' Shapiro",
      content: "Miriam Shapiro didn't just live life - she danced through it, laughed at it, painted it in bold colors, and invited everyone to join the party. On April 3, 2024, at 79, she took her final bow, leaving us all wishing for one more dance.\n\nMimi was an artist, a teacher, a terrible cook (she'd be the first to tell you), a world traveler, and a force of nature wrapped in bright scarves and jangling bracelets. She believed that life was too precious for matching socks, boring conversations, or saying no to adventure.\n\nShe taught art to three generations of students at the JCC, turning her classroom into a place where creativity and confidence bloomed. Her own artwork - vibrant, bold, unapologetically joyful - hangs in homes and hearts across three continents.\n\nMimi traveled to 47 countries, often solo, collecting stories, friends, and absolutely no inhibitions about dancing in the streets. She marched for civil rights, protested injustice, and never stopped believing the world could be better. Her activism was as colorful as her paintings.\n\nShe leaves behind her daughter Lisa (who inherited the dancing, not the cooking), her son Daniel (who got both), six grandchildren who she taught to see the world in technicolor, her art studio full of unfinished masterpieces, and a community that will never be quite as colorful without her.\n\nJoin us for a celebration of life on April 8 at 3 PM at the JCC - wear something bright, bring your stories, and please, for Mimi's sake, dance. Memorial donations to the JCC Art Program will keep her legacy alive."
    }
  ];

  // Expanded comprehensive FAQ with categories
  const faqCategories = [
    {
      category: "Writing & Content",
      faqs: [
        {
          question: 'How long should an obituary be?',
          answer: 'Most obituaries range from 200-500 words, though there\'s no strict rule. Focus on quality over quantity - include the most meaningful details that capture your loved one\'s essence. A well-crafted 300-word obituary can be more impactful than a rambling 1,000-word one. Consider your audience\'s attention span and publishing costs if relevant.'
        },
        {
          question: 'Should I include the cause of death?',
          answer: 'This is entirely a personal and family decision. You can be specific ("after a courageous battle with cancer"), general ("after a brief illness"), or omit it entirely. There\'s no obligation to share private medical information. Follow your family\'s comfort level and, if known, your loved one\'s wishes about privacy. In cases of suicide, addiction, or mental illness, some families choose to be honest to reduce stigma and help others, while others prefer privacy.'
        },
        {
          question: 'Can I include humor in an obituary?',
          answer: 'Absolutely! If humor was part of their personality, including gentle humor, favorite jokes, or witty observations can beautifully honor who they were. Some of the most memorable obituaries celebrate a person\'s sense of humor. Just ensure the humor feels appropriate and would make your loved one smile. Avoid inside jokes that most readers won\'t understand.'
        },
        {
          question: 'How do I write about someone I didn\'t know well?',
          answer: 'Start by reaching out to people who did know them well - family members, close friends, colleagues, neighbors. Ask specific questions: What made them laugh? What were they passionate about? What stories do people tell about them? What would they want people to remember? Most people are happy to share memories. You can also review old letters, photos, or social media posts for insights into their personality and interests.'
        },
        {
          question: 'What if my loved one didn\'t have traditional achievements?',
          answer: 'Every life has value and meaning beyond career achievements. Focus on their relationships, kindness, daily joys, hobbies, and the ways they made others feel special. Being a wonderful parent, loyal friend, caring neighbor, or bringing joy through their cooking, gardening, or storytelling are all meaningful achievements. Highlight their character, values, and the positive impact they had on others\' lives, no matter how quiet or humble.'
        }
      ]
    },
    {
      category: "Family & Relationships",
      faqs: [
        {
          question: 'How do I handle complicated family relationships?',
          answer: 'This requires sensitivity and diplomacy. Options include: listing "survived by children" without naming everyone individually if there are estrangements; using phrases like "and many cherished family members"; focusing on positive relationships; or having honest family discussions about what feels right. Remember, obituaries become public records, so consider long-term implications. When in doubt, err on the side of inclusion unless there are serious reasons not to.'
        },
        {
          question: 'Should I mention divorces or multiple marriages?',
          answer: 'Yes, you can acknowledge multiple marriages respectfully. Common approaches include: "[Name] was married to [First Spouse] from [years], and later to [Second Spouse] from [years]" or "survived by her current husband [Name] and former husband [Name]." For amicable divorces, especially if children are involved, including ex-spouses can be appropriate and appreciated. Focus on stating facts neutrally without judgment.'
        },
        {
          question: 'What about complex blended families?',
          answer: 'Be inclusive! Blended families are beautiful and deserve full recognition. Use terms like "stepchildren" or simply list all children together. Example: "survived by his children Mark, Jennifer, and Amy, and stepchildren David and Lisa, all of whom he loved as his own." If everyone got along well, you might not need to distinguish at all. The key is ensuring no one feels left out or less valued.'
        }
      ]
    },
    {
      category: "Jewish Traditions & Customs",
      faqs: [
        {
          question: 'Should I include Hebrew names?',
          answer: 'Including Hebrew names is a beautiful tradition that honors Jewish heritage. The format is typically: "[English name] ([Hebrew name] ben/bat [Father\'s Hebrew name])." For example: "Sarah Cohen (Sarah bat Avraham)." This is especially meaningful if your loved one was active in the Jewish community or valued their Hebrew identity. If you\'re unsure of the correct Hebrew name, ask family members or your rabbi.'
        },
        {
          question: 'What Jewish phrases or blessings should I include?',
          answer: 'Common meaningful phrases include: "May their memory be a blessing" (zichronam livracha), "of blessed memory" (z"l or zichrono/zichrona livracha), or "May their soul be bound up in the bond of eternal life." You can also include the Yahrzeit date (Hebrew calendar date of death) for those who observe this tradition. These phrases connect your loved one to Jewish tradition and community.'
        },
        {
          question: 'How do I mention Jewish values or Torah in the obituary?',
          answer: 'You can reference values they embodied (chesed/kindness, tzedakah/charity, tikkun olam/repairing the world) or include meaningful quotes from Torah, Talmud, or Jewish scholars that reflect their beliefs. For example: "He lived by the Talmudic principle, \'Whoever saves one life, it is as if they saved an entire world.\'" This adds spiritual depth and connects their life to larger Jewish values.'
        }
      ]
    },
    {
      category: "Practical & Publishing",
      faqs: [
        {
          question: 'Can I edit the obituary after publishing?',
          answer: 'Yes! On Jewish Obits, you can edit your memorial page at any time. This is helpful for correcting errors, adding information you initially forgot, or including service details once they\'re finalized. Simply log into your account and make updates. Some print publications don\'t allow edits after publication, but online memorials offer flexibility.'
        },
        {
          question: 'How long does the obituary stay online?',
          answer: 'Memorial pages on Jewish Obits remain online permanently as a lasting tribute. They become part of your family\'s legacy and historical record. Future generations can visit, contribute memories, and light virtual candles. You maintain control over the page and can update it with yahrzeits, photos, or memories as time passes.'
        },
        {
          question: 'What if I can\'t afford professional writing or publishing services?',
          answer: 'Jewish Obits provides free tools, templates, and guidance to help you create a beautiful obituary yourself. Our platform is designed to be accessible to everyone, regardless of budget. You can create, publish, and maintain a memorial page at no cost. We believe everyone deserves to honor their loved ones with dignity, regardless of financial circumstances.'
        },
        {
          question: 'How do I share the obituary on social media?',
          answer: 'Every memorial page includes easy sharing options for Facebook, Twitter, email, and direct links. You can share the full obituary or create a personal post with a link. Consider your privacy preferences and your loved one\'s - some families prefer to keep memorials within their community, while others want to reach far and wide. You can always adjust privacy settings later.'
        }
      ]
    },
    {
      category: "Sensitive Situations",
      faqs: [
        {
          question: 'How do I write about suicide or overdose sensitively?',
          answer: 'This requires great care and compassion. Some families choose phrases like "died by suicide" (preferred over "committed suicide"), "died after a long struggle with mental illness," or "lost their battle with addiction." Others prefer "died unexpectedly" or "died at home." There\'s no wrong choice - follow your family\'s comfort level. Some choose openness to reduce stigma and potentially help others, while privacy is also completely valid. Consider including mental health resources or memorial funds for relevant organizations.'
        },
        {
          question: 'What about including difficult aspects of their life?',
          answer: 'Obituaries traditionally focus on positive aspects and achievements, which is perfectly appropriate - this is a tribute, not a biography. However, some families choose to acknowledge struggles (with addiction, mental illness, disability) as part of honoring the whole person and their courage. If you do this, frame it with compassion and respect. You might say: "Despite lifelong challenges with [condition], they showed remarkable resilience and touched many lives." Ultimately, honor your loved one in a way that feels true and respectful.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative bg-foreground text-background py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${writingHelpHero.src})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-background/80 mb-8">
            <Link href="/" className="hover:text-background transition-colors flex items-center gap-1">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-background font-medium">Writing Help & Guidance</span>
          </nav>

          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="text-background/90 hover:text-background hover:bg-background/10">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/20 text-background border-background/20">
              Free Writing Resources & Support
            </Badge>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              We're Here to Help You Honor Their Memory
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-background/90 leading-relaxed">
              Creating a meaningful obituary can feel overwhelming during grief. Our comprehensive guide provides expert tips, complete examples, and compassionate support for every step of the writing process.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 mb-10 text-background/80">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Trusted by Jewish families</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5" />
                <span>AI-assisted writing tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>100% free resources</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/create-obituary">
                  <PenTool className="mr-2 h-5 w-5" />
                  Start Writing Now
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="text-lg px-8 py-6" asChild>
                <Link href="/contact">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Personal Help
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">

            {/* Quick Start Guide */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Getting Started</Badge>
                <h2 className="text-4xl font-bold mb-4">Simple Steps to Create a Beautiful Tribute</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Follow our proven three-step process to write a meaningful obituary that honors your loved one
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="text-center group hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader className="pt-8">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <Clock className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">1. Gather Information</CardTitle>
                    <CardDescription className="text-base mt-4">
                      Collect photos, important dates, and meaningful stories from family and friends. Take your time - this is a collaborative process.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-left text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Birth & death dates
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Family information
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Career & achievements
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Favorite stories & memories
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader className="pt-8">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <PenTool className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">2. Write with Heart</CardTitle>
                    <CardDescription className="text-base mt-4">
                      Use our templates, examples, and tips to tell their unique story. Choose a style that fits their personality.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-left text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Choose writing style
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Include personal details
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Add Jewish traditions
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Edit and refine
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-elegant transition-all duration-300 border-2 hover:border-primary/50">
                  <CardHeader className="pt-8">
                    <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors group-hover:scale-110 duration-300">
                      <Heart className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">3. Share & Honor</CardTitle>
                    <CardDescription className="text-base mt-4">
                      Publish the memorial online and invite family, friends, and community to share their memories and condolences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-left text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Create memorial page
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Add photos & videos
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Share with community
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                        Receive condolences
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-16" />

            {/* Understanding Grief Section */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Emotional Support</Badge>
                <h2 className="text-4xl font-bold mb-4">Understanding Grief While Writing</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Writing an obituary while grieving is challenging. Here's what you need to know to take care of yourself during this process.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <Card className="hover:shadow-elegant transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Heart className="h-6 w-6 text-primary" />
                      It's Okay to Take Breaks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Writing about someone you've lost can bring up powerful emotions. This is completely normal and expected.</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Step away when you need to cry, breathe, or rest</span>
                              </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>There's no rush - save your work and return when ready</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Some find writing therapeutic, others find it overwhelming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Both reactions are valid - honor what you need</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Users className="h-6 w-6 text-primary" />
                      You Don't Have to Do This Alone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Collaborative writing can ease the burden and create a more complete tribute.</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Ask family members to contribute stories and memories</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Divide tasks - one person writes, another gathers photos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Have someone else review for accuracy and completeness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Contact us for personal help if you need extra support</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <Lightbulb className="h-6 w-6 text-primary" />
                      Writing Can Be Healing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Many people find that writing helps them process grief and celebrate their loved one's life.</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Reflecting on memories can bring comfort and connection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Organizing thoughts helps make sense of loss</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Creating a tribute feels like a final act of love</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>You're preserving their legacy for future generations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                      When to Seek Additional Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground">
                    <p>Sometimes grief is too heavy to carry alone. Consider reaching out if you're experiencing:</p>
                    <ul className="space-y-2 pl-4">
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Overwhelming sadness that doesn't ease over time</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Difficulty functioning in daily life</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Intrusive thoughts or severe anxiety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <ArrowRight className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                        <span>Visit our <Link href="/grief-support" className="text-primary hover:underline">Grief Support Resources</Link></span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-16" />

            {/* Jewish Traditions Section */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Jewish Customs & Heritage</Badge>
                <h2 className="text-4xl font-bold mb-4">Honoring Jewish Traditions in Obituaries</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Incorporate meaningful Jewish customs, phrases, and values into your loved one's memorial
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="hover:shadow-elegant transition-all">
                  <CardHeader>
                    <Star className="h-8 w-8 text-primary mb-3" />
                    <CardTitle>Hebrew Names & Blessings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Include Hebrew name:</strong> "[English name] ([Hebrew name] ben/bat [Parent's Hebrew name])"</p>
                    <p><strong className="text-foreground">Common blessings:</strong></p>
                    <ul className="space-y-2 pl-4 text-sm">
                      <li>* "May their memory be a blessing" (zichronam livracha)</li>
                      <li>* "Of blessed memory" (z"l)</li>
                      <li>* "May their soul be bound up in the bond of eternal life"</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-primary mb-3" />
                    <CardTitle>Jewish Values & Torah</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Core values to mention:</strong></p>
                    <ul className="space-y-2 pl-4 text-sm">
                      <li>* <strong>Chesed</strong> - Acts of loving kindness</li>
                      <li>* <strong>Tzedakah</strong> - Charity and justice</li>
                      <li>* <strong>Tikkun Olam</strong> - Repairing the world</li>
                      <li>* <strong>Kavod</strong> - Honor and respect</li>
                      <li>* Include relevant Torah quotes or Talmudic wisdom</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all">
                  <CardHeader>
                    <Calendar className="h-8 w-8 text-primary mb-3" />
                    <CardTitle>Community & Observances</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-muted-foreground">
                    <p><strong className="text-foreground">Include affiliations:</strong></p>
                    <ul className="space-y-2 pl-4 text-sm">
                      <li>* Synagogue membership and involvement</li>
                      <li>* Jewish organizations and causes</li>
                      <li>* Yahrzeit date (Hebrew calendar)</li>
                      <li>* Service details (timing respects Shabbat)</li>
                      <li>* Shiva information and house location</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-16" />

            {/* Complete Example Obituaries */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Writing Styles & Examples</Badge>
                <h2 className="text-4xl font-bold mb-4">5 Complete Example Obituaries</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  See different writing styles in action - from traditional to celebratory, find the approach that honors your loved one best
                </p>
              </div>

              <div className="space-y-8 max-w-5xl mx-auto">
                {exampleObituaries.map((example, index) => (
                  <Card key={index} className="hover:shadow-elegant transition-all">
                    <CardHeader className="bg-muted/30">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <Badge className="mb-2">{example.title}</Badge>
                          <CardTitle className="text-2xl">{example.name}</CardTitle>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                          <FileText className="h-4 w-4" />
                          Use This Style
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-lg max-w-none">
                        {example.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4 text-muted-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Separator className="my-16" />

            {/* Digital Memorial Features */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Online Memorial Features</Badge>
                <h2 className="text-4xl font-bold mb-4">Enhance Your Memorial with Digital Features</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Our platform offers powerful tools to create a living, lasting tribute
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center hover:shadow-elegant transition-all">
                  <CardHeader>
                    <Image className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Photo & Video Galleries</CardTitle>
                    <CardDescription className="mt-2">
                      Upload unlimited photos and videos to create a visual celebration of their life
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-elegant transition-all">
                  <CardHeader>
                    <Flame className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Virtual Candle Lighting</CardTitle>
                    <CardDescription className="mt-2">
                      Friends and family can light virtual memorial candles with personal messages
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-elegant transition-all">
                  <CardHeader>
                    <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Memory Guestbook</CardTitle>
                    <CardDescription className="mt-2">
                      Community members can share stories, condolences, and memories
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="text-center hover:shadow-elegant transition-all">
                  <CardHeader>
                    <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle>Yahrzeit Reminders</CardTitle>
                    <CardDescription className="mt-2">
                      Automatic email reminders for anniversaries and Jewish memorial dates
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <Separator className="my-16" />

            {/* Common Mistakes Section */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Avoid These Pitfalls</Badge>
                <h2 className="text-4xl font-bold mb-4">Common Mistakes to Avoid</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Learn from others' experiences - here's what to watch out for when writing
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <Card className="hover:shadow-elegant transition-all border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                      Leaving Out Important People
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-3">
                    <p><strong className="text-foreground">The mistake:</strong> Forgetting to mention stepchildren, close friends, or longtime partners.</p>
                    <p><strong className="text-foreground">How to avoid it:</strong> Create a list of all family members and close relationships before you start writing. Ask others to review for anyone missed.</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                      Unclear Service Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-3">
                    <p><strong className="text-foreground">The mistake:</strong> Vague or missing information about funeral, shiva, or memorial services.</p>
                    <p><strong className="text-foreground">How to avoid it:</strong> Include specific dates, times, locations, and addresses. Note if services are private or open to community.</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                      Being Too Generic
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-3">
                    <p><strong className="text-foreground">The mistake:</strong> Using cliches like "loved by all" without specific examples of their personality.</p>
                    <p><strong className="text-foreground">How to avoid it:</strong> Include specific details - their laugh, their famous brisket recipe, their terrible puns, their garden full of roses.</p>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all border-l-4 border-l-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-primary" />
                      Factual Errors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground space-y-3">
                    <p><strong className="text-foreground">The mistake:</strong> Wrong dates, misspelled names, incorrect locations - these become permanent records.</p>
                    <p><strong className="text-foreground">How to avoid it:</strong> Double-check all facts. Have multiple family members review. Verify dates from official documents.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-16" />

            {/* Comprehensive FAQ with Categories */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Your Questions Answered</Badge>
                <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Comprehensive answers to common questions about writing, publishing, and honoring loved ones
                </p>
              </div>

              <div className="max-w-5xl mx-auto space-y-8">
                {faqCategories.map((category, catIndex) => (
                  <div key={catIndex}>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="h-1 w-12 bg-primary rounded" />
                      {category.category}
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${catIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left text-lg hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-16" />

            {/* Testimonials Section */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Community Stories</Badge>
                <h2 className="text-4xl font-bold mb-4">How We've Helped Families Honor Their Loved Ones</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Real experiences from families who used our platform during their time of loss
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="hover:shadow-elegant transition-all">
                  <CardContent className="pt-6">
                    <Quote className="h-10 w-10 text-primary/20 mb-4" />
                    <p className="text-muted-foreground italic mb-6">
                      "Writing my father's obituary felt impossible while grieving. The templates and examples here gave me a structure to work with, and being able to edit it later when I thought of more details was such a relief. This made the hardest week of my life a little more manageable."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Rebecca L.</p>
                        <p className="text-sm text-muted-foreground">Chicago, IL</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all">
                  <CardContent className="pt-6">
                    <Quote className="h-10 w-10 text-primary/20 mb-4" />
                    <p className="text-muted-foreground italic mb-6">
                      "The guidance on including Jewish traditions was invaluable. We wanted to honor Mom's Hebrew name and include appropriate blessings, but weren't sure how. The examples showed us exactly what to do. The memorial page has become a place where our whole community shares memories."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">David & Sarah K.</p>
                        <p className="text-sm text-muted-foreground">New York, NY</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-elegant transition-all">
                  <CardContent className="pt-6">
                    <Quote className="h-10 w-10 text-primary/20 mb-4" />
                    <p className="text-muted-foreground italic mb-6">
                      "I was worried about writing my grandfather's obituary because I didn't know him well as a child. The advice about reaching out to others for stories was perfect. I collected beautiful memories from his friends and created a tribute that captured who he really was."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserCircle className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Michael R.</p>
                        <p className="text-sm text-muted-foreground">Los Angeles, CA</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-16" />

            {/* Related Resources */}
            <div className="mb-24">
              <div className="text-center mb-12">
                <Badge className="mb-4">Additional Support</Badge>
                <h2 className="text-4xl font-bold mb-4">Related Resources to Help You</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Explore more guides and support for navigating loss and honoring memories
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/grief-support">
                  <Card className="h-full hover:shadow-elegant transition-all hover:border-primary cursor-pointer group">
                    <CardHeader>
                      <Heart className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <CardTitle className="group-hover:text-primary transition-colors">Grief Support</CardTitle>
                      <CardDescription>
                        Professional resources and counseling services for coping with loss
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/resources">
                  <Card className="h-full hover:shadow-elegant transition-all hover:border-primary cursor-pointer group">
                    <CardHeader>
                      <BookOpen className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <CardTitle className="group-hover:text-primary transition-colors">Jewish Traditions</CardTitle>
                      <CardDescription>
                        Learn about shiva, yahrzeit, kaddish, and other Jewish mourning customs
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/planning">
                  <Card className="h-full hover:shadow-elegant transition-all hover:border-primary cursor-pointer group">
                    <CardHeader>
                      <FileCheck className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <CardTitle className="group-hover:text-primary transition-colors">Planning Services</CardTitle>
                      <CardDescription>
                        Guidance for organizing funeral, memorial, and shiva arrangements
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>

                <Link href="/contact">
                  <Card className="h-full hover:shadow-elegant transition-all hover:border-primary cursor-pointer group">
                    <CardHeader>
                      <MessageCircle className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <CardTitle className="group-hover:text-primary transition-colors">Get Personal Help</CardTitle>
                      <CardDescription>
                        Speak with our compassionate team for one-on-one writing assistance
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            </div>

            {/* Final Call to Action */}
            <div className="text-center">
              <Card className="max-w-4xl mx-auto p-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-2 border-primary/20">
                <CardContent className="pt-6">
                  <Sparkles className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h2 className="text-4xl font-bold mb-6">Ready to Honor Their Memory?</h2>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                    You have everything you need to create a beautiful, meaningful tribute. Our tools are free, our support is here for you, and your loved one's legacy awaits.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="text-lg px-10 py-6" asChild>
                      <Link href="/create-obituary">
                        <PenTool className="mr-2 h-6 w-6" />
                        Create Their Memorial Now
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg px-10 py-6" asChild>
                      <Link href="/contact">
                        <MessageCircle className="mr-2 h-6 w-6" />
                        Request Personal Assistance
                      </Link>
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    100% free * No credit card required * Edit anytime * Support available 24/7
                  </p>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WritingHelp;
