import React, { useState } from 'react';

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

interface CommitteeCardProps {
    committee: BodCommittee;
}

const CommitteeCard: React.FC<CommitteeCardProps> = ({ committee }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { name, description, chairman, secretary, board_members = [], management_members = [] } = committee;

    const allMembers = [...board_members, ...management_members];

    // Generate initials from committee name
    const getInitials = (committeeName: string) => {
        if (!committeeName) return 'C';
        return committeeName
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    };

    const initials = getInitials(name);

    const getMemberDisplayName = (member: Member) => {
        return member.name;
    };

    return (
        <>
            <div className="mx-auto w-full max-w-xl">
                <div
                    className={`relative transform cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setOpenModal(true)}
                >
                    {/* Committee Icon/Initials */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex h-48 items-center justify-center bg-gradient-to-br from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] transition-all duration-500"
                            style={{
                                boxShadow: isHovered
                                    ? 'inset 0 8px 32px rgba(74, 124, 89, 0.3), inset 0 -8px 32px rgba(249, 185, 18, 0.2)'
                                    : 'inset 0 4px 16px rgba(74, 124, 89, 0.2)',
                            }}
                        >
                            <div
                                className="flex h-24 w-24 transform items-center justify-center rounded-full border-4 border-white bg-white/20 text-3xl font-bold text-white shadow-xl transition-all duration-500 hover:scale-110 hover:border-[#F9B912]"
                                style={{
                                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                                    boxShadow: isHovered
                                        ? '0 12px 40px rgba(0,0,0,0.2), 0 0 0 3px rgba(249, 185, 18, 0.5)'
                                        : '0 8px 25px rgba(0,0,0,0.15)',
                                }}
                            >
                                {initials}
                            </div>
                        </div>

                        {/* Animated Overlay */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="space-y-4">
                            {/* Committee Name */}
                            <h3 className="flex min-h-[40px] transform items-center justify-center text-center text-xl font-bold text-[#4A7C59] transition-all duration-300 hover:text-[#F9B912]">
                                {name}
                            </h3>

                            {/* Chairman */}
                            {chairman && (
                                <div className="text-center">
                                    <p className="text-sm font-semibold text-gray-600">
                                        Chairman: <span className="text-sm font-medium text-[#4A7C59]">{getMemberDisplayName(chairman)}</span>
                                    </p>
                                </div>
                            )}

                            {/* Description */}
                            <div className="text-left">
                                <div className="flex min-h-[40px] transform items-start text-sm leading-relaxed text-gray-500 transition-all duration-300 hover:text-gray-700">
                                    {description ? (
                                        <span>{description.length > 120 ? `${description.substring(0, 120)}...` : description}</span>
                                    ) : (
                                        <span>Click to view committee details and members.</span>
                                    )}
                                </div>
                            </div>

                            {/* Members Count */}
                            <div className="flex items-center justify-between text-xs text-gray-600">
                                <span>Members: {allMembers.length}</span>
                            </div>

                            {/* View Details Button */}
                            <div className="mt-4 border-t border-gray-100 pt-2 text-center">
                                <button className="text-xs font-medium text-[#4A7C59] opacity-70 transition-all hover:text-[#F9B912] hover:opacity-100">
                                    View Details →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 h-16 w-16 transform bg-gradient-to-bl from-[#F9B912] to-transparent opacity-20 transition-all duration-500 hover:scale-110 hover:opacity-40" />
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div className="bg-opacity-50 absolute inset-0 bg-black backdrop-blur-sm" onClick={() => setOpenModal(false)} />

                    {/* Modal Content */}
                    <div className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-4">
                            <div className="flex items-center space-x-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full border-3 border-white bg-white/20 text-xl font-bold text-white shadow-lg">
                                    {initials}
                                </div>
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold">{name}</h2>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setOpenModal(false)}
                                className="absolute top-4 right-4 text-white transition-colors hover:text-[#F9B912]"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="max-h-[60vh] overflow-y-auto p-6">
                            <div className="space-y-6">
                                {/* Description */}
                                {description && (
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">About This Committee</h3>
                                        <div className="leading-relaxed whitespace-pre-line text-gray-600">{description}</div>
                                    </div>
                                )}

                                {/* Committee Leadership */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Chairman */}
                                    {chairman && (
                                        <div>
                                            <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Chairman</h3>
                                            <div className="rounded-lg bg-gray-50 p-4">
                                                <p className="font-semibold text-gray-800">{getMemberDisplayName(chairman)}</p>
                                                <p className="text-sm text-gray-600">{chairman.designation}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Secretary */}
                                    {secretary && (
                                        <div>
                                            <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Secretary</h3>
                                            <div className="rounded-lg bg-gray-50 p-4">
                                                <p className="font-semibold text-gray-800">{getMemberDisplayName(secretary)}</p>
                                                <p className="text-sm text-gray-600">{secretary.designation}</p>
                                                <p className="mt-1 text-xs text-gray-500">
                                                    ({secretary.type === 'board' ? 'Board Member' : 'Management'})
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Committee Members */}
                                {allMembers.length > 0 && (
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Committee Members</h3>
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            {board_members.length > 0 && (
                                                <div>
                                                    <h4 className="text-md mb-2 font-medium text-gray-700">Board Members</h4>
                                                    <div className="space-y-2">
                                                        {board_members.map((member, index) => (
                                                            <div key={index} className="rounded-lg bg-blue-50 p-3">
                                                                <p className="font-medium text-gray-800">{getMemberDisplayName(member)}</p>
                                                                <p className="text-sm text-gray-600">{member.designation}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {management_members.length > 0 && (
                                                <div>
                                                    <h4 className="text-md mb-2 font-medium text-gray-700">Management Members</h4>
                                                    <div className="space-y-2">
                                                        {management_members.map((member, index) => (
                                                            <div key={index} className="rounded-lg bg-green-50 p-3">
                                                                <p className="font-medium text-gray-800">{getMemberDisplayName(member)}</p>
                                                                <p className="text-sm text-gray-600">{member.designation}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end space-x-3 bg-gray-50 px-6 py-4">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="rounded-lg bg-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CommitteeCard;
