import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function TestComponent() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-8">
            {/* Page Header Section */}
            <div className="mb-8">
                <h1 className="mb-4 text-3xl font-bold text-gray-900">Test Component Page</h1>
                <p className="text-lg text-gray-600">This is a sample page template. Copy this file to create new pages with the website layout.</p>
            </div>

            {/* Main Content Section */}
            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Content Column 1 */}
                <div className="lg:col-span-2">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Main Content Area</h2>
                        <p className="mb-4 text-gray-600">
                            This is where your main content goes. You can add any components, text, images, or other elements here.
                        </p>

                        {/* Example Card Grid */}
                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-lg bg-gray-50 p-4">
                                <h3 className="mb-2 font-medium text-gray-800">Feature 1</h3>
                                <p className="text-sm text-gray-600">Description of feature 1</p>
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4">
                                <h3 className="mb-2 font-medium text-gray-800">Feature 2</h3>
                                <p className="text-sm text-gray-600">Description of feature 2</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="lg:col-span-1">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">Sidebar Content</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600">• Sidebar item 1</li>
                            <li className="text-gray-600">• Sidebar item 2</li>
                            <li className="text-gray-600">• Sidebar item 3</li>
                            <li className="text-gray-600">• Sidebar item 4</li>
                        </ul>
                    </div>

                    {/* Additional Sidebar Widget */}
                    <div className="mt-6 rounded-lg bg-gradient-to-br from-green-50 to-orange-50 p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-semibold text-gray-800">Quick Links</h3>
                        <div className="space-y-2">
                            <a href="#" className="block text-blue-600 transition-colors hover:text-blue-800">
                                → Important Link 1
                            </a>
                            <a href="#" className="block text-blue-600 transition-colors hover:text-blue-800">
                                → Important Link 2
                            </a>
                            <a href="#" className="block text-blue-600 transition-colors hover:text-blue-800">
                                → Important Link 3
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Width Section */}
            <div className="rounded-lg bg-gray-100 p-8 text-center">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">Full Width Section</h2>
                <p className="mx-auto max-w-3xl text-gray-600">
                    This section spans the full width of the content area. You can use it for calls to action, important announcements, or any content
                    that needs more visual emphasis.
                </p>
                <button className="mt-6 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700">
                    Call to Action Button
                </button>
            </div>
        </div>
    );
}

// Set the persistent layout and page props
TestComponent.layout = (page: React.ReactNode) => (
    <WebsiteLayout
        title="Test Component"
        breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Test Component', isActive: true },
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
