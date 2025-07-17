<?php

namespace Database\Seeders;

use App\Models\ProductScheme;
use App\Models\ProductSchemeAttribute;
use App\Models\ProductTypeAccount;
use Illuminate\Database\Seeder;

class ProductSchemeAttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->seedConsumerFinanceSchemes();
        $this->seedCommercialSMESchemes();
        $this->seedAgricultureSchemes();
        $this->seedMicroFinanceSchemes();
        $this->seedDepositAccountSchemes();
        $this->seedTermDepositSchemes();
    }

    private function seedConsumerFinanceSchemes()
    {
        $consumerFinances = ProductTypeAccount::where('name', 'Consumer Finances')->first();

        // Advance Salary Scheme
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Advance Salary Scheme',
            'description' => 'Hassle free finance against your salary for urgent domestic needs',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', "Don't worry about your urgent Domestic/personal/family needs like education of kids, marriage of children and medical requirements. BAJK provides you a hassle free finance against your salary.", 1],
            ['Eligibility', 'Permanent employees of Government/semi Government Departments Autonomous Corporation with at least 01 year service.', 2],
            ['Age limit', '18-60 years', 3],
            ['Loan Limit', 'Maximum up to Rs. 30,00,000', 4],
            ['Tenure', 'Maximum 48 months (The loan should end six months prior to date of retirement).', 5],
            ['Repayment', 'Monthly Installments', 6],
            ['DSR', '40%', 7],
            ['Primary Security', 'Hypothecation of House Hold Items up to loan amount.', 8],
            ['Secondary Security', '• 01 Personal Guarantee of Government Officer of BPS-11 or above. Guarantor should be in equivalent or above grade of the borrower but not less than Grade 11.\n\n• 06 Postdated Cheques.', 9],
            ['Insurance', 'Life Insurance of the borrower.', 10],
        ]);

        // Car Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Car Finance',
            'description' => 'Finance for purchasing new or used vehicles',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'Enjoy a comfortable traveling with your family. Facilitate pick and drop of your kids. BAJK offers purchase of brand new cars for domestic and personal use.', 1],
            ['Eligibility', '• Must be AJK/Pakistani National.\n• Permanent Employee of Government/Semi Government Departments and Autonomous Corporations with at least 03 years of service.\n• Professional/Self Employed/Businessmen having established business for last three years.', 2],
            ['Age limit', '18-60 years', 3],
            ['Loan Limit', 'Maximum up Rs 3.0 million', 4],
            ['Tenure', 'Up to 60 months.', 5],
            ['Repayment', 'Monthly Installments', 6],
            ['DSR', '40% (including insurance premium)', 7],
            ['Down Payment/Equity', 'Minimum 30%', 8],
            ['Primary Security', 'Joint Registration of the vehicle in the name of BAJK & borrower under HPA.', 9],
            ['Secondary Security', '• 01 Personal Guarantee of Government Officer Grade-17 and above\nOR\n• Postdated Cheques equivalent to the number of Installments.', 10],
            ['Insurance', 'Comprehensive Insurance of the vehicle.', 11],
        ]);

        // Motorcycle Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Motorcycle Finance',
            'description' => 'Finance for purchasing motorcycles',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'For quick fulfillment of family needs with economical mode of traveling. Easy and quick approach to your destination. Purchase of Motorcycle for domestic and personal use on affordable monthly installments.', 1],
            ['Eligibility', '• AJK/Pakistani National residing in AJK.\n• Permanent Employees of Government/Semi Government and Autonomous Corporations with at least 03 years of service.\n• Account Holder of BAJK.\n• Professionals/Self-employed/Businessmen having 03 months statement of A/c with BAJK or any other bank.', 2],
            ['Age limit', '18-60 Years', 3],
            ['Loan Limit', 'As per actual cost of Motor Cycle', 4],
            ['Tenure', 'Maximum up to 36 months.', 5],
            ['Repayment', 'Monthly Installments', 6],
            ['DSR', '30%', 7],
            ['Down Payment/Equity', 'Minimum 20%', 8],
            ['Primary Security', 'Joint Registration of vehicle in the name of BAJK & borrower under HPA.', 9],
            ['Secondary Security', 'Postdated Cheques\n01 Personal Guarantee of Government Officer of BPS-11 or above OR 01 Personal Guarantee of a well worth businessman.', 10],
            ['Insurance', 'Comprehensive Insurance of Motorcycle.', 11],
        ]);

        // House Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'House Loan',
            'description' => 'Finance for construction or purchase of residential property',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'BAJK offers loan facility for Construction/Renovation/Purchase of residential house/apartments in AJK at reasonable/affordable easy terms', 1],
            ['Eligibility', '• All Kashmiris / Pakistani having valid CNIC\n• All salaried employee of AJK Government, semi Government, Autonomous bodies National/Multinational Companies (Blue Chip)\n• Business and self-employed professionals of AJK domicile\n• Co-applicant allowed for blood relation husband/wife, father/son', 2],
            ['Length of service', 'Length of service Salaried; minimum 03 years in Permanent Cadre\nBusiness/Self-Employed; at least 03 years in current Business/Profession', 3],
            ['Minimum income/Debt Burden', '• For Salaried Person: Minimum Rs. 30,000/- monthly take home salary (At-least double of monthly installment)\n• For Business/Self-Employed: Average monthly income should be 03 times of monthly installment.', 4],
            ['Age limit', 'For Salaried Person: – 18-60 Years (the loan be matured 06 months before retirement)\nFor Businessmen: – 18-60 Years', 5],
            ['Loan Limit', 'Upto Rs. 10 Million', 6],
            ['Tenure', 'Upto 20 year', 7],
            ['DER', 'Debt Equity Ratio 60:40', 8],
            ['Repayment', 'Monthly Installments', 9],
            ['Insurance', 'Life and mortgaged Property as per Bank\'s policy', 10],
            ['Security', 'Mortgage of land and building thereon', 11],
            ['Premature payment', 'Premature adjustment allowed', 12],
            ['Partial Prepayment', 'Allowed after 01 year of disbursement', 13],
        ]);

        // Personal Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Personal Loan',
            'description' => 'Finance for urgent domestic and personal needs',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'To facilitate your urgent domestic and personal needs, BAJK makes it possible by providing financial facility in shape of Personal Loan so that you could easily take care of your children\'s education, marriages, house renovation etc. Just avail this facility and enjoy tension -free life.', 1],
            ['Eligibility', 'AJK /Pakistani National', 2],
            ['Loan Limit', '95% against BAJK TDRs & Deposits and Government Securities.
                            90% against Third-Party Deposits/TDRs.', 3],
            ['Tenure', 'Maximum 36 months', 4],
            ['Repayment', 'Lump Sum /Installments', 5],
            ['Primary Security', 'Hypothecation of House Hold Items (in case of 3rd party security)', 6],
            ['Secondary Security', 'Pledge/Lien on the respective securities.', 7],
            ['Insurance', 'Life insurance of Borrower (Optional)', 8],
        ]);

        // Student Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Student Loan',
            'description' => 'Finance for higher studies abroad',
            'is_active' => false,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'Can you send your child for study abroad? Yes, BAJK is there to offer study loan for Higher Studies abroad on very fast mode', 1],
            ['Eligibility', 'AJK /Pakistani National', 2],
            ['Loan Limit', 'Maximum Rs. 10,000,000 or 95% (Ist party) and 90% (3rd party) against Bank\'s own deposits, whichever is lower Maximum Rs. 10,000,000 or 90% against Govt. Securities/ Deposits of other Banks (Ist/3rd parties), whichever is lower', 3],
            ['Tenure', 'Maximum 24 months', 4],
            ['Repayment', 'Lump Sum /Installments', 5],
            ['Primary Security', 'Lien of Deposits', 6],
            ['Insurance', 'Life Insurance of Borrower', 7],
            ['Margin', 'As per above loan limit', 8],
        ]);

        // Gold Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Gold Loan',
            'description' => 'Finance against gold ornaments',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'Save Gold- spend money. Keep your gold in safe hands and enjoy consumption of money there against for your urgent needs on lowest rates.', 1],
            ['Eligibility', 'Eligibility All account holders of BAJK.', 2],
            ['Age limit', 'N/A', 3],
            ['Loan Limit', 'Rs 2.0 Million', 4],
            ['Tenure', '1 year: Lump sum adjustment.
            2 years: Equal Monthly Installments (EMI).', 5],
            ['Repayment', '2 years through Equal Monthly Installments.', 6],
            ['Insurance', 'For full market value of Gold Ornaments.', 7],
            ['Margin', '20%', 8],
        ]);

        // Home Appliances Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Home Appliances Finance',
            'description' => 'Finance for purchasing electronic appliances',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'Purchase of modern electronic appliances/gadgets of your choice and provide comfort to your life.', 1],
            ['Eligibility', '• Employee of Government/Semi Government and Autonomous Corporations and Government Organizations.\n• Employees of all Banks/DFIs including BAJK.\n• BAJK Account Holder.', 2],
            ['Loan Limit', 'Loan Limit Maximum up to Rs. 200,000/-', 3],
            ['Tenure', 'Upto 36 Months.', 4],
            ['Repayment', 'Repayment Monthly Installments.', 5],
            ['Down Payment/Equity', 'Minimum 20%', 6],
            ['Primary Security', 'Hypothecation of purchased goods.', 7],
            ['Secondary Security', '• 01 PG of Government Officer BPS-11 or above and for Bank Employees, a Personal Guarantee of Bank Employee.\n• Cheques for the predetermined Installments.', 8],
            ['Insurance', 'Insurance of Purchased goods.', 9],
        ]);
  
            // Pension Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $consumerFinances->id,
            'name' => 'Pension Loan',
            'description' => '',
            'is_active' => true,
        ]);

        // $this->createAttributes($scheme->id, [
        //     ['Purpose', 'Purchase of modern electronic appliances/gadgets of your choice and provide comfort to your life.', 1],
        //     ['Eligibility', '• Employee of Government/Semi Government and Autonomous Corporations and Government Organizations.\n• Employees of all Banks/DFIs including BAJK.\n• BAJK Account Holder.', 2],
        //     ['Loan Limit', 'Loan Limit Maximum up to Rs. 200,000/-', 3],
        //     ['Tenure', 'Upto 36 Months.', 4],
        //     ['Repayment', 'Repayment Monthly Installments.', 5],
        //     ['Down Payment/Equity', 'Minimum 20%', 6],
        //     ['Primary Security', 'Hypothecation of purchased goods.', 7],
        //     ['Secondary Security', '• 01 PG of Government Officer BPS-11 or above and for Bank Employees, a Personal Guarantee of Bank Employee.\n• Cheques for the predetermined Installments.', 8],
        //     ['Insurance', 'Insurance of Purchased goods.', 9],
        // ]);
    }

    private function seedCommercialSMESchemes()
    {
        $commercialSME = ProductTypeAccount::where('name', 'Commercial / SME Finances')->first();

        // Running Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $commercialSME->id,
            'name' => 'Running Finance',
            'description' => 'Working capital for business operations',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'Purchase of stock and fulfilling of operational expenses of your business. Financial limits are available for your existing business/planned expansion.', 1],
            ['Eligibility', '• Account holder of the bank.\n• Reasonable turnover to justify the limit requested.\n• Existing business/planed expansion.', 2],
            ['Loan Limit', 'According to business worth subject to per party exposure as per SBP Prudential Regulations.', 3],
            ['Tenure', 'Maximum 12 months (Renewable on Satisfactory repayment status).', 4],
            ['Repayment', 'Principal lump sum and markup monthly/quarterly basis.', 5],
            ['Primary Security', 'Hypothecation of Stock.', 6],
            ['Secondary Security', 'Mortgage of property or lien on Deposits or pledge of Gold.', 7],
            ['Insurance', 'Insurance cover of Hypothecated Stock and mortgaged property as per Bank\'s policy.', 8],
        ]);

        // Auto Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $commercialSME->id,
            'name' => 'Auto Finance',
            'description' => 'Commercial vehicle financing',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'BAJK offers Auto-Finance Commercial which allows its customers to fulfill their business and commercial Vehicle / Transportation needs.', 1],
            ['Eligibility', 'All businessmen, Companies, Government Institution, Autonomous Corporations of AJK.', 2],
            ['Tenure', 'Maximum 5 years', 3],
            ['Repayment', 'Monthly Installments', 4],
            ['Primary Security', 'Joint Registration of the vehicle in the name of BAJK & borrower under HPA', 5],
            ['Secondary Security', 'As per Bank Policy', 6],
            ['Insurance', 'Comprehensive Insurance of Vehicle.', 7],
        ]);

        // Demand Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $commercialSME->id,
            'name' => 'Demand Finance',
            'description' => 'Finance for machinery and equipment purchase',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'For purchase of Machinery/Equipment/Assets for your existing business/planned expansion. Choose BAJK as your business partner and enjoy financial support at easy terms and conditions.', 1],
            ['Eligibility', '• Account holder of the bank.\n• Reasonable turnover to justify the limit requested.\n• Existing business/planned expansion.', 2],
            ['Loan Limit', 'According to business worth and equity ratio subject to per party exposure as per SBP Prudential Regulations.', 3],
            ['Tenure', 'Maximum 5 years', 4],
            ['Repayment', 'Monthly Installments', 5],
            // ['DSR', 'Debt Security Ratio = 60:40', 6],
            ['Primary Security', 'Hypothecation of stock/machinery and equipment.', 7],
            ['Secondary Security', 'Mortgage of property or lien on Deposits or pledge of Gold.', 8],
            ['Insurance', 'Insurance cover of stock and mortgaged property, as per Bank\'s policy', 9],
        ]);

        // House Finance Commercial
        $scheme = ProductScheme::create([
            'product_type_account_id' => $commercialSME->id,
            'name' => 'House Finance Commercial',
            'description' => 'Finance for commercial construction projects',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'BAJK offers loan facility for construction/renovation/purchase of commercial buildings/plazas/shops etc. on easy terms.', 1],
            ['Eligibility', '• Account holder of the bank.\n• Reasonable income/equity proof to justify the limit requested.\n• Approved Commercial building plan.', 2],
            ['Loan Limit', 'Correlates with the total cost of the project and equity contribution of the client.', 3],
            ['Tenure', 'Maximum up to 05 years.', 4],
            ['Repayment', 'Monthly Installments', 5],
            ['Debt Security Ratio', '60:40', 6],
            ['Security', 'Mortgage of Land and superstructure of the project or lien on Deposits or Pledge of Gold.', 7],
            ['Insurance', 'Insurance of property as per Bank\'s Policy.', 8],
        ]);

        // Tourism Promotion Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $commercialSME->id,
            'name' => 'Tourism Promotion Finance',
            'description' => 'Finance for tourism infrastructure development',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'Purpose of this loan scheme is to finance the infrastructure facilities to promote/facilitate tourists activities and movements in tourist attractions in AJK. The tourists infrastructural facilities include establishment of tourist Huts, refurbishment/renovation of existing guest houses, erecting additional accommodation within existing residential houses of the locals in AJK.', 1],
            ['Eligibility', '• House should be suitably located having a motor able approach.\n• Permission of concerned Government organization for conversion/ Renovation /Refurbishment of House into Hotel/Guest House.\n• Hotel/Guest House should be preferably managed by the owner himself.', 2],
            ['Loan Limit', '• Up to Rs. 5.0 Millions', 3],
            ['Tenure', 'Maximum up to 05 years', 4],
            ['Repayment', '  Monthly installments with a grace period of up to 3 months.
            Grace period is applicable only in construction-related cases.', 5],
            ['Equity Contribution', '20%', 6],
            ['Primary Security', 'Hypothecation of all Moveable Assets', 7],
            ['Secondary Security', 'Mortgage of property or lien on Deposits or pledge of Gold', 8],
            ['Insurance', 'As per Bank\'s Policy', 9],
        ]);

        // Small Business Trade Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $commercialSME->id,
            'name' => 'Small Business Trade Finance',
            'description' => 'Working capital for small traders',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'To ensure easy access of businessmen/trader\'s community for their working capital requirement on soft terms.', 1],
            ['Eligibility', '• The minimum age of the business should two years.\n• Applicant must be Account holder of BAJK.\n• Applicant must be resident of AJK with business within the area of respective branch in the main city/business hub of respective district.\n• Applicant should not be defaulter of any financial intuition/Bank.', 2],
            ['Loan Limit', 'Maximum loan amount up to Rs. 500,000/-', 3],
            ['Tenure', 'As Running Finance (RF): 12 months.
                        As Demand Finance (DF): 36 months.', 4],
            ['Repayment', 'RF: Lump sum adjustment on or before expiry; markup payable quarterly.
                           DF: Equal Monthly Installments.', 5],
            ['Primary Security', 'Hypothecation of Stock.', 6],
            ['Secondary Security', 'Two personal Guarantees of\ni. Govt officials of BPS-09 or above\nii. Businessmen maintaining running account with BAJK or any other bank having annual average balance of the amount equivalent to the loan amount requeste.\niii. Any other security acceptable by the bank.', 7],
            [' Guarantee', 'One government employee of BPS-11 or above.
                            One businessman maintaining a satisfactory average monthly balance.',8],
            ['Insurance', 'Stock: Mandatory.
                           Life: Optional.', 9],
        ]);

        // Health Care Services Finance
        $scheme = ProductScheme::create([
            'product_type_account_id' => $commercialSME->id,
            'name' => 'Health Care Services Finance',
            'description' => 'Finance for medical facilities setup',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'BAJK offers financial facility to setup/expansion/renovation/modernization of medical/health facilities in AJK.', 1],
            ['Eligibility', 'All Qualified registered medical practitioners registered with PMDC with minimum 03 years of experience in Pakistan/AJK.', 2],
            ['Loan Limit', 'For Rural Areas:\n• Up to Rs. 5.00 Million for purchase of equipment (DF).\n• Up to Rs. 1.00 Million for working capital requirement (RF).\nFor Urban Areas:\n• Up to Rs. 10.00 Million for purchase of equipment (DF).\n• Up to Rs. 2.00 Million for working capital requirement (RF).', 3],
            ['Tenure', '• 01 year on rollover bases for RF limit.\n• 05 years for DF limit.', 4],
            ['Borrower\'s Equity', 'For DF – 25% of required amount.', 5],
            // ['DSR', '50%', 6],
            ['Primary Security', 'Hypothecation of existing or to be purchased stock with 25% margin.', 7],
            ['Secondary Security', 'Mortgage of Land and superstructure of the project or lien on Deposits or Pledge of Gold.', 8],
            ['Insurance', 'Insurance of all Movable/Immovable Assets Building/Machinery/Equipment and other stock as per Bank Policy', 9],
        ]);
    }

    private function seedAgricultureSchemes()
    {
        $agriculture = ProductTypeAccount::where('name', 'Agriculture Finances')->first();

        // Agriculture Production Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $agriculture->id,
            'name' => 'Agriculture Production Loan',
            'description' => 'Short term loans for agricultural inputs',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'For provision of Agri inputs and working capital i.e. short term loans for purchase of seeds, pesticides, fertilizers, etc. to boost agriculture growth and employment generation in the State of AJK', 1],
            ['Eligibility', 'Progressive and willing farmers in the category of individuals, joint ventures, and group initiatives can avail facility in the area of crops, vegetables, orchards, fruit gardening, etc and allied production activities. Those farmers having own or leased land for farming/agricultural activities in the jurisdiction of AJK', 2],
            ['Age limit', '18-60 years', 3],
            ['Loan Limit', 'Upto Rs. 200,000/-', 4],
            ['Tenure', 'One year', 5],
            ['Repayment', 'Lump sum/borrowers discretion', 6],
            ['Primary Security', 'Hypothecation of stock', 7],
            ['Secondary Security', 'One P.G of BPS-11 or above or Lien of Deposits or Pledge of Gold', 8],
            ['Insurance', 'As per Bank\'s policy', 9],
            ['Margin', 'Not required', 10],
        ]);

        // Agriculture Development Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $agriculture->id,
            'name' => 'Agriculture Development Loan',
            'description' => 'Long term loans for agricultural assets',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'For purchase of assets (farm equipment/machinery), dairy, poultry, goat-sheep and fish farms development as well as other agricultural development activities', 1],
            ['Eligibility', 'Progressive and willing farmers in the category of individuals, joint ventures and group initiatives having own or leased land for farming/agricultural activities in the jurisdiction of AJK', 2],
            ['Age limit', '18-60 years', 3],
            ['Loan Limit', 'Maximum Rs. 1,000,000/-', 4],
            ['Tenure', 'Upto 5 years', 5],
            ['Repayment', 'Monthly/Quarterly/Half Yearly Installments', 6],
            ['Down Payment/Equity', '20% in case of Machinery / Tractor', 7],
            ['Primary Security', 'Hypothecation of stock', 8],
            ['Secondary Security', 'Upto Rs. 200,000/- 01 PG of BPS-11 or above\nAbove Rs. 200,000/-\nMortgage of property / Lien on deposits / Anyother liquid security', 9],
            ['Insurance', 'As per Bank\'s policy', 10],
        ]);
    }

    private function seedMicroFinanceSchemes()
    {
        $microFinance = ProductTypeAccount::where('name', 'Micro Finances')->first();

        // Micro Enterprise Loan
        $scheme = ProductScheme::create([
            'product_type_account_id' => $microFinance->id,
            'name' => 'Micro Enterprise Loan',
            'description' => 'Small scale enterprise financing',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'To encourage small scale enterprises, create self-employment opportunities, generate economic activities and reduce poverty', 1],
            ['Eligibility', 'AJK Nationals, especially low income groups and skilled persons', 2],
            ['Age limit', '18-60 Years', 3],
            ['Loan Limit', 'Maximum Rs. 100,000/-', 4],
            ['Tenure', 'Maximum 36 months', 5],
            ['Repayment', 'Monthly Installments', 6],
            ['Security', 'One PG of BPS-11 or above, Lien on Deposit or Gold', 7],
            ['Insurance', 'As per Bank\'s Policy', 8],
            ['Margin on Stock', '10% to 25%', 9],
        ]);

        // Desi Murghbani Scheme
        $scheme = ProductScheme::create([
            'product_type_account_id' => $microFinance->id,
            'name' => 'Desi Murghbani Scheme',
            'description' => 'Poultry farming scheme for women',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Purpose', 'Promotion of Desi Murghbani/Poultry by establishing small units of minimum 10 poultry birds at cottage level (for economic empowerment of rural women). The production units will comprise of grown up Desi layer stock purchased from local suppliers/villagers Promoting organic chicken and eggs production, creating self-employment, generating income activities, reducing poverty and growing production', 1],
            ['Eligibility', 'AJK Nationals, Only Women', 2],
            ['Age limit', '18-60 years', 3],
            ['Loan Limit', 'Rs. 15,000/- to Rs. 50,000/- per production unit', 4],
            ['Tenure', 'Maximum 18 months', 5],
            ['Repayment', 'Half yearly equal installments', 6],
            ['Security', 'One PG of BPS-11 or above, Lien on Deposit or Gold', 7],
            ['Insurance', 'As per Bank\'s Policy', 8],
        ]);
    }

    private function seedDepositAccountSchemes()
    {
        $depositAccounts = ProductTypeAccount::where('name', 'Deposit Accounts')->first();

        // Current Account
        $scheme = ProductScheme::create([
            'product_type_account_id' => $depositAccounts->id,
            'name' => 'Current Account',
            'description' => 'Non-profit bearing checking account',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Eligibility', 'Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, Non listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies', 1],
            ['Feature 1', 'Chequing account', 2],
            ['Feature 2', 'Can be opened singly in one name or jointly in two or more names', 3],
            ['Feature 3', 'Initial/ Minimum deposit requirement is Rs. 1000/-', 4],
            ['Feature 4', 'No withdrawal Limit', 5],
            ['Feature 5', 'No Zakat deduction', 6],
            ['Feature 6', 'Free Cheque Book and other Services as per applicable schedule of charges for account holders having average balance of Rs. 25,000/- and above', 7],
            ['Feature 7', 'Free of Charge Locker facility for account holders having average balance of Rs. 50,000/- and above', 8],
        ]);

        // PLS Savings Account
        $scheme = ProductScheme::create([
            'product_type_account_id' => $depositAccounts->id,
            'name' => 'PLS Savings Account',
            'description' => 'Profit bearing savings account',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Eligibility', 'Individuals, singly or jointly can open their savings accounts. Business/Government entities can open savings accounts for placing funds of provident and benevolent nature.', 1],
            ['Feature 1', 'Profit earning chequing account', 2],
            ['Feature 2', 'Initial deposit/ minimum balance requirement of Rs. 500/-', 3],
            ['Feature 3', 'Accounts can be opened singly in one name or jointly in two or more names', 4],
            ['Feature 4', 'Free Cheque Book and other Services as per applicable schedule of charges for account holders having average balance of Rs. 100,000/- and above', 5],
            ['Feature 5', 'No Limit on withdrawals', 6],
            ['Feature 6', 'Half yearly profit payment', 7],
            ['Feature 7', 'Zakat applicable as per law', 8],
        ]);

        // Special Deposit Account
        $scheme = ProductScheme::create([
            'product_type_account_id' => $depositAccounts->id,
            'name' => 'Special Deposit Account',
            'description' => 'Business oriented deposit account',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Eligibility', 'Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, Non-listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies', 1],
            ['Feature 1', 'Suitable for business', 2],
            ['Feature 2', 'Profit payment on half yearly basis on daily product basis', 3],
            ['Feature 3', 'Profit accrues on daily product basis', 4],
            ['Feature 4', 'No restriction on withdrawals', 5],
            ['Feature 5', 'Daily Balance of Rs. 50,000/- required for profit eligibility', 6],
            ['Feature 6', 'Free services as per applicable schedule of charges for all the customers having average balance of Rs.100,000/- or above', 7],
        ]);

        // Bemisal Mahana Bachat Account (BMBA)
        $scheme = ProductScheme::create([
            'product_type_account_id' => $depositAccounts->id,
            'name' => 'Bemisal Mahana Bachat Account (BMBA)',
            'description' => 'Monthly profit savings account',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Eligibility', 'Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, Non-listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies', 1],
            ['Feature 1', 'Minimum Deposit Limit for profit is Rs. 25,000/-, however, the account can be opened with Rs. 1,000/-', 2],
            ['Feature 2', 'Maximum Two withdrawals allowed between 6th and last day of month for profit qualification. No restriction on number of withdrawals before 6th of the month', 3],
            ['Feature 3', 'Profit payment on monthly basis', 4],
            ['Feature 4', 'Free locker facility for customers having average balance of Rs. 50,000/-', 5],
            ['Feature 5', 'Up to 95% quick financing facility available on low markup', 6],
        ]);

        // Premium Plus Remittance Saving Account (PPRSA)
        $scheme = ProductScheme::create([
            'product_type_account_id' => $depositAccounts->id,
            'name' => 'Premium Plus Remittance Saving Account (PPRSA)',
            'description' => 'Special savings account for remittance receivers',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Eligibility 1', 'Any individual customer who sends/receives the foreign remittances through Money Gram, IME (International Money Exchange), IC (Instant Cash), Western Union, Ria can open single/joint account under this scheme', 1],
            ['Eligibility 2', 'Remittances received under the above channels with documentary proof would be eligible for opening the account under the product', 2],
            ['Eligibility 3', 'Print out of Remittances extracted at the time of payment will be kept with the Credit Voucher as evidence of Home Remittances', 3],
            ['Eligibility 4', 'NO OTHER DEPOSIT will be accepted in the account except the remittance amount received through the aforementioned modes of Home Remittances', 4],
            ['Feature 1', 'Extra profit @1% over and above the prevailing saving profit rate will be paid on Premium Plus Remittance Saving Account', 5],
            ['Feature 2', 'Deposits received under the above sources of remittance will only be eligible for extra profit', 6],
            ['Feature 3', 'Profit will be paid on monthly basis resulting in enhanced annualized rate as well', 7],
            ['Feature 4', 'Cheque book will be provided free of charge to all accounts opened under the product', 8],
            ['Feature 5', 'Minimum Deposit required for retention under this scheme will be Rs. 1,000/', 9],
            ['Feature 6', 'Zakat & Withholding Tax to be recovered as per rules', 10],
        ]);
    }

    private function seedTermDepositSchemes()
    {
        $termDeposit = ProductTypeAccount::where('name', 'Term Deposit')->first();

        // Bemisal Term Deposit
        $scheme = ProductScheme::create([
            'product_type_account_id' => $termDeposit->id,
            'name' => 'Bemisal Term Deposit',
            'description' => 'Fixed term deposit with quarterly profit',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Eligibility', 'Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, Non-listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies', 1],
            ['Feature 1', 'Customer has to open linked account (Current/ PLS/ BMBA/ SDA) for payment of profit', 2],
            ['Feature 2', 'Minimum deposit requirement Rs. 100,000/- for Individuals & Rs.1,000,000/- for Corporate Customers', 3],
            ['Feature 3', 'Profit payment on quarterly basis', 4],
            ['Feature 4', 'Short term financing facility available on nominal rate of markup', 5],
            ['Feature 5', 'Deduction of Zakat and Withholding tax applicable as per law', 6],
        ]);

        // PLS Term Deposit
        $scheme = ProductScheme::create([
            'product_type_account_id' => $termDeposit->id,
            'name' => 'PLS Term Deposit',
            'description' => 'Profit and Loss Sharing term deposit',
            'is_active' => true,
        ]);

        $this->createAttributes($scheme->id, [
            ['Eligibility', 'Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, non-listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies', 1],
            ['Feature 1', 'Tenure 03 Months to 05 Years', 2],
            ['Feature 2', 'Zakat applicable as per rules', 3],
            ['Feature 3', 'Profit payment on maturity', 4],
            ['Feature 4', 'Compatible rates of profit', 5],
            ['Feature 5', 'Upto 95% quick financing facility available on low markup', 6],
        ]);
    }

    private function createAttributes($schemeId, $attributes)
    {
        foreach ($attributes as $attr) {
            ProductSchemeAttribute::create([
                'product_scheme_id' => $schemeId,
                'attribute_name' => $attr[0],
                'attribute_value' => $attr[1],
                'attribute_type' => 'text',
                'sort_order' => $attr[2],
                'is_active' => true,
            ]);
        }
    }
}
