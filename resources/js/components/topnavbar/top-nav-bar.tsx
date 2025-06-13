import { useState, useEffect, useRef, useCallback } from 'react';

const AddressMarqueeSection = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(12);
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const animationTimeoutRef = useRef(null);
    const intervalRef = useRef(null);

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

    // Calculate animation duration based on text length
    const calculateDuration = useCallback(() => {
        if (textRef.current && containerRef.current) {
            const textWidth = textRef.current.scrollWidth;
            const containerWidth = containerRef.current.offsetWidth;
            const totalDistance = textWidth + containerWidth;

            // Slower speed for better readability (60 pixels per second)
            const pixelsPerSecond = 60;
            const calculatedDuration = Math.max(8, totalDistance / pixelsPerSecond);

            setAnimationDuration(calculatedDuration);
        }
    }, []);

    // Effect for calculating animation duration with proper timing
    useEffect(() => {
        const calculateWithDelay = () => {
            // Multiple attempts to ensure accurate measurement
            setTimeout(calculateDuration, 50);
            setTimeout(calculateDuration, 150);
            setTimeout(calculateDuration, 300);
        };

        calculateWithDelay();

        const handleResize = () => calculateWithDelay();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [currentMessageIndex, calculateDuration]);

    // Function to change message with smooth transition
    const changeMessage = useCallback((targetIndex = null) => {
        if (isAnimating) return; // Prevent double animation

        setIsAnimating(true);

        // Clear any existing timeouts
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        // Immediate change for smoother transition
        if (targetIndex !== null) {
            setCurrentMessageIndex(targetIndex);
        } else {
            setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }

        // Quick transition
        animationTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
        }, 150);
    }, [isAnimating, messages.length]);

    // Auto-rotate messages
    useEffect(() => {
        if (!isPaused && !isAnimating) {
            intervalRef.current = setInterval(() => {
                changeMessage();
            }, animationDuration * 1000); // Exact sync with animation duration

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [isPaused, isAnimating, animationDuration, changeMessage]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const currentMessage = messages[currentMessageIndex];

    const handleNextMessage = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        changeMessage();
    };

    const handleDotClick = (index) => {
        if (index === currentMessageIndex) return;

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        changeMessage(index);
    };

    const handlePauseToggle = () => {
        setIsPaused(!isPaused);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };

    return (
        <>
            <style>{`
                @keyframes marquee {
                    0% { 
                        transform: translateX(100%); 
                    }
                    100% { 
                        transform: translateX(-100%); 
                    }
                }
                
                @keyframes fadeSlideIn {
                    0% {
                        opacity: 0;
                        transform: translateY(4px) scale(0.98);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes fadeOut {
                    0% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0.3;
                        transform: scale(0.98);
                    }
                }
                
                @keyframes iconPulse {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: scale(1.1);
                        opacity: 0.8;
                    }
                }
                
                @keyframes shimmer {
                    0% { 
                        background-position: -200% center;
                    }
                    100% { 
                        background-position: 200% center;
                    }
                }
                
                @keyframes progressBar {
                    0% { 
                        transform: scaleX(0);
                    }
                    100% { 
                        transform: scaleX(1);
                    }
                }
                
                .marquee-text {
                    animation-play-state: running;
                    animation-fill-mode: forwards;
                }
                
                .marquee-text:hover {
                    animation-play-state: paused;
                }
                
                .marquee-paused {
                    animation-play-state: paused !important;
                }
                
                .message-transition {
                    transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .message-enter {
                    animation: fadeSlideIn 0.3s ease-out;
                }
                
                .message-exit {
                    animation: fadeOut 0.15s ease-in;
                }
                
                .shimmer-effect {
                    background: linear-gradient(
                        90deg, 
                        transparent 0%, 
                        rgba(255,255,255,0.4) 50%,
                        transparent 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s ease-in-out infinite;
                }
                
                .icon-pulse {
                    animation: iconPulse 3s ease-in-out infinite;
                }
                
                .priority-urgent {
                    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                    box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
                }
                
                .priority-high {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                    box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
                }
                
                .priority-medium {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
                }

                .glass-effect {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .progress-bar {
                    transform-origin: left;
                    animation: progressBar linear forwards;
                }

                @media (prefers-reduced-motion: reduce) {
                    .marquee-text {
                        animation: none;
                        transform: none;
                    }
                    .icon-pulse {
                        animation: none;
                    }
                    .shimmer-effect {
                        animation: none;
                    }
                }
            `}</style>

            <section
                className="relative bg-gradient-to-r from-[#e9f7ef] to-[#fff7e6] shadow-lg overflow-hidden"
                role="banner"
                aria-label="Bank announcements and services"
            >
                {/* Background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-50/30 via-white/20 to-orange-50/30"></div>

                <div className="relative px-4 py-1 md:px-8 lg:px-10">
                    <div className="flex items-center gap-3 lg:gap-4">

                        {/* Message Type Indicator */}
                        <div className="hidden sm:flex items-center gap-2 lg:gap-3 flex-shrink-0">
                            <div className={`flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br ${currentMessage.color} glass-effect shadow-sm`}>
                                <span className="text-white text-sm lg:text-base icon-pulse">
                                    {currentMessage.icon}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] lg:text-xs font-bold text-gray-700 uppercase tracking-wider leading-none">
                                    {currentMessage.type}
                                </span>
                                <div className={`mt-1 w-2 h-1 lg:w-3 lg:h-1 rounded-full priority-${currentMessage.priority} transition-all duration-300`}></div>
                            </div>
                        </div>

                        {/* Marquee Text Container */}
                        <div className="flex-1 min-w-0 overflow-hidden relative" ref={containerRef}>
                            {/* Gradient Overlays */}
                            <div className="absolute left-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-r from-[#e9f7ef] to-transparent z-10 pointer-events-none"></div>
                            <div className="absolute right-0 top-0 w-8 lg:w-16 h-full bg-gradient-to-l from-[#fff7e6] to-transparent z-10 pointer-events-none"></div>

                            <div
                                key={`message-${currentMessageIndex}`}
                                className={`
                                    marquee-text text-sm sm:text-base lg:text-lg font-medium whitespace-nowrap 
                                    text-gray-800 message-transition
                                    ${isAnimating ? 'opacity-0 scale-98 message-exit' : 'opacity-100 scale-100 message-enter'}
                                    ${isPaused ? 'marquee-paused' : ''}
                                `}
                                style={{
                                    animation: isPaused || isAnimating ?
                                        'none' :
                                        `marquee ${animationDuration}s linear infinite`,
                                    animationDelay: '0s'
                                }}
                                ref={textRef}
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                <span className="inline-block pr-12 lg:pr-16 relative">
                                    <span className="relative z-10 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text">
                                        {currentMessage.text}
                                    </span>
                                    {!isPaused && !isAnimating && (
                                        <span className="absolute inset-0 shimmer-effect rounded-sm opacity-60"></span>
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
                            {/* Message Dots */}
                            <div className="hidden sm:flex items-center gap-1.5">
                                {messages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDotClick(index)}
                                        className={`
                                            w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full transition-all duration-300 
                                            transform hover:scale-125 focus:outline-none focus:ring-2 
                                            focus:ring-blue-400 focus:ring-opacity-50
                                            ${index === currentMessageIndex
                                                ? `bg-gradient-to-r ${currentMessage.color} shadow-lg scale-110`
                                                : 'bg-gray-300 hover:bg-gray-400'
                                            }
                                        `}
                                        aria-label={`Show message ${index + 1}: ${messages[index].type}`}
                                        disabled={isAnimating}
                                    />
                                ))}
                            </div>

                            {/* Pause/Play Button */}
                            <button
                                onClick={handlePauseToggle}
                                className="
                                    flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 rounded-full 
                                    bg-white/95 shadow-md border border-gray-200/80 hover:shadow-lg 
                                    transition-all duration-200 hover:scale-105 group glass-effect
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                                "
                                aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
                            >
                                {isPaused ? (
                                    <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-green-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-orange-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>

                            {/* Next Button */}
                            <button
                                onClick={handleNextMessage}
                                className="
                                    flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 rounded-full 
                                    bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md 
                                    hover:shadow-lg transition-all duration-200 hover:scale-105 group
                                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                                "
                                aria-label="Next message"
                                disabled={isAnimating}
                            >
                                <svg className="w-3 h-3 lg:w-3.5 lg:h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Bar - Perfectly synchronized with text animation */}
                <div className="h-1 bg-gray-200/60 overflow-hidden">
                    <div
                        key={`progress-${currentMessageIndex}`}
                        className={`h-full bg-gradient-to-r ${currentMessage.color}`}
                        style={{
                            animation: isPaused || isAnimating ?
                                'none' :
                                `progressBar ${animationDuration}s linear infinite`,
                            animationDelay: '0s',
                            transform: 'scaleX(0)',
                            transformOrigin: 'left'
                        }}
                    >
                        <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60"></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddressMarqueeSection;