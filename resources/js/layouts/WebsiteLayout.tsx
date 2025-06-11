import BreadcrumbNav from '@/components/BreadcrumbNav';
import Footer from '@/components/footer';
import Header from '@/components/header/header';
import TopNavbar from '@/components/topnavbar/top-nav-bar';
import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface MenuItem {
    id: number;
    title: string;
    url: string;
    target: string;
    icon?: string;
    cssClass?: string;
    isActive: boolean;
    hasChildren: boolean;
    isMegaMenu: boolean;
    children: MenuItem[];
}

interface WebsiteLayoutProps extends PropsWithChildren {
    title: string;
    breadcrumbs?: Array<{
        label: string;
        href?: string;
        isActive?: boolean;
    }>;
}

interface PageProps {
    menu: MenuItem[];
    autoBreadcrumbs: Array<{
        label: string;
        href?: string;
        isActive?: boolean;
    }>;
}

export default function WebsiteLayout({ children, title, breadcrumbs = [] }: WebsiteLayoutProps) {
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
