import React, { useState } from 'react';

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

interface BodCardProps {
    boardMember: BoardOfDirector;
}

const BodCard: React.FC<BodCardProps> = ({ boardMember }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const { title, full_name, designation, short_description, full_biography, experience = [], achievements = [], image, is_chairman } = boardMember;

    const displayName = title ? `${title} ${full_name}` : full_name;
    const displayImage = image ? `/storage/${image}` : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face';

    const truncateText = (text: string, limit: number) => {
        return text && text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    const shouldTruncate = short_description && short_description.length > 150;
    const truncatedDescription = shouldTruncate ? truncateText(short_description, 150) : short_description;

    return (
        <>
            <div className="mx-auto w-full max-w-sm">
                <div
                    className={`relative transform cursor-pointer overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl ${is_chairman ? 'ring-opacity-50 ring-2 ring-[#F9B912]' : ''} `}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Chairman Badge */}
                    {is_chairman && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="rounded-full bg-[#F9B912] px-2 py-1 text-xs font-bold text-white shadow-md">Chairman</span>
                        </div>
                    )}

                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex h-64 items-center justify-center bg-gradient-to-br from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] transition-all duration-500 sm:h-72 md:h-80"
                            style={{
                                boxShadow: isHovered
                                    ? 'inset 0 8px 32px rgba(74, 124, 89, 0.3), inset 0 -8px 32px rgba(249, 185, 18, 0.2)'
                                    : 'inset 0 4px 16px rgba(74, 124, 89, 0.2)',
                            }}
                        >
                            <img
                                src={displayImage}
                                alt={displayName}
                                className="h-32 w-32 transform rounded-full border-4 border-white object-cover shadow-xl transition-all duration-500 hover:scale-110 hover:border-[#F9B912] sm:h-40 sm:w-40 md:h-48 md:w-48"
                                style={{
                                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                                    boxShadow: isHovered
                                        ? '0 12px 40px rgba(0,0,0,0.2), 0 0 0 3px rgba(249, 185, 18, 0.5)'
                                        : '0 8px 25px rgba(0,0,0,0.15)',
                                }}
                            />
                        </div>

                        {/* Animated Overlay */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'} `}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        <div className="space-y-4">
                            {/* Name */}
                            <h3 className="flex min-h-[60px] transform items-center justify-center text-center text-xl font-bold text-[#4A7C59] transition-all duration-300 hover:text-[#F9B912] sm:text-2xl">
                                {displayName}
                            </h3>

                            {/* Designation */}
                            <div className="relative text-center">
                                <p className="flex min-h-[50px] transform items-center justify-center text-sm font-semibold text-gray-600 transition-all duration-300 sm:text-base">
                                    {designation}
                                </p>
                                <div
                                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 transform bg-gradient-to-r from-[#4A7C59] to-[#F9B912] transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'} `}
                                />
                            </div>

                            {/* Description */}
                            <div className="text-left">
                                <div className="flex min-h-[100px] transform items-start text-sm leading-relaxed text-gray-500 transition-all duration-300 hover:text-gray-700">
                                    {short_description && shouldTruncate ? (
                                        <span>{truncatedDescription}</span>
                                    ) : short_description ? (
                                        <span>{short_description}</span>
                                    ) : (
                                        <span>Click to view full profile and achievements.</span>
                                    )}
                                </div>
                            </div>

                            {/* View Profile Button */}
                            <div className="mt-4 border-t border-gray-100 pt-2 text-center">
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="text-xs font-medium text-[#4A7C59] opacity-70 transition-all hover:text-[#F9B912] hover:opacity-100"
                                >
                                    View Profile →
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
                    <div className="relative z-10 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={displayImage}
                                    alt={displayName}
                                    className="h-16 w-16 rounded-full border-3 border-white object-cover shadow-lg"
                                />
                                <div className="text-white">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold">{displayName}</h2>
                                        {is_chairman && (
                                            <span className="rounded-full bg-[#F9B912] px-2 py-1 text-xs font-bold text-white">Chairman</span>
                                        )}
                                    </div>
                                    <p className="font-semibold text-[#F9B912]">{designation}</p>
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
                                {/* Biography */}
                                {full_biography && (
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Biography</h3>
                                        <div className="leading-relaxed whitespace-pre-line text-gray-600">{full_biography}</div>
                                    </div>
                                )}

                                {/* Experience */}
                                {experience && experience.length > 0 && (
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Key Experience</h3>
                                        <ul className="space-y-2">
                                            {experience.map((item, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                                    <span className="text-gray-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Achievements */}
                                {achievements && achievements.length > 0 && (
                                    <div>
                                        <h3 className="mb-3 text-lg font-semibold text-[#4A7C59]">Notable Achievements</h3>
                                        <ul className="space-y-2">
                                            {achievements.map((item, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#4A7C59]"></div>
                                                    <span className="text-gray-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
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

export default BodCard;
