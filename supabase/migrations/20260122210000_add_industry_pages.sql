-- Industry Resource Pages Schema
-- Part 5: Industry Resource Pages
-- January 22, 2026

-- Create industry_pages table for storing content for each industry
CREATE TABLE IF NOT EXISTS public.industry_pages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    meta_description TEXT,
    hero_heading TEXT,
    hero_subheading TEXT,
    intro_content TEXT,
    educational_content TEXT,  -- Rich text / markdown
    faq_content JSONB DEFAULT '[]',  -- Array of {question, answer}
    vendor_type_id UUID REFERENCES public.vendor_types(id) ON DELETE SET NULL,
    related_industries TEXT[] DEFAULT '{}',  -- Array of slugs
    is_published BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_industry_pages_slug ON public.industry_pages(slug);
CREATE INDEX IF NOT EXISTS idx_industry_pages_published ON public.industry_pages(is_published) WHERE is_published = true;
CREATE INDEX IF NOT EXISTS idx_industry_pages_vendor_type ON public.industry_pages(vendor_type_id);

-- Enable RLS
ALTER TABLE public.industry_pages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Anyone can view published industry pages
CREATE POLICY "Anyone can view published industry pages"
    ON public.industry_pages
    FOR SELECT
    TO anon, authenticated
    USING (is_published = true);

-- Only admins can manage industry pages
CREATE POLICY "Admins can manage industry pages"
    ON public.industry_pages
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'admin'
        )
    );

-- Add more vendor types for the 50 industries
INSERT INTO public.vendor_types (name, slug, description, icon, sort_order) VALUES
    -- Legal & Financial
    ('Probate Attorney', 'probate-attorney', 'Probate and estate administration lawyers', 'Gavel', 9),
    ('Elder Law Attorney', 'elder-law-attorney', 'Senior and elder law specialists', 'Scale', 10),
    ('Estate Liquidator', 'estate-liquidator', 'Estate sale and liquidation services', 'Tag', 11),
    ('Financial Advisor', 'financial-advisor', 'Estate and inheritance financial planning', 'TrendingUp', 12),
    ('Life Insurance Agent', 'life-insurance', 'Life insurance providers', 'Shield', 13),
    ('Tax Professional', 'tax-professional', 'Estate tax and inheritance specialists', 'Calculator', 14),
    ('Trust Administrator', 'trust-administrator', 'Trust management services', 'FileText', 15),

    -- Funeral & Memorial
    ('Crematorium', 'crematorium', 'Cremation services', 'Flame', 16),
    ('Casket Provider', 'casket-provider', 'Caskets and burial containers', 'Box', 17),
    ('Urn Supplier', 'urn-supplier', 'Urns and memorial containers', 'Package', 18),
    ('Memorial Products', 'memorial-products', 'Memorial gifts and keepsakes', 'Gift', 19),
    ('Obituary Writer', 'obituary-writer', 'Professional obituary writing services', 'Pen', 20),
    ('Funeral Musician', 'funeral-musician', 'Musicians and cantors for services', 'Music', 21),

    -- Post-Loss Services
    ('Estate Sale Company', 'estate-sale', 'Estate sale and auction services', 'Store', 22),
    ('Cleanout Service', 'cleanout-service', 'Property cleanout and clearing services', 'Trash2', 23),
    ('Senior Move Manager', 'senior-move-manager', 'Relocation assistance for seniors and estates', 'Truck', 24),
    ('Document Shredding', 'document-shredding', 'Secure document destruction', 'FileX', 25),
    ('Digital Legacy Service', 'digital-legacy', 'Digital account and online legacy management', 'Cloud', 26),

    -- Support Services
    ('Hospice Care', 'hospice-care', 'End-of-life hospice services', 'HeartPulse', 27),
    ('Bereavement Support Group', 'support-group', 'Grief support groups and programs', 'Users', 28),
    ('Shiva Coordinator', 'shiva-coordinator', 'Shiva house coordination services', 'Home', 29),
    ('Memorial Videographer', 'memorial-videographer', 'Video tributes and memorial recordings', 'Video', 30),

    -- Jewish-Specific
    ('Chevra Kadisha', 'chevra-kadisha', 'Jewish burial society services', 'Star', 31),
    ('Tahara Service', 'tahara-service', 'Ritual purification services', 'Droplets', 32),
    ('Shomer Service', 'shomer-service', 'Shemirah (watching) services', 'Eye', 33),
    ('Jewish Genealogist', 'jewish-genealogy', 'Jewish family history research', 'Users', 34),
    ('Yahrzeit Service', 'yahrzeit-service', 'Yahrzeit reminder and memorial services', 'Calendar', 35),
    ('Judaica Shop', 'judaica-shop', 'Jewish ritual items and memorial judaica', 'ShoppingBag', 36)
