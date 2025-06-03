import BodCard from '@/components/BodCard';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { usePage } from '@inertiajs/react';

interface BoardOfDirector {
    id: number;
    title: string | null;
    full_name: string;
    designation: string;
    short_description: string | null;
    full_biography: string | null;
    experience: string[] | null;
    achievements: string[] | null;
    image: string | null;
    sort_order: number;
    is_active: boolean;
    is_chairman: boolean;
}

interface BoardOfDirectorsProps {
    boardOfDirectors: BoardOfDirector[];
}

export default function BoardOfDirectors() {
    const { boardOfDirectors } = usePage<BoardOfDirectorsProps>().props;

    // Separate chairman from other directors
    const chairman = boardOfDirectors.find((member) => member.is_chairman);
    const directors = boardOfDirectors.filter((member) => !member.is_chairman);

    return (
        //
        <div className="mx-auto min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] px-6 py-8 ">
            {/* Page Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Board of Directors</h1>
                <p className="mx-auto max-w-3xl text-xl text-gray-600">
                    Meet our distinguished Board of Directors who provide strategic leadership and governance for the Bank of Azad Jammu & Kashmir.
                </p>
            </div>

            {/* Chairman Section */}
            {chairman && (
                <div className="mb-16">
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 text-3xl font-bold text-[#4A7C59]">Chairman</h2>
                        <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#4A7C59] to-[#F9B912]"></div>
                    </div>

                    <div className="flex justify-center">
                        <div className="max-w-md">
                            <BodCard boardMember={chairman} />
                        </div>
                    </div>
                </div>
            )}

            {/* Directors Section */}
            {directors.length > 0 && (
                <div className="mb-12">
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 text-3xl font-bold text-[#4A7C59]">Directors</h2>
                        <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#F9B912] to-[#4A7C59]"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {directors.map((member) => (
                            <BodCard key={member.id} boardMember={member} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

BoardOfDirectors.layout = (page: React.ReactNode) => <WebsiteLayout title="About Us - Board of Directors">{page}</WebsiteLayout>;
