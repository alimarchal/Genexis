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
            'title' => 'Bank of Azad Jammu & Kashmir Holds 89th Board Meeting: Strategic Approvals and Vision for Future Growth',
            'content' => 'BAJK Board of Directors 89th Meeting Held at Bank Head Office, Muzaffarabad <br>
Muzaffarabad <br>              
June 04, 2025 <br>
The 89th meeting of the Board of Directors of Bank of Azad Jammu & Kashmir (BAJK) was held on Wednesday at the Bank’s Head Office in Muzaffarabad under the chairmanship of Mr. Khan Abdul Majid Khan, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of BAJK.<br>
The meeting was attended by President & CEO Mr. Shahid Shahzad Mir, members of the Board of Directors, Secretary Finance, AJK Mr. Islam Zaib, Secretary Industries & Commerce Mr. Khalid Mahmood Mirza, Secretary Law & Justice Mr. Muhammad Sajjad, Ms. Bushra Naz Malik (via Zoom), and Company Secretary Dr. Adnanullah Khan.<br>

Key Agenda Items Discussed & Approved: <br>
1. Financial Accounts (Q1 2025): The Board reviewed and approved the financial results for the first quarter of 2025, reflecting strong growth in profitability, assets, deposits, and remittances.<br>

2. Core Banking Modernization (MoU with Silverlake): A detailed briefing was given on the Memorandum of Understanding (MoU) with Silverlake for the upgradation of BAJK’s Core Banking System, aimed at enhancing digital banking services and operational efficiency.<br>

3. Consumer-Friendly Initiatives:<br>

Chairman’s Remarks:<br>
Chairman Mr. Khan Abdul Majid Khan commended the dedication of BAJK’s team, management, and stakeholders in achieving remarkable milestones. He reiterated the Bank’s commitment to excellence, innovation, and growth, ensuring BAJK emerges as a leading financial institution under the government’s patronage.<br>

Future Vision:<br>
The Board reaffirmed its resolve to sustain progress, expand services, and adopt cutting-edge banking technologies for the benefit of customers and stakeholders. <br>


<br><br><br><br>
<p style="direction: rtl; text-aligh: right;">
 بینک آف آزاد جموں و کشمیر کے بورڈ آف ڈائریکٹرز کا 89 واں اجلاس
مظفرآباد
4 جون 2025

بینک آف آزاد جموں و کشمیر (BAJK) کے بورڈ آف ڈائریکٹرز کا 89 واں اجلاس بدھ کے روز بینک کے ہیڈ آفس مظفرآباد میں منعقد ہوا۔ اجلاس کی صدارت محترم خان عبدالماجد خان، وزیر خزانہ و کوآپریٹو، حکومت آزاد جموں و کشمیر اور چیئرمین BAJK نے کی۔

اجلاس میں صدر و چیف ایگزیکٹو آفیسر جناب شاہد شہزاد میر، بورڈ آف ڈائریکٹرز کے ممبران، سیکرٹری خزانہ آزاد کشمیر جناب اسلام زیب، سیکرٹری صنعت و تجارت جناب خالد محمود مرزا، سیکرٹری قانون و انصاف جناب محمد سجاد، محترمہ بشریٰ ناز ملک (زوم کے ذریعے)، اور کمپنی سیکرٹری ڈاکٹر عدنان اللہ خان نے شرکت کی۔

زیر بحث اور منظور شدہ اہم ایجنڈا نکات:
مالیاتی اکاؤنٹس (پہلی سہ ماہی 2025): بورڈ نے سال 2025 کی پہلی سہ ماہی کے مالیاتی نتائج کا جائزہ لیا اور منظوری دی، جن میں منافع، اثاثہ جات، ڈپازٹس اور ترسیلات زر میں نمایاں اضافہ ظاہر کیا گیا۔

کور بینکنگ نظام کی جدید کاری (Silverlake کے ساتھ مفاہمتی یادداشت): Silverlake کمپنی کے ساتھ کور بینکنگ سسٹم کی اپ گریڈیشن سے متعلق مفاہمتی یادداشت (MoU) پر تفصیلی بریفنگ دی گئی، جس کا مقصد ڈیجیٹل بینکنگ خدمات اور عملیاتی کارکردگی کو بہتر بنانا ہے۔

صارف دوست اقدامات: متعدد عوامی مفاد میں اقدامات بھی زیر غور آئے۔

چیئرمین کے تاثرات:
چیئرمین محترم خان عبدالماجد خان نے BAJK کی ٹیم، انتظامیہ اور تمام شراکت داروں کی محنت اور لگن کو سراہا اور بینک کی ترقی، جدت اور معیار کے لیے مسلسل کوششوں کے عزم کا اظہار کیا۔ انہوں نے اس بات پر زور دیا کہ حکومت کی سرپرستی میں BAJK ایک نمایاں مالیاتی ادارہ بن کر ابھرے گا۔

مستقبل کا وژن:
بورڈ نے اس عزم کا اعادہ کیا کہ وہ ترقی کا سفر جاری رکھے گا، خدمات میں توسیع کرے گا، اور صارفین و شراکت داروں کے مفاد میں جدید ترین بینکاری ٹیکنالوجی اپنائے گا۔
</p>
',

            'image' => 'news-images/89meeting.jpg',
            'published_date' => '2025-06-04',
            'is_featured' => false,
            'category' => 'general',
            'slug' => '89th-board-meeting-bajk-muzaffarabad',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Bank of Azad Jammu and Kashmir Signs Strategic MoU with Silverlake to Advance Digital Banking Infrastructure',
            'content' => 'The Bank of Azad Jammu and Kashmir (BAJK) has signed a Memorandum of Understanding (MoU) with Silverlake , a world-renowned Malaysian company, marking a significant step towards digitalization and scheduling. The MoU was signed during a ceremony held in Kuala Lumpur, Malaysia, after which documents were exchanged. Azad Jammu and Kashmir Minister for Finance and Cooperatives/Chairman of BAJK, Khan Abdul Majid Khan, President/CEO of BAJK, Mr. Shahid Shahzad Mir, and representatives of Silverlake were present on the occasion. <br> 
Notably, the local partner of Silverlake, I-Consult played an instrumental role in facilitating this MoU, and its representatives Mr. Shahid Ahmed Khan and Mr. Khurram Jamal were also present during the signing ceremony, contributing to the successful collaboration. <br>
Silverlake is a leading company providing core banking and digital technology services to over 370 banks and financial institutions across 80 countries. It is globally recognized for its advanced core banking software technology and a 100% success rate.  <br>
With this agreement, BAJK has achieved a major milestone in modernizing its banking infrastructure. The partnership will enable the bank to implement the latest banking software, a key requirement for obtaining a scheduling license under the regulatory framework of the State Bank of Pakistan. This development will bring Kashmir Bank on par with all major banks in Pakistan.  <br>
Speaking at the event, Chairman Khan Abdul Majid Khan stated that this MoU is not just a technical upgrade but the foundation of a revolution. It will allow BAJK to serve its customers more efficiently and transparently while contributing to the economic growth and prosperity of Azad Jammu and Kashmir.<br>
بینک آف آزاد جموں و کشمیر نے شیڈولنگ کے حصول اور ڈیجیٹلائزیشن کی جانب اہم پیش رفت کرتے ہوئے ملائیشیا کی عالمی شہرت یافتہ کمپنی سلور لیک کے ساتھ مفاہمت کی یادداشت پر دستخط کر دیئے ہیں۔ بدھ کی شام کوالالمپور، ملائیشیا میں منعقدہ ایک تقریب کے دوران مفاہمت کی یادداشت پر دستخط کے بعد دستاویزات کا تبادلہ کیا گیا۔ اس موقع پر آزاد جموں و کشمیر کے وزیر خزانہ و کواپریٹوز / چیئرمین بینک خان عبدالماجد خان، صدر/ سی ای او بینک جناب شاہد شہزاد میر اور سلور لیک کے نمائندگان بھی موجود تھے۔ سلور لیک دنیا کے 80 ممالک میں 370 سے زیادہ بینکوں اور مالیاتی اداروں کو کور بینکنگ اور دیگر ڈیجیٹل ٹیکنالوجی خدمات فراہم کرنے والی کمپنی ہے جو کور بینکنگ سافٹ ویئر ٹیکنالوجی اور اس کے سو فیصد کامیابی کے لئے بھی مشہور ہے، کے ساتھ اس اہم معاہدہ سے بینک آف آزاد جموں و کشمیر نے اپنے بینکنگ انفراسٹرکچر میں جدت لانے کے لئے ایک اہم سنگ میل عبور کیا ہے۔ اس شراکت داری کے ذریعہ بینک میں جدید ترین بینکنگ سافٹ ویئر کی تنصیب کی جائے گی، جو کہ اسٹیٹ بینک آف پاکستان کے ریگولیٹری فریم ورک کے تحت شیڈولنگ لائسنس کے حصول کے لئے ایک بنیادی ضرورت ہے۔ اس تبدیلی کے نتیجہ میں کشمیر بینک پاکستان کے تمام بینکوں کے ساتھ برابری کی پوزیشن پر آ جائے گا۔ تقریب سے خطاب کرتے ہوئے، چیئرمین بینک خان عبدالماجد خان نے کہا کہ مفاہمت کی یہ یادداشت صرف ایک تکنیکی اپ گریڈیشن نہیں ہے بلکہ ایک انقلاب کی بنیاد ہے۔ یہ ہمیں آزاد جموں کشمیر کی اقتصادی ترقی اور خوشحالی میں اپنا کردار ادا کرتے ہوئے اپنے صارفین کو زیادہ بہتر اور شفافیت کے ساتھ خدمت کرنے کا موقع دے گا۔ سلور لیک کی ٹیم نے کہا سلور لیک کو کشمیر بینک کی ترقی میں اپنا کردار ادا کرنے پر فخر ہے اور یہ کور بینکنگ سلوشن پاکستان کے مالیاتی منظر نامے کے لئے ایک معیار قائم کرے گا۔ یہ معاہدہ طویل المدتی شراکت کی بنیاد بنے گا۔ دونوں اداروں نے اپنی ٹیموں کی محنت کو سراہا اور اس منصوبے کو کامیاب بنانے کا عہد کیا۔
',
            'image' => 'news-images/silverlink.jpg',
            'published_date' => '2025-05-29',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-signs-mou-with-silverlake-digital-banking',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Bank of AJK Convenes 88th Board of Directors Meeting Under the Chairmanship of Finance Minister Khan Abdul Majid Khan',
            'content' => 'The 88th Meeting of the Board of Directors of Bank of Azad Jammu & Kashmir Held Under the Chairmanship of Finance Minister Khan Abdul Majid Khan
