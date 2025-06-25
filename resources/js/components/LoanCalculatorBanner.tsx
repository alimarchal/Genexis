import { Calculator, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface LoanCalculatorBannerProps {
    title?: string;
    description?: string;
    className?: string;
}

const LoanCalculatorBanner: React.FC<LoanCalculatorBannerProps> = ({ 
    title = "Calculate Your Loan",
    description = "Get instant EMI calculations and plan your financing with our advanced loan calculator",
    className = ""
}) => {
    return (
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#4A7C59] via-[#5D9973] to-[#6CAF7E] rounded-2xl shadow-2xl ${className}`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-full"></div>
                <div className="absolute top-1/2 -left-8 w-16 h-16 bg-white rounded-full"></div>
                <div className="absolute bottom-4 right-1/3 w-12 h-12 bg-white rounded-full"></div>
            </div>
            
            <div className="relative p-8 text-white">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                            <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                                <Calculator className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl lg:text-3xl font-bold">{title}</h3>
                        </div>
                        <p className="text-lg text-green-100 mb-6 max-w-2xl">
                            {description}
                        </p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 text-sm">
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <TrendingUp className="w-4 h-4" />
                                <span>Instant Results</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <Calculator className="w-4 h-4" />
                                <span>Multiple Loan Types</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <ArrowRight className="w-4 h-4" />
                                <span>Easy to Use</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="flex-shrink-0">
                        <Link
                            href="/loan-calculator"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#4A7C59] font-bold text-lg rounded-xl hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white/50"
                        >
                            <Calculator className="w-6 h-6" />
                            <span>Calculate Now</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanCalculatorBanner;
