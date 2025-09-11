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
            'title' => '94th Meeting of the Board of Directors of Bank of Azad Jammu & Kashmir (BAJK)',
             'content' => 'Islamabad – The 94th meeting of the Board of Directors of Bank of Azad Jammu & Kashmir (BAJK) was convened at Kashmir House, Islamabad on Wednesday. The session was chaired by Mr. Khan Abdul Majid Khan, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of BAJK.<br><br>

The meeting was attended by Board members including:<br>
• President & CEO, Mr. Shahid Shahzad Mir<br>
• Secretary Finance, AJK, Mr. Islam Zaib<br>
• Mr. Mubashar Nabi<br>
• Secretary Industries & Commerce, AJK, Ch. Abdul Rehman<br>
• Secretary Law & Justice, Mr. Muhammad Sajjad<br>
• Company Secretary, Dr. Adnanullah Khan<br>
• Ms. Bushra Naz Malik (joined via Zoom)<br><br>

<hr>
<strong>Key Discussions & Decisions:</strong><br>
1. Review & Approval of Half-Year Financial Statements:<br>
• The Board reviewed and approved the Bank’s financial statements for the half-year, expressing satisfaction over the robust financial performance and operational growth achieved during the period.<br><br>

2. Five-Year Strategic Plan for Early Scheduling & Progress:<br>
• The President & CEO presented a comprehensive five-year strategic roadmap focusing on early scheduling, sustainable growth, technological advancement, and expansion of services.<br>
• The Board thoroughly discussed the plan and expressed full satisfaction, appreciating the management’s vision and commitment towards strengthening the Bank’s future.<br><br>

3. Continued Focus on Schedule Bank Status:<br>
• The Board reaffirmed its commitment to expedite the process of obtaining Scheduled Bank status from the State Bank of Pakistan (SBP), emphasizing its importance for BAJK’s regional and national growth.<br><br>

<hr>
<strong>Chairman’s Remarks:</strong><br>
Chairman Mr. Khan Abdul Majid Khan lauded the management for its dedicated efforts and assured the Board’s full support in executing the strategic roadmap. He stressed that BAJK’s transformation journey, rooted in innovation and sustainable practices, will further solidify its standing as a leading financial institution.<br><br>

<hr>
<strong>Way Forward:</strong><br>
• Driving sustainable growth<br>
• Expanding services across AJK and beyond<br>
• Leveraging digital transformation for customer convenience<br>
• Achieving Schedule Bank status at the earliest<br><br>

<div dir="rtl" style="text-align: right;">
<strong>اسلام آباد</strong> – بینک آف آزاد جموں و کشمیر (BAJK) کے بورڈ آف ڈائریکٹرز کا 94واں اجلاس بدھ کے روز کشمیر ہاؤس، اسلام آباد میں منعقد ہوا۔ اجلاس کی صدارت جناب خان عبدالمجید خان، معزز وزیرِ خزانہ و کوآپریٹوز، حکومتِ آزاد جموں و کشمیر اور چیئرمین BAJK نے کی۔<br><br>

<strong>اجلاس میں شریک اراکین:</strong><br>
• صدر و چیف ایگزیکٹو آفیسر، جناب شاہد شہزاد میر<br>
• سیکریٹری فنانس، اے جے کے، جناب اسلام زیب<br>
• جناب مبشر نبی<br>
• سیکریٹری انڈسٹریز اینڈ کامرس، اے جے کے، چوہدری عبدالرحمن<br>
• سیکریٹری لاء اینڈ جسٹس، جناب محمد سجاد<br>
• کمپنی سیکریٹری، ڈاکٹر عدنان اللہ خان<br>
• محترمہ بشریٰ ناز ملک (آن لائن شرکت بذریعہ زوم)<br><br>

<strong>اہم امور اور فیصلے:</strong><br>
1. نصف سالہ مالیاتی بیانات کا جائزہ اور منظوری:<br>
• بورڈ نے بینک کے نصف سالہ مالیاتی بیانات کا جائزہ لے کر انہیں منظور کیا اور اس مدت کے دوران حاصل کی گئی مضبوط مالیاتی کارکردگی اور عملی ترقی پر اطمینان کا اظہار کیا۔<br><br>

2. پانچ سالہ اسٹریٹجک پلان برائے بروقت شیڈولنگ اور پیش رفت:<br>
• صدر و سی ای او نے ایک جامع پانچ سالہ اسٹریٹجک روڈ میپ پیش کیا جس میں بروقت منصوبہ بندی، پائیدار ترقی، تکنیکی جدت، اور سروسز کی توسیع پر توجہ دی گئی۔<br>
• بورڈ نے اس منصوبے پر تفصیلی بحث کی، مکمل اطمینان کا اظہار کیا اور انتظامیہ کے وژن اور بینک کے مستقبل کو مضبوط کرنے کے عزم کو سراہا۔<br><br>

3. شیڈول بینک کا درجہ حاصل کرنے پر مسلسل توجہ:<br>
• بورڈ نے اس عزم کو دہرایا کہ اسٹیٹ بینک آف پاکستان (SBP) سے شیڈول بینک کا درجہ حاصل کرنے کے عمل کو تیز کیا جائے، اور اس کی اہمیت پر زور دیا جو BAJK کی علاقائی اور قومی ترقی کے لیے ضروری ہے۔<br><br>

<strong>چیئرمین کے ریمارکس:</strong><br>
چیئرمین خان عبدالمجید خان نے انتظامیہ کی انتھک کوششوں کو سراہا اور اسٹریٹجک روڈ میپ پر عملدرآمد کے لیے بورڈ کی مکمل حمایت کی یقین دہانی کرائی۔ انہوں نے زور دیا کہ BAJK کا تبدیلی کا سفر، جو جدت اور پائیدار حکمتِ عملیوں پر مبنی ہے، ادارے کو ایک سرکردہ مالیاتی ادارے کے طور پر مزید مستحکم کرے گا۔<br><br>

