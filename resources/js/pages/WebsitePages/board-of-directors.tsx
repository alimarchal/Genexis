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

interface BoardOfDirectorsProps {
    managment: ManagementMember[];
}

export default function BoardOfDirectors({ managment }: BoardOfDirectorsProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-12">
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
BoardOfDirectors.layout = (page: any) => (
    <WebsiteLayout
        title="About Us"
        breadcrumbs={[
            { label: 'About Us', href: route('about') },
            { label: 'Board of Directors (BOD)', isActive: true }
        ]}
    >
        {page}
    </WebsiteLayout>
);