export interface NotableFigure {
  id: string;
  name: string;
  hebrewName: string;
  dates: string;
  age: number;
  category: string;
  image: string;
  excerpt: string;
  candles: number;
  memories: number;
  biography?: string;
  quote?: string;
  location?: string;
  achievements?: string[];
}

// Notable figures with REAL, properly-licensed photos only
// All images stored in /public/notable-figures/
// Stock photos have been removed to maintain brand credibility
export const notableFigures: NotableFigure[] = [
  {
    id: "rbg",
    name: "Ruth Bader Ginsburg",
    hebrewName: "רות ביידר גינזבורג",
    dates: "March 15, 1933 - September 18, 2020",
    age: 87,
    category: "Legal Pioneer & Supreme Court Justice",
    image: "/notable-figures/ruth-bader-ginsburg.jpg",
    excerpt: "Associate Justice of the Supreme Court, champion of gender equality and women's rights, cultural icon known as 'The Notorious RBG.'",
    candles: 15234,
    memories: 892,
    biography: "Ruth Bader Ginsburg was born in Brooklyn, New York, to a Jewish family. She graduated from Cornell University and Columbia Law School, where she tied for first in her class. Despite facing gender discrimination in her early career, she became a pioneering advocate for gender equality. As an attorney, she co-founded the Women's Rights Project at the ACLU and argued six landmark cases before the Supreme Court. In 1993, President Bill Clinton appointed her to the Supreme Court, where she served with distinction for 27 years. Known for her sharp intellect, careful jurisprudence, and powerful dissents, Justice Ginsburg became a cultural icon, inspiring millions with her dedication to equal justice under law. She passed away on September 18, 2020, leaving behind a legacy of courage, perseverance, and unwavering commitment to justice.",
    quote: "Real change, enduring change, happens one step at a time.",
    location: "Washington, D.C.",
    achievements: [
      "Second woman to serve on the U.S. Supreme Court",
      "Co-founder of the Women's Rights Project at the ACLU",
      "Argued six landmark cases before the Supreme Court",
      "Recipient of numerous honorary degrees and awards"
    ]
  },
  {
    id: "elie-wiesel",
    name: "Elie Wiesel",
    hebrewName: "אליעזר ויזל",
    dates: "September 30, 1928 - July 2, 2016",
    age: 87,
    category: "Holocaust Survivor & Nobel Laureate",
    image: "/notable-figures/elie-wiesel.jpg",
    excerpt: "Author of 'Night,' Nobel Peace Prize winner, Holocaust survivor, and tireless advocate for human rights and remembrance.",
    candles: 12567,
    memories: 743,
    biography: "Elie Wiesel was born in Sighet, Romania (now part of Ukraine) in 1928. At age 15, he and his family were deported to Auschwitz concentration camp. His mother and younger sister perished immediately, and his father died shortly before liberation. Wiesel survived Auschwitz and Buchenwald, and after the war, moved to France where he studied philosophy at the Sorbonne. In 1958, he published 'Night,' his haunting memoir of the Holocaust, which has since been translated into 30 languages and read by millions. Wiesel became a powerful voice for Holocaust remembrance and human rights, authoring 57 books and serving as a professor at Boston University. In 1986, he received the Nobel Peace Prize for his work combating indifference, intolerance, and injustice. He passed away in 2016, leaving an indelible mark on how the world remembers the Holocaust.",
    quote: "For the dead and the living, we must bear witness.",
    location: "New York, New York",
    achievements: [
      "Nobel Peace Prize laureate (1986)",
      "Author of 57 books including the seminal work 'Night'",
      "Presidential Medal of Freedom recipient",
      "Founding chairman of the U.S. Holocaust Memorial Council"
    ]
  },
  {
    id: "leonard-nimoy",
    name: "Leonard Nimoy",
    hebrewName: "לאונרד נימוי",
    dates: "March 26, 1931 - February 27, 2015",
    age: 83,
    category: "Actor & Cultural Icon",
    image: "/notable-figures/leonard-nimoy.jpg",
    excerpt: "Beloved as Mr. Spock on Star Trek, accomplished director, photographer, and poet who inspired generations.",
    candles: 18943,
    memories: 1205,
    biography: "Leonard Nimoy was born in Boston's West End to Ukrainian Jewish immigrants. He began acting in community theater as a child and pursued his passion throughout his life. His most famous role came in 1966 when he was cast as Mr. Spock in the original Star Trek series. The character's logical, thoughtful nature and Vulcan salute became iconic, and Nimoy reprised the role in multiple films and series over five decades. Beyond acting, he was an accomplished director (Star Trek III and IV), photographer, poet, and singer. His photography often explored themes of Jewish identity and the female form. Nimoy was deeply connected to his Jewish heritage, narrating documentaries about Jewish history and using the Vulcan salute—based on the priestly blessing he remembered from synagogue. He passed away in 2015, leaving behind a legacy of creativity, cultural impact, and inspiring curiosity.",
    quote: "A life is like a garden. Perfect moments can be had, but not preserved, except in memory.",
    location: "Los Angeles, California",
    achievements: [
      "Iconic portrayal of Mr. Spock in Star Trek franchise",
      "Directed Star Trek III and IV, two of the franchise's most successful films",
      "Published multiple volumes of poetry and photography",
      "Received Emmy Award nominations for Star Trek"
    ]
  },
  {
    id: "joan-rivers",
    name: "Joan Rivers",
    hebrewName: "יוענה מולינסקי",
    dates: "June 8, 1933 - September 4, 2014",
    age: 81,
    category: "Comedian & Entertainment Pioneer",
    image: "/notable-figures/joan-rivers.jpg",
    excerpt: "Groundbreaking comedian, actress, television host, and businesswoman who broke barriers in entertainment.",
    candles: 9876,
    memories: 567,
    biography: "Joan Rivers was born Joan Molinsky in Brooklyn, New York, to Russian Jewish immigrants. She graduated from Barnard College and began her comedy career in the early 1960s, performing in Greenwich Village clubs. Her big break came in 1965 when she appeared on The Tonight Show with Johnny Carson. Rivers became known for her sharp wit, self-deprecating humor, and willingness to discuss taboo topics. She broke barriers for women in comedy, becoming the first woman to host a late-night television talk show. Throughout her career, she authored 12 bestselling books, won a Grammy Award, an Emmy, and starred in reality television. She built a successful jewelry and fashion business on QVC. Rivers was known for her work ethic, performing stand-up until her death at age 81. Her legacy lives on through the countless comedians she inspired.",
    quote: "I succeeded by saying what everyone else is thinking.",
    location: "New York, New York",
    achievements: [
      "First woman to host a late-night television talk show",
      "Grammy Award and Emmy Award winner",
      "Bestselling author of 12 books",
      "Successful entrepreneur with jewelry and fashion lines"
    ]
  },
  {
    id: "gene-wilder",
    name: "Gene Wilder",
    hebrewName: "ג'רום סילברמן",
    dates: "June 11, 1933 - August 29, 2016",
    age: 83,
    category: "Actor & Comedian",
    image: "/notable-figures/gene-wilder.jpg",
    excerpt: "Iconic actor known for Willy Wonka, Young Frankenstein, and collaborations with Mel Brooks. Author and Alzheimer's advocate.",
    candles: 11234,
    memories: 678,
    biography: "Gene Wilder was born Jerome Silberman in Milwaukee, Wisconsin, to Jewish immigrants from Russia and Poland. He developed his love of acting as a child and studied at the Bristol Old Vic Theatre School in England. Wilder's breakthrough came with his role in Mel Brooks' 'The Producers' (1967), beginning a legendary collaboration. He gave unforgettable performances in 'Willy Wonka & the Chocolate Factory' (1971), 'Blazing Saddles' (1974), and 'Young Frankenstein' (1974), which he co-wrote and earned an Oscar nomination for. His gentle, neurotic comic style and ability to blend vulnerability with wild energy made him unique. After his third wife, Gilda Radner, died of ovarian cancer, he became an advocate for cancer awareness. In later years, after his fourth wife was diagnosed with Alzheimer's, he focused on writing, publishing several novels and memoirs. He died in 2016, leaving a legacy of laughter and kindness.",
    quote: "We are the music makers, and we are the dreamers of dreams.",
    location: "Stamford, Connecticut",
    achievements: [
      "Iconic roles in Willy Wonka, Young Frankenstein, and Blazing Saddles",
      "Academy Award nomination for Best Supporting Actor",
      "Emmy Award winner for guest appearance on Will & Grace",
      "Published author of novels and memoirs"
    ]
  },
  {
    id: "carl-reiner",
    name: "Carl Reiner",
    hebrewName: "קארל ריינר",
    dates: "March 20, 1922 - June 29, 2020",
    age: 98,
    category: "Comedy Legend & Director",
    image: "/notable-figures/carl-reiner.jpg",
    excerpt: "Emmy-winning comedy legend, creator of The Dick Van Dyke Show, and beloved partner of Mel Brooks in countless comedy classics.",
    candles: 10543,
    memories: 623,
    biography: "Carl Reiner was born in the Bronx, New York, to Jewish immigrants from Austria and Romania. He began his career as a dramatic actor and comedian before finding his calling in television. Reiner created and produced The Dick Van Dyke Show, one of television's most beloved sitcoms, winning multiple Emmy Awards. He directed classic films including The Jerk, Dead Men Don't Wear Plaid, and All of Me, often starring Steve Martin. His comedy partnership with Mel Brooks produced the legendary 2000 Year Old Man recordings. Reiner was a versatile talent—actor, writer, director, and producer—who worked well into his 90s. He won nine Emmy Awards and was inducted into the Television Hall of Fame. Known for his sharp wit, kindness, and tireless work ethic, Reiner remained active on social media and in the entertainment industry until his death at age 98. His legacy lives on through his son Rob Reiner and the countless comedians he influenced.",
    quote: "Inviting people to laugh with you while you are laughing at yourself is a good thing to do. You may be a fool but you're the fool in charge.",
    location: "Beverly Hills, California",
    achievements: [
      "Creator of The Dick Van Dyke Show, winner of 9 Emmy Awards",
      "Directed comedy classics including The Jerk and Dead Men Don't Wear Plaid",
      "Comedy partnership with Mel Brooks spanning 60+ years",
      "Kennedy Center Honors recipient and Television Hall of Fame inductee"
    ]
  },
];
