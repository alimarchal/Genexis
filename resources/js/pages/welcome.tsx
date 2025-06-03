import ServicesPage from '@/components/Service';
import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function HomePage() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <h1 className="mb-6 text-3xl font-bold text-gray-900">Welcome to Bank of Azad Jammu & Kashmir</h1>
            <p className="text-lg leading-relaxed text-gray-700">
                Experience banking excellence with our comprehensive range of services designed to meet your financial needs. From personal banking to
                commercial solutions, we're here to serve you.
            </p>

            <ServicesPage />
        </div>
    );
}

HomePage.layout = (page: any) => (
    <WebsiteLayout title="Home" breadcrumbs={[{ label: 'Home', href: '/', isActive: true }]}>
        {page}
    </WebsiteLayout>
);
