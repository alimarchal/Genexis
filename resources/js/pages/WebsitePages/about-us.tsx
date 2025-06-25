import ExecutiveCard from '@/components/ExecutiveCard';
import WebsiteLayout from '@/layouts/WebsiteLayout';

interface ManagementMember {
    id: number;
    title: string;
    full_name: string;
    designation: string;
    description: string;
    attachment: string;
    attachment_url?: string;
    status: string;
}

interface AboutUsProps {
    management: ManagementMember[];
}

export default function AboutUs({ management }: AboutUsProps) {
    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="mb-8">
                <h1 className="mb-4 text-3xl font-bold text-gray-900">About Us</h1>
                <p className="text-lg text-gray-600">
                    Welcome to Bank of Azad Jammu & Kashmir. Meet our leadership team who are dedicated to providing exceptional banking services.
                </p>
            </div>

            <div className="mb-12">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">Our Management Team</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {management.map((member) => (
                        <ExecutiveCard
                            key={member.id}
                            name={`${member.title} ${member.full_name}`}
                            title={member.designation}
                            image={member.attachment_url || `/storage/${member.attachment}`}
                            description={member.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// Set the persistent layout and page props
AboutUs.layout = (page: React.ReactNode) => (
    <WebsiteLayout
        title="About Us"
        breadcrumbs={[
            { label: 'About Us', href: route('about') },
            { label: 'Management', isActive: true },
        ]}
    >
        {page}
    </WebsiteLayout>
);
