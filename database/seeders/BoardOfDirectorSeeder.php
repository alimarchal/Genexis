<?php

namespace Database\Seeders;

use App\Models\BoardOfDirector;
use Illuminate\Database\Seeder;

class BoardOfDirectorSeeder extends Seeder
{
    public function run(): void
    {
        $boardMembers = [
            [
                'title' => 'Mr.',
                'full_name' => 'Abdul Majid Khan',
                'designation' => 'Minister Finance & Cooperatives / Chairman BAJK',
                'short_description' => 'Khan Abdul Majid Khan is currently Minister for Finance & Cooperatives of the State of AJ&K and is also Chairman Board of Directors of Bank of Azad Jammu and Kashmir.',
                'full_biography' => 'Khan Abdul Majid Khan is currently Minister for Finance & Cooperatives of the State of AJ&K and is also Chairman Board of Directors of Bank of Azad Jammu and Kashmir. Mr. Khan belongs to a respectable and reputable family having deep political links to Pakistan/Kashmir politics since time tracing back to independence days. Having diverse political career and experience with more than 16 years of struggle in the political arena of Azad Jammu & Kashmir he successfuly elected for four successive times by winning four consecutive AJK General Elections since 2006. Khan Abdul Majid Khan holds a Bachelors degree of Political Science, History and also LLB from University of Punjab. Previously, the Honorable Minister also successfully handled the portfolio of Rehabilitation, AKMIDC, Population Welfare, Information (Media), Agriculture, Livestock & Minerals in Govt. of AJK. He also remained Advisor to Prime Minister AJK on TEVTA and Information Technology. Mr. Khan has represented Kashmir issue at various international forums such as European Parliament, House of Lords, UK and Human Rights Commission. He also was part of dialogue on Kashmir issue in USA, Turkey and France. Mr. Khan being a young and energetic political figure also remained member of major Standing Committees of AJ&K Assembly pertaining to Finance, Planning & Development, LG&RD, S&GAD, C&W, Law, Food Department and also Public Accounts Committee (PAC), GoAJ&K. He also chaired Higher Education Commission, GoAJ&K.',
                'experience' => [
                    'Minister Finance & Cooperatives, State of AJ&K',
                    'Chairman Board of Directors, Bank of Azad Jammu & Kashmir',
                    'Four consecutive AJK General Elections winner since 2006',
                    'Previously handled portfolios: Rehabilitation, AKMIDC, Population Welfare, Information, Agriculture, Livestock & Minerals',
                    'Advisor to Prime Minister AJK on TEVTA and Information Technology',
                    'Chairman Higher Education Commission, GoAJ&K',
                ],
                'achievements' => [
                    'Represented Kashmir issue at European Parliament, House of Lords, UK',
                    'Part of dialogue on Kashmir issue in USA, Turkey and France',
                    'Member of major Standing Committees of AJ&K Assembly',
                    'Member of Public Accounts Committee (PAC), GoAJ&K',
                    'Bachelors degree in Political Science, History and LLB from University of Punjab',
                ],
                'image' => 'bod/chairman.jpg',
                'sort_order' => 1,
                'is_chairman' => true,
                'is_active' => true,
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Shahid Shahzad Mir',
                'designation' => 'President/CEO',
                'short_description' => 'Mr. Shahid Shahzad Mir is a seasoned banking professional with an illustrious career spanning several key leadership roles within the financial sector.',
                'full_biography' => 'Mr. Shahid Shahzad Mir is a seasoned banking professional with an illustrious career spanning several key leadership roles within the financial sector. Currently serving as the Executive Vice President and Chief Financial Officer (CFO) of The Bank of Azad Jammu & Kashmir, he brings a wealth of expertise in financial management, strategic leadership, and executive decision-making. Mr. Shahid Shahzad Mir commenced his journey with the Bank of Azad Jammu & Kashmir in 2006, initially joining as an OG-II. Through his unwavering commitment and diligent efforts, he progressively earned promotions within the organization. In 2014, in recognition of his hard work and dedication, Mr. Mir achieved the esteemed position of Divisional Head of the Financial Control Division and Treasury. Prior to joining Bank of AJK, he remained associated with Sehgal Group of Industries, Pakistan\'s one of the most reputed Business Group as Manager Finance. He has been looking after the Financial Control and Treasury Management of the Bank, playing a pivotal role in shaping and executing the bank\'s financial strategies. In addition to his core financial responsibilities, he holds significant leadership roles within the Bank. As Head of Finance & Treasury at the Head Office, he demonstrated exceptional financial acumen. His role extended to treasury functions, where he effectively managed day-to-day operations, investments in various financial instruments, and ensured robust and fund management. His meticulous approach to financial governance is evident from the Profitability of the Bank, which has been sky rocketed through viable investments. Mr. Shahid Shahzad Mir beings with him ample knowledge and experience of Commercial and Retail Banking, and in his previous role in the field of Business, he provided inspirational leadership ensuring the successful delivery of business plans. His academic journey reflects a commitment to continuous learning and professional development. Holding a Master\'s degree in Economics, and MBA in Finance, he has also earned diplomas and certifications in Islamic Banking and Finance and certified Islamic Fund Manager, further enhancing his expertise in this specialized domain. Recently assuming the charge of Acting President/CEO, Mr. Shahid Shahzad Mir brings a visionary approach to his leadership. Known for his strategic thinking and commitment to excellence, he is poised to steer The Bank of Azad Jammu & Kashmir towards new heights. His extensive experience, coupled with a comprehensive understanding of financial dynamics, positions him as a dynamic and capable leader ready to navigate the bank through evolving challenges and opportunities. Mr. Shahid Shahzad Mir\'s leadership philosophy revolves around fostering a culture of innovation, collaboration, and customer-centricity. As Acting President/CEO, he is dedicated to upholding the bank\'s legacy of trust, transparency, and service excellence, ensuring the continued success and growth of The Bank of Azad Jammu & Kashmir.',
                'experience' => [
                    'Executive Vice President and CFO at Bank of Azad Jammu & Kashmir',
                    'Divisional Head of Financial Control Division and Treasury (2014)',
                    'Manager Finance at Sehgal Group of Industries',
                    'Progressive career growth from OG-II since 2006',
                ],
                'achievements' => [
                    'Recently appointed as Acting President/CEO',
                    'Significantly increased bank profitability through strategic investments',
                    'Successfully managed treasury operations and fund management',
                    'Master\'s degree in Economics and MBA in Finance',
                    'Certified Islamic Fund Manager and Islamic Banking specialist',
                ],
                'image' => 'bod/president.png',
                'sort_order' => 2,
                'is_chairman' => false,
                'is_active' => true,
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Islam Zaib',
                'designation' => 'Secretary Finance Government of AJK, Director',
                'short_description' => 'Mr. Islam Zaib, currently posted as Secretary Finance Government of AJK, is a Federal Civil Servant from Pakistan Administrative Service (PAS).',
                'full_biography' => 'Mr. Islam Zaib, currently posted as Secretary Finance Government of AJK, is a Federal Civil Servant from Pakistan Administrative Service (PAS). He has over twenty-two years of work experience at different key positions in the Federal Government, the Provincial Government of Khyber Pakhtunkhwa (KP) and erstwhile FATA (Federally Administered Tribal Areas). His professional career includes both field and secretariat level positions in different public sector organizations. He has worked in areas of Immigration & Passport, Economic Affairs, Planning & Development, Public Financial Management (PFM), Law Enforcement, Governance including Local Governance, Public Policy and Service Delivery at National, Provincial and District levels. Having experience of working with different tiers of the Government, Mr. Zaib is well versed with the procedures at all levels of the Government and the Parliamentary Affairs. Mr. Islam Zaib is a fellow of Hubert H. Humphrey in Public Policy Analysis and Public Administration from University of Syracuse, New York State. He also holds a certificate of Advanced Studies in Public Administration from Maxwell School of Citizenship, University of Syracuse, New York State and MBA (Public Service) – International Department for Development (IDD) from University of Birmingham, United Kingdom.',
                'experience' => [
                    'Secretary Finance Government of AJK',
                    'Federal Civil Servant from Pakistan Administrative Service (PAS)',
                    'Over 22 years experience in Federal and Provincial Government',
                    'Worked in Immigration & Passport, Economic Affairs, Planning & Development',
                    'Experience in Public Financial Management and Law Enforcement',
                ],
                'achievements' => [
                    'Fellow of Hubert H. Humphrey in Public Policy Analysis - University of Syracuse',
                    'Certificate of Advanced Studies in Public Administration - Maxwell School',
                    'MBA (Public Service) from University of Birmingham, UK',
                    'Extensive experience in governance at National, Provincial and District levels',
                ],
                'image' => 'bod/mr islam zaib.png',
                'sort_order' => 3,
                'is_chairman' => false,
                'is_active' => true,
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Muhammad Sajjad',
                'designation' => 'Secretary Law Justice, Parliamentary Affairs & Human Rights Department',
                'short_description' => 'Mr. Muhammad Sajjad started his Career as Civil Judge in 2006 with a passion for fair and efficient dispute resolution.',
                'full_biography' => 'Mr. Muhammad Sajjad started his Career as Civil Judge in 2006 with a passion for fair and efficient dispute resolution, proficient for applying the law to uphold justice. In 2021, promoted to the esteemed position of District & Sessions Judge, unveil his experience and expertise in the Legal Domain. Mr. Muhammad Sajjad served in three Division of Azad Kashmir District Haveli, Kotli and Muzaffarabad. Due to his diverse legal capabilities he had honor to serve as Judge Ehtesab Court Mirpur in 2023, having powers of Banking Court. From March 2024 his services has been hired by the Government of AJ&K as Secretary Law, Justice, Parliamentary Affairs and Human Rights.',
                'experience' => [
                    'Secretary Law, Justice, Parliamentary Affairs & Human Rights (March 2024)',
                    'Judge Ehtesab Court Mirpur (2023) with Banking Court powers',
                    'District & Sessions Judge (2021)',
                    'Civil Judge (2006)',
                    'Served in Districts: Haveli, Kotli, and Muzaffarabad',
                ],
                'achievements' => [
                    'Promoted to District & Sessions Judge in 2021',
                    'Appointed as Judge Ehtesab Court with Banking Court powers',
                    'Diverse legal experience across three divisions of AJK',
                    'Expertise in fair and efficient dispute resolution',
                ],
                'image' => 'bod/Mr. Muhammad Sajjad.jpg',
                'sort_order' => 4,
                'is_chairman' => false,
                'is_active' => true,
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Khalid Mehmood Mirza',
                'designation' => 'Secretary Industries, Commerce, Labour Welfare',
                'short_description' => 'Mr. Khalid Mehmood Mirza, currently posted as Secretary Industries Government of AJK, is an officer from Secretariat Service Group AJK.',
                'full_biography' => 'Mr. Khalid Mehmood Mirza, currently posted as Secretary Industries Government of AJK, is an officer from Secretariat Service Group AJK, started his career as Section Officer in 1999. He has a vast working experience. He has worked in different departments such as Service & General Administration, Works and Communication, Energy & Water Resources and Mangla Dam Raising Project.Thereafter, has served as Special Secretary S&GAD, Health Department, Elementary and Secondary Education Department and Finance Department. Besides, he has also served as Director General Civil Defense. In 2022, he was elevated as Secretary to Government and has served in Higher Education Department, Planning and Development Department and Information Technology Department.',
                'experience' => [
                    'Secretary Industries, Commerce, Labour Welfare (Current)',
                    'Secretary in Higher Education, Planning & Development, IT Department (2022)',
                    'Director General Civil Defense',
                    'Special Secretary in various departments (2016)',
                    'Section Officer (1999)',
                ],
                'achievements' => [
                    'Promoted to BPS-20 in 2016',
                    'Elevated as Secretary to Government in 2022',
                    'Vast experience across multiple government departments',
                    'Worked on Mangla Dam Raising Project',
                ],
                'image' => 'bod/Mr. Khalid Mehmood Mirza.png',
                'sort_order' => 5,
                'is_chairman' => false,
                'is_active' => true,
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Mubashar Nabi',
                'designation' => 'Social Worker, Director',
                'short_description' => 'Mubashar Nabi is Founder President and Ex-CEO of ACT with 30 years of experience in poverty alleviation through community mobilization.',
                'full_biography' => 'Mubashar Nabi is Founder President and Ex-CEO of ACT. With a vast and diversified background of 30 years of experience and contributed to policy work and designed & piloted number of national programs & development initiatives across Pakistan & AJ&K. He has almost 30 years\' experience on his credit with exclusive thirteen years practical understanding of working with international and national organizations aiming at poverty alleviation through community mobilization. He specializes in the field of community mobilization with special perspective of forming institutions, linking them up with donor organizations and facilitating the BODs of these institutions to envision from the perspective of institutional development in their local perspective. Being an associate of MDF Holland, Mr. Nabi had contributed widely to strengthening national & regional level institutions through capacity building initiatives linked with microfinance and infrastructure development including TRDP, MRDP, SAFCOW, JWS, IRC, BRSP, KWO, WWOP, HRDN, etc. He had initiated, implemented and managed large projects funded by UNDP, WB, WFP, UNICEF, DIFD, USAID and Save the Children (US & UK). He was also part of the formation of Human Resource Development Network which sets a milestone in the history of capacity building endeavors in the country. His special interest revolves around Institutional Development & Organizational Strengthening, Leadership Management, Social mobilization, Capacity Building, Program Management and Innovate divergent programs in the field of poverty alleviation, microfinance, disaster preparedness, livelihood, social sector, reconstruction and social mobilization.',
                'experience' => [
                    'Founder President and Ex-CEO of ACT',
                    '30 years experience in poverty alleviation programs',
                    '13 years with international organizations',
                    'Associate of MDF Holland',
                    'Project management for UNDP, WB, WFP, UNICEF, USAID',
                ],
                'achievements' => [
                    'Founder of Human Resource Development Network (HRDN)',
'Led policy work and piloted national development programs across Pakistan & AJK',
'Strengthened institutions: TRDP, MRDP, SAFCOW, BRSP, KWO, WWOP',
'Specialist in community mobilization and poverty alleviation',
                ],
                'image' => 'bod/mubshar nabi.jpg',
                'sort_order' => 6,
                'is_chairman' => false,
                'is_active' => true,
            ],
            [
                'title' => 'Mr.',
                'full_name' => 'Zulfiqar Abbasi',
                'designation' => 'Laraib Group of Companies Director',
                'short_description' => 'Mr. Zulfiqar Abbasi is a private Director on the Board of Bank of Azad Jammu & Kashmir and former President of various Chambers of Commerce.',
                'full_biography' => 'Mr. Zulfiqar Abbasi, is a private Director on the Board of Bank of Azad Jammu & Kashmir. He holds Masters Degree in English Literature and also Alumni of the National Defense University (NDU), Islamabad (NS4W). Mr. Zulfiqar Abbasi is the former President of Jammu & Kashmir Joint Chamber of Commerce & Industry (a joint Chamber of Pakistani and Indian administrated Kashmir) and also Presided AJ&K, Chamber of Commerce and Industry, Mirpur. Mr. Abbasi also remained President of Center for Peace, Development and Reforms (CPRD), an AJ&K based think tank working on AJK Constitutional amendments and generated various publications on Youth affairs, Tourism in Kashmir, Environmental issues, Local Bodies elections, Electoral Reforms, Cross LOC Trade, Women status and host of other issues. Mr. Abbasi also served as Chief Executive of various companies set up and owned at Mirpur, A.K such as: Kohsar Hydro Power Pvt. Ltd (Pakistan\'s first private sector Hydro Power Project), Mangla Metals Pvt. Ltd (A steel Industry based on self generated hydropower), Kashmir Foods Pvt. Ltd (A food distribution and manufacturing industry). Mr. Zulfiqar Abbasi, also worked as Director at the Board of Directors of various State owned Institutions and Corporations including AJ&K Hydro Electric Board, AJ&K Technical and Vocational Training Authority (TEVTA), AJ&K Mineral and Industrial Development Corporation (AKMIDC), AJ&K Information Technology Board and AJ&K Small Industries Corporation.',
                'experience' => [
                    'Former President of J&K Joint Chamber of Commerce & Industry',
                    'President AJ&K Chamber of Commerce and Industry, Mirpur',
                    'President of Center for Peace, Development and Reforms (CPRD)',
                    'Chief Executive of Kohsar Hydro Power, Mangla Metals, Kashmir Foods',
                    'Director on various State institutions: TEVTA, AKMIDC, IT Board',
                ],
                'achievements' => [
                    'Masters in English Literature, Alumni of NDU Islamabad',
                    'Pakistan\'s first private sector Hydro Power Project',
                    'Publications on Youth affairs, Tourism, Environmental issues',
                    'Cross LOC Trade expertise and Constitutional amendments work',
                ],
                'image' => 'bod/zulfiqar_abbasi.jpg',
                'sort_order' => 7,
                'is_chairman' => false,
                'is_active' => false,
            ],
            [
                'title' => 'Ms.',
                'full_name' => 'Bushra Naz Malik',
                'designation' => 'Director',
                'short_description' => 'Ms. Bushra Naz Malik is a fellow member of the Institute of Chartered Accountants of Pakistan and CA/CPA from Ontario, Canada.',
                'full_biography' => 'Ms. Bushra Naz Malik is a fellow member of the Institute of Chartered Accountants of Pakistan and CA/CPA from Chartered Professional Accountants, Ontario, Canada. Ms. Malik is an MBA graduate of Kellogg Business School in the United States and the Schulich Business School, Canada. She also has an LLB degree from the Punjab College and Advanced Management Program certification from the Harvard Business School, Boston, USA. Currently, she is Chairperson of the Independent Audit Oversight Committee UNHCR, Geneva, Switzerland. She is also a Director of MHM Consulting, a management service provider firm. She is also a Member of Competition Commission of Pakistan which is a quasi-judicial institution for promoting competitiveness and fair trade in Pakistan. Between 2010 and 2013, she was a Director and Chairperson of the Audit Committee at the Lahore Stock Exchange Ltd in Pakistan. She also served as Group Finance Director and member of the Board of Directors of Kohinoor Maple Leaf Group, Lahore, a consortium of publicly listed firms headquartered in Pakistan, from 2007 to 2010. Ms. Malik was a member of the CGIAR System Management Board (SMB) in 2017-2018, chairing its Audit and Risk Committee, and a member of the Board of Directors of the Pakistan Industrial Development Corporation, also chairing its Audit Committee. She is committed to the cause of women and provides consultancy services to a local NGO dubbed \'All Mothers Educated Now\' based in Pakistan. In 2012 she served as a member of the Commonwealth Business Women, Pakistan Steering Group.',
                'experience' => [
                    'Chairperson, Independent Audit Oversight Committee UNHCR, Geneva',
                    'Director of MHM Consulting',
                    'Member of Competition Commission of Pakistan',
                    'Group Finance Director, Kohinoor Maple Leaf Group (2007-2010)',
                    'Director and Audit Committee Chair, Lahore Stock Exchange (2010-2013)',
                ],
                'achievements' => [
                    'Fellow ICAP and CA/CPA from Ontario, Canada',
                    'MBA from Kellogg Business School and Schulich Business School',
                    'LLB and Harvard Business School Advanced Management Program',
                    'CGIAR System Management Board member (2017-2018)',
                    'Commonwealth Business Women Pakistan Steering Group (2012)',
                ],
                'image' => 'bod/bushra naz.png',
                'sort_order' => 8,
                'is_chairman' => false,
                'is_active' => true,
            ],
 [
                'title' => '',
                'full_name' => 'Dr. Adnan U. Khan',
                'designation' => 'Company Secretary',
                'short_description' => 'Dr. Adnan U. Khan is Company Secretary of the Bank with experience at SBP and a PhD in Finance, specializing in corporate governance and financial markets.',
                'full_biography' => 'Dr. Adnan U. Khan has joined the Bank as Company Secretary, bringing with him experience from the State Bank of Pakistan, where he managed corporate and secretarial affairs of its subsidiary, Pakistan Security Printing Corporation. Dr. Adnan U. Khan, who holds a PhD in Finance with numerous publications in leading finance and corporate governance journals, is also an Associate Member of the Institute of Corporate Secretaries of Pakistan. In addition to his academic achievements, Dr. Khan has completed several certifications from prestigious institutions, such as a certification in Financial Markets from Yale University, USA, and a certification in Investment Banking from the University of Illinois Urbana-Champaign, USA.',
                'experience' => [
                    'Company Secretary, Bank of Azad Jammu & Kashmir',
                    'Manager Corporate & Secretarial Affairs, Pakistan Security Printing Corporation (a subsidiary of State Bank of Pakistan)',
                    'Associate Member, Institute of Corporate Secretaries of Pakistan',
                    'Academic and research background in finance and corporate governance',
                   'Completed certifications in Financial Markets and Investment Banking from top U.S. universities',
                ],
                'achievements' => [
                    'Awarded a PhD in Finance, with research published in internationally acclaimed journals on finance and corporate governance',
                    'Completed prestigious executive certifications in Financial Markets (Yale University, USA) and Investment Banking (University of Illinois Urbana-Champaign, USA), demonstrating global proficiency in financial and investment disciplines',
                    'Appointed as Company Secretary of the Bank of Azad Jammu & Kashmir, reflecting institutional confidence in his leadership and governance expertise',
                    'Played a key role in strengthening governance and compliance frameworks at the Pakistan Security Printing Corporation, a subsidiary of the State Bank of Pakistan',
                ],
                   'image' => 'bod/company.png',
                'sort_order' => 9,
                'is_chairman' => false,
                'is_active' => true,
            ],



        ];

        foreach ($boardMembers as $member) {
            BoardOfDirector::create($member);
        }

        // foreach ($boardMembers as $member) {
        //     BoardOfDirector::create([
        //         ...array_merge($member, [
        //             'experience' => json_encode($member['experience']),
        //             'achievements' => json_encode($member['achievements']),
        //         ]),
        //     ]);
        // }
    }
}
