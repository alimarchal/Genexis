import BreadcrumbNav from '@/components/BreadcrumbNav';
import Footer from '@/components/footer';
import Header from '@/components/header/header';
import TopNavbar from '@/components/topnavbar/top-nav-bar';
import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

interface WebsiteLayoutProps extends PropsWithChildren {
    title: string;
    breadcrumbs?: Array<{
        label: string;
        href?: string;
        isActive?: boolean;
    }>;
}

interface SharedProps {
    menu: any;
    autoBreadcrumbs: any;
    bankBranchesCount: number;
    socialLinks: {
        facebook: string;
        twitter: string;
        instagram: string;
        linkedin: string;
        youtube: string;
    };
}

export default function WebsiteLayout({ children, title, breadcrumbs = [] }: WebsiteLayoutProps) {
    const { menu, autoBreadcrumbs, bankBranchesCount, socialLinks } = usePage<SharedProps>().props;
    const headerRef = useRef<HTMLDivElement>(null);
    const [headerHeight, setHeaderHeight] = useState(120);

    // Use manual breadcrumbs if provided, otherwise use auto breadcrumbs
    const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : autoBreadcrumbs;

    useEffect(() => {
        const updateHeaderHeight = () => {
            if (headerRef.current) {
                const height = headerRef.current.offsetHeight;
                setHeaderHeight(height);
            }
        };

        // Initial measurement
        updateHeaderHeight();

        // Update on window resize
        window.addEventListener('resize', updateHeaderHeight);
        
        // Update after a short delay to ensure all components are rendered
        const timer = setTimeout(updateHeaderHeight, 100);

        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
            clearTimeout(timer);
        };
    }, [finalBreadcrumbs.length]);

    return (
        <>
            <Head title={title} />
            
            {/* Fixed TopNavbar, Header, and Breadcrumb */}
            <div className="fixed top-0 left-0 right-0 z-50" ref={headerRef}>
                <TopNavbar />
                <Header menuItems={menu} />
                {finalBreadcrumbs.length > 0 && <BreadcrumbNav items={finalBreadcrumbs} />}
            </div>

            {/* Main Content with dynamic padding */}
            <div 
                className="min-h-screen" 
                style={{ paddingTop: `${headerHeight}px` }}
            >
                {children}
            </div>

            {/* Footer */}
            <Footer bankBranchesCount={bankBranchesCount} socialLinks={socialLinks} />
        </>
    );
}