import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { FileText, Save, Upload } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: route('dashboard') },
    { title: 'Downloads', href: route('downloads.index') },
    { title: 'Create', href: route('downloads.create') },
];

export default function CreateDownload() {
    const { data, setData, processing, errors } = useForm({
        title: '',
        description: '',
        file: null as File | null,
        category: 'general',
        is_featured: false,
        is_active: true,
    });

    const [fileName, setFileName] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.post(route('downloads.store'), data);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('file', file);
        setFileName(file ? file.name : '');
    };

    const getFileSize = (file: File | null): string => {
        if (!file) return '';
        return `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getFileType = (file: File | null): string => {
        if (!file) return '';
        return file.type || 'Unknown';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Download" />
            <div className="px-10 py-6">
                <Heading title="Create Download" description="Add a new downloadable file or resource" />
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
                                        placeholder="Enter download title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="Document">Document</SelectItem>
                                            <SelectItem value="picture">Picture</SelectItem>
                                            <SelectItem value="form">Form</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Brief description of the download"
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
                                        <CardTitle>File Upload</CardTitle>
                                        <p className="mt-1 text-sm text-gray-500">Upload the file to be downloaded</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="file">Upload File *</Label>
                                    <div className="relative flex-1">
                                        <Input
                                            id="file"
                                            type="file"
                                            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.zip,.rar"
                                            onChange={handleFileChange}
                                            className={errors.file ? 'border-red-500' : ''}
                                        />
                                        <Upload className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                                    </div>
                                    {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}

                                    {fileName && (
                                        <div className="rounded-md bg-gray-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-gray-500" />
                                                    <span className="text-sm font-medium text-gray-900">{fileName}</span>
                                                </div>
                                                <span className="text-sm text-gray-500">{getFileSize(data.file)}</span>
                                            </div>
                                            <div className="mt-1 text-xs text-gray-500">Type: {getFileType(data.file)}</div>
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-500">
                                        Supported formats: PDF, Word (.doc, .docx), Excel (.xls, .xlsx), Images (.jpg, .jpeg, .png, .gif), Archives
                                        (.zip, .rar). Maximum size: 100MB
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
                                        <Label htmlFor="is_featured" className="text-base">
                                            Featured Download
                                        </Label>
                                        <p className="text-sm text-gray-500">Mark this download as featured</p>
                                    </div>
                                    <Switch
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Make this download visible and active</p>
                                    </div>
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
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
                                        <span className="font-medium">Title:</span>
                                        <span className="text-gray-600">{data.title || 'Not specified'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Category:</span>
                                        <span className="text-gray-600">{data.category}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Featured:</span>
                                        <span className="text-gray-600">{data.is_featured ? 'Yes' : 'No'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Status:</span>
                                        <span className="text-gray-600">{data.is_active ? 'Active' : 'Inactive'}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">File:</span>
                                        <span className="text-gray-600">{fileName || 'No file selected'}</span>
                                    </div>
                                    {data.file && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium">File Size:</span>
                                            <span className="text-gray-600">{getFileSize(data.file)}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('downloads.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Download'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
