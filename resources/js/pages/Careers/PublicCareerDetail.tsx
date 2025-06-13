import WebsiteLayout from '@/layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Briefcase, Calendar, Download, Eye, MapPin } from 'lucide-react';
import React from 'react';

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    closing_date: string | null;
    benefits: string | null;
    views_count: number;
    document_url: string | null;
    created_at: string;
}

interface Props {
    career: Career;
}

export default function PublicCareerDetail({ career }: Props) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No deadline';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatPostedDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const isExpired = (closingDate: string | null) => {
        if (!closingDate) return false;
        return new Date(closingDate) < new Date();
    };

    const formatText = (text: string) => {
        return text.split('\n').map((line, index) => (
            <p key={index} className="mb-2">
                {line}
            </p>
        ));
    };

    return (
        <>
            <Head title={`${career.title} - Career Opportunity`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-8">
                        <div className="mb-6">
                            <Link href={route('public-careers')} className="inline-flex items-center gap-2 text-blue-200 hover:text-white">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Careers
                            </Link>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="rounded-lg bg-white/10 p-3">
                                <Briefcase className="h-8 w-8" />
                            </div>
                            <div className="flex-1">
                                <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{career.title}</h1>
                                <div className="flex flex-wrap items-center gap-6 text-blue-100">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        <span>{career.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        <span className={isExpired(career.closing_date) ? 'text-red-300' : ''}>
                                            Application Deadline: {formatDate(career.closing_date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        <span>{career.views_count} views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-6 py-12">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-8 lg:col-span-2">
                            {/* Job Description */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900">Job Description</h2>
                                <div className="prose max-w-none text-gray-700">{formatText(career.description)}</div>
                            </div>

                            {/* Requirements */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900">Requirements</h2>
                                <div className="prose max-w-none text-gray-700">{formatText(career.requirements)}</div>
                            </div>

                            {/* Benefits */}
                            {career.benefits && (
                                <div className="rounded-lg bg-white p-6 shadow-sm">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Benefits</h2>
                                    <div className="prose max-w-none text-gray-700">{formatText(career.benefits)}</div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Position Details</h3>
                                <dl className="space-y-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Location</dt>
                                        <dd className="mt-1 flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{career.location}</span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Application Deadline</dt>
                                        <dd className="mt-1 flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-400" />
                                            <span className={`text-sm ${isExpired(career.closing_date) ? 'text-red-600' : 'text-gray-900'}`}>
                                                {formatDate(career.closing_date)}
                                            </span>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Posted Date</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{formatPostedDate(career.created_at)}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Views</dt>
                                        <dd className="mt-1 flex items-center gap-2">
                                            <Eye className="h-4 w-4 text-gray-400" />
                                            <span className="text-sm text-gray-900">{career.views_count}</span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            {/* Application Actions */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Apply Now</h3>
                                <div className="space-y-3">
                                    {career.document_url ? (
                                        <a
                                            href={route('public-careers.download', career.id)}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Application Form
                                        </a>
                                    ) : (
                                        <div className="rounded-lg bg-gray-50 p-4 text-center">
                                            <p className="text-sm text-gray-600">
                                                No application form available. Please contact HR for more information.
                                            </p>
                                        </div>
                                    )}

                                    {isExpired(career.closing_date) && (
                                        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                                            <p className="text-sm font-medium text-red-600">⚠️ Application deadline has passed</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Questions?</h3>
                                <p className="mb-4 text-sm text-gray-600">
                                    For any questions regarding this position, please contact our HR department.
                                </p>
                                <Link
                                    href={route('contact')}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                                >
                                    Contact HR
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

PublicCareerDetail.layout = (page: React.ReactNode) => (
    <WebsiteLayout
        title="Career Opportunity"
        breadcrumbs={[
            { label: 'Careers', href: '/careers' },
            { label: 'Job Details', isActive: true },
        ]}
    >
        {page}
    </WebsiteLayout>
);
