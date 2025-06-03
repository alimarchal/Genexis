import WebsiteLayout from '@/layouts/WebsiteLayout';
import { FileText, Shield } from 'lucide-react';
import { useState } from 'react';

interface ServiceAttribute {
    id: number;
    attribute_name: string;
    attribute_value: string;
    sort_order: number;
}

interface Service {
    id: number;
    name: string;
    description: string;
    attributes: ServiceAttribute[];
    image: string;
    icon: JSX.Element;
}

const ServicesPage = () => {
    const [activeServiceIndex, setActiveServiceIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Updated services data with HTML content
    const services: Service[] = [
        {
            id: 1,
            name: 'Lockers Facility',
            description:
                "Lockers' facility is available in Main Branch Muzaffarabad, Main Branch Mirpur, Ladies Branch Mirpur, and CMH Road Branch Rawalakot in three different sizes Small, Medium and Large on annually fee with one time Security Deposit respectively to the size of locker. Locker holders need to have an account in the Bank.",
            image: 'https://demo.bankajk.com/wp-content/uploads/2023/10/locker.jpg',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                        d="M15 32.5V38.125C15 38.2908 15.0658 38.4497 15.1831 38.5669C15.3003 38.6842 15.4592 38.75 15.625 38.75H24.375C24.5408 38.75 24.6997 38.6842 24.8169 38.5669C24.9342 38.4497 25 38.2908 25 38.125V32.5C25.0018 31.8431 24.8733 31.1924 24.6219 30.5855C24.3706 29.9786 24.0014 29.4276 23.5356 28.9644C23.1476 28.5781 22.699 28.2581 22.2075 28.0169C23.0281 27.4175 23.6056 26.5038 23.7238 25.4319C23.7425 25.29 23.75 25.1481 23.75 25C23.75 24.8775 23.7431 24.7612 23.7319 24.6562C23.5556 22.7463 21.9169 21.25 20 21.25C18.0831 21.25 16.4444 22.7463 16.2694 24.645C16.2565 24.7629 16.2501 24.8814 16.25 25C16.25 25.1481 16.2575 25.29 16.2744 25.4169C16.3938 26.4988 16.9731 27.4175 17.7963 28.0181C16.1431 28.835 15 30.5344 15 32.5ZM20 22.5C20.8025 22.5 21.5312 22.8944 21.9919 23.5056C21.3487 23.2557 20.665 23.1267 19.975 23.125C19.3 23.125 18.6469 23.2456 18.0331 23.4725C18.2657 23.1718 18.5636 22.9279 18.9044 22.7594C19.2452 22.591 19.6199 22.5022 20 22.5Z"
                        fill="currentColor"
                    />
                </svg>
            ),
            attributes: [
                {
                    id: 1,
                    attribute_name: 'Availability',
                    attribute_value: 'Main Branch Muzaffarabad, Main Branch Mirpur, Ladies Branch Mirpur, CMH Road Branch Rawalakot',
                    sort_order: 1,
                },
                { id: 2, attribute_name: 'Sizes Available', attribute_value: 'Small, Medium, Large', sort_order: 2 },
                { id: 3, attribute_name: 'Payment Structure', attribute_value: 'Annual fee + One time Security Deposit', sort_order: 3 },
                { id: 4, attribute_name: 'Eligibility', attribute_value: 'Must have account with the Bank', sort_order: 4 },
                { id: 5, attribute_name: 'Security Features', attribute_value: '24/7 surveillance, Fire protection, Dual key system', sort_order: 5 },
                { id: 6, attribute_name: 'Annual Charges', attribute_value: 'Small: Rs. 2,000\nMedium: Rs. 3,500\nLarge: Rs. 5,000', sort_order: 6 },
                { id: 7, attribute_name: 'Required Documents', attribute_value: 'CNIC copy, Account statement, Passport photographs', sort_order: 7 },
            ],
        },
        {
            id: 2,
            name: 'Utility Bills Collection',
            description:
                "Our bank's extensive network of branches is fully authorized to provide the convenient service of collecting electricity bills for our customers. You can easily pay your electricity bills at any of our bank branches, making it a hassle-free experience for your bill payment needs.",
            image: 'https://demo.bankajk.com/wp-content/uploads/2023/10/utility-bill.png',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
                    <path
                        d="M4.17147 31.3512C4.2581 31.4755 4.35946 31.5889 4.47335 31.6887L6.94898 33.855C7.13023 34.0138 7.3396 34.1781 7.5596 34.35C8.3221 34.9456 9.18585 35.6206 9.13335 36.3512C9.10335 36.7681 9.05835 37.1838 9.01335 37.5988L9.00397 37.6838L10.2465 37.8181L10.2558 37.7337C10.3027 37.3031 10.349 36.8725 10.3796 36.4406C10.4802 35.0462 9.28772 34.1138 8.33022 33.365C8.1296 33.2088 7.93772 33.0588 7.7721 32.9144L5.29772 30.7494C5.25961 30.7158 5.22562 30.6778 5.19647 30.6362L1.60085 25.4994C1.55814 25.439 1.52805 25.3706 1.51237 25.2984C1.49669 25.2261 1.49575 25.1514 1.5096 25.0788C1.5229 25.0059 1.5508 24.9365 1.59161 24.8748C1.63243 24.813 1.68532 24.7602 1.7471 24.7194C1.86029 24.6444 1.99691 24.6133 2.1314 24.6318C2.26589 24.6503 2.38901 24.7172 2.47772 24.82L5.3371 28.1562C5.5421 28.3963 5.80647 28.5813 6.12397 28.7L7.80585 29.2612L7.81585 29.2806L7.83522 29.2706L10.6577 30.2125L10.7908 30.4425C10.8459 30.5374 10.875 30.6452 10.8752 30.755V31.5H12.1252V30.7544C12.1252 30.4256 12.0377 30.1012 11.874 29.8162L10.5527 27.5337C10.5106 27.4506 10.4907 27.3581 10.4949 27.265C10.499 27.1719 10.5271 27.0815 10.5765 27.0025C10.624 26.9259 10.6897 26.8622 10.7677 26.8171C10.8458 26.7721 10.9338 26.747 11.0239 26.7442C11.114 26.7415 11.2034 26.761 11.2841 26.8012C11.3648 26.8413 11.4344 26.9008 11.4865 26.9744L13.7515 30.1756C14.8308 31.6944 14.7471 33.5356 14.6577 35.4856C14.6227 36.2419 14.5877 37.0238 14.6258 37.7825L15.8746 37.7188C15.8383 37.02 15.8715 36.3019 15.9065 35.5419C16.0008 33.4669 16.099 31.3206 14.7808 29.4662L12.5058 26.2513C12.3397 26.0171 12.12 25.8262 11.8651 25.6943C11.6101 25.5624 11.3273 25.4934 11.0402 25.4931C10.734 25.492 10.4327 25.5697 10.1653 25.7188C9.89789 25.8679 9.67336 26.0833 9.51335 26.3444C9.18335 26.8775 9.15397 27.5306 9.45148 28.125L9.71397 28.5788L8.69273 28.2381L7.0896 25.0319L6.6621 23.3225C6.57696 22.9804 6.37975 22.6766 6.10189 22.4596C5.82404 22.2425 5.48154 22.1248 5.12897 22.125C4.89925 22.1247 4.67223 22.1746 4.46375 22.2711C4.25528 22.3675 4.07036 22.5084 3.92189 22.6837C3.77342 22.859 3.66499 23.0645 3.60414 23.2861C3.5433 23.5076 3.53151 23.7397 3.5696 23.9662L3.6121 24.2219L3.42647 24.0056C3.13894 23.6711 2.73906 23.4533 2.3021 23.3931C1.86514 23.3329 1.42125 23.4345 1.05397 23.6787C0.646475 23.9506 0.371475 24.3656 0.281475 24.8475C0.191475 25.3294 0.29585 25.815 0.5771 26.2163L4.17147 31.3512Z"
                        fill="currentColor"
                    />
                </svg>
            ),
            attributes: [
                {
                    id: 8,
                    attribute_name: 'Service Coverage',
                    attribute_value: 'All bank branches authorized for electricity bill collection',
                    sort_order: 1,
                },
                { id: 9, attribute_name: 'Bill Types', attribute_value: 'Electricity bills, Gas bills, Water bills', sort_order: 2 },
                { id: 10, attribute_name: 'Customer Benefits', attribute_value: 'Hassle-free experience, Convenient locations', sort_order: 3 },
                { id: 11, attribute_name: 'Service Hours', attribute_value: 'Monday to Saturday: 9:00 AM to 5:00 PM', sort_order: 4 },
                { id: 12, attribute_name: 'Service Charges', attribute_value: 'Rs. 50 per transaction', sort_order: 5 },
                { id: 13, attribute_name: 'Payment Methods', attribute_value: 'Cash, Account debit, Mobile banking', sort_order: 6 },
            ],
        },
        {
            id: 3,
            name: 'Services for AJK PSC',
            description:
                'At all our branches, we proudly offer the service of collecting the application fees for the AJK Public Service Commission from candidates. In addition to this, we also provide application forms, ensuring a seamless and efficient process for individuals applying for various positions. Trust us to assist you in your application process.',
            image: 'https://demo.bankajk.com/wp-content/uploads/2023/10/psc.jpg',
            icon: <FileText className="h-10 w-10" />,
            attributes: [
                { id: 14, attribute_name: 'Services Offered', attribute_value: 'Application fee collection, Form distribution', sort_order: 1 },
                { id: 15, attribute_name: 'Target Candidates', attribute_value: 'AJK Public Service Commission applicants', sort_order: 2 },
                { id: 16, attribute_name: 'Branch Availability', attribute_value: 'All branches', sort_order: 3 },
                { id: 17, attribute_name: 'Process Benefits', attribute_value: 'Seamless application process, Efficient service', sort_order: 4 },
                { id: 18, attribute_name: 'Additional Services', attribute_value: 'Application guidance, Form assistance', sort_order: 5 },
                { id: 19, attribute_name: 'Required Documents', attribute_value: 'CNIC, Educational certificates, Application form', sort_order: 6 },
            ],
        },
        {
            id: 4,
            name: 'Remittances',
            description:
                'The bank has made adequate arrangements with major scheduled banks for the purpose of inter bank settlements and outward remittances. Under an arrangement with HBL all Banker Cheques issued by BAJK branches are payable on all branches of HBL.',
            image: 'https://demo.bankajk.com/wp-content/uploads/2023/10/remittance.jpg',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                        d="M35 15H30V12.5C30 11.1739 29.4732 9.90215 28.5355 8.96447C27.5979 8.02678 26.3261 7.5 25 7.5H15C13.6739 7.5 12.4021 8.02678 11.4645 8.96447C10.5268 9.90215 10 11.1739 10 12.5V15H5C4.33696 15 3.70107 15.2634 3.23223 15.7322C2.76339 16.2011 2.5 16.837 2.5 17.5V30C2.5 30.663 2.76339 31.2989 3.23223 31.7678C3.70107 32.2366 4.33696 32.5 5 32.5H35C35.663 32.5 36.2989 32.2366 36.7678 31.7678C37.2366 31.2989 37.5 30.663 37.5 30V17.5C37.5 16.837 37.2366 16.2011 36.7678 15.7322C36.2989 15.2634 35.663 15 35 15ZM12.5 12.5C12.5 11.837 12.7634 11.2011 13.2322 10.7322C13.7011 10.2634 14.337 10 15 10H25C25.663 10 26.2989 10.2634 26.7678 10.7322C27.2366 11.2011 27.5 11.837 27.5 12.5V15H12.5V12.5ZM35 30H5V17.5H35V30Z"
                        fill="currentColor"
                    />
                    <path
                        d="M20 20C18.6739 20 17.4021 20.5268 16.4645 21.4645C15.5268 22.4021 15 23.6739 15 25C15 26.3261 15.5268 27.5979 16.4645 28.5355C17.4021 29.4732 18.6739 30 20 30C21.3261 30 22.5979 29.4732 23.5355 28.5355C24.4732 27.5979 25 26.3261 25 25C25 23.6739 24.4732 22.4021 23.5355 21.4645C22.5979 20.5268 21.3261 20 20 20ZM20 27.5C19.337 27.5 18.7011 27.2366 18.2322 26.7678C17.7634 26.2989 17.5 25.663 17.5 25C17.5 24.337 17.7634 23.7011 18.2322 23.2322C18.7011 22.7634 19.337 22.5 20 22.5C20.663 22.5 21.2989 22.7634 21.7678 23.2322C22.2366 23.7011 22.5 24.337 22.5 25C22.5 25.663 22.2366 26.2989 21.7678 26.7678C21.2989 27.2366 20.663 27.5 20 27.5Z"
                        fill="currentColor"
                    />
                </svg>
            ),
            attributes: [
                {
                    id: 20,
                    attribute_name: 'Inter Bank Settlements',
                    attribute_value: 'Arrangements with major scheduled banks for settlements and outward remittances',
                    sort_order: 1,
                },
                {
                    id: 21,
                    attribute_name: 'HBL Partnership',
                    attribute_value: 'All Banker Cheques issued by BAJK branches payable on all HBL branches',
                    sort_order: 2,
                },
                {
                    id: 22,
                    attribute_name: 'MoneyGram Service',
                    attribute_value:
                        'Global money transfer with 350,000+ locations in 200+ countries. Find locations: https://www.moneygram.com/locations',
                    sort_order: 3,
                },
                {
                    id: 23,
                    attribute_name: 'RIA Money Transfer',
                    attribute_value:
                        "World's largest money transfer service in 147+ countries with 287,000+ locations. Find locations: https://www.riamoneytransfer.com/ria-locator",
                    sort_order: 4,
                },
                {
                    id: 24,
                    attribute_name: 'Western Union',
                    attribute_value:
                        'Financial services company offering money transfers in 200+ countries since 1851. Online, in-person, and phone services available',
                    sort_order: 5,
                },
                {
                    id: 25,
                    attribute_name: 'Home Remittance Facility',
                    attribute_value: 'Customers can receive home remittances from all bank branches',
                    sort_order: 6,
                },
                { id: 26, attribute_name: 'Additional Services', attribute_value: 'Bill payment, Money orders, Prepaid debit cards', sort_order: 7 },
            ],
        },
    ];

    const activeService = services[activeServiceIndex];

    const getAttributeValue = (attributeName: string): string => {
        const attr = activeService.attributes.find((a) => a.attribute_name.toLowerCase() === attributeName.toLowerCase());
        return attr?.attribute_value || '';
    };

    const getFeatures = (): ServiceAttribute[] => {
        return activeService.attributes
            .filter((a) => !['eligibility', 'required documents', 'annual charges', 'service charges'].includes(a.attribute_name.toLowerCase()))
            .sort((a, b) => a.sort_order - b.sort_order);
    };

    const eligibility = getAttributeValue('Eligibility');
    const features = getFeatures();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Shield className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Our Services</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                        Comprehensive banking services designed to make your financial life easier. From secure storage to convenient bill payments,
                        we're here to serve you.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap justify-center gap-3 p-4">
                        {services.map((service, index) => {
                            const getIconEmoji = (name: string) => {
                                if (name.toLowerCase().includes('locker')) return '🔒';
                                if (name.toLowerCase().includes('utility') || name.toLowerCase().includes('bill')) return '💡';
                                if (name.toLowerCase().includes('psc')) return '🏛️';
                                return '🏦';
                            };

                            return (
                                <button
                                    key={service.id}
                                    onClick={() => setActiveServiceIndex(index)}
                                    className={`flex flex-shrink-0 items-center gap-2 rounded-lg border bg-white px-4 py-3 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                                        activeServiceIndex === index
                                            ? 'scale-105 border-[#4A7C59] shadow-lg'
                                            : 'border-gray-200 hover:border-[#4A7C59]/30'
                                    }`}
                                >
                                    <span className="text-lg">{getIconEmoji(service.name)}</span>
                                    <span
                                        className={`text-sm font-medium sm:text-base ${
                                            activeServiceIndex === index ? 'text-[#4A7C59]' : 'text-gray-700'
                                        }`}
                                    >
                                        {service.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Service Details */}
                <div
                    className="transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Header with Image */}
                    <div className="relative">
                        <div className="relative overflow-hidden bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6">
                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-[#F9B912]/10 via-transparent to-transparent transition-opacity duration-500 ${
                                    isHovered ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                            <div className="relative z-10 flex items-center gap-6">
                                <div className="text-white">{activeService.icon}</div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">{activeService.name}</h1>
                                    <p className="mt-2 text-white/90">{activeService.description}</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 transform rounded-full bg-gradient-to-bl from-[#F9B912]/20 to-transparent" />
                        </div>

                        {/* Service Image */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={activeService.image}
                                alt={activeService.name}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Eligibility Section */}
                        {eligibility && (
                            <div className="mb-10">
                                <h2 className="mb-4 flex items-center text-xl font-semibold text-[#4A7C59]">
                                    <div className="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-[#4A7C59] to-[#F9B912]"></div>
                                    Eligibility
                                </h2>
                                <div className="rounded-xl border border-[#4A7C59]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#6B9B7A]/10 p-6 shadow-sm">
                                    <p className="leading-relaxed text-gray-700">{eligibility}</p>
                                </div>
                            </div>
                        )}

                        {/* Service Features */}
                        {features.length > 0 && (
                            <div className="mb-10">
                                <h2 className="mb-6 flex items-center text-xl font-semibold text-[#4A7C59]">
                                    <div className="mr-3 h-6 w-1 rounded-full bg-gradient-to-b from-[#F9B912] to-[#4A7C59]"></div>
                                    Service Details
                                </h2>
                                <div className="grid gap-4">
                                    {features.map((feature, index) => (
                                        <div
                                            key={feature.id}
                                            className="flex items-start rounded-xl border border-[#F9B912]/20 bg-gradient-to-r from-white via-[#4A7C59]/5 to-[#F9B912]/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#F9B912]/40 hover:shadow-lg"
                                        >
                                            <div className="mt-2 mr-4 h-2 w-2 flex-shrink-0 rounded-full bg-[#F9B912]"></div>
                                            <div>
                                                <h4 className="mb-1 font-semibold text-[#4A7C59]">{feature.attribute_name}</h4>
                                                <p className="leading-relaxed whitespace-pre-line text-gray-700">{feature.attribute_value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Special Attributes */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {activeService.attributes
                                .filter((attr) =>
                                    ['required documents', 'annual charges', 'service charges'].includes(attr.attribute_name.toLowerCase()),
                                )
                                .sort((a, b) => a.sort_order - b.sort_order)
                                .map((attr) => (
                                    <div
                                        key={attr.id}
                                        className="rounded-xl border border-gray-200 bg-gradient-to-br from-[#4A7C59]/5 to-[#F9B912]/5 p-6"
                                    >
                                        <h3 className="mb-3 flex items-center font-semibold text-[#4A7C59]">
                                            <div className="mr-2 h-2 w-2 rounded-full bg-[#F9B912]"></div>
                                            {attr.attribute_name}
                                        </h3>
                                        <p className="leading-relaxed whitespace-pre-line text-gray-700">{attr.attribute_value}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ServicesPage.layout = (page: any) => <WebsiteLayout title="Our Services">{page}</WebsiteLayout>;

export default ServicesPage;
