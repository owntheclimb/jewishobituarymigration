-- Update first test record to Elie Wiesel
UPDATE obituaries 
SET 
  full_name = 'Elie Wiesel',
  date_of_birth = '1928-09-30',
  date_of_death = '2016-07-02',
  location = 'New York, New York',
  city = 'New York',
  state = 'NY',
  photo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Elie_Wiesel_2012_Shankbone.JPG/800px-Elie_Wiesel_2012_Shankbone.JPG',
  biography = 'Elie Wiesel was a Holocaust survivor, Nobel Peace Prize laureate, and prolific author whose powerful testimony bore witness to one of humanity''s darkest chapters. His memoir "Night" became one of the most important works of Holocaust literature, ensuring that the voices of six million Jews would never be forgotten. Born in Sighet, Romania, Wiesel survived Auschwitz and Buchenwald before dedicating his life to fighting indifference, intolerance, and injustice. As a professor, activist, and moral voice, he challenged the world to remember the past and defend human dignity. His legacy continues to inspire courage in the face of hatred.',
  hebrew_name = 'אליעזר ויזל'
WHERE id = '629440f1-b7e2-4d00-a810-c2cc527d06ca';

-- Update second test record to Leonard Nimoy
UPDATE obituaries 
SET 
  full_name = 'Leonard Nimoy',
  date_of_birth = '1931-03-26',
  date_of_death = '2015-02-27',
  location = 'Boston, Massachusetts',
  city = 'Boston',
  state = 'MA',
  photo_url = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Leonard_Nimoy_by_Gage_Skidmore_2.jpg/800px-Leonard_Nimoy_by_Gage_Skidmore_2.jpg',
  biography = 'Leonard Nimoy was an acclaimed actor, director, photographer, and poet, best known for his iconic portrayal of Spock in the Star Trek franchise. His performance as the logical Vulcan with a human side became one of television''s most enduring characters. Born in Boston to Jewish immigrant parents from Ukraine, Nimoy brought depth and dignity to science fiction. He famously created the Vulcan salute based on the Jewish priestly blessing he witnessed in synagogue as a child. Beyond Star Trek, he was a Renaissance man who directed films, published poetry, and created stunning photography. His final tweet, "A life is like a garden. Perfect moments can be had, but not preserved, except in memory. LLAP" captured his wisdom.',
  hebrew_name = 'לאונרד נימוי'
WHERE id = '9c74be38-5e6f-4ed4-84f7-bb12e907ae68';

-- Insert Joan Rivers
INSERT INTO obituaries (
  id,
  user_id,
  full_name,
  date_of_birth,
  date_of_death,
  location,
  city,
  state,
  photo_url,
  biography,
  hebrew_name,
  published,
  visibility
) VALUES (
  gen_random_uuid(),
  'a989d587-5b18-4104-b7c7-7339f11e0c6d',
  'Joan Rivers',
  '1933-06-08',
  '2014-09-04',
  'Brooklyn, New York',
  'Brooklyn',
  'NY',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Joan_Rivers_2010_-_David_Shankbone.jpg/800px-Joan_Rivers_2010_-_David_Shankbone.jpg',
  'Joan Rivers was a groundbreaking comedian, actress, and television host who shattered glass ceilings in entertainment. Born Joan Alexandra Molinsky in Brooklyn to Russian Jewish immigrants, she became the first woman to host a late-night network television talk show. Known for her sharp wit, fearless comedy, and signature phrase "Can we talk?", Rivers revolutionized stand-up comedy for women. She built an empire spanning television, film, jewelry design, and fashion commentary. Despite personal tragedies, she maintained her work ethic and humor until the end, performing over 200 nights a year well into her 80s. Her legacy paved the way for generations of female comedians.',
  'ג''ואן ריברס',
  true,
  'public'
);

-- Insert Albert Einstein
INSERT INTO obituaries (
  id,
  user_id,
  full_name,
  date_of_birth,
  date_of_death,
  location,
  city,
  state,
  photo_url,
  biography,
  hebrew_name,
  published,
  visibility
) VALUES (
  gen_random_uuid(),
  '6902d3c5-33fb-4e8d-bd4d-b9078d883f11',
  'Albert Einstein',
  '1879-03-14',
  '1955-04-18',
  'Princeton, New Jersey',
  'Princeton',
  'NJ',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg',
  'Albert Einstein was one of history''s greatest physicists, whose theory of relativity revolutionized our understanding of space, time, and the universe. Born in Ulm, Germany, he developed the famous equation E=mc² and won the Nobel Prize in Physics in 1921. Beyond his scientific genius, Einstein was a passionate advocate for civil rights, pacifism, and Zionism. He fled Nazi Germany in 1933 and spent his final decades at Princeton''s Institute for Advanced Study. A lifelong humanist, he warned against nuclear weapons while championing education and social justice. His name became synonymous with genius itself, yet he remained humble and curious throughout his life.',
  'אלברט איינשטיין',
  true,
  'public'
);