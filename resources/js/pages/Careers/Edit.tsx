import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Download, FileText, Save, Upload } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    document: string | null;
    document_url: string | null;
    closing_date: string | null;
    is_active: boolean;
    is_featured: boolean;
    benefits: string | null;
}

interface Props {
    career: Career;
}

export default function EditCareer({ career }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Careers', href: route('careers.index') },
        { title: 'Edit', href: route('careers.edit', career.id) },
    ];

    const { data, setData, processing, errors } = useForm({
        title: career.title,
        description: career.description,
        requirements: career.requirements,
        location: career.location,
        document: null as File | null,
        closing_date: career.closing_date || '',
        is_active: career.is_active,
        is_featured: career.is_featured,
        benefits: career.benefits || '',
        _method: 'PUT',
    });

    const [fileName, setFileName] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('careers.update', career.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('document', file);
        setFileName(file ? file.name : '');
    };

    const getFileSize = (file: File | null): string => {
        if (!file) return '';
        return `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getCurrentFileName = (filePath: string | null): string => {
        if (!filePath) return '';
        return filePath.split('/').pop() || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Career" />
            <div className="px-10 py-6">
                <Heading title="Edit Career" description="Update the job posting" />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Job Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="e.g., Senior Software Engineer"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location *</Label>
                                    <Input
                                        id="location"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="e.g., Muzaffarabad, AJK"
                                        className={errors.location ? 'border-red-500' : ''}
                                    />
                                    {errors.location && <p className="text-sm text-red-500">{errors.location}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="closing_date">Closing Date</Label>
                                    <Input
                                        id="closing_date"
                                        type="date"
                                        value={data.closing_date}
                                        onChange={(e) => setData('closing_date', e.target.value)}
                                        className={errors.closing_date ? 'border-red-500' : ''}
                                    />
                                    {errors.closing_date && <p className="text-sm text-red-500">{errors.closing_date}</p>}
                                    <p className="text-sm text-gray-500">Leave empty for open-ended positions</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Job Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="description">Job Description *</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Detailed description of the job role, responsibilities, and expectations..."
                                        rows={6}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="requirements">Requirements *</Label>
                                    <Textarea
                                        id="requirements"
                                        value={data.requirements}
                                        onChange={(e) => setData('requirements', e.target.value)}
                                        placeholder="Education, experience, skills, and other requirements..."
                                        rows={5}
                                        className={errors.requirements ? 'border-red-500' : ''}
                                    />
                                    {errors.requirements && <p className="text-sm text-red-500">{errors.requirements}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="benefits">Benefits & Compensation</Label>
                                    <Textarea
                                        id="benefits"
                                        value={data.benefits}
                                        onChange={(e) => setData('benefits', e.target.value)}
                                        placeholder="Salary range, benefits, perks, and other compensation details..."
                                        rows={4}
                                        className={errors.benefits ? 'border-red-500' : ''}
                                    />
                                    {errors.benefits && <p className="text-sm text-red-500">{errors.benefits}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-blue-500" />
                                    <div>
                                        <CardTitle>Job Document</CardTitle>
                                        <p className="mt-1 text-sm text-gray-500">Upload detailed job description or application form</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {career.document && (
                                    <div className="space-y-2">
                                        <Label>Current Document</Label>
                                        <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                            <div className="flex flex-1 items-center gap-3">
                                                <FileText className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <div className="font-medium text-gray-900">{getCurrentFileName(career.document)}</div>
                                                    <div className="text-sm text-gray-500">Currently uploaded document</div>
                                                </div>
                                            </div>
                                            {career.document_url && (
                                                <Button asChild variant="outline" size="sm">
                                                    <a href={career.document_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="document">{career.document ? 'Replace Document' : 'Upload Document'}</Label>
                                    <div className="relative flex-1">
                                        <Input
                                            id="document"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className={errors.document ? 'border-red-500' : ''}
                                        />
                                        <Upload className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    </div>
                                    {errors.document && <p className="text-sm text-red-500">{errors.document}</p>}

                                    {fileName && (
                                        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-500" />
                                                    <span className="text-sm font-medium text-blue-900">New: {fileName}</span>
                                                </div>
                                                <span className="text-sm text-blue-600">{getFileSize(data.document)}</span>
                                            </div>
                                            {career.document && <p className="mt-1 text-xs text-blue-600">This will replace the current document</p>}
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500">
                                        {career.document
                                            ? 'Upload a new document to replace the current one (optional)'
                                            : 'Supported formats: PDF, Word (.doc, .docx). Maximum size: 300MB'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Make this job posting visible and active</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_featured" className="text-base">
                                            Featured Position
                                        </Label>
                                        <p className="text-sm text-gray-500">Highlight this job posting as featured</p>
                                    </div>
                                    <Switch
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Update Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Job Title:</span>
                                        <span className="text-gray-600">{data.title}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Location:</span>
                                        <span className="text-gray-600">{data.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Closing Date:</span>
                                        <span className="text-gray-600">
                                            {data.closing_date ? new Date(data.closing_date).toLocaleDateString() : 'Open-ended'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Status:</span>
                                        <span className="text-gray-600">{data.is_active ? 'Active' : 'Inactive'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Featured:</span>
                                        <span className="text-gray-600">{data.is_featured ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Current Document:</span>
                                        <span className="text-gray-600">{career.document ? getCurrentFileName(career.document) : 'No document'}</span>
                                    </div>
                                    {fileName && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-blue-700">New Document:</span>
                                            <span className="text-blue-600">{fileName}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('careers.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Career'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