<strong>آئندہ کا لائحہ عمل:</strong><br>
• پائیدار ترقی کو فروغ دینا<br>
• آزاد جموں و کشمیر اور اس سے باہر خدمات کی توسیع<br>
• صارفین کی سہولت کے لیے ڈیجیٹل ٹرانسفارمیشن سے فائدہ اٹھانا<br>
• جلد از جلد شیڈول بینک کا درجہ حاصل کرنا<br>
</div>',
               'image' => 'news-images/94meeting.jpg',
             'published_date' => '2025-09-10',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => '94th-meeting-board-of-directors-bank-of-azad-jammu-kashmir-bajk',
            'is_published' => true,
        ]);



          NewsAnnouncement::create([
            'title' => 'President & CEO BAJK Mr. Shahid Shahzad Mir Undertakes Landmark Visit to Mirpur Region',
            'content' => 'Mirpur, Azad Jammu & Kashmir<br>
The <strong>President & Chief Executive Officer of Bank of Azad Jammu & Kashmir (BAJK), Mr. Shahid Shahzad Mir</strong>, undertook a significant visit to the Mirpur region, where he was warmly welcomed by bank officials, local dignitaries, and the community.<br><br>

During his visit, the CEO chaired high-level meetings to review the bank’s operational performance, customer service standards, and the progress of digital initiatives in the region. He reiterated the bank’s unwavering commitment to enhancing financial inclusion and delivering innovative, accessible banking solutions to the people of Azad Jammu & Kashmir.<br><br>

Mr. Mir was accompanied by the <strong>Divisional Head of Commercial & Retail Banking Division (CRBD) and the Regional Head of Mirpur</strong>. The officials provided comprehensive insights into the bank’s regional growth, portfolio performance, and community outreach strategies.<br><br>

As a highlight of the visit, the CEO distributed certificates and awards among high-performing employees, recognizing their exceptional dedication and significant contribution to the bank’s success. He commended the entire Mirpur team for their efforts in upholding BAJK’s core values and vigorously driving its mission forward.<br><br>

The visit underscored BAJK’s strategic focus on strengthening its regional presence, empowering local communities, and understanding the unique financial needs of the people it serves.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>میرپور، آزاد جموں و کشمیر</strong><br>
<strong>بینک آف آزاد جموں و کشمیر (BAJK) کے صدر و چیف ایگزیکٹو آفیسر، جناب شاہد شہزاد میر</strong> نے میرپور ریجن کا ایک اہم دورہ کیا، جہاں ان کا پُرتپاک استقبال بینک افسران، مقامی معززین اور عوام نے کیا۔<br><br>

اپنے دورے کے دوران، سی ای او نے اعلیٰ سطحی اجلاسوں کی صدارت کی جن میں بینک کی عملی کارکردگی، صارفین کو فراہم کی جانے والی خدمات کے معیار اور ریجن میں جاری ڈیجیٹل اقدامات کی پیش رفت کا تفصیلی جائزہ لیا گیا۔ انہوں نے اس عزم کا اعادہ کیا کہ بینک مالی شمولیت کے فروغ اور آزاد جموں و کشمیر کے عوام کو جدید، قابلِ رسائی اور جدت پر مبنی بینکاری سہولیات فراہم کرنے کے لیے پُرعزم ہے۔<br><br>

<strong>کمرشل و ریٹیل بینکنگ ڈویژن (CRBD) کے ڈویژنل ہیڈ اور ریجنل ہیڈ میرپور</strong> بھی ان کے ہمراہ تھے۔ ان افسران نے بینک کی ریجنل ترقی، پورٹ فولیو کارکردگی اور کمیونٹی سے روابط کی حکمت عملیوں پر جامع بریفنگ دی۔<br><br>

دورے کی نمایاں جھلک میں، سی ای او نے شاندار کارکردگی دکھانے والے ملازمین میں اسناد اور ایوارڈز تقسیم کیے اور ان کی غیرمعمولی لگن اور بینک کی کامیابی میں نمایاں خدمات کو سراہا۔ انہوں نے پوری میرپور ٹیم کو خراجِ تحسین پیش کیا کہ انہوں نے BAJK کے بنیادی اقدار کو برقرار رکھتے ہوئے اس کے مشن کو بھرپور انداز میں آگے بڑھایا۔<br><br>

یہ دورہ اس بات کی عکاسی کرتا ہے کہ BAJK اپنی ریجنل موجودگی کو مضبوط بنانے، مقامی کمیونٹیز کو بااختیار کرنے اور عوام کی منفرد مالی ضروریات کو سمجھنے پر اسٹریٹیجک توجہ دے رہا ہے۔<br>
</div>',
            'image' => 'news-images/mirpur.jpg',
             'published_date' => '2025-09-02',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'president-ceo-bajk-shahid-shahzad-mir-visit-mirpur-region',
            'is_published' => true,
        ]);

        NewsAnnouncement::create([
            'title' => 'President & CEO BAJK Mr. Shahid Shahzad Mir Undertakes Landmark Visit to Rawalakot Region',
            'content' => 'Rawalakot, Azad Jammu & Kashmir<br>
The <strong>President & Chief Executive Officer of Bank of Azad Jammu & Kashmir (BAJK), Mr. Shahid Shahzad Mir</strong>, undertook a significant visit to the Rawalakot region, where he was warmly welcomed by bank officials, local dignitaries, and the community.<br><br>

During his visit, the CEO chaired high-level meetings to review the bank’s operational performance, customer service standards, and the progress of digital initiatives in the region. He reiterated the bank’s unwavering commitment to enhancing financial inclusion and delivering innovative, accessible banking solutions to the people of Azad Jammu & Kashmir.<br><br>

Mr. Mir was accompanied by the <strong>Divisional Head of Commercial & Retail Banking Division (CRBD), the Divisional Head of Credit Management Division (CMD), and the Regional Head of Rawalakot</strong>. The officials provided comprehensive insights into the bank’s regional growth, portfolio performance, and community outreach strategies.<br><br>

As a highlight of the visit, the CEO distributed certificates and awards among high-performing employees, recognizing their exceptional dedication and significant contribution to the bank’s success. He commended the entire Rawalakot team for their efforts in upholding BAJK’s core values and vigorously driving its mission forward.<br><br>

The visit underscored BAJK’s strategic focus on strengthening its regional presence, empowering local communities, and understanding the unique financial needs of the people it serves.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>راولاکوٹ، آزاد جموں و کشمیر</strong><br>
<strong>بینک آف آزاد جموں و کشمیر (BAJK) کے صدر و چیف ایگزیکٹو آفیسر، جناب شاہد شہزاد میر</strong> نے راولاکوٹ ریجن کا ایک اہم دورہ کیا، جہاں بینک افسران، مقامی معززین اور عوام نے ان کا پُرتپاک استقبال کیا۔<br><br>

اپنے دورے کے دوران، سی ای او نے اعلیٰ سطحی اجلاسوں کی صدارت کی جن میں بینک کی عملی کارکردگی، صارفین کو فراہم کی جانے والی خدمات کے معیار اور ریجن میں جاری ڈیجیٹل اقدامات کی پیش رفت کا تفصیلی جائزہ لیا گیا۔ انہوں نے اس عزم کا اعادہ کیا کہ بینک مالی شمولیت کو فروغ دینے اور آزاد جموں و کشمیر کے عوام کو جدید، قابلِ رسائی اور جدت پر مبنی بینکاری سہولیات فراہم کرنے کے لیے پُرعزم ہے۔<br><br>

اس موقع پر <strong>کمرشل و ریٹیل بینکنگ ڈویژن (CRBD) کے ڈویژنل ہیڈ، کریڈٹ مینجمنٹ ڈویژن (CMD) کے ڈویژنل ہیڈ اور ریجنل ہیڈ راولاکوٹ</strong> بھی ان کے ہمراہ تھے۔ ان افسران نے بینک کی ریجنل ترقی، پورٹ فولیو کارکردگی اور کمیونٹی سے روابط کی حکمت عملیوں پر جامع بریفنگ دی۔<br><br>

دورے کی نمایاں جھلک میں، سی ای او نے شاندار کارکردگی دکھانے والے ملازمین میں اسناد اور ایوارڈز تقسیم کیے اور ان کی غیرمعمولی لگن اور بینک کی کامیابی میں نمایاں خدمات کو سراہا۔ انہوں نے پوری راولاکوٹ ٹیم کو خراجِ تحسین پیش کیا کہ انہوں نے BAJK کے بنیادی اقدار کو برقرار رکھتے ہوئے اس کے مشن کو بھرپور انداز میں آگے بڑھایا۔<br><br>

یہ دورہ اس بات کی عکاسی کرتا ہے کہ BAJK اپنی ریجنل موجودگی کو مضبوط بنانے، مقامی کمیونٹیز کو بااختیار کرنے اور عوام کی منفرد مالی ضروریات کو سمجھنے پر اسٹریٹیجک توجہ دے رہا ہے۔<br>
</div>',
           'image' => 'news-images/white.jpg',
             'published_date' => '2025-09-01',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'president-ceo-bajk-shahid-shahzad-mir-landmark-visit-rawalakot-region',
            'is_published' => true,
        ]);

   NewsAnnouncement::create([
            'title' => 'BAJK President & CEO Mr. Shahid Shahzad Mir Undertakes Landmark Visit to Kotli Region',
         'content' => 'Kotli, Azad Jammu & Kashmir<br>
The <strong>President & Chief Executive Officer of Bank of Azad Jammu & Kashmir (BAJK), Mr. Shahid Shahzad Mir</strong>, undertook a landmark visit to the Kotli region, where he was warmly welcomed by bank officials, local dignitaries, and the community.<br><br>

During the visit, the CEO chaired high-level meetings aimed at reviewing the bank’s operational performance, customer service standards, and the implementation of digital initiatives in the region. He emphasized the bank’s commitment to enhancing financial inclusion and delivering innovative banking solutions to the people of Azad Jammu & Kashmir.<br><br>

Mr. Mir was accompanied by the <strong>DH Commercial & Retail Banking Division (CRBD), Regional Head, and other senior officials</strong>, who provided insights into the bank’s regional growth and outreach strategies.<br><br>

As a highlight of the visit, the CEO distributed certificates and awards among high-performing employees, recognizing their dedication and contribution to the bank’s success. He commended the team’s efforts in upholding BAJK’s values and driving its mission forward.<br><br>

The visit underscored BAJK’s focus on strengthening its regional presence and fostering deeper connections with local communities.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>کوٹلی، آزاد جموں و کشمیر</strong><br>
<strong>بینک آف آزاد جموں و کشمیر (BAJK) کے صدر و چیف ایگزیکٹو آفیسر، مسٹر شاہد شہزاد میر</strong> نے کوٹلی ریجن کا ایک تاریخی دورہ کیا، جہاں ان کا پُرتپاک استقبال بینک افسران، مقامی معززین اور عوام نے کیا۔<br><br>

اپنے دورے کے دوران، سی ای او نے اعلیٰ سطحی اجلاسوں کی صدارت کی جن میں بینک کی کارکردگی، صارفین کو فراہم کی جانے والی خدمات کے معیار اور ریجن میں ڈیجیٹل اقدامات کے نفاذ کا جائزہ لیا گیا۔ انہوں نے اس عزم کا اعادہ کیا کہ بینک مالی شمولیت کو فروغ دینے اور عوام کو جدید، ٹیکنالوجی پر مبنی بینکاری سہولیات فراہم کرنے کے لیے پرعزم ہے۔<br><br>

اس موقع پر <strong>ڈی ایچ کمرشل اینڈ ریٹیل بینکنگ ڈویژن (CRBD)، ریجنل ہیڈ اور دیگر سینئر افسران</strong> بھی ان کے ہمراہ تھے، جنہوں نے ریجنل ترقی اور outreach منصوبوں پر تفصیلی بریفنگ دی۔<br><br>

دورے کی نمایاں جھلک میں، سی ای او نے بہترین کارکردگی دکھانے والے ملازمین کو سرٹیفکیٹس اور ایوارڈز سے نوازا اور ان کی خدمات کو سراہا۔ انہوں نے کہا کہ ٹیم کی یہ کاوشیں BAJK کے اقدار کو برقرار رکھنے اور اس کے مشن کو آگے بڑھانے میں کلیدی کردار ادا کر رہی ہیں۔<br><br>

یہ دورہ BAJK کے اس عزم کی عکاسی کرتا ہے کہ ادارہ اپنی ریجنل موجودگی کو مزید مستحکم بنائے گا، عوامی خدمات میں بہتری لائے گا اور مقامی کمیونٹی کے ساتھ مضبوط تعلقات استوار کرے گا۔<br>
</div>',
            'image' => 'news-images/landmark.jpg',
             'published_date' => '2025-08-30',
            'is_featured' => true,
            'category' => 'general',
            'slug' => 'bajk-president-ceo-shahid-shahzad-mir-landmark-visit-kotli-region',
            'is_published' => true,
        ]);


   
        NewsAnnouncement::create([
            'title' => 'BAJK Board of Directors Holds 93rd Meeting to Accelerate Digital Transformation and Strategic Growth',
               'content' => 'Islamabad<br>
The 93rd meeting of the <strong>Board of Directors of Bank of Azad Jammu & Kashmir (BAJK)</strong> was convened at <strong>Kashmir House, Islamabad</strong> on Thursday. The meeting was chaired by <strong>Mr. Khan Abdul Majid Khan, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of BAJK</strong>.<br><br>

The Board members reviewed the Bank\'s strategic progress and charted the course for its future initiatives.<br><br>

The meeting saw participation from key members including:<br>
- <strong>President & CEO, Mr. Shahid Shahzad Mir</strong><br>
- <strong>Secretary Finance, AJK, Mr. Islam Zaib</strong><br>
- <strong>Secretary Industries & Commerce, AJK, Ch. Abdul Rehman</strong><br>
- <strong>Secretary Law & Justice, Mr. Muhammad Sajjad</strong><br>
- <strong>Company Secretary, Dr. Adnanullah Khan</strong><br>
Other directors, <strong>Mr. Mubashar Nabi</strong> and <strong>Ms. Bushra Naz Malik</strong>, joined the meeting via Zoom.<br><br>

<strong>Key Discussions & Decisions:</strong><br>
1. <strong>Expedited Core Banking System Implementation:</strong><br>
The Board received a comprehensive update on the ongoing project with Silverlake. Directives were issued to accelerate the implementation process and complete it at the earliest. The Board emphasized that this modernization is vital for enhancing digital banking services, operational efficiency, and superior customer experience.<br><br>

2. <strong>Acquisition of Schedule Bank Status:</strong><br>
A key strategic priority was the process of obtaining Schedule Bank status from the State Bank of Pakistan (SBP). The Board directed the management to complete the required steps and secure SBP approval as early as possible.<br><br>

3. <strong>Strategic Roadmap Review:</strong><br>
The Board deliberated on ongoing initiatives aimed at strengthening the Bank\'s financial performance, expanding its service network, and adopting cutting-edge banking technologies.<br><br>

<strong>Chairman\'s Direction:</strong><br>
Chairman <strong>Mr. Khan Abdul Majid Khan</strong> commended the management\'s efforts and reiterated the Board\'s full support for the Bank\'s transformational journey. He emphasized the collective commitment to innovation and sustainable growth, which is fundamental to realizing BAJK\'s vision of becoming a leading financial institution in the region.<br><br>

<strong>Way Forward:</strong><br>
The Board remains focused on driving sustainable growth, expanding services, and leveraging advanced technology to deliver exceptional value to its customers and stakeholders.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>اسلام آباد</strong><br>
<strong>بینک آف آزاد جموں و کشمیر (بی اے جے کے)</strong> کے بورڈ آف ڈائریکٹرز کا 93واں اجلاس جمعرات کے روز <strong>کشمیر ہاؤس اسلام آباد</strong> میں منعقد ہوا۔ اجلاس کی صدارت <strong>وزیر خزانہ و کواپریٹوز حکومت آزاد جموں و کشمیر اور چیئرمین بی اے جے کے، جناب خان عبدالمجید خان</strong> نے کی۔<br><br>

بورڈ کے اراکین نے بینک کی اسٹریٹیجک پیشرفت کا جائزہ لیا اور مستقبل کے اقدامات کے لیے رہنما اصول مرتب کیے۔<br><br>

اجلاس میں اہم اراکین نے شرکت کی، جن میں شامل ہیں:<br>
<strong>صدر و سی ای او جناب شاہد شہزاد میر</strong><br>
<strong>سیکرٹری فنانس جناب اسلام زیب</strong><br>
<strong>سیکرٹری انڈسٹریز و کامرس چوہدری عبدالرحمٰن</strong><br>
<strong>سیکرٹری لاء اینڈ جسٹس جناب محمد سجاد</strong><br>
<strong>کمپنی سیکرٹری ڈاکٹر عدنان اللہ خان</strong><br>
دیگر ڈائریکٹرز <strong>جناب مبشر نبی</strong> اور <strong>محترمہ بشریٰ ناز ملک</strong> نے زوم کے ذریعے اجلاس میں شرکت کی۔<br><br>

<strong>اہم امور اور فیصلے:</strong><br>
1. <strong>بنیادی بینکاری نظام کے نفاذ میں تیزی:</strong><br>
بورڈ کو سلورلیک کے ساتھ جاری منصوبے پر تفصیلی بریفنگ دی گئی۔ ہدایت دی گئی کہ اس کے نفاذ کے عمل کو تیز کیا جائے اور جلد از جلد مکمل کیا جائے۔ بورڈ نے اس بات پر زور دیا کہ یہ جدیدیت ڈیجیٹل بینکاری خدمات، آپریشنل کارکردگی اور اعلیٰ معیار کے صارفین کے تجربے کو بہتر بنانے کے لیے نہایت اہم ہے۔<br><br>

2. <strong>شیڈول بینک کا درجہ حاصل کرنا:</strong><br>
بورڈ نے ایک اہم اسٹریٹیجک ترجیح کے طور پر غور کیا کہ اسٹیٹ بینک آف پاکستان (ایس بی پی) سے شیڈول بینک کا درجہ حاصل کرنے کے لیے ضروری اقدامات مکمل کیے جائیں اور فوری منظوری لی جائے۔<br><br>

3. <strong>اسٹریٹیجک روڈ میپ کا جائزہ:</strong><br>
بورڈ نے مختلف جاری اقدامات پر غور کیا جن کا مقصد بینک کی مالی کارکردگی کو بہتر بنانا، سروس نیٹ ورک کو وسعت دینا اور جدید بینکاری ٹیکنالوجیز اپنانا ہے۔<br><br>

<strong>چیئرمین کی ہدایت:</strong><br>
چیئرمین <strong>جناب خان عبدالمجید خان</strong> نے مینجمنٹ کی کاوشوں کو سراہا اور بینک کے انقلابی سفر کے لیے بورڈ کی مکمل حمایت کا اعادہ کیا۔ انہوں نے جدت اور پائیدار ترقی کے اجتماعی عزم پر زور دیا، جو بی اے جے کے کے وژن کو ایک نمایاں مالیاتی ادارہ بنانے کے لیے بنیادی حیثیت رکھتا ہے۔<br><br>

<strong>آئندہ کا لائحہ عمل:</strong><br>
بورڈ پائیدار ترقی، خدمات کے دائرہ کار کو وسعت دینے اور جدید ٹیکنالوجی سے فائدہ اٹھا کر صارفین اور اسٹیک ہولڈرز کو شاندار قدر فراہم کرنے پر توجہ مرکوز رکھے گا۔<br>
</div>',
             'image' => 'news-images/93 meeting.jpg',
            'published_date' => '2025-08-29',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'bajk-board-directors-93rd-meeting-digital-transformation-strategic-growth',
            'is_published' => true,
        ]);




        NewsAnnouncement::create([
            'title' => 'Prime Minister’s Youth Loan Program Launched to Support Startups Across Azad Kashmir',
           'content' => 'Islamabad<br>
Under the vision of the <strong>Prime Minister of Azad Jammu & Kashmir, Chaudhry Anwar Haq</strong>, for <strong>Youth Empowerment</strong>, the <strong>Bank of Azad Jammu & Kashmir (BAJK)</strong> and the <strong>Azad Kashmir Small Industries Corporation (AKSIC)</strong> have signed a <strong>Memorandum of Understanding (MoU)</strong> for the implementation of the <strong>Prime Minister’s Youth Loan Program</strong>.<br><br>

The signing ceremony was held on Thursday at the <strong>BAJK Camp Office</strong>. It was attended by <strong>Minister for Finance & Cooperatives and Chairman of the Bank, Mr. Khan Abdul Majid Khan</strong>; <strong>Minister for Small Industries & TATA, Prof. Taqdees Gilani</strong>; <strong>Secretary Finance, Mr. Islam Zeb</strong>; <strong>Secretary Industries, Mr. Chaudhry Abdul Rehman</strong>; <strong>President/CEO BAJK, Mr. Shahid Shahzad Mir</strong>; <strong>Managing Director Small Industries, Mr. Muhammad Zeeshan</strong>; <strong>Director Small Industries, Mr. Abdul Khaliq Abbasi</strong>; <strong>DH CMD, Mr. Muhammad Imtiaz Shaheen</strong>; along with other distinguished personalities.<br><br>

Under this scheme, young people will be provided <strong>interest-free loans (zero markup)</strong> ranging from <strong>PKR 100,000 to PKR 2,000,000</strong>. These loans will be given for <strong>new and startup businesses</strong>.<br><br>

The primary objective of the scheme is to provide interest-free loans to the youth of the region, enabling them to <strong>develop entrepreneurial skills</strong>, <strong>create new employment opportunities</strong>, <strong>reduce poverty</strong>, and <strong>promote economic activities in the private sector</strong>.<br><br>

As per the agreement, both institutions will assist young people across <strong>all ten districts of Azad Kashmir</strong> in establishing and promoting small businesses.<br><br>

After the formal signing of the MoU, the scheme will become fully operational.<br><br>

The <strong>Secretary Industries of AKSIC</strong> stated: “This step is a significant milestone towards turning the dreams of young people into reality.”<br><br>

The <strong>President of the Bank</strong> said: “The entire team of the Bank is determined to make this scheme a success. We will provide not only financial but also technical support to young entrepreneurs.”<br><br>

Through this scheme, a new ray of hope is expected to shine for <strong>thousands of young people in Azad Kashmir</strong>, paving the way for a brighter future.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>اسلام آباد</strong><br>
<strong>وزیراعظم آزاد جموں و کشمیر چوہدری انور الحق</strong> کے ویژن <strong>یوتھ ایمپاورمنٹ</strong> کے تحت، <strong>بینک آف آزاد جموں و کشمیر (BAJK)</strong> اور <strong>آزاد کشمیر اسمال انڈسٹریز کارپوریشن (AKSIC)</strong> نے <strong>وزیراعظم یوتھ لون پروگرام</strong> کے نفاذ کے لیے ایک <strong>مفاہمتی یادداشت (MoU)</strong> پر دستخط کر دیے ہیں۔<br><br>

جمعرات کو <strong>بینک آف آزاد جموں و کشمیر کے کیمپ آفس</strong> میں منعقدہ دستخطی تقریب میں <strong>وزیر خزانہ و کواپریٹوز و چئیرمین بینک خان عبدالماجد خان</strong>، <strong>وزیر سمال انڈسٹریز و ٹاٹا پروفیسر تقدیس گیلانی</strong>، <strong>سیکرٹری خزانہ جناب اسلام زیب</strong>، <strong>سیکرٹری انڈسٹریز جناب چوہدری عبدالرحمان</strong>، <strong>صدر/سی ای او بینک جناب شاہد شہزاد میر</strong>، <strong>منیجنگ ڈائریکٹر اسمال انڈسٹریز جناب محمد زیشان</strong>، <strong>ڈائریکٹر اسمال انڈسٹریز جناب عبدالخالق عباسی</strong>، <strong>ڈی ایچ سی ایم ڈی جناب محمد امتیاز شاہین</strong> اور دیگر معزز شخصیات نے شرکت کی۔<br><br>

اس سکیم کے تحت نوجوانوں کو <strong>ایک لاکھ روپے سے لے کر بیس لاکھ روپے تک بلا سود (زیرو مارک اپ) قرضے</strong> فراہم کیے جائیں گے جو <strong>نئے اور اسٹارٹ اپ کاروبار</strong> کے لیے دیے جائیں گے۔<br><br>

اس سکیم کا بنیادی مقصد نوجوانوں کو بلاسود قرضے فراہم کر کے ان میں <strong>کاروباری صلاحیتیں اجاگر کرنا</strong>، <strong>روزگار کے نئے مواقع پیدا کرنا</strong>، <strong>غربت میں کمی لانا</strong>، اور <strong>نجی شعبے میں معاشی سرگرمیوں کو فروغ دینا</strong> ہے۔<br><br>

یہ معاہدہ دونوں اداروں کے درمیان آزاد کشمیر کے <strong>تمام دس اضلاع</strong> میں نوجوانوں کو چھوٹے کاروبار قائم کرنے اور ان کی ترقی میں معاونت فراہم کرے گا۔<br><br>

ایم او یو پر دستخط کے بعد یہ سکیم باقاعدہ طور پر نافذ العمل ہو جائے گی۔<br><br>

<strong>سیکرٹری انڈسٹریز، اے کے ایس آئی سی</strong> نے کہا: "یہ قدم نوجوانوں کے خوابوں کو حقیقت بنانے کی سمت ایک اہم پیش رفت ہے۔"<br><br>

<strong>صدر بینک</strong> نے کہا: "بینک کی پوری ٹیم اس سکیم کو کامیاب بنانے کے لیے پرعزم ہے۔ ہم نوجوان کاروباریوں کو نہ صرف مالی بلکہ تکنیکی معاونت بھی فراہم کریں گے۔"<br><br>

اس سکیم سے آزاد کشمیر کے <strong>ہزاروں نوجوانوں</strong> کے لیے مستقبل میں روشنی کی نئی کرن دیکھی جا رہی ہے۔<br>
</div>',
             'image' => 'news-images/smallindustries.jpg',
             'published_date' => '2025-08-28',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'prime-ministers-youth-loan-program-startups-azad-kashmir',
            'is_published' => true,
        ]);



        
        NewsAnnouncement::create([
            'title' => 'Tribute on the 78th Independence Day by the President & CEO, BAJK',
'content' => 'Independence Day Message<br>
As we celebrate the <strong>78th Independence Day</strong> of our beloved homeland, I extend my heartfelt greetings to the people of Pakistan and Azad Jammu & Kashmir. This day reminds us of the countless sacrifices made by our forefathers for the priceless gift of freedom, and now it is our duty to honor that legacy with unity, dedication, and purpose.<br><br>

On this occasion, I pay the highest tribute to the valiant <strong>Pakistan Armed Forces</strong>, who continue to guard our homeland with unwavering courage, unmatched dedication, and unshakable resolve. Their sacrifices—past and present—are the backbone of our sovereignty and the pride of every Pakistani and Kashmiri.<br><br>

As <strong>President & CEO</strong> of the Bank of Azad Jammu & Kashmir, I reaffirm our commitment to serving the people of AJK and Pakistan with integrity, innovation, and purpose. Let this Independence Day be a moment of renewal—of our unity, our resolve, and our shared vision for a stronger, more prosperous Pakistan.<br><br>

May our flag always fly with pride and may our beloved homeland continue to thrive as a beacon of peace, progress, and justice.<br><br>

<strong>Pakistan Zindabad</strong><br>
<strong>Salute to the Pakistan Army</strong><br><br>

— <strong>Shahid Mir</strong><br>
<strong>President/CEO</strong><br>
<strong>Bank of Azad Jammu & Kashmir</strong><br><br>

<div dir="rtl" style="text-align: right;">
<strong>یومِ آزادی کا پیغام</strong><br>
جیسے ہی ہم اپنی پیاری سرزمین کا <strong>78واں یومِ آزادی</strong> منا رہے ہیں، میں پاکستان اور آزاد جموں و کشمیر کے عوام کو دلی مبارکباد پیش کرتا ہوں۔ یہ دن ہمیں اُن بے شمار قربانیوں کی یاد دلاتا ہے جو ہمارے بزرگوں نے ہمیں آزادی کی انمول نعمت دینے کے لیے دی تھیں۔ اب یہ ہماری ذمہ داری ہے کہ ہم اس ورثے کو اتحاد، لگن اور مقصد کے ساتھ آگے بڑھائیں۔<br><br>

اس موقع پر میں <strong>پاک افواج</strong> کے بہادر جوانوں کو خراجِ تحسین پیش کرتا ہوں جو جرات، غیر متزلزل عزم اور بے مثال قربانیوں کے ساتھ ہمارے وطن کی حفاظت کر رہے ہیں۔ اُن کی قربانیاں، چاہے وہ ماضی کی ہوں یا حال کی، ہماری خودمختاری کی بنیاد اور ہر پاکستانی و کشمیری کا فخر ہیں۔<br><br>

بطور <strong>صدر و چیف ایگزیکٹو</strong> بینک آف آزاد جموں و کشمیر، میں اپنے عزم کی تجدید کرتا ہوں کہ ہم اے جے کے اور پاکستان کے عوام کی خدمت دیانتداری، جدت اور عزم کے ساتھ جاری رکھیں گے۔ آئیے اس یومِ آزادی کو تجدید کا لمحہ بنائیں — ہمارے اتحاد، ہمارے عزم اور ایک مضبوط اور خوشحال پاکستان کے ہمارے مشترکہ وژن کی تجدید۔<br><br>

اللہ کرے ہمارا پرچم ہمیشہ سربلند رہے اور ہمارا پیارا وطن امن، ترقی اور انصاف کی علامت بن کر ہمیشہ پروان چڑھتا رہے۔<br><br>

<strong>پاکستان زندہ باد</strong><br>
<strong>پاک فوج کو سلام</strong><br><br>

— <strong>شاہد میر</strong><br>
<strong>صدر / چیف ایگزیکٹو</strong><br>
<strong>بینک آف آزاد جموں و کشمیر</strong>
</div>',

            'image' => 'news-images/DH14aug.jpg',
            'published_date' => '2025-08-14',
            'is_featured' => true,
            'category' => 'general',
            'slug' => 'tribute-78th-independence-day-president-ceo-bajk',
            'is_published' => true,
        ]);

   NewsAnnouncement::create([
            'title' => 'Spirit of Unity and Patriotism Highlighted at BAJK Rawalakot Independence Day Celebration',
           'content' => 'Rawalakot<br>
On the occasion of <strong>Independence Day</strong>, a cake cutting ceremony was held at the <strong>BAJK-Regional Office Rawalakot</strong>. The event was graced by the <strong>Regional Head Rawalakot</strong>, accompanied by Regional Managers and staff from various branches. The ceremony reflected a <strong>spirit of patriotism and unity</strong>, bringing together team members to celebrate the national day with enthusiasm and pride.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>یومِ آزادی کے موقع پر تقریب</strong><br>
<strong>راولا کوٹ،</strong><br>
یومِ آزادی کے موقع پر <strong>بینک آف آزاد جموں و کشمیر کے ریجنل آفس راولا کوٹ</strong> میں کیک کاٹنے کی تقریب منعقد ہوئی۔ اس تقریب میں <strong>ریجنل ہیڈ راولا کوٹ</strong> نے شرکت کی، جبکہ مختلف شاخوں کے ریجنل منیجرز اور عملہ بھی موجود تھا۔<br><br>

یہ تقریب <strong>حب الوطنی اور اتحاد</strong> کے جذبے کی عکاسی کرتی ہے، جس میں ٹیم کے اراکین نے قومی دن کو جوش و خروش اور فخر کے ساتھ منایا۔<br>
</div>',
            'image' => 'news-images/14 august.jpg',
            'published_date' => '2025-08-14',
            'is_featured' => true,
            'category' => 'general',
            'slug' => 'spirit-unity-patriotism-bajk-rawalakot-independence-day-celebration',
            'is_published' => true,
        ]);


  NewsAnnouncement::create([
            'title' => '92nd Meeting of the Board of Directors of BAJK Held in Islamabad',
           'content' => 'Islamabad <br>
            The <strong>92nd meeting</strong> of the Board of Directors (BoD) of <strong>Bank of Azad Jammu & Kashmir (BAJK)</strong> was held on <strong>Monday in Islamabad</strong>, chaired by <strong>Mr. Khan Abdul Majid Khan</strong>, Honorable Minister for Finance & Cooperatives, Government of Azad Jammu & Kashmir, and Chairman of BAJK.<br><br>

<strong>Board Members in Attendance:</strong><br>
- <strong>Mr. Khan Abdul Majid Khan</strong> (Chairman)<br>
- <strong>Mr. Shahid Shahzad Mir</strong> (President & CEO, BAJK)<br>
- <strong>Mr. Islam Zaib</strong> (Secretary Finance, AJK)<br>
- <strong>Mr. Khalid Mahmood Mirza</strong> (Secretary Industries & Commerce, AJK)<br>
- <strong>Mr. Muhammad Sajjad</strong> (Secretary Law & Justice, AJK)<br>
- <strong>Mr. Mubashar Nabi</strong><br>
- <strong>Ms. Bushra Naz Malik</strong> (Board Member)<br>
- <strong>Dr. Adnanullah Khan</strong> (Company Secretary)<br><br>

<strong>Key Highlights:</strong><br>
1. <strong>Core Banking System Contract Ceremony:</strong><br>
&nbsp;&nbsp;- The Board expressed satisfaction over the recent <strong>Core Banking System contract signing ceremony</strong>, held in the presence of the <strong>Prime Minister of AJK</strong> and senior government officials.<br>
&nbsp;&nbsp;- Emphasis was placed on the <strong>speedy implementation</strong> of the new system to enhance digital banking services and operational efficiency.<br><br>

2. <strong>Approval of New ESG Committee:</strong><br>
&nbsp;&nbsp;- The Board approved the <strong>Terms of Reference (ToRs)</strong> for the newly established <strong>Environmental, Social, and Governance (ESG) Committee</strong>, reinforcing BAJK’s commitment to sustainable and responsible banking practices.<br><br>

3. <strong>Strategic Discussions:</strong><br>
&nbsp;&nbsp;- Progress on ongoing initiatives was reviewed, focusing on <strong>financial growth, technological advancements, and customer service improvements</strong>.<br><br>

<strong>Chairman’s Remarks:</strong><br>
Mr. Khan Abdul Majid Khan commended the efforts of BAJK’s leadership, Board members, and stakeholders in driving the Bank’s progress. He reiterated BAJK’s vision to become a <strong>leading financial institution</strong> through innovation, digital transformation, and sustainable development.<br><br>

<strong>Way Forward:</strong><br>
The Board reaffirmed its focus on <strong>accelerating digital transformation, expanding services, and adopting best governance practices</strong> to better serve customers and stakeholders.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>اسلام آباد –</strong> بینک آف آزاد جموں و کشمیر (BAJK) کے <strong>بورڈ آف ڈائریکٹرز</strong> کا <strong>92 واں اجلاس</strong> <strong>پیر کے روز اسلام آباد</strong> میں منعقد ہوا، جس کی صدارت <strong>محترم خان عبدالمجید خان</strong>، وزیرِ خزانہ و کوآپریٹیوز، حکومت آزاد جموں و کشمیر و چیئرمین BAJK نے کی۔<br><br>

<strong>شرکاء بورڈ اجلاس:</strong><br>
- <strong>محترم خان عبدالمجید خان</strong> (چیئرمین)<br>
- <strong>جناب شاہد شہزاد میر</strong> (صدر و سی ای او، BAJK)<br>
- <strong>جناب اسلام زیب</strong> (سیکرٹری خزانہ، آزاد کشمیر)<br>
- <strong>جناب خالد محمود مرزا</strong> (سیکرٹری صنعت و تجارت، آزاد کشمیر)<br>
- <strong>جناب محمد سجاد</strong> (سیکرٹری قانون و انصاف، آزاد کشمیر)<br>
- <strong>جناب مبشر نبی</strong><br>
- <strong>محترمہ بشریٰ ناز ملک</strong> (بورڈ ممبر)<br>
- <strong>ڈاکٹر عدنان اللہ خان</strong> (کمپنی سیکرٹری)<br><br>

<strong>اہم نکات:</strong><br>
1. <strong>کور بینکنگ سسٹم معاہدے کی تقریب:</strong><br>
&nbsp;&nbsp;- بورڈ نے حال ہی میں منعقدہ <strong>کور بینکنگ سسٹم معاہدے کی دستخطی تقریب</strong> پر اطمینان کا اظہار کیا، جو <strong>وزیراعظم آزاد کشمیر</strong> اور اعلیٰ حکومتی افسران کی موجودگی میں منعقد ہوئی۔<br>
&nbsp;&nbsp;- اس موقع پر نئے نظام کے <strong>فوری نفاذ</strong> پر زور دیا گیا تاکہ ڈیجیٹل بینکنگ خدمات اور آپریشنز میں بہتری لائی جا سکے۔<br><br>

2. <strong>نئی ESG کمیٹی کی منظوری:</strong><br>
&nbsp;&nbsp;- بورڈ نے نئی تشکیل شدہ <strong>ماحولیاتی، سماجی و طرزِ حکمرانی (ESG) کمیٹی</strong> کے <strong>کارِ منصبی حدود (ToRs)</strong> کی منظوری دی، جو پائیدار اور ذمہ دار بینکاری کے عزم کی عکاسی کرتا ہے۔<br><br>

3. <strong>اسٹریٹجک امور پر گفتگو:</strong><br>
&nbsp;&nbsp;- جاری اقدامات کی پیش رفت کا جائزہ لیا گیا، جس میں <strong>مالی ترقی، ٹیکنالوجی میں بہتری، اور کسٹمر سروس میں بہتری</strong> پر توجہ دی گئی۔<br><br>

<strong>چیئرمین کے تاثرات:</strong><br>
محترم خان عبدالمجید خان نے بینک کی قیادت، بورڈ ممبران اور تمام اسٹیک ہولڈرز کی کاوشوں کو سراہا جنہوں نے بینک کو ترقی کی راہ پر گامزن کیا۔ انہوں نے اس عزم کا اعادہ کیا کہ BAJK کا وژن <strong>ایک معروف مالیاتی ادارہ</strong> بننا ہے جو جدت، ڈیجیٹل ٹرانسفارمیشن اور پائیدار ترقی کے ذریعے ممکن ہو گا۔<br><br>

<strong>آئندہ کا لائحہ عمل:</strong><br>
بورڈ نے <strong>ڈیجیٹل تبدیلی کو تیز کرنے، سروسز میں توسیع، اور بہترین گورننس اصولوں کو اپنانے</strong> پر توجہ مرکوز رکھنے کا اعادہ کیا تاکہ صارفین اور شراکت داروں کو بہتر سہولیات فراہم کی جا سکیں۔<br><br>
</div>',

            'image' => 'news-images/92meting.jpg',
            'published_date' => '2025-07-28',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => '92nd-meeting-board-of-directors-bajk-held-in-islamabad',
            'is_published' => true,
        ]);

 NewsAnnouncement::create([
            'title' => 'BAJK Signs Historic Agreement with Silverlake to Implement Core Banking System, Ushering in a New Era of Digital Banking',
          'content' => 'Muzaffarabad<br>  The Bank of Azad Jammu and Kashmir (BAJK) has taken a monumental leap toward digital transformation by signing a landmark agreement with Malaysia-based global technology consortium Silverlake to implement a state-of-the-art <strong>Core Banking System (CBS)</strong>. The contract signing ceremony, held at the prestigious Islamabad Serena Hotel, was graced by esteemed dignitaries, marking a pivotal moment in the financial modernization of the region.<br><br>

<strong>Distinguished Guests and Key Attendees</strong><br>
The event was attended by senior officials from BAJK, consortium partners, government representatives, and key stakeholders from the financial and technology sectors. The <strong>Honorable Prime Minister of AJK, Chaudhry Anwarul Haq</strong>, presided as the <strong>Chief Guest</strong>.<br>
Other notable attendees included:<br>
- <strong>Mr. Shahid Shahzad Mir</strong>, President & CEO of BAJK<br>
- <strong>Khan Abdul Majid Khan</strong>, Chairman of BAJK’s Board of Directors<br>
- <strong>Chaudhry Latif Akbar</strong>, Speaker of the AJK Legislative Assembly<br>
- <strong>Mr. Khushal Khan</strong>, Chief Secretary of AJK<br>
- Former Chief Secretaries <strong>Mr. Usman Chacharr</strong> and <strong>Mr. Dawood Bareech</strong><br>
- BAJK Directors, Divisional Heads, and members of the business community<br><br>

<strong>A Transformational Step for BAJK</strong><br>
The new <strong>Core Banking System (CBS)</strong> will replace BAJK’s legacy infrastructure with a <strong>modern, centralized, and real-time banking platform</strong>, integrating all operations to enhance efficiency, improve customer experience, and enable innovative digital services.<br><br>

<strong>Key Statements from the Ceremony</strong><br>
<strong>1. Mr. Shahid Shahzad Mir – President & CEO, BAJK</strong><br>
<em>"Today marks a historic step forward for BAJK, particularly under the dynamic leadership of Chairman Khan Abdul Majid Khan and the Board IT Committee. This CBS will strengthen our operational backbone and allow us to serve customers with speed, security, and innovation. It is a crucial part of our vision to become a fully digital, customer-centric bank across Azad Jammu & Kashmir."</em><br><br>

<strong>2. Mr. David Lim – Co-CEO, Silverlake</strong><br>
<em>"This partnership signifies a major digital transformation. Silverlake is committed to delivering a <strong>robust, scalable, and secure</strong> banking solution tailored to BAJK’s needs, ensuring compliance with global standards while empowering customers with real-time, 24/7 banking services."</em><br><br>

<strong>3. Khan Abdul Majid Khan – Chairman, BAJK</strong><br>
<em>"Forewarning and digital readiness are the backbone of modern banking. This initiative lays the foundation for BAJK’s <strong>scheduled bank status</strong>, economic empowerment, and AJK’s digital development. The dedication of BAJK’s management has been instrumental in reaching this milestone."</em><br><br>

<strong>4. Chaudhry Latif Akbar – Speaker, AJK Legislative Assembly</strong><br>
<em>"With this transformation, BAJK is on its way to becoming a <strong>scheduled bank</strong>—a milestone that will elevate financial services in the region. I commend Chairman Majid Khan and the entire BAJK team for their relentless efforts."</em><br><br>

<strong>Prime Minister Chaudhry Anwarul Haq’s Keynote Address</strong><br>
<em>"Today is a momentous occasion for Azad Jammu & Kashmir as we witness a strategic leap in our financial infrastructure. The agreement between BAJK and Silverlake is not merely a technological upgrade—it is a <strong>game-changer</strong> for our economy and a testament to our government’s commitment to digital progress.<br>
I commend BAJK’s Board of Directors and management for their foresight in embracing this transformation. The implementation of the Core Banking System will revolutionize service delivery, bringing AJK in line with global banking standards. This aligns perfectly with our vision to make BAJK a <strong>scheduled bank</strong>, a priority for my government.<br>
To the people of AJK, I assure you: this government stands firmly behind BAJK’s growth. We have high expectations from this partnership and are confident it will unlock new opportunities for economic empowerment, especially for our youth and entrepreneurs. I congratulate all stakeholders, particularly the Finance Secretary, for turning this vision into reality."</em><br><br>

<strong>Implementation Timeline</strong><br>
The CBS will be rolled out in phases and is expected to be <strong>fully operational across all BAJK branches within 24 months</strong>, revolutionizing banking services in AJK.<br><br>

<strong>About BAJK</strong><br>
The <strong>Bank of Azad Jammu & Kashmir (BAJK)</strong> is a state-owned financial institution committed to inclusive banking and socio-economic development in the region. With an expanding branch network and a vision for digital excellence, BAJK continues to play a vital role in AJK’s financial growth.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>بینک آف آزاد جموں و کشمیر (BAJK) نے سلورلیک کے ساتھ تاریخی معاہدہ پر دستخط کرتے ہوئے جدید ترین کور بینکنگ سسٹم متعارف کرانے کا اعلان کیا</strong><br>
<strong>مظفرآباد،</strong><br>
بینک آف آزاد جموں و کشمیر (BAJK) نے جمعہ کے روز ملائیشیا کی عالمی ٹیکنالوجی کنسورشیم سلورلیک کے ساتھ ایک تاریخی معاہدے پر دستخط کر کے خطے میں ڈیجیٹل بینکنگ کے نئے دور کا آغاز کر دیا ہے۔ اس معاہدے کے تحت BAJK میں جدید ترین <strong>کور بینکنگ سسٹم (CBS)</strong> متعارف کرایا جائے گا۔ اسلام آباد کے شاندار ہوٹل سیرینا میں منعقدہ دستخطی تقریب میں معزز شخصیات نے شرکت کی، جو خطے میں مالیاتی جدید کاری کا ایک اہم سنگ میل ثابت ہو گی۔<br><br>

<strong>تقریب میں شریک معزز شخصیات</strong><br>
تقریب میں BAJK کے اعلیٰ عہدیداران، کنسورشیم کے شراکت داروں، حکومتی نمائندوں اور مالیاتی و ٹیکنالوجی شعبوں کے اہم اسٹیک ہولڈرز نے شرکت کی۔ <strong>آزاد جموں و کشمیر کے وزیراعظم محترم چوہدری انور الحق</strong> اس موقع پر <strong>مہمان خصوصی</strong> کی حیثیت سے موجود تھے۔<br>
دیگر ممتاز شخصیات میں شامل تھے:<br>
- <strong>شاہد شہزاد میر</strong>، صدر و سی ای او BAJK<br>
- <strong>خان عبدالماجد خان</strong>، چیئرمین بورڈ آف ڈائریکٹرز BAJK<br>
- <strong>چوہدری لطیف اکبر</strong>، اسپیکر قانون ساز اسمبلی آزاد جموں و کشمیر<br>
- <strong>جناب خوشحال خان</strong>، چیف سیکرٹری آزاد جموں و کشمیر<br>
- سابق چیف سیکرٹریز <strong>جناب عثمان چھچھر</strong> اور <strong>جناب داؤد بریچ</strong><br>
- BAJK کے ڈائریکٹرز، ڈویژنل ہیڈز اور کاروباری برادری کے اراکین<br><br>

<strong>BAJK کے لیے ایک انقلابی قدم</strong><br>
نیا <strong>کور بینکنگ سسٹم (CBS)</strong> BAJK کے پرانے نظام کی جگہ لے گا اور ایک <strong>جدید، مرکزی اور رئیل ٹائم بینکنگ پلیٹ فارم</strong> فراہم کرے گا، جو تمام بینکنگ آپریشنز کو یکجا کرے گا، کارکردگی کو بہتر بنائے گا، صارفین کے تجربے کو بڑھائے گا اور جدید ڈیجیٹل خدمات کی راہ ہموار کرے گا۔<br><br>

<strong>تقریب سے کلیدی اقتباسات</strong><br>
<strong>1. شاہد شہزاد میر – صدر و سی ای او، BAJK</strong><br>
<em>"آج BAJK کے لیے ایک تاریخی لمحہ ہے، خاص طور پر چیئرمین خان عبدالماجد خان اور بورڈ آئی ٹی کمیٹی کی متحرک قیادت میں۔ یہ سسٹم ہمارے آپریشنل ڈھانچے کو مستحکم کرے گا اور ہمیں تیز، محفوظ اور جدید بینکنگ خدمات فراہم کرنے کے قابل بنائے گا۔"</em><br><br>

<strong>2. ڈیوڈ لِم – کو-سی ای او، سلورلیک</strong><br>
<em>"یہ شراکت داری ڈیجیٹل بینکنگ کی ایک بڑی تبدیلی کی نمائندہ ہے۔ سلورلیک BAJK کو <strong>مضبوط، محفوظ اور توسیع پذیر</strong> حل فراہم کرنے کے لیے پرعزم ہے جو عالمی معیار کے مطابق ہوگا۔"</em><br><br>

<strong>3. خان عبدالماجد خان – چیئرمین، BAJK</strong><br>
<em>"پیشگی تیاری اور ڈیجیٹل اپنانا جدید بینکنگ کی بنیاد ہیں۔ یہ اقدام نہ صرف BAJK کے <strong>شیڈولڈ بینک</strong> بننے کی راہ ہموار کرے گا بلکہ خطے کی ڈیجیٹل ترقی اور معاشی خودمختاری میں مددگار ہو گا۔"</em><br><br>

<strong>4. چوہدری لطیف اکبر – اسپیکر، قانون ساز اسمبلی</strong><br>
<em>"یہ اقدام BAJK کو <strong>شیڈولڈ بینک</strong> بننے کی طرف گامزن کرتا ہے، جو علاقے کی مالیاتی ترقی کے لیے ایک اہم پیش رفت ہے۔ میں چیئرمین اور ان کی ٹیم کو خراج تحسین پیش کرتا ہوں۔"</em><br><br>

<strong>وزیراعظم چوہدری انور الحق کا کلیدی خطاب</strong><br>
<em>"آج کا دن آزاد جموں و کشمیر کے لیے ایک سنگ میل ہے۔ یہ معاہدہ صرف ٹیکنالوجی کی اپ گریڈ نہیں بلکہ ایک <strong>انقلابی قدم</strong> ہے جو ہماری معیشت اور ڈیجیٹل وژن کی عکاسی کرتا ہے۔<br>
BAJK کی انتظامیہ اور بورڈ کی دوراندیشی لائق تحسین ہے۔ یہ نظام خدمات کی فراہمی میں انقلاب لائے گا اور عالمی معیارات سے ہم آہنگ کرے گا۔<br>
میری حکومت کا وژن ہے کہ BAJK کو <strong>شیڈولڈ بینک</strong> بنایا جائے اور ہم اس ترقی کے پیچھے پوری طرح کھڑے ہیں۔ یہ شراکت نئے معاشی مواقع پیدا کرے گی، خصوصاً نوجوانوں اور کاروباری افراد کے لیے۔ میں تمام اسٹیک ہولڈرز، خاص طور پر فنانس سیکرٹری کو مبارکباد پیش کرتا ہوں۔"</em><br><br>

<strong>نفاذ کا وقت کار</strong><br>
یہ سسٹم مرحلہ وار نافذ کیا جائے گا اور <strong>اگلے 24 ماہ کے اندر تمام برانچز میں مکمل طور پر فعال</strong> ہو جائے گا، جس سے بینکنگ سروسز میں انقلابی تبدیلی آئے گی۔<br><br>

<strong>BAJK کے بارے میں</strong><br>
<strong>بینک آف آزاد جموں و کشمیر (BAJK)</strong> ایک سرکاری مالیاتی ادارہ ہے جو جامع بینکاری اور معاشی ترقی کے لیے وقف ہے۔ اپنی وسیع ہوتی برانچ نیٹ ورک اور ڈیجیٹل وژن کے تحت، BAJK خطے کی مالی ترقی میں اہم کردار ادا کر رہا ہے۔
</div>',
            'image' => 'news-images/ceremony.jpg',
            'published_date' => '2025-07-11',
            'is_featured' => true,
            'category' => 'announcements',
            'slug' => 'bajk-silverlake-core-banking-agreement-digital-banking-era',
            'is_published' => true,
        ]);



        NewsAnnouncement::create([
            'title' => 'Inauguration of the 88th Branch of the Bank of Azad Jammu and Kashmir in Raheemkot',
            'content' => 'Muzaffarabad<br>
The Bank of Azad Jammu and Kashmir has inaugurated its <strong>88th branch</strong> in Raheemkot, an area of Chikar. The inauguration ceremony took place on Wednesday, with the <strong>Speaker of the AJK Legislative Assembly, Chaudhry Latif Akbar</strong>, and the <strong>Minister for Finance & Cooperative and Chairman of the Bank, Khan Abdul Majid Khan</strong>, as the chief guests. Both dignitaries formally inaugurated the branch by cutting the ribbon and unveiling the plaque. Chaudhry Latif Akbar also opened his personal account at the new branch.<br><br>

Present at the occasion were <strong>President/CEO Mr. Shahid Shehzad Mir</strong>, <strong>Divisional Head CRBD Raja Ghulam Mustafa</strong>, <strong>Divisional Head Operations Ehtesham Malik</strong>, <strong>Divisional Head CMD Muhammad Imtiaz Shaheen</strong>, <strong>Divisional Head SAMD Masood Ilyas Khan</strong>, <strong>Regional Head Muzaffarabad Jamal Anwar Khan</strong>, senior bank officials, and a large number of local residents.<br><br>

<strong>A Significant Step for the Region</strong><br>
With the opening of the new branch, a large population in Raheemkot and surrounding areas has gained access to banking facilities. The branch will serve people from areas such as <em>Namet Phutoat, Nakar, Perot, Sarakarr, Siri, Panjili, Upper Phutoat, Kiyati, Prem Kot, Katikar, Kundiali, Haveli, Lower Kot, Mashtamba, Jhagda Gali, Riyat, Mera Saru, Basti Qureshiyan, Basuj Chachiyan, Mera Kalan, Makhiyala Gali, Manja Ker, and Taap</em>.<br><br>

<strong>An Area Rich in Educational and Health Facilities</strong><br>
Rahim Kot hosts a <em>girls’ college, a boys’ college, a rural health center, a veterinary hospital, an agriculture office, a police check post, a community hall</em>, and various other government offices. The new bank branch is expected to <strong>promote commercial activity</strong> and provide <strong>easier access to banking services</strong> for students, farmers, traders, and the general public.<br><br>

<strong>Public Sentiment</strong><br>
Local residents expressed gratitude to the bank and government, calling this a vital step toward the region’s development. They noted that they would no longer need to travel far for banking services, and all financial transactions could now be handled with ease.<br><br>

<strong>Bank President Mr. Shahid Shehzad Mir</strong> stated that the bank’s mission is to deliver <strong>quality financial services</strong> to remote and underdeveloped areas. He pledged that the bank will continue to open branches in other parts of Azad Kashmir to provide <strong>modern banking facilities</strong> to the public. A special prayer was offered for the <strong>success and development</strong> of the bank, the state, and the country.<br><br>

<div dir="rtl" style="text-align: right;">
<strong>مظفر آباد</strong><br>
بینک آف آزاد جموں وکشمیر نے اپنی <strong>88 ویں برانچ</strong> کا چکار کے علاقے رحیم کوٹ میں افتتاح کر دیا ہے۔ بدھ کے روز رحیم کوٹ برانچ کی افتتاحی تقریب کے مہمان خصوصی آزاد جموں و کشمیر قانون ساز اسمبلی کے اسپیکر <strong>چوہدری لطیف اکبر</strong> اور وزیر خزانہ و کواپریٹو اور چیئرمین بینک <strong>خان عبدالماجد خان</strong> تھے۔ دونوں مہمانوں نے بینک کا افتتاح ربن کاٹ کر کیا، تختی کی نقاب کشائی کی گئی اور چوہدری لطیف اکبر نے اپنا ذاتی اکاؤنٹ بھی نئی برانچ میں کھول دیا۔<br><br>

اس موقع پر بینک آف آزاد جموں وکشمیر کے صدر/سی ای او <strong>شاہد شہزاد میر</strong>، ڈی ایچ سی آر بی ڈی <strong>راجہ غلام مصطفی</strong>، ڈی ایچ آپریشنز <strong>احتشام ملک</strong>، ڈی ایچ سی ایم ڈی <strong>محمد امتیاز شاہین</strong>، ڈی ایچ ایس اے ایم ڈی <strong>مسعود الیاس خان</strong>، ریجنل ہیڈ مظفرآباد <strong>جمال انور خان</strong>، بینک کے اعلیٰ عہدیداران اور مقامی لوگوں کی بڑی تعداد موجود تھی۔<br><br>

<strong>علاقے کے لیے ایک اہم قدم</strong><br>
نئی برانچ کے افتتاح سے <strong>رحیم کوٹ</strong> اور گردونواح کی ایک بڑی آبادی کو بینکنگ سہولیات میسر آئی ہیں۔ اس برانچ کے تحت <em>نامٹ فٹوٹ، نکر، پیروٹ، سراکڑ، سیری، پنجیلی، اپر فٹوٹ، کیاٹی، پریم کوٹ، کٹیکر، کنڈیالی، حویلی، لوئر کوٹ، مشٹمبا، جھگڑاگلی، ریاٹ، میرا سرو، بستی قریشیاں، بسوج چچیاں، میرا کلاں، مکھیالہ گلی، منجا کیر، ٹاپ</em> جیسے علاقوں کے لوگ مستفید ہوں گے۔<br><br>

<strong>تعلیمی و صحت کی سہولیات سے مالامال علاقہ</strong><br>
رحیم کوٹ میں <em>لڑکیوں کا کالج، لڑکوں کا کالج، رورل ہیلتھ سینٹر، ویٹرنری ہسپتال، زراعت کا دفتر، پولیس چوکی، کمیونٹی ہال</em> اور دیگر سرکاری دفاتر موجود ہیں۔ نئے بینک برانچ کے افتتاح سے نہ صرف <strong>تجارتی سرگرمیوں کو فروغ</strong> ملے گا بلکہ <strong>طلباء، کسانوں، تاجروں اور عام شہریوں کو بینکنگ خدمات تک آسان رسائی</strong> میسر آئے گی۔<br><br>

<strong>عوام کے جذبات</strong><br>
مقامی لوگوں نے بینک اور حکومت کا شکریہ ادا کرتے ہوئے اس اقدام کو <strong>علاقے کی ترقی کے لیے ایک اہم قدم</strong> قرار دیا۔ ان کا کہنا تھا کہ اب انہیں بینکنگ کے لیے دور دراز کا سفر نہیں کرنا پڑے گا اور تمام مالی لین دین آسانی سے ہو سکے گا۔<br><br>

بینک کے صدر <strong>شاہد شہزاد میر</strong> نے کہا کہ بینک کا مقصد <strong>دور دراز اور پسماندہ علاقوں میں معیاری مالیاتی خدمات</strong> پہنچانا ہے۔ انہوں نے عہد کیا کہ بینک آنے والے دنوں میں بھی آزاد کشمیر کے دیگر علاقوں میں اپنی شاخیں کھول کر <strong>عوام کو جدید بینکنگ سہولیات</strong> فراہم کرتا رہے گا۔<br><br>

اس موقع پر <strong>بینک، ریاست اور ملک کی ترقی، کامیابی</strong> کے لیے دعا کی گئی۔
</div>',
            'image' => 'news-images/88branch.jpg',
            'published_date' => '2025-07-02',
            'is_featured' => true,
            'category' => 'banking',
            'slug' => 'inauguration-88th-bajk-branch-rahim-kot',
            'is_published' => true,
        ]);

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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
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
            'is_featured' => true,
            'category' => 'general',
            'slug' => 'bajk-79th-board-meeting-approves-financials-highlights-growth',
            'is_published' => true,
        ]);


        // Create additional random news announcements
        // NewsAnnouncement::factory(15)->create();
    }
}
