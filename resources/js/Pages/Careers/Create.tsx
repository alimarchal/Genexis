import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import UploadField from '@/components/upload-field';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FileText, Save } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Careers', href: route('careers.index') },
    { title: 'Create', href: route('careers.create') },
];

export default function CreateCareer() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        requirements: '',
        location: '',
        document_upload_id: null as string | null,
        closing_date: '',
        is_active: true as boolean,
        is_featured: false as boolean,
        benefits: '',
    });

    const [uploading, setUploading] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('careers.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Career" />
            <div className="px-10 py-6">
                <Heading title="Create Career" description="Add a new job posting" />
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
                            <CardContent className="space-y-4">
                                <UploadField
                                    context="careers"
                                    label="File"
                                    accept={['pdf', 'doc', 'docx']}
                                    onChange={(id) => setData('document_upload_id', id)}
                                    onBusyChange={setUploading}
                                    error={errors.document_upload_id ?? (errors as Record<string, string | undefined>).document}
                                />
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
                                <CardTitle>Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Job Title:</span>
                                        <span className="text-gray-600">{data.title || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Location:</span>
                                        <span className="text-gray-600">{data.location || 'Not specified'}</span>
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
                                        <span className="font-medium">Document:</span>
                                        <span className="text-gray-600">{(data.document_upload_id ? 'Uploaded' : '') || 'No document uploaded'}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('careers.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing || uploading}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Career'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
