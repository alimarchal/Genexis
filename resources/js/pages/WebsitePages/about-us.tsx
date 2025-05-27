import { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import TopNavbar from '@/components/topnavbar/top-nav-bar';
import Header from '@/components/header/header';
import Footer from '@/components/footer';

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
            {/* Main Content */}
            <main className="flex-1">
                {children}
                <h1 className=''>Hello About Us</h1>
            </main>

            {/* Footer */}
            <Footer />


        </>
    );
}