ON CONFLICT (slug) DO NOTHING;

-- Insert initial industry pages with content
INSERT INTO public.industry_pages (slug, title, meta_description, hero_heading, hero_subheading, intro_content, educational_content, faq_content, vendor_type_id, related_industries, is_published, sort_order) VALUES

-- Funeral Homes
('funeral-homes',
 'Jewish Funeral Homes',
 'Find trusted Jewish funeral homes serving your community with traditional tahara, chevra kadisha, and comprehensive funeral services.',
 'Jewish Funeral Homes',
 'Compassionate funeral services honoring Jewish traditions and customs',
 'Finding the right funeral home is an important decision during a difficult time. Jewish funeral homes specialize in honoring the rich traditions of Jewish burial, from tahara (ritual purification) to proper kevura (burial) according to halacha.',
 E'## What to Look for in a Jewish Funeral Home\n\nWhen selecting a Jewish funeral home, consider these important factors:\n\n### Traditional Services\n- **Tahara**: The ritual purification performed by a chevra kadisha (burial society)\n- **Shmirah**: Watching over the deceased until burial\n- **Tachrichim**: Traditional white burial shrouds\n- **Kosher Caskets**: Simple wooden caskets without metal\n\n### Questions to Ask\n1. Do you have a chevra kadisha on staff or work with one?\n2. What denominations do you serve (Orthodox, Conservative, Reform)?\n3. Can you arrange burial in Israel if desired?\n4. Do you offer pre-planning services?\n5. What is included in your basic service package?\n\n### Understanding Costs\nFuneral costs can vary significantly. A basic Jewish funeral typically includes:\n- Professional services fee\n- Transfer of remains\n- Tahara preparation\n- Casket and tachrichim\n- Chapel services\n- Transportation to cemetery\n\nMany funeral homes offer package pricing that can help manage costs while ensuring all traditional requirements are met.',
 '[{"question": "What is tahara and why is it important?", "answer": "Tahara is the ritual purification and preparation of the body performed by a chevra kadisha. It involves washing and dressing the deceased in white shrouds (tachrichim) and is considered a great mitzvah and honor."}, {"question": "How quickly must a Jewish burial take place?", "answer": "Jewish tradition calls for burial as soon as possible, ideally within 24 hours. However, delays are permitted for gathering family, legal requirements, or to honor the deceased properly."}, {"question": "Can non-Jewish family members participate in Jewish funeral services?", "answer": "Yes, non-Jewish family members are welcome to attend and participate in most aspects of the funeral service. The funeral home can guide you on specific customs."}, {"question": "What is shiva and how do funeral homes help?", "answer": "Shiva is the seven-day mourning period after burial. Many funeral homes can help coordinate shiva logistics, including providing chairs, setting up the home, and connecting families with catering services."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'funeral-home'),
 ARRAY['cemetery', 'florist', 'caterer', 'rabbi'],
 true,
 1),

