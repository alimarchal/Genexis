import CommitteeCard from '@/components/CommitteeCard';
import WebsiteLayout from '@/layouts/WebsiteLayout';
import { usePage } from '@inertiajs/react';

interface Member {
    name: string;
    designation: string;
    image_url?: string | null;
    attachment?: string | null;
}

interface BodCommittee {
    id: number;
    name: string;
    description: string | null;
    chairman?: {
        name: string;
        designation: string;
        image_url?: string | null;
    } | null;
    secretary?: {
        name: string;
        type: 'board' | 'management';
        designation: string;
    } | null;
    board_members: Member[];
    management_members: Member[];
}

export default function BodCommittees() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { committees } = usePage<any>().props;

    return (
        <div className="mx-auto min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6] px-6 py-8">
            {/* Page Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-4xl font-bold text-gray-900">Board of Directors Committees</h1>
                <p className="mx-auto max-w-4xl text-xl text-gray-600">
                    Our Board of Directors operates through specialized committees that provide focused oversight and governance across key areas of
                    the Bank of Azad Jammu & Kashmir. Each committee brings together experienced leaders to ensure strategic direction and operational
                    excellence.
                </p>
            </div>

            {/* Committees Section */}
            {committees && committees.length > 0 ? (
                <div className="mb-12">
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 text-3xl font-bold text-[#4A7C59]">Our Committees</h2>
                        <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[#4A7C59] to-[#F9B912]"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 xl:grid-cols-3">
                        {committees.map((committee: BodCommittee) => (
                            <CommitteeCard key={committee.id} committee={committee} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="mb-12 text-center">
                    <div className="mx-auto max-w-md rounded-xl bg-white p-8 shadow-lg">
                        <div className="mb-4">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#4A7C59] to-[#6B9B7A]">
                                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h3 className="mb-2 text-xl font-bold text-[#4A7C59]">Committees Coming Soon</h3>
                        <p className="text-gray-600">
                            We are currently organizing our Board committees. Information about our specialized committees will be available here
                            soon.
                        </p>
                    </div>
                </div>
            )}

            {/* Additional Information Section */}
            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl bg-white p-8 shadow-lg">
                    <div className="mb-6 text-center">
                        <h2 className="mb-2 text-2xl font-bold text-[#4A7C59]">Committee Governance</h2>
                        <div className="mx-auto h-1 w-16 bg-gradient-to-r from-[#F9B912] to-[#4A7C59]"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div>
                            <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Committee Structure</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                    <span>Each committee is chaired by a Board member</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                    <span>Secretary positions filled by Board or Management</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                    <span>Regular meetings ensure continuous oversight</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                    <span>Focused expertise in specialized areas</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Key Focus Areas</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#4A7C59]"></div>
                                    <span>Strategic planning and oversight</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#4A7C59]"></div>
                                    <span>Risk management and compliance</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#4A7C59]"></div>
                                    <span>Financial performance monitoring</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#4A7C59]"></div>
                                    <span>Stakeholder engagement and governance</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-100 pt-6 text-center">
                        <p className="text-gray-600">
                            For more information about our governance structure and committees, please contact our{' '}
                            <a href="/contact-us" className="font-medium text-[#4A7C59] transition-colors hover:text-[#F9B912]">
                                Corporate Office
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

BodCommittees.layout = (page: React.ReactNode) => <WebsiteLayout title="About Us - Board of Directors Committees">{page}</WebsiteLayout>;
