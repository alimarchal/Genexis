<?php

namespace Database\Seeders;

use App\Models\NewsAnnouncement;
use Illuminate\Database\Seeder;

class NewsAnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample news announcements
        // NewsAnnouncement::create([
        //     'title' => 'New Digital Banking Services Launch',
        //     'content' => 'Bank of Azad Jammu & Kashmir is excited to announce the launch of our new digital banking services. These services will provide customers with convenient access to their accounts, transfer capabilities, and much more from the comfort of their homes.',
        //     'image' => 'https://via.placeholder.com/800x600/1e40af/ffffff?text=Digital+Banking',
        //     'published_date' => now()->subDays(5),
        //     'is_featured' => true,
        //     'category' => 'banking',
        //     'slug' => 'new-digital-banking-services-launch',
        //     'is_published' => true,
        // ]);

        // NewsAnnouncement::create([
        //     'title' => 'Extended Banking Hours for Eid',
        //     'content' => 'In preparation for the upcoming Eid celebrations, Bank of Azad Jammu & Kashmir will be extending banking hours at select branches. This will ensure our customers have convenient access to banking services during the festive season.',
        //     'image' => 'https://via.placeholder.com/800x600/059669/ffffff?text=Eid+Banking',
        //     'published_date' => now()->subDays(10),
        //     'is_featured' => true,
        //     'category' => 'announcements',
        //     'slug' => 'extended-banking-hours-for-eid',
        //     'is_published' => true,
        // ]);

        // NewsAnnouncement::create([
        //     'title' => 'New Branch Opening in Muzaffarabad',
        //     'content' => 'We are pleased to announce the opening of our new branch in Muzaffarabad. This new location will serve the growing needs of our customers in the region with full banking services.',
        //     'image' => 'https://via.placeholder.com/800x600/dc2626/ffffff?text=New+Branch',
        //     'published_date' => now()->subDays(15),
        //     'is_featured' => false,
        //     'category' => 'general',
        //     'slug' => 'new-branch-opening-in-muzaffarabad',
        //     'is_published' => true,
        // ]);



  NewsAnnouncement::create([
            'title' => 'BAJK Celebrates Record-Breaking Rs. 46 Billion Deposit Milestone',
 'content' => 'Muzaffarabad, July 01, 2025 – The Bank of Azad Jammu & Kashmir (BAJK) has made history by crossing <strong>Rs. 46 billion in deposits</strong>, setting a new benchmark in its financial journey.<br><br>

A ceremony was held at <strong>BAJK\'s Main Branch Muzaffarabad</strong> to commemorate this achievement. The event was presided over by <strong>Mr. Khan Abdul Majid Khan</strong>, Minister for Finance & Cooperative AJK and <strong>Chairman of BAJK</strong>, who lauded the efforts of <strong>President/CEO Mr. Shahid Shahzad Mir</strong>, the dedicated BAJK team, and all stakeholders.<br><br>

Divisional heads, executives, and officials were also present on this momentous occasion.<br><br>

In his address, Chairman Mr. Khan Abdul Majid Khan outlined the bank\'s ambitious roadmap, highlighting its imminent transition to a <strong>scheduled bank</strong>. He called upon employees to <strong>embrace upcoming challenges and opportunities</strong> with renewed vigor. Reiterating BAJK\'s customer-centric approach, he emphasized treating clients with the utmost <strong>respect, dignity, and care</strong>. The Chairman also reaffirmed the bank\'s commitment to <strong>employee growth and development</strong>, ensuring that staff progression keeps pace with institutional expansion.<br><br>

Earlier, <strong>President/CEO Mr. Shahid Shahzad Mir</strong> revealed that BAJK had not only achieved unprecedented deposit growth but had also surpassed its <strong>December 2025 profit targets six months ahead of schedule in June 2025</strong>. He attributed this success to the <strong>collective hard work of the BAJK team, DH CRBD, all Regional Heads, managers, and the entire field team</strong>, unwavering stakeholder support, and the visionary leadership of the AJK Prime Minister, Chairman BAJK, and the Board of Directors.<br><br>

The celebrations culminated in a <strong>traditional cake-cutting ceremony</strong>, marking this significant achievement and symbolizing BAJK\'s promising future.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>مظفرآباد، 01 جولائی 2025</strong> – بینک آف آزاد جموں و کشمیر (BAJK) نے تاریخ رقم کرتے ہوئے <strong>46 ارب روپے کے ڈیپازٹس</strong> کا سنگِ میل عبور کر لیا، جو کہ اس کے مالی سفر میں ایک نئی کامیابی کی علامت ہے۔<br><br>

اس اہم کامیابی کی یاد میں BAJK کی مرکزی شاخ مظفرآباد میں ایک پروقار تقریب منعقد ہوئی۔ اس موقع کی صدارت وزیر خزانہ و تعاون حکومت آزاد جموں و کشمیر اور چیئرمین BAJK، <strong>جناب خان عبدالمجید خان</strong> نے کی، جنہوں نے <strong>صدر/سی ای او جناب شاہد شہزاد میر</strong>، BAJK کی محنتی ٹیم اور تمام اسٹیک ہولڈرز کی کاوشوں کو سراہا۔<br><br>

تقریب میں ڈویژنل سربراہان، اعلیٰ افسران، اور دیگر عملہ بھی شریک تھا۔<br><br>

اپنے خطاب میں چیئرمین جناب خان عبدالمجید خان نے بینک کے مستقبل کے جامع منصوبے کا خاکہ پیش کیا، جس میں جلد <strong>شیڈیول بینک</strong> میں منتقلی کو نمایاں حیثیت دی گئی۔ انہوں نے ملازمین پر زور دیا کہ وہ آئندہ چیلنجز اور مواقع کو نئی توانائی اور جذبے کے ساتھ قبول کریں۔<br><br>

انہوں نے BAJK کی <strong>کسٹمر سینٹرک اپروچ</strong> کو اجاگر کرتے ہوئے کہا کہ صارفین سے عزت، وقار اور خلوص کے ساتھ پیش آنا ہماری اولین ترجیح ہے۔ چیئرمین نے یہ بھی یقین دلایا کہ ادارے کی ترقی کے ساتھ ساتھ <strong>ملازمین کی پیشہ ورانہ ترقی</strong> بھی یقینی بنائی جائے گی۔<br><br>

قبل ازیں، <strong>صدر/سی ای او جناب شاہد شہزاد میر</strong> نے انکشاف کیا کہ نہ صرف بینک نے ریکارڈ ڈیپازٹ گروتھ حاصل کی ہے بلکہ <strong>دسمبر 2025 کے منافع کے اہداف</strong> کو بھی چھ ماہ قبل <strong>جون 2025</strong> میں عبور کر لیا ہے۔<br><br>

انہوں نے اس کامیابی کو <strong>BAJK ٹیم، DH CRBD، تمام ریجنل ہیڈز، منیجرز، فیلڈ ٹیم، اسٹیک ہولڈرز کے تعاون</strong> اور وزیر اعظم آزاد کشمیر، چیئرمین BAJK اور بورڈ آف ڈائریکٹرز کی وژنری قیادت کا نتیجہ قرار دیا۔<br><br>

تقریب کا اختتام ایک <strong>روایتی کیک کاٹنے کی تقریب</strong> پر ہوا، جو اس اہم کامیابی کی خوشی اور BAJK کے روشن مستقبل کی علامت تھی۔
</div>',
            'image' => 'news-images/46 million.jpg',
            'published_date' => '2025-07-01',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'bajk-celebrates-record-breaking-rs-46-billion-deposit-milestone',
            'is_published' => true,
        ]);

  NewsAnnouncement::create([
            'title' => '90th Meeting of the Board of Directors of Bank of Azad Jammu & Kashmir (BAJK) Held Successfully',
           'content' => '<div dir="ltr">
The 90th meeting of the Board of Directors of Bank of Azad Jammu & Kashmir (BAJK) was held at the Bank\'s Head Office in Muzaffarabad on Tuesday. The meeting was chaired by Mr. Khan Abdul Majid Khan, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of BAJK.<br>
All members attended the meeting in person, except Ms. Bushra Naz Malik, who joined via Zoom. Mr. Mubashar Nabi also participated following the notification of his further extension as a Board member.<br><br>

<strong>Key Attendees:</strong><br>
President & CEO Mr. Shahid Shahzad Mir,<br>
Secretary Finance, AJK Mr. Islam Zaib,<br>
Secretary Industries & Commerce Mr. Khalid Mahmood Mirza,<br>
Secretary Law & Justice Mr. Muhammad Sajjad,<br>
Ms. Bushra Naz Malik (via Zoom),<br>
Mr. Mubashar Nabi,<br>
Company Secretary Dr. Adnanullah Khan.<br><br>

<strong>Key Discussions & Decisions:</strong><br>
1. Core Banking System Upgrade:<br>
Progress on the MoU with Silverlake for modernizing BAJK\'s Core Banking System was reviewed, ensuring enhanced digital banking services, operational efficiency, and speedy implementation.<br><br>

2. Other Strategic Matters:<br>
The Board discussed ongoing and future initiatives to strengthen financial performance, customer service, and technological advancement.<br><br>

<strong>Chairman\'s Appreciation:</strong><br>
Chairman Mr. Khan Abdul Majid Khan praised the efforts of BAJK\'s management, Board members, and stakeholders in driving the Bank\'s success. He emphasized the commitment to innovation, growth, and excellence, reinforcing BAJK\'s vision to become a leading financial institution in the region.<br><br>

<strong>Way Forward:</strong><br>
The Board reiterated its focus on sustainable growth, service expansion, and the adoption of advanced banking technologies to better serve customers and stakeholders.
</div>

<hr>

<div dir="rtl" style="text-align: right;">
بینک آف آزاد جموں و کشمیر (BAJK) کے بورڈ آف ڈائریکٹرز کا 90 واں اجلاس منگل کے روز بینک کے ہیڈ آفس مظفرآباد میں منعقد ہوا۔ اجلاس کی صدارت محترم خان عبدالمجید خان، وزیر خزانہ و کوآپریٹو، حکومت آزاد جموں و کشمیر، اور چیئرمین BAJK نے کی۔<br><br>

تمام اراکین نے اجلاس میں ذاتی طور پر شرکت کی، سوائے محترمہ بشریٰ ناز ملک کے، جنہوں نے زوم کے ذریعے شرکت کی۔ جناب مبشر نبی نے بھی اجلاس میں شرکت کی، جنہیں بطور بورڈ ممبر مزید توسیع دی گئی ہے۔<br><br>

<strong>اہم شرکاء:</strong><br>
صدر و سی ای او جناب شاہد شہزاد میر<br>
سیکرٹری خزانہ، آزاد کشمیر جناب اسلام زیب<br>
سیکرٹری صنعت و تجارت جناب خالد محمود مرزا<br>
سیکرٹری قانون و انصاف جناب محمد سجاد<br>
محترمہ بشریٰ ناز ملک (زوم کے ذریعے)<br>
جناب مبشر نبی<br>
کمپنی سیکرٹری ڈاکٹر عدنان اللہ خان<br><br>

<strong>اہم امور و فیصلے:</strong><br>
<strong>1. کور بینکنگ سسٹم کی اپ گریڈیشن:</strong><br>
سلورلیک کمپنی کے ساتھ کور بینکنگ سسٹم کو جدید بنانے کے معاہدے (MoU) میں پیش رفت کا جائزہ لیا گیا، تاکہ ڈیجیٹل بینکنگ خدمات، آپریشنل کارکردگی، اور تیزی سے عملدرآمد کو بہتر بنایا جا سکے۔<br><br>

<strong>2. دیگر حکمتِ عملی امور:</strong><br>
بورڈ نے مالی کارکردگی، صارف خدمات، اور ٹیکنالوجی میں ترقی سے متعلق موجودہ اور مستقبل کے اقدامات پر تبادلہ خیال کیا۔<br><br>

<strong>چیئرمین کی ستائش:</strong><br>
چیئرمین محترم خان عبدالمجید خان نے بینک کی انتظامیہ، بورڈ اراکین اور اسٹیک ہولڈرز کی کوششوں کو سراہا، جنہوں نے بینک کی کامیابی میں اہم کردار ادا کیا۔ انہوں نے جدت، ترقی اور عمدگی کے عزم پر زور دیا، اور کہا کہ بینک کو خطے کا ایک ممتاز مالیاتی ادارہ بنانے کے ویژن کو مزید مضبوط کیا جا رہا ہے۔<br><br>

<strong>آئندہ کا لائحہ عمل:</strong><br>
بورڈ نے پائیدار ترقی، سروسز کی توسیع، اور جدید بینکاری ٹیکنالوجیز کو اپنانے پر زور دیا تاکہ صارفین اور اسٹیک ہولڈرز کو بہتر خدمات فراہم کی جا سکیں۔<br>
</div>',

            'image' => 'news-images/90thmeeting.jpg',
            'published_date' => '2025-06-25',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => '90th-meeting-board-of-directors-bajk-held-successfully',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Bank of Azad Jammu & Kashmir Holds 89th Board Meeting: Strategic Approvals and Vision for Future Growth',
           'content' => '<strong>BAJK Board of Directors 89th Meeting Held at Bank Head Office, Muzaffarabad</strong><br>
Muzaffarabad<br>
June 04, 2025<br>
The 89th meeting of the Board of Directors of Bank of Azad Jammu & Kashmir (BAJK) was held on Wednesday at the Bank’s Head Office in Muzaffarabad under the chairmanship of Mr. Khan Abdul Majid Khan, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of BAJK.<br>
The meeting was attended by President & CEO Mr. Shahid Shahzad Mir, members of the Board of Directors, Secretary Finance, AJK Mr. Islam Zaib, Secretary Industries & Commerce Mr. Khalid Mahmood Mirza, Secretary Law & Justice Mr. Muhammad Sajjad, Ms. Bushra Naz Malik (via Zoom), and Company Secretary Dr. Adnanullah Khan.<br><br>

<strong>Key Agenda Items Discussed & Approved:</strong><br>
1. Financial Accounts (Q1 2025): The Board reviewed and approved the financial results for the first quarter of 2025, reflecting strong growth in profitability, assets, deposits, and remittances.<br><br>
2. Core Banking Modernization (MoU with Silverlake): A detailed briefing was given on the Memorandum of Understanding (MoU) with Silverlake for the upgradation of BAJK’s Core Banking System, aimed at enhancing digital banking services and operational efficiency.<br><br>
3. Consumer-Friendly Initiatives: Multiple public-oriented steps were discussed.<br><br>

<strong>Chairman’s Remarks:</strong><br>
Chairman Mr. Khan Abdul Majid Khan commended the dedication of BAJK’s team, management, and stakeholders in achieving remarkable milestones. He reiterated the Bank’s commitment to excellence, innovation, and growth, ensuring BAJK emerges as a leading financial institution under the government’s patronage.<br><br>

<strong>Future Vision:</strong><br>
The Board reaffirmed its resolve to sustain progress, expand services, and adopt cutting-edge banking technologies for the benefit of customers and stakeholders.<br><br><br>

<div dir="rtl" style="text-align: right;">
<strong>بینک آف آزاد جموں و کشمیر کے بورڈ آف ڈائریکٹرز کا 89 واں اجلاس</strong><br>
مظفرآباد<br>
4 جون 2025<br><br>

بینک آف آزاد جموں و کشمیر (BAJK) کے بورڈ آف ڈائریکٹرز کا 89 واں اجلاس بدھ کے روز بینک کے ہیڈ آفس مظفرآباد میں منعقد ہوا۔ اجلاس کی صدارت محترم خان عبدالماجد خان، وزیر خزانہ و کوآپریٹو، حکومت آزاد جموں و کشمیر اور چیئرمین BAJK نے کی۔<br><br>

اجلاس میں صدر و چیف ایگزیکٹو آفیسر جناب شاہد شہزاد میر، بورڈ آف ڈائریکٹرز کے ممبران، سیکرٹری خزانہ آزاد کشمیر جناب اسلام زیب، سیکرٹری صنعت و تجارت جناب خالد محمود مرزا، سیکرٹری قانون و انصاف جناب محمد سجاد، محترمہ بشریٰ ناز ملک (زوم کے ذریعے)، اور کمپنی سیکرٹری ڈاکٹر عدنان اللہ خان نے شرکت کی۔<br><br>

<strong>زیر بحث اور منظور شدہ اہم ایجنڈا نکات:</strong><br>
1. مالیاتی اکاؤنٹس (پہلی سہ ماہی 2025): بورڈ نے سال 2025 کی پہلی سہ ماہی کے مالیاتی نتائج کا جائزہ لیا اور منظوری دی، جن میں منافع، اثاثہ جات، ڈپازٹس اور ترسیلات زر میں نمایاں اضافہ ظاہر کیا گیا۔<br><br>

2. کور بینکنگ نظام کی جدید کاری (Silverlake کے ساتھ مفاہمتی یادداشت): Silverlake کمپنی کے ساتھ کور بینکنگ سسٹم کی اپ گریڈیشن سے متعلق مفاہمتی یادداشت (MoU) پر تفصیلی بریفنگ دی گئی، جس کا مقصد ڈیجیٹل بینکنگ خدمات اور عملیاتی کارکردگی کو بہتر بنانا ہے۔<br><br>

3. صارف دوست اقدامات: متعدد عوامی مفاد میں اقدامات بھی زیر غور آئے۔<br><br>

<strong>چیئرمین کے تاثرات:</strong><br>
چیئرمین محترم خان عبدالماجد خان نے BAJK کی ٹیم، انتظامیہ اور تمام شراکت داروں کی محنت اور لگن کو سراہا اور بینک کی ترقی، جدت اور معیار کے لیے مسلسل کوششوں کے عزم کا اظہار کیا۔ انہوں نے اس بات پر زور دیا کہ حکومت کی سرپرستی میں BAJK ایک نمایاں مالیاتی ادارہ بن کر ابھرے گا۔<br><br>

<strong>مستقبل کا وژن:</strong><br>
بورڈ نے اس عزم کا اعادہ کیا کہ وہ ترقی کا سفر جاری رکھے گا، خدمات میں توسیع کرے گا، اور صارفین و شراکت داروں کے مفاد میں جدید ترین بینکاری ٹیکنالوجی اپنائے گا۔<br>
</div>',
            'image' => 'news-images/89meeting.jpg',
            'published_date' => '2025-06-04',
            'is_featured' => false,
            'category' => 'general',
            'slug' => '89th-board-meeting-bajk-muzaffarabad',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Bank of Azad Jammu and Kashmir Signs Strategic MoU with Silverlake to Advance Digital Banking Infrastructure',
           'content' => 'The Bank of Azad Jammu and Kashmir (BAJK) has signed a Memorandum of Understanding (MoU) with Silverlake, a world-renowned Malaysian company, marking a significant step towards digitalization and scheduling. The MoU was signed during a ceremony held in Kuala Lumpur, Malaysia, after which documents were exchanged. Azad Jammu and Kashmir Minister for Finance and Cooperatives/Chairman of BAJK, Khan Abdul Majid Khan, President/CEO of BAJK, Mr. Shahid Shahzad Mir, and representatives of Silverlake were present on the occasion.<br>
Notably, the local partner of Silverlake, I-Consult played an instrumental role in facilitating this MoU, and its representatives Mr. Shahid Ahmed Khan and Mr. Khurram Jamal were also present during the signing ceremony, contributing to the successful collaboration.<br>
Silverlake is a leading company providing core banking and digital technology services to over 370 banks and financial institutions across 80 countries. It is globally recognized for its advanced core banking software technology and a 100% success rate.<br>
With this agreement, BAJK has achieved a major milestone in modernizing its banking infrastructure. The partnership will enable the bank to implement the latest banking software, a key requirement for obtaining a scheduling license under the regulatory framework of the State Bank of Pakistan. This development will bring Kashmir Bank on par with all major banks in Pakistan.<br>
Speaking at the event, Chairman Khan Abdul Majid Khan stated that this MoU is not just a technical upgrade but the foundation of a revolution. It will allow BAJK to serve its customers more efficiently and transparently while contributing to the economic growth and prosperity of Azad Jammu and Kashmir.<br><br>

<div dir="rtl" style="text-align: right;">
بینک آف آزاد جموں و کشمیر نے شیڈولنگ کے حصول اور ڈیجیٹلائزیشن کی جانب اہم پیش رفت کرتے ہوئے ملائیشیا کی عالمی شہرت یافتہ کمپنی سلور لیک کے ساتھ مفاہمت کی یادداشت پر دستخط کر دیئے ہیں۔ بدھ کی شام کوالالمپور، ملائیشیا میں منعقدہ ایک تقریب کے دوران مفاہمت کی یادداشت پر دستخط کے بعد دستاویزات کا تبادلہ کیا گیا۔ اس موقع پر آزاد جموں و کشمیر کے وزیر خزانہ و کواپریٹوز / چیئرمین بینک خان عبدالماجد خان، صدر/ سی ای او بینک جناب شاہد شہزاد میر اور سلور لیک کے نمائندگان بھی موجود تھے۔<br><br>
سلور لیک دنیا کے 80 ممالک میں 370 سے زیادہ بینکوں اور مالیاتی اداروں کو کور بینکنگ اور دیگر ڈیجیٹل ٹیکنالوجی خدمات فراہم کرنے والی کمپنی ہے جو کور بینکنگ سافٹ ویئر ٹیکنالوجی اور اس کے سو فیصد کامیابی کے لئے بھی مشہور ہے، کے ساتھ اس اہم معاہدہ سے بینک آف آزاد جموں و کشمیر نے اپنے بینکنگ انفراسٹرکچر میں جدت لانے کے لئے ایک اہم سنگ میل عبور کیا ہے۔<br><br>
اس شراکت داری کے ذریعہ بینک میں جدید ترین بینکنگ سافٹ ویئر کی تنصیب کی جائے گی، جو کہ اسٹیٹ بینک آف پاکستان کے ریگولیٹری فریم ورک کے تحت شیڈولنگ لائسنس کے حصول کے لئے ایک بنیادی ضرورت ہے۔ اس تبدیلی کے نتیجہ میں کشمیر بینک پاکستان کے تمام بینکوں کے ساتھ برابری کی پوزیشن پر آ جائے گا۔<br><br>
تقریب سے خطاب کرتے ہوئے، چیئرمین بینک خان عبدالماجد خان نے کہا کہ مفاہمت کی یہ یادداشت صرف ایک تکنیکی اپ گریڈیشن نہیں ہے بلکہ ایک انقلاب کی بنیاد ہے۔ یہ ہمیں آزاد جموں کشمیر کی اقتصادی ترقی اور خوشحالی میں اپنا کردار ادا کرتے ہوئے اپنے صارفین کو زیادہ بہتر اور شفافیت کے ساتھ خدمت کرنے کا موقع دے گا۔<br><br>
سلور لیک کی ٹیم نے کہا سلور لیک کو کشمیر بینک کی ترقی میں اپنا کردار ادا کرنے پر فخر ہے اور یہ کور بینکنگ سلوشن پاکستان کے مالیاتی منظر نامے کے لئے ایک معیار قائم کرے گا۔ یہ معاہدہ طویل المدتی شراکت کی بنیاد بنے گا۔ دونوں اداروں نے اپنی ٹیموں کی محنت کو سراہا اور اس منصوبے کو کامیاب بنانے کا عہد کیا۔<br>
</div>',
            'image' => 'news-images/silverlink.jpg',
            'published_date' => '2025-05-29',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-signs-mou-with-silverlake-digital-banking',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Bank of AJK Convenes 88th Board of Directors Meeting Under the Chairmanship of Finance Minister Khan Abdul Majid Khan',
           'content' => 'The 88th Meeting of the Board of Directors of Bank of Azad Jammu & Kashmir Held Under the Chairmanship of Finance Minister Khan Abdul Majid Khan<br>
The 88th meeting of the Board of Directors of Bank of Azad Jammu & Kashmir was held under the chairmanship of Mr. Khan Abdul Majid Khan, Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of the Bank. The meeting was convened on Monday at the Bank’s Head Office.<br>
The meeting was attended by Mr. Shahid Shahzad Mir, President & CEO, members of the Board of Directors, Mr. Islam Zaib, Secretary Finance, Government of AJK, Mr. Khalid Mahmood Mirza, Secretary Industries & Commerce, Mr. Muhammad Sajjad, Secretary Law & Justice, Ms. Bushra Naz Malik (via Zoom), and Dr. Adnanullah Khan, Company Secretary.<br>
The meeting included a review of various operational agenda items, including the financial accounts for the year 2024 (as of December 31, 2024), which were discussed in detail and approved. A comprehensive briefing was also given on core banking matters.<br>
According to the financial accounts, the Bank continues to witness consistent growth in profitability, assets, deposits, and remittances. Attractive loan schemes on easy terms and low markup rates are being provided to customers.<br>
The Board appreciated the outstanding performance and cooperation of all stakeholders and reaffirmed its commitment to continue the Bank’s journey of success and progress.<br>
On this occasion, the Chairman stated that every effort is being made to position the institution among the leading banks under the patronage of the government. He added that with the staff’s hard work, teamwork, and the full support of valued customers, the Bank will continue to achieve excellent business results.<br><br>

<div dir="rtl" style="text-align: right;">
آزاد حکومت ریاست جموں وکشمیر کے وزیر خزانہ و امداد باہمی اور بینک آف آزاد جموں وکشمیر کے چیئرمین جناب خان عبدالماجد خان کی زیرصدارت بینک کے بورڈ آف ڈائریکٹرز کا 88 واں اجلاس منعقد ہوا۔ پیر کے روز بینک کے ہیڈ آفس میں منعقدہ اجلاس میں صدر و چیف ایگزیکٹو آفیسر جناب شاہد شہزاد میر، ڈائریکٹرز صاحبان، سیکریٹری فنانس حکومت آزاد جموں وکشمیر جناب اسلام زیب، سیکریٹری صنعت و حرفت جناب خالد محمود مرزا، سیکریٹری قانون و انصاف جناب محمد سجاد، زوم پر محترمہ بشریٰ ناز ملک اور کمپنی سیکریٹری ڈاکٹر عدنان اللہ خان نے شرکت کی۔<br><br>
اجلاس میں گزشتہ سال 2024 کے فنانشل اکاؤنٹس (31 دسمبر 2024) سمیت مختلف آپریشنل ایجنڈے پیش کئے گئے جن کی مفصل بحث و مباحثہ کے بعد منظوری دی گئی۔ اجلاس کو کور بینکنگ سے متعلق مفصل بریفننگ دی گئی۔<br><br>
فنانشل اکاؤنٹس کے مطابق بینک کے منافع، اثاثہ جات، ڈیپازٹس اور ترسیلات زر میں مسلسل اضافہ ہو رہا ہے۔ صارفین کو آسان شرائط اور کم از کم مارک اپ پر پرکشش قرضہ جات فراہم کئے جا رہے ہیں۔<br><br>
بورڈ نے شاندار کارکردگی اور تعاون پر تمام سٹیک ہولڈرز کے کردار کی تعریف کرتے ہوئے بینک کی کامیابی اور ترقی کے سفر کو جاری رکھنے کے عزم کا اعادہ کیا۔<br><br>
اس موقع پر جناب چیئرمین نے کہا کہ حکومت کی سرپرستی میں ادارے کو کامیاب اور صف اول کے بینکوں میں شامل کرنے کے لئے تمام کوششیں بروئے کار لائی جا رہی ہیں۔ انہوں نے کہا کہ عملے کی محنت، ٹیم ورک، معزز صارفین کے بھرپور تعاون سے بہترین بزنس نتائج کے حصول کا سلسلہ جاری رکھا جائے گا۔<br>
</div>',
            'image' => 'news-images/meeting2.jpg',
            'published_date' => '2025-04-28',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bank-of-ajk-88th-board-meeting-chaired-by-finance-minister-khan-abdul-majid',
            'is_published' => true,
        ]);


        NewsAnnouncement::create([
            'title' => 'Bank of AJK Convenes 106th Management Committee Meeting to Drive Strategic Growth and Innovation',
           'content' => 'Bank of AJK Holds 106th Management Committee Meeting<br>
The Bank of Azad Jammu and Kashmir (BAJK) marked a significant milestone with the successful convening of its 106th Management Committee Meeting at the bank’s head office in Muzaffarabad. The session, held under the leadership of Khan Abdul Majid Khan, Chairman of the Board of Directors and Minister for Finance & Cooperative, AJK, brought together key decision-makers to review progress, strategize future initiatives, and reinforce the institution’s commitment to excellence in banking services.<br>
Khan Abdul Majid Khan presided over the meeting, emphasizing the bank’s role in driving economic growth and financial inclusion across AJK. In his remarks, he underscored the importance of innovation, customer-centric policies, and adherence to governance standards. “Our focus remains on empowering communities through accessible financial solutions while maintaining transparency and accountability at all levels,” he stated.<br><br>

CEO’s Comprehensive Briefing Highlights Achievements and Goals<br>
Mr. Shahid Shahzad Mir, President and CEO of BAJK, delivered a detailed presentation outlining the bank’s financial performance, operational milestones, and strategic priorities. Key highlights included:<br>
- Financial Stability: Robust growth in deposits, loans, and profitability despite economic challenges.<br>
- Digital Transformation: Progress on expanding digital banking services, including mobile apps and online platforms, to enhance customer convenience.<br>
- Branch Network Expansion: Plans to extend services to underserved regions of AJK.<br>
- Sustainability Initiatives: Commitment to green financing and CSR projects focused on education, healthcare, and disaster relief.<br>
Mr. Mir also addressed challenges such as cybersecurity, market competition, and regulatory compliance, stressing the need for agility and proactive risk management.<br><br>

Collaborative Dialogue with Divisional Head<br>
The meeting saw active participation from all divisional heads, who provided updates on their respective domains, including retail banking, corporate finance, IT, HR, and compliance. Discussions centered on improving operational efficiency, staff training programs, and leveraging technology to streamline processes. The Company Secretary ensured adherence to procedural and regulatory frameworks during deliberations.<br><br>

Key Resolutions and Forward-Looking Agenda<br>
- Customer Experience Enhancement: Initiatives to reduce service turnaround times and introduce tailored financial products.<br>
- Employee Development: Launch of skill-building workshops and leadership programs to foster a culture of excellence.<br>
- Community Engagement: Strengthening partnerships with local stakeholders to address socio-economic needs.<br><br>

A Unified Commitment to Progress<br>
The meeting concluded with a consensus on maintaining momentum toward BAJK’s vision of becoming a benchmark institution in regional banking. Chairman Khan commended the team’s dedication and urged continued collaboration to achieve shared goals.<br><br>

Looking Ahead<br>
As BAJK moves forward, the resolutions from the 106th Management Committee Meeting will serve as a roadmap for sustainable growth, innovation, and community impact. The bank reaffirms its pledge to stakeholders: delivering value-driven banking while contributing to the prosperity of Azad Jammu and Kashmir.<br><br>

<div dir="rtl" style="text-align: right;">
بینک آف آزاد جموں و کشمیر کا 106واں مینجمنٹ کمیٹی اجلاس منعقد<br><br>
بینک آف آزاد جموں و کشمیر (BAJK) نے ایک اہم سنگِ میل عبور کرتے ہوئے اپنا 106واں مینجمنٹ کمیٹی اجلاس کامیابی سے بینک کے ہیڈ آفس مظفرآباد میں منعقد کیا۔ یہ اجلاس خان عبدالمجید خان، چیئرمین بورڈ آف ڈائریکٹرز و وزیر خزانہ و کواپریٹو حکومت آزاد کشمیر، کی سربراہی میں منعقد ہوا۔ اجلاس میں اہم فیصلہ سازوں نے شرکت کی تاکہ بینک کی پیش رفت کا جائزہ لیا جا سکے، آئندہ کے اقدامات پر حکمت عملی تیار کی جا سکے اور بینکنگ خدمات میں اعلیٰ معیار کے عزم کو مزید مضبوط کیا جا سکے۔<br><br>
خان عبدالمجید خان نے اجلاس کی صدارت کرتے ہوئے آزاد کشمیر میں اقتصادی ترقی اور مالی شمولیت کے فروغ میں بینک کے کردار کو اجاگر کیا۔ انہوں نے زور دیا کہ جدت، صارف دوست پالیسیوں اور معیاری طرز حکمرانی کو اپنانا وقت کی ضرورت ہے۔ انہوں نے کہا: "ہماری توجہ ایسی مالی سہولیات کی فراہمی پر ہے جو عوام کو بااختیار بنائیں، شفافیت اور جوابدہی کو یقینی بناتے ہوئے۔"<br><br>

<b>صدر و سی ای او کی جامع بریفنگ: کارکردگی اور اہداف کی تفصیل</b><br>
جناب شاہد شہزاد میر، صدر و چیف ایگزیکٹو آفیسر (CEO) BAJK نے ایک مفصل پریزنٹیشن دی جس میں بینک کی مالی کارکردگی، آپریشنل کامیابیاں اور اسٹریٹجک ترجیحات بیان کی گئیں۔<br>
اہم نکات درج ذیل تھے:<br>
- مالی استحکام: چیلنجز کے باوجود ڈپازٹس، قرضوں اور منافع میں مضبوط اضافہ۔<br>
- ڈیجیٹل تبدیلی: موبائل ایپلیکیشنز اور آن لائن پلیٹ فارمز کے ذریعے ڈیجیٹل سروسز کی توسیع میں پیش رفت۔<br>
- برانچ نیٹ ورک میں توسیع: آزاد کشمیر کے پسماندہ علاقوں تک بینکنگ خدمات کو وسعت دینے کے منصوبے۔<br>
- پائیداری اقدامات: گرین فنانسنگ اور CSR منصوبے (تعلیم، صحت، قدرتی آفات سے بحالی پر توجہ)۔<br>
انہوں نے سائبر سیکیورٹی، مارکیٹ میں مقابلہ اور ریگولیٹری تقاضوں جیسے چیلنجز کا بھی ذکر کیا اور چابک دستی اور خطرات کے فعال انتظام پر زور دیا۔<br><br>

<b>ڈویژنل ہیڈز کے ساتھ تعمیری مکالمہ</b><br>
اجلاس میں تمام ڈویژنل ہیڈز نے بھرپور شرکت کی اور اپنی اپنی فیلڈز جیسے ریٹیل بینکنگ، کارپوریٹ فنانس، آئی ٹی، ایچ آر اور کمپلائنس پر اپ ڈیٹس پیش کیں۔<br>
تبادلہ خیال کا محور درج ذیل موضوعات رہے:<br>
- آپریشنل کارکردگی کو بہتر بنانا<br>
- عملے کی تربیتی پروگرام<br>
- جدید ٹیکنالوجی کا استعمال<br>
- پراسیسز کی آسانی اور بہتری<br>
کمپنی سیکریٹری نے اجلاس کے دوران ریگولیٹری اور طریقہ کار کی مکمل پابندی کو یقینی بنایا۔<br><br>

<b>اہم فیصلے اور مستقبل کی حکمت عملی</b><br>
- کسٹمر تجربہ میں بہتری: فوری خدمات کی فراہمی اور صارفین کی ضروریات کے مطابق مالیاتی مصنوعات کی تیاری۔<br>
- ملازمین کی ترقی: مہارت میں اضافے کے ورکشاپس اور لیڈرشپ پروگرامز کا آغاز۔<br>
- سماجی شراکت داری: مقامی اسٹیک ہولڈرز کے ساتھ شراکت کو مضبوط بنانا تاکہ معاشرتی و اقتصادی مسائل حل کیے جا سکیں۔<br><br>

<b>ترقی کے لیے مشترکہ عزم</b><br>
اجلاس کا اختتام BAJK کے وژن کو حاصل کرنے کے لیے متحد رہنے کے عزم کے ساتھ ہوا، تاکہ اسے علاقائی بینکاری میں مثالی ادارہ بنایا جا سکے۔ چیئرمین خان عبدالمجید خان نے ٹیم کے جذبے کو سراہا اور باہمی تعاون سے آگے بڑھنے پر زور دیا۔<br><br>

<b>مستقبل کی سمت</b><br>
BAJK مستقبل میں اپنی ترقی، جدت، اور سماجی اثرات کے لیے 106ویں مینجمنٹ کمیٹی اجلاس کے فیصلوں کو رہنما اصول کے طور پر استعمال کرے گا۔ بینک نے اپنے تمام اسٹیک ہولڈرز سے یہ عہد دہرایا کہ وہ قدر پر مبنی بینکاری خدمات فراہم کرتے رہیں گے اور آزاد جموں و کشمیر کی خوشحالی میں کردار ادا کرتے رہیں گے۔<br>
</div>',
            'image' => 'news-images/106meeting.jpg',
            'published_date' => '2025-04-11',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-106th-management-committee-meeting-strategic-growth-innovation',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Recognizing Excellence: BAJK Awards Outstanding Employees for Exceptional Performance',
           'content' => 'Muzaffarabad<br>
<strong>Bank of Azad Jammu and Kashmir Honors Top Performers in Prestigious Ceremony</strong><br><br>

In a ceremony marked by celebration and recognition, the Bank of Azad Jammu and Kashmir (BAJK) honored its outstanding employees for their exceptional contributions to the institution’s success. The event, held under the leadership of Chairman Khan Abdul Majid Khan—who also serves as AJK’s Minister for Finance and Cooperative—and President & CEO Shahid Shahzad Mir, underscored the bank’s commitment to excellence and employee motivation.<br><br>

<strong>Dignitaries Celebrate Employee Achievements</strong><br>
Mr. Khan Abdul Majid Khan, in his dual role as Chairman of the bank and Minister for Finance, emphasized the critical link between employee dedication and institutional growth. Addressing the gathering, he praised the awardees for their hard work and innovation, stating, “Our employees are the backbone of this institution. Their relentless efforts not only drive the bank forward but also contribute to the economic prosperity of Azad Jammu and Kashmir.” He further highlighted the Government’s support for initiatives aimed at enhancing financial inclusion and modernizing banking services across the region.<br><br>

Accompanying him, President & CEO Shahid Shahzad Mir echoed these sentiments, applauding the award-winning staff for their role in achieving milestones under his leadership. Mr. Mir remarked, “Today’s honorees exemplify the values of integrity, customer focus, and teamwork that define our bank. Their achievements inspire us all to aim higher and strengthen our position as a trusted financial partner for the people of AJK.”<br><br>

<strong>Awards and Accolades</strong><br>
The ceremony saw cash prizes and certificates of appreciation distributed to top performers across various departments, including customer service, operational efficiency, and innovative problem-solving. The recipients, visibly moved by the recognition, expressed gratitude for the bank’s supportive environment and leadership. One awardee shared, “This acknowledgment fuels our passion to continue delivering excellence and contributing to the bank’s mission.”<br><br>

<strong>A Vision for the Future</strong><br>
The event also served as a platform to reiterate the bank’s strategic goals. Mr. Khan and Mr. Mir outlined plans to expand digital banking solutions, improve rural financial access, and invest in employee development programs. Their shared vision positions the Bank of AJK as a catalyst for regional economic growth, aligned with the government’s agenda for sustainable development.<br><br>

<strong>A Moment of Pride</strong><br>
Attended by executives, the ceremony concluded on a note of collective pride and optimism. The fusion of formal recognition and heartfelt appreciation highlighted the institution’s culture of valuing its workforce.<br><br>

As the Bank of Azad Jammu and Kashmir continues to break new ground, events like these reaffirm its commitment to nurturing talent, fostering innovation, and serving the community with unwavering dedication. Here’s to many more milestones ahead!<br><br>

<div dir="rtl" style="text-align: right;">
<strong>مظفرآباد<br>
بینک آف آزاد جموں و کشمیر کی جانب سے اعلیٰ کارکردگی دکھانے والے ملازمین کو خراجِ تحسین</strong><br><br>

ایک پُروقار تقریب میں بینک آف آزاد جموں و کشمیر (BAJK) نے اپنے نمایاں کارکردگی دکھانے والے ملازمین کو ادارے کی ترقی میں ان کے شاندار کردار پر اعزازات سے نوازا۔ یہ تقریب چیئرمین خان عبدالمجید خان (جو وزیر خزانہ و کواپریٹو، آزاد کشمیر بھی ہیں) اور صدر و سی ای او شاہد شہزاد میر کی قیادت میں منعقد ہوئی، جس کا مقصد بہترین کارکردگی کو سراہنا اور ملازمین کی حوصلہ افزائی کرنا تھا۔<br><br>

<strong>شخصیات نے ملازمین کی کامیابیوں کو سراہا</strong><br>
چیئرمین خان عبدالمجید خان نے اپنے خطاب میں کہا کہ ملازمین کی محنت اور لگن ہی ادارے کی ترقی کی بنیاد ہے۔ انہوں نے اعزاز حاصل کرنے والے ملازمین کی تعریف کرتے ہوئے کہا:<br>
"ہمارے ملازمین اس ادارے کی ریڑھ کی ہڈی ہیں۔ ان کی انتھک محنت نہ صرف بینک کو کامیابی کی راہ پر گامزن رکھتی ہے بلکہ آزاد جموں و کشمیر کی معاشی خوشحالی میں بھی اہم کردار ادا کرتی ہے۔"<br><br>

انہوں نے مزید کہا کہ حکومت مالی شمولیت کے فروغ اور بینکنگ خدمات کو جدید بنانے کے لیے مکمل تعاون فراہم کر رہی ہے۔<br><br>

صدر و سی ای او جناب شاہد شہزاد میر نے بھی اعزاز یافتگان کی تعریف کی اور کہا:<br>
"آج کے اعزاز یافتہ ملازمین دیانتداری، صارف پر توجہ، اور ٹیم ورک کی اعلیٰ مثال ہیں۔ ان کی کامیابیاں ہم سب کو مزید بہتر کام کرنے کی ترغیب دیتی ہیں اور ہمیں ایک قابلِ اعتماد مالی ادارہ بننے کی راہ پر گامزن رکھتی ہیں۔"<br><br>

<strong>اعزازات اور انعامات</strong><br>
تقریب کے دوران مختلف شعبوں میں نمایاں کارکردگی دکھانے والے ملازمین کو نقد انعامات اور تعریفی اسناد دی گئیں۔ شعبوں میں کسٹمر سروس، آپریشنل ایفیشنسی، اور جدید مسئلہ حل کرنے کی صلاحیت شامل تھیں۔<br><br>

اعزاز حاصل کرنے والے ملازمین نے اپنے خیالات کا اظہار کرتے ہوئے بینک کے سازگار ماحول اور قیادت کی تعریف کی۔ ایک اعزاز یافتہ ملازم نے کہا:<br>
"یہ اعتراف ہماری محنت کو جِلا بخشتا ہے اور ہمیں مزید جوش و جذبے کے ساتھ ادارے کے مشن میں حصہ ڈالنے کی ترغیب دیتا ہے۔"<br><br>

<strong>مستقبل کے اہداف</strong><br>
تقریب میں بینک کی آئندہ حکمت عملی پر بھی روشنی ڈالی گئی۔ چیئرمین اور سی ای او نے ڈیجیٹل بینکنگ میں وسعت، دیہی علاقوں میں مالی سہولیات کی بہتری، اور ملازمین کی تربیت و ترقی کے لیے اقدامات کا اعلان کیا۔<br>
یہ وژن بینک آف AJK کو خطے کی معاشی ترقی کا محرک بنانے کے لیے حکومت کے پائیدار ترقی کے ایجنڈے سے ہم آہنگ ہے۔<br><br>

<strong>فخر کا لمحہ</strong><br>
اعلیٰ عہدیداران کی موجودگی میں تقریب کا اختتام فخر اور اُمید کے جذبات کے ساتھ ہوا۔ بینک کی جانب سے اپنے عملے کی باقاعدہ قدر دانی اور سراہنے کا یہ انداز ادارے کے مثبت اور باہمی احترام پر مبنی ماحول کو ظاہر کرتا ہے۔<br><br>

جوں جوں بینک آف آزاد جموں و کشمیر نئی کامیابیاں حاصل کر رہا ہے، ایسی تقریبات اس بات کا ثبوت ہیں کہ ادارہ اپنے ہنرمند ملازمین کو قدر کی نگاہ سے دیکھتا ہے، جدت کی حوصلہ افزائی کرتا ہے، اور کمیونٹی کی خدمت کو اپنا مشن سمجھتا ہے۔
</div>',
            'image' => 'news-images/honor.jpg',
            'published_date' => '2025-04-10',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'bajk-awards-outstanding-employees-for-exceptional-performance',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Barrister Sultan Mehmood Assures Maximum Facilitation for Bank of AJK’s Institutional Growth',
            'content' => 'Presidential Secretariat, Aiwan-e-Sadr, Kashmir House, Islamabad<br>
07 April 2025<br>
Islamabad () 07 April 2025<br><br>

<strong>President of Azad Jammu and Kashmir, Barrister Sultan Mehmood Chaudhry, Holds Detailed Meeting with BAJK President Shahid Shahzad Mir at Kashmir House, Islamabad</strong><br><br>

President of the Bank of Azad Jammu and Kashmir (BAJK), Mr. Shahid Shahzad Mir, held a comprehensive meeting with the President of Azad Jammu and Kashmir, Barrister Sultan Mehmood Chaudhry, at Kashmir House, Islamabad.<br><br>

During the meeting, Mr. Shahid Shahzad Mir briefed the President in detail on the performance, ongoing challenges, and various affairs of the Bank of Azad Jammu and Kashmir.<br><br>

President Barrister Sultan Mehmood Chaudhry instructed Mr. Mir to utilize all available resources to transform the Bank of Azad Jammu and Kashmir into a scheduled bank.<br><br>

He also assured his full cooperation and support in this regard.<br><br>

<div dir="rtl" style="text-align: right;">
صدارتی سیکرٹریٹ، ایوان صدر، کشمیر ہاؤس، اسلام آباد<br>
07 اپریل 2025<br>
اسلام آباد () 07 اپریل 2025ء<br><br>

<strong>صدر ریاست آزاد جموں و کشمیر بیرسٹر سلطان محمود چوہدری سے صدر بینک آف آزاد جموں و کشمیر شاہد شہزاد میر کی تفصیلی ملاقات</strong><br><br>

ایوان صدر کشمیر ہاؤس اسلام آباد میں صدر بینک آف آزاد جموں و کشمیر جناب شاہد شہزاد میر نے صدر ریاست آزاد جموں و کشمیر بیرسٹر سلطان محمود چوہدری سے تفصیلی ملاقات کی۔<br><br>

اس موقع پر جناب شاہد شہزاد میر نے بینک کی کارکردگی، درپیش مسائل اور مختلف امور پر صدر ریاست کو تفصیلی بریفنگ دی۔<br><br>

صدر ریاست بیرسٹر سلطان محمود چوہدری نے ہدایت کی کہ بینک کو شیڈول بینک بنانے کے لیے تمام تر وسائل بروئے کار لائے جائیں۔<br><br>

انہوں نے اس مقصد کے لیے اپنے مکمل تعاون اور حمایت کی یقین دہانی بھی کروائی۔<br><br>

اس موقع پر دونوں رہنماؤں کے درمیان باہمی دلچسپی کے امور پر بھی تبادلہ خیال ہوا۔
</div>',
            'image' => 'news-images/barister.jpg',
            'published_date' => '2025-04-09',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'barrister-sultan-mehmood-assures-support-for-bajk-growth',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'HR Division of BAJK Organizes Comprehensive Training on Islamic Banking Operations',
          'content' => 'HR Division of BAJK Organizes Comprehensive Training on Islamic Banking Operations<br>
<strong>Muzaffarabad</strong><br><br>

The Human Resources (HR) Division of Bank of Azad Jammu and Kashmir (BAJK) successfully organized a comprehensive training program on Islamic Banking Operations for its staff on Thursday. The training was conducted by a renowned Sharia consultancy trainer and was attended by officials from the Islamic Banking Division and other nominated staff members.<br><br>

<strong>Key Highlights of the Training:</strong><br>
<ul>
<li><strong>Deep Dive into Sharia Principles:</strong> The training delved into the fundamental principles of Islamic finance, including the prohibition of Riba (interest), Gharar (uncertainty), and Maysir (gambling). Participants gained a thorough understanding of the ethical and legal framework governing all Islamic financial transactions.</li>
<li><strong>Focus on Islamic Banking Products and Services:</strong> The trainer provided in-depth explanations of various Sharia-compliant products and services offered by Islamic banks, such as Mudarabah, Musharakah, Murabaha, Ijarah, and Istisna.</li>
<li><strong>Emphasis on Risk Management:</strong> The training emphasized the crucial role of risk management in Islamic banking operations.</li>
<li><strong>Regulatory Compliance:</strong> A comprehensive overview of the regulatory framework for Islamic banking was also presented.</li>
<li><strong>Practical Case Studies and Simulations:</strong> Participants engaged in simulations to understand real-world scenarios.</li>
</ul><br>

<strong>Participant Testimonials:</strong><br>
<ul>
<li>"The training provided invaluable insights into the intricacies of Islamic banking operations. The trainer’s expertise and engaging delivery made the learning experience truly enriching." — Participant from Islamic Banking Division</li>
<li>"The training has equipped me with the necessary knowledge and skills to effectively contribute to the growth of Islamic banking within BAJK." — Another participant</li>
</ul><br>

<strong>About the Trainer:</strong><br>
The trainer is a highly respected Sharia consultant with vast experience in Islamic finance. His deep understanding and practical insights have made him a leading authority in Islamic banking training.<br><br>

<strong>HR Division’s Commitment to Professional Development:</strong><br>
The HR Division of BAJK is committed to continuous employee development. This training program reflects the bank’s dedication to equipping its team with specialized skills to boost the success of Islamic banking operations.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>بینک آف آزاد جموں و کشمیر کے ایچ آر ڈویژن کی جانب سے اسلامی بینکاری آپریشنز پر جامع تربیتی پروگرام کا انعقاد</strong><br>
<strong>مظفرآباد</strong><br><br>

بینک آف آزاد جموں و کشمیر (BAJK) کے ہیومن ریسورسز (HR) ڈویژن نے جمعرات کے روز اسلامی بینکاری آپریشنز پر ایک جامع تربیتی پروگرام کامیابی سے منعقد کیا۔ تربیت ایک معروف شریعہ کنسلٹنسی ٹرینر نے دی، جس میں اسلامی بینکاری ڈویژن کے افسران اور دیگر نامزد ملازمین نے شرکت کی۔<br><br>

<strong>تربیت کے اہم نکات:</strong><br>
<ul style="list-style: square;">
<li><strong>شریعت کے اصولوں پر روشنی:</strong> تربیت میں اسلامی مالیات کے بنیادی اصولوں جیسے ربا، غرر اور میسر کی وضاحت کی گئی۔</li>
<li><strong>اسلامی بینکاری مصنوعات و خدمات:</strong> مضاربہ، مشارکہ، مرابحہ، اجارہ، اور استصناع جیسی مصنوعات کی تفصیلات پیش کی گئیں۔</li>
<li><strong>رسک مینجمنٹ:</strong> اسلامی مالیاتی لین دین میں خطرات کے مؤثر انتظام کی تکنیکیں سکھائی گئیں۔</li>
<li><strong>ریگولیٹری فریم ورک:</strong> اسلامی بینکاری کے قانونی تقاضوں پر روشنی ڈالی گئی۔</li>
<li><strong>عملی کیس اسٹڈیز:</strong> عملی مثالوں اور سیمولیشنز سے سیکھنے کے مواقع فراہم کیے گئے۔</li>
</ul><br>

<strong>شرکاء کے تاثرات:</strong><br>
<ul style="list-style: square;">
<li>“یہ تربیت اسلامی بینکاری کے پیچیدہ پہلوؤں کو سمجھنے کے لیے انتہائی مددگار ثابت ہوئی۔” — اسلامی بینکاری ڈویژن کے رکن</li>
<li>“اس تربیت نے مجھے اسلامی بینکاری کی ترقی میں مؤثر کردار ادا کرنے کے لیے ضروری مہارت فراہم کی۔” — ایک اور شریک</li>
</ul><br>

<strong>ٹرینر کا تعارف:</strong><br>
ٹرینر ایک ممتاز شریعہ کنسلٹنٹ ہیں جنہیں اسلامی مالیاتی شعبے میں وسیع تجربہ حاصل ہے۔ ان کی تدریسی مہارت اور عملی فہم نے انہیں اسلامی بینکاری تربیت میں نمایاں مقام عطا کیا ہے۔<br><br>

<strong>پیشہ ورانہ ترقی کے لیے HR ڈویژن کا عزم:</strong><br>
BAJK کا HR ڈویژن مسلسل پیشہ ورانہ تربیت کے مواقع فراہم کرنے کے لیے کوشاں ہے۔ یہ پروگرام بینک کی اپنے ملازمین کو اسلامی بینکاری کے شعبے میں مہارت دلانے کی سنجیدہ کوششوں کا عکاس ہے۔
</div>',
            'image' => 'news-images/Hr.jpg',
            'published_date' => '2025-01-23',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-hr-organizes-islamic-banking-training',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Proudly Honoring Pakistan’s Brave Forces',
          'content' => 'The Bank of Azad Jammu and Kashmir pays heartfelt tribute to the courageous armed forces of Pakistan, recognizing their unwavering dedication and sacrifices for national security and peace. Their bravery continues to inspire the nation with pride and gratitude.<br><br>

<div dir="rtl" style="text-align: right;">
بینک آف آزاد جموں و کشمیر پاکستان کی بہادر مسلح افواج کو دل کی گہرائیوں سے خراجِ تحسین پیش کرتا ہے، جو قومی سلامتی اور امن کے لیے اپنی بے مثال قربانیوں اور غیر متزلزل عزم کے لیے جانے جاتے ہیں۔ ان کی بہادری پوری قوم کے لیے فخر اور شکرگزاری کا باعث ہے۔
</div>',
            'image' =>'news-images/pkforce.jpg',
            'published_date' => '2025-05-12',
            'is_featured' => true,
            'category' => 'general',
            'slug' => 'proudly-honoring-pakistans-brave-forces',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'BAJK Partners with Faysal Bank to Revolutionize Financial Transactions and Cash Management',
           'content' => 'Bank of AJK Partners with Faysal Bank to Revolutionize Financial Transactions and Enhance Cash Management<br><br>
<b>Islamabad</b><br>
Bank of Azad Jammu and Kashmir (BAJK), a leading financial institution, has entered into a strategic partnership with Faysal Bank Limited. This collaboration aims to revolutionize the way financial transactions are conducted by integrating the International Bank Account Number (IBAN) system and enhancing cash management operations.<br><br>

By adopting IBAN, BAJK will streamline its financial operations, enhancing efficiency and transparency. This move is expected to significantly benefit both the company and its customers.<br><br>

<b>Key Benefits of the Partnership:</b><br>
<ul>
<li><b>Enhanced Efficiency:</b> The IBAN system will expedite domestic and international fund transfers, reducing processing time and minimizing errors.</li>
<li><b>Improved Security:</b> The standardized format of IBAN ensures greater security and reduces the risk of fraudulent activities.</li>
<li><b>Global Recognition:</b> IBAN is an internationally recognized standard, facilitating seamless cross-border transactions.</li>
<li><b>Enhanced Cash Management:</b> Through this partnership, BAJK will benefit from Faysal Bank’s robust cash management solutions, including:
    <ul>
        <li><b>Cash Collection:</b> Efficient and secure collection of cash from multiple sources.</li>
        <li><b>Cash Disbursement:</b> Timely and accurate disbursement of funds to various payees.</li>
        <li><b>Cash Forecasting:</b> Accurate prediction of cash flow needs to optimize liquidity management.</li>
        <li><b>Cash Pooling:</b> Centralization of cash balances to optimize interest income and reduce borrowing costs.</li>
    </ul>
</li>
</ul>

The signing ceremony was attended by key representatives from both organizations, including the Chief Compliance Officer, DH Risk Management Division, and DH Treasury Management Division from BAJK, and the Head of Cash Management and Regional Head Islamabad from FBL.<br><br>

This partnership between BAJK and Faysal Bank marks a significant step forward in the adoption of modern financial technologies in Pakistan. It is anticipated that this collaboration will have a positive impact on the broader economy.<br><br>

<div dir="rtl" style="text-align: right;">
<b>بینک آف آزاد جموں و کشمیر اور فیصل بینک کے درمیان مالیاتی لین دین اور کیش مینجمنٹ میں انقلابی شراکت</b><br><br>
<b>اسلام آباد</b><br>
بینک آف آزاد جموں و کشمیر (BAJK)، جو ایک نمایاں مالیاتی ادارہ ہے، نے فیصل بینک لمیٹڈ کے ساتھ ایک اسٹریٹجک شراکت داری قائم کی ہے۔ اس اشتراک کا مقصد مالیاتی لین دین کے طریقہ کار میں انقلابی تبدیلی لانا ہے، جس میں انٹرنیشنل بینک اکاؤنٹ نمبر (IBAN) سسٹم کو شامل کرنا اور کیش مینجمنٹ آپریشنز کو مزید مؤثر بنانا شامل ہے۔<br><br>

IBAN سسٹم کو اپنانے کے ذریعے BAJK اپنے مالیاتی آپریشنز کو مزید منظم، شفاف اور مؤثر بنائے گا، جس سے ادارے اور صارفین دونوں کو خاطر خواہ فائدہ ہوگا۔<br><br>

<b>شراکت کے اہم فوائد:</b>
<ul>
<li>🔹 <b>بہتر کارکردگی:</b> IBAN سسٹم کے ذریعے ملکی اور بین الاقوامی فنڈ ٹرانسفرز تیز ہوں گے، وقت کی بچت ہوگی اور غلطیوں میں کمی آئے گی۔</li>
<li>🔹 <b>بہتر سیکیورٹی:</b> IBAN کا معیاری فارمیٹ مالیاتی تحفظ کو یقینی بناتا ہے اور دھوکہ دہی کے خطرات کو کم کرتا ہے۔</li>
<li>🔹 <b>عالمی سطح پر شناخت:</b> IBAN ایک بین الاقوامی سطح پر تسلیم شدہ معیار ہے، جو سرحد پار لین دین کو آسان بناتا ہے۔</li>
<li>🔹 <b>کیش مینجمنٹ میں بہتری:</b> اس شراکت کے ذریعے BAJK کو فیصل بینک کی جدید کیش مینجمنٹ خدمات حاصل ہوں گی، جن میں شامل ہیں:
    <ul>
        <li><b>کیش کلیکشن:</b> مختلف ذرائع سے رقم کی مؤثر اور محفوظ وصولی</li>
        <li><b>کیش ڈسبرسمنٹ:</b> رقوم کی بروقت اور درست ادائیگی</li>
        <li><b>کیش فورکاسٹنگ:</b> نقدی کی ضروریات کی درست پیش گوئی تاکہ لیکویڈیٹی کا بہتر انتظام کیا جا سکے</li>
        <li><b>کیش پولنگ:</b> مختلف اکاؤنٹس سے رقم کو مجتمع کر کے منافع میں اضافہ اور قرض کے اخراجات میں کمی</li>
    </ul>
</li>
</ul>

تقریبِ دستخط میں دونوں اداروں کے نمایاں افسران نے شرکت کی، جن میں BAJK کی جانب سے چیف کمپلائنس آفیسر، ڈویژنل ہیڈ رسک مینجمنٹ، اور ڈویژنل ہیڈ ٹریژری مینجمنٹ شامل تھے جبکہ فیصل بینک کی جانب سے ہیڈ آف کیش مینجمنٹ اور ریجنل ہیڈ اسلام آباد نے شرکت کی۔<br>
</div>',
            'image' => 'news-images/fasalbank.jpg',
            'published_date' => '2024-12-16',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'bajk-partners-with-faysal-bank-for-financial-transformation',
            'is_published' => true,
        ]);


        NewsAnnouncement::create([
            'title' => 'Bank of AJK Collaborates with NIBAF to Elevate Enterprise Risk Management Standards',
           'content' => 'Bank of AJK Strengthens Risk Management with NIBAF’s Support<br><br>
<b>Muzaffarabad,</b><br>
<b>November 25, 2024:</b><br>
Bank of Azad Jammu and Kashmir (BAJK) has initiated a week-long Enterprise Risk Management (ERM) training program in collaboration with the National Institute of Banking and Finance (NIBAF). The program, held at the Ch. Ghulam Abbas Learning Hall, aims to equip BAJK’s staff with the essential tools and knowledge to effectively identify, assess, and mitigate risks.<br><br>

This initiative underscores BAJK’s commitment to fostering a robust risk culture and strengthening its overall risk management framework. The training program focuses on several key areas, including:<br>

<ul>
<li><b>Risk Identification and Assessment:</b> Participants will learn to identify potential risks, such as credit, market, operational, and reputational risks, and evaluate their impact on the bank.</li>
<li><b>Risk Mitigation Strategies:</b> The training will delve into various risk mitigation techniques, including risk avoidance, reduction, transfer, and acceptance.</li>
<li><b>Risk Monitoring and Reporting:</b> Participants will be trained on establishing robust systems for monitoring and reporting on risk exposures and control measures.</li>
<li><b>Risk Culture and Governance:</b> The program will emphasize the importance of fostering a strong risk culture within the organization and integrating risk management into the bank’s overall governance framework.</li>
</ul>

By partnering with NIBAF, BAJK aims to enhance its risk management capabilities and strengthen its position as a leading financial institution in the region. The bank remains dedicated to upholding the highest standards of risk governance and compliance.<br><br>

<div dir="rtl" style="text-align: right;">
<b>بینک آف آزاد جموں و کشمیر نے NIBAF کے تعاون سے رسک مینجمنٹ کو مزید مضبوط بنا دیا</b><br><br>
<b>مظفرآباد،</b><br>
<b>25 نومبر 2024:</b><br>
بینک آف آزاد جموں و کشمیر (BAJK) نے نیشنل انسٹیٹیوٹ آف بینکنگ اینڈ فنانس (NIBAF) کے اشتراک سے ایک ہفتے پر محیط انٹرپرائز رسک مینجمنٹ (ERM) تربیتی پروگرام کا آغاز کیا ہے۔ یہ پروگرام چوہدری غلام عباس لرننگ ہال میں منعقد ہو رہا ہے، جس کا مقصد بینک کے عملے کو خطرات کی مؤثر طریقے سے شناخت، تجزیہ اور تدارک کے لیے ضروری علم اور مہارت فراہم کرنا ہے۔<br><br>

یہ اقدام BAJK کے ایک مضبوط رسک کلچر کو فروغ دینے اور اپنے مجموعی رسک مینجمنٹ فریم ورک کو مستحکم کرنے کے عزم کی عکاسی کرتا ہے۔ تربیتی پروگرام درج ذیل اہم شعبوں پر مرکوز ہے:<br>

<ul>
<li>🔹 <b>خطرات کی شناخت اور تجزیہ:</b> شرکاء کو کریڈٹ، مارکیٹ، آپریشنل اور ساکھ جیسے ممکنہ خطرات کی شناخت اور ان کے بینک پر ممکنہ اثرات کے تجزیے کی تربیت دی جائے گی۔</li>
<li>🔹 <b>خطرات کے تدارک کی حکمتِ عملی:</b> پروگرام میں خطرات سے بچاؤ، ان میں کمی، ان کا منتقلی اور قبول کرنے جیسے مختلف تدارکی طریقہ کار پر تفصیلی روشنی ڈالی جائے گی۔</li>
<li>🔹 <b>خطرات کی نگرانی اور رپورٹنگ:</b> شرکاء کو خطرات کے انکشاف اور کنٹرول اقدامات کی نگرانی اور رپورٹنگ کے مضبوط نظام قائم کرنے کی تربیت دی جائے گی۔</li>
<li>🔹 <b>رسک کلچر اور گورننس:</b> تربیت میں ادارے کے اندر ایک مضبوط رسک کلچر کو فروغ دینے اور رسک مینجمنٹ کو بینک کی مجموعی گورننس میں ضم کرنے کی اہمیت کو اجاگر کیا جائے گا۔</li>
</ul>

NIBAF کے ساتھ شراکت داری کے ذریعے BAJK کا مقصد اپنی رسک مینجمنٹ صلاحیتوں کو بہتر بنانا اور خطے کے ایک نمایاں مالیاتی ادارے کے طور پر اپنی پوزیشن کو مستحکم کرنا ہے۔ بینک اعلیٰ سطحی رسک گورننس اور تعمیل کے معیار کو برقرار رکھنے کے لیے پُرعزم ہے۔
</div>',
            'image' => 'news-images/risk.jpg',
            'published_date' => '2024-11-25',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'bajk-collaborates-with-nibaf-to-elevate-enterprise-risk-management',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'BAJK Sharda Branch Commemorates 18th Anniversary with Community Leaders and Dignitaries',
          'content' => 'Celebrating the 18th Anniversary of the Bank of Azad Jammu and Kashmir<br><br>
On the occasion of the 18th anniversary of the Bank of Azad Jammu and Kashmir, a cake-cutting ceremony was held at the BAJK Sharda Branch. The event was graced by the presence of Assistant Commissioner Mr. Muhammad Qadeer Mughal, Principal of Boys Degree College Sharda Madam Sakeena Khawaja, President of the Sharda Bazaar Traders Association Mr. Babar Nawaz, and other respected local dignitaries.<br><br>

The guests expressed their heartfelt appreciation for the bank’s services and reaffirmed their commitment to continued cooperation. Prayers were offered for the continued growth and prosperity of the institution. Branch Manager Mr. Noor Zaman thanked all attendees for their participation and support.<br><br>

<div dir="rtl" style="text-align: right;">
<b>بینک آف آزاد جموں و کشمیر کی 18ویں سالگرہ کا جشن</b><br><br>
بینک آف آزاد جموں و کشمیر کی 18ویں سالگرہ کے موقع پر شاردہ برانچ میں ایک پُروقار کیک کاٹنے کی تقریب کا انعقاد کیا گیا۔ اس تقریب میں اسسٹنٹ کمشنر جناب محمد قدیر مغل، پرنسپل بوائز ڈگری کالج شاردہ میڈم سکینہ خواجہ، بازار تاجر برادری کے صدر جناب بابر نواز اور دیگر معززین علاقہ نے شرکت کی۔<br><br>

شرکاء نے بینک کی خدمات کو سراہا اور آئندہ بھی تعاون جاری رکھنے کے عزم کا اظہار کیا۔ بینک کی ترقی اور کامیابی کے لیے خصوصی دعا بھی کی گئی۔ برانچ منیجر نور زماں نے تمام مہمانوں کا شکریہ ادا کیا اور ان کی شرکت کو بینک کے لیے باعثِ اعزاز قرار دیا۔
</div>',
            'image' => 'news-images/birthday.jpg',
            'published_date' => '2024-11-10',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-sharda-branch-18th-anniversary-celebration-with-community-leaders',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'BAJK Celebrates 18th Anniversary at Pulmanda Branch, Khari Sharif',
            'content' =>  'Khari Sharif<br><br>
A grand ceremony was held at the Pulmanda Branch of Bank of Azad Jammu and Kashmir (BAJK) to mark the bank’s 18th anniversary. The event was graced by senior political, social, and education department officials from across the region. Regional Head of Mirpur, Raja Muhammad Waseem Khan, along with the bank staff, received high praise for their dedicated services.<br><br>

President of the Anjuman-e-Tajran, Ch. Muhammad Afsar, appreciated the performance of the bank staff and assured full support. While addressing the ceremony, the Secretary of Anjuman-e-Tajran Pulmanda recalled the historic role of Jammu and Kashmir Bank, stating that even before the formation of Pakistan, it held a leading position. He emphasized the importance of supporting a bank that is truly their own.<br><br>

Raja Sahib, impressed by the dedication of the staff, offered heartfelt prayers for the continuous progress and prosperity of Kashmir Bank, wishing it success "day and night," and also shared valuable suggestions. Chairman Malik Mazhar Iqbal Awan, attending as the special guest, acknowledged the enduring relationship between his family and the bank, pledging continued cooperation.<br><br>

Among the attendees were senior education department officials, principals of Boys College and Girls College Afzalpur, and members of civil society, all of whom admired the commitment and service quality of the bank staff.<br><br>

The event concluded with a vote of thanks by Branch Manager Mr. Waqas Javed to all the esteemed guests.<br><br>

<div dir="rtl" style="text-align: right;">
<b>کھڑی شریف</b><br><br>
بینک آف آزاد جموں و کشمیر پلمنڈا برانچ میں بھی بینک کی اٹھارویں سالگرہ کے موقع پر ایک پُروقار تقریب منعقد ہوئی۔ تقریب میں علاقہ بھر سے سیاسی، سماجی اور محکمہ تعلیم کے اعلیٰ افسران نے شرکت کی۔ ریجنل ہیڈ میرپور راجہ محمد وسیم خان اور بینک کے عملے کی خدمات کو سراہا گیا۔<br><br>

انجمن تاجران کے صدر چوہدری محمد افسر نے بینک عملے کی کارکردگی کو سراہتے ہوئے خراج تحسین پیش کیا اور بینک سے مکمل تعاون کی یقین دہانی کروائی۔ انجمن تاجران پلمنڈا کے سیکرٹری نے خطاب کرتے ہوئے کہا کہ جموں و کشمیر بینک پاکستان کے قیام سے قبل بھی عروج پر تھا، یہ بینک ہمارا اپنا ہے اور ہمیں اس کے ساتھ تعاون کرنا چاہیے۔<br><br>

بینک عملے کی کارکردگی سے متاثر ہو کر راجہ صاحب نے دعا دی کہ کشمیر بینک "دن دوگنی رات چوگنی ترقی کرے" اور اہم تجاویز بھی پیش کیں۔ چیئرمین ملک مظہر اقبال اعوان نے بطور مہمان خصوصی تقریب میں شرکت کی اور خطاب کرتے ہوئے بینک عملے کو خراج تحسین پیش کیا۔ انہوں نے کہا کہ ان کی فیملی کا بینک سے دیرینہ تعلق رہا ہے اور یہ تعاون مستقبل میں بھی جاری رہے گا۔<br><br>

تقریب میں محکمہ تعلیم کے اعلیٰ افسران، پرنسپل بوائز کالج افضل پور، پرنسپل گرلز کالج افضل پور اور سول سوسائٹی کے معزز اراکین نے بھی شرکت کی اور بینک کے عملے کی خدمات کی تعریف کی۔<br><br>

آخر میں برانچ منیجر وقاص جاوید نے تمام معزز مہمانوں کا شکریہ ادا کیا۔
</div>',
            'image' => 'news-images/kharishreef.jpg',
            'published_date' => '2024-11-09',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'bajk-celebrates-18th-anniversary-pulmanda-branch-khari-sharif',
            'is_published' => true,
        ]);


        NewsAnnouncement::create([
            'title' => 'BAJK Celebrates 18th Anniversary with Cake-Cutting Ceremony in Rawalakot',
           'content' => 'Rawalakot<br><br>
A cake-cutting ceremony took place at the Main Branch in Rawalakot to commemorate the 18th anniversary of the Bank of Azad Jammu and Kashmir (BAJK). The event was honored by the presence of Deputy Commissioner Poonch, Syed Mumtaz Kazmi, and Assistant Commissioner Sardar Mushtaq. They were warmly received by the Chief Manager of the Main Branch, Rawalakot.<br><br>

Divisional Head of CMD, Mr. Imtiaz Shaheen, was also present and delivered an inspiring briefing highlighting the bank’s notable achievements over the years. The Regional Head, Regional Operations Manager (ROM), and Regional Business Manager (RBM) from the Rawalakot Region also participated, contributing to the celebratory atmosphere as all attendees marked this significant milestone with pride.<br><br>

<div dir="rtl" style="text-align: right;">
<b>راولا کوٹ</b><br><br>
بینک آف آزاد جموں و کشمیر (BAJK) کی 18ویں سالگرہ کے موقع پر راولا کوٹ کی مین برانچ میں ایک پروقار کیک کاٹنے کی تقریب منعقد کی گئی۔ اس تقریب میں ڈپٹی کمشنر پونچھ، جناب سید ممتاز کاظمی، اور اسسٹنٹ کمشنر سردار مشتاق نے شرکت کی۔ مین برانچ راولا کوٹ کے چیف منیجر نے معزز مہمانوں کا استقبال کیا۔<br><br>

اس موقع پر کمانڈ ڈویژن کے ڈویژنل ہیڈ، جناب امتیاز شاہین، بھی موجود تھے، جنہوں نے بینک کی گزشتہ سالوں کی کامیابیوں پر ایک حوصلہ افزا بریفنگ دی۔ راولا کوٹ ریجن کے ریجنل ہیڈ، ریجنل آپریشن منیجر (ROM)، اور ریجنل بزنس منیجر (RBM) نے بھی اس اہم موقع پر شرکت کی اور تقریب کو مزید خوشگوار اور یادگار بنایا۔
</div>',
            'image' => 'news-images/rawlakot.jpg',
            'published_date' => '2024-11-09',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-celebrates-18th-anniversary-cake-cutting-rawalakot',
            'is_published' => true,
        ]);
        NewsAnnouncement::create([
            'title' => 'AJK Finance Minister and Chairman Bank of AJK Emphasizes Role of Kashmir Bank in Regional Business Growth',
           'content' => 'Mirpur<br><br>
The Finance and Cooperative Minister of the Azad Government of the State of Jammu and Kashmir, and Chairman of the Bank of Azad Jammu and Kashmir (BAJK), Khan Abdul Majid Khan, stated that Kashmir Bank is playing a vital role in promoting business activities across the region. Attractive loan schemes, including Small Business Trade Finance (SBTF), are significantly boosting business development.<br><br>

He made these remarks during a meeting with the leadership of the AJK Chamber of Commerce & Industry. The meeting, chaired by the Finance Minister, focused on strengthening the partnership between Kashmir Bank and the business community.<br><br>

The event was organized by BAJK and attended by Chamber President Mr. Umar Shehzad, General Secretary Syed Nishat Hussain Kazmi, former presidents Mr. Faisal Manzoor, Syed Sabir Hussain Shah, Mr. Azeem Mushtaq, Mr. Muhammad Rizwan, Sardar Azad Khan, Mr. Sohail Shuja, President of Anjuman Tajiran Raja Khalid Mehmood, and Ch. Muhammad Ayaz of Siraj Steel Mills, along with other distinguished business personalities.<br><br>

CRBD Head Raja Ghulam Mustafa, Regional Head Mr. Muhammad Waseem Khan, and other BAJK officials welcomed the guests.<br><br>

The Chairman praised the outstanding performance of President Mr. Shahid Shahzad Mir and his team. He shared that under the SBTF scheme, BAJK is providing loans of up to PKR 500,000 to small business owners and traders on easy terms and low markup. These loans are processed quickly and include 100% life and stock insurance, contributing to rapid socio-economic development.<br><br>

<div dir="rtl" style="text-align: right;">
<b>میرپور</b><br><br>
آزاد حکومت ریاست جموں و کشمیر کے وزیر خزانہ و امداد باہمی اور بینک آف آزاد جموں و کشمیر کے چیئرمین خان عبدالماجد خان نے کہا ہے کہ کشمیر بینک خطے میں کاروباری سرگرمیوں کے فروغ میں کلیدی کردار ادا کر رہا ہے۔ سمال بزنس ٹریڈ فنانس (SBTF) سمیت متعدد پرکشش قرضہ سکیمیں کاروباری ترقی کا ذریعہ بن رہی ہیں۔<br><br>

انہوں نے یہ بات آزاد جموں و کشمیر چیمبر آف کامرس و انڈسٹری کے رہنماؤں سے ایک اجلاس میں کہی، جس کی صدارت انہوں نے خود کی۔ اجلاس میں کشمیر بینک اور تاجر برادری کے مابین کاروباری تعلقات کو مزید مستحکم بنانے پر تبادلہ خیال کیا گیا۔<br><br>

بینک کے زیرِ اہتمام اس اجلاس میں چیمبر کے صدر عمر شہزاد، جنرل سیکریٹری سید نشاط حسین کاظمی، سابق صدور فیصل منظور، سید صابر حسین شاہ، عظیم مشتاق، محمد رضوان، سردار آزاد خان، سہیل شجاع، انجمن تاجراں کے صدر راجہ خالد محمود، سراج اسٹیل ملز کے چودھری محمد ایاز اور دیگر معزز کاروباری شخصیات نے شرکت کی۔ بینک کی جانب سے سی آر بی ڈی ہیڈ راجہ غلام مصطفیٰ، ریجنل ہیڈ محمد وسیم خان سمیت دیگر افسران نے معزز مہمانوں کا استقبال کیا۔<br><br>

چیئرمین نے ادارے کی شاندار کارکردگی پر روشنی ڈالتے ہوئے صدر بینک جناب شاہد شہزاد میر اور ان کی ٹیم کو خراج تحسین پیش کیا۔ انہوں نے بتایا کہ SBTF اسکیم کے تحت چھوٹے تاجروں کو 5 لاکھ روپے تک کے قرضے آسان شرائط اور کم از کم مارک اپ پر دیے جا رہے ہیں، جن میں تیز ترین پراسیسنگ اور 100% لائف و سٹاک انشورنس شامل ہے، جو خطے کی سماجی و معاشی ترقی کا باعث بن رہی ہے۔<br><br>

اس موقع پر بزنس کمیونٹی نے کشمیر بینک سے محبت کا اظہار کیا اور باہمی تعاون کو مزید فروغ دینے کا عزم ظاہر کیا، جبکہ کاروباری تعلقات کو مزید مضبوط بنانے کے لیے مفید تجاویز بھی پیش کی گئیں۔
</div>',
            'image' => 'news-images/business.jpg',
            'published_date' => '2024-11-01',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'ajk-finance-minister-highlights-kashmir-bank-role-in-regional-business-growth',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'AJK Finance Minister Khan Abdul Majid Khan’s Visit to Bank of AJK: Focus on Service and Customer Relations',
          'content' => 'Muzaffarabad<br><br>
The Finance & Cooperatives Minister of the Azad Government of the State of Jammu & Kashmir and Chairman of the Bank of Azad Jammu & Kashmir (BAJK), Mr. Khan Abdul Majid Khan, recently visited the bank’s field monitoring offices and branches in Mirpur. He chaired a meeting with managers and officers at the regional office and also visited the Overseas Desk at the Main Branch. CRBD Head Raja Ghulam Mustafa and Mirpur Regional Head Muhammad Waseem Khan accompanied him during the visit.<br><br>

On this occasion, he reviewed the professional performance of the staff and issued directives regarding banking services for customers. He stated that the overall improvement in services and strengthened business relations with customers have earned the bank special attention and trust. As a result, there has been a notable increase in the bank’s profits, assets, deposits, and home remittances — reflecting the strong confidence of overseas Pakistanis and other valued customers in the institution.<br><br>

While interacting with customers, he described them as the bank’s most valuable asset. He urged the staff to further strengthen business relationships and enhance customer service, emphasizing that stronger ties with clients will lead to greater growth for the bank.<br><br>

<div dir="rtl" style="text-align: right;">
<b>مظفر آباد</b><br><br>
آزاد حکومت ریاست جموں و کشمیر کے وزیر خزانہ و امداد باہمی اور بینک آف آزاد جموں و کشمیر کے چیئرمین خان عبدالماجد خان نے گزشتہ روز میرپور میں ادارے کے فیلڈ نگراں دفاتر اور برانچوں کا دورہ کیا۔ ریجنل آفس میں منیجرز اور افسران کے اجلاس کی صدارت کی جبکہ مین برانچ میں اوورسیز ڈیسک کا دورہ بھی کیا۔ سی آر بی ڈی ہیڈ راجہ غلام مصطفیٰ اور میرپور ریجن ہیڈ محمد وسیم خان بھی ان کے ہمراہ تھے۔<br><br>

اس موقع پر انہوں نے عملے کی پیشہ ورانہ سرگرمیوں کا جائزہ لیا اور صارفین کے لیے بینکاری خدمات سے متعلق ہدایات جاری کرتے ہوئے کہا کہ مجموعی طور پر خدمات میں بہتری اور صارفین کے ساتھ بزنس تعلقات میں اضافے کی بدولت ادارہ خصوصی توجہ حاصل کر رہا ہے۔ یہی وجہ ہے کہ بینک کے منافع، اثاثہ جات، ڈپازٹس اور ہوم ریمی ٹینسز میں اضافہ ہو رہا ہے، جو کہ سمندر پار پاکستانیوں اور معزز صارفین کے بھرپور اعتماد کا ثبوت ہے۔<br><br>

انہوں نے صارفین کے ساتھ گفتگو کرتے ہوئے انہیں بینک کا قیمتی سرمایہ قرار دیا اور بینک کے عملے کو تلقین کی کہ وہ صارفین کے ساتھ بزنس تعلقات کو مزید مستحکم کریں اور کسٹمر سروس کو بہتر بنائیں۔ انہوں نے کہا کہ جتنا زیادہ صارفین سے تعلق مضبوط ہوگا، اتنا ہی بینک کے کاروبار میں اضافہ ہوگا۔
</div>',
            'image' => 'news-images/visit.jpg',
            'published_date' => '2024-10-30',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'ajk-finance-minister-khan-abdul-majid-khan-visits-bajk-focus-on-service-and-customer-relations',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Bank of Azad Jammu and Kashmir Sponsors Shahidae Jammu Floodlight Football Tournament in Muzaffarabad',
            'content' => 'Muzaffarabad <br><br>
With the support of the Bank of Azad Jammu and Kashmir, the Shuhada-e-Jammu Floodlight Football Tournament was held in Muzaffarabad. A total of 23 teams participated in the tournament. The final match was played between Shah Football Club and Real Football Club, where Shah Club clinched the title in an exciting penalty shootout. This marked Shah Club’s fifth consecutive tournament victory.<br><br>

A large number of spectators attended the match and applauded the players. During the final, a lucky draw was also held for the spectators, and Arsalan Maqbool Kayani won a ticket for Umrah.<br><br>

The President and CEO of the Bank of Azad Jammu and Kashmir, Mr. Shahid Shehzad Mir, was the chief guest on the occasion. He awarded the winning team with the trophy and distributed shields and prizes among the players.<br><br>

The efforts of District Football Association President Mehtab Ahmed Mir, Aamir Hussain Kayani, Raja Azhar Ali, and others were appreciated for successfully organizing and managing the event.<br><br>

<div dir="rtl" style="text-align: right;">
<b>مظفر آباد</b><br><br>
بینک آف آزاد جموں و کشمیر کے تعاون سے مظفر آباد میں شہدائے جموں فلڈ لائٹ فٹبال ٹورنامنٹ کا انعقاد کیا گیا۔ ٹورنامنٹ میں 23 ٹیموں نے حصہ لیا۔ گزشتہ روز ٹورنامنٹ کا فائنل شاہ فٹبال کلب اور ریال فٹبال کلب کے درمیان کھیلا گیا۔ شاہ کلب نے ایک دلچسپ پینلٹی کک پر فائنل ٹائٹل اپنے نام کر لیا۔ یہ شاہ کلب کی مسلسل پانچویں ٹورنامنٹ جیت تھی۔<br><br>

شائقین کی بڑی تعداد نے میچ دیکھا اور کھلاڑیوں کو داد دی۔ فائنل میچ کے شائقین کے لیے قرعہ اندازی کے ذریعے عمرہ کا ٹکٹ ارسلان مقبول کیانی حاصل کرنے میں کامیاب ہو گئے۔<br><br>

اس موقع پر بینک آف آزاد جموں و کشمیر کے صدر و سی ای او جناب شاہد شہزاد میر مہمانِ خصوصی تھے۔ انہوں نے ٹورنامنٹ جیتنے والی ٹیم کو ٹرافی دی، کھلاڑیوں میں شیلڈز اور انعامات تقسیم کیے۔<br><br>

ٹورنامنٹ کے انتظامات، نظم و ضبط پر ڈسٹرکٹ فٹبال ایسوسی ایشن کے صدر مہتاب احمد میر، عامر حسین کیانی، راجہ اظہر علی اور دیگر کو مبارکباد پیش کی گئی۔<br><br>

یہاں یہ بات قابل ذکر ہے کہ کشمیر بینک روایتی بینکاری کے ساتھ ساتھ صحت مند معاشرے کی تعمیر، کھیل اور کھلاڑی کی حوصلہ افزائی کے لیے بھی اپنا کردار ادا کر رہا ہے۔
</div>',
            'image' => 'news-images/jammu.jpg',
            'published_date' => '2024-10-03',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-sponsors-shahidae-jammu-football-tournament-muzaffarabad',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'State Bank Governor Endorses Bank of AJK’s Growth and Path Toward Schedule Bank License',
           'content' => 'Islamabad <br><br>
The Governor of the State Bank of Pakistan highly appreciated the performance of the Bank of Azad Jammu and Kashmir (BAJK) and the steps taken towards acquiring scheduled bank status. He expressed principled agreement with the State Bank’s position to issue a license, commending the pace and manner in which Kashmir’s financial institution is progressing and contributing to the economic and social development of the state. He stated that this bank will soon be among the most successful banks.<br><br>

These remarks were made on Thursday by Governor State Bank Mr. Jameel Ahmed during a meeting with the Finance & Cooperatives Minister of Azad Kashmir and Chairman of the Bank’s Board of Directors, Mr. Khan Abdul Majid Khan, President & CEO Mr. Shahid Shehzad Mir, Secretary Finance and Bank Director Mr. Islam Zaib, and Company Secretary Dr. Adnanullah Khan.<br><br>

While reviewing the performance of Kashmir Bank, the Governor stated that despite not having scheduled bank status, the bank’s performance has been outstanding. He appreciated the launch of Islamic banking by the Bank and advised that once equity and core banking requirements are completed, the bank may formally approach the State Bank.<br><br>

He also praised the bank’s initiative to establish an exchange company, assuring that a license would be issued by the State Bank upon completion of the required regulatory framework.<br><br>

Earlier, the Chairman informed the Governor about the importance of BAJK in the state’s economy, the connection and interest of overseas Kashmiri expatriates in the bank, and the significance of acquiring a scheduled bank license.<br><br>

He highlighted several initiatives undertaken by the financial institution and the state government to achieve this status, including the installation of core banking software, improvement of loan schemes, preparation of a business case for submission to the State Bank, and hiring of a consultant to fulfill legal requirements. He also mentioned that the people of Azad Kashmir, especially overseas Kashmiris and the corporate sector, have shown a strong desire to see the bank attain scheduled status.<br><br>

The Chairman further emphasized that inclusion of the bank in government projects like hydropower, tourism, women’s economic empowerment, agriculture, and housing would significantly accelerate its growth. Additionally, the appointment of a focal person by the State Bank for licensing guidance and cooperation, along with the opening of a corporate office in Islamabad, would yield positive business outcomes.<br><br>

Earlier, President Mr. Shahid Shehzad Mir briefed the Governor on the bank’s history, organizational structure, expanding network, customer outreach, paid-up capital, and overall financial performance.<br><br>

The Governor attentively listened to the bank team’s briefing and expressed principled agreement with the institution’s stance regarding the acquisition of scheduled bank status. Souvenirs were also presented to the Governor on this occasion.<br><br>

<div dir="rtl" style="text-align: right;">
<b>اسلام آباد</b><br><br>
گورنر سٹیٹ بینک آف پاکستان نے بینک آف آزاد جموں و کشمیر کی کارکردگی اور شیڈول بینک درجہ کے حصول سے متعلق اقدامات کی زبردست تعریف اور حوصلہ افزائی کرتے ہوئے سٹیٹ بینک کی جانب سے لائسنس اجراء کرنے کے موقف سے اصولی اتفاق کر لیا اور کہا کہ جس انداز و رفتار سے کشمیر کا مالیاتی ادارہ ترقی کی جانب گامزن رہتے ہوئے ریاست کی معاشی و سماجی ترقی میں کردار ادا کر رہا ہے، اس سے ظاہر ہوتا ہے کہ یہ بینک بہت جلد کامیاب ترین بینکوں کی صف میں شامل ہو جائے گا۔<br><br>

جمعرات کو یہاں ان خیالات کا اظہار گورنر سٹیٹ بینک جناب جمیل احمد نے آزاد کشمیر کے وزیر خزانہ و کوآپریٹوز اور بینک بورڈ آف ڈائریکٹرز کے چیئرمین خان عبدالماجد خان، صدر و چیف ایگزیکٹو آفیسر جناب شاہد شہزاد میر، آزاد کشمیر کے سیکریٹری فنانس اور ڈائریکٹر بینک جناب اسلام زیب، کمپنی سیکرٹری ڈاکٹر عدنان اللہ خان کے ساتھ ایک میٹنگ کے دوران بات چیت کرتے ہوئے کیا۔<br><br>

گورنر نے کشمیر بینک کی کارکردگی کا جائزہ لیتے ہوئے کہا کہ شیڈول نہ ہونے کے باوجود آزاد کشمیر بینک کی کارکردگی شاندار رہی ہے۔ انہوں نے کشمیر بینک کی جانب سے اسلامک بینکنگ شروع کرنے کی تعریف کی اور کہا کہ بینک ایکویٹی اور کور بینکنگ سے متعلق لوازمات مکمل کر کے سٹیٹ بینک سے رجوع کرے۔<br><br>

بینک کی جانب سے ایکسچینج کمپنی کھولنے کی بھی تعریف کرتے ہوئے گورنر نے کہا کہ اس سلسلے میں قواعد و ضوابط مکمل ہونے پر سٹیٹ بینک کی جانب سے لائسنس جاری کر دیا جائے گا۔<br><br>

قبل ازیں، چیئرمین نے ریاستی معیشت میں بینک آف آزاد جموں و کشمیر کی اہمیت، ادارے کے ساتھ سمندر پار کشمیری تارکین وطن کی وابستگی اور دلچسپی، شیڈول درجہ دلانے کے لیے لائسنس اجرائیگی کی اہمیت و افادیت، مالیاتی ادارے اور ریاستی حکومت کی جانب سے ترقی اور شیڈول بینک درجہ کے حصول کے لیے اٹھائے گئے اقدامات سے آگاہ کیا۔<br><br>

جن میں قابل ذکر کور بینکنگ سافٹ ویئر کی تنصیب، قرضہ جات منصوبوں کی از سر نو بہتری، اسٹیٹ بینک میں درخواست دائر کرنے کے لیے بزنس کیس کی تیاری اور قانونی لوازمات کی تکمیل کے لیے کنسلٹنٹ کی خدمات کا حصول شامل ہیں۔<br><br>

آزاد کشمیر کے عوام بالخصوص سمندر پار تارکین وطن کشمیریوں و کارپوریٹ سیکٹر کی بینک کو شیڈول کا درجہ دینے کی خواہشات بھی شامل ہیں۔<br><br>

چیئرمین نے مزید بتایا کہ بینک کو حکومت پاکستان کے پن بجلی، سیاحت، معاشی طور پر خواتین کو بااختیار بنانے، زراعت و ہاؤسنگ جیسے خصوصی منصوبوں میں شامل کرنے سے بینک کی ترقی میں تیزی آئے گی۔<br><br>

علاوہ ازیں سٹیٹ بینک کی جانب سے اس بینک کو لائسنس کے اجراء، رہنمائی و تعاون کے لیے فوکل پرسن کی نامزدگی جب کہ اسلام آباد میں بینک کے کارپوریٹ دفتر کھولنے کے مثبت کاروباری نتائج برآمد ہوں گے۔<br><br>

قبل ازیں گورنر سٹیٹ بینک کو صدر بینک جناب شاہد شہزاد میر کی جانب سے ریاستی بینک کی تاریخ، انتظامی ڈھانچے، پھیلتے ہوئے نیٹ ورک اور صارفین تک رسائی، ادا شدہ سرمایہ سمیت فنانشل ترقی کی صورتحال سے متعلق بریفنگ دی گئی۔<br><br>

جناب گورنر نے بینک ٹیم کی بریفنگ دلچسپی اور توجہ سے سنی اور شیڈول بینک درجہ کے حصول کے لیے ادارے کے موقف پر اصولی اتفاق کر لیا۔ اس موقع پر گورنر سٹیٹ بینک کو سوینئرز پیش کی گئیں۔
</div>',
            'image' => 'news-images/schedule.jpg',
            'published_date' => '2024-09-19',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'state-bank-governor-endorses-bajk-growth-schedule-bank-license-path',
            'is_published' => true,
        ]);
        NewsAnnouncement::create([
            'title' => '79th Board of Directors Meeting of BAJK Approves Semi-Annual Financial Accounts, Expresses Satisfaction Over Profit and Asset Growth',
           'content' => 'Muzaffarabad <br><br>
The 79th meeting of the Board of Directors of the Bank of Azad Jammu & Kashmir was held under the chairmanship of Mr. Khan Abdul Majid Khan, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of the Bank. The meeting took place on Monday at the Bank’s Head Office and was attended by President & Chief Executive Officer Mr. Shahid Shehzad Mir; Directors; Secretary Finance, Government of Azad Jammu & Kashmir, Mr. Islam Zaib; Secretary Industries & Commerce Mr. Khalid Mahmood Mirza; Secretary Law & Justice Mr. Muhammad Sajjad; Mr. Mubashir Nabi; Mr. Zulfiqar Abbasi; Ms. Bushra Naz Malik; and Company Secretary Dr. Adnan Ullah Khan.<br><br>

Various operational agendas, including the financial accounts for the first half of the year (as of June 30, 2024), were presented during the meeting. After detailed discussions, the items were approved. According to the half-yearly financial accounts, the Bank has recorded consistent growth in profit, assets, deposits, and remittances. Customers are being offered attractive loan schemes on easy terms and with minimal markup.<br><br>

The Board was informed that during the first half of the current year, the Bank earned an operating profit of Rs. 906 million. The Bank’s assets increased to Rs. 48 billion, and deposits rose to Rs. 39 billion. Under various attractive schemes, loans amounting to Rs. 4.5 billion were provided to customers.<br><br>

The Board appreciated the excellent performance and acknowledged the contributions of all stakeholders, reaffirming the commitment to continue the Bank’s journey of success and progress.<br><br>

<div dir="rtl" style="text-align: right;">
<b>مظفرآباد</b><br><br>
آزاد حکومت ریاست جموں و کشمیر کے وزیر خزانہ و امداد باہمی اور بینک آف آزاد جموں و کشمیر کے چیئرمین جناب خان عبدالماجد خان کی زیر صدارت بینک کے بورڈ آف ڈائریکٹرز کا 79واں اجلاس منعقد ہوا۔ پیر کے روز بینک کے ہیڈ آفس میں منعقدہ اجلاس میں صدر و چیف ایگزیکٹو آفیسر جناب شاہد شہزاد میر، ڈائریکٹرز صاحبان، سیکریٹری فنانس حکومت آزاد جموں و کشمیر جناب اسلام زیب، سیکریٹری صنعت و حرفت جناب خالد محمود مرزا، سیکریٹری قانون و انصاف جناب محمد سجاد، جناب مبشر نبی، جناب ذوالفقار عباسی، محترمہ بشریٰ ناز ملک اور کمپنی سیکریٹری ڈاکٹر عدنان اللہ خان نے شرکت کی۔<br><br>

اجلاس میں سال کے پہلے ششماہی فنانشل اکاؤنٹس (30 جون 2024) سمیت مختلف آپریشنل ایجنڈے پیش کئے گئے جن کی مفصل بحث و مباحثہ کے بعد منظوری دی گئی۔ ششماہی فنانشل اکاؤنٹس کے مطابق بینک کے منافع، اثاثہ جات، ڈیپازٹس اور ترسیلات زر میں مسلسل اضافہ ہو رہا ہے جب کہ صارفین کو آسان شرائط اور کم از کم مارک اپ پر پرکشش قرضہ جات فراہم کیے جا رہے ہیں۔<br><br>

بورڈ کو بتایا گیا کہ رواں سال کی پہلی ششماہی میں بینک نے 906 ملین روپے آپریٹنگ منافع حاصل کیا، اثاثہ جات بڑھ کر 48 ارب روپے تک پہنچ گئے، اور ڈیپازٹس 39 ارب روپے ہو گئے۔ مختلف پرکشش اسکیموں کے تحت صارفین کو 4.5 ارب روپے کے قرضہ جات فراہم کیے گئے۔<br><br>

بورڈ نے شاندار کارکردگی اور تعاون پر تمام اسٹیک ہولڈرز کے کردار کی تعریف کرتے ہوئے بینک کی کامیابی اور ترقی کے سفر کو جاری رکھنے کے عزم کا اعادہ کیا۔<br><br>

اس موقع پر جناب چیئرمین نے کہا کہ حکومت کی سرپرستی میں ادارے کو کامیاب اور صف اول کے بینکوں میں شامل کرنے کے لیے تمام کوششیں بروئے کار لائی جا رہی ہیں۔ انہوں نے کہا کہ عملے کی محنت، ٹیم ورک، اور معزز صارفین کے بھرپور تعاون سے بہترین بزنس نتائج کے حصول کا سلسلہ جاری رکھا جائے گا۔
</div>',
            'image' => 'news-images/79meeting.jpg',
            'published_date' => '2024-09-02',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-79th-board-meeting-approves-financials-highlights-growth',
            'is_published' => true,
        ]);


        // Create additional random news announcements
        // NewsAnnouncement::factory(15)->create();
    }
}
