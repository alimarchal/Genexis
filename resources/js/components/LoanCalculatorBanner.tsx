import { Link } from '@inertiajs/react';
import { ArrowRight, Calculator, TrendingUp } from 'lucide-react';

interface LoanCalculatorBannerProps {
    title?: string;
    description?: string;
    className?: string;
}

const LoanCalculatorBanner: React.FC<LoanCalculatorBannerProps> = ({
    title = 'Calculate Your Loan',
    description = 'Get instant EMI calculations and plan your financing with our advanced loan calculator',
    className = '',
}) => {
    return (
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A7C59] via-[#5D9973] to-[#6CAF7E] shadow-2xl ${className}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white"></div>
                <div className="absolute top-1/2 -left-8 h-16 w-16 rounded-full bg-white"></div>
                <div className="absolute right-1/3 bottom-4 h-12 w-12 rounded-full bg-white"></div>
            </div>

            <div className="relative p-8 text-white">
                <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="mb-4 flex items-center justify-center gap-3 lg:justify-start">
                            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
                                <Calculator className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold lg:text-3xl">{title}</h3>
                        </div>
                        <p className="mb-6 max-w-2xl text-lg text-green-100">{description}</p>

                        {/* Features */}
                        <div className="mb-6 flex flex-wrap justify-center gap-4 text-sm lg:justify-start">
                            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                                <TrendingUp className="h-4 w-4" />
                                <span>Instant Results</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                                <Calculator className="h-4 w-4" />
                                <span>Multiple Loan Types</span>
                            </div>
                            <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                                <ArrowRight className="h-4 w-4" />
                                <span>Easy to Use</span>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/loan-calculator"
                            className="inline-flex transform items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-bold text-[#4A7C59] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-50 hover:shadow-xl focus:ring-4 focus:ring-white/50 focus:outline-none"
                        >
                            <Calculator className="h-6 w-6" />
                            <span>Calculate Now</span>
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculatorBanner;