-- Estate Planning Attorneys
('estate-planning-attorneys',
 'Estate Planning Attorneys for Jewish Families',
 'Find experienced estate planning attorneys who understand Jewish values, charitable giving traditions, and multi-generational wealth transfer.',
 'Estate Planning Attorneys',
 'Protect your family''s future with expert legal guidance',
 'Estate planning is both a legal necessity and a Jewish responsibility. The tradition of preparing for succession (yerusha) ensures your assets are distributed according to your wishes while honoring Jewish values of tzedakah and family responsibility.',
 E'## Why Estate Planning Matters in Jewish Tradition\n\nJewish law and tradition have long recognized the importance of proper estate planning. The Torah discusses inheritance rights, and halacha provides guidelines for fair distribution of assets.\n\n### Key Documents You Need\n- **Will (Tzavaah)**: Specifies how assets will be distributed\n- **Living Trust**: Helps avoid probate and provides privacy\n- **Healthcare Directive**: Addresses end-of-life decisions according to Jewish law\n- **Power of Attorney**: Designates someone to make decisions if you cannot\n\n### Jewish Considerations\n1. **Tzedakah Provisions**: Many Jewish families include charitable bequests\n2. **Halachic Wills**: Some families create a halachic will alongside their legal will\n3. **Israel Property**: Special considerations for property in Israel\n4. **Religious Items**: Designating who receives judaica, tefillin, etc.\n\n### When to Update Your Estate Plan\n- After marriage or divorce\n- Birth or adoption of children\n- Significant changes in assets\n- Death of a beneficiary or executor\n- Moving to a new state',
 '[{"question": "What is the difference between a will and a trust?", "answer": "A will takes effect after death and goes through probate. A trust can take effect immediately, avoids probate, and provides more privacy. Many estate plans include both."}, {"question": "How can I ensure my estate plan follows Jewish law?", "answer": "Work with an attorney familiar with Jewish law, or consult with your rabbi. Some families create both a civil will and a halachic will to address both legal and religious requirements."}, {"question": "Should I include tzedakah in my estate plan?", "answer": "Including charitable giving honors the Jewish value of tzedakah. You can designate specific organizations or percentages of your estate for charitable purposes."}, {"question": "How often should I review my estate plan?", "answer": "Review your estate plan every 3-5 years or whenever major life events occur, such as births, deaths, marriages, divorces, or significant financial changes."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'attorney'),
 ARRAY['probate-attorney', 'financial-advisor', 'trust-administrator'],
 true,
 2),

-- Grief Counselors
('grief-counselors',
 'Jewish Grief Counselors & Bereavement Support',
 'Find compassionate grief counselors who understand Jewish mourning traditions and can guide you through the healing process.',
 'Grief Counselors & Bereavement Support',
 'Compassionate support through your journey of mourning',
 'Jewish tradition provides a structured framework for mourning, but grief is deeply personal. Professional grief counselors who understand both the psychological and Jewish aspects of mourning can provide invaluable support.',
 E'## Understanding Jewish Mourning\n\nJewish tradition provides wisdom about grief that modern psychology has come to appreciate. The structured mourning periods—shiva, shloshim, and the first year—provide a framework for processing loss.\n\n### When to Seek Professional Help\n- Difficulty returning to daily activities after shloshim\n- Persistent feelings of guilt or anger\n- Social withdrawal or relationship problems\n- Physical symptoms related to grief\n- Thoughts of self-harm\n\n### Types of Grief Support\n1. **Individual Counseling**: One-on-one sessions with a therapist\n2. **Support Groups**: Shared experiences with others who have lost loved ones\n3. **Family Therapy**: Helping families grieve together\n4. **Children''s Grief Programs**: Age-appropriate support for young mourners\n\n### Jewish Approaches to Grief\n- **Nichum Aveilim**: The mitzvah of comforting mourners\n- **Kaddish**: The healing power of daily prayer\n- **Yahrzeit**: Ongoing remembrance and connection\n- **Tzedakah**: Giving in memory of the deceased',
 '[{"question": "Is it normal to still feel grief after a year?", "answer": "Absolutely. While Jewish tradition marks the first year as a formal mourning period, grief has no fixed timeline. Many people continue to experience waves of grief for years."}, {"question": "How can I support a grieving friend according to Jewish tradition?", "answer": "Visit during shiva, bring food, say \"HaMakom yenachem\" (May God comfort you), attend the funeral and unveiling, and continue to check in throughout the year."}, {"question": "Should I attend a support group or see a counselor?", "answer": "Both can be helpful. Support groups offer peer connection and shared experience, while individual counseling provides personalized attention to your specific needs."}, {"question": "How do I explain death to Jewish children?", "answer": "Be honest using age-appropriate language, include Jewish concepts of memory and the soul, involve them in appropriate mourning rituals, and seek specialized children''s grief support if needed."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'counselor'),
 ARRAY['support-group', 'rabbi', 'hospice-care'],
 true,
 3),

