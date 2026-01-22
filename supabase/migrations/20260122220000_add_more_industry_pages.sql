-- Additional Industry Resource Pages
-- Part 9: Content Expansion - 10 More High-Quality Industry Pages
-- January 22, 2026

-- Insert 10 additional industry pages with comprehensive content
INSERT INTO public.industry_pages (slug, title, meta_description, hero_heading, hero_subheading, intro_content, educational_content, faq_content, vendor_type_id, related_industries, is_published, sort_order) VALUES

-- 1. Probate Attorney
('probate-attorneys',
 'Jewish Probate & Estate Administration Attorneys',
 'Find experienced probate attorneys who understand Jewish inheritance customs and can guide your family through estate administration.',
 'Probate & Estate Administration Attorneys',
 'Navigating the legal process with compassion and expertise',
 'After losing a loved one, dealing with legal matters can feel overwhelming. A probate attorney guides families through estate administration, ensuring assets are distributed properly while handling the complexities of the legal system.',
 E'## Understanding Probate in Jewish Families\n\nProbate is the legal process of settling an estate after death. For Jewish families, this process often intersects with religious obligations and family dynamics rooted in tradition.\n\n### What Probate Attorneys Handle\n- **Will Validation**: Proving the will is legally valid\n- **Asset Inventory**: Identifying and valuing all estate assets\n- **Debt Settlement**: Paying outstanding debts and taxes\n- **Distribution**: Transferring assets to beneficiaries\n- **Dispute Resolution**: Mediating family disagreements\n\n### When You Need a Probate Attorney\n1. **Complex Estates**: Multiple properties, businesses, or investments\n2. **Family Conflicts**: Potential disputes among heirs\n3. **No Will (Intestate)**: State law determines distribution\n4. **Out-of-State Property**: Multi-jurisdictional estates\n5. **Tax Issues**: Estate tax filing requirements\n\n### Jewish Considerations\n- **Halachic Wills**: Some families have both civil and religious wills\n- **Tzedakah Bequests**: Handling charitable gifts\n- **Family Harmony**: Shalom bayit (peace in the home) as a priority\n- **Timely Resolution**: Allowing family to focus on mourning\n\n### The Probate Timeline\nProbate typically takes 6-12 months, though complex estates may take longer. Your attorney will help set realistic expectations and keep the process moving.',
 '[{"question": "How long does probate take?", "answer": "Simple estates may close in 6-9 months, while complex estates can take 1-2 years. Factors include estate size, number of beneficiaries, disputes, and court schedules."}, {"question": "Can probate be avoided?", "answer": "Yes, through proper estate planning. Living trusts, joint ownership, and beneficiary designations can help assets pass outside of probate. Consult an estate planning attorney."}, {"question": "What if there is no will?", "answer": "When someone dies intestate (without a will), state law determines how assets are distributed. This may not align with the deceased''s wishes or Jewish tradition."}, {"question": "Are probate proceedings public?", "answer": "Yes, probate is a public court process. Wills and inventories become public record. Families concerned about privacy may prefer trusts, which remain private."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'probate-attorney'),
 ARRAY['estate-planning-attorneys', 'financial-advisor', 'trust-administrator'],
 true,
 11),

