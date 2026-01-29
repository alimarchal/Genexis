import WebsiteLayout from '@/layouts/WebsiteLayout';
import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { Banknote, Calculator, Calendar, ChevronDown, Download, FileSpreadsheet, Percent, PieChart, Printer, RotateCcw, Shield } from 'lucide-react';
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
    advance: {
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

export default function LoanCalculator({ loanTypes, currentRates, bankRates }: LoanCalculatorProps) {
    const [selectedLoanType, setSelectedLoanType] = useState<LoanType | null>(null);
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [securityDeposit, setSecurityDeposit] = useState<number>(0);
    const [tenure, setTenure] = useState<number>(12);
    const [interestRate, setInterestRate] = useState<number>(14.0); // New state for dynamic rate

    // Insurance (Single Input)
    const [insuranceType, setInsuranceType] = useState<'fixed' | 'percentage'>('fixed');
    const [insuranceAmount, setInsuranceAmount] = useState<number>(0);

    const [showResults, setShowResults] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    useEffect(() => {
        if (loanTypes.length > 0 && !selectedLoanType) {
            // Don't auto-select, let user choose
        }
    }, [loanTypes, selectedLoanType]);

    useEffect(() => {
        if (selectedLoanType) {
            setLoanAmount(selectedLoanType.minAmount);
            setSecurityDeposit(0);
            setTenure(selectedLoanType.minTenure);
            setInsuranceAmount(0);
            setShowResults(false);

            // Set default interest rate from bank rates or suggested rate
            const loanTypeKey = getLoanRateKey(selectedLoanType.name);
            const defaultRate = loanTypeKey ? bankRates.loan[loanTypeKey] : selectedLoanType.suggestedRate;
            setInterestRate(defaultRate);
        }
    }, [selectedLoanType, bankRates]);

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

    const shouldShowSecurityDeposit = (loanTypeName: string): boolean => {
        if (!loanTypeName) return false;
        const name = loanTypeName.toLowerCase();
        const noSecurityDepositTypes = ['advance salary', 'salary advance', 'student loan', 'personal loan', 'gold loan'];
        return !noSecurityDepositTypes.some((type) => name.includes(type.replace(' ', '')));
    };

    // Calculate advance insurance amount
    const calculateAdvanceInsurance = useMemo(() => {
        if (!selectedLoanType) return 0;

        if (insuranceType === 'fixed') {
            return insuranceAmount;
        } else {
            return (insuranceAmount / 100) * loanAmount;
        }
    }, [insuranceType, insuranceAmount, loanAmount, selectedLoanType]);

    // Calculate regular insurance using same input as advance insurance
    const calculateRegularInsurance = useMemo(() => {
        if (!selectedLoanType || tenure <= 12) return { total: 0, outstandingBalance: 0 };

        // Calculate outstanding balance after first year (12 months)
        const monthlyRate = interestRate / 100 / 12; // Use dynamic rate

        let balance = loanAmount;
        // Simulate first 12 months to get outstanding balance
        for (let month = 1; month <= 12; month++) {
            const interestPayment = balance * monthlyRate;
            const baseEmi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
            const principalPayment = baseEmi - interestPayment;
            balance = balance - principalPayment;
        }

        const outstandingBalance = balance;

        // Use same input as advance insurance but apply to outstanding balance
        let regularInsurance = 0;
        if (insuranceType === 'fixed') {
            regularInsurance = insuranceAmount;
        } else {
            regularInsurance = (insuranceAmount / 100) * outstandingBalance;
        }

        return {
            total: regularInsurance,
            outstandingBalance: outstandingBalance,
        };
    }, [insuranceType, insuranceAmount, loanAmount, tenure, selectedLoanType, interestRate]);

    // Calculate total insurance (advance + regular) and monthly distribution
    const calculateTotalInsurance = useMemo(() => {
        if (!selectedLoanType || tenure <= 12) return { monthly: 0, total: 0, advance: 0, regular: 0 };

        const advance = calculateAdvanceInsurance;
        const regular = calculateRegularInsurance.total;
        const total = advance + regular;
        const insuranceMonths = tenure - 12; // Exclude final year
        const monthlyInsurance = total / insuranceMonths;

        return {
            monthly: monthlyInsurance,
            total: total,
            advance: advance,
            regular: regular,
        };
    }, [calculateAdvanceInsurance, calculateRegularInsurance, tenure, selectedLoanType]);

    const handleCalculate = () => {
        setShowResults(true);
    };

    const handleReset = () => {
        setSelectedLoanType(null);
        setLoanAmount(0);
        setSecurityDeposit(0);
        setTenure(12);
        setInterestRate(14.0);
        setInsuranceType('fixed');
        setInsuranceAmount(0);
        setShowResults(false);
        setIsDropdownOpen(false);
    };

    const calculations = useMemo(() => {
        if (!showResults || !loanAmount || !tenure || !selectedLoanType) {
            return {
                emi: 0,
                totalAmount: 0,
                totalMarkup: 0,
                totalInsurance: 0,
                advanceInsurance: 0,
                regularInsurance: 0,
                schedule: [],
                financingAmount: 0,
                totalPrice: 0,
            };
        }

        const financingAmount = loanAmount;
        const totalPrice = loanAmount + securityDeposit;

        // Calculate insurance amounts
        const advanceInsurance = calculateAdvanceInsurance;
        const totalInsuranceData = calculateTotalInsurance;
        const totalInsurance = totalInsuranceData.total;

        if (financingAmount <= 0) {
            return {
                emi: totalInsuranceData.monthly,
                totalAmount: securityDeposit + totalInsurance,
                totalMarkup: 0,
                totalInsurance,
                advanceInsurance,
                regularInsurance: totalInsuranceData.regular,
                schedule: [],
                financingAmount: 0,
                totalPrice: securityDeposit + totalInsurance,
            };
        }

        // Use dynamic interest rate
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = tenure;

        // Base EMI calculation (without insurance)
        const baseEmi =
            (financingAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

        const totalMarkup = baseEmi * numberOfPayments - financingAmount;
        const totalAmount = baseEmi * numberOfPayments + securityDeposit + totalInsurance;

        // Generate amortization schedule
        let balance = financingAmount;
        const schedule: EMISchedule[] = [];

        for (let month = 1; month <= numberOfPayments; month++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = baseEmi - interestPayment;
            balance = balance - principalPayment;

            // Calculate insurance for this month
            let monthlyInsurance = 0;
            if (month <= numberOfPayments - 12) {
                // Total insurance distributed over months 1 to (tenure-12)
                monthlyInsurance = totalInsuranceData.monthly;
            }

            const totalEmi = baseEmi + monthlyInsurance;

            schedule.push({
                month,
                emi: Math.round(totalEmi),
                principal: Math.round(principalPayment),
                markup: Math.round(interestPayment),
                insurance: Math.round(monthlyInsurance),
                balance: Math.round(Math.max(0, balance)),
            });
        }

        // Calculate average EMI (base EMI + average monthly insurance)
        const avgMonthlyInsurance = totalInsuranceData.total / tenure;
        const avgEmi = baseEmi + avgMonthlyInsurance;

        return {
            emi: Math.round(avgEmi),
            totalAmount: Math.round(totalAmount),
            totalMarkup: Math.round(totalMarkup),
            totalInsurance: Math.round(totalInsurance),
            advanceInsurance: Math.round(advanceInsurance),
            regularInsurance: Math.round(totalInsuranceData.regular),
            schedule,
            financingAmount: Math.round(financingAmount),
            totalPrice: Math.round(totalPrice),
        };
    }, [loanAmount, securityDeposit, tenure, selectedLoanType, interestRate, showResults, calculateAdvanceInsurance, calculateTotalInsurance]);

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

    const generatePDF = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

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
                    <p><strong>Markup Rate:</strong> ${interestRate.toFixed(2)}% per annum</p>
                    <p><strong>Tenure:</strong> ${tenure} months</p>
                    <p><strong>Advance Insurance:</strong> ${formatCurrency(calculations.advanceInsurance)}</p>
                    <p><strong>Regular Insurance:</strong> ${formatCurrency(calculations.regularInsurance)}</p>
                </div>

                <div class="summary">
                    <div class="summary-card">
                        <h4>Average Monthly EMI</h4>
                        <p><strong>${formatCurrency(calculations.emi)}</strong></p>
                    </div>
                    <div class="summary-card">
                        <h4>Financing Amount</h4>
                        <p><strong>${formatCurrency(calculations.financingAmount)}</strong></p>
                    </div>
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
                    <p>Advance insurance is paid upfront. Total insurance (advance + regular) is distributed over months 1-${tenure - 12}. This calculator provides estimates based on inputs provided. Please consult with our Islamic banking officers for accurate information.</p>
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
                            Calculate your monthly installments with comprehensive insurance structure.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Calculator Form */}
                        <div className="lg:col-span-1">
                            <div className="rounded-xl bg-white p-8 shadow-lg">
                                <h2 className="mb-6 text-2xl font-bold text-gray-900">Calculate Your Loan</h2>

                                {/* Loan Type Selection */}
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
                                    />
                                </div>

                                {/* Security Deposit */}
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
                                        />
                                    </div>
                                )}

                                {/* Interest Rate Slider */}
                                <div className="mb-6">
                                    <label className="mb-3 block text-sm font-semibold text-gray-700">
                                        <Percent className="mr-2 inline h-4 w-4" />
                                        Markup Rate: {interestRate.toFixed(2)}% per annum
                                    </label>
                                    <input
                                        type="range"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        min="0.00"
                                        max="100.00"
                                        step="0.01"
                                        className="slider h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                    />
                                </div>

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
                                                    Fixed
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
                                        <div className="relative mb-3">
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
                                                <Percent className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                            )}
                                        </div>

                                        {/* Insurance Summary */}
                                        <div className="mt-3 rounded-lg bg-blue-50 p-3">
                                            <div className="text-sm text-blue-700">
                                                <p>
                                                    <strong>Advance Insurance:</strong> {formatCurrency(calculateAdvanceInsurance)}
                                                </p>
                                                <p>
                                                    <strong>Regular Insurance:</strong> {formatCurrency(calculateRegularInsurance.total)}
                                                </p>
                                                <p>
                                                    <strong>Total Insurance:</strong> {formatCurrency(calculateTotalInsurance.total)}
                                                </p>
                                                <p>
                                                    <strong>Monthly in EMI:</strong> {formatCurrency(calculateTotalInsurance.monthly)}
                                                </p>
                                                <p className="mt-1 text-xs text-blue-600">Same rate applied to loan amount and outstanding balance</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
                                    />
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
                            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Calculator className="mr-1 h-4 w-4 flex-shrink-0 text-[#4A7C59]" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Avg Monthly EMI</h3>
                                    </div>
                                    <p className="text-lg font-bold text-[#4A7C59]">{formatCurrency(calculations.emi)}</p>
                                </div>

                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Banknote className="mr-1 h-4 w-4 flex-shrink-0 text-green-600" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Finance Amount</h3>
                                    </div>
                                    <p className="text-lg font-bold text-green-600">{formatCurrency(calculations.financingAmount)}</p>
                                </div>

                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Percent className="mr-1 h-4 w-4 flex-shrink-0 text-orange-600" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Total Markup</h3>
                                    </div>
                                    <p className="text-lg font-bold text-orange-600">{formatCurrency(calculations.totalMarkup)}</p>
                                </div>

                                <div className="rounded-xl bg-white p-4 shadow-lg">
                                    <div className="mb-2 flex min-h-[1.5rem] items-center">
                                        <Shield className="mr-1 h-4 w-4 flex-shrink-0 text-purple-600" />
                                        <h3 className="text-xs font-semibold whitespace-nowrap text-gray-900">Total Insurance</h3>
                                    </div>
                                    <p className="text-lg font-bold text-purple-600">{formatCurrency(calculations.totalInsurance)}</p>
                                </div>
                            </div>

                            {/* Insurance Breakdown */}
                            {showResults && calculations.totalInsurance > 0 && (
                                <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
                                    <h3 className="mb-4 text-xl font-semibold text-gray-900">Insurance Breakdown</h3>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-lg bg-blue-50 p-4">
                                            <h4 className="font-semibold text-blue-800">Advance Insurance</h4>
                                            <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.advanceInsurance)}</p>
                                            <p className="text-sm text-blue-600">Paid upfront</p>
                                        </div>
                                        <div className="rounded-lg bg-green-50 p-4">
                                            <h4 className="font-semibold text-green-800">Regular Insurance</h4>
                                            <p className="text-2xl font-bold text-green-600">{formatCurrency(calculations.regularInsurance)}</p>
                                            <p className="text-sm text-green-600">Based on outstanding balance</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 rounded-lg bg-purple-50 p-4">
                                        <h4 className="font-semibold text-purple-800">Total Insurance Coverage</h4>
                                        <p className="text-2xl font-bold text-purple-600">{formatCurrency(calculations.totalInsurance)}</p>
                                        <p className="text-sm text-purple-600">Monthly in EMI: {formatCurrency(calculateTotalInsurance.monthly)}</p>
                                    </div>
                                </div>
                            )}

                            {/* Loan Breakdown Visual */}
                            {showResults && calculations.totalAmount > 0 && (
                                <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                                        <PieChart className="mr-2 inline h-5 w-5" />
                                        Loan Breakdown
                                    </h3>
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="flex justify-center">
                                            <div className="h-64 w-64">
                                                <Pie
                                                    data={{
                                                        labels: ['Financing Amount', 'Markup Amount', 'Insurance Amount'],
                                                        datasets: [
                                                            {
                                                                data: [
                                                                    calculations.financingAmount,
                                                                    calculations.totalMarkup,
                                                                    calculations.totalInsurance,
                                                                ],
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
                                                                        const total =
                                                                            calculations.financingAmount +
                                                                            calculations.totalMarkup +
                                                                            calculations.totalInsurance;
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
                                        <div className="space-y-4">
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
                                                                          (calculations.financingAmount +
                                                                              calculations.totalMarkup +
                                                                              calculations.totalInsurance)) *
                                                                      100
                                                                    : 100
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
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
                                                                          (calculations.financingAmount +
                                                                              calculations.totalMarkup +
                                                                              calculations.totalInsurance)) *
                                                                      100
                                                                    : 0
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
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
                                                                          (calculations.financingAmount +
                                                                              calculations.totalMarkup +
                                                                              calculations.totalInsurance)) *
                                                                      100
                                                                    : 0
                                                            }%`,
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Amortization Schedule */}
                            {showResults && calculations.schedule.length > 0 && (
                                <div className="rounded-xl bg-white p-6 shadow-lg">
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">
                                        <FileSpreadsheet className="mr-2 inline h-5 w-5" />
                                        Payment Schedule
                                    </h3>

                                    {/* Insurance Note */}
                                    <div className="mb-4 rounded-lg bg-yellow-50 p-4">
                                        <p className="text-sm text-yellow-800">
                                            <strong>Note:</strong> Advance insurance ({formatCurrency(calculations.advanceInsurance)}) paid upfront.
                                            Total insurance ({formatCurrency(calculations.totalInsurance)}) distributed over months 1-{tenure - 12}.
                                        </p>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full border-collapse overflow-hidden rounded-lg text-sm shadow-sm">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A]">
                                                    <th className="border-r border-[#6B9B7A] p-4 text-left font-semibold text-white">Month</th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white">Principal</th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white">Markup</th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white">Insurance</th>
                                                    <th className="border-r border-[#6B9B7A] p-4 text-right font-semibold text-white">Balance</th>
                                                    <th className="p-4 text-right font-semibold text-white">Monthly EMI</th>
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

                                    {/* Summary */}
                                    <div className="mt-4 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                                        <div className="grid grid-cols-2 gap-4 text-center text-white md:grid-cols-4">
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
                        <h3 className="text-lg font-medium text-yellow-800">Important Note</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                            <p>
                                Advance insurance is paid upfront. Total insurance (advance + regular) is distributed over months 1-{tenure - 12}.
                                This calculator provides estimates based on inputs provided. Actual terms may vary based on creditworthiness and bank
                                policies. Please consult with our Islamic banking officers for accurate information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
}
