import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import TopNavbar from '@/components/topnavbar/top-nav-bar';
import Header from '@/components/header/header';
import Footer from '@/components/footer';
import { type BreadcrumbItem } from '@/types';
import BreadcrumbNav, { BreadcrumbNavExample } from '@/components/BreadcrumbNav';
import ExecutiveCard from '@/components/ExecutiveCard';

interface AppLayoutProps extends PropsWithChildren {
    title?: string;
    description?: string;
}



export default function AboutUs({ children, title, description }: AppLayoutProps) {
    return (
        <>
            <Head title="About Us" />
            <TopNavbar />
            <Header />
            <BreadcrumbNav items={[
                { label: 'About Us', href: '/about' },
                { label: 'Management', isActive: true }
            ]} />

            {/* Main Content */}
            <main className=" max-w-7xl mx-auto px-6 py-3">
                {children}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto">

                    <h1 className="text-2xl">
                        We will start from here.....
                    </h1>


                </div>


            </main >

            {/* Footer */}
            < Footer />


        </>
    );
}