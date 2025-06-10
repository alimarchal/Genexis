import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Building2, Calendar, Download, FileText } from 'lucide-react';

interface AnnualReport {
    id: number;
    fiscal_year: number;
    file_name: string | null;
    file_size: number;
    download_url: string | null;
    created_at: string;
}

interface AnnualReportsPublicProps {
    annualReports: AnnualReport[];
}

const AnnualReportsPublic = ({ annualReports }: AnnualReportsPublicProps) => {
    const downloadFile = (url: string) => {
        window.open(url, '_blank');
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#e9f7ef] to-[#fff7e6]">
            <div className="mx-auto max-w-7xl px-6 py-8">
                {/* Hero Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] p-4">
                            <Building2 className="h-12 w-12 text-white" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Annual Reports</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                        Access our comprehensive annual reports providing detailed insights into our financial performance, strategic initiatives, and
                        corporate governance.
                    </p>
                </div>

                {/* Reports Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {annualReports.length === 0 ? (
                        <div className="col-span-full py-12 text-center">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <h3 className="mb-2 text-lg font-medium text-gray-900">No Annual Reports Available</h3>
                            <p className="text-gray-600">Annual reports will be published here as they become available.</p>
                        </div>
                    ) : (
                        annualReports.map((report) => (
                            <div
                                key={report.id}
                                className="group relative transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                            >
                                {/* Header */}
                                <div className="bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-white/20 p-2">
                                            <Calendar className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">FY {report.fiscal_year}</h3>
                                            <p className="text-white/90">Annual Report</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {report.file_name && report.download_url ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-lg bg-[#4A7C59]/10 p-2">
                                                    <FileText className="h-5 w-5 text-[#4A7C59]" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{report.file_name}</p>
                                                    <p className="text-xs text-gray-600">{formatFileSize(report.file_size)}</p>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => downloadFile(report.download_url!)}
                                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-3 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                            >
                                                <Download className="h-4 w-4" />
                                                Download Report
                                            </button>

                                            <div className="text-center">
                                                <p className="text-xs text-gray-500">Published on {report.created_at}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <FileText className="mx-auto mb-3 h-8 w-8 text-gray-400" />
                                            <p className="text-sm text-gray-600">Report not yet available</p>
                                            <p className="mt-1 text-xs text-gray-500">Will be published soon</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Information Section */}
                <div className="mt-12 rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-[#4A7C59]">About Annual Reports</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">What&apos;s Included</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• Comprehensive financial statements and analysis</li>
                                <li>• Strategic initiatives and business performance</li>
                                <li>• Corporate governance and sustainability reports</li>
                                <li>• Risk management and regulatory compliance</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-2 font-medium text-gray-900">File Information</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• All reports are available in PDF format</li>
                                <li>• Files are optimized for download and printing</li>
                                <li>• Reports follow international accounting standards</li>
                                <li>• Published annually following fiscal year end</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

AnnualReportsPublic.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Annual Reports" breadcrumbs={[{ label: 'Financials', href: '/financials' }]}>
        {page}
    </WebsiteLayout>
);

export default AnnualReportsPublic;