-- 2. Shiva Coordinator
('shiva-coordinators',
 'Shiva Coordinators & House Managers',
 'Find professional shiva coordinators who handle logistics so your family can focus on mourning and receiving comfort.',
 'Shiva Coordinators',
 'Managing the details so you can focus on healing',
 'Sitting shiva is a sacred time for mourning and receiving comfort. A shiva coordinator handles the practical details—from setting up the home to coordinating meals and visitors—allowing your family to be present in grief.',
 E'## The Role of a Shiva Coordinator\n\nShiva coordinators are professionals who manage the logistics of the seven-day mourning period. They understand Jewish customs and ensure everything runs smoothly while respecting the family''s needs.\n\n### Services Provided\n- **Home Setup**: Low chairs, mirrors covered, memorial candle\n- **Meal Coordination**: Scheduling deliveries, managing dietary needs\n- **Visitor Management**: Greeting guests, maintaining flow\n- **Service Logistics**: Prayer book distribution, minyan coordination\n- **Communication**: Updating community on shiva hours and needs\n\n### Why Hire a Shiva Coordinator?\n1. **Reduced Burden**: Family members can focus on mourning\n2. **Expertise**: Knowledge of customs across denominations\n3. **Logistics**: Managing multiple meals and visitors\n4. **Sensitivity**: Professional handling of difficult moments\n5. **Peace of Mind**: Knowing details are handled\n\n### What to Expect During Shiva\n- **Day 1-3**: Heaviest visiting, most meals needed\n- **Mid-Week**: Sustained support, possible fatigue\n- **Final Days**: Preparing for return to regular life\n- **Getting Up**: Short walk to mark shiva''s end\n\n### Working with Your Coordinator\nShare your family''s level of observance, dietary requirements, expected visitors, and any special needs. The coordinator will customize their approach accordingly.',
 '[{"question": "What does a shiva coordinator cost?", "answer": "Costs vary by location and services needed, typically ranging from $500-$2,000 for the week. Some families hire help for just the first few days when traffic is heaviest."}, {"question": "Can a shiva coordinator help with out-of-town family?", "answer": "Yes, many coordinators assist with airport pickups, hotel arrangements, and ensuring out-of-town family members are integrated into the shiva experience."}, {"question": "What if we have a small family and don''t expect many visitors?", "answer": "Coordinators can scale their services. Even for small shivas, help with meal coordination and home setup can be valuable. Some offer basic packages."}, {"question": "Do shiva coordinators work with all denominations?", "answer": "Most professional coordinators are familiar with Orthodox, Conservative, and Reform customs and can adapt to your family''s level of observance."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'shiva-coordinator'),
 ARRAY['shiva-caterers', 'florists', 'rabbi'],
 true,
 12),

-- 3. Memorial Videographer
('memorial-videographers',
 'Memorial Video & Tribute Services',
 'Create lasting video tributes honoring your loved one with professional memorial videography and photo montage services.',
 'Memorial Videographers',
 'Preserving precious memories through film',
 'A memorial video captures the essence of a life—the smile, the voice, the moments that mattered. Professional memorial videographers create lasting tributes that families treasure for generations.',
 E'## Types of Memorial Video Services\n\nModern memorial videography offers many ways to honor and remember your loved one, from simple photo montages to comprehensive documentary-style tributes.\n\n### Service Options\n- **Photo Montage**: Photos set to meaningful music\n- **Video Biography**: Interviews and archival footage\n- **Funeral Recording**: Document the service for those who couldn''t attend\n- **Shiva Memories**: Capture stories shared during mourning\n- **Legacy Interviews**: Pre-need recordings while loved ones are still with us\n\n### Creating a Meaningful Tribute\n1. **Gather Materials**: Photos, videos, documents, memorabilia\n2. **Select Music**: Meaningful songs, Jewish melodies\n3. **Identify Themes**: Career, family, faith, hobbies\n4. **Include Voices**: Audio clips if available\n5. **Review and Refine**: Family input on final edit\n\n### When to Create a Memorial Video\n- **Before the Funeral**: For display at the service\n- **During Shiva**: To share with visitors\n- **For the Unveiling**: One year commemoration\n- **Yahrzeit**: Annual remembrance\n- **Pre-Need**: While the person is still living\n\n### Jewish Considerations\nSome families avoid videography on Shabbat or Jewish holidays. Discuss timing and customs with your videographer to ensure the project respects your observance level.',
 '[{"question": "How much does a memorial video cost?", "answer": "Simple photo montages start around $200-$500. Full documentary-style videos with interviews can range from $1,000-$5,000+ depending on complexity and length."}, {"question": "How long does it take to create a memorial video?", "answer": "Rush services for funerals can be completed in 24-48 hours. More elaborate tributes take 1-2 weeks. Legacy interview projects may take several months."}, {"question": "Can a memorial video be played at an Orthodox funeral?", "answer": "This varies by community. Some Orthodox families show videos at the shiva house or unveiling rather than at the funeral service. Consult your rabbi."}, {"question": "What if we don''t have many photos or videos?", "answer": "Skilled videographers can work with limited materials, incorporating documents, locations, music, and family narration to create meaningful tributes."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'memorial-videographer'),
 ARRAY['funeral-home', 'obituary-writer', 'rabbi'],
 true,
 13),

