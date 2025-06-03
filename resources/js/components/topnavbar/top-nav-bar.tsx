const AddressMarqueeSection = () => {
    const marqueeStyle = {
        animation: 'marquee 25s linear infinite',
        WebkitAnimation: 'marquee 25s linear infinite',
        MozAnimation: 'marquee 25s linear infinite',
        OAnimation: 'marquee 25s linear infinite',
    };

    return (
        <>
            <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @-webkit-keyframes marquee {
          0% { -webkit-transform: translateX(100%); }
          100% { -webkit-transform: translateX(-100%); }
        }
        
        @-moz-keyframes marquee {
          0% { -moz-transform: translateX(100%); }
          100% { -moz-transform: translateX(-100%); }
        }
        
        @-o-keyframes marquee {
          0% { -o-transform: translateX(100%); }
          100% { -o-transform: translateX(-100%); }
        }
        
        .marquee-text:hover {
          animation-play-state: paused !important;
          -webkit-animation-play-state: paused !important;
        }
      `}</style>

            <section className="border-b border-gray-300 bg-gradient-to-r from-green-50 to-orange-50 px-4 py-2 text-black md:px-10">
                <div className="flex items-center justify-between gap-4">
                    {/* Left Column - Address with Icon (Hidden on Mobile) */}
                    <div className="hidden min-w-0 flex-1 flex-shrink-0 items-center justify-start md:flex">
                        <div className="flex items-center">
                            <svg
                                className="mr-3 h-5 w-5 flex-shrink-0 text-green-700"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Location"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="text-sm font-medium text-gray-800">Head Office, Bank Square, Chattar Domel, Muzaffarabad, AJK, Pakistan</p>
                        </div>
                    </div>

                    {/* Right Column - Fast Marquee (Full width on mobile) */}
                    <div className="w-full min-w-0 flex-1 overflow-hidden md:flex-1">
                        <div className="relative">
                            <div className="marquee-text text-sm font-semibold whitespace-nowrap text-gray-800" style={marqueeStyle}>
                                <span className="inline-block pr-8">
                                    <strong>
                                        Limit of Gold loan has been enhanced now you can get Gold loan up to 2 million from designated branches of
                                        BAJK. Limit of advance salary has been enhanced now you can get advance salary loan up to 3 million. Bank of
                                        Azad Jammu and Kashmir while showing excellent performance has achieved an operating profit of more than 02
                                        Billion Rupees in December 31st, 2024. The state financial institution is achieving remarkable achievements in
                                        all sectors including profitability under its vision of playing a key role in the socio-economic development
                                        of the region.
                                    </strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddressMarqueeSection;
