import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
    id: number;
    name: string;
    designation: string;
    company?: string;
    location: string;
    rating: number;
    testimonial: string;
    service: string;
    image?: string;
}

const CustomerTestimonials: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const testimonials: Testimonial[] = [
        {
            id: 1,
            name: "Muhammad Ahmed Khan",
            designation: "Government Officer",
            location: "Muzaffarabad",
            rating: 5,
            testimonial: "BAJK's advance salary scheme helped me during my daughter's wedding. The process was quick and hassle-free. Excellent customer service and competitive rates.",
            service: "Advance Salary Scheme"
        },
        {
            id: 2,
            name: "Fatima Bibi",
            designation: "Entrepreneur",
            location: "Rawalakot",
            rating: 5,
            testimonial: "The Desi Murghbani scheme empowered me to start my poultry business. BAJK believes in women entrepreneurship and I'm grateful for their support.",
            service: "Micro Finance"
        },
        {
            id: 3,
            name: "Tariq Mahmood",
            designation: "Farmer",
            location: "Kotli",
            rating: 5,
            testimonial: "Agriculture development loan helped me purchase modern farming equipment. BAJK understands farmers' needs and provides flexible repayment options.",
            service: "Agriculture Finance"
        },
        {
            id: 4,
            name: "Sarah Hussain",
            designation: "Business Owner",
            location: "Mirpur",
            rating: 5,
            testimonial: "Their running finance facility kept my textile business running smoothly during challenging times. Professional staff and quick processing.",
            service: "Commercial Finance"
        },
        {
            id: 5,
            name: "Dr. Ali Hassan",
            designation: "Medical Practitioner",
            location: "Bhimber",
            rating: 5,
            testimonial: "House loan from BAJK made my dream home a reality. Transparent process and reasonable markup rates. Highly recommended for home financing.",
            service: "House Loan"
        },
        {
            id: 6,
            name: "Amna Malik",
            designation: "Teacher",
            location: "Muzaffarabad",
            rating: 5,
            testimonial: "Gold loan facility provided immediate cash when I needed it most. Safe custody of my gold ornaments and competitive rates.",
            service: "Gold Loan"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + Math.ceil(testimonials.length / 2)) % Math.ceil(testimonials.length / 2));
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentSlide, isAutoPlaying]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                    <p className="text-xl text-gray-600">Real experiences from satisfied BAJK customers</p>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                                        {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial) => (
                                            <div
                                                key={testimonial.id}
                                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-[#4A7C59]"
                                            >
                                                <div className="flex items-start mb-6">
                                                    <Quote className="w-8 h-8 text-[#4A7C59] mr-4 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <div className="flex items-center mb-2">
                                                            {renderStars(testimonial.rating)}
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed italic">
                                                            "{testimonial.testimonial}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                                                        <p className="text-gray-600 text-sm">{testimonial.designation}</p>
                                                        <p className="text-gray-500 text-sm">{testimonial.location}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="bg-[#4A7C59] text-white px-3 py-1 rounded-full text-xs font-medium">
                                                            {testimonial.service}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Slide Indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.ceil(testimonials.length / 2) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-[#4A7C59]' : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="text-3xl font-bold text-[#4A7C59] mb-2">500K+</div>
                        <div className="text-gray-600">Happy Customers</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="text-3xl font-bold text-[#4A7C59] mb-2">4.8/5</div>
                        <div className="text-gray-600">Customer Rating</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="text-3xl font-bold text-[#4A7C59] mb-2">50+</div>
                        <div className="text-gray-600">Years Experience</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6">
                        <div className="text-3xl font-bold text-[#4A7C59] mb-2">98%</div>
                        <div className="text-gray-600">Satisfaction Rate</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerTestimonials;