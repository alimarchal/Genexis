import ExecutiveCard from '@/components/ExecutiveCard';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { usePage } from '@inertiajs/react';

interface ManagementMember {
    id: number;
    title: string;
    full_name: string;
    designation: string;
    description: string;
    attachment: string | null;
    status: string;
}

export default function ManagementPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { management } = usePage<any>().props;

    return (
        <div className="mx-auto min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] px-6 py-8">
            {/* <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Management Team
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
                Meet our experienced management team leading the Bank of Azad Jammu & Kashmir
                towards excellence in banking services.
            </p> */}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {management.map((member: ManagementMember) => (
                    <ExecutiveCard
                        key={member.id}
                        name={member.full_name}
                        title={member.designation}
                        image={member.attachment ? `/storage/${member.attachment}` : undefined}
                        description={member.description}
                    />
                ))}
            </div>
        </div>
    );
}

ManagementPage.layout = (page: React.ReactNode) => <WebsiteLayout title="Management Team">{page}</WebsiteLayout>;
