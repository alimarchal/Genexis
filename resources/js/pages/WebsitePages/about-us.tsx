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
    managment?: any[];
}



export default function AboutUs({ children, title, description, managment }: AppLayoutProps & { managment: any[] }) {
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">

                    {managment.map((member, index) => (
                        <ExecutiveCard
                            key={index}
                            name={`${member.title} ${member.full_name}`}
                            title={member.designation}
                            image={member.attachment}
                            description={member.description}
                        />
                    ))}


                </div>


            </main >

            {/* Footer */}
            < Footer />


        </>
    );
}