-- Cemeteries
('cemeteries',
 'Jewish Cemeteries & Memorial Parks',
 'Find Jewish cemeteries and memorial parks with available plots, from traditional burial grounds to modern memorial gardens.',
 'Jewish Cemeteries & Memorial Parks',
 'Sacred resting places honoring Jewish tradition',
 'Selecting a Jewish cemetery is an important decision that affects generations. Jewish cemeteries provide consecrated ground (beit olam) where loved ones can rest according to tradition and where families can gather to remember.',
 E'## Choosing a Jewish Cemetery\n\nJewish cemeteries vary in their practices and requirements. Understanding these differences helps you make the right choice for your family.\n\n### Types of Jewish Cemeteries\n- **Orthodox**: Strict traditional requirements, separate sections for kohanim\n- **Conservative**: Traditional practices with some flexibility\n- **Reform**: More flexible policies on burial and markers\n- **Non-Denominational**: Jewish cemeteries welcoming all movements\n\n### What to Consider\n1. **Location**: Proximity for family visits and yahrzeit observance\n2. **Policies**: Interfaith sections, headstone requirements, visiting hours\n3. **Availability**: Plot availability and pricing\n4. **Maintenance**: Perpetual care and grounds upkeep\n5. **Services**: Chapel, tahara room, parking\n\n### Understanding Costs\n- **Plot Cost**: One-time purchase for the burial space\n- **Opening/Closing**: Fee for grave preparation\n- **Perpetual Care**: Ongoing maintenance fund\n- **Headstone Installation**: May have separate fees',
 '[{"question": "Why are Jewish cemeteries separate from general cemeteries?", "answer": "Jewish law requires burial in consecrated ground set aside exclusively for Jewish burial. This ensures the sacred nature of the resting place is maintained in perpetuity."}, {"question": "Can non-Jewish spouses be buried in a Jewish cemetery?", "answer": "This varies by cemetery. Some have interfaith sections, others may allow non-Jewish spouses in family plots. Check with the specific cemetery about their policies."}, {"question": "What is the tradition of placing stones on graves?", "answer": "Placing stones (not flowers) on Jewish graves shows that someone has visited and the deceased is remembered. It''s a beautiful tradition that creates a lasting memorial."}, {"question": "How do I find out if there are available plots in a specific cemetery?", "answer": "Contact the cemetery office directly. Many cemeteries have sections with available plots, and some congregations have reserved sections for members."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'cemetery'),
 ARRAY['funeral-home', 'monument', 'rabbi'],
 true,
 4),

-- Florists
('florists',
 'Sympathy Florists for Jewish Funerals',
 'Find florists experienced in Jewish funeral customs, offering appropriate sympathy arrangements and shiva flowers.',
 'Sympathy Florists',
 'Beautiful arrangements honoring memory with sensitivity',
 'While Jewish tradition emphasizes simplicity in burial, flowers can provide comfort during mourning. Understanding Jewish customs around flowers helps ensure your gesture of sympathy is appropriate and meaningful.',
 E'## Flowers in Jewish Mourning Tradition\n\nThe role of flowers in Jewish funerals varies by community and denomination. Understanding these customs helps you express sympathy appropriately.\n\n### When Flowers Are Appropriate\n- **Shiva Home**: Flowers may be welcome to brighten the mourning home\n- **Memorial Services**: Often appropriate at memorial gatherings\n- **Yahrzeit**: Some families appreciate flowers on the anniversary\n- **Unveiling**: Can be appropriate at headstone unveilings\n\n### Traditional Alternatives\n1. **Charitable Donations**: Give tzedakah in the deceased''s memory\n2. **Meal Deliveries**: Send food to the shiva home\n3. **Shiva Baskets**: Fruit, snacks, and practical items\n4. **Plant Donations**: Trees planted in Israel through JNF\n\n### What to Send\n- Simple, elegant arrangements\n- White flowers (symbolizing purity)\n- Living plants that last beyond shiva\n- Avoid overly festive or colorful displays',
 '[{"question": "Are flowers appropriate at a Jewish funeral?", "answer": "This varies by denomination and family. Orthodox funerals typically do not have flowers at the service, while Reform and some Conservative services may include them. When in doubt, ask the funeral home or send flowers to the shiva home instead."}, {"question": "What should I write on a sympathy card?", "answer": "Traditional phrases include \"May their memory be a blessing\" (Zichrono/a livracha) or \"May you be comforted among the mourners of Zion and Jerusalem.\" Personal memories of the deceased are always meaningful."}, {"question": "What is a better alternative to flowers for an Orthodox family?", "answer": "Make a charitable donation in the deceased''s memory, send food to the shiva home, or arrange for a tree to be planted in Israel. These alternatives honor Jewish values of tzedakah and remembrance."}, {"question": "Can I send flowers to the cemetery?", "answer": "Jewish tradition generally discourages flowers at cemeteries because they emphasize the beauty of death rather than life. Placing a stone during your visit is the traditional way to show you were there."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'florist'),
 ARRAY['funeral-home', 'caterer', 'shiva-coordinator'],
 true,
 5),

