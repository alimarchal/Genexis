import BankingAccountComponent from '@/components/BankingAccountComponent';
import CommercialFinance from '@/components/CommercialFinance';
import HomeRemittancePage from '@/components/HomeRemittance';
import LoanSchemes from '@/components/LoanSchemesComponent';
import ServicesPage from '@/components/Service';
import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function HomePage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome to Bank of Azad Jammu & Kashmir
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
                Experience banking excellence with our comprehensive range of services
                designed to meet your financial needs. From personal banking to commercial
                solutions, we're here to serve you.
            </p>


        </div>
    );
}

HomePage.layout = (page: any) => (
    <WebsiteLayout
        title="Home"
        breadcrumbs={[
            { label: 'Home', href: '/', isActive: true }
        ]}
    >
        {page}
    </WebsiteLayout>
);