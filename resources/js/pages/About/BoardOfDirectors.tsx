import WebsiteLayout from '@/layouts/WebsiteLayout';
import BodCard from '@/components/BodCard';
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
    const chairman = boardOfDirectors.find(member => member.is_chairman);
    const directors = boardOfDirectors.filter(member => !member.is_chairman);

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Page Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Board of Directors
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Meet our distinguished Board of Directors who provide strategic leadership
                    and governance for the Bank of Azad Jammu & Kashmir.
                </p>
            </div>

            {/* Chairman Section */}
            {chairman && (
                <div className="mb-16">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#4A7C59] mb-2">
                            Chairman
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#4A7C59] to-[#F9B912] mx-auto"></div>
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
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#4A7C59] mb-2">
                            Directors
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#F9B912] to-[#4A7C59] mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {directors.map((member) => (
                            <BodCard
                                key={member.id}
                                boardMember={member}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

BoardOfDirectors.layout = (page: any) => (
    <WebsiteLayout
        title="About Us - Board of Directors"
    >
        {page}
    </WebsiteLayout>
);