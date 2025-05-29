import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Your content here */}
            <h1>Hello</h1>
        </div>
    );
}

AboutPage.layout = (page: any) => (
    <WebsiteLayout
        title="About Us"
        breadcrumbs={[
            { label: 'About Us', href: route('about'), isActive: true },
        ]}
    >
        {page}
    </WebsiteLayout>
);