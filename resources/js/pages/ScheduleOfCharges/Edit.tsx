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

interface ScheduleOfCharge {
    id: number;
    title: string;
    from: string;
    to: string | null;
    attachment: string | null;
    attachment_url: string | null;
    description: string | null;
    is_active: boolean;
}

interface Props {
    scheduleOfCharge: ScheduleOfCharge;
}

export default function EditScheduleOfCharge({ scheduleOfCharge }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Schedule of Charges', href: route('schedule-of-charges.index') },
        { title: 'Edit', href: route('schedule-of-charges.edit', scheduleOfCharge.id) },
    ];

    const { data, setData, processing, errors } = useForm({
        title: scheduleOfCharge.title,
        from: scheduleOfCharge.from,
        to: scheduleOfCharge.to || '',
        attachment: null as File | null,
        description: scheduleOfCharge.description || '',
        is_active: scheduleOfCharge.is_active,
        _method: 'PUT',
    });

    const [fileName, setFileName] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('schedule-of-charges.update', scheduleOfCharge.id), {
            ...data,
            _method: 'PUT',
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('attachment', file);
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
            <Head title="Edit Schedule of Charges" />
            <div className="px-10 py-6">
                <Heading title="Edit Schedule of Charges" description="Update the banking charges schedule" />
                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter schedule title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="from">Start Date *</Label>
                                        <Input
                                            id="from"
                                            type="date"
                                            value={data.from}
                                            onChange={(e) => setData('from', e.target.value)}
                                            className={errors.from ? 'border-red-500' : ''}
                                        />
                                        {errors.from && <p className="text-sm text-red-500">{errors.from}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="to">End Date</Label>
                                        <Input
                                            id="to"
                                            type="date"
                                            value={data.to}
                                            onChange={(e) => setData('to', e.target.value)}
                                            className={errors.to ? 'border-red-500' : ''}
                                        />
                                        {errors.to && <p className="text-sm text-red-500">{errors.to}</p>}
                                        <p className="text-sm text-gray-500">Leave empty for ongoing schedule</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Brief description of the charges"
                                        rows={3}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-indigo-500" />
                                    <div>
                                        <CardTitle>Attachment</CardTitle>
                                        <p className="mt-1 text-sm text-gray-500">Upload the charges document or file</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {scheduleOfCharge.attachment && (
                                    <div className="space-y-2">
                                        <Label>Current File</Label>
                                        <div className="flex items-center gap-4 rounded-md bg-gray-50 p-4">
                                            <div className="flex flex-1 items-center gap-3">
                                                <FileText className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <div className="font-medium text-gray-900">{getCurrentFileName(scheduleOfCharge.attachment)}</div>
                                                    <div className="text-sm text-gray-500">Currently uploaded file</div>
                                                </div>
                                            </div>
                                            {scheduleOfCharge.attachment_url && (
                                                <Button asChild variant="outline" size="sm">
                                                    <a href={scheduleOfCharge.attachment_url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="mr-2 h-4 w-4" />
                                                        Download
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="attachment">{scheduleOfCharge.attachment ? 'Replace File' : 'Upload File'}</Label>
                                    <div className="relative flex-1">
                                        <Input
                                            id="attachment"
                                            type="file"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx"
                                            onChange={handleFileChange}
                                            className={errors.attachment ? 'border-red-500' : ''}
                                        />
                                        <Upload className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    </div>
                                    {errors.attachment && <p className="text-sm text-red-500">{errors.attachment}</p>}

                                    {fileName && (
                                        <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-blue-500" />
                                                    <span className="text-sm font-medium text-blue-900">New: {fileName}</span>
                                                </div>
                                                <span className="text-sm text-blue-600">{getFileSize(data.attachment)}</span>
                                            </div>
                                            {scheduleOfCharge.attachment && (
                                                <p className="mt-1 text-xs text-blue-600">This will replace the current file</p>
                                            )}
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500">
                                        {scheduleOfCharge.attachment
                                            ? 'Upload a new file to replace the current one (optional)'
                                            : 'Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx). Maximum size: 300MB'}
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
                                        <p className="text-sm text-gray-500">Make this schedule visible and active</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
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
                                        <span className="font-medium">Title:</span>
                                        <span className="text-gray-600">{data.title}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Date Range:</span>
                                        <span className="text-gray-600">
                                            {data.from ? new Date(data.from).toLocaleDateString() : 'Not set'} -{' '}
                                            {data.to ? new Date(data.to).toLocaleDateString() : 'Ongoing'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Status:</span>
                                        <span className="text-gray-600">{data.is_active ? 'Active' : 'Inactive'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Current File:</span>
                                        <span className="text-gray-600">
                                            {scheduleOfCharge.attachment ? getCurrentFileName(scheduleOfCharge.attachment) : 'No file'}
                                        </span>
                                    </div>
                                    {fileName && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-blue-700">New File:</span>
                                            <span className="text-blue-600">{fileName}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('schedule-of-charges.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Schedule'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