-- Shiva Caterers
('shiva-caterers',
 'Kosher Caterers for Shiva & Memorial Services',
 'Find kosher caterers experienced in shiva meals, seudat havraah, and memorial service catering for Jewish families.',
 'Shiva & Memorial Caterers',
 'Nourishing meals during times of mourning',
 'The tradition of bringing food to mourners (hachnasat orchim) is a fundamental mitzvah. Kosher caterers who specialize in shiva understand the unique needs of mourning families and can help ensure this important time is properly supported.',
 E'## The Tradition of Shiva Meals\n\nThe seudat havraah (meal of condolence) is the first meal after the funeral, traditionally provided by friends and neighbors. Throughout shiva, the community continues to bring meals so mourners can focus on grieving.\n\n### Types of Shiva Catering\n- **Full-Service Catering**: Complete meals delivered daily\n- **Drop-Off Platters**: Individual meals and platters\n- **Seudat Havraah**: Traditional first meal packages\n- **Snacks and Beverages**: Coffee, pastries, and light foods\n\n### Traditional Shiva Foods\n1. **Round Foods**: Eggs, bagels (symbolizing the cycle of life)\n2. **Comfort Foods**: Soups, brisket, kugel\n3. **Dairy Options**: Often easier for feeding crowds\n4. **Pareve Desserts**: Allow serving with any meal\n\n### Planning Considerations\n- **Number of Guests**: Shiva attendance varies by day and time\n- **Dietary Restrictions**: Kosher level, allergies, health needs\n- **Space Limitations**: Home kitchen and serving capacity\n- **Scheduling**: Meals around prayer services',
 '[{"question": "What is a seudat havraah?", "answer": "The seudat havraah (meal of condolence) is the first meal eaten by mourners after returning from the cemetery. Tradition holds that it should be provided by others, not prepared by the mourners themselves."}, {"question": "What foods are traditionally served during shiva?", "answer": "Round foods like eggs and bagels symbolize the cycle of life. Hearty, comforting foods like soup, brisket, and kugel are common. The meal should be simple but nourishing."}, {"question": "How do I organize meal deliveries for a shiva?", "answer": "Many communities use online meal scheduling tools. You can also contact the family''s synagogue, as the sisterhood often coordinates shiva meals. Professional caterers can handle all meals if preferred."}, {"question": "What level of kashrut should I follow for shiva meals?", "answer": "Follow the kashrut standards of the mourning family. When in doubt, kosher-certified or clearly labeled pareve items are safest. The caterer should be able to provide appropriate supervision."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'caterer'),
 ARRAY['funeral-home', 'shiva-coordinator', 'florist'],
 true,
 6),

-- Monument Companies
('monuments',
 'Jewish Headstones & Monument Companies',
 'Find monument companies specializing in Jewish headstones and memorials, from traditional matzevot to custom designs.',
 'Headstones & Monument Companies',
 'Creating lasting tributes in stone',
 'The matzeivah (headstone) serves as a permanent marker and memorial for the deceased. Jewish tradition places importance on this monument, which is typically unveiled about a year after burial.',
 E'## Jewish Headstone Traditions\n\nThe matzeivah is more than a marker—it''s a lasting tribute that identifies the resting place for visitors and preserves the memory of the deceased for generations.\n\n### Traditional Elements\n- **Hebrew Name**: The deceased''s Hebrew name and father''s name\n- **Dates**: Both English and Hebrew dates common\n- **Symbols**: Star of David, menorah, kohen hands, or other symbols\n- **Inscriptions**: Hebrew phrases like \"Here lies...\" (פ\"נ)\n- **TNTZB\"H**: \"May their soul be bound in the bond of life\"\n\n### Headstone Styles\n1. **Traditional Upright**: Most common in Jewish cemeteries\n2. **Flat/Lawn-Level**: Required in some memorial parks\n3. **Double/Companion**: For couples to share\n4. **Family Monuments**: Larger stones for family plots\n\n### The Unveiling Ceremony\n- Typically held 11-12 months after burial\n- Simple ceremony with prayers\n- Removal of covering from the stone\n- Family and friends gather to remember',
 '[{"question": "When should a headstone be placed?", "answer": "Jewish tradition typically waits until near the end of the first year of mourning, though customs vary. The unveiling ceremony is often held around the 11-month mark or on the first yahrzeit."}, {"question": "What should be inscribed on a Jewish headstone?", "answer": "Traditional inscriptions include the Hebrew name, father''s name, dates (Hebrew and English), and the phrase TNTZB\"H. Many also include English text with biographical information."}, {"question": "Are there restrictions on headstone design in Jewish cemeteries?", "answer": "Yes, many Jewish cemeteries have specific requirements regarding size, material, and design. Orthodox cemeteries may be more restrictive than Reform. Always check with the cemetery before ordering."}, {"question": "What is the meaning of placing stones on graves?", "answer": "Placing stones rather than flowers is a Jewish tradition signifying that someone visited and remembers the deceased. The stones remain as permanent markers of love and remembrance."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'monument'),
 ARRAY['cemetery', 'funeral-home', 'rabbi'],
 true,
 7),

