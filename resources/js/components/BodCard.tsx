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

    const {
        title,
        full_name,
        designation,
        short_description,
        full_biography,
        experience = [],
        achievements = [],
        image,
        is_chairman
    } = boardMember;

    const displayName = title ? `${title} ${full_name}` : full_name;
    const displayImage = image
        ? `/storage/${image}`
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face";

    const truncateText = (text: string, limit: number) => {
        return text && text.length > limit ? text.substring(0, limit) + '...' : text;
    };

    const shouldTruncate = short_description && short_description.length > 150;
    const truncatedDescription = shouldTruncate ? truncateText(short_description, 150) : short_description;

    return (
        <>
            <div className="w-full max-w-sm mx-auto">
                <div
                    className={`
                        relative bg-white rounded-xl overflow-hidden
                        shadow-lg hover:shadow-2xl
                        transform transition-all duration-500 ease-in-out
                        hover:-translate-y-2 hover:scale-105
                        border border-gray-100
                        cursor-pointer
                        ${is_chairman ? 'ring-2 ring-[#F9B912] ring-opacity-50' : ''}
                    `}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Chairman Badge */}
                    {is_chairman && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="bg-[#F9B912] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                                Chairman
                            </span>
                        </div>
                    )}

                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                        <div
                            className="
                                h-64 sm:h-72 md:h-80 bg-gradient-to-br 
                                from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A]
                                flex items-center justify-center
                                transition-all duration-500
                            "
                            style={{
                                boxShadow: isHovered
                                    ? 'inset 0 8px 32px rgba(74, 124, 89, 0.3), inset 0 -8px 32px rgba(249, 185, 18, 0.2)'
                                    : 'inset 0 4px 16px rgba(74, 124, 89, 0.2)'
                            }}
                        >
                            <img
                                src={displayImage}
                                alt={displayName}
                                className="
                                    w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48
                                    rounded-full object-cover
                                    border-4 border-white
                                    shadow-xl
                                    transform transition-all duration-500
                                    hover:scale-110 hover:border-[#F9B912]
                                "
                                style={{
                                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                                    boxShadow: isHovered
                                        ? '0 12px 40px rgba(0,0,0,0.2), 0 0 0 3px rgba(249, 185, 18, 0.5)'
                                        : '0 8px 25px rgba(0,0,0,0.15)'
                                }}
                            />
                        </div>

                        {/* Animated Overlay */}
                        <div
                            className={`
                                absolute inset-0 bg-gradient-to-t 
                                from-[#F9B912]/10 via-transparent to-transparent
                                transition-opacity duration-500
                                ${isHovered ? 'opacity-100' : 'opacity-0'}
                            `}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                        <div className="space-y-4">
                            {/* Name */}
                            <h3 className="
                                text-xl sm:text-2xl font-bold 
                                text-[#4A7C59]
                                transform transition-all duration-300
                                hover:text-[#F9B912]
                                text-center
                                min-h-[60px] flex items-center justify-center
                            ">
                                {displayName}
                            </h3>

                            {/* Designation */}
                            <div className="relative text-center">
                                <p className="
                                    text-sm sm:text-base font-semibold 
                                    text-gray-600
                                    transform transition-all duration-300
                                    min-h-[50px] flex items-center justify-center
                                ">
                                    {designation}
                                </p>
                                <div
                                    className={`
                                        absolute bottom-0 left-1/2 transform -translate-x-1/2
                                        h-0.5 bg-gradient-to-r from-[#4A7C59] to-[#F9B912]
                                        transition-all duration-500
                                        ${isHovered ? 'w-full' : 'w-0'}
                                    `}
                                />
                            </div>

                            {/* Description */}
                            <div className="text-left">
                                <div className="
                                    text-sm text-gray-500 leading-relaxed
                                    transform transition-all duration-300
                                    hover:text-gray-700
                                    min-h-[100px] flex items-start
                                ">
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
                            <div className="mt-4 pt-2 border-t border-gray-100 text-center">
                                <button
                                    onClick={() => setOpenModal(true)}
                                    className="text-xs text-[#4A7C59] font-medium opacity-70 hover:opacity-100 transition-all hover:text-[#F9B912]"
                                >
                                    View Profile →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Corner Accent */}
                    <div className="
                        absolute top-0 right-0 w-16 h-16
                        bg-gradient-to-bl from-[#F9B912] to-transparent
                        opacity-20
                        transform transition-all duration-500
                        hover:opacity-40 hover:scale-110
                    " />
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setOpenModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden z-10">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-4 relative">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={displayImage}
                                    alt={displayName}
                                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                                />
                                <div className="text-white">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-2xl font-bold">{displayName}</h2>
                                        {is_chairman && (
                                            <span className="bg-[#F9B912] text-white text-xs font-bold px-2 py-1 rounded-full">
                                                Chairman
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-[#F9B912] font-semibold">{designation}</p>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setOpenModal(false)}
                                className="absolute top-4 right-4 text-white hover:text-[#F9B912] transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="space-y-6">
                                {/* Biography */}
                                {full_biography && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#4A7C59] mb-3">Biography</h3>
                                        <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                                            {full_biography}
                                        </div>
                                    </div>
                                )}

                                {/* Experience */}
                                {experience && experience.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#4A7C59] mb-3">Key Experience</h3>
                                        <ul className="space-y-2">
                                            {experience.map((item, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-[#F9B912] rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Achievements */}
                                {achievements && achievements.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-[#4A7C59] mb-3">Notable Achievements</h3>
                                        <ul className="space-y-2">
                                            {achievements.map((item, index) => (
                                                <li key={index} className="flex items-start space-x-3">
                                                    <div className="w-2 h-2 bg-[#4A7C59] rounded-full mt-2 flex-shrink-0"></div>
                                                    <span className="text-gray-600">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
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