import WebsiteLayout from '@/layouts/WebsiteLayout';
import ExecutiveCard from '@/components/ExecutiveCard';

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
    managment: ManagementMember[];
}

export default function AboutUs({ managment }: AboutUsProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
                <p className="text-lg text-gray-600">
                    Welcome to Bank of Azad Jammu & Kashmir. Meet our leadership team who are dedicated to providing exceptional banking services.
                </p>
            </div>

            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Management Team</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {managment.map((member) => (
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
AboutUs.layout = (page: any) => (
    <WebsiteLayout
        title="About Us"
        breadcrumbs={[
            { label: 'About Us', href: '/about' },
            { label: 'Management', isActive: true }
        ]}
    >
        {page}
    </WebsiteLayout>
);