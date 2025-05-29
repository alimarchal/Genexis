import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function HomePage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Your content here */}
            <h1>Hello</h1>
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