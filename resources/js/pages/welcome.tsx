import BankServicesSection from '@/components/BankServicesSection';
import BankHeroCarousel from '@/components/carousel/BankHeroCarousel';
import CustomerTestimonials from '@/components/CustomerTestimonials';
import NewsAnnouncements from '@/components/NewsAnnouncements';
import WebsiteLayout from '@/layouts/WebsiteLayout';

interface CarouselSlide {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
}

interface Props {
    carousels: CarouselSlide[];
}

export default function HomePage({ carousels }: Props) {
    return (
        <div className="w-full">
            <BankHeroCarousel slides={carousels} />
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

HomePage.layout = (page: React.ReactNode) => <WebsiteLayout title="Home">{page}</WebsiteLayout>;