The 88th meeting of the Board of Directors of Bank of Azad Jammu & Kashmir was held under the chairmanship of Mr. Khan Abdul Majid Khan, Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of the Bank. The meeting was convened on Monday at the Bank’s Head Office.
The meeting was attended by Mr. Shahid Shahzad Mir, President & CEO, members of the Board of Directors, Mr. Islam Zaib, Secretary Finance, Government of AJK, Mr. Khalid Mahmood Mirza, Secretary Industries & Commerce, Mr. Muhammad Sajjad, Secretary Law & Justice, Ms. Bushra Naz Malik (via Zoom), and Dr. Adnanullah Khan, Company Secretary.
The meeting included a review of various operational agenda items, including the financial accounts for the year 2024 (as of December 31, 2024), which were discussed in detail and approved. A comprehensive briefing was also given on core banking matters.
According to the financial accounts, the Bank continues to witness consistent growth in profitability, assets, deposits, and remittances. Attractive loan schemes on easy terms and low markup rates are being provided to customers.
The Board appreciated the outstanding performance and cooperation of all stakeholders and reaffirmed its commitment to continue the Bank’s journey of success and progress.
On this occasion, the Chairman stated that every effort is being made to position the institution among the leading banks under the patronage of the government. He added that with the staff’s hard work, teamwork, and the full support of valued customers, the Bank will continue to achieve excellent business results.<br>
آزاد حکومت ریاست جموں وکشمیر کے وزیر خزانہ و امداد باہمی اوربینک آف آزاد جموں وکشمیر کے چیئرمین جناب خان عبدالماجد خان کی زیرصدارت بینک کے بورڈ آف ڈائریکٹرز کا88واں اجلاس منعقد ہوا۔پیر کے روزبینک کے ہیڈ آفس میں منعقدہ اجلاس میں صدر و چیف ایگزیکٹو آفیسرجناب شاہد شہزاد میر، ڈائریکٹرز صاحبان، سیکریٹری فنانس حکومت آزاد جموں وکشمیرجناب اسلام زیب، سیکریٹری صنعت وحرفت جناب خالد محمود مرزا، سیکریٹری قانون و انصاف جناب محمد سجاد،زوم پر محترمہ بشریٰ ناز ملک اورکمپنی سیکریٹری ڈاکٹرعدنان اللہ خان نے شرکت کی۔اجلاس میں گزشتہ سال 2024کے فنانشل اکاؤنٹس(31دسمبر2024) سمیت مختلف آپریشنل ایجنڈے پیش کئے جن کی مفصل بحث و مباحثہ کے بعد منظوری دی گئی۔ اجلاس کو کور بینکنگ سے متعلق مفصل بریفننگ دی گئی۔ جب کہ فنانشل اکاؤنٹس کے مطابق بینک کے منافع، اثاثہ جات، ڈیپازٹس اور ترسیلات زرمیں مسلسل اضافہ ہو رہا ہے۔صارفین کوآسان شرائط اور کم از کم مارک اپ پرپرکشش قرضہ جات فراہم کئے جا رہے ہیں۔بورڈ نے شاندار کارکردگی اور تعاون پر تمام سٹیک ہولڈرز کے کردار کی تعریف کرتے ہوئے بینک کی کامیابی اور ترقی کے سفر کو جاری رکھنے کے عزم کا اعادہ کیا۔اس موقع پرجناب چیئرمین نے کہا کہ حکومت کی سرپرستی میں ادارے کو کامیاب اور صف اول کے بینکوں میں شامل کرنے کے لئے تمام کوششیں بروئے کار لائی جا رہی ہیں۔انہوں نے کہا کہ عملے کی محنت، ٹیم ورک،معزز صارفین کے بھرپور تعاون سے بہترین بزنس نتائج کے حصول کا سلسلہ جاری رکھا جائےگا۔
',
            'image' => 'news-images/meeting2.jpg',
            'published_date' => '2025-04-28',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bank-of-ajk-88th-board-meeting-chaired-by-finance-minister-khan-abdul-majid',
            'is_published' => true,
        ]);


        NewsAnnouncement::create([
            'title' => 'Bank of AJK Convenes 106th Management Committee Meeting to Drive Strategic Growth and Innovation',
            'content' => 'Bank of AJK Holds 106th Management Committee Meeting <br>
The Bank of Azad Jammu and Kashmir (BAJK) marked a significant milestone with the successful convening of its 106th Management Committee Meeting at the bank’s head office in Muzaffarabad. The session, held under the leadership of Khan Abdul Majid Khan, Chairman of the Board of Directors and Minister for Finance & Cooperative, AJK, brought together key decision-makers to review progress, strategize future initiatives, and reinforce the institution’s commitment to excellence in banking services.<br>
Khan Abdul Majid Khan presided over the meeting, emphasizing the bank’s role in driving economic growth and financial inclusion across AJK. In his remarks, he underscored the importance of innovation, customer-centric policies, and adherence to governance standards. “Our focus remains on empowering communities through accessible financial solutions while maintaining transparency and accountability at all levels,” he stated. <br>
CEO’s Comprehensive Briefing Highlights Achievements and Goals
Mr. Shahid Shahzad Mir, President and CEO of BAJK, delivered a detailed presentation outlining the bank’s financial performance, operational milestones, and strategic priorities. Key highlights included:<br>
Financial Stability: Robust growth in deposits, loans, and profitability despite economic challenges.
Digital Transformation: Progress on expanding digital banking services, including mobile apps and online platforms, to enhance customer convenience.<br>
Branch Network Expansion: Plans to extend services to underserved regions of AJK.
Sustainability Initiatives: Commitment to green financing and CSR projects focused on education, healthcare, and disaster relief.<br>
Mr. Mir also addressed challenges such as cybersecurity, market competition, and regulatory compliance, stressing the need for agility and proactive risk management.<br>
Collaborative Dialogue with Divisional Head
The meeting saw active participation from all divisional heads, who provided updates on their respective domains, including retail banking, corporate finance, IT, HR, and compliance. Discussions centered on improving operational efficiency, staff training programs, and leveraging technology to streamline processes. The Company Secretary ensured adherence to procedural and regulatory frameworks during deliberations.<br>
Key Resolutions and Forward-Looking Agenda
Customer Experience Enhancement: Initiatives to reduce service turnaround times and introduce tailored financial products.
Employee Development: Launch of skill-building workshops and leadership programs to foster a culture of excellence.
Community Engagement: Strengthening partnerships with local stakeholders to address socio-economic needs.<br>
A Unified Commitment to Progress
The meeting concluded with a consensus on maintaining momentum toward BAJK’s vision of becoming a benchmark institution in regional banking. Chairman Khan commended the team’s dedication and urged continued collaboration to achieve shared goals.<br>
Looking Ahead
As BAJK moves forward, the resolutions from the 106th Management Committee Meeting will serve as a roadmap for sustainable growth, innovation, and community impact. The bank reaffirms its pledge to stakeholders: delivering value-driven banking while contributing to the prosperity of Azad Jammu and Kashmir.<br>
Stay connected with BAJK for updates on its journey toward excellence. <br>
بینک آف آزاد جموں و کشمیر کا 106واں مینجمنٹ کمیٹی اجلاس منعقد

بینک آف آزاد جموں و کشمیر (BAJK) نے ایک اہم سنگِ میل عبور کرتے ہوئے اپنا 106واں مینجمنٹ کمیٹی اجلاس کامیابی سے بینک کے ہیڈ آفس مظفرآباد میں منعقد کیا۔ یہ اجلاس خان عبدالمجید خان، چیئرمین بورڈ آف ڈائریکٹرز و وزیر خزانہ و کواپریٹو حکومت آزاد کشمیر، کی سربراہی میں منعقد ہوا۔ اجلاس میں اہم فیصلہ سازوں نے شرکت کی تاکہ بینک کی پیش رفت کا جائزہ لیا جا سکے، آئندہ کے اقدامات پر حکمت عملی تیار کی جا سکے اور بینکنگ خدمات میں اعلیٰ معیار کے عزم کو مزید مضبوط کیا جا سکے۔

خان عبدالمجید خان نے اجلاس کی صدارت کرتے ہوئے آزاد کشمیر میں اقتصادی ترقی اور مالی شمولیت کے فروغ میں بینک کے کردار کو اجاگر کیا۔ انہوں نے زور دیا کہ جدت، صارف دوست پالیسیوں اور معیاری طرز حکمرانی کو اپنانا وقت کی ضرورت ہے۔
انہوں نے کہا: "ہماری توجہ ایسی مالی سہولیات کی فراہمی پر ہے جو عوام کو بااختیار بنائیں، شفافیت اور جوابدہی کو یقینی بناتے ہوئے۔"

صدر و سی ای او کی جامع بریفنگ: کارکردگی اور اہداف کی تفصیل
جناب شاہد شہزاد میر، صدر و چیف ایگزیکٹو آفیسر (CEO) BAJK نے ایک مفصل پریزنٹیشن دی جس میں بینک کی مالی کارکردگی، آپریشنل کامیابیاں اور اسٹریٹجک ترجیحات بیان کی گئیں۔
اہم نکات درج ذیل تھے:

مالی استحکام: چیلنجز کے باوجود ڈپازٹس، قرضوں اور منافع میں مضبوط اضافہ۔

ڈیجیٹل تبدیلی: موبائل ایپلیکیشنز اور آن لائن پلیٹ فارمز کے ذریعے ڈیجیٹل سروسز کی توسیع میں پیش رفت۔

برانچ نیٹ ورک میں توسیع: آزاد کشمیر کے پسماندہ علاقوں تک بینکنگ خدمات کو وسعت دینے کے منصوبے۔

پائیداری اقدامات: گرین فنانسنگ اور CSR منصوبے (تعلیم، صحت، قدرتی آفات سے بحالی پر توجہ)۔

انہوں نے سائبر سیکیورٹی، مارکیٹ میں مقابلہ اور ریگولیٹری تقاضوں جیسے چیلنجز کا بھی ذکر کیا اور چابک دستی اور خطرات کے فعال انتظام پر زور دیا۔

ڈویژنل ہیڈز کے ساتھ تعمیری مکالمہ
اجلاس میں تمام ڈویژنل ہیڈز نے بھرپور شرکت کی اور اپنی اپنی فیلڈز جیسے ریٹیل بینکنگ، کارپوریٹ فنانس، آئی ٹی، ایچ آر اور کمپلائنس پر اپ ڈیٹس پیش کیں۔
تبادلہ خیال کا محور درج ذیل موضوعات رہے:

آپریشنل کارکردگی کو بہتر بنانا

عملے کی تربیتی پروگرام

جدید ٹیکنالوجی کا استعمال

پراسیسز کی آسانی اور بہتری

کمپنی سیکریٹری نے اجلاس کے دوران ریگولیٹری اور طریقہ کار کی مکمل پابندی کو یقینی بنایا۔

اہم فیصلے اور مستقبل کی حکمت عملی
کسٹمر تجربہ میں بہتری: فوری خدمات کی فراہمی اور صارفین کی ضروریات کے مطابق مالیاتی مصنوعات کی تیاری۔

ملازمین کی ترقی: مہارت میں اضافے کے ورکشاپس اور لیڈرشپ پروگرامز کا آغاز۔

سماجی شراکت داری: مقامی اسٹیک ہولڈرز کے ساتھ شراکت کو مضبوط بنانا تاکہ معاشرتی و اقتصادی مسائل حل کیے جا سکیں۔

ترقی کے لیے مشترکہ عزم
اجلاس کا اختتام BAJK کے وژن کو حاصل کرنے کے لیے متحد رہنے کے عزم کے ساتھ ہوا، تاکہ اسے علاقائی بینکاری میں مثالی ادارہ بنایا جا سکے۔
چیئرمین خان عبدالمجید خان نے ٹیم کے جذبے کو سراہا اور باہمی تعاون سے آگے بڑھنے پر زور دیا۔

مستقبل کی سمت
BAJK مستقبل میں اپنی ترقی، جدت، اور سماجی اثرات کے لیے 106ویں مینجمنٹ کمیٹی اجلاس کے فیصلوں کو رہنما اصول کے طور پر استعمال کرے گا۔
بینک نے اپنے تمام اسٹیک ہولڈرز سے یہ عہد دہرایا کہ وہ قدر پر مبنی بینکاری خدمات فراہم کرتے رہیں گے اور آزاد جموں و کشمیر کی خوشحالی میں کردار ادا کرتے رہیں گے۔
',
            'image' => 'news-images/106meeting.jpg',
            'published_date' => '2025-04-11',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-106th-management-committee-meeting-strategic-growth-innovation',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Recognizing Excellence: BAJK Awards Outstanding Employees for Exceptional Performance',
            'content' => 'Muzaffarabad 
Bank of Azad Jammu and Kashmir Honors Top Performers in Prestigious Ceremony**  
In a ceremony marked by celebration and recognition, the Bank of Azad Jammu and Kashmir (BAJK) honored its outstanding employees for their exceptional contributions to the institution’s success. The event, held under the leadership of Chairman Khan Abdul Majid Khan—who also serves as AJK’s Minister for Finance and Cooperative—and President & CEO Shahid Shahzad Mir, underscored the bank’s commitment to excellence and employee motivation.  
**Dignitaries Celebrate Employee Achievements**  
Mr. Khan Abdul Majid Khan, in his dual role as Chairman of the bank and Minister for Finance, emphasized the critical link between employee dedication and institutional growth. Addressing the gathering, he praised the awardees for their hard work and innovation, stating, “Our employees are the backbone of this institution. Their relentless efforts not only drive the bank forward but also contribute to the economic prosperity of Azad Jammu and Kashmir.” He further highlighted the Government’s support for initiatives aimed at enhancing financial inclusion and modernizing banking services across the region.  
Accompanying him, President & CEO Shahid Shahzad Mir echoed these sentiments, applauding the award-winning staff for their role in achieving milestones under his leadership. Mr. Mir remarked, “Today’s honorees exemplify the values of integrity, customer focus, and teamwork that define our bank. Their achievements inspire us all to aim higher and strengthen our position as a trusted financial partner for the people of AJK.”  
**Awards and Accolades**  
The ceremony saw cash prizes and certificates of appreciation distributed to top performers across various departments, including customer service, operational efficiency, and innovative problem-solving. The recipients, visibly moved by the recognition, expressed gratitude for the bank’s supportive environment and leadership. One awardee shared, “This acknowledgment fuels our passion to continue delivering excellence and contributing to the bank’s mission.”  
**A Vision for the Future**  
The event also served as a platform to reiterate the bank’s strategic goals. Mr. Khan and Mr. Mir outlined plans to expand digital banking solutions, improve rural financial access, and invest in employee development programs. Their shared vision positions the Bank of AJK as a catalyst for regional economic growth, aligned with the government’s agenda for sustainable development.  
**A Moment of Pride**  
Attended by executives, the ceremony concluded on a note of collective pride and optimism. The fusion of formal recognition and heartfelt appreciation highlighted the institution’s culture of valuing its workforce.  
As the Bank of Azad Jammu and Kashmir continues to break new ground, events like these reaffirm its commitment to nurturing talent, fostering innovation, and serving the community with unwavering dedication. Here’s to many more milestones ahead! <br>
مظفرآباد
بینک آف آزاد جموں و کشمیر کی جانب سے اعلیٰ کارکردگی دکھانے والے ملازمین کو خراجِ تحسین

ایک پُروقار تقریب میں بینک آف آزاد جموں و کشمیر (BAJK) نے اپنے نمایاں کارکردگی دکھانے والے ملازمین کو ادارے کی ترقی میں ان کے شاندار کردار پر اعزازات سے نوازا۔ یہ تقریب چیئرمین خان عبدالمجید خان (جو وزیر خزانہ و کواپریٹو، آزاد کشمیر بھی ہیں) اور صدر و سی ای او شاہد شہزاد میر کی قیادت میں منعقد ہوئی، جس کا مقصد بہترین کارکردگی کو سراہنا اور ملازمین کی حوصلہ افزائی کرنا تھا۔

شخصیات نے ملازمین کی کامیابیوں کو سراہا
چیئرمین خان عبدالمجید خان نے اپنے خطاب میں کہا کہ ملازمین کی محنت اور لگن ہی ادارے کی ترقی کی بنیاد ہے۔ انہوں نے اعزاز حاصل کرنے والے ملازمین کی تعریف کرتے ہوئے کہا:
"ہمارے ملازمین اس ادارے کی ریڑھ کی ہڈی ہیں۔ ان کی انتھک محنت نہ صرف بینک کو کامیابی کی راہ پر گامزن رکھتی ہے بلکہ آزاد جموں و کشمیر کی معاشی خوشحالی میں بھی اہم کردار ادا کرتی ہے۔"

انہوں نے مزید کہا کہ حکومت مالی شمولیت کے فروغ اور بینکنگ خدمات کو جدید بنانے کے لیے مکمل تعاون فراہم کر رہی ہے۔

صدر و سی ای او جناب شاہد شہزاد میر نے بھی اعزاز یافتگان کی تعریف کی اور کہا:
"آج کے اعزاز یافتہ ملازمین دیانتداری، صارف پر توجہ، اور ٹیم ورک کی اعلیٰ مثال ہیں۔ ان کی کامیابیاں ہم سب کو مزید بہتر کام کرنے کی ترغیب دیتی ہیں اور ہمیں ایک قابلِ اعتماد مالی ادارہ بننے کی راہ پر گامزن رکھتی ہیں۔"

اعزازات اور انعامات
تقریب کے دوران مختلف شعبوں میں نمایاں کارکردگی دکھانے والے ملازمین کو نقد انعامات اور تعریفی اسناد دی گئیں۔ شعبوں میں کسٹمر سروس، آپریشنل ایفیشنسی، اور جدید مسئلہ حل کرنے کی صلاحیت شامل تھیں۔

اعزاز حاصل کرنے والے ملازمین نے اپنے خیالات کا اظہار کرتے ہوئے بینک کے سازگار ماحول اور قیادت کی تعریف کی۔ ایک اعزاز یافتہ ملازم نے کہا:
"یہ اعتراف ہماری محنت کو جِلا بخشتا ہے اور ہمیں مزید جوش و جذبے کے ساتھ ادارے کے مشن میں حصہ ڈالنے کی ترغیب دیتا ہے۔"

مستقبل کے اہداف
تقریب میں بینک کی آئندہ حکمت عملی پر بھی روشنی ڈالی گئی۔ چیئرمین اور سی ای او نے ڈیجیٹل بینکنگ میں وسعت، دیہی علاقوں میں مالی سہولیات کی بہتری، اور ملازمین کی تربیت و ترقی کے لیے اقدامات کا اعلان کیا۔
یہ وژن بینک آف AJK کو خطے کی معاشی ترقی کا محرک بنانے کے لیے حکومت کے پائیدار ترقی کے ایجنڈے سے ہم آہنگ ہے۔

فخر کا لمحہ
اعلیٰ عہدیداران کی موجودگی میں تقریب کا اختتام فخر اور اُمید کے جذبات کے ساتھ ہوا۔
بینک کی جانب سے اپنے عملے کی باقاعدہ قدر دانی اور سراہنے کا یہ انداز ادارے کے مثبت اور باہمی احترام پر مبنی ماحول کو ظاہر کرتا ہے۔

جوں جوں بینک آف آزاد جموں و کشمیر نئی کامیابیاں حاصل کر رہا ہے، ایسی تقریبات اس بات کا ثبوت ہیں کہ ادارہ اپنے ہنرمند ملازمین کو قدر کی نگاہ سے دیکھتا ہے، جدت کی حوصلہ افزائی کرتا ہے، اور کمیونٹی کی خدمت کو اپنا مشن سمجھتا ہے۔
',
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
Islamabad() 07 April 2025 <br>
President of Azad Jammu and Kashmir, Barrister Sultan Mehmood Chaudhry, Holds Detailed Meeting with BAJK President Shahid Shahzad Mir at Kashmir House, Islamabad
President of the Bank of Azad Jammu and Kashmir (BAJK), Mr. Shahid Shahzad Mir, held a comprehensive meeting with the President of Azad Jammu and Kashmir, Barrister Sultan Mehmood Chaudhry, at Kashmir House, Islamabad.<br>
During the meeting, Mr. Shahid Shahzad Mir briefed the President in detail on the performance, ongoing challenges, and various affairs of the Bank of Azad Jammu and Kashmir.<br>
President Barrister Sultan Mehmood Chaudhry instructed Mr. Mir to utilize all available resources to transform the Bank of Azad Jammu and Kashmir into a scheduled bank.<br>
He also assured his full cooperation and support in this regard.<br>
صدارتی سیکرٹریٹ،ایوان صدر،کشمیر ہاؤس،اسلام آباد<br>
07-04-2025<br>
اسلام آباد( )07اپریل 2025ء<br>
صدر ریاست آزاد جموں و کشمیر بیرسٹر سلطان محمود چوہدری سے صدر آزاد جموں وکشمیر بینک شاہد شہزاد میر کی ایوان صدر کشمیر ہاؤس اسلام آباد میں تفصیلی ملاقات۔ اس موقع پر صدر آزاد جموں وکشمیر بیرسٹر سلطان محمود چوہدری کو صدر آزاد جموں وکشمیر بینک شاہد شہزاد میر نے آزاد جموں وکشمیر بینک کی کارکردگی، درپیش مسائل اور دیگر معاملات پر تفصیلی بریفنگ دی۔ صدر آزاد جموں وکشمیر بیرسٹر سلطان محمود چوہدری نے صدر آزاد جموں وکشمیر بینک شاہد شہزاد میر کو ہدایت کی کہ آزادجموں وکشمیر بینک کو شیڈول بینک بنانے کے لئے تمام تر توانائیاں بروئے کارلائی جائیں اور اس سلسلے میں صدر ریاست آزادجموں وکشمیر بیرسٹر سلطان محمود چوہدری نے صدر آزاد جموں وکشمیر بینک شاہد شہزاد میر کو اپنے ہر ممکن تعاون کا یقین دلایا۔ اس موقع پر صدر آزاد جموں وکشمیر بیرسٹر سلطان محمود چوہدری اور صدر آزاد جموں وکشمیر بینک شاہد شہزاد میر کے درمیان باہمی دلچسپی سمیت دیگر امور پربھی تبادلہ خیال کیا گیا۔
',
            'image' => 'news-images/barister.jpg',
            'published_date' => '2025-04-09',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'barrister-sultan-mehmood-assures-support-for-bajk-growth',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'HR Division of BAJK Organizes Comprehensive Training on Islamic Banking Operations',
            'content' => 'HR Division of BAJK Organizes Comprehensive Training on Islamic Banking Operations
Muzaffarabad
The Human Resources (HR) Division of Bank of Azad Jammu and Kashmir (BAJK) successfully organized a comprehensive training program on Islamic Banking Operations for its staff on Thursday. The training was conducted by a renowned Sharia consultancy trainer and was attended by officials from the Islamic Banking Division and other nominated staff members.
Key Highlights of the Training:
* Deep Dive into Sharia Principles: The training delved into the fundamental principles of Islamic finance, including the prohibition of Riba (interest), Gharar (uncertainty), and Maysir (gambling). Participants gained a thorough understanding of the ethical and legal framework governing all Islamic financial transactions.
* Focus on Islamic Banking Products and Services: The trainer provided in-depth explanations of various Sharia-compliant products and services offered by Islamic banks, such as Mudarabah, Musharakah, Murabaha, Ijarah, and Istisna. Participants learned about the unique features, benefits, and practical applications of these products in real-world scenarios.
* Emphasis on Risk Management: The training emphasized the crucial role of risk management in Islamic banking operations. Participants were introduced to various risk management techniques and strategies to effectively mitigate potential risks associated with Islamic financial transactions.
* Regulatory Compliance: The training provided a comprehensive overview of the regulatory framework for Islamic banking, ensuring participants’ understanding of the legal and regulatory requirements for operating in the Islamic banking sector.
* Practical Case Studies and Simulations: The training incorporated practical case studies and simulations to enhance participants’ understanding of real-world challenges and decision-making processes in Islamic banking.
Participant Testimonials:
* The participants at BAJK’s Islamic Banking Division, stated, “The training provided invaluable insights into the intricacies of Islamic banking operations. The trainer’s expertise and engaging delivery made the learning experience truly enriching.”
* Another participant, added, “The training has equipped me with the necessary knowledge and skills to effectively contribute to the growth and development of Islamic banking within BAJK.”
About the Trainer:
The trainer is a highly respected Sharia consultant trainer with extensive experience in the Islamic finance industry. He possesses a deep understanding of Islamic jurisprudence and its practical applications in the banking sector. His expertise and engaging teaching style have earned him a reputation as a leading authority in the field of Islamic finance training.
HR Division’s Commitment to Professional Development:
The HR Division of BAJK is committed to providing continuous professional development opportunities for its employees. This training program reflects the bank’s dedication to enhancing the knowledge and skills of its staff, particularly in the area of Islamic banking, to ensure the continued growth and success of its Islamic banking operations.<br>
بینک آف آزاد جموں و کشمیر کے ایچ آر ڈویژن کی جانب سے اسلامی بینکاری آپریشنز پر جامع تربیتی پروگرام کا انعقاد
مظفرآباد
بینک آف آزاد جموں و کشمیر (BAJK) کے ہیومن ریسورسز (HR) ڈویژن نے جمعرات کے روز اپنے عملے کے لیے اسلامی بینکاری آپریشنز پر ایک جامع تربیتی پروگرام کا کامیابی سے انعقاد کیا۔ یہ تربیت ایک معروف شریعہ کنسلٹنسی ٹرینر نے فراہم کی، جس میں اسلامی بینکاری ڈویژن کے افسران اور دیگر نامزد عملے نے شرکت کی۔

تربیت کے اہم نکات:

شریعت کے اصولوں پر گہری روشنی:
تربیت میں اسلامی مالیات کے بنیادی اصولوں جیسے کہ ربا (سود)، غرر (غیر یقینی صورتحال)، اور میسر (جوا) کی ممانعت پر تفصیل سے روشنی ڈالی گئی۔ شرکاء نے اسلامی مالیاتی لین دین کے اخلاقی اور قانونی ڈھانچے کو گہرائی سے سمجھا۔

اسلامی بینکاری مصنوعات و خدمات پر توجہ:
ٹرینر نے مضاربہ، مشارکہ، مرابحہ، اجارہ، اور استصناع جیسے شریعہ کے مطابق مصنوعات اور خدمات کی تفصیلی وضاحت کی۔ شرکاء نے ان مصنوعات کی انفرادیت، فوائد اور ان کے عملی استعمالات کے بارے میں سیکھا۔

رسک مینجمنٹ پر زور:
تربیت میں اسلامی بینکاری آپریشنز میں خطرات کے مؤثر انتظام کی اہمیت پر زور دیا گیا۔ شرکاء کو رسک مینجمنٹ کی مختلف تکنیکوں اور حکمتِ عملیوں سے روشناس کرایا گیا تاکہ اسلامی مالیاتی معاملات میں ممکنہ خطرات کو کم کیا جا سکے۔

ریگولیٹری تقاضے:
تربیت میں اسلامی بینکاری کے قانونی اور ریگولیٹری فریم ورک کا جامع جائزہ پیش کیا گیا، تاکہ شرکاء کو اس شعبے میں کام کرنے کے لیے ضروری قانونی معلومات حاصل ہوں۔

عملی کیس اسٹڈیز اور مشقیں:
تربیتی پروگرام میں حقیقی دنیا کے چیلنجز اور فیصلہ سازی کے عمل کو بہتر طور پر سمجھنے کے لیے عملی کیس اسٹڈیز اور سیمولیشنز شامل کی گئیں۔

شرکاء کے تاثرات:

BAJK کی اسلامی بینکاری ڈویژن کے ایک رکن نے کہا:
"یہ تربیت اسلامی بینکاری کے پیچیدہ معاملات کو سمجھنے میں بہت مؤثر ثابت ہوئی۔ ٹرینر کی مہارت اور دلچسپ انداز نے سیکھنے کے عمل کو انتہائی معلوماتی بنا دیا۔"

ایک اور شریک نے کہا:
"اس تربیت نے مجھے اسلامی بینکاری کی ترقی میں مؤثر کردار ادا کرنے کے لیے درکار ضروری علم اور مہارت فراہم کی۔"

ٹرینر کا تعارف:
یہ تربیت ایک انتہائی قابل احترام شریعہ کنسلٹنٹ ٹرینر نے دی، جنہیں اسلامی مالیاتی صنعت میں وسیع تجربہ حاصل ہے۔ وہ اسلامی فقہ اور اس کے بینکاری شعبے میں عملی اطلاق کی گہری سمجھ رکھتے ہیں۔ ان کی مہارت اور پراثر تدریسی انداز نے انہیں اسلامی مالیات کی تربیت کے میدان میں ممتاز مقام دیا ہے۔

ایچ آر ڈویژن کا پیشہ ورانہ ترقی سے عزم:
BAJK کا HR ڈویژن اپنے ملازمین کے لیے مسلسل پیشہ ورانہ ترقی کے مواقع فراہم کرنے کے لیے پرعزم ہے۔ یہ تربیتی پروگرام اس بات کا عکاس ہے کہ بینک اپنے عملے کی اسلامی بینکاری کے شعبے میں علم اور مہارت بڑھانے کے لیے سنجیدہ اقدامات کر رہا ہے، تاکہ ادارے کی اسلامی بینکاری خدمات مزید مستحکم اور کامیاب ہو سکیں۔
',
            'image' => 'news-images/Hr.jpg',
            'published_date' => '2025-01-23',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-hr-organizes-islamic-banking-training',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Proudly Honoring Pakistan’s Brave Forces',
            'content' => 'The Bank of Azad Jammu and Kashmir pays heartfelt tribute to the courageous armed forces of Pakistan, recognizing their unwavering dedication and sacrifices for national security and peace. Their bravery continues to inspire the nation with pride and gratitude. <br>
            بینک آف آزاد جموں و کشمیر پاکستان کی بہادر مسلح افواج کو دل کی گہرائیوں سے خراجِ تحسین پیش کرتا ہے، جو قومی سلامتی اور امن کے لیے اپنی بے مثال قربانیوں اور غیر متزلزل عزم کے لیے جانے جاتے ہیں۔ ان کی بہادری پوری قوم کے لیے فخر اور شکرگزاری کا باعث ہے۔
            ',
            'image' =>'news-images/pkforce.jpg',
            'published_date' => '2025-05-12',
            'is_featured' => true,
            'category' => 'general',
            'slug' => 'proudly-honoring-pakistans-brave-forces',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'BAJK Partners with Faysal Bank to Revolutionize Financial Transactions and Cash Management',
            'content' => 'Bank of AJK Partners with Faysal Bank to Revolutionize Financial Transactions and Enhance Cash Management
Islamabad
Bank of Azad Jammu and Kashmir (BAJK), a leading financial institution, has entered into a strategic partnership with Faysal Bank Limited. This collaboration aims to revolutionize the way financial transactions are conducted by integrating the International Bank Account Number (IBAN) system and enhancing cash management operations.
By adopting IBAN, BAJK will streamline its financial operations, enhancing efficiency and transparency. This move is expected to significantly benefit both the company and its customers.
Key Benefits of the Partnership:
* Enhanced Efficiency: The IBAN system will expedite domestic and international fund transfers, reducing processing time and minimizing errors.
* Improved Security: The standardized format of IBAN ensures greater security and reduces the risk of fraudulent activities.
* Global Recognition: IBAN is an internationally recognized standard, facilitating seamless cross-border transactions.
* Enhanced Cash Management: Through this partnership, BAJK will benefit from Faysal Bank’s robust cash management solutions, including:
* Cash Collection: Efficient and secure collection of cash from multiple sources.
* Cash Disbursement: Timely and accurate disbursement of funds to various payees.
* Cash Forecasting: Accurate prediction of cash flow needs to optimize liquidity management.
* Cash Pooling: Centralization of cash balances to optimize interest income and reduce borrowing costs.
The signing ceremony was attended by key representatives from both organizations, including the Chief Compliance Officer, DH Risk Management Division, and DH Treasury Management Division from BAJK, and the Head of Cash Management and Regional Head Islamabad from FBL.
This partnership between BAJK and Faysal Bank marks a significant step forward in the adoption of modern financial technologies in Pakistan. It is anticipated that this collaboration will have a positive impact on the broader economy.<br>
بینک آف آزاد جموں و کشمیر اور فیصل بینک کے درمیان مالیاتی لین دین اور کیش مینجمنٹ میں انقلابی شراکت
اسلام آباد

بینک آف آزاد جموں و کشمیر (BAJK)، جو ایک نمایاں مالیاتی ادارہ ہے، نے فیصل بینک لمیٹڈ کے ساتھ ایک اسٹریٹجک شراکت داری قائم کی ہے۔ اس اشتراک کا مقصد مالیاتی لین دین کے طریقہ کار میں انقلابی تبدیلی لانا ہے، جس میں انٹرنیشنل بینک اکاؤنٹ نمبر (IBAN) سسٹم کو شامل کرنا اور کیش مینجمنٹ آپریشنز کو مزید مؤثر بنانا شامل ہے۔

IBAN سسٹم کو اپنانے کے ذریعے BAJK اپنے مالیاتی آپریشنز کو مزید منظم، شفاف اور مؤثر بنائے گا، جس سے ادارے اور صارفین دونوں کو خاطر خواہ فائدہ ہوگا۔

شراکت کے اہم فوائد:
🔹 بہتر کارکردگی: IBAN سسٹم کے ذریعے ملکی اور بین الاقوامی فنڈ ٹرانسفرز تیز ہوں گے، وقت کی بچت ہوگی اور غلطیوں میں کمی آئے گی۔
🔹 بہتر سیکیورٹی: IBAN کا معیاری فارمیٹ مالیاتی تحفظ کو یقینی بناتا ہے اور دھوکہ دہی کے خطرات کو کم کرتا ہے۔
🔹 عالمی سطح پر شناخت: IBAN ایک بین الاقوامی سطح پر تسلیم شدہ معیار ہے، جو سرحد پار لین دین کو آسان بناتا ہے۔
🔹 کیش مینجمنٹ میں بہتری: اس شراکت کے ذریعے BAJK کو فیصل بینک کی جدید کیش مینجمنٹ خدمات حاصل ہوں گی، جن میں شامل ہیں:

کیش کلیکشن: مختلف ذرائع سے رقم کی مؤثر اور محفوظ وصولی

کیش ڈسبرسمنٹ: رقوم کی بروقت اور درست ادائیگی

کیش فورکاسٹنگ: نقدی کی ضروریات کی درست پیش گوئی تاکہ لیکویڈیٹی کا بہتر انتظام کیا جا سکے

کیش پولنگ: مختلف اکاؤنٹس سے رقم کو مجتمع کر کے منافع میں اضافہ اور قرض کے اخراجات میں کمی

تقریبِ دستخط میں دونوں اداروں کے نمایاں افسران نے شرکت کی، جن میں BAJK کی جانب سے چیف کمپلائنس آفیسر، ڈویژنل ہیڈ رسک مینجمنٹ، اور ڈویژنل ہیڈ ٹریژری مینجمنٹ شامل تھے جبکہ فیصل بینک کی جانب سے ہیڈ آف کیش مینجمنٹ اور ریجنل ہیڈ اسلام آباد نے شرکت کی۔
',
            'image' => 'news-images/fasalbank.jpg',
            'published_date' => '2024-12-16',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'bajk-partners-with-faysal-bank-for-financial-transformation',
            'is_published' => true,
        ]);


        NewsAnnouncement::create([
            'title' => 'Bank of AJK Collaborates with NIBAF to Elevate Enterprise Risk Management Standards',
            'content' => 'Bank of AJK Strengthens Risk Management with NIBAF’s Support<br>
Muzaffarabad,<br>
November 25, 2024:<br>
Bank of Azad Jammu and Kashmir (BAJK) has initiated a week-long Enterprise Risk Management (ERM) training program in collaboration with the National Institute of Banking and Finance (NIBAF). The program, held at the Ch. Ghulam Abbas Learning Hall, aims to equip BAJK’s staff with the essential tools and knowledge to effectively identify, assess, and mitigate risks.<br>
This initiative underscores BAJK’s commitment to fostering a robust risk culture and strengthening its overall risk management framework. The training program focuses on several key areas, including:<br>
* Risk Identification and Assessment: Participants will learn to identify potential risks, such as credit, market, operational, and reputational risks, and evaluate their impact on the bank.<br>
* Risk Mitigation Strategies: The training will delve into various risk mitigation techniques, including risk avoidance, reduction, transfer, and acceptance.<br>
* Risk Monitoring and Reporting: Participants will be trained on establishing robust systems for monitoring and reporting on risk exposures and control measures.<br>
* Risk Culture and Governance: The program will emphasize the importance of fostering a strong risk culture within the organization and integrating risk management into the bank’s overall governance framework.<br>
By partnering with NIBAF, BAJK aims to enhance its risk management capabilities and strengthen its position as a leading financial institution in the region. The bank remains dedicated to upholding the highest standards of risk governance and compliance.<br>
بینک آف آزاد جموں و کشمیر نے NIBAF کے تعاون سے رسک مینجمنٹ کو مزید مضبوط بنا دیا
مظفرآباد،
25 نومبر 2024:

بینک آف آزاد جموں و کشمیر (BAJK) نے نیشنل انسٹیٹیوٹ آف بینکنگ اینڈ فنانس (NIBAF) کے اشتراک سے ایک ہفتے پر محیط انٹرپرائز رسک مینجمنٹ (ERM) تربیتی پروگرام کا آغاز کیا ہے۔ یہ پروگرام چوہدری غلام عباس لرننگ ہال میں منعقد ہو رہا ہے، جس کا مقصد بینک کے عملے کو خطرات کی مؤثر طریقے سے شناخت، تجزیہ اور تدارک کے لیے ضروری علم اور مہارت فراہم کرنا ہے۔

یہ اقدام BAJK کے ایک مضبوط رسک کلچر کو فروغ دینے اور اپنے مجموعی رسک مینجمنٹ فریم ورک کو مستحکم کرنے کے عزم کی عکاسی کرتا ہے۔ تربیتی پروگرام درج ذیل اہم شعبوں پر مرکوز ہے:

🔹 خطرات کی شناخت اور تجزیہ:
شرکاء کو کریڈٹ، مارکیٹ، آپریشنل اور ساکھ جیسے ممکنہ خطرات کی شناخت اور ان کے بینک پر ممکنہ اثرات کے تجزیے کی تربیت دی جائے گی۔

🔹 خطرات کے تدارک کی حکمتِ عملی:
پروگرام میں خطرات سے بچاؤ، ان میں کمی، ان کا منتقلی اور قبول کرنے جیسے مختلف تدارکی طریقہ کار پر تفصیلی روشنی ڈالی جائے گی۔

🔹 خطرات کی نگرانی اور رپورٹنگ:
شرکاء کو خطرات کے انکشاف اور کنٹرول اقدامات کی نگرانی اور رپورٹنگ کے مضبوط نظام قائم کرنے کی تربیت دی جائے گی۔

🔹 رسک کلچر اور گورننس:
تربیت میں ادارے کے اندر ایک مضبوط رسک کلچر کو فروغ دینے اور رسک مینجمنٹ کو بینک کی مجموعی گورننس میں ضم کرنے کی اہمیت کو اجاگر کیا جائے گا۔

NIBAF کے ساتھ شراکت داری کے ذریعے BAJK کا مقصد اپنی رسک مینجمنٹ صلاحیتوں کو بہتر بنانا اور خطے کے ایک نمایاں مالیاتی ادارے کے طور پر اپنی پوزیشن کو مستحکم کرنا ہے۔ بینک اعلیٰ سطحی رسک گورننس اور تعمیل کے معیار کو برقرار رکھنے کے لیے پُرعزم ہے۔
',
            'image' => 'news-images/risk.jpg',
            'published_date' => '2024-11-25',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'bajk-collaborates-with-nibaf-to-elevate-enterprise-risk-management',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'BAJK Sharda Branch Commemorates 18th Anniversary with Community Leaders and Dignitaries',
            'content' => 'On the occasion of the 18th anniversary of the Bank of Azad Jammu and Kashmir, Assistant Commissioner Mr. Muhammad Qadeer Mughal, Principal of Boys Degree College Sharda Madam Sakeena Khawaja, President of the Sharda Bazaar Traders Association Mr. Babar Nawaz, and other local dignitaries attended a cake-cutting ceremony held at the BAJK Sharda Branch. The participants expressed their commitment to continued cooperation with the bank. Prayers were offered for the bank’s growth and success. Branch Manager Noor Zaman extended thanks to the guests for their participation.<br>
            بینک آف آزاد جموں و کشمیر کی 18ویں سالگرہ کے موقع پر اسسٹنٹ کمشنر جناب محمد قدیر مغل، پرنسپل بوائز ڈگری کالج شاردا میڈم سکینہ خواجہ، صدر بازار تاجر برادری جناب بابر نواز اور دیگر معززین علاقہ نے بینک آ ف آزاد جموں و کشمیر شاردہ برانچ میں کیک کاٹنے کی تقریب میں شرکت کی۔ شرکاء نے بینک کے ساتھ تعاون کا اعلان کیا ۔ اس موقع پر بینک کی ترقی و کامیابی کے لئے دعا کی گئی۔برانچ منیجر نور زماں نے مہمانوں کا شکریہ ادا کیا ۔
            ',
            'image' => 'news-images/birthday.jpg',
            'published_date' => '2024-11-10',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-sharda-branch-18th-anniversary-celebration-with-community-leaders',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'BAJK Celebrates 18th Anniversary at Pulmanda Branch, Khari Sharif',
            'content' => 'ChatGPT said:
Khari Sharif <br>
A grand ceremony was held at the Pulmanda Branch of Bank of Azad Jammu and Kashmir (BAJK) to celebrate the bank’s 18th anniversary. The event was attended by senior political, social, and education department officials from across the region. Regional Head of Mirpur, Raja Muhammad Waseem Khan, along with the bank staff, was highly appreciated for their dedicated services.<br>
President of the Anjuman-e-Tajran, Ch. Muhammad Afsar, praised the performance of the bank staff and assured full cooperation with the bank. The Secretary of Anjuman-e-Tajran Pulmanda, while addressing the audience, remarked that even before the existence of Pakistan, the Jammu and Kashmir Bank had been at its peak. He emphasized that this bank is our own and requires our wholehearted support.<br>
Impressed by the staff’s performance, Raja Sahib offered heartfelt prayers for the continued progress of Kashmir Bank, wishing it prosperity "day and night," and also shared valuable suggestions. Chairman Malik Mazhar Iqbal Awan participated as a special guest. In his address, he thanked and paid tribute to the bank staff, stating that his family has had long-standing relations with Kashmir Bank and will continue to support it.<br>
Senior officials from the education department also attended the event, including the principals of Boys College Afzalpur and Girls College Afzalpur, along with members of civil society, all of whom appreciated the performance and dedication of the bank staff.<br>
The ceremony concluded with a vote of thanks from Branch Manager Waqas Javed to all the esteemed guests.<br>
کھڑی شریف<br>
بینک آ ف آزاد جموں و کشمیر پلمنڈا برانچ میں بھی بینک کی اٹھارویں سالگرہ کی تقریب کا انعقاد۔علاقہ بھر سے سیاسی و سماجی اور محکمہ تعلیم کے افسران بالا کی شرکت۔ریجنل پیڈ میرپور راجہ محمد وسیم خان اوربینک عملے کی خدمات کو سراہا گیا۔ انجن تاجراں کے صدر چوھدری محمد افسر نے بینک عملہ کی کارکردگی کو سراہا اور خراج تحسین پیش کیا۔ بینک سے مکمل تعاون کی یقین دہانی کروائی،انجن تاجراں پلمنڈا کے سیکرٹری نے خطاب کرتے ہوئے کہا کہ کبھی جموں کشمیر بینک پاکستان وجود میں آنے سے قبل بھی عروج پر تھا۔ یہ بینک ہمارا اپنا بینک ہے۔ ہمیں اس کے ساتھ تعاون کی اشد ضرورت ہے۔عملہ کی کار کردگی سے متاثر ہو کر راجہ صاحب نے دعائیہ فقرات سے نوازا کہ کشمیر بینک دن دوگنی رات چوگنی ترقی کرے اورتجاویز بھی دیں۔چیئرمین ملک مظہر اقبال اعوان نے خصوصی شرکت کی،انھوں نے دوران خطاب بینک عملہ کا شکریہ ادا کرتے ہوئے خراج تحسین پیش کیا اور کہا کہ ہماری فیملی کا عرصہ دراز سے کشمیر بینک سے تعاون رہا ہے، آئندہ بھی ہمارا تعاون کشمیر بینک سے رہے گا۔محکمہ تعلیم کے افسران بالا نے بھی خصوصی شرکت کی ۔پرنسپل بوائز کالج افضل پور،پرنسپل گرلز کالج افضل پوراور سول سوسائٹی نے بھی بینک عملہ کے کردارکو سراہا ،اختتام تقریب پر برانچ مینجر وقاص جاوید نے مہمانان گرامی کا شکریہ ادا کیا۔
',
            'image' => 'news-images/kharishreef.jpg',
            'published_date' => '2024-11-09',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'bajk-celebrates-18th-anniversary-pulmanda-branch-khari-sharif',
            'is_published' => true,
        ]);


        NewsAnnouncement::create([
            'title' => 'BAJK Celebrates 18th Anniversary with Cake-Cutting Ceremony in Rawalakot',
            'content' => 'A cake-cutting ceremony took place at the Main Branch in Rawalakot to mark the 18th anniversary of BAJK. The event was honored by the presence of Deputy Commissioner Poonch, Syed Mumtaz Kazmi, and Assistant Commissioner, Sardar Mushtaq, who joined alongside the Chief Manager of the Main Branch Rawalakot. Divisional Head CMD, Mr. Imtiaz Shaheen, was also in attendance and shared an inspiring briefing on BAJK’s achievements over the years. Regional Head, ROM, RBM, Rawalakot Region were present as well, contributing to the festive atmosphere as they celebrated this important milestone together.<br>
            بینک آف آزاد جموں و کشمیر (BAJK) کی 18ویں سالگرہ کے موقع پر راولا کوٹ مین برانچ میں ایک پروقار کیک کاٹنے کی تقریب کا انعقاد کیا گیا۔ اس تقریب میں ڈپٹی کمشنر پونچھ، سید ممتاز کاظمی، اور اسسٹنٹ کمشنر، سردار مشتاق، نے شرکت کی۔ مین برانچ راولا کوٹ کے چیف منیجر نے ان کا استقبال کیا۔
تقریب میں کمانڈ ڈویژن کے ڈویژنل ہیڈ، جناب امتیاز شاہین، بھی موجود تھے، جنہوں نے بینک کی گزشتہ سالوں کی کامیابیوں پر ایک حوصلہ افزا بریفنگ دی۔ راولا کوٹ ریجن کے ریجنل ہیڈ، ریجنل آپریشن منیجر (ROM)، اور ریجنل بزنس منیجر (RBM) بھی اس موقع پر موجود تھے، جنہوں نے اس اہم سنگ میل کی خوشی میں بھرپور حصہ لیا اور تقریب کو مزید خوشگوار بنایا۔
            ',
            'image' => 'news-images/rawlakot.jpg',
            'published_date' => '2024-11-09',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-celebrates-18th-anniversary-cake-cutting-rawalakot',
            'is_published' => true,
        ]);
        NewsAnnouncement::create([
            'title' => 'AJK Finance Minister and Chairman Bank of AJK Emphasizes Role of Kashmir Bank in Regional Business Growth',
            'content' => 'Mirpur <br>
The Finance and Cooperative Minister of the Azad Government of the State of Jammu and Kashmir, and Chairman of the Bank of Azad Jammu and Kashmir (BAJK), Khan Abdul Majid Khan, stated that Kashmir Bank is playing a key role in promoting business activities in the region. Attractive loan schemes, including Small Business Trade Finance (SBTF), are contributing significantly to business growth.<br>
He made these remarks during a meeting with the leadership of the AJK Chamber of Commerce & Industry. The meeting, chaired by the Finance Minister, focused on strengthening and expanding the business relationship between Kashmir Bank and the business community.<br>
The event, organized by the bank, was attended by President of the Chamber Mr. Umar Shehzad, General Secretary Syed Nishat Hussain Kazmi, former presidents Mr. Faisal Manzoor, Syed Sabir Hussain Shah, Mr. Azeem Mushtaq, Mr. Muhammad Rizwan, Sardar Azad Khan, Mr. Sohail Shuja, President of Anjuman Tajiran Raja Khalid Mehmood, and Chaudhry Muhammad Ayaz of Siraj Steel Mills, along with many other distinguished business figures.<br>
The CRBD Head Raja Ghulam Mustafa, Regional Head Muhammad Waseem Khan, and other bank officials welcomed the guests.<br>
The Chairman highlighted the bank’s remarkable performance, praising President Mr. Shahid Shehzad Mir and his team for their efforts. He noted that under the SBTF scheme, the bank is providing loans of up to PKR 500,000 to small traders and entrepreneurs in the region, on easy terms and minimal markup. The loans feature fast processing, and come with 100% life and stock insurance, contributing to accelerated socio-economic development.<br>
میرپور<br>
آزاد حکومت ریاست جموں و کشمیر کے وزیر خزانہ و امداد باہمی اوربینک آف آزاد جموں و کشمیرکے چیئرمین خان عبدالماجد خان نے کہا ہے کہ کشمیربینک اس خطے میں کاروباری سرگرمیوں کے فروغ کے لئے کلیدی کردار ادا کر رہا ہے۔سمال بزنس ٹریڈ فنانس(ایس بی ٹی ایف) سمیت قرضہ جات کی متعدد پرکشش سکیمیں کاروبار کو بڑھانے میں اہم کردار ادا کر رہی ہیں۔گزشتہ روز وہ آزاد جموں و کشمیر چیمبرز آف کامرس و انڈسٹری کے رہنماؤں کے ساتھ ایک اجلاس کے دوران بات چیت کر رہے تھے۔وزیر خزانہ کی زیر صدارت منعقدہ اجلاس میں کشمیر بینک اورتاجر برادری کے درمیان کاروباری تعلقات کو مزید پائیدار و مستحکم بنانے پر تبادلہ خیال کیا گیا۔بینک کے زیر اہتمام منعقدہونے والے اجلاس میں چیمبر زکے صدر جناب عمر شہزاد جنرل سیکٹری سید نشاط حسین کاظمی، سابق صدورجناب فیصل منظور، سید صابر حسین شاہ،جناب عظیم مشتاق، جناب محمد رضوان، سردار آزاد خان، جناب سہیل شجاع، انجمن تاجراں کے صدر راجہ خالد محمود، سراج سٹیل ملز کے چودھری محمد ایاز سمیت معزز کاروباری حضرات کی ایک بڑی تعداد نے شرکت کی جب کہ بینک کے سی آر بی ڈی ہیڈ راجہ غلام مصصطفےٰ، ریجنل ہیڈ محمد وسیم خان سمیت دیگر افسران نے مہمانوں کا استقبال کیا۔چیئرمین نے شرکاء کو ادارے کی اعلیٰ کارکردگی کے اہم نکات سے آگاہ کرتے ہوئے بینک کے صدر جناب شاہد شہزاد میر اور ان کی ٹیم کو خراج تحسین پیش کیا اور کہا کہ ایس بی ٹی ایف کے تحت بینک کی طرف سے خطے کے چھوٹے تاجروں اور کاروباری حضرات کو پانچ لاکھ روپے تک کے قرضہ جات فراہم کئے جارہے ہیں اور تاجر برادری کو قرضہ جات انتہائی آسان شرائط اور کم ازکم مارک اپ پر دیئے جارہے ہیں جن کی تیز ترین پراسسنگ اورسو فیصد لائف و سٹاک انشورنس ہوتی ہے۔جس سے خطے کی سماجی اور معاشی ترقی میں تیزی آئی ہے۔اس موقع پر بزنس کمیونٹی نے کشمیر بینک کے ساتھ بے پناہ محبت کا اظہارکرتے ہوئے باہمی کاروبار کو مزیدفروغ دینے کااعلان کیا اورکاروباری تعلق کو مزید مضبوط کرنے کے لئے مفید تجاویز پیش کیں۔
',
            'image' => 'news-images/business.jpg',
            'published_date' => '2024-11-01',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'ajk-finance-minister-highlights-kashmir-bank-role-in-regional-business-growth',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'AJK Finance Minister Khan Abdul Majid Khan’s Visit to Bank of AJK: Focus on Service and Customer Relations',
            'content' => 'Muzaffarabad <br>
The Finance & Cooperatives Minister of the Azad Government of the State of Jammu & Kashmir and Chairman of the Bank of Azad Jammu & Kashmir (BAJK), Mr. Khan Abdul Majid Khan, recently visited the bank’s field monitoring offices and branches in Mirpur. He chaired a meeting with managers and officers at the regional office and also visited the Overseas Desk at the Main Branch. CRBD Head Raja Ghulam Mustafa and Mirpur Regional Head Muhammad Waseem Khan accompanied him during the visit. <br>
On this occasion, he reviewed the professional performance of the staff and issued directives regarding banking services for customers. He stated that the overall improvement in services and strengthened business relations with customers have earned the bank special attention and trust. As a result, there has been a notable increase in the bank’s profits, assets, deposits, and home remittances — reflecting the strong confidence of overseas Pakistanis and other valued customers in the institution. <br>
While interacting with customers, he described them as the bank’s most valuable asset. He urged the staff to further strengthen business relationships and enhance customer service, emphasizing that stronger ties with clients will lead to greater growth for the bank. <br>
مظفر آباد<br>
آزاد حکومت ریاست جموں و کشمیر کے وزیر خزانہ و امداد باہمی اوربینک آف آزاد جموں و کشمیرکے چیئرمین خان عبدالماجد خان نے گزشتہ روز میر پور میں ادارے کے فیلڈ نگراں دفاتر اور برانچوں کا دورہ کیا۔ ریجنل آفس میں منیجرز اور افسرن کے اجلاس کی صدارت کی جب کہ مین برانچ میں اوورسیز ڈیسک کا دورہ کیا۔سی آر بی ڈی ہیڈ راجہ غلام مصطفےٰ اور میرپور ریجن ہیڈ محمد وسیم خان بھی ان کے ہمراہ تھے۔ اس موقع پر انہوں نے عملے کی پیشہ ورانہ سرگرمیوں کا جائزہ لیااور صارفین کے لئے بینکاری خدمات سے متعلق ہدایات دیتے ہوئے کہا کہ مجموعی طور پر خدمات میں بہتری اورکسٹمر زکے ساتھ بزنس تعلقات میں اضافے کے باعث بھی یہ ادارہ صارفین کی خصوصی توجہ حاصل کررہا ہے۔یہی وجہ ہے کہ بینک کے منافع،اثاثہ جات، ڈیپازٹس، ہوم ریمی ٹینسز میں اضافہ ہورہا ہے جس سے بینک پر سمندر پار اہل وطن سمیت معزز صارفین کے بھرپور اعتماد کی عکاسی ہوتی ہے۔انہوں نے کسٹمرز کے ساتھ بات چیت کرتے ہوئے انہیں قیمتی سرمایہ قرار دیا۔بینک کے عملے کو صارفین کے ساتھ بزنس تعلقات کو مستحکم کرنے اور کسٹمرسروس میں بہتری لانے کی تلقین کرتے ہوئے انہوں نے کہا کہ جس قدر صارفین کے ساتھ بزنس تعلقات مضبوط ہوں گے اسی انداز میں ادارے کے بزنس میں اضافہ ہو گا۔
',
            'image' => 'news-images/visit.jpg',
            'published_date' => '2024-10-30',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'ajk-finance-minister-khan-abdul-majid-khan-visits-bajk-focus-on-service-and-customer-relations',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'Bank of Azad Jammu and Kashmir Sponsors Shahidae Jammu Floodlight Football Tournament in Muzaffarabad',
            'content' => 'Muzaffarabad <br>
With the support of the Bank of Azad Jammu and Kashmir, the Shuhada-e-Jammu Floodlight Football Tournament was held in Muzaffarabad. A total of 23 teams participated in the tournament. The final match was played between Shah Football Club and Real Football Club, where Shah Club clinched the title in an exciting penalty shootout. This marked Shah Club’s fifth consecutive tournament victory.<br>
A large number of spectators attended the match and applauded the players. During the final, a lucky draw was also held for the spectators, and Arsalan Maqbool Kayani won a ticket for Umrah.<br>
The President and CEO of the Bank of Azad Jammu and Kashmir, Mr. Shahid Shehzad Mir, was the chief guest on the occasion. He awarded the winning team with the trophy, and distributed shields and prizes among the players. <br>
The efforts of District Football Association President Mehtab Ahmed Mir, Aamir Hussain Kayani, Raja Azhar Ali, and others were appreciated for successfully organizing and managing the event.<br>
مظفر آباد <br>
بینک آف آزاد جموں و کشمیر کے تعاون سے مظفر آباد میں شہدائے جموں فلڈ لائٹ فٹبال ٹورنامنٹ کا انعقاد کیا گیا۔ ٹورنامنٹ میں 23 ٹیموں نے حصہ لیا۔گزشتہ روز ٹورنامنٹ کا فائنل شاہ فٹبال کلب اورریال فٹبال کلب کے درمیان کھیلا گیا۔ شاہ کلب نے ایک دلچسپ پینلٹی کک پر فائنل ٹائٹل اپنے نام کر لیا۔یہ شاہ کلب کی مسلسل پانچویں ٹورنامنٹ جیت تھی۔ شائقین کی بڑی تعداد نے میچ دیکھا اور کھلاڑیوں کو داد دی۔فائنل میچ کے شائقین کے لئے قرعہ اندازی کے زریعے عمرہ کا ٹکٹ ارسلان مقبول کیانی حاصل کرنے میں کامیاب ہو گئے۔ اس موقع پر بینک آف آزاد جموں و کشمیر کے صدر و سی ای او جناب شاہد شہزاد میر مہمان خصوصی تھے۔ انھوں نے ٹورنامنٹ جیتنے والی ٹیم میں ٹرافی،کھلاڑیوں میں شیلڈز اور انعامات تقسیم کئے۔ٹورنامنٹ کے انتظامات، نظم و ضبط پر ڈسٹرک فٹبال ایسوسی ایشن کے صدر مہتاب احمد میر، عامر حسین کیانی، راجہ اظہر علی اور دیگر کو مبارکباد پیش کی گئی۔یہاں یہ بات قابل ذکر ہے کہ کشمیر بینک روایتی بینکاری کے ساتھ ساتھ صحت مند معاشرے کی تعمیر، کھیل اور کھلاڑی کی حوصلہ افزائی کے لئے بھی اپنا کردار ادا کر رہا ہے۔
',
            'image' => 'news-images/jammu.jpg',
            'published_date' => '2024-10-03',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'bajk-sponsors-shahidae-jammu-football-tournament-muzaffarabad',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'State Bank Governor Endorses Bank of AJK’s Growth and Path Toward Schedule Bank License',
            'content' => 'Islamabad <br>
The Governor of the State Bank of Pakistan highly appreciated the performance of the Bank of Azad Jammu and Kashmir (BAJK) and the steps taken towards acquiring scheduled bank status. He expressed principled agreement with the State Bank’s position to issue a license, commending the pace and manner in which Kashmir’s financial institution is progressing and contributing to the economic and social development of the state. He stated that this bank will soon be among the most successful banks.
<br>These remarks were made on Thursday by Governor State Bank Mr. Jameel Ahmed during a meeting with the Finance & Cooperatives Minister of Azad Kashmir and Chairman of the Bank’s Board of Directors, Mr. Khan Abdul Majid Khan, President & CEO Mr. Shahid Shehzad Mir, Secretary Finance and Bank Director Mr. Islam Zaib, and Company Secretary Dr. Adnanullah Khan.
<br>While reviewing the performance of Kashmir Bank, the Governor stated that despite not having scheduled bank status, the bank’s performance has been outstanding. He appreciated the launch of Islamic banking by the Bank and advised that once equity and core banking requirements are completed, the bank may formally approach the State Bank.
<br>He also praised the bank’s initiative to establish an exchange company, assuring that a license would be issued by the State Bank upon completion of the required regulatory framework.
<br>Earlier, the Chairman informed the Governor about the importance of BAJK in the state’s economy, the connection and interest of overseas Kashmiri expatriates in the bank, and the significance of acquiring a scheduled bank license.
<br>He highlighted several initiatives undertaken by the financial institution and the state government to achieve this status, including the installation of core banking software, improvement of loan schemes, preparation of a business case for submission to the State Bank, and hiring of a consultant to fulfill legal requirements. He also mentioned that the people of Azad Kashmir, especially overseas Kashmiris and the corporate sector, have shown a strong desire to see the bank attain scheduled status.
<br>The Chairman further emphasized that inclusion of the bank in government projects like hydropower, tourism, women’s economic empowerment, agriculture, and housing would significantly accelerate its growth. Additionally, the appointment of a focal person by the State Bank for licensing guidance and cooperation, along with the opening of a corporate office in Islamabad, would yield positive business outcomes.
<br>Earlier, President Mr. Shahid Shehzad Mir briefed the Governor on the bank’s history, organizational structure, expanding network, customer outreach, paid-up capital, and overall financial performance.
<br>The Governor attentively listened to the bank team’s briefing and expressed principled agreement with the institution’s stance regarding the acquisition of scheduled bank status. Souvenirs were also presented to the Governor on this occasion.
<br>
اسلام آباد<br>
گورنر سٹیٹ بینک آف پاکستان نے بینک آف آزاد جموں و کشمیر کی کارکردگی اور شیڈول بینک درجہ کے حصول سے متعلق اقدامات کی زبردست تعریف اور حوصلہ افزائی کرتے ہوئے سٹیٹ بینک کی جانب سے لائسنس اجراء کرنے کے موقف سے اصولی اتفاق کر لیا اور کہا کہ جس انداز و رفتار سے کشمیر کامالیاتی ادارہ ترقی کی جانب گامزن رہتے ہوئے ریاست کی معاشی وسماجی ترقی میں کردار ادا کررہا ہے، اس سے ظاہر ہوتا ہے کہ یہ بینک بہت جلد کامیاب ترین بینکوں کی صف میں شامل ہو جائے گا۔جمعرات کو یہاں ان خیالات کا اظہار گورنر سٹیٹ بینک جناب جمیل احمد نے آزاد کشمیرکے وزیر خزانہ وکواپریٹوز اور بینک بورڈ آف ڈائریکٹرز کے چیئر مین خان عبدالماجد خان، صدر و چیف ایگزیکٹو آفیسر جناب شاہد شہزاد میر، آزاد کشمیر کے سیکریٹری فنانس اور ڈائریکٹر بینک جناب اسلام زیب، کمپنی سیکرٹری ڈاکٹر عدنان اللہ خان کے ساتھ ایک میٹنگ کے دوران بات چیت کرتے ہوئے کیا۔گورنر نے کشمیر بینک کی کارکردگی کا جائزہ لیتے ہوئے کہا کہ شیڈول نہ ہونے کے باوجود آزادکشمیر بینک کی کارکردگی شاندار رہی ہے۔ انہوں نے کشمیر بینک کی جانب سے اسلامک بینکنگ شروع کرنے کی تعریف کی اور کہا کہ بینک ایکویٹی اور کور بینکنگ سے متعلق لوازمات مکمل کر کے سٹیٹ بینک سے رجوع کرے۔ بینک کی جانب سے ایکسچینج کمپنی کھولنے کی بھی تعریف کرتے ہوئے گورنر نے کہا کہ اس سلسلے میں قواعد و ضوابط مکمل ہونے پر سٹیٹ بینک کی جانب سے لائسنس جاری کر دیا جائے گا۔قبل ازیں،چیئرمین نے ریاستی معیشت میں بینک آف آزاد جموں و کشمیر کی اہمیت،ادارے کے ساتھ سمندر پار کشمیری تارکین وطن کی وابستگی اور دلچسپی، شیڈول درجہ دلانے کے لئے لائسنس اجرائیگی کی اہمیت وافادیت، مالیاتی ادارے اور ریاستی حکومت کی جانب سے ترقی اور شیڈول بینک درجہ کے حصول کے لئے اٹھائے گئے اقدامات سے آگاہ کیا جن میں قابل ذکر کور بینکنگ سافٹ ویئر کی تنصیب، قرضہ جات منصوبوں کی از سر نو بہتری، اسٹیٹ بینک میں درخواست دائر کرنے کے لئے بزنس کیس کی تیاری اور قانونی لوازمات کی تکمیل کے لئے کنسلٹنٹ کی خدمات کا حصول، آزاد کشمیر کے عوام بالخصوص سمندر پار تارکین وطن کشمیریوں وکارپوریٹ سیکٹر کی بینک کو شیڈول کا درجہ دینے کی خواہشات شامل ہیں۔چیئرمین نے مزید بتایا کہ بینک کو حکومت پاکستان کے پن بجلی، سیاحت، معاشی طور پر خواتین کو بااختیار بنانے، زراعت و ہاؤسنگ جیسے خصوصی منصوبوں میں شامل کرنے سے بینک کی ترقی میں تیزی آئے گی۔ علاوہ ازیں سٹیٹ بینک کی جانب سے اس بینک کو لائسنس کے اجراء، رہنمائی و تعاون کے لئے فوکل پرسن کی نامزدگی جب کہ اسلام آباد میں بینک کے کارپوریٹ دفتر کھولنے کے مثبت کاروباری نتائج برآمد ہوں گے۔قبل ازیں گورنرسٹیٹ بینک کو صدر بینک جناب شاہد شہزاد میرکی جانب سے ریاستی بینک کی تاریخ، انتظامی ڈھانچے، پھیلتے ہوئے نیٹ ورک اور صارفین تک رسائی، ادا شدہ سرمایہ سمیت فنانشل ترقی کی صورتحال سے متعلق بریفنگ دی گئی۔جناب گورنر نے بینک ٹیم کی بریفنگ دلچسپی اور توجہ سے سنی اور شیڈول بینک درجہ کے حصول کے لئے ادارے کے موقف پر اصولی اتفاق کر لیا۔اس موقع پر گورنر سٹیٹ بینک کو سوینئرز پیش کی گئیں۔
',
            'image' => 'news-images/schedule.jpg',
            'published_date' => '2024-09-19',
            'is_featured' => false,
            'category' => 'general',
            'slug' => 'state-bank-governor-endorses-bajk-growth-schedule-bank-license-path',
            'is_published' => true,
        ]);
        NewsAnnouncement::create([
            'title' => '79th Board of Directors Meeting of BAJK Approves Semi-Annual Financial Accounts, Expresses Satisfaction Over Profit and Asset Growth',
            'content' => 'The 79th meeting of the Board of Directors of the Bank of Azad Jammu & Kashmir was held under the chairmanship of Mr. Khan Abdul Majid Khan, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of the Bank. The meeting took place on Monday at the Bank’s Head Office and was attended by President & Chief Executive Officer Mr. Shahid Shehzad Mir; Directors; Secretary Finance, Government of Azad Jammu & Kashmir, Mr. Islam Zaib; Secretary Industries & Commerce Mr. Khalid Mahmood Mirza; Secretary Law & Justice Mr. Muhammad Sajjad; Mr. Mubashir Nabi; Mr. Zulfiqar Abbasi; Ms. Bushra Naz Malik; and Company Secretary Dr. Adnan Ullah Khan. <br>
Various operational agendas, including the financial accounts for the first half of the year (as of June 30, 2024), were presented during the meeting. After detailed discussions, the items were approved. According to the half-yearly financial accounts, the Bank has recorded consistent growth in profit, assets, deposits, and remittances. Customers are being offered attractive loan schemes on easy terms and with minimal markup. <br>
The Board was informed that during the first half of the current year, the Bank earned an operating profit of Rs. 906 million. The Bank’s assets increased to Rs. 48 billion, and deposits rose to Rs. 39 billion. Under various attractive schemes, loans amounting to Rs. 4.5 billion were provided to customers. <br>
The Board appreciated the excellent performance and acknowledged the contributions of all stakeholders, reaffirming the commitment to continue the Bank’s journey of success and progress <br>
آزاد حکومت ریاست جموں وکشمیر کے وزیر خزانہ و امداد باہمی اوربینک آف آزاد جموں وکشمیر کے چیئرمین جناب خان عبدالماجد خان کی زیرصدارت بینک کے بورڈ آف ڈائریکٹرز کا79واں اجلاس منعقد ہوا۔پیر کے روزبینک کے ہیڈ آفس میں منعقدہ اجلاس میں صدر و چیف ایگزیکٹو آفیسرجناب شاہد شہزاد میر، ڈائریکٹرز صاحبان، سیکریٹری فنانس حکومت آزاد جموں وکشمیرجناب اسلام زیب، سیکریٹری صنعت وحرفت جناب خالد محمود مرزا، سیکریٹری قانون و انصاف جناب محمد سجاد، جناب مبشر نبی،جناب ذوالفقارعباسی، محترمہ بشریٰ ناز ملک اورکمپنی سیکریٹری ڈاکٹرعدنان اللہ خان نے شرکت کی۔اجلاس میں سال کے پہلے ششماہی فنانشل اکاؤنٹس(30جون2024) سمیت مختلف آپریشنل ایجنڈے پیش کئے جن کی مفصل بحث و مباحثہ کے بعد منظوری دی گئی۔ششماہی فنانشل اکاؤنٹس کے مطابق بینک کے منافع، اثاثہ جات، ڈیپازٹس اور ترسیلات زرمیں مسلسل اضافہ ہو رہا ہے جب کہ صارفین کوآسان شرائط اور کم از کم مارک اپ پرپر کشش قرضہ جات فراہم کئے جا رہے ہیں۔بورڈ کو بتایا گیا کہ رواں سال کی پہلی ششماہی میں بینک نے 906ملین روپے آپریٹنگ منافع حاصل کیا، اثاثہ جات بڑھ کر 48ارب روپے تک پہنچ گئے، ڈیپازٹس 39ارب روپے ہو گئے۔ مختلف پرکشش سکیموں کے تحت صارفین کو 4.5ارب روپے کے قرضہ جات فراہم کئے گئے۔بورڈ نے شاندار کارکردگی اور تعاون پر تمام سٹیک ہولڈرز کے کردار کی تعریف کرتے ہوئے بینک کی کامیابی اور ترقی کے سفر کو جاری رکھنے کے عزم کا اعادہ کیا۔اس موقع پرجناب چیئرمین نے کہا کہ حکومت کی سر پرستی میں ادارے کو کامیاب اور صف اول کے بینکوں میں شامل کرنے کے لئے تمام کوششیں بروئے کار لائی جا رہی ہیں۔انہوں نے کہا کہ عملے کی محنت، ٹیم ورک،معزز صارفین کے بھرپور تعاون سے بہترین بزنس نتائج کے حصول کا سلسلہ جاری رکھا جائے گا
',
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
