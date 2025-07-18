import BankServicesSection from '@/components/BankServicesSection';
import BankHeroCarousel from '@/components/carousel/BankHeroCarousel';
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

interface BankService {
    id: number;
    title: string;
    description: string;
    icon: string;
    products: string[];
    cta_text: string;
    cta_link: string;
    color: string;
    benefits: string[];
    service_type: 'service' | 'stat' | 'deposit';
    stat_number?: string;
    stat_label?: string;
    stat_description?: string;
}

interface NewsAnnouncement {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    image: string | null;
    image_url: string | null;
    published_date: string;
    is_featured: boolean;
    category: string;
    slug: string;
    is_published: boolean;
    created_at: string;
}

interface Props {
    carousels: CarouselSlide[];
    bankServices: BankService[];
    newsAnnouncements: NewsAnnouncement[];
}

export default function HomePage({ carousels, bankServices, newsAnnouncements }: Props) {
    return (
        <div className="w-full">
            <BankHeroCarousel slides={carousels} />
            <BankServicesSection bankServices={bankServices} />
            <NewsAnnouncements newsAnnouncements={newsAnnouncements} />
            {/* Uncomment the following line to include customer testimonials section */}
            {/* <CustomerTestimonials /> */}

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