-- 4. Professional Obituary Writers
('obituary-writers',
 'Professional Jewish Obituary Writers',
 'Honor your loved one with a beautifully written obituary that captures their life story, Jewish values, and lasting legacy.',
 'Professional Obituary Writers',
 'Crafting words that honor a life well-lived',
 'An obituary is more than an announcement—it''s a tribute that preserves memory for generations. Professional obituary writers help families craft meaningful narratives that honor both the individual and Jewish tradition.',
 E'## The Art of the Jewish Obituary\n\nA well-written obituary weaves together biography, personality, and legacy. For Jewish families, it often includes Hebrew names, religious involvement, and expressions of Jewish values.\n\n### What Professional Writers Provide\n- **Interviews**: Gathering stories from family members\n- **Research**: Verifying facts and dates\n- **Writing**: Crafting compelling narrative\n- **Editing**: Polishing and refining\n- **Formatting**: Meeting publication requirements\n\n### Elements of a Jewish Obituary\n1. **Hebrew Name**: Full Hebrew name with parents'' names\n2. **Life Story**: Key milestones and achievements\n3. **Jewish Life**: Synagogue, observance, Jewish involvement\n4. **Character**: Values, personality, what made them special\n5. **Survivors**: Family members who remain\n6. **Service Information**: Funeral and shiva details\n7. **Memorial Requests**: Tzedakah in lieu of flowers\n\n### Traditional Phrases\n- **z"l (zichrono/a livracha)**: May their memory be a blessing\n- **a"h (alav/aleha hashalom)**: Peace be upon them\n- **HaMakom yenachem**: May God comfort the mourners\n\n### Where to Publish\n- Local and national newspapers\n- Jewish publications and websites\n- Funeral home websites\n- Jewish obituary databases\n- Social media memorials',
 '[{"question": "How much does a professional obituary cost?", "answer": "Professional obituary writing typically costs $150-$500 depending on length and complexity. Publication fees in newspapers are additional and vary by outlet."}, {"question": "How quickly can an obituary be written?", "answer": "Rush obituaries can be completed in 24-48 hours for funeral announcements. More detailed life stories for memorials may take a week or more."}, {"question": "Should we include the cause of death?", "answer": "This is a personal choice. Jewish tradition doesn''t require it. Many families simply note the person ''passed away peacefully'' or include it only for awareness purposes."}, {"question": "Can we include both Hebrew and English dates?", "answer": "Yes, including both is common in Jewish obituaries. The Hebrew date connects to yahrzeit observance. Writers can help calculate and format both dates."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'obituary-writer'),
 ARRAY['funeral-home', 'memorial-videographer', 'rabbi'],
 true,
 14),

-- 5. Jewish Genealogists
('jewish-genealogists',
 'Jewish Genealogists & Family History Research',
 'Discover your Jewish roots with professional genealogists specializing in Jewish family history, Holocaust research, and heritage documentation.',
 'Jewish Genealogists',
 'Uncovering your family''s journey through history',
 'Jewish genealogy is both a personal quest and a sacred obligation—to remember those who came before us. Professional Jewish genealogists specialize in navigating unique records, languages, and historical contexts of Jewish family history.',
 E'## Why Jewish Genealogy Is Unique\n\nJewish family history research requires specialized knowledge of Hebrew and Yiddish records, understanding of Jewish naming patterns, and familiarity with the complex history of Jewish communities worldwide.\n\n### What Jewish Genealogists Do\n- **Document Research**: Vital records, immigration papers, census data\n- **Holocaust Research**: Yad Vashem, ITS archives, survivor testimonies\n- **DNA Analysis**: Interpreting Jewish genetic heritage\n- **Translation**: Hebrew, Yiddish, Ladino, and other languages\n- **Shtetl Research**: Tracing roots to ancestral towns\n- **Family Trees**: Creating comprehensive genealogical charts\n\n### Common Research Goals\n1. **Immigration Stories**: When and how family came to America\n2. **Holocaust Documentation**: Finding lost relatives and their fates\n3. **Citizenship Claims**: German, Polish, Portuguese restoration\n4. **Kohen/Levi Status**: Documenting patrilineal descent\n5. **Burial Information**: Locating ancestral graves\n\n### Resources for Jewish Genealogy\n- **JewishGen.org**: Comprehensive database and forums\n- **Yad Vashem**: Holocaust victim database\n- **JRI-Poland**: Jewish Records Indexing\n- **YIVO Archives**: Eastern European Jewish records\n- **FamilySearch**: LDS database with Jewish records\n\n### Starting Your Research\nBegin with what you know—interview older relatives, gather documents, and record family stories. A professional genealogist can then help break through brick walls and access specialized archives.',
 '[{"question": "How much does Jewish genealogy research cost?", "answer": "Hourly rates typically range from $50-$150 depending on expertise. Project-based research might cost $500-$5,000+ depending on scope. Initial consultations are often free or low-cost."}, {"question": "Can Holocaust records really be found?", "answer": "Yes, millions of records exist. Yad Vashem, the International Tracing Service, and various archives hold documentation. Skilled researchers know how to navigate these resources."}, {"question": "My family changed their name at Ellis Island—can I trace the original?", "answer": "The ''Ellis Island name change'' is largely a myth—names weren''t changed there. However, families did Americanize names later. Ship manifests and naturalization records often reveal original names."}, {"question": "How far back can Jewish genealogy go?", "answer": "Most Ashkenazi families can trace to 1800s Eastern Europe. Sephardic families sometimes reach further. Some families with rabbinic lineage can trace to medieval periods. Each case is different."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'jewish-genealogy'),
 ARRAY['rabbi', 'judaica-shop', 'funeral-home'],
 true,
 15),

