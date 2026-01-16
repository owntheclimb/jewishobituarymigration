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
  {
    id: "rabbi-sacks",
    name: "Rabbi Lord Jonathan Sacks",
    hebrewName: "יעקב צבי סקס",
    dates: "March 8, 1948 - November 7, 2020",
    age: 72,
    category: "Chief Rabbi & Philosopher",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=600&fit=crop",
    excerpt: "Former Chief Rabbi of the United Kingdom, prolific author, moral philosopher, and global voice for religious tolerance.",
    candles: 7654,
    memories: 432,
    biography: "Rabbi Jonathan Sacks was born in London to Polish Jewish parents. He studied philosophy at Cambridge University and received his rabbinical ordination from Jews' College and Yeshiva Etz Chaim. He earned a PhD in philosophy from King's College London. In 1991, he became Chief Rabbi of the United Hebrew Congregations of the Commonwealth, serving until 2013. Rabbi Sacks was a prolific author, writing over 30 books on Jewish thought, ethics, and interfaith dialogue. His work bridged traditional Judaism with contemporary philosophy and science. He was a eloquent advocate for religious tolerance and dialogue between faiths, earning the prestigious Templeton Prize in 2016. He was knighted by Queen Elizabeth II and made a life peer, becoming Baron Sacks. His weekly radio broadcasts and thoughtful commentary made profound ideas accessible. He passed away in 2020, mourned across religious and cultural boundaries.",
    quote: "The test of faith is whether I can make space for difference.",
    location: "London, United Kingdom",
    achievements: [
      "Chief Rabbi of the United Hebrew Congregations (1991-2013)",
      "Templeton Prize laureate (2016)",
      "Author of over 30 books on Jewish thought and interfaith dialogue",
      "Life peer in the House of Lords"
    ]
  },
  {
    id: "shimon-peres",
    name: "Shimon Peres",
    hebrewName: "שמעון פרס",
    dates: "August 2, 1923 - September 28, 2016",
    age: 93,
    category: "Israeli Leader & Nobel Laureate",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop",
    excerpt: "Ninth President of Israel, Prime Minister, and Nobel Peace Prize laureate who dedicated his life to Israel's security and peace.",
    candles: 14521,
    memories: 982,
    biography: "Shimon Peres was born in Wiszniew, Poland (now Belarus) in 1923. His family immigrated to British Mandatory Palestine in 1934, where he grew up and became involved in Labor Zionism. He served in the Haganah and worked closely with David Ben-Gurion, helping to establish Israel's defense infrastructure. Peres held nearly every major political office in Israel: he served three terms as Prime Minister, was Foreign Minister, and served as the ninth President of Israel from 2007 to 2014. In 1994, he shared the Nobel Peace Prize with Yitzhak Rabin and Yasser Arafat for his role in the Oslo Accords. Known for his vision of a 'New Middle East,' Peres was a statesman who dedicated 70 years to public service. He founded the Peres Center for Peace and Innovation. He died at age 93, honored as a founding father of modern Israel.",
    quote: "Optimists and pessimists die the same way. They just live differently.",
    location: "Jerusalem, Israel",
    achievements: [
      "Nobel Peace Prize laureate (1994) for Oslo Accords",
      "Three-time Prime Minister of Israel",
      "Ninth President of Israel (2007-2014)",
      "Founded the Peres Center for Peace and Innovation"
    ]
  },
  {
    id: "sheldon-adelson",
    name: "Sheldon Adelson",
    hebrewName: "שלדון אדלסון",
    dates: "August 4, 1933 - January 11, 2021",
    age: 87,
    category: "Business Leader & Philanthropist",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=600&fit=crop",
    excerpt: "Casino magnate, major Republican donor, and philanthropist who supported Jewish causes, medical research, and Israeli institutions.",
    candles: 8934,
    memories: 456,
    biography: "Sheldon Adelson was born in Boston to Jewish immigrant parents from Lithuania and Ukraine. He grew up in the working-class Dorchester neighborhood and started his first business at age 12, selling newspapers. He went on to build a business empire in hospitality and gaming. In 1989, he founded the COMDEX trade show, which he sold for $862 million. He then purchased the Sands Hotel in Las Vegas, which he transformed into The Venetian Resort. He expanded his casino empire to Macau and Singapore, becoming one of the world's wealthiest individuals. Adelson and his wife Miriam were major philanthropists, donating hundreds of millions to medical research, Jewish causes, and Israeli institutions. He funded Birthright Israel, which brings young Jewish adults to Israel. A staunch supporter of Israel, he owned the Israeli newspaper Israel Hayom. He died in 2021, leaving behind a legacy of entrepreneurship and philanthropy.",
    quote: "I've been very fortunate in life, and I've always believed in giving back.",
    location: "Las Vegas, Nevada",
    achievements: [
      "Built casino empire with properties in Las Vegas, Macau, and Singapore",
      "Major philanthropist supporting medical research and Jewish causes",
      "Co-founder of Birthright Israel",
      "Owner of Israel Hayom newspaper"
    ]
  },
  {
    id: "beverly-sills",
    name: "Beverly Sills",
    hebrewName: "בל מירים סילברמן",
    dates: "May 25, 1929 - July 2, 2007",
    age: 78,
    category: "Opera Singer & Arts Advocate",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    excerpt: "Celebrated American operatic soprano, arts administrator, and beloved cultural icon who made opera accessible to millions.",
    candles: 6782,
    memories: 398,
    biography: "Beverly Sills was born Belle Miriam Silverman in Brooklyn, New York, to Jewish parents. She demonstrated musical talent early, singing on radio by age three. She trained as an opera singer and joined the New York City Opera in 1955, where she spent most of her performing career. Known for her beautiful coloratura soprano voice, she excelled in bel canto operas by Donizetti, Bellini, and Rossini. Despite personal challenges—her daughter was born deaf and her son was severely disabled—Sills maintained her career and became an inspiration to many. She was known for her warm personality and accessibility, appearing frequently on television and making opera popular with American audiences. After retiring from singing in 1980, she became an arts administrator, leading the New York City Opera and Lincoln Center. She was awarded the Presidential Medal of Freedom in 1980. She died in 2007, remembered as 'America's Queen of Opera.'",
    quote: "Art is the signature of civilizations.",
    location: "New York, New York",
    achievements: [
      "Leading soprano at New York City Opera for over 25 years",
      "Presidential Medal of Freedom recipient",
      "Chairman of Lincoln Center and Metropolitan Opera",
      "Kennedy Center Honors recipient"
    ]
  },
  {
    id: "jonas-salk",
    name: "Jonas Salk",
    hebrewName: "יונה זלק",
    dates: "October 28, 1914 - June 23, 1995",
    age: 80,
    category: "Scientist & Medical Pioneer",
    image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?w=600&h=600&fit=crop",
    excerpt: "Medical researcher and virologist who developed the first successful polio vaccine, saving countless lives worldwide.",
    candles: 13245,
    memories: 867,
    biography: "Jonas Salk was born in New York City to Jewish immigrant parents from Russia. He attended City College of New York and New York University School of Medicine. In the early 1950s, polio epidemics were crippling thousands of children annually, causing widespread fear. Salk led a research team at the University of Pittsburgh that developed the first safe and effective polio vaccine, using killed poliovirus. In 1955, the vaccine was declared safe and effective. Salk became a national hero overnight. When asked who owned the patent, he famously replied, 'There is no patent. Could you patent the sun?' His decision not to patent the vaccine saved millions of lives and foregone billions in royalties. In 1963, he founded the Salk Institute for Biological Studies in La Jolla, California, a leading research institution. He spent his later years researching an AIDS vaccine. Salk died in 1995, leaving a legacy of scientific achievement and humanitarianism.",
    quote: "Hope lies in dreams, in imagination, and in the courage of those who dare to make dreams into reality.",
    location: "La Jolla, California",
    achievements: [
      "Developed the first successful polio vaccine (1955)",
      "Refused to patent vaccine, making it freely available worldwide",
      "Founded the Salk Institute for Biological Studies",
      "Presidential Medal of Freedom recipient"
    ]
  },
  {
    id: "leonard-cohen",
    name: "Leonard Cohen",
    hebrewName: "אליעזר בן ניסן הכהן",
    dates: "September 21, 1934 - November 7, 2016",
    age: 82,
    category: "Poet, Singer & Songwriter",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=600&fit=crop",
    excerpt: "Legendary singer-songwriter, poet, and novelist whose profound lyrics and distinctive voice touched millions around the world.",
    candles: 16789,
    memories: 1432,
    biography: "Leonard Cohen was born in Montreal, Quebec, to a middle-class Jewish family. He published his first book of poetry in 1956 and gained recognition as a novelist and poet before turning to music in his 30s. His debut album, 'Songs of Leonard Cohen' (1967), featured 'Suzanne' and established him as a unique voice in folk music. Over five decades, Cohen released 14 studio albums, including classics like 'Songs of Love and Hate' and 'I'm Your Man.' His song 'Hallelujah' became one of the most covered songs in modern music. Cohen's work blended spirituality, romance, and philosophy, drawing from his Jewish heritage and years spent in a Zen Buddhist monastery. He was inducted into the Rock and Roll Hall of Fame and received numerous honors. Cohen continued performing into his 80s, releasing his final album just weeks before his death in 2016. His poetic lyrics and distinctive baritone voice left an indelible mark on music and literature.",
    quote: "There is a crack in everything. That's how the light gets in.",
    location: "Los Angeles, California",
    achievements: [
      "Rock and Roll Hall of Fame inductee",
      "Grammy Lifetime Achievement Award recipient",
      "Author of 14 studio albums and numerous poetry collections",
      "Order of Canada and Canadian Music Hall of Fame member"
    ]
  },
  {
    id: "albert-einstein",
    name: "Albert Einstein",
    hebrewName: "אברהם אלברט איינשטיין",
    dates: "March 14, 1879 - April 18, 1955",
    age: 76,
    category: "Physicist & Nobel Laureate",
    image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&h=600&fit=crop",
    excerpt: "Theoretical physicist who developed the theory of relativity, one of the most influential scientists of all time.",
    candles: 24567,
    memories: 2134,
    biography: "Albert Einstein was born in Ulm, Germany, to a non-observant Jewish family. He showed early brilliance in mathematics and physics, though he struggled with the rigid educational system. After graduating from ETH Zurich, he worked at the Swiss patent office while developing his groundbreaking theories. In 1905, his 'miracle year,' Einstein published four papers that revolutionized physics, including his theory of special relativity (E=mc²). In 1915, he completed his general theory of relativity, fundamentally changing our understanding of gravity, space, and time. He received the Nobel Prize in Physics in 1921. As the Nazi party rose to power, Einstein, a pacifist and humanitarian, immigrated to the United States in 1933, joining Princeton University. He became an advocate for civil rights, Zionism, and nuclear disarmament. Beyond his scientific genius, Einstein was known for his philosophical insights, wit, and concern for humanity. He died in 1955, leaving a legacy as the embodiment of genius and the most influential physicist of the 20th century.",
    quote: "Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
    location: "Princeton, New Jersey",
    achievements: [
      "Nobel Prize in Physics (1921)",
      "Developed the theory of relativity, revolutionizing modern physics",
      "Published over 300 scientific papers and 150 non-scientific works",
      "Time Magazine's Person of the Century"
    ]
  },
];
