import ServicesPage from '@/components/Service';
import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function AgricultureFinances() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                <ServicesPage />
            </div>
        </div>
    );
}

AgricultureFinances.layout = (page: React.ReactNode) => <WebsiteLayout title="Services">{page}</WebsiteLayout>;
