import BankServicesSection from '@/components/BankServicesSection';
import BranchLocator from '@/components/BranchLocator';
import BankHeroCarousel from '@/components/carousel/BankHeroCarousel';
import CustomerTestimonials from '@/components/CustomerTestimonials';
import NewsAnnouncements from '@/components/NewsAnnouncements';
import QuickActionsHub from '@/components/QuickActionsHub';
import ServicesPage from '@/components/Service';
import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function HomePage() {
    return (
        <div className="w-full">
            <BankHeroCarousel />
            <BankServicesSection />
            <NewsAnnouncements />
            <CustomerTestimonials />

            {/* <div className="mx-auto max-w-7xl px-6 py-8">
                <h1 className="mb-6 text-3xl font-bold text-gray-900">Welcome to Bank of Azad Jammu & Kashmir</h1>
                <p className="text-lg leading-relaxed text-gray-700">
                    Experience banking excellence with our comprehensive range of services designed to meet your financial needs. From personal banking to
                    commercial solutions, we're here to serve you.
                </p>
            </div> */}
        </div>
    );
}

HomePage.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Home">
        {page}
    </WebsiteLayout>
);