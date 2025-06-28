import { Link } from '@inertiajs/react';
import { Calculator, TrendingUp } from 'lucide-react';

interface LoanCalculatorButtonProps {
    className?: string;
    variant?: 'default' | 'floating' | 'banner';
}

const LoanCalculatorButton: React.FC<LoanCalculatorButtonProps> = ({ className = '', variant = 'default' }) => {
    const baseClasses =
        'inline-flex items-center justify-center gap-3 font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-lg';

    const variants = {
        default:
            'px-8 py-4 bg-gradient-to-r from-[#4A7C59] to-[#5D9973] text-white rounded-xl hover:from-[#3D6B4A] hover:to-[#4A7C59] hover:shadow-xl',
        floating:
            'fixed bottom-6 right-6 z-50 px-6 py-4 bg-gradient-to-r from-[#4A7C59] to-[#5D9973] text-white rounded-full hover:from-[#3D6B4A] hover:to-[#4A7C59] hover:shadow-2xl animate-pulse',
        banner: 'w-full max-w-md mx-auto px-8 py-6 bg-gradient-to-br from-[#4A7C59] via-[#5D9973] to-[#6CAF7E] text-white rounded-2xl hover:from-[#3D6B4A] hover:via-[#4A7C59] hover:to-[#5D9973] hover:shadow-2xl border border-green-200',
    };

    const iconSizes = {
        default: 'w-5 h-5',
        floating: 'w-6 h-6',
        banner: 'w-6 h-6',
    };

    const textSizes = {
        default: 'text-base',
        floating: 'text-sm',
        banner: 'text-lg',
    };

    return (
        <Link href="/loan-calculator" className={`${baseClasses} ${variants[variant]} ${textSizes[variant]} ${className}`}>
            <Calculator className={`${iconSizes[variant]} animate-bounce`} />
            <span className="font-bold">{variant === 'floating' ? 'Calculate' : 'Loan Calculator'}</span>
            <TrendingUp className={`${iconSizes[variant]} opacity-80`} />
        </Link>
    );
};

export default LoanCalculatorButton;
