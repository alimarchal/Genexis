import React, { useState } from 'react';

interface ExecutiveCardProps {
    name?: string;
    title?: string;
    image?: string;
    description?: string;
}

const ExecutiveCard: React.FC<ExecutiveCardProps> = ({
    name = "Mr. Shahid Shahzad Mir",
    title = "President/CEO and CFO",
    image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description = "Leading the bank with over 20 years of experience in financial services and strategic management."
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="w-full max-w-sm mx-auto">
            <div
                className="
                    relative bg-white rounded-xl overflow-hidden
                    shadow-lg hover:shadow-2xl
                    transform transition-all duration-500 ease-in-out
                    hover:-translate-y-2 hover:scale-105
                    border border-gray-100
                "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
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
                            src={image}
                            alt={name}
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
                    <div className="text-center space-y-4">
                        {/* Name */}
                        <h3 className="
                            text-xl sm:text-2xl font-bold 
                            text-[#4A7C59]
                            transform transition-all duration-300
                            hover:text-[#F9B912]
                        ">
                            {name}
                        </h3>

                        {/* Title */}
                        <div className="relative">
                            <p className="
                                text-sm sm:text-base font-semibold 
                                text-gray-600
                                transform transition-all duration-300
                            ">
                                {title}
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
                        <p className="
                            text-sm text-gray-500 leading-relaxed
                            transform transition-all duration-300
                            hover:text-gray-700
                        ">
                            {description}
                        </p>


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
    );
};

export default ExecutiveCard;