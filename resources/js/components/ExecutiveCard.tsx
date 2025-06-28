import React, { useState } from 'react';

interface ExecutiveCardProps {
    name?: string;
    title?: string;
    designation?: string;
    image?: string;
    description?: string;
}

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({
    title = 'Mr.',
    name = 'Shahid Shahzad Mir',
    designation = 'President/CEO and CFO',
    image,
    description = 'Leading the bank with over 20 years of experience in financial services and strategic management.',
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Check if this person is a President
    const isPresident = designation?.toLowerCase().includes('president') || false;

    // Generate initials from name
    const getInitials = (fullName: string) => {
        if (!fullName) return 'NA';
        return fullName
            .split(' ')
            .map((part) => part.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');
    };

    // Generate dummy avatar URL using DiceBear
    const getDummyAvatar = (fullName: string) => {
        if (!fullName) return '';
        const seed = encodeURIComponent(fullName.toLowerCase().replace(/\s+/g, ''));
        return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&backgroundColor=4A7C59&textColor=ffffff`;
    };

    const initials = getInitials(name);
    const avatarUrl = image || getDummyAvatar(name);
    const shouldShowImage = (image && !imageError) || (!image && avatarUrl);

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className={`mx-auto w-full ${isPresident ? 'col-span-full mb-12 max-w-lg' : 'max-w-lg'}`}>
            {isPresident && (
                <div className="mb-4 text-center">
                    <h2 className="mb-2 text-3xl font-bold text-[#4A7C59]">Leadership</h2>
                    <p className="text-lg text-gray-600">Meet our organizational leader driving strategic vision and excellence</p>
                </div>
            )}
            <div
                className={`relative transform overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-2 hover:scale-105 hover:shadow-2xl ${
                    isPresident
                        ? 'border-[#F9B912]/50 bg-gradient-to-br from-white to-[#F9B912]/5 shadow-2xl ring-4 ring-[#F9B912]/50'
                        : 'border-gray-100 hover:border-[#4A7C59]/30'
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* President Badge */}
                {isPresident && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="rounded-full bg-[#F9B912] px-2 py-1 text-xs font-bold text-white shadow-md">President</span>
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
                        {shouldShowImage ? (
                            <img
                                src={avatarUrl}
                                alt={name || 'Executive'}
                                className="h-32 w-32 transform rounded-full border-4 border-white object-cover shadow-xl transition-all duration-500 hover:scale-110 hover:border-[#F9B912] sm:h-40 sm:w-40 md:h-48 md:w-48"
                                style={{
                                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                                    boxShadow: isHovered
                                        ? '0 12px 40px rgba(0,0,0,0.2), 0 0 0 3px rgba(249, 185, 18, 0.5)'
                                        : '0 8px 25px rgba(0,0,0,0.15)',
                                }}
                                onError={handleImageError}
                            />
                        ) : (
                            <div
                                className="flex h-32 w-32 transform items-center justify-center rounded-full border-4 border-white bg-white/20 text-4xl font-bold text-white shadow-xl transition-all duration-500 hover:scale-110 hover:border-[#F9B912] sm:h-40 sm:w-40 sm:text-5xl md:h-48 md:w-48 md:text-6xl"
                                style={{
                                    filter: isHovered ? 'brightness(1.1) contrast(1.05)' : 'brightness(1)',
                                    boxShadow: isHovered
                                        ? '0 12px 40px rgba(0,0,0,0.2), 0 0 0 3px rgba(249, 185, 18, 0.5)'
                                        : '0 8px 25px rgba(0,0,0,0.15)',
                                }}
                            >
                                {initials}
                            </div>
                        )}
                    </div>

                    {/* Animated Overlay */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'} `}
                    />
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                    <div className="space-y-4 text-center">
                        {/* Name */}
                        <h3 className="transform text-xl font-bold text-[#4A7C59] transition-all duration-300 hover:text-[#F9B912] sm:text-2xl">
                            {title || ''} {name || 'Name not available'}
                        </h3>

                        {/* Title */}
                        <div className="relative">
                            <p className="transform text-sm font-semibold text-gray-600 transition-all duration-300 sm:text-base">
                                {designation || 'Position not specified'}
                            </p>
                            <div
                                className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 transform bg-gradient-to-r from-[#4A7C59] to-[#F9B912] transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'} `}
                            />
                        </div>

                        {/* Description */}
                        {description && (
                            <p className="transform text-sm leading-relaxed text-gray-500 transition-all duration-300 hover:text-gray-700">
                                {description}
                            </p>
                        )}
                    </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 h-16 w-16 transform bg-gradient-to-bl from-[#F9B912] to-transparent opacity-20 transition-all duration-500 hover:scale-110 hover:opacity-40" />
            </div>
        </div>
    );
};

export default ExecutiveCard;