-- 6. Estate Sale Companies
('estate-sales',
 'Jewish Estate Sale & Liquidation Services',
 'Find estate sale companies experienced in handling Jewish households, including proper disposition of religious items and family heirlooms.',
 'Estate Sale & Liquidation Services',
 'Respectfully managing a lifetime of possessions',
 'After a loss, families often face the daunting task of clearing a home filled with decades of possessions. Estate sale professionals handle this process with care, ensuring items find new homes while maximizing value for the family.',
 E'## Understanding Estate Sales\n\nAn estate sale liquidates the contents of a home, typically after death, downsizing, or major life transition. For Jewish families, this process requires sensitivity to religious items and family heritage.\n\n### What Estate Sale Companies Do\n- **Inventory**: Cataloging all items in the home\n- **Appraisal**: Valuing antiques, collectibles, and everyday items\n- **Pricing**: Setting fair market prices\n- **Marketing**: Advertising the sale\n- **Conducting the Sale**: Managing the event (usually 2-3 days)\n- **Cleanout**: Removing unsold items\n\n### Special Considerations for Jewish Homes\n1. **Religious Items**: Siddurim, tefillin, mezuzot, tallitot\n2. **Hebrew Books**: May have special handling requirements\n3. **Family Judaica**: Kiddush cups, menorahs, Shabbat items\n4. **Holocaust Memorabilia**: Documents, photos, artifacts\n5. **Israel Items**: Artwork, maps, memorabilia\n\n### What Happens to Religious Items?\n- **Mezuzot**: Should go to Jewish homes or genizah\n- **Worn Tefillin/Tallitot**: May need burial (genizah)\n- **Prayer Books**: Should be donated or buried properly\n- **Judaica in Good Condition**: Can be sold or donated\n\n### Choosing an Estate Sale Company\n- Experience with Jewish households\n- Understanding of religious item handling\n- Strong local reputation\n- Clear commission structure (typically 30-50%)\n- Insurance and bonding',
 '[{"question": "What is the typical commission for estate sales?", "answer": "Most estate sale companies charge 30-50% of gross sales. Higher-value estates may negotiate lower percentages. Always get the fee structure in writing."}, {"question": "What should we do with religious items we can''t sell?", "answer": "Items containing God''s name (siddurim, tefillin, mezuzot) should go to a genizah for proper burial. Contact your synagogue or a knowledgeable estate company for guidance."}, {"question": "How long does the estate sale process take?", "answer": "From hiring a company to completing the sale typically takes 2-4 weeks. The actual sale runs 2-3 days, usually Thursday-Saturday or Friday-Sunday."}, {"question": "Can family keep items before the sale?", "answer": "Yes, families should remove personal items, important documents, and anything they want to keep before the company begins. Communicate clearly about what''s included in the sale."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'estate-sale'),
 ARRAY['probate-attorneys', 'cleanout-service', 'senior-move-manager'],
 true,
 16),

