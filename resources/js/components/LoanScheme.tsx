import { useState } from 'react';
import {
    CreditCard,
    Car,
    Bike,
    Home,
    User,
    GraduationCap,
    Coins,
    Monitor
} from 'lucide-react';

interface LoanSchemeData {
    purpose: string;
    eligibility: string;
    ageLimit?: string;
    loanLimit: string;
    tenure: string;
    repayment: string;
    dsr?: string;
    downPayment?: string;
    primarySecurity?: string;
    secondarySecurity?: string;
    insurance?: string;
    margin?: string;
    lengthOfService?: string;
    minimumIncome?: string;
    security?: string;
    prematurePayment?: string;
    partialAdjustment?: string;
}

interface LoanScheme {
    id: string;
    title: string;
    icon: JSX.Element;
    color: string;
    data: LoanSchemeData;
}

interface LoanSchemesProps {
    loanSchemes?: LoanScheme[];
    defaultActiveIndex?: number;
}

const LoanSchemes: React.FC<LoanSchemesProps> = ({
    loanSchemes,
    defaultActiveIndex = 0
}) => {
    const [activeTab, setActiveTab] = useState(defaultActiveIndex);

    // Original loan schemes data from the document
    const defaultLoanSchemes: LoanScheme[] = [
        {
            id: 'advance-salary',
            title: 'Advance Salary Scheme',
            icon: <CreditCard className="w-6 h-6" />,
            color: 'from-[#4A7C59] to-[#5D8A6A]',
            data: {
                purpose: "Don't worry about your urgent Domestic/personal/family needs like education of kids, marriage of children and medical requirements. BAJK provides you a hassle free finance against your salary.",
                eligibility: "Permanent employees of Government/semi Government Departments Autonomous Corporation with at least 01 year service.",
                ageLimit: "18-60 years",
                loanLimit: "Maximum up to Rs. 30,00,000",
                tenure: "Maximum 48 months (The loan should end six months prior to date of retirement).",
                repayment: "Monthly Installments",
                dsr: "40%",
                primarySecurity: "Hypothecation of House Hold Items up to loan amount.",
                secondarySecurity: "• 01 Personal Guarantee of Government Officer of BPS-11 or above. Guarantor should be in equivalent or above grade of the borrower but not less than Grade 11. • 06 Postdated Cheques.",
                insurance: "Life Insurance of the borrower."
            }
        },
        {
            id: 'car-finance',
            title: 'Car Finance',
            icon: <Car className="w-6 h-6" />,
            color: 'from-[#F9B912] to-[#F9B912]/80',
            data: {
                purpose: "Enjoy a comfortable traveling with your family. Facilitate pick and drop of your kids. BAJK offers purchase of brand new cars for domestic and personal use.",
                eligibility: "• Must be AJK/Pakistani National. • Permanent Employee of Government/Semi Government Departments and Autonomous Corporations with at least 03 years of service. • Professional/Self Employed/Businessmen having established business for last three years.",
                ageLimit: "18-60 years",
                loanLimit: "Maximum up Rs 3.0 million",
                tenure: "Up to 60 months",
                repayment: "Monthly Installments",
                dsr: "40% (including insurance premium)",
                downPayment: "Minimum 30%",
                primarySecurity: "Joint Registration of the vehicle in the name of BAJK & borrower under HPA.",
                secondarySecurity: "• 01 Personal Guarantee of Government Officer Grade-17 and above OR • Postdated Cheques equivalent to the number of Installments.",
                insurance: "Comprehensive Insurance of the vehicle."
            }
        },
        {
            id: 'motorcycle-finance',
            title: 'Motorcycle Finance',
            icon: <Bike className="w-6 h-6" />,
            color: 'from-[#6B9B7A] to-[#5D8A6A]',
            data: {
                purpose: "For quick fulfillment of family needs with economical mode of traveling. Easy and quick approach to your destination. Purchase of Motorcycle for domestic and personal use on affordable monthly installments.",
                eligibility: "• AJK/Pakistani National residing in AJK. • Permanent Employees of Government/Semi Government and Autonomous Corporations with at least 03 years of service. • Account Holder of BAJK. • Professionals/Self-employed/Businessmen having 03 months statement of A/c with BAJK or any other bank.",
                ageLimit: "18-60 Years",
                loanLimit: "As per actual cost of Motor Cycle",
                tenure: "Maximum up to 36 months",
                repayment: "Monthly Installments",
                dsr: "30%",
                downPayment: "Minimum 20%",
                primarySecurity: "Joint Registration of vehicle in the name of BAJK & borrower under HPA.",
                secondarySecurity: "Postdated Cheques. 01 Personal Guarantee of Government Officer of BPS-11 or above OR 01 Personal Guarantee of a well worth businessman.",
                insurance: "Comprehensive Insurance of Motorcycle."
            }
        },
        {
            id: 'house-loan',
            title: 'House Loan',
            icon: <Home className="w-6 h-6" />,
            color: 'from-[#4A7C59] to-[#6B9B7A]',
            data: {
                purpose: "BAJK offers loan facility for Construction/Renovation/Purchase of residential house/apartments in AJK at reasonable/affordable easy terms",
                eligibility: "• All Kashmiris / Pakistani having valid CNIC • All salaried employee of AJK Government, semi Government, Autonomous bodies National/Multinational Companies (Blue Chip) • Business and self-employed professionals of AJK domicile • Co-applicant allowed for blood relation husband/wife, father/son",
                lengthOfService: "Salaried; minimum 03 years in Permanent Cadre. Business/Self-Employed; at least 03 years in current Business/Profession",
                minimumIncome: "For Salaried Person: Minimum Rs. 30,000/- monthly take home salary (At-least double of monthly installment). For Business/Self-Employed: Average monthly income should be 03 times of monthly installment.",
                ageLimit: "For Salaried Person: 18-60 Years (the loan be matured 06 months before retirement). For Businessmen: 18-60 Years",
                loanLimit: "Upto Rs. 10 Million",
                tenure: "Upto 20 year",
                dsr: "Debt Equity Ratio 60:40",
                repayment: "Monthly Installments",
                insurance: "Life and mortgaged Property as per Bank's policy",
                security: "Mortgage of land and building thereon",
                prematurePayment: "Premature adjustment allowed",
                partialAdjustment: "Allowed after 01 year of disbursement"
            }
        },
        {
            id: 'personal-loan',
            title: 'Personal Loan',
            icon: <User className="w-6 h-6" />,
            color: 'from-[#F9B912] to-[#4A7C59]',
            data: {
                purpose: "To facilitate your urgent domestic and personal needs, BAJK makes it possible by providing financial facility in shape of Personal Loan so that you could easily take care of your children's education, marriages, house renovation etc. Just avail this facility and enjoy tension -free life.",
                eligibility: "AJK /Pakistani National",
                loanLimit: "• 95% against Government Securities • 95% (First party) and 90% (Third party) against bank's own deposits • 90% against deposits of others banks",
                tenure: "Maximum 36 months",
                repayment: "Lump Sum /Installments",
                primarySecurity: "Hypothecation of House Hold Items (in case of 3rd party security)",
                secondarySecurity: "Lien on Deposits",
                insurance: "Life insurance of Borrower (Optional)"
            }
        },
        {
            id: 'student-loan',
            title: 'Student Loan',
            icon: <GraduationCap className="w-6 h-6" />,
            color: 'from-[#5D8A6A] to-[#F9B912]',
            data: {
                purpose: "Can you send your child for study abroad? Yes, BAJK is there to offer study loan for Higher Studies abroad on very fast mode",
                eligibility: "AJK /Pakistani National",
                loanLimit: "Maximum Rs. 10,000,000 or 95% (1st party) and 90% (3rd party) against Bank's own deposits, whichever is lower. Maximum Rs. 10,000,000 or 90% against Govt. Securities/ Deposits of other Banks (1st/3rd parties), whichever is lower",
                tenure: "Maximum 24 months",
                repayment: "Lump Sum /Installments",
                primarySecurity: "Lien of Deposits",
                insurance: "Life Insurance of Borrower",
                margin: "As per above loan limit"
            }
        },
        {
            id: 'gold-loan',
            title: 'Gold Loan',
            icon: <Coins className="w-6 h-6" />,
            color: 'from-[#F9B912] to-[#6B9B7A]',
            data: {
                purpose: "Save Gold- spend money. Keep your gold in safe hands and enjoy consumption of money there against for your urgent needs on lowest rates.",
                eligibility: "All account holders of BAJK",
                ageLimit: "N/A",
                loanLimit: "Rs 2.0 Million",
                tenure: "Maximum 24 months (Renewable)",
                repayment: "Principal lump sum at maturity, markup quarterly",
                insurance: "For full market value of Gold Ornaments",
                margin: "15%"
            }
        },
        {
            id: 'home-appliances',
            title: 'Home Appliances Finance',
            icon: <Monitor className="w-6 h-6" />,
            color: 'from-[#6B9B7A] to-[#F9B912]',
            data: {
                purpose: "Purchase of modern electronic appliances/gadgets of your choice and provide comfort to your life.",
                eligibility: "• Employee of Government/Semi Government and Autonomous Corporations and Government Organizations. • Employees of all Banks/DFIs including BAJK. • BAJK Account Holder.",
                loanLimit: "Maximum up to Rs. 200,000/-",
                tenure: "Upto 36 Months",
                repayment: "Monthly Installments",
                downPayment: "Minimum 20%",
                primarySecurity: "Hypothecation of purchased goods",
                secondarySecurity: "• 01 PG of Government Officer BPS-11 or above and for Bank Employees, a Personal Guarantee of Bank Employee. • Cheques for the predetermined Installments.",
                insurance: "Insurance of Purchased goods"
            }
        }
    ];

    const schemes = loanSchemes || defaultLoanSchemes;
    const activeScheme = schemes[activeTab];

    const renderDataRow = (label: string, value?: string) => {
        if (!value) return null;
        return (
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 py-3 border-b border-gray-100 last:border-b-0">
                <div className="font-semibold text-[#4A7C59] min-w-[140px] text-sm">
                    {label}:
                </div>
                <div className="text-gray-700 text-sm flex-1 leading-relaxed">
                    {value}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#4A7C59] mb-4">
                        BAJK Loan Schemes
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our comprehensive range of financial solutions designed to meet your personal and business needs
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {schemes.map((scheme, index) => (
                            <button
                                key={scheme.id}
                                onClick={() => setActiveTab(index)}
                                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === index
                                    ? `bg-gradient-to-r ${scheme.color} text-white shadow-lg transform scale-105`
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-[#4A7C59]/30 hover:text-[#4A7C59]'
                                    }`}
                            >
                                {scheme.icon}
                                <span className="hidden sm:inline text-sm">{scheme.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className={`bg-gradient-to-r ${activeScheme.color} p-6 relative overflow-hidden`}>
                        <div className="flex items-center gap-4 text-white relative z-10">
                            <div className="p-3 bg-white/20 rounded-lg">
                                {activeScheme.icon}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{activeScheme.title}</h2>
                                <p className="text-white/90 mt-1">Complete details and requirements</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
                    </div>

                    <div className="p-6">
                        {/* Purpose Section */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-[#4A7C59] mb-4 flex items-center">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#4A7C59] to-[#F9B912] rounded-full mr-3"></div>
                                Purpose
                            </h3>
                            <div className="bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 rounded-xl p-6 border border-[#4A7C59]/20">
                                <p className="text-gray-700 leading-relaxed">
                                    {activeScheme.data.purpose}
                                </p>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                {renderDataRow('Eligibility', activeScheme.data.eligibility)}
                                {renderDataRow('Length of Service', activeScheme.data.lengthOfService)}
                                {renderDataRow('Minimum Income', activeScheme.data.minimumIncome)}
                                {renderDataRow('Age Limit', activeScheme.data.ageLimit)}
                                {renderDataRow('Loan Limit', activeScheme.data.loanLimit)}
                                {renderDataRow('Tenure', activeScheme.data.tenure)}
                            </div>

                            <div className="space-y-1">
                                {renderDataRow('Repayment', activeScheme.data.repayment)}
                                {renderDataRow('DSR', activeScheme.data.dsr)}
                                {renderDataRow('Down Payment/Equity', activeScheme.data.downPayment)}
                                {renderDataRow('Primary Security', activeScheme.data.primarySecurity)}
                                {renderDataRow('Secondary Security', activeScheme.data.secondarySecurity)}
                                {renderDataRow('Security', activeScheme.data.security)}
                                {renderDataRow('Insurance', activeScheme.data.insurance)}
                                {renderDataRow('Margin', activeScheme.data.margin)}
                                {renderDataRow('Premature Payment', activeScheme.data.prematurePayment)}
                                {renderDataRow('Partial Adjustment', activeScheme.data.partialAdjustment)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold text-[#4A7C59] mb-2">
                            Ready to Apply?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Contact us today to learn more about our loan schemes and start your application process
                        </p>
                        <button className={`bg-gradient-to-r ${activeScheme.color} text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanSchemes;