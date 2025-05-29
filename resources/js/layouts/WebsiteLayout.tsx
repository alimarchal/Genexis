import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import TopNavbar from '@/components/topnavbar/top-nav-bar';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import BreadcrumbNav from '@/components/BreadcrumbNav';

interface WebsiteLayoutProps extends PropsWithChildren {
    title: string;
    breadcrumbs?: Array<{
        label: string;
        href?: string;
        isActive?: boolean;
    }>;
}

export default function WebsiteLayout({ children, title, breadcrumbs = [] }: WebsiteLayoutProps) {
    return (
        <>
            <Head title={title} />
            <TopNavbar />
            <Header />

            {breadcrumbs.length > 0 && (
                <BreadcrumbNav items={breadcrumbs} />
            )}

            {/* Main Content */}
            <main className="min-h-screen">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

// Set the layout as persistent in Inertia
WebsiteLayout.layout = (page: any) => <WebsiteLayout {...page.props}>{page}</WebsiteLayout>;