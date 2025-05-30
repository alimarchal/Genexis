import React, { useState } from 'react';

interface BodCardProps {
    name?: string;
    title?: string;
    image?: string;
    description?: string;
    fullBio?: string;
    experience?: string[];
    achievements?: string[];
}

const BodCard: React.FC<BodCardProps> = ({
    name = "Mr. Shahid Shehzad Mir",
    title = "Acting President/CEO & CFO",
    image = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description = `Mr. Shahid Shehzad Mir is a seasoned banking professional with an illustrious career spanning several key leadership roles within the financial sector. Currently serving as the Executive Vice President and Chief Financial Officer (CFO) of The Bank of Azad Jammu & Kashmir, he brings a wealth of expertise in financial management, strategic leadership, and executive decision-making.<br/><br/>
    Mr. Shahid Shehzad Mir commenced his journey with the Bank of Azad Jammu & Kashmir in 2006, initially joining as an OG-II. Through his unwavering commitment and diligent efforts, he progressively earned promotions within the organization. In 2014, in recognition of his hard work and dedication, Mr. Mir achieved the esteemed position of Divisional Head of the Financial Control Division and Treasury. Prior to joining Bank of AJK, he remained associated with Sehgal Group of Industries, Pakistan's one of the most reputed Business Group as Manager Finance.<br/><br/>
    He has been looking after the Financial Control and Treasury Management of the Bank, playing a pivotal role in shaping and executing the bank's financial strategies. In addition to his core financial responsibilities, he holds significant leadership roles within the Bank. As Head of Finance & Treasury at the Head Office, he demonstrated exceptional financial acumen. His role extended to treasury functions, where he effectively managed day-to-day operations, investments in various financial instruments, and ensured robust and fund management. His meticulous approach to financial governance is evident from the Profitability of the Bank, which has been sky rocketed through viable investments.<br/><br/>
    Mr. Shahid Shehzad Mir beings with him ample knowledge and experience of Commercial and Retail Banking, and in his previous role in the field of Business, he provided inspirational leadership ensuring the successful delivery of business plans.<br/><br/>
    His academic journey reflects a commitment to continuous learning and professional development. Holding a Master's degree in Economics, and MBA in Finance, he has also earned diplomas and certifications in Islamic Banking and Finance and certified Islamic Fund Manager, further enhancing his expertise in this specialized domain.<br/><br/>
    Recently assuming the charge of Acting President/CEO, Mr. Shahid Shehzad Mir brings a visionary approach to his leadership. Known for his strategic thinking and commitment to excellence, he is poised to steer The Bank of Azad Jammu & Kashmir towards new heights. His extensive experience, coupled with a comprehensive understanding of financial dynamics, positions him as a dynamic and capable leader ready to navigate the bank through evolving challenges and opportunities.<br/><br/>
    Mr. Shahid Shehzad Mir's leadership philosophy revolves around fostering a culture of innovation, collaboration, and customer-centricity. As Acting President/CEO, he is dedicated to upholding the bank's legacy of trust, transparency, and service excellence, ensuring the continued success and growth of The Bank of Azad Jammu & Kashmir`,
    fullBio = `Mr. Shahid Shehzad Mir is a seasoned banking professional with an illustrious career spanning several key leadership roles within the financial sector. Currently serving as the Executive Vice President and Chief Financial Officer (CFO) of The Bank of Azad Jammu & Kashmir, he brings a wealth of expertise in financial management, strategic leadership, and executive decision-making.<br/><br/>
    Mr. Shahid Shehzad Mir commenced his journey with the Bank of Azad Jammu & Kashmir in 2006, initially joining as an OG-II. Through his unwavering commitment and diligent efforts, he progressively earned promotions within the organization. In 2014, in recognition of his hard work and dedication, Mr. Mir achieved the esteemed position of Divisional Head of the Financial Control Division and Treasury. Prior to joining Bank of AJK, he remained associated with Sehgal Group of Industries, Pakistan's one of the most reputed Business Group as Manager Finance.<br/><br/>
    He has been looking after the Financial Control and Treasury Management of the Bank, playing a pivotal role in shaping and executing the bank's financial strategies. In addition to his core financial responsibilities, he holds significant leadership roles within the Bank. As Head of Finance & Treasury at the Head Office, he demonstrated exceptional financial acumen. His role extended to treasury functions, where he effectively managed day-to-day operations, investments in various financial instruments, and ensured robust and fund management. His meticulous approach to financial governance is evident from the Profitability of the Bank, which has been sky rocketed through viable investments.<br/><br/>
    Mr. Shahid Shehzad Mir beings with him ample knowledge and experience of Commercial and Retail Banking, and in his previous role in the field of Business, he provided inspirational leadership ensuring the successful delivery of business plans.<br/><br/>
    His academic journey reflects a commitment to continuous learning and professional development. Holding a Master's degree in Economics, and MBA in Finance, he has also earned diplomas and certifications in Islamic Banking and Finance and certified Islamic Fund Manager, further enhancing his expertise in this specialized domain.<br/><br/>
    Recently assuming the charge of Acting President/CEO, Mr. Shahid Shehzad Mir brings a visionary approach to his leadership. Known for his strategic thinking and commitment to excellence, he is poised to steer The Bank of Azad Jammu & Kashmir towards new heights. His extensive experience, coupled with a comprehensive understanding of financial dynamics, positions him as a dynamic and capable leader ready to navigate the bank through evolving challenges and opportunities.<br/><br/>
    Mr. Shahid Shehzad Mir's leadership philosophy revolves around fostering a culture of innovation, collaboration, and customer-centricity. As Acting President/CEO, he is dedicated to upholding the bank's legacy of trust, transparency, and service excellence, ensuring the continued success and growth of The Bank of Azad Jammu & Kashmir`,
    experience = [
        "Executive Vice President and CFO at Bank of Azad Jammu & Kashmir",
        "Divisional Head of Financial Control Division and Treasury (2014)",
        "Manager Finance at Sehgal Group of Industries",
        "Progressive career growth from OG-II since 2006"
    ],
    achievements = [
        "Recently appointed as Acting President/CEO",
        "Significantly increased bank profitability through strategic investments",
        "Successfully managed treasury operations and fund management",
        "Master's degree in Economics and MBA in Finance",
        "Certified Islamic Fund Manager and Islamic Banking specialist"
    ]
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    // Function to truncate HTML content
    const truncateHtmlText = (html: string, limit: number) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length > limit ? text.substring(0, limit) : text;
    };

    const shouldTruncate = description.replace(/<[^>]*>/g, '').length > 200;
    const truncatedText = shouldTruncate ? truncateHtmlText(description, 200) : description;

    return (
        <>
            <div className="w-full max-w-sm mx-auto">
                <div
                    className="
                        relative bg-white rounded-xl overflow-hidden
                        shadow-lg hover:shadow-2xl
                        transform transition-all duration-500 ease-in-out
                        hover:-translate-y-2 hover:scale-105
                        border border-gray-100
                        cursor-pointer
                    "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setOpenModal(true)}
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
                        <div className="space-y-4">
                            {/* Name */}
                            <h3 className="
                                text-xl sm:text-2xl font-bold 
                                text-[#4A7C59]
                                transform transition-all duration-300
                                hover:text-[#F9B912]
                                text-center
                            ">
                                {name}
                            </h3>

                            {/* Title */}
                            <div className="relative text-center">
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
                            <div className="text-left">
                                <div className="
                                    text-sm text-gray-500 leading-relaxed
                                    transform transition-all duration-300
                                    hover:text-gray-700
                                ">
                                    {shouldTruncate ? (
                                        <span>{truncatedText}...</span>
                                    ) : (
                                        <div dangerouslySetInnerHTML={{ __html: description }} />
                                    )}
                                </div>

                                {shouldTruncate && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenModal(true);
                                        }}
                                        className="mt-2 text-[#4A7C59] hover:text-[#F9B912] font-medium text-sm transition-colors underline"
                                    >
                                        Read more
                                    </button>
                                )}
                            </div>

                            {/* Click to learn more hint */}
                            <div className="mt-4 pt-2 border-t border-gray-100 text-center">
                                <p className="text-xs text-[#4A7C59] font-medium opacity-70 hover:opacity-100 transition-opacity">
                                    Click to learn more →
                                </p>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={() => setOpenModal(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-4 relative">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                                />
                                <div className="text-white">
                                    <h2 className="text-2xl font-bold">{name}</h2>
                                    <p className="text-[#F9B912] font-semibold">{title}</p>
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
                                <div>
                                    <h3 className="text-lg font-semibold text-[#4A7C59] mb-3">Biography</h3>
                                    <div
                                        className="text-gray-600 leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: fullBio }}
                                    />
                                </div>

                                {/* Experience */}
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

                                {/* Achievements */}
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