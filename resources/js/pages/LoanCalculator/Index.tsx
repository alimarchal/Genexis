import WebsiteLayout from '@/layouts/WebsiteLayout';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import {
    Banknote,
    Calculator,
    Calendar,
    ChevronDown,
    Download,
    FileSpreadsheet,
    Percent,
    PieChart,
    Printer,
    RotateCcw,
    Shield,
    TrendingUp,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

interface LoanType {
    id: number;
    name: string;
    description: string;
    minAmount: number;
    maxAmount: number;
    minTenure: number;
    maxTenure: number;
    suggestedRate: number;
    hasInsurance: boolean;
}

interface ProfitRate {
    category: string;
    rate: number;
}

interface InsuranceOptions {
    types: {
        fixed: string;
        percentage: string;
    };
    defaults: {
        fixed: number;
        percentage: number;
        maxPercentage: number;
    };
}

interface EMISchedule {
    month: number;
    emi: number;
    principal: number;
    markup: number;
    insurance: number;
    balance: number;
}

interface BankRates {
    loan: {
        house: number;
        personal: number;
        motorcycle: number;
        student: number;
        gold: number;
        home_appliances: number;
        car: number;
        business: number;
        agriculture: number;
        salary: number;
    };
    deposit: {
        savings: number;
        current: number;
        term_1year: number;
        term_2year: number;
        term_3year: number;
        term_5year: number;
        special_savings: number;
    };
}

interface LoanCalculatorProps {
    loanTypes: LoanType[];
    currentRates: ProfitRate[];
    bankRates: BankRates;
    insuranceOptions: InsuranceOptions;
}

export default function LoanCalculator({ loanTypes, currentRates, bankRates, insuranceOptions }: LoanCalculatorProps) {
    const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null);
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [securityDeposit, setSecurityDeposit] = useState<number>(0);
    const [tenure, setTenure] = useState<number>(12);
    const [insuranceType, setInsuranceType] = useState<'fixed' | 'percentage'>('fixed');
    const [insuranceAmount, setInsuranceAmount] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    // Initialize with zeros - all cards show zero by default
    useEffect(() => {
        if (loanTypes.length > 0 && !selectedLoanType) {
            // Don't auto-select, let user choose
        }
    }, [loanTypes, selectedLoanType]);

    // Update loan parameters when loan type changes
    useEffect(() => {
        if (selectedLoanType) {
            // Reset values when loan type changes
            setLoanAmount(selectedLoanType.minAmount);
            // Reset security deposit to 0, especially for loans that don't support it
            setSecurityDeposit(0);
            setTenure(selectedLoanType.minTenure);
            setInsuranceAmount(0);
            setShowResults(false);
        }
    }, [selectedLoanType]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.dropdown-container')) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Helper function to map loan type names to bankRates keys
    const getLoanRateKey = (loanTypeName: string): keyof BankRates['loan'] | null => {
        const name = loanTypeName.toLowerCase();
        if (name.includes('house') || name.includes('home')) return 'house';
        if (name.includes('personal')) return 'personal';
        if (name.includes('motorcycle') || name.includes('bike')) return 'motorcycle';
        if (name.includes('student') || name.includes('education')) return 'student';
        if (name.includes('gold')) return 'gold';
        if (name.includes('appliance')) return 'home_appliances';
        if (name.includes('car') || name.includes('vehicle')) return 'car';
        if (name.includes('business') || name.includes('commercial')) return 'business';
        if (name.includes('agriculture') || name.includes('farming')) return 'agriculture';
        if (name.includes('salary') || name.includes('advance')) return 'salary';
        return null;
    };

    // Helper function to check if loan type should have security deposit
    const shouldShowSecurityDeposit = (loanTypeName: string): boolean => {
        if (!loanTypeName) return false;
        const name = loanTypeName.toLowerCase();
        // These loan types should NOT have security deposit
        const noSecurityDepositTypes = ['advance salary', 'salary advance', 'student loan', 'personal loan', 'gold loan'];

        return !noSecurityDepositTypes.some((type) => name.includes(type.replace(' ', '')));
    };

    // Calculate monthly insurance amount
    const calculateMonthlyInsurance = useMemo(() => {
        if (!selectedLoanType || !tenure) return 0;
        
        if (insuranceType === 'fixed') {
            return insuranceAmount / tenure;
        } else {
            return (insuranceAmount / 100) * loanAmount / tenure;
        }
    }, [insuranceType, insuranceAmount, loanAmount, tenure, selectedLoanType]);

    const handleCalculate = () => {
        setShowResults(true);
    };

    const handleReset = () => {
        setSelectedLoanType(null);
        setLoanAmount(0);
        setSecurityDeposit(0);
        setTenure(12);
        setInsuranceType('fixed');
        setInsuranceAmount(0);
        setShowResults(false);
        setIsDropdownOpen(false);
    };

    const calculations = useMemo(() => {
        // Return zeros if not calculated yet or missing required data
        if (!showResults || !loanAmount || !tenure || !selectedLoanType) {
            return {
                emi: 0,
                totalAmount: 0,
                totalMarkup: 0,
                totalInsurance: 0,
                monthlyInsurance: 0,
                schedule: [],
                financingAmount: 0,
                totalPrice: 0,
            };
        }

        // Loan amount is the amount to be financed
        const financingAmount = loanAmount;
        const totalPrice = loanAmount + securityDeposit;

        // Calculate monthly insurance
        const monthlyInsurance = calculateMonthlyInsurance;
        const totalInsurance = monthlyInsurance * tenure;

        if (financingAmount <= 0) {
            return {
                emi: monthlyInsurance,
                totalAmount: securityDeposit + totalInsurance,
                totalMarkup: 0,
                totalInsurance,
                monthlyInsurance,
                schedule: [],
                financingAmount: 0,
                totalPrice: securityDeposit + totalInsurance,
            };
        }

        // Get markup rate from bankRates based on loan type
        const loanTypeKey = getLoanRateKey(selectedLoanType.name);
        const markupRate = loanTypeKey ? bankRates.loan[loanTypeKey] : selectedLoanType.suggestedRate;

        const monthlyRate = markupRate / 100 / 12;
        const numberOfPayments = tenure;

        // EMI calculation using the standard formula on financing amount (loan amount) - without insurance
        const baseEmi = (financingAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        // Total EMI includes insurance
        const totalEmi = baseEmi + monthlyInsurance;

        const totalAmount = totalEmi * numberOfPayments + securityDeposit;
        const totalMarkup = baseEmi * numberOfPayments - financingAmount;

        // Generate amortization schedule
        let balance = financingAmount;
        const schedule: EMISchedule[] = [];

        for (let month = 1; month <= numberOfPayments; month++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = baseEmi - interestPayment;
            balance = balance - principalPayment;

            schedule.push({
                month,
                emi: Math.round(totalEmi),
                principal: Math.round(principalPayment),
                markup: Math.round(interestPayment),
                insurance: Math.round(monthlyInsurance),
                balance: Math.round(Math.max(0, balance)),
            });
        }

        return {
            emi: Math.round(totalEmi),
            totalAmount: Math.round(totalAmount),
            totalMarkup: Math.round(totalMarkup),
            totalInsurance: Math.round(totalInsurance),
            monthlyInsurance: Math.round(monthlyInsurance),
            schedule,
            financingAmount: Math.round(financingAmount),
            totalPrice: Math.round(totalPrice),
        };
    }, [loanAmount, securityDeposit, tenure, selectedLoanType, bankRates, showResults, calculateMonthlyInsurance]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-PK').format(num);
    };

    // PDF generation function
    const generatePDF = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const markupRate = selectedLoanType
            ? getLoanRateKey(selectedLoanType.name)
                ? bankRates.loan[getLoanRateKey(selectedLoanType.name)!]
                : selectedLoanType.suggestedRate
            : 0;

        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Loan Calculator Report - Bank of Azad Jammu & Kashmir</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
                    .summary-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                    th { background-color: #f5f5f5; }
                    .loan-details { margin: 20px 0; }
                    .disclaimer { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin-top: 20px; border-radius: 5px; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Bank of Azad Jammu & Kashmir</h1>
                    <h2>Loan Calculator Report</h2>
                    <p>Generated on: ${new Date().toLocaleDateString('en-PK')}</p>
                </div>
                
                <div class="loan-details">
                    <h3>Loan Details</h3>
                    <p><strong>Loan Type:</strong> ${selectedLoanType?.name || 'N/A'}</p>
                    <p><strong>Financing Amount:</strong> ${formatCurrency(loanAmount)}</p>
                    ${selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name) ? `<p><strong>Security Deposit:</strong> ${formatCurrency(securityDeposit)}</p>` : ''}
                    ${selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name) ? `<p><strong>Total Price:</strong> ${formatCurrency(calculations.totalPrice)}</p>` : ''}
                    <p><strong>Markup Rate:</strong> ${markupRate}% per annum</p>
                    <p><strong>Tenure:</strong> ${tenure} months</p>
                    <p><strong>Insurance Type:</strong> ${insuranceType === 'fixed' ? 'Fixed Premium' : 'Percentage'}</p>
                    <p><strong>Insurance Amount:</strong> ${insuranceType === 'fixed' ? formatCurrency(insuranceAmount) : `${insuranceAmount}%`}</p>
                    <p><strong>Monthly Insurance:</strong> ${formatCurrency(calculations.monthlyInsurance)}</p>
                </div>

                <div class="summary">
                    <div class="summary-card">
                        <h4>Monthly Installment</h4>
                        <p><strong>${formatCurrency(calculations.emi)}</strong></p>
                    </div>
                    <div class="summary-card">
                        <h4>Financing Amount</h4>
                        <p><strong>${formatCurrency(calculations.financingAmount)}</strong></p>
                    </div>
                    ${
                        selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name)
                            ? `
                    <div class="summary-card">
                        <h4>Security Deposit</h4>
                        <p><strong>${formatCurrency(securityDeposit)}</strong></p>
                    </div>`
                            : ''
                    }
                    <div class="summary-card">
                        <h4>Total Markup</h4>
                        <p><strong>${formatCurrency(calculations.totalMarkup)}</strong></p>
                    </div>
                    <div class="summary-card">
                        <h4>Total Insurance</h4>
                        <p><strong>${formatCurrency(calculations.totalInsurance)}</strong></p>
                    </div>
                </div>

                <h3>Payment Schedule</h3>
                <table>
                    <thead>
                        <tr>
                            <th style="text-align: left;">Month</th>
                            <th>Principal</th>
                            <th>Markup</th>
                            <th>Insurance</th>
                            <th>Balance</th>
                            <th>Monthly Installment</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${calculations.schedule
                            .map(
                                (payment) => `
                            <tr>
                                <td style="text-align: left;">${payment.month}</td>
                                <td>${formatNumber(payment.principal)}</td>
                                <td>${formatNumber(payment.markup)}</td>
                                <td>${formatNumber(payment.insurance)}</td>
                                <td>${formatNumber(payment.balance)}</td>
                                <td>${formatNumber(payment.emi)}</td>
                            </tr>
                        `,
                            )
                            .join('')}
                    </tbody>
                </table>

                <div class="disclaimer">
                    <h4>Important Note</h4>
                    <p>This calculator provides estimates based on the inputs provided. Actual Islamic financing terms, markup rates, insurance premiums, and monthly installment amounts may vary based on your creditworthiness, bank policies, and market conditions. All financing products are Shariah-compliant. Please consult with our Islamic banking officers for accurate information and personalized financing offers.</p>
                </div>

                <div class="no-print" style="margin-top: 20px; text-align: center;">
                    <button onclick="window.print()" style="padding: 10px 20px; background-color: #4A7C59; color: white; border: none; border-radius: 5px; cursor: pointer;">Print Report</button>
                    <button onclick="window.close()" style="padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Close</button>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
    };

    // Print function
    const handlePrint = () => {
        generatePDF();
    };

    return (
        <WebsiteLayout title="Loan Calculator - Bank of Azad Jammu & Kashmir">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #4A7C59;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                
                .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #4A7C59;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
            `,
                }}
            />
            <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
                <div className="mx-auto max-w-7xl px-6 py-8">
                    {/* Hero Section */}
                    <div className="mb-12 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                                <Calculator className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">Loan Calculator</h1>
                        <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                            Calculate your monthly installments, view payment schedule, and visualize your financing breakdown with our comprehensive
                            Islamic financing calculator including insurance coverage.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Calculator Form */}
                        <div className="lg:col-span-1">
                            <div className="rounded-xl bg-white p-8 shadow-lg">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">Calculate Your Loan</h2>

                                {/* Loan Type Selection - Beautiful Dropdown */}
                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                                        <Banknote className="mr-2 inline h-4 w-4" />
                                        Loan Type
                                    </label>
                                    <div className="dropdown-container relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white p-3 text-left focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                        >
                                            <span className={selectedLoanType ? 'text-gray-900' : 'text-gray-500'}>
                                                {selectedLoanType ? selectedLoanType.name : 'Select Loan Type'}
                                            </span>
                                            <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg">
                                                {loanTypes.map((loan) => (
                                                    <button
                                                        key={loan.id}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedLoanType(loan);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className="w-full border-b border-gray-100 p-3 text-left last:border-b-0 hover:bg-[#4A7C59]/10 focus:bg-[#4A7C59]/10 focus:outline-none"
                                                    >
                                                        <div className="font-medium text-gray-900">{loan.name}</div>
                                                        <div className="truncate text-sm text-gray-600">{loan.description}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {selectedLoanType && (
                                        <div className="mt-2 text-sm text-gray-600">
                                            <p>
                                                Amount: {formatCurrency(selectedLoanType.minAmount)} - {formatCurrency(selectedLoanType.maxAmount)}
                                            </p>
                                            <p>
                                                Tenure: {selectedLoanType.minTenure} - {selectedLoanType.maxTenure} months
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Loan Amount Slider */}
                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                                        <Banknote className="mr-2 inline h-4 w-4" />
                                        Loan Amount: {formatCurrency(loanAmount)}
                                    </label>
                                    <input
                                        type="range"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        min={selectedLoanType?.minAmount || 50000}
                                        max={selectedLoanType?.maxAmount || 50000000}
                                        step="1000"
                                        className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                        style={{
                                            background: `linear-gradient(to right, #4A7C59 0%, #4A7C59 ${((loanAmount - (selectedLoanType?.minAmount || 50000)) / ((selectedLoanType?.maxAmount || 50000000) - (selectedLoanType?.minAmount || 50000))) * 100}%, #e5e7eb ${((loanAmount - (selectedLoanType?.minAmount || 50000)) / ((selectedLoanType?.maxAmount || 50000000) - (selectedLoanType?.minAmount || 50000))) * 100}%, #e5e7eb 100%)`,
                                        }}
                                    />
                                    {selectedLoanType && (
                                        <div className="mt-2 flex justify-between text-xs text-gray-600">
                                            <span>{formatCurrency(selectedLoanType.minAmount)}</span>
                                            <span>{formatCurrency(selectedLoanType.maxAmount)}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Security Deposit Slider - Only show for certain loan types */}
                                {selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name) && (
                                    <div className="mb-6">
                                        <label className="mb-3 block text-sm font-semibold text-gray-700">
                                            <Banknote className="mr-2 inline h-4 w-4" />
                                            Security Deposit: {formatCurrency(securityDeposit)}
                                        </label>
                                        <input
                                            type="range"
                                            value={securityDeposit}
                                            onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                                            min="0"
                                            max="10000000"
                                            step="1000"
                                            className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                            style={{
                                                background: `linear-gradient(to right, #059669 0%, #059669 ${(securityDeposit / 10000000) * 100}%, #e5e7eb ${(securityDeposit / 10000000) * 100}%, #e5e7eb 100%)`,
                                            }}
                                        />
                                        <div className="mt-2 flex justify-between text-xs text-gray-600">
                                            <span>{formatCurrency(0)}</span>
                                            <span>Total Price: {formatCurrency(loanAmount + securityDeposit)}</span>
                                            <span>{formatCurrency(10000000)}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Insurance Section */}
                                {selectedLoanType && selectedLoanType.hasInsurance && (
                                    <div className="mb-6">
                                        <label className="mb-3 block text-sm font-semibold text-gray-700">
                                            <Shield className="mr-2 inline h-4 w-4" />
                                            Insurance Coverage
                                        </label>
                                        
                                        {/* Insurance Type Toggle */}
                                        <div className="mb-4">
                                            <div className="flex rounded-lg bg-gray-100 p-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setInsuranceType('fixed')}
                                                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                                        insuranceType === 'fixed'
                                                            ? 'bg-white text-[#4A7C59] shadow-sm'
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    Fixed Premium
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setInsuranceType('percentage')}
                                                    className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                                        insuranceType === 'percentage'
                                                            ? 'bg-white text-[#4A7C59] shadow-sm'
                                                            : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                                >
                                                    Percentage
                                                </button>
                                            </div>
                                        </div>

                                        {/* Insurance Amount Input */}
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={insuranceAmount}
                                                onChange={(e) => setInsuranceAmount(Math.max(0, Number(e.target.value)))}
                                                min="0"
                                                max={insuranceType === 'percentage' ? 100 : undefined}
                                                step={insuranceType === 'percentage' ? 0.01 : 1}
                                                className="w-full rounded-lg border border-gray-300 bg-white p-3 pr-8 focus:border-[#4A7C59] focus:ring-2 focus:ring-[#4A7C59]/20 focus:outline-none"
                                                placeholder={insuranceType === 'fixed' ? 'Enter fixed amount' : 'Enter percentage'}
                                            />
                                            {insuranceType === 'percentage' && (
                                                <Percent className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                            )}
                                        </div>

                                        {/* Insurance Summary */}
                                        <div className="mt-3 rounded-lg bg-blue-50 p-3">
                                            <div className="text-sm text-blue-700">
                                                <p>
                                                    <strong>Monthly Insurance:</strong> {formatCurrency(calculateMonthlyInsurance)}
                                                </p>
                                                <p>
                                                    <strong>Total Insurance:</strong> {formatCurrency(calculateMonthlyInsurance * tenure)}
                                                </p>
                                                {insuranceType === 'percentage' && (
                                                    <p className="text-xs text-blue-600 mt-1">
                                                        {insuranceAmount}% of {formatCurrency(loanAmount)} = {formatCurrency((insuranceAmount / 100) * loanAmount)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Current Markup Rate Display */}
                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                                        <Percent className="mr-2 inline h-4 w-4" />
                                        Current Markup Rate
                                    </label>
                                    <div className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3">
                                        <span className="text-lg font-semibold text-[#4A7C59]">
                                            {selectedLoanType
                                                ? getLoanRateKey(selectedLoanType.name)
                                                    ? bankRates.loan[getLoanRateKey(selectedLoanType.name)!]
                                                    : selectedLoanType.suggestedRate
                                                : 0}
                                            % per annum
                                        </span>
                                        <p className="mt-1 text-sm text-gray-600">Fixed rate based on loan type</p>
                                    </div>
                                </div>

                                {/* Tenure Slider */}
                                <div className="mb-8">
                                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                                        <Calendar className="mr-2 inline h-4 w-4" />
                                        Loan Tenure: {tenure} months
                                    </label>
                                    <input
                                        type="range"
                                        value={tenure}
                                        onChange={(e) => setTenure(Number(e.target.value))}
                                        min={selectedLoanType?.minTenure || 6}
                                        max={selectedLoanType?.maxTenure || 240}
                                        step="1"
                                        className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                        style={{
                                            background: `linear-gradient(to right, #4A7C59 0%, #4A7C59 ${((tenure - (selectedLoanType?.minTenure || 6)) / ((selectedLoanType?.maxTenure || 240) - (selectedLoanType?.minTenure || 6))) * 100}%, #e5e7eb ${((tenure - (selectedLoanType?.minTenure || 6)) / ((selectedLoanType?.maxTenure || 240) - (selectedLoanType?.minTenure || 6))) * 100}%, #e5e7eb 100%)`,
                                        }}
                                    />
                                    {selectedLoanType && (
                                        <div className="mt-2 flex justify-between text-xs text-gray-600">
                                            <span>{selectedLoanType.minTenure} months</span>
                                            <span>{selectedLoanType.maxTenure} months</span>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <button
                                        onClick={handleCalculate}
                                        disabled={!selectedLoanType || !loanAmount}
                                        className="flex w-full items-center justify-center rounded-lg bg-[#4A7C59] px-4 py-3 text-white transition-colors hover:bg-[#3d6147] disabled:cursor-not-allowed disabled:bg-gray-400"
                                    >
                                        <Calculator className="mr-2 h-4 w-4" />
                                        Calculate
                                    </button>

                                    <button
                                        onClick={handleReset}
                                        className="flex w-full items-center justify-center rounded-lg border-2 border-gray-400 px-4 py-3 text-gray-600 transition-colors hover:border-gray-500 hover:bg-gray-50"
                                    >
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Reset
                                    </button>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={generatePDF}
                                            disabled={!showResults}
                                            className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            PDF
                                        </button>
                                        <button
                                            onClick={handlePrint}
                                            disabled={!showResults}
                                            className="flex items-center justify-center rounded-lg bg-gray-600 px-4 py-3 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                                        >
                                            <Printer className="mr-2 h-4 w-4" />
                                            Print
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Current Rates Reference */}
                            <div className="mt-6 rounded-xl bg-white p-6 shadow-lg">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Current Bank Rates</h3>
                                <div className="space-y-2">
                                    {currentRates.slice(0, 5).map((rate, index) => (
                                        <div key={index} className="flex justify-between text-sm">
                                            <span className="text-gray-600">{rate.category}</span>
                                            <span className="font-semibold text-[#4A7C59]">{rate.rate}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Results Section */}
                        <div className="lg:col-span-2">
                            {/* EMI Results */}
                            <div
                                className={`mb-8 grid gap-4 sm:grid-cols-2 ${
                                    selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name) 
                                        ? 'lg:grid-cols-5' 
                                        : 'lg:grid-cols-4'
                                }`}
                            >
                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Calculator className="mr-1 h-4 w-4 flex-shrink-0 text-[#4A7C59]" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Monthly EMI</h3>
                                    </div>
                                    <p className={`font-bold text-[#4A7C59] ${calculations.emi.toString().length > 8 ? 'text-lg' : 'text-xl'}`}>
                                        {formatCurrency(calculations.emi)}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Banknote className="mr-1 h-4 w-4 flex-shrink-0 text-green-600" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Finance Amt</h3>
                                    </div>
                                    <p
                                        className={`font-bold text-green-600 ${calculations.financingAmount.toString().length > 8 ? 'text-lg' : 'text-xl'}`}
                                    >
                                        {formatCurrency(calculations.financingAmount)}
                                    </p>
                                </div>

                                {/* Security Deposit Card - Only show for certain loan types */}
                                {selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name) && (
                                    <div className="rounded-xl bg-white p-4 shadow-lg">
                                        <div className="mb-2 flex min-h-[1.5rem] items-center">
                                            <Banknote className="mr-1 h-4 w-4 flex-shrink-0 text-blue-600" />
                                            <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Security Deposit</h3>
                                        </div>
                                        <p className={`font-bold text-blue-600 ${securityDeposit.toString().length > 8 ? 'text-lg' : 'text-xl'}`}>
                                            {formatCurrency(securityDeposit)}
                                        </p>
                                    </div>
                                )}

                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Percent className="mr-1 h-4 w-4 flex-shrink-0 text-orange-600" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Total Markup</h3>
                                    </div>
                                    <p
                                        className={`font-bold text-orange-600 ${calculations.totalMarkup.toString().length > 8 ? 'text-lg' : 'text-xl'}`}
                                    >
                                        {formatCurrency(calculations.totalMarkup)}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Shield className="mr-1 h-4 w-4 flex-shrink-0 text-purple-600" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Total Insurance</h3>
                                    </div>
                                    <p
                                        className={`font-bold text-purple-600 ${calculations.totalInsurance.toString().length > 8 ? 'text-lg' : 'text-xl'}`}
                                    >
                                        {formatCurrency(calculations.totalInsurance)}
                                    </p>
                                </div>
                            </div>

                            {/* Loan Breakdown Visual - Show when results are calculated */}
                            {showResults && calculations.totalAmount > 0 && (
                                <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                                        <PieChart className="mr-2 inline h-5 w-5" />
                                        Loan Breakdown
                                    </h3>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* Pie Chart */}
                                        <div className="flex justify-center">
                                            <div className="h-64 w-64">
                                                <Pie
                                                    data={{
                                                        labels: ['Financing Amount', 'Markup Amount', 'Insurance Amount'],
                                                        datasets: [
                                                            {
                                                                data: [calculations.financingAmount, calculations.totalMarkup, calculations.totalInsurance],
                                                                backgroundColor: ['#4A7C59', '#fb923c', '#8b5cf6'],
                                                                borderColor: ['#4A7C59', '#fb923c', '#8b5cf6'],
                                                                borderWidth: 2,
                                                            },
                                                        ],
                                                    }}
                                                    options={{
                                                        responsive: true,
                                                        maintainAspectRatio: true,
                                                        plugins: {
                                                            legend: {
                                                                position: 'bottom',
                                                            },
                                                            tooltip: {
                                                                callbacks: {
                                                                    label: function (context) {
                                                                        const value = context.parsed;
                                                                        const total = calculations.financingAmount + calculations.totalMarkup + calculations.totalInsurance;
                                                                        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                                                                        return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Progress Bars */}
                                        <div className="space-y-4">
                                            {/* Financing Amount Bar */}
                                            <div>
                                                <div className="mb-2 flex justify-between">
                                                    <span className="text-sm font-medium text-gray-700">Financing Amount</span>
                                                    <span className="text-sm font-semibold text-[#4A7C59]">
                                                        {formatCurrency(calculations.financingAmount)}
                                                    </span>
                                                </div>
                                                <div className="h-4 w-full rounded-full bg-gray-200">
                                                    <div
                                                        className="h-4 rounded-full bg-[#4A7C59]"
                                                        style={{
                                                            width: `${
                                                                calculations.totalMarkup + calculations.totalInsurance > 0
                                                                    ? (calculations.financingAmount / 
                                                                        (calculations.financingAmount + calculations.totalMarkup + calculations.totalInsurance)) * 100
                                                                    : 100
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Markup Bar */}
                                            <div>
                                                <div className="mb-2 flex justify-between">
                                                    <span className="text-sm font-medium text-gray-700">Markup Amount</span>
                                                    <span className="text-sm font-semibold text-orange-600">
                                                        {formatCurrency(calculations.totalMarkup)}
                                                    </span>
                                                </div>
                                                <div className="h-4 w-full rounded-full bg-gray-200">
                                                    <div
                                                        className="h-4 rounded-full bg-orange-600"
                                                        style={{
                                                            width: `${
                                                                calculations.financingAmount + calculations.totalInsurance > 0
                                                                    ? (calculations.totalMarkup / 
                                                                        (calculations.financingAmount + calculations.totalMarkup + calculations.totalInsurance)) * 100
                                                                    : 0
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Insurance Bar */}
                                            <div>
                                                <div className="mb-2 flex justify-between">
                                                    <span className="text-sm font-medium text-gray-700">Insurance Amount</span>
                                                    <span className="text-sm font-semibold text-purple-600">
                                                        {formatCurrency(calculations.totalInsurance)}
                                                    </span>
                                                </div>
                                                <div className="h-4 w-full rounded-full bg-gray-200">
                                                    <div
                                                        className="h-4 rounded-full bg-purple-600"
                                                        style={{
                                                            width: `${
                                                                calculations.financingAmount + calculations.totalMarkup > 0
                                                                    ? (calculations.totalInsurance / 
                                                                        (calculations.financingAmount + calculations.totalMarkup + calculations.totalInsurance)) * 100
                                                                    : 0
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Summary */}
                                            <div className="mt-6 rounded-lg bg-gray-50 p-4">
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <span className="text-gray-600">Financing:</span>
                                                        <span className="ml-2 font-semibold text-[#4A7C59]">
                                                            {calculations.financingAmount > 0
                                                                ? (
                                                                      (calculations.financingAmount /
                                                                          (calculations.financingAmount + calculations.totalMarkup + calculations.totalInsurance)) *
                                                                      100
                                                                  ).toFixed(1)
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Markup:</span>
                                                        <span className="ml-2 font-semibold text-orange-600">
                                                            {calculations.financingAmount > 0
                                                                ? (
                                                                      (calculations.totalMarkup /
                                                                          (calculations.financingAmount + calculations.totalMarkup + calculations.totalInsurance)) *
                                                                      100
                                                                  ).toFixed(1)
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-600">Insurance:</span>
                                                        <span className="ml-2 font-semibold text-purple-600">
                                                            {calculations.financingAmount > 0
                                                                ? (
                                                                      (calculations.totalInsurance /
                                                                          (calculations.financingAmount + calculations.totalMarkup + calculations.totalInsurance)) *
                                                                      100
                                                                  ).toFixed(1)
                                                                : 0}
                                                            %
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Payment Trend Visual - Show when results are calculated */}
                            {showResults && calculations.schedule.length > 0 && (
                                <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                                        <TrendingUp className="mr-2 inline h-5 w-5" />
                                        Payment Analysis
                                    </h3>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        {/* First Year vs Last Year Comparison */}
                                        <div>
                                            <h4 className="mb-4 font-semibold text-gray-800">First Year Payment</h4>
                                            <div className="space-y-3">
                                                {calculations.schedule.slice(0, 12).map((payment, index) => (
                                                    <div key={index} className="flex items-center space-x-2">
                                                        <span className="w-8 text-xs text-gray-600">M{payment.month}</span>
                                                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                                                            <div className="flex h-full">
                                                                <div
                                                                    className="bg-[#4A7C59]"
                                                                    style={{ width: `${(payment.principal / payment.emi) * 100}%` }}
                                                                ></div>
                                                                <div
                                                                    className="bg-orange-600"
                                                                    style={{ width: `${(payment.markup / payment.emi) * 100}%` }}
                                                                ></div>
                                                                <div
                                                                    className="bg-purple-600"
                                                                    style={{ width: `${(payment.insurance / payment.emi) * 100}%` }}
                                                                ></div>
                                                            </div>
                                                        </div>
                                                        <span className="w-16 text-xs text-gray-600">{formatNumber(payment.emi)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Summary Stats */}
                                        <div className="space-y-4">
                                            <div className="rounded-lg bg-green-50 p-4">
                                                <h5 className="font-semibold text-green-800">First Payment</h5>
                                                <div className="mt-2 text-sm text-green-700">
                                                    <p>Principal: {formatCurrency(calculations.schedule[0]?.principal || 0)}</p>
                                                    <p>Markup: {formatCurrency(calculations.schedule[0]?.markup || 0)}</p>
                                                    <p>Insurance: {formatCurrency(calculations.schedule[0]?.insurance || 0)}</p>
                                                </div>
                                            </div>

                                            <div className="rounded-lg bg-blue-50 p-4">
                                                <h5 className="font-semibold text-blue-800">Last Payment</h5>
                                                <div className="mt-2 text-sm text-blue-700">
                                                    <p>
                                                        Principal:{' '}
                                                        {formatCurrency(calculations.schedule[calculations.schedule.length - 1]?.principal || 0)}
                                                    </p>
                                                    <p>
                                                        Markup: {formatCurrency(calculations.schedule[calculations.schedule.length - 1]?.markup || 0)}
                                                    </p>
                                                    <p>
                                                        Insurance: {formatCurrency(calculations.schedule[calculations.schedule.length - 1]?.insurance || 0)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="rounded-lg bg-purple-50 p-4">
                                                <h5 className="font-semibold text-purple-800">Average Monthly</h5>
                                                <div className="mt-2 text-sm text-purple-700">
                                                    <p>Principal: {formatCurrency(calculations.financingAmount / tenure)}</p>
                                                    <p>Markup: {formatCurrency(calculations.totalMarkup / tenure)}</p>
                                                    <p>Insurance: {formatCurrency(calculations.totalInsurance / tenure)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Amortization Schedule - Show when results are calculated */}
                            {showResults && calculations.schedule.length > 0 && (
                                <div className="rounded-xl bg-white p-6 shadow-lg">
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                                        <FileSpreadsheet className="mr-2 inline h-5 w-5" />
                                        Payment Schedule
                                    </h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse overflow-hidden rounded-lg text-sm shadow-sm">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                                    <th className="border-r border-[#6B9B7A] p-4 text-left font-semibold text-white last:border-r-0">
                                                        Month
                                                    </th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white last:border-r-0">
                                                        Principal
                                                    </th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white last:border-r-0">
                                                        Markup
                                                    </th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white last:border-r-0">
                                                        Insurance
                                                    </th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white last:border-r-0">
                                                        Balance
                                                    </th>
                                                    <th className="p-4 text-right font-semibold text-white">Monthly Installment</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {calculations.schedule.map((payment, index) => (
                                                    <tr
                                                        key={payment.month}
                                                        className={`border-b border-gray-100 transition-colors hover:bg-green-50 ${
                                                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                        }`}
                                                    >
                                                        <td className="p-4 font-medium text-gray-900">{payment.month}</td>
                                                        <td className="p-4 text-right font-semibold text-[#4A7C59]">
                                                            {formatNumber(payment.principal)}
                                                        </td>
                                                        <td className="p-4 text-right font-semibold text-orange-600">
                                                            {formatNumber(payment.markup)}
                                                        </td>
                                                        <td className="p-4 text-right font-semibold text-purple-600">
                                                            {formatNumber(payment.insurance)}
                                                        </td>
                                                        <td className="p-4 text-right text-gray-700">{formatNumber(payment.balance)}</td>
                                                        <td className="bg-blue-50 p-4 text-right font-bold text-blue-600">
                                                            {formatNumber(payment.emi)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Summary row at bottom */}
                                    <div className="mt-4 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                                        <div
                                            className={`grid gap-4 text-center text-white ${
                                                selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name) 
                                                    ? 'grid-cols-2 md:grid-cols-5' 
                                                    : 'grid-cols-2 md:grid-cols-4'
                                            }`}
                                        >
                                            <div>
                                                <div className="text-sm opacity-90">Total Financing</div>
                                                <div className="text-lg font-bold">{formatCurrency(calculations.financingAmount)}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm opacity-90">Total Markup</div>
                                                <div className="text-lg font-bold">{formatCurrency(calculations.totalMarkup)}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm opacity-90">Total Insurance</div>
                                                <div className="text-lg font-bold">{formatCurrency(calculations.totalInsurance)}</div>
                                            </div>
                                            {selectedLoanType && shouldShowSecurityDeposit(selectedLoanType.name) && (
                                                <div>
                                                    <div className="text-sm opacity-90">Security Deposit</div>
                                                    <div className="text-lg font-bold">{formatCurrency(securityDeposit)}</div>
                                                </div>
                                            )}
                                            <div>
                                                <div className="text-sm opacity-90">Total Amount</div>
                                                <div className="text-lg font-bold">{formatCurrency(calculations.totalAmount)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="mt-12 rounded-xl border-l-4 border-yellow-400 bg-yellow-50 p-6">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-lg font-medium text-yellow-800">Important Note</h3>
                                <div className="mt-2 text-sm text-yellow-700">
                                    <p>
                                        This calculator provides estimates based on the inputs provided. Actual Islamic financing terms, markup rates,
                                        insurance premiums, and monthly installment amounts may vary based on your creditworthiness, bank policies, and market conditions.
                                        All financing products are Shariah-compliant. Please consult with our Islamic banking officers for accurate
                                        information and personalized financing offers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
}