import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

const AddressMarqueeSection = () => {
    const { contact_address } = usePage().props;
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    // Array of messages with different types and priorities
    const messages = [
        {
            id: 1,
            type: 'Achievement',
            priority: 'high',
            icon: '🏆',
            text: 'Bank of Azad Jammu and Kashmir achieved an operating profit of 2+ Billion Rupees in 2024 - Leading AJK\'s financial growth',
            color: 'from-emerald-500 to-green-600',
            bgColor: 'from-emerald-50 to-green-50'
        },
        {
            id: 2,
            type: 'Services',
            priority: 'urgent',
            icon: '💰',
            text: 'Enhanced Loan Limits: Gold loans up to 2 Million & Advance salary loans up to 3 Million from designated BAJK branches',
            color: 'from-blue-500 to-cyan-600',
            bgColor: 'from-blue-50 to-cyan-50'
        },
        {
            id: 3,
            type: 'Support',
            priority: 'high',
            icon: '📞',
            text: '24/7 Customer Support Available - Call UAN +92.300.8169925 - We\'re here to help you anytime, anywhere',
            color: 'from-purple-500 to-pink-600',
            bgColor: 'from-purple-50 to-pink-50'
        },
        {
            id: 4,
            type: 'Digital',
            priority: 'medium',
            icon: '📱',
            text: 'Experience Digital Banking - Download BAJK Mobile App for instant transactions, loan applications & account management',
            color: 'from-orange-500 to-red-600',
            bgColor: 'from-orange-50 to-red-50'
        },
        {
            id: 5,
            type: 'General',
            priority: 'medium',
            icon: '🏪',
            text: 'Serving Azad Kashmir with excellence - Visit our branches across the region for all your banking needs',
            color: 'from-teal-500 to-blue-600',
            bgColor: 'from-teal-50 to-blue-50'
        }
    ];

    // Auto-rotate messages every 12 seconds
    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setIsAnimating(true);
                setTimeout(() => {
                    setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
                    setIsAnimating(false);
                }, 400);
            }, 12000);

            return () => clearInterval(interval);
        }
    }, [isPaused, messages.length]);

    const currentMessage = messages[currentMessageIndex];

    const marqueeStyle = {
        animation: isPaused ? 'none' : 'marquee 20s linear infinite',
        WebkitAnimation: isPaused ? 'none' : 'marquee 20s linear infinite',
    };

    return (
        <>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                
                @keyframes fadeSlide {
                    0% {
                        opacity: 0;
                        transform: translateY(10px) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes iconBounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-2px) scale(1.05); }
                }
                
                @keyframes shimmer {
                    0% { 
                        background-position: -200% center;
                        opacity: 0.6;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% { 
                        background-position: 200% center;
                        opacity: 0.6;
                    }
                }
                
                @keyframes progress {
                    from { 
                        transform: scaleX(0);
                        opacity: 0.5;
                    }
                    to { 
                        transform: scaleX(1);
                        opacity: 1;
                    }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-2px); }
                }
                
                .message-transition {
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                }
                
                .message-enter {
                    animation: fadeSlide 0.6s ease-out;
                }
                
                .marquee-text:hover {
                    animation-play-state: paused !important;
                }
                
                .shimmer-effect {
                    background: linear-gradient(
                        90deg, 
                        transparent 0%, 
                        rgba(255,255,255,0.4) 40%,
                        rgba(255,255,255,0.6) 50%,
                        rgba(255,255,255,0.4) 60%,
                        transparent 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2.5s ease-in-out infinite;
                }
                
                .icon-bounce {
                    animation: iconBounce 3s ease-in-out infinite;
                }

                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }
                
                .priority-urgent {
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
                }
                
                .priority-high {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
                }
                
                .priority-medium {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
                }

                .glass-effect {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                }

                .gradient-border {
                    position: relative;
                    background: linear-gradient(white, white) padding-box,
                                linear-gradient(45deg, #e9f7ef, #fff7e6) border-box;
                    border: 1px solid transparent;
                }
            `}</style>

            <section className="relative border-b border-gray-200/60 bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] shadow-sm overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-50/40 via-white/20 to-orange-50/40"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.1),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.1),transparent_50%)]"></div>

                {/* Floating decorative elements */}
                <div className="absolute top-1 left-1/4 w-2 h-2 bg-green-400/30 rounded-full float-animation" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-2 right-1/3 w-1.5 h-1.5 bg-orange-400/30 rounded-full float-animation" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1 left-2/3 w-1 h-1 bg-blue-400/30 rounded-full float-animation" style={{ animationDelay: '4s' }}></div>

                <div className="relative px-2 pt-2 md:px-8 lg:px-10">
                    <div className="flex items-center gap-3 lg:gap-6">

                        {/* Left Section - Message Type Indicator */}
                        <div className="hidden sm:flex items-center gap-2 lg:gap-3 flex-shrink-0">
                            <div className={`flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br ${currentMessage.color} shadow-lg glass-effect`}>
                                <span className="text-white text-sm lg:text-base icon-bounce">
                                    {currentMessage.icon}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider leading-none">
                                    {currentMessage.type}
                                </span>
                                <div className={`mt-0.5 w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full priority-${currentMessage.priority} transition-all duration-300`}></div>
                            </div>
                        </div>

                        {/* Center Section - Marquee Text */}
                        <div className="flex-1 min-w-0 overflow-hidden">
                            <div className="relative">
                                {/* Enhanced Gradient Overlays */}
                                <div className="absolute left-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-r from-[#e9f7ef] to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-l from-[#fff7e6] to-transparent z-10 pointer-events-none"></div>

                                <div
                                    className={`marquee-text text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap text-gray-800 message-transition ${isAnimating ? 'opacity-60 scale-95' : 'opacity-100 scale-100'} ${!isAnimating ? 'message-enter' : ''}`}
                                    style={marqueeStyle}
                                    onMouseEnter={() => setIsPaused(true)}
                                    onMouseLeave={() => setIsPaused(false)}
                                >
                                    <span className="inline-block pr-8 lg:pr-12 relative">
                                        <span className="relative z-10 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent font-medium">
                                            {currentMessage.text}
                                        </span>
                                        {!isPaused && (
                                            <span className="absolute inset-0 shimmer-effect rounded-sm"></span>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Controls & Indicators */}
                        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                            {/* Message Dots Indicator */}
                            <div className="hidden sm:flex items-center gap-1">
                                {messages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setIsAnimating(true);
                                            setTimeout(() => {
                                                setCurrentMessageIndex(index);
                                                setIsAnimating(false);
                                            }, 200);
                                        }}
                                        className={`w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${index === currentMessageIndex
                                            ? `bg-gradient-to-r ${currentMessage.color} shadow-md scale-110`
                                            : 'bg-gray-300 hover:bg-gray-400 scale-100'
                                            }`}
                                        aria-label={`Show message ${index + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Pause/Play Button */}
                            <button
                                onClick={() => setIsPaused(!isPaused)}
                                className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-white/90 shadow-md border border-gray-200/50 hover:shadow-lg transition-all duration-200 hover:scale-105 group glass-effect"
                                aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
                            >
                                {isPaused ? (
                                    <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-green-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-orange-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>

                            {/* Next Message Button */}
                            <button
                                onClick={() => {
                                    setIsAnimating(true);
                                    setTimeout(() => {
                                        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
                                        setIsAnimating(false);
                                    }, 200);
                                }}
                                className="flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                                aria-label="Next message"
                            >
                                <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="mt-1.5 h-0.5 bg-gray-200/60 rounded-full overflow-hidden relative">
                        <div
                            className={`h-full bg-gradient-to-r ${currentMessage.color} transition-all duration-300 ${isPaused ? 'w-0' : 'w-full'} relative overflow-hidden`}
                            style={{
                                animation: isPaused ? 'none' : 'progress 12s linear infinite',
                                transform: isPaused ? 'scaleX(0)' : 'scaleX(1)',
                                transformOrigin: 'left'
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddressMarqueeSection;