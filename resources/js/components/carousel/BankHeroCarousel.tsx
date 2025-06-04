import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

interface CarouselSlide {
    id: number;
    image: string;
    title: string;
    subtitle: string;
    ctaText?: string;
    ctaLink?: string;
}

interface BankHeroCarouselProps {
    slides?: CarouselSlide[];
}

const BankHeroCarousel: React.FC<BankHeroCarouselProps> = ({ slides: propSlides }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Use provided slides or fallback to default slides
    const slides: CarouselSlide[] = propSlides || [
        {
            id: 1,
            image: '/carousel/car_finance.jpeg',
            title: 'Digital Banking Solutions',
            subtitle: 'Experience seamless banking with our innovative digital platform',
            ctaText: 'Learn More',
            ctaLink: '/digital-banking',
        },
        {
            id: 2,
            image: '/carousel/gold_loan.jpeg',
            title: 'Personal Loans Made Simple',
            subtitle: 'Quick approval and competitive rates for all your financial needs',
            ctaText: 'Apply Now',
            ctaLink: '/personal-loans',
        },
        {
            id: 3,
            image: '/carousel/schemes.jpeg',
            title: 'Investment Opportunities',
            subtitle: 'Grow your wealth with our expert investment advisory services',
            ctaText: 'Explore',
            ctaLink: '/investments',
        },
        {
            id: 4,
            image: '/carousel/running_finance.jpg',
            title: 'Business Banking Excellence',
            subtitle: 'Comprehensive financial solutions for your business growth',
            ctaText: 'Get Started',
            ctaLink: '/business-banking',
        },
        {
            id: 5,
            image: '/carousel/schemes.jpeg',
            title: 'Customer Support 24/7',
            subtitle: "We're here to help you with all your banking needs anytime",
            ctaText: 'Contact Us',
            ctaLink: '/contact',
        },
    ];

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentSlide, isAutoPlaying, nextSlide]);

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    return (
        <div className="relative w-full bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            {/* Main Carousel Container */}
            <div
                className="relative h-64 overflow-hidden sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                            index === currentSlide ? 'translate-x-0' : index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                        }`}
                    >
                        {/* Background Image */}
                        <div className="relative h-full w-full">
                            <img src={slide.image} alt={slide.title} className="object-fit h-full w-full" loading={index === 0 ? 'eager' : 'lazy'} />

                            {/* Gradient Overlay */}
                            {/* <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div> */}

                            {/* Content Overlay */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="max-w-lg lg:max-w-2xl">
                                        {/* <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 leading-tight">
                                            {slide.title}
                                        </h2>
                                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 lg:mb-8 leading-relaxed">
                                            {slide.subtitle}
                                        </p> */}
                                        {/* {slide.ctaText && slide.ctaLink && (
                                            <a
                                                href={slide.ctaLink}
                                                className="inline-flex items-center px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg font-semibold text-white bg-gradient-to-r from-[#4A7C59] to-[#5D8A6A] rounded-lg hover:from-[#F9B912] hover:to-[#E6A610] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                                            >
                                                {slide.ctaText}
                                                <svg
                                                    className="ml-2 w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </a>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none lg:left-8 lg:p-3"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30 focus:ring-2 focus:ring-white/50 focus:outline-none lg:right-8 lg:p-3"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2 lg:bottom-8">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 w-3 rounded-full transition-all duration-200 focus:ring-2 focus:ring-white/50 focus:outline-none lg:h-4 lg:w-4 ${
                                index === currentSlide ? 'scale-110 bg-white' : 'bg-white/50 hover:bg-white/70'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Slide Counter */}
                <div className="absolute top-4 right-4 rounded-full bg-black/30 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm lg:top-8 lg:right-8 lg:px-4 lg:py-2 lg:text-base">
                    {currentSlide + 1} / {slides.length}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-1 w-full bg-gray-200">
                <div
                    className="h-1 bg-gradient-to-r from-[#4A7C59] to-[#F9B912] transition-all duration-300 ease-out"
                    style={{
                        width: `${((currentSlide + 1) / slides.length) * 100}%`,
                    }}
                />
            </div>

            {/* Thumbnail Navigation (Hidden on mobile) */}
            <div className="hidden justify-center space-x-4 py-6 lg:flex">
                {slides.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => goToSlide(index)}
                        className={`relative h-12 w-20 overflow-hidden transition-all duration-200 focus:ring-2 focus:ring-[#4A7C59] focus:outline-none ${
                            index === currentSlide ? 'scale-110 ring-2 ring-[#F9B912]' : 'opacity-70 hover:opacity-100'
                        }`}
                    >
                        <img src={slide.image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                        {index === currentSlide && <div className="absolute inset-0 bg-[#F9B912]/20"></div>}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BankHeroCarousel;
