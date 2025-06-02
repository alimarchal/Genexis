import { useState } from 'react';
import {
    TrendingUp,
    Car,
    Wrench,
    Building,
    MapPin,
    Store,
    Stethoscope
} from 'lucide-react';

interface CommercialFinanceData {
    purpose: string;
    eligibility: string;
    loanLimit: string;
    tenure: string;
    repayment: string;
    dsr?: string;
    primarySecurity?: string;
    secondarySecurity?: string;
    insurance?: string;
    equityContribution?: string;
    borrowerEquity?: string;
    debtSecurityRatio?: string;
    security?: string;
}

interface CommercialFinance {
    id: string;
    title: string;
    icon: JSX.Element;
    color: string;
    data: CommercialFinanceData;
}

interface CommercialFinanceProps {
    financeSchemes: CommercialFinance[];
    defaultActiveIndex?: number;
}

const CommercialFinanceComponent: React.FC<CommercialFinanceProps> = ({
    financeSchemes,
    defaultActiveIndex = 0
}) => {
    const [activeTab, setActiveTab] = useState(defaultActiveIndex);
    const activeScheme = financeSchemes[activeTab];

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
                        Commercial & SME Finance
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive business finance solutions to fuel your commercial growth and expansion plans
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {financeSchemes.map((scheme, index) => (
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
                                <p className="text-white/90 mt-1">Complete commercial finance details</p>
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
                                {renderDataRow('Loan Limit', activeScheme.data.loanLimit)}
                                {renderDataRow('Tenure', activeScheme.data.tenure)}
                                {renderDataRow('Repayment', activeScheme.data.repayment)}
                                {renderDataRow('DSR', activeScheme.data.dsr)}
                            </div>

                            <div className="space-y-1">
                                {renderDataRow('Equity Contribution', activeScheme.data.equityContribution)}
                                {renderDataRow('Borrower Equity', activeScheme.data.borrowerEquity)}
                                {renderDataRow('Debt Security Ratio', activeScheme.data.debtSecurityRatio)}
                                {renderDataRow('Primary Security', activeScheme.data.primarySecurity)}
                                {renderDataRow('Secondary Security', activeScheme.data.secondarySecurity)}
                                {renderDataRow('Security', activeScheme.data.security)}
                                {renderDataRow('Insurance', activeScheme.data.insurance)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-semibold text-[#4A7C59] mb-2">
                            Ready to Grow Your Business?
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Contact us today to discuss your commercial finance requirements and accelerate your business growth
                        </p>
                        <button className={`bg-gradient-to-r ${activeScheme.color} text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Default Commercial/SME Finance Data
const apiData: CommercialFinance[] = [
    {
        id: 'running-finance',
        title: 'Running Finance',
        icon: <TrendingUp className="w-6 h-6" />,
        color: 'from-[#4A7C59] to-[#5D8A6A]',
        data: {
            purpose: "Purchase of stock and fulfilling of operational expenses of your business. Financial limits are available for your existing business/planned expansion.",
            eligibility: "• Account holder of the bank. • Reasonable turnover to justify the limit requested. • Existing business/planed expansion.",
            loanLimit: "According to business worth subject to per party exposure as per SBP Prudential Regulations.",
            tenure: "Maximum 12 months (Renewable on Satisfactory repayment status).",
            repayment: "Principal lump sum and markup monthly/quarterly basis.",
            primarySecurity: "Hypothecation of Stock.",
            secondarySecurity: "Mortgage of property or lien on Deposits or pledge of Gold.",
            insurance: "Insurance cover of Hypothecated Stock and mortgaged property as per Bank's policy."
        }
    },
    {
        id: 'auto-finance',
        title: 'Auto Finance',
        icon: <Car className="w-6 h-6" />,
        color: 'from-[#F9B912] to-[#F9B912]/80',
        data: {
            purpose: "BAJK offers Auto-Finance Commercial which allows its customers to fulfill their business and commercial Vehicle / Transportation needs.",
            eligibility: "All businessmen, Companies, Government Institution, Autonomous Corporations of AJK.",
            loanLimit: "As per vehicle cost and business requirement",
            tenure: "Maximum 5 years",
            repayment: "Monthly Installments",
            primarySecurity: "Joint Registration of the vehicle in the name of BAJK & borrower under HPA",
            secondarySecurity: "As per Bank Policy",
            insurance: "Comprehensive Insurance of Vehicle."
        }
    },
    {
        id: 'demand-finance',
        title: 'Demand Finance',
        icon: <Wrench className="w-6 h-6" />,
        color: 'from-[#6B9B7A] to-[#5D8A6A]',
        data: {
            purpose: "For purchase of Machinery/Equipment/Assets for your existing business/planned expansion. Choose BAJK as your business partner and enjoy financial support at easy terms and conditions.",
            eligibility: "• Account holder of the bank. • Reasonable turnover to justify the limit requested. • Existing business/planned expansion.",
            loanLimit: "According to business worth and equity ratio subject to per party exposure as per SBP Prudential Regulations.",
            tenure: "Maximum 5 years",
            repayment: "Monthly Installments",
            dsr: "Debt Security Ratio = 60:40",
            primarySecurity: "Hypothecation of stock/machinery and equipment.",
            secondarySecurity: "Mortgage of property or lien on Deposits or pledge of Gold.",
            insurance: "Insurance cover of stock and mortgaged property, as per Bank's policy"
        }
    },
    {
        id: 'construction-finance',
        title: 'Construction Finance for Commercial Building / Shopping Malls',
        icon: <Building className="w-6 h-6" />,
        color: 'from-[#4A7C59] to-[#6B9B7A]',
        data: {
            purpose: "BAJK offers loan facility for construction/renovation/purchase of commercial buildings/plazas/shops etc. on easy terms.",
            eligibility: "• Account holder of the bank. • Reasonable income/equity proof to justify the limit requested. • Approved Commercial building plan.",
            loanLimit: "Correlates with the total cost of the project and equity contribution of the client.",
            tenure: "Maximum up to 05 years.",
            repayment: "Monthly Installments",
            debtSecurityRatio: "60:40",
            security: "Mortgage of Land and superstructure of the project or lien on Deposits or Pledge of Gold.",
            insurance: "Insurance of property as per Bank's Policy."
        }
    },
    {
        id: 'tourism-finance',
        title: 'Tourism Promotion Finance',
        icon: <MapPin className="w-6 h-6" />,
        color: 'from-[#F9B912] to-[#4A7C59]',
        data: {
            purpose: "Purpose of this loan scheme is to finance the infrastructure facilities to promote/facilitate tourists activities and movements in tourist attractions in AJK. The tourists infrastructural facilities include establishment of tourist Huts, refurbishment/renovation of existing guest houses, erecting additional accommodation within existing residential houses of the locals in AJK.",
            eligibility: "• House should be suitably located having a motor able approach. • Permission of concerned Government organization for conversion/ Renovation /Refurbishment of House into Hotel/Guest House. • Hotel/Guest House should be preferably managed by the owner himself.",
            loanLimit: "Up to Rs. 5.0 Millions",
            tenure: "Maximum up to 05 years",
            repayment: "Monthly installments with 03 months grace period",
            equityContribution: "20%",
            primarySecurity: "Hypothecation of all Moveable Assets",
            secondarySecurity: "Mortgage of property or lien on Deposits or pledge of Gold",
            insurance: "As per Bank's Policy"
        }
    },
    {
        id: 'small-business-finance',
        title: 'Small Business Trade Finance',
        icon: <Store className="w-6 h-6" />,
        color: 'from-[#5D8A6A] to-[#F9B912]',
        data: {
            purpose: "To ensure easy access of businessmen/trader's community for their working capital requirement on soft terms.",
            eligibility: "• The minimum age of the business should two years. • Applicant must be Account holder of BAJK. • Applicant must be resident of AJK with business within the area of respective branch in the main city/business hub of respective district. • Applicant should not be defaulter of any financial intuition/Bank.",
            loanLimit: "Maximum loan amount up to Rs. 500,000/-",
            tenure: "12 months renewable",
            repayment: "Principal lump sum and markup monthly/quarterly basis.",
            primarySecurity: "Hypothecation of Stock.",
            secondarySecurity: "Two personal Guarantees of i. Govt officials of BPS-09 or above ii. Businessmen maintaining running account with BAJK or any other bank having annual average balance of the amount equivalent to the loan amount requested. iii. Any other security acceptable by the bank.",
            insurance: "As per Bank's policy"
        }
    },
    {
        id: 'healthcare-finance',
        title: 'Health Care Services Finance',
        icon: <Stethoscope className="w-6 h-6" />,
        color: 'from-[#6B9B7A] to-[#F9B912]',
        data: {
            purpose: "BAJK offers financial facility to setup/expansion/renovation/modernization of medical/health facilities in AJK.",
            eligibility: "All Qualified registered medical practitioners registered with PMDC with minimum 03 years of experience in Pakistan/AJK.",
            loanLimit: "For Rural Areas: • Up to Rs. 5.00 Million for purchase of equipment (DF). • Up to Rs. 1.00 Million for working capital requirement (RF). For Urban Areas: • Up to Rs. 10.00 Million for purchase of equipment (DF). • Up to Rs. 2.00 Million for working capital requirement (RF).",
            tenure: "• 01 year on rollover bases for RF limit. • 05 years for DF limit.",
            borrowerEquity: "For DF – 25% of required amount.",
            dsr: "50%",
            primarySecurity: "Hypothecation of existing or to be purchased stock with 25% margin.",
            secondarySecurity: "Mortgage of Land and superstructure of the project or lien on Deposits or Pledge of Gold.",
            insurance: "Insurance of all Movable/Immovable Assets Building/Machinery/Equipment and other stock as per Bank Policy"
        }
    }
];

// Main component using the data
const CommercialFinance = () => {
    return <CommercialFinanceComponent financeSchemes={apiData} defaultActiveIndex={0} />;
};

export default CommercialFinance;