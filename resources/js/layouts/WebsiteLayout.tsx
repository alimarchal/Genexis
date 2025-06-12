import BreadcrumbNav from '@/components/BreadcrumbNav';
import Footer from '@/components/footer';
import Header from '@/components/header/header';
import TopNavbar from '@/components/topnavbar/top-nav-bar';
import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface WebsiteLayoutProps extends PropsWithChildren {
    title: string;
    breadcrumbs?: Array<{
        label: string;
        href?: string;
        isActive?: boolean;
    }>;
}

export default function WebsiteLayout({ children, title, breadcrumbs = [] }: WebsiteLayoutProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { menu, autoBreadcrumbs } = usePage<any>().props;

    // Use manual breadcrumbs if provided, otherwise use auto breadcrumbs
    const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : autoBreadcrumbs;

    return (
        <>
            <Head title={title} />
            <TopNavbar />
            <Header menuItems={menu} />

            {finalBreadcrumbs.length > 0 && <BreadcrumbNav items={finalBreadcrumbs} />}

            {/* Main Content */}
            <div className="min-h-screen">{children}</div>

            {/* Footer */}
            <Footer />
        </>
    );
}
