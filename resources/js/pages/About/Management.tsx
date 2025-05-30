// resources/js/pages/About/Management.tsx
import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function ManagementPage() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Management Team
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
                Meet our experienced management team leading the Bank of Azad Jammu & Kashmir
                towards excellence in banking services.
            </p>
        </div>
    );
}

// Notice: No manual breadcrumbs provided - auto breadcrumbs will be used
ManagementPage.layout = (page: any) => (
    <WebsiteLayout title="Management Team">
        {page}
    </WebsiteLayout>
);

// Alternative with manual breadcrumbs (this will override auto breadcrumbs):
/*
ManagementPage.layout = (page: any) => (
    <WebsiteLayout
        title="Management Team"
        breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'About Us', href: '/about' },
            { label: 'Management', isActive: true }
        ]}
    >
        {page}
    </WebsiteLayout>
);
*/