import React, { useState } from 'react';

// Main Banking Account Component
interface Feature {
    text: string;
}

interface AccountData {
    name: string;
    eligibility: string;
    features: Feature[];
    minBalance?: string;
    withdrawalLimit?: string;
    zakatDeduction?: string;
    additionalInfo?: string[];
}

interface BankingAccountComponentProps {
    accountsData?: AccountData[];
    defaultActiveIndex?: number;
}

const BankingAccountComponent: React.FC<BankingAccountComponentProps> = ({
    accountsData = [],
    defaultActiveIndex = 0
}) => {
    const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveIndex);
    const [isHovered, setIsHovered] = useState(false);

    if (!accountsData.length) {
        return (
            <div className="py-8 px-4 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#4A7C59] mb-4">No Account Data Available</h2>
                    <p className="text-gray-600">Please provide account data to display.</p>
                </div>
            </div>
        );
    }

    const activeAccount = accountsData[activeAccountIndex];

    return (
        <div className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border-b border-gray-200">
                        {accountsData.map((account, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveAccountIndex(index)}
                                className={`relative px-3 py-4 text-xs sm:text-sm font-medium border-b-2 transition-all duration-300 hover:bg-gradient-to-t hover:from-[#4A7C59]/10 hover:to-transparent group ${activeAccountIndex === index
                                    ? 'border-[#4A7C59] text-[#4A7C59] bg-gradient-to-t from-[#4A7C59]/10 to-[#F9B912]/5'
                                    : 'border-transparent text-gray-600 hover:text-[#4A7C59] hover:border-[#4A7C59]/30'
                                    }`}
                            >
                                <div className="flex flex-col items-center space-y-1">
                                    {/* Icon/Indicator */}
                                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeAccountIndex === index
                                        ? 'bg-[#F9B912] shadow-lg'
                                        : 'bg-gray-300 group-hover:bg-[#4A7C59]'
                                        }`} />

                                    {/* Account Name */}
                                    <span className="text-center leading-tight min-h-[2.5rem] flex items-center justify-center">
                                        {account.name}
                                    </span>
                                </div>

                                {/* Active Tab Highlight */}
                                {activeAccountIndex === index && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#4A7C59]/5 via-[#F9B912]/5 to-[#4A7C59]/5 rounded-t-lg" />
                                )}

                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#4A7C59]/0 via-[#F9B912]/0 to-[#4A7C59]/0 group-hover:from-[#4A7C59]/5 group-hover:via-[#F9B912]/3 group-hover:to-[#4A7C59]/5 transition-all duration-300 rounded-t-lg" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account Details */}
                <div
                    className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl border border-gray-100"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6 relative overflow-hidden">
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                        />
                        <h1 className="text-3xl font-bold text-white relative z-10">{activeAccount.name}</h1>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F9B912]/20 to-transparent rounded-full transform translate-x-16 -translate-y-16" />
                    </div>

                    <div className="p-8">
                        {/* Eligibility Section */}
                        <div className="mb-10">
                            <h2 className="text-xl font-semibold text-[#4A7C59] mb-4 flex items-center">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#4A7C59] to-[#F9B912] rounded-full mr-3"></div>
                                Eligibility
                            </h2>
                            <div className="bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#6B9B7A]/10 rounded-xl p-6 border border-[#4A7C59]/20 shadow-sm">
                                <p className="text-gray-700 leading-relaxed">
                                    {activeAccount.eligibility}
                                </p>
                            </div>
                        </div>

                        {/* Salient Features Section */}
                        <div className="mb-10">
                            <h2 className="text-xl font-semibold text-[#4A7C59] mb-6 flex items-center">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#F9B912] to-[#4A7C59] rounded-full mr-3"></div>
                                Salient Features
                            </h2>
                            <div className="grid gap-4">
                                {activeAccount.features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start p-4 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 rounded-xl border border-[#F9B912]/20 hover:shadow-lg hover:border-[#F9B912]/40 transition-all duration-300 hover:scale-[1.02]"
                                    >
                                        <div className="flex-shrink-0 w-2 h-2 bg-[#F9B912] rounded-full mt-2 mr-4"></div>
                                        <p className="text-gray-700 font-medium leading-relaxed">{feature.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Info Cards */}
                        {(activeAccount.minBalance || activeAccount.withdrawalLimit || activeAccount.zakatDeduction) && (
                            <div className="grid md:grid-cols-3 gap-6 mb-10">
                                {activeAccount.minBalance && (
                                    <div className="bg-gradient-to-br from-[#4A7C59] to-[#5D8A6A] p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">Minimum Balance</h3>
                                            <div className="w-3 h-3 bg-[#F9B912] rounded-full"></div>
                                        </div>
                                        <p className="text-2xl font-bold text-[#F9B912]">{activeAccount.minBalance}</p>
                                    </div>
                                )}

                                {activeAccount.withdrawalLimit && (
                                    <div className="bg-gradient-to-br from-[#F9B912] to-[#F9B912]/80 p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">Withdrawal Limit</h3>
                                            <div className="w-3 h-3 bg-[#4A7C59] rounded-full"></div>
                                        </div>
                                        <p className="text-2xl font-bold text-[#4A7C59]">{activeAccount.withdrawalLimit}</p>
                                    </div>
                                )}

                                {activeAccount.zakatDeduction && (
                                    <div className="bg-gradient-to-br from-[#6B9B7A] to-[#5D8A6A] p-6 rounded-xl text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">Zakat Deduction</h3>
                                            <div className="w-3 h-3 bg-[#F9B912] rounded-full"></div>
                                        </div>
                                        <p className="text-2xl font-bold text-[#F9B912]">{activeAccount.zakatDeduction}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Corner Accent - Enhanced */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#F9B912]/30 via-[#F9B912]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8 transition-all duration-500 hover:opacity-60 hover:scale-125" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-[#4A7C59]/20 via-[#4A7C59]/5 to-transparent rounded-full transform -translate-x-6 translate-y-6 transition-all duration-500 hover:opacity-60 hover:scale-125" />
                </div>
            </div>
        </div>
    );
};

// Demo Component showing all accounts in one view
const BankingAccountsDemo = () => {
    // All account data from your document
    const allBankingAccountsData: AccountData[] = [
        {
            name: "Current Account",
            eligibility: "Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, Non listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies",
            features: [
                { text: "Chequing account." },
                { text: "Can be opened singly in one name or jointly in two or more names." },
                { text: "Initial/ Minimum deposit requirement is Rs. 1000/-" },
                { text: "No withdrawal Limit." },
                { text: "No Zakat deduction." },
                { text: "Free Cheque Book and other Services as per applicable schedule of charges for account holders having average balance of Rs. 25,000/- and above." },
                { text: "Free of Charge Locker facility for account holders having average balance of Rs. 50,000/- and above." }
            ],
            minBalance: "Rs. 1,000/-",
            withdrawalLimit: "No Limit",
            zakatDeduction: "None"
        },
        {
            name: "PLS Savings Account",
            eligibility: "Individuals, singly or jointly can open their savings accounts. Business/Government entities can open savings accounts for placing funds of provident and benevolent nature.",
            features: [
                { text: "Profit earning chequing account" },
                { text: "Initial deposit/ minimum balance requirement of Rs. 500/-." },
                { text: "Accounts can be opened singly in one name or jointly in two or more names." },
                { text: "Free Cheque Book and other Services as per applicable schedule of charges for account holders having average balance of Rs. 100,000/- and above." },
                { text: "No Limit on withdrawals." },
                { text: "Half yearly profit payment." },
                { text: "Zakat applicable as per law." }
            ],
            minBalance: "Rs. 500/-",
            withdrawalLimit: "No Limit",
            zakatDeduction: "As per law"
        },
        {
            name: "Special Deposit Account",
            eligibility: "Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, Non-listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies",
            features: [
                { text: "Suitable for business" },
                { text: "Profit payment on half yearly basis on daily product basis." },
                { text: "Profit accrues on daily product basis" },
                { text: "No restriction on withdrawals" },
                { text: "Daily Balance of Rs. 50,000/- required for profit eligibility." },
                { text: "Free services as per applicable schedule of charges for all the customers having average balance of Rs.100,000/- or above." }
            ],
            minBalance: "Rs. 50,000/-",
            withdrawalLimit: "No Restriction",
            zakatDeduction: "As applicable"
        },
        {
            name: "Bemisal Mahana Bachat Account (BMBA)",
            eligibility: "Individuals, Business People, Business Entities (Sole Proprietors, Companies (Public, Private, Listed, Non-listed), Partnership Firms (Registered/ Un-Registered), Govt. Departments, Local Bodies and Corporations, Trusts, Clubs, Associations, Societies, NGOs, Public Sector Corporations/ Autonomous Bodies",
            features: [
                { text: "Minimum Deposit Limit for profit is Rs. 25,000/-, however, the account can be opened with Rs. 1,000/-" },
                { text: "Maximum Two withdrawals allowed between 6th and last day of month for profit qualification. No restriction on number of withdrawals before 6th of the month." },
                { text: "Profit payment on monthly basis." },
                { text: "Free locker facility for customers having average balance of Rs. 50,000/-." },
                { text: "Up to 95% quick financing facility available on low markup." }
            ],
            minBalance: "Rs. 1,000/-",
            withdrawalLimit: "Restricted for profit",
            zakatDeduction: "As applicable"
        },
        {
            name: "Premium Plus Remittance Saving Account (PPRSA)",
            eligibility: "Any individual customer who sends/receives the foreign remittances through Money Gram, IME (International Money Exchange), IC (Instant Cash), Western Union, Ria can open single/joint account under this scheme. Remittances received under the above channels with documentary proof would be eligible for opening the account under the product. Print out of Remittances extracted at the time of payment will be kept with the Credit Voucher as evidence of Home Remittances. NO OTHER DEPOSIT will be accepted in the account except the remittance amount received through the aforementioned modes of Home Remittances.",
            features: [
                { text: "Extra profit @1% over and above the prevailing saving profit rate will be paid on Premium Plus Remittance Saving Account." },
                { text: "Deposits received under the above sources of remittance will only be eligible for extra profit." },
                { text: "Profit will be paid on monthly basis resulting in enhanced annualized rate as well." },
                { text: "Cheque book will be provided free of charge to all accounts opened under the product." },
                { text: "Minimum Deposit required for retention under this scheme will be Rs. 1,000/" },
                { text: "Zakat & Withholding Tax to be recovered as per rules." }
            ],
            minBalance: "Rs. 1,000/-",
            withdrawalLimit: "As per rules",
            zakatDeduction: "As per rules"
        }
    ];

    return (
        <div>
            <BankingAccountComponent
                accountsData={allBankingAccountsData}
                defaultActiveIndex={0}
            />

            {/* Code Example */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-[#4A7C59] mb-4">How to Use</h2>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                            {`// Import the component
import BankingAccountComponent from './BankingAccountComponent';

// Your data structure
const accountsData = [
  {
    name: "Current Account",
    eligibility: "Individuals, Business People...",
    features: [
      { text: "Chequing account." },
      { text: "Can be opened singly..." }
    ],
    minBalance: "Rs. 1,000/-",
    withdrawalLimit: "No Limit",
    zakatDeduction: "None"
  }
];

// Use the component
<BankingAccountComponent 
  accountsData={accountsData}
  defaultActiveIndex={0}
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankingAccountsDemo;