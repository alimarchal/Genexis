import { PropsWithChildren } from 'react';
import TopNavbar from '@/components/topnavbar/top-nav-bar';
import Header from '@/components/header/header';
import Footer from '@/components/footer';

interface AppLayoutProps extends PropsWithChildren {
    title?: string;
    description?: string;
}

export default function AppLayout({ children, title, description }: AppLayoutProps) {
    return (
        <>


            <div className="min-h-screen bg-white dark:bg-gray-900">

                <TopNavbar />
                <Header />
                {/* Main Content */}
                <main className="flex-1">
                    {children}
                    <h1>Hello About Us</h1>
                </main>

                {/* Footer */}
                <Footer />

            </div>
        </>
    );
}