-- 7. Bereavement Support Groups
('support-groups',
 'Jewish Bereavement Support Groups',
 'Find grief support groups within the Jewish community offering shared healing, understanding, and connection during mourning.',
 'Bereavement Support Groups',
 'Healing together through shared experience',
 'Grief can feel isolating, but you don''t have to walk this path alone. Jewish bereavement support groups offer community, understanding, and healing in a framework that honors our traditions of mourning.',
 E'## The Power of Shared Grief\n\nJewish tradition has always understood that mourning is communal. From shiva visitors to the minyan for Kaddish, we grieve together. Support groups extend this wisdom beyond the formal mourning period.\n\n### Types of Support Groups\n- **General Bereavement**: For anyone who has experienced loss\n- **Spouse Loss**: Widows and widowers\n- **Parent Loss**: Adult children who''ve lost parents\n- **Child Loss**: The unique grief of bereaved parents\n- **Sibling Loss**: Often overlooked grievers\n- **Suicide Loss**: Specialized support for survivors\n\n### What Happens in Support Groups\n1. **Sharing Stories**: Speaking about your loved one\n2. **Validating Feelings**: Knowing your grief is normal\n3. **Learning Coping Skills**: Practical strategies\n4. **Building Connections**: Friendships with those who understand\n5. **Finding Hope**: Seeing others further in their journey\n\n### Jewish Elements\n- **Yahrzeit Recognition**: Acknowledging anniversaries\n- **Holiday Support**: Navigating difficult times\n- **Jewish Rituals**: How tradition aids healing\n- **Community Connection**: Links to synagogues and services\n\n### Finding the Right Group\n- **Timing**: Most groups meet weekly for 6-12 weeks\n- **Format**: In-person, online, or hybrid\n- **Leadership**: Professional counselor vs. peer-led\n- **Denomination**: Some groups are movement-specific',
 '[{"question": "How soon after a loss should I join a support group?", "answer": "Most people benefit from groups after shiva ends and initial shock subsides—typically 1-3 months after the loss. However, there''s no wrong time if you feel the need for support."}, {"question": "Will I have to share personal details?", "answer": "Sharing is encouraged but never required. Many people listen for several sessions before feeling ready to speak. Good facilitators create safe, pressure-free environments."}, {"question": "Are Jewish support groups only for religious people?", "answer": "No, Jewish bereavement groups welcome all levels of observance. The focus is on shared community and cultural understanding, not religious requirements."}, {"question": "What if I cry during the group?", "answer": "Tears are welcome and expected. Support groups are safe spaces for all emotions. You''ll likely find that others'' tears help you feel less alone in your grief."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'support-group'),
 ARRAY['grief-counselors', 'rabbi', 'hospice-care'],
 true,
 17),

-- 8. Cantors & Funeral Musicians
('funeral-musicians',
 'Cantors & Musicians for Jewish Funerals',
 'Find cantors and musicians to provide meaningful musical accompaniment for Jewish funeral services and memorial gatherings.',
 'Cantors & Funeral Musicians',
 'The healing power of sacred music',
 'Music touches the soul in ways words cannot. A cantor or skilled musician brings profound beauty to funeral services, connecting mourners to tradition and providing comfort through sacred melody.',
 E'## Music in Jewish Mourning\n\nFrom the haunting melody of El Malei Rachamim to the comforting tones of Psalm 23, music has always been central to Jewish mourning. Professional cantors and musicians bring expertise and sensitivity to these sacred moments.\n\n### Musical Elements of Jewish Funerals\n- **El Malei Rachamim**: The memorial prayer\n- **Psalm 23**: \"The Lord is my shepherd\"\n- **Kaddish**: The mourner''s prayer\n- **Ana B''koach**: Ancient mystical prayer\n- **Memorial Songs**: Meaningful melodies for the deceased\n\n### Types of Musical Services\n1. **Cantor (Hazzan)**: Trained liturgical singer\n2. **Solo Vocalist**: For specific songs or prayers\n3. **Instrumentalist**: Violin, cello, guitar, piano\n4. **Ensemble**: Multiple musicians for larger services\n5. **Recording**: When live music isn''t possible\n\n### When Music Is Used\n- **Funeral Service**: During prayers and transitions\n- **Graveside**: As the casket is lowered\n- **Shiva Minyan**: Evening services at the home\n- **Unveiling**: Headstone dedication ceremony\n- **Memorial Services**: Yahrzeit gatherings\n\n### Choosing Music\n- **Traditional Melodies**: Familiar tunes bring comfort\n- **Meaningful Songs**: Favorites of the deceased\n- **Denominational Style**: Match your community''s customs\n- **Live vs. Recorded**: Consider your venue and preferences',
 '[{"question": "Is music allowed at Orthodox funerals?", "answer": "Practices vary. Some Orthodox communities use only a capella singing or no music at all. Others include cantorial chanting. Consult with your rabbi about your community''s customs."}, {"question": "Can we include secular music that was meaningful to the deceased?", "answer": "Many families include meaningful secular songs, especially at memorial services or shiva. This is generally acceptable in Conservative and Reform settings; check with Orthodox rabbis."}, {"question": "How do we find a cantor if we don''t belong to a synagogue?", "answer": "Funeral homes often maintain relationships with cantors who serve non-affiliated families. Cantorial associations can also provide referrals for lifecycle events."}, {"question": "What is the cost for a cantor at a funeral?", "answer": "Fees typically range from $300-$1,000 depending on the cantor''s experience, location, and extent of services. This usually includes the funeral service and may include shiva minyanim."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'funeral-musician'),
 ARRAY['rabbi', 'funeral-home', 'shiva-coordinator'],
 true,
 18),

-- 9. Yahrzeit Reminder Services
('yahrzeit-services',
 'Yahrzeit Reminder & Memorial Services',
 'Never miss a yahrzeit with professional reminder services that help you honor your loved ones on their Hebrew anniversary.',
 'Yahrzeit Reminder Services',
 'Remembering those we''ve lost, year after year',
 'The yahrzeit—the annual anniversary of death—is a sacred obligation to remember our loved ones. Yahrzeit services help ensure this important date is never forgotten, providing reminders and resources for meaningful observance.',
 E'## The Importance of Yahrzeit\n\nObserving yahrzeit connects us to those we''ve lost and to the chain of Jewish memory. Traditionally observed on the Hebrew date of death, yahrzeit includes lighting a memorial candle, reciting Kaddish, and often visiting the grave.\n\n### Traditional Yahrzeit Observances\n- **Ner Neshama**: 24-hour memorial candle\n- **Kaddish**: Recited at services on the yahrzeit\n- **Torah Aliyah**: Being called to the Torah\n- **Cemetery Visit**: Visiting the grave\n- **Tzedakah**: Charitable giving in memory\n- **Learning**: Torah study dedicated to the soul\n\n### What Yahrzeit Services Provide\n1. **Annual Reminders**: Notifications before each yahrzeit\n2. **Hebrew Date Conversion**: Tracking the lunar calendar\n3. **Multiple Dates**: Managing yahrzeits for multiple loved ones\n4. **Resource Guides**: How to observe meaningfully\n5. **Kaddish Coordination**: Finding a minyan or having Kaddish said\n\n### Technology and Tradition\nModern services combine technology with tradition:\n- Email and text reminders\n- Calendar integrations\n- Mobile apps\n- Synagogue memorial boards\n- Online Kaddish services\n\n### Perpetual Memorial Programs\nMany synagogues offer perpetual yahrzeit programs where, for a donation, your loved one''s name is read annually and you receive reminders. This ensures remembrance even across generations.',
 '[{"question": "When exactly is yahrzeit observed?", "answer": "Yahrzeit is observed on the Hebrew date of death, beginning at sundown the evening before. The candle is lit at sundown and burns for 24 hours. In the first year, some observe on the burial date."}, {"question": "What if I don''t know the Hebrew date of death?", "answer": "Many yahrzeit services and websites can convert English dates to Hebrew dates. For deaths before 1900, research may be needed. Some families observe on the English date if Hebrew date is unknown."}, {"question": "Do I observe yahrzeit in a leap year differently?", "answer": "If the death occurred in Adar of a regular year, yahrzeit is observed in Adar II during leap years. Deaths in Adar I or II of a leap year are observed in the same Adar. Consult a rabbi for specific cases."}, {"question": "Can someone else say Kaddish for me?", "answer": "Yes, if you cannot attend services, many synagogues and services offer to have Kaddish recited on your behalf. This is especially common for those without local minyan access."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'yahrzeit-service'),
 ARRAY['rabbi', 'judaica-shop', 'cemetery'],
 true,
 19),

-- 10. Elder Law Attorneys
('elder-law-attorneys',
 'Elder Law Attorneys for Jewish Families',
 'Find elder law attorneys who understand Jewish values around caring for aging parents and can help with Medicare, Medicaid, and long-term care planning.',
 'Elder Law Attorneys',
 'Protecting our elders with wisdom and care',
 'Honoring our parents is a fundamental Jewish value. Elder law attorneys help families navigate the complex legal landscape of aging—from long-term care planning to protecting assets while ensuring quality care.',
 E'## Elder Law and Jewish Values\n\nThe mitzvah of kibbud av va''em (honoring parents) extends to ensuring their care and dignity in old age. Elder law attorneys help families fulfill this obligation while navigating complex regulations.\n\n### What Elder Law Attorneys Handle\n- **Long-Term Care Planning**: Nursing homes, assisted living, home care\n- **Medicaid Planning**: Qualifying for benefits while protecting assets\n- **Medicare Issues**: Appeals, coverage disputes\n- **Guardianship**: When a loved one can''t make decisions\n- **Veterans Benefits**: Aid and attendance for eligible veterans\n- **Elder Abuse**: Protection from financial exploitation\n\n### Planning for Long-Term Care\n1. **Assess Needs**: Current and anticipated care requirements\n2. **Understand Options**: Home care, assisted living, nursing facilities\n3. **Review Finances**: Assets, income, insurance coverage\n4. **Explore Benefits**: Medicaid, Medicare, veterans benefits\n5. **Protect Assets**: Legal strategies for preservation\n\n### Jewish Considerations\n- **Kosher Food Access**: Facilities with kosher options\n- **Shabbat Observance**: Care that respects religious practice\n- **Jewish Community**: Proximity to synagogue and community\n- **End-of-Life**: Halachic considerations in healthcare directives\n\n### When to Consult an Elder Law Attorney\n- Before a health crisis (ideally 5+ years ahead)\n- When considering long-term care options\n- After a diagnosis affecting cognitive function\n- When applying for Medicaid\n- If concerned about financial exploitation',
 '[{"question": "What is Medicaid planning and is it legal?", "answer": "Medicaid planning involves legally restructuring assets to qualify for Medicaid while preserving some wealth for the healthy spouse or heirs. When done properly with an attorney, it is completely legal."}, {"question": "How far in advance should we plan for long-term care?", "answer": "Ideally 5+ years before care is needed, due to Medicaid look-back periods. However, crisis planning is possible—consult an elder law attorney even if care is needed immediately."}, {"question": "Can we choose a Jewish nursing home and still use Medicaid?", "answer": "Yes, if the facility accepts Medicaid. Many Jewish senior facilities participate in Medicaid programs. Planning ahead gives you more choices about where care is received."}, {"question": "What happens if my parent can no longer make decisions?", "answer": "If proper documents (power of attorney, healthcare proxy) are in place, the designated agent can act. Without documents, guardianship through the courts may be necessary—a more costly and time-consuming process."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'elder-law-attorney'),
 ARRAY['estate-planning-attorneys', 'hospice-care', 'financial-advisor'],
 true,
 20)

ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    meta_description = EXCLUDED.meta_description,
    hero_heading = EXCLUDED.hero_heading,
    hero_subheading = EXCLUDED.hero_subheading,
    intro_content = EXCLUDED.intro_content,
    educational_content = EXCLUDED.educational_content,
    faq_content = EXCLUDED.faq_content,
    vendor_type_id = EXCLUDED.vendor_type_id,
    related_industries = EXCLUDED.related_industries,
    is_published = EXCLUDED.is_published,
    sort_order = EXCLUDED.sort_order,
    updated_at = NOW();

DO $$
BEGIN
    RAISE NOTICE 'Added 10 additional high-quality industry pages (Part 9)';
    RAISE NOTICE 'Total published industry pages: 20';
END $$;
