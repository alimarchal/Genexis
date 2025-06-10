import WebsiteLayout from '@/layouts/WebsiteLayout';
import { FileText, Download, Calendar, Building2 } from 'lucide-react';

interface FinancialReport {
    id: number;
    fiscal_year: number;
    first_quarter_report: string | null;
    first_quarter_report_url: string | null;
    half_yearly_report: string | null;
    half_yearly_report_url: string | null;
    third_quarter_report: string | null;
    third_quarter_report_url: string | null;
    annual_report: string | null;
    annual_report_url: string | null;
    created_at: string;
}

interface FinancialStatementsProps {
    financialReports: FinancialReport[];
}

const FinancialStatements = ({ financialReports }: FinancialStatementsProps) => {
    const downloadFile = (url: string, fileName: string) => {
        window.open(url, '_blank');
    };

    const getReportTypeName = (type: string) => {
        const names = {
            first_quarter: 'Q1 Report',
            half_yearly: 'Half-Yearly Report',
            third_quarter: 'Q3 Report',
            annual: 'Annual Report'
        };
        return names[type as keyof typeof names] || type;
    };

    const getReportPeriod = (type: string, year: number) => {
        const periods = {
            first_quarter: `Q1 ${year}`,
            half_yearly: `H1 ${year}`,
            third_quarter: `Q3 ${year}`,
            annual: `FY ${year}`
        };
        return periods[type as keyof typeof periods] || `${year}`;
    };

    const getReportIcon = (type: string) => {
        return <FileText className="h-5 w-5" />;
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
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">Financial Statements</h1>
                    <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
                        Access our comprehensive financial reports including quarterly statements, half-yearly reports, and annual financial statements.
                    </p>
                </div>

                {/* Financial Reports Grid */}
                <div className="space-y-8">
                    {financialReports.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No Financial Reports Available</h3>
                            <p className="text-gray-600">Financial reports will be published here as they become available.</p>
                        </div>
                    ) : (
                        financialReports.map((report) => (
                            <div
                                key={report.id}
                                className="relative transform overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl"
                            >
                                {/* Header */}
                                <div className="relative overflow-hidden bg-gradient-to-r from-[#4A7C59] via-[#5D8A6A] to-[#6B9B7A] px-8 py-6">
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="rounded-full bg-white/20 p-3">
                                                <Calendar className="h-8 w-8 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-3xl font-bold text-white">FY {report.fiscal_year}</h2>
                                                <p className="mt-2 text-white/90">Financial Year {report.fiscal_year} Reports</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white/80 text-sm">Published</p>
                                            <p className="text-white font-medium">{report.created_at}</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 transform rounded-full bg-gradient-to-bl from-[#F9B912]/20 to-transparent" />
                                </div>

                                {/* Reports Grid */}
                                <div className="p-8">
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                                        {/* First Quarter Report */}
                                        {report.first_quarter_report && report.first_quarter_report_url && (
                                            <div className="group rounded-xl border border-[#4A7C59]/20 bg-gradient-to-br from-white to-[#4A7C59]/5 p-6 transition-all duration-300 hover:border-[#4A7C59]/40 hover:shadow-lg">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="rounded-lg bg-[#4A7C59]/10 p-2 group-hover:bg-[#4A7C59]/20 transition-colors">
                                                        {getReportIcon('first_quarter')}
                                                    </div>
                                                    <span className="text-xs font-medium text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-1 rounded-full">
                                                        {getReportPeriod('first_quarter', report.fiscal_year)}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-2">
                                                    {getReportTypeName('first_quarter')}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Quarterly financial performance and key metrics
                                                </p>
                                                <button
                                                    onClick={() => downloadFile(report.first_quarter_report_url!, 'Q1-Report-' + report.fiscal_year + '.pdf')}
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download PDF
                                                </button>
                                            </div>
                                        )}

                                        {/* Half Yearly Report */}
                                        {report.half_yearly_report && report.half_yearly_report_url && (
                                            <div className="group rounded-xl border border-[#4A7C59]/20 bg-gradient-to-br from-white to-[#4A7C59]/5 p-6 transition-all duration-300 hover:border-[#4A7C59]/40 hover:shadow-lg">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="rounded-lg bg-[#4A7C59]/10 p-2 group-hover:bg-[#4A7C59]/20 transition-colors">
                                                        {getReportIcon('half_yearly')}
                                                    </div>
                                                    <span className="text-xs font-medium text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-1 rounded-full">
                                                        {getReportPeriod('half_yearly', report.fiscal_year)}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-2">
                                                    {getReportTypeName('half_yearly')}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Six months comprehensive financial review
                                                </p>
                                                <button
                                                    onClick={() => downloadFile(report.half_yearly_report_url!, 'Half-Yearly-Report-' + report.fiscal_year + '.pdf')}
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download PDF
                                                </button>
                                            </div>
                                        )}

                                        {/* Third Quarter Report */}
                                        {report.third_quarter_report && report.third_quarter_report_url && (
                                            <div className="group rounded-xl border border-[#4A7C59]/20 bg-gradient-to-br from-white to-[#4A7C59]/5 p-6 transition-all duration-300 hover:border-[#4A7C59]/40 hover:shadow-lg">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="rounded-lg bg-[#4A7C59]/10 p-2 group-hover:bg-[#4A7C59]/20 transition-colors">
                                                        {getReportIcon('third_quarter')}
                                                    </div>
                                                    <span className="text-xs font-medium text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-1 rounded-full">
                                                        {getReportPeriod('third_quarter', report.fiscal_year)}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-2">
                                                    {getReportTypeName('third_quarter')}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Nine months cumulative financial analysis
                                                </p>
                                                <button
                                                    onClick={() => downloadFile(report.third_quarter_report_url!, 'Q3-Report-' + report.fiscal_year + '.pdf')}
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download PDF
                                                </button>
                                            </div>
                                        )}

                                        {/* Annual Report */}
                                        {report.annual_report && report.annual_report_url && (
                                            <div className="group rounded-xl border border-[#4A7C59]/20 bg-gradient-to-br from-white to-[#4A7C59]/5 p-6 transition-all duration-300 hover:border-[#4A7C59]/40 hover:shadow-lg">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="rounded-lg bg-[#4A7C59]/10 p-2 group-hover:bg-[#4A7C59]/20 transition-colors">
                                                        {getReportIcon('annual')}
                                                    </div>
                                                    <span className="text-xs font-medium text-[#4A7C59] bg-[#4A7C59]/10 px-2 py-1 rounded-full">
                                                        {getReportPeriod('annual', report.fiscal_year)}
                                                    </span>
                                                </div>
                                                <h3 className="font-semibold text-gray-900 mb-2">
                                                    {getReportTypeName('annual')}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4">
                                                    Complete annual financial statement and audit
                                                </p>
                                                <button
                                                    onClick={() => downloadFile(report.annual_report_url!, 'Annual-Report-' + report.fiscal_year + '.pdf')}
                                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#4A7C59] to-[#6B9B7A] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download PDF
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* No reports available message for this year */}
                                    {!report.first_quarter_report && !report.half_yearly_report && !report.third_quarter_report && !report.annual_report && (
                                        <div className="text-center py-8">
                                            <FileText className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                                            <p className="text-gray-600">No reports available for FY {report.fiscal_year}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Information Section */}
                <div className="mt-12 rounded-xl bg-white border border-gray-100 p-8 shadow-lg">
                    <h3 className="mb-4 text-xl font-semibold text-[#4A7C59]">Important Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">Report Types</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• <strong>Quarterly Reports:</strong> Q1 and Q3 financial summaries</li>
                                <li>• <strong>Half-Yearly Report:</strong> Six months comprehensive review</li>
                                <li>• <strong>Annual Report:</strong> Complete yearly financial statement</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-900 mb-2">File Information</h4>
                            <ul className="space-y-1 text-sm text-gray-600">
                                <li>• All reports are available in PDF format</li>
                                <li>• Files are optimized for download and printing</li>
                                <li>• Reports are published following regulatory guidelines</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FinancialStatements.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="Financial Statements" breadcrumbs={[{ label: 'Financials', href: '/financials' }]}>
        {page}
    </WebsiteLayout>
);

export default FinancialStatements;