-- Rabbis
('rabbis',
 'Rabbis for Funerals & Memorial Services',
 'Find rabbis available for Jewish funerals, unveilings, and memorial services across all denominations.',
 'Rabbis for Funerals & Memorials',
 'Spiritual guidance during times of loss',
 'A rabbi provides essential spiritual leadership during one of life''s most difficult transitions. Whether you have a synagogue affiliation or need to find a rabbi, having proper religious guidance ensures your loved one is honored according to Jewish tradition.',
 E'## The Rabbi''s Role in Jewish Funerals\n\nThe rabbi serves as spiritual guide, teacher, and comforter. Their presence ensures the funeral honors both Jewish tradition and the unique life of the deceased.\n\n### Services Provided\n- **Funeral Officiating**: Leading the service and delivering the hesped (eulogy)\n- **Shiva Visits**: Pastoral calls during the mourning period\n- **Unveiling**: Leading the headstone dedication ceremony\n- **Yahrzeit Guidance**: Ongoing spiritual support\n- **Family Consultation**: Meeting to learn about the deceased\n\n### Finding the Right Rabbi\n1. **Synagogue Affiliation**: Your synagogue rabbi is the natural choice\n2. **Denomination Match**: Find a rabbi who shares your family''s approach\n3. **Availability**: Ensure availability for your timeline\n4. **Personal Connection**: Meet beforehand when possible\n\n### Working with the Rabbi\n- Share stories and memories of the deceased\n- Discuss any special requests or customs\n- Provide biographical information\n- Communicate family dynamics respectfully',
 '[{"question": "Do we need a rabbi for a Jewish funeral?", "answer": "While a rabbi is traditional, a funeral can be led by a knowledgeable community member if no rabbi is available. However, a rabbi provides spiritual authority and expertise in Jewish mourning customs."}, {"question": "What if we don''t belong to a synagogue?", "answer": "Many rabbis are available to officiate for non-members. Funeral homes often maintain relationships with rabbis who serve the broader community. There may be an honorarium involved."}, {"question": "Can a rabbi from a different denomination officiate?", "answer": "This depends on the family''s preferences and the specific circumstances. A Reform rabbi may serve an Orthodox family if that''s what the family wishes, though traditional families often prefer a rabbi of their own movement."}, {"question": "What information should we provide the rabbi?", "answer": "Share the deceased''s Hebrew name, parents'' names, biographical information, meaningful stories, values they embodied, and any special requests. The more the rabbi knows, the more personal the service will be."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'rabbi'),
 ARRAY['funeral-home', 'chevra-kadisha', 'cemetery'],
 true,
 8),

