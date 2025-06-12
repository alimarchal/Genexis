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

            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-900 via-teal-800 to-green-900 text-white">
                    <div className="mx-auto max-w-7xl px-6 py-8">
                        <div className="mb-6">
                            <Link
                                href={route('public-careers')}
                                className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"
                            >
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
                                <div className="flex flex-wrap items-center gap-6 text-emerald-100">
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
                        <div className="lg:col-span-2 space-y-8">
                            {/* Job Description */}
                            <div className="rounded-lg bg-white p-8 shadow-sm">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900">Job Description</h2>
                                <div className="prose prose-emerald max-w-none text-gray-700">
                                    {formatText(career.description)}
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="rounded-lg bg-white p-8 shadow-sm">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900">Requirements</h2>
                                <div className="prose prose-emerald max-w-none text-gray-700">
                                    {formatText(career.requirements)}
                                </div>
                            </div>

                            {/* Benefits */}
                            {career.benefits && (
                                <div className="rounded-lg bg-white p-8 shadow-sm">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Benefits</h2>
                                    <div className="prose prose-emerald max-w-none text-gray-700">
                                        {formatText(career.benefits)}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Application Card */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Apply for this Position</h3>

                                <div className="mb-4 space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="h-4 w-4" />
                                        <span>Posted: {formatPostedDate(career.created_at)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="h-4 w-4" />
                                        <span>Location: {career.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4" />
                                        <span className={isExpired(career.closing_date) ? 'text-red-600 font-medium' : 'text-gray-600'}>
                                            Deadline: {formatDate(career.closing_date)}
                                        </span>
                                    </div>
                                </div>

                                {career.document_url && (
                                    <div className="mb-4">
                                        <a
                                            href={route('public-careers.download', career.id)}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                                        >
                                            <Download className="h-4 w-4" />
                                            Download Job Description
                                        </a>
                                    </div>
                                )}

                                {isExpired(career.closing_date) ? (
                                    <div className="rounded-lg bg-red-50 p-4 text-center">
                                        <p className="text-sm font-medium text-red-800">
                                            Application deadline has passed
                                        </p>
                                    </div>
                                ) : (
                                    <div className="rounded-lg bg-emerald-50 p-4 text-center">
                                        <p className="mb-2 text-sm text-emerald-700">
                                            Interested in this position?
                                        </p>
                                        <p className="text-xs text-emerald-600">
                                            Please visit our nearest branch or contact HR department for application details.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Job Info */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Job Information</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Position:</span>
                                        <span className="font-medium text-gray-900">{career.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Location:</span>
                                        <span className="font-medium text-gray-900">{career.location}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Views:</span>
                                        <span className="font-medium text-gray-900">{career.views_count}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Posted:</span>
                                        <span className="font-medium text-gray-900">{formatPostedDate(career.created_at)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Share */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Share this Job</h3>
                                <p className="text-sm text-gray-600">
                                    Share this opportunity with someone who might be interested.
                                </p>
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
        title="Career Details"
        breadcrumbs={[
            { label: 'Careers', href: '/careers' },
            { label: 'Career Details', isActive: true }
        ]}
    >
        {page}
    </WebsiteLayout>
);
