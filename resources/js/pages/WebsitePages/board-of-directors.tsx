import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function BoardOfDirectors() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="mb-12">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
            </div>
        </div>
    );
}

// Set the persistent layout and page props
BoardOfDirectors.layout = (page: React.ReactNode) => <WebsiteLayout title="About Us - Board of Directors">{page}</WebsiteLayout>;