-- Chevra Kadisha
('chevra-kadisha',
 'Chevra Kadisha - Jewish Burial Societies',
 'Find chevra kadisha services for tahara and traditional Jewish burial preparation in your community.',
 'Chevra Kadisha Services',
 'The sacred duty of preparing the deceased',
 'The chevra kadisha (holy society) performs one of the greatest mitzvot in Judaism—preparing the deceased for burial. This sacred work, performed with dignity and respect, ensures every Jew is buried with honor.',
 E'## Understanding the Chevra Kadisha\n\nThe chevra kadisha performs tahara (ritual purification) and prepares the body for burial according to halacha. Members of the chevra kadisha consider this service a great honor.\n\n### What the Chevra Kadisha Does\n- **Tahara**: Ritual washing and purification of the body\n- **Dressing**: Placing the body in tachrichim (white shrouds)\n- **Placement**: Properly positioning in the casket\n- **Prayers**: Reciting appropriate prayers throughout\n- **Shmirah**: May arrange for shomer (watching) services\n\n### Tahara Process\n1. Body is treated with utmost respect and modesty\n2. Ritual washing with prayers\n3. Drying and dressing in shrouds\n4. Placement in casket with tallit (for men)\n5. Earth from Israel may be placed with the body\n\n### Joining a Chevra Kadisha\nMany communities welcome volunteers. This mitzvah is considered especially meritorious as it cannot be repaid by the recipient.',
 '[{"question": "What is tahara?", "answer": "Tahara is the ritual purification of the deceased, involving washing the body while reciting prayers. It prepares the soul for its journey while showing ultimate respect for the physical form that housed it."}, {"question": "Who performs tahara?", "answer": "Members of the chevra kadisha—trained volunteers who have studied the laws and procedures. Men prepare men and women prepare women, always with same-gender teams."}, {"question": "Can family members participate?", "answer": "Traditionally, family members do not participate in tahara. The chevra kadisha performs this service as a gift to both the deceased and the family, allowing mourners to begin their grieving."}, {"question": "Is tahara required for Jewish burial?", "answer": "Tahara is strongly encouraged in Jewish law. However, in certain circumstances (trauma, autopsy, or explicit wishes), alternatives may be discussed with a rabbi."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'chevra-kadisha'),
 ARRAY['funeral-home', 'rabbi', 'tahara-service'],
 true,
 9),

-- Hospice Care
('hospice-care',
 'Jewish Hospice & End-of-Life Care',
 'Find hospice services that honor Jewish traditions and provide compassionate end-of-life care for patients and families.',
 'Jewish Hospice Care',
 'Compassionate care honoring life and tradition',
 'Jewish hospice care provides comfort and dignity at life''s end while respecting Jewish values and traditions. Understanding the intersection of modern hospice practice and Jewish law helps families navigate this sacred time.',
 E'## Jewish Perspectives on Hospice Care\n\nJudaism values both the preservation of life (pikuach nefesh) and the alleviation of suffering. Hospice care, when appropriate, can honor both values while providing comfort to patients and families.\n\n### What Jewish Hospice Provides\n- **Pain Management**: Ensuring comfort according to medical ethics\n- **Spiritual Support**: Chaplains familiar with Jewish tradition\n- **Family Support**: Counseling and practical assistance\n- **Respect for Tradition**: Shabbat observance, kosher meals, prayer times\n- **Halachic Guidance**: Consultation on Jewish law questions\n\n### Halachic Considerations\n1. **Active Treatment vs. Comfort Care**: When to transition\n2. **Nutrition and Hydration**: Halachic perspectives\n3. **Presence of Family**: Jewish values of accompaniment\n4. **Advance Directives**: Creating halachically informed documents\n\n### Finding Jewish Hospice Services\n- Jewish-affiliated hospice programs\n- Hospices with Jewish chaplaincy\n- Home hospice with Jewish support\n- Palliative care consultations',
 '[{"question": "Is hospice care permitted in Jewish law?", "answer": "Yes, when curative treatment is no longer beneficial, hospice care that focuses on comfort while allowing natural death is consistent with Jewish law. Consult a rabbi familiar with medical halacha for specific situations."}, {"question": "Can hospice patients observe Jewish traditions?", "answer": "Good hospice programs accommodate religious practices. This includes kosher food, Shabbat observance, prayer times, and visits from rabbis. Jewish hospices specialize in these accommodations."}, {"question": "What is the Jewish view on pain medication at end of life?", "answer": "Judaism permits and even encourages alleviating suffering. Pain medication is appropriate even if it might have secondary effects, as long as the intention is comfort, not hastening death."}, {"question": "How can we ensure a Jewish death?", "answer": "Work with hospice staff to ensure presence of family, opportunity for final prayers (vidui), and immediate notification to the chevra kadisha. A Jewish chaplain or rabbi can guide this process."}]',
 (SELECT id FROM public.vendor_types WHERE slug = 'hospice-care'),
 ARRAY['grief-counselor', 'rabbi', 'funeral-home'],
 true,
 10)

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

-- Add comment
COMMENT ON TABLE public.industry_pages IS 'Stores industry resource page content for the vendor directory, including educational content, FAQs, and related vendor listings.';

DO $$
BEGIN
    RAISE NOTICE 'Created industry_pages table with 10 initial pages';
    RAISE NOTICE 'Added 28 new vendor_types for expanded industry coverage';
END $$;
