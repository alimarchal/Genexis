import WebsiteLayout from '@/layouts/WebsiteLayout';

// Define your page props interface
interface TestComponentProps {
    // Add your props here
    data?: any;
}

export default function TestComponent({ data }: TestComponentProps) {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Page Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Component Page</h1>
                <p className="text-lg text-gray-600">
                    This is a sample page template. Copy this file to create new pages with the website layout.
                </p>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Content Column 1 */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Main Content Area</h2>
                        <p className="text-gray-600 mb-4">
                            This is where your main content goes. You can add any components, text, images, or other elements here.
                        </p>

                        {/* Example Card Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Feature 1</h3>
                                <p className="text-sm text-gray-600">Description of feature 1</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-800 mb-2">Feature 2</h3>
                                <p className="text-sm text-gray-600">Description of feature 2</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sidebar Content</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600">• Sidebar item 1</li>
                            <li className="text-gray-600">• Sidebar item 2</li>
                            <li className="text-gray-600">• Sidebar item 3</li>
                            <li className="text-gray-600">• Sidebar item 4</li>
                        </ul>
                    </div>

                    {/* Additional Sidebar Widget */}
                    <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-lg shadow-md p-6 mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                                → Important Link 1
                            </a>
                            <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                                → Important Link 2
                            </a>
                            <a href="#" className="block text-blue-600 hover:text-blue-800 transition-colors">
                                → Important Link 3
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Width Section */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Full Width Section</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                    This section spans the full width of the content area. You can use it for calls to action,
                    important announcements, or any content that needs more visual emphasis.
                </p>
                <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                    Call to Action Button
                </button>
            </div>
        </div>
    );
}

// Set the persistent layout and page props
TestComponent.layout = (page: any) => (
    <WebsiteLayout
        title="Test Component"
        breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Test Component', isActive: true }
        ]}
    >
        {page}
    </WebsiteLayout>
);

/**
 * HOW TO USE THIS TEMPLATE:
 * 
 * 1. Copy this file and rename it (e.g., services.tsx, contact.tsx, etc.)
 * 2. Update the component name and export
 * 3. Modify the TestComponentProps interface to match your data needs
 * 4. Update the title and breadcrumbs in the layout configuration
 * 5. Replace the content with your actual page content
 * 6. The WebsiteLayout will automatically include:
 *    - TopNavbar
 *    - Header
 *    - Breadcrumb navigation (if provided)
 *    - Footer
 * 
 * EXAMPLE VARIATIONS:
 * 
 * For a simple page without breadcrumbs:
 * PageName.layout = (page: any) => (
 *     <WebsiteLayout title="Page Title">
 *         {page}
 *     </WebsiteLayout>
 * );
 * 
 * For a page with custom breadcrumbs:
 * PageName.layout = (page: any) => (
 *     <WebsiteLayout
 *         title="Page Title"
 *         breadcrumbs={[
 *             { label: 'Parent', href: '/parent' },
 *             { label: 'Current Page', isActive: true }
 *         ]}
 *     >
 *         {page}
 *     </WebsiteLayout>
 * );
 */