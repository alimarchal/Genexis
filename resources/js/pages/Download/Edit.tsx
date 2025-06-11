import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Downloads',
        href: route('downloads.index'),
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface Download {
    id: number;
    title: string;
    description: string | null;
    file_path: string;
    file_url: string | null;
    file_type: string | null;
    file_size: number | null;
    file_size_formatted: string;
    category: string;
    is_featured: boolean;
    is_active: boolean;
    download_count: number;
}

interface Props {
    download: Download;
}

export default function Edit({ download }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: download.title,
        description: download.description || '',
        file: null as File | null,
        category: download.category,
        is_featured: download.is_featured,
        is_active: download.is_active,
        _method: 'PUT',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('downloads.update', download.id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('file', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Download" />

            <div className="px-10 py-6">
                <div className="mb-6 flex items-center gap-4">
                    <Button variant="outline" size="sm" asChild>
                        <Link href={route('downloads.index')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Heading title="Edit Download" description="Update the download file and information" />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Download Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Current File Info */}
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <h4 className="font-medium text-gray-900">Current File</h4>
                                        <div className="mt-2 space-y-1 text-sm text-gray-600">
                                            <p>Size: {download.file_size_formatted}</p>
                                            <p>Type: {download.file_type}</p>
                                            <p>Downloads: {download.download_count}</p>
                                        </div>
                                        {download.file_url && (
                                            <Button variant="outline" size="sm" className="mt-3" asChild>
                                                <Link href={route('downloads.admin-download', download.id)}>Download Current File</Link>
                                            </Button>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Enter download title"
                                            className={errors.title ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Enter description (optional)"
                                            rows={4}
                                            className={errors.description ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.description} />
                                    </div>

                                    {/* File Upload */}
                                    <div className="space-y-2">
                                        <Label htmlFor="file">Replace File (Optional)</Label>
                                        <div className="flex items-center gap-2">
                                            <Upload className="h-4 w-4 text-gray-400" />
                                            <Input
                                                id="file"
                                                type="file"
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.zip,.rar"
                                                className={errors.file ? 'border-red-500' : ''}
                                            />
                                        </div>
                                        <p className="text-sm text-gray-500">Upload a new file to replace the current one. Max size: 50MB</p>
                                        <InputError message={errors.file} />
                                    </div>

                                    {/* Category */}
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category *</Label>
                                        <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                                            <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="forms">Forms</SelectItem>
                                                <SelectItem value="reports">Reports</SelectItem>
                                                <SelectItem value="brochures">Brochures</SelectItem>
                                                <SelectItem value="policies">Policies</SelectItem>
                                                <SelectItem value="general">General</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.category} />
                                    </div>

                                    {/* Switches */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="is_active" className="text-base">
                                                    Active
                                                </Label>
                                                <p className="text-sm text-gray-500">Make this download available to the public</p>
                                            </div>
                                            <Switch
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) => setData('is_active', checked)}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label htmlFor="is_featured" className="text-base">
                                                    Featured
                                                </Label>
                                                <p className="text-sm text-gray-500">Highlight this download in listings</p>
                                            </div>
                                            <Switch
                                                id="is_featured"
                                                checked={data.is_featured}
                                                onCheckedChange={(checked) => setData('is_featured', checked)}
                                            />
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" asChild>
                                            <Link href={route('downloads.index')}>Cancel</Link>
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            <Save className="mr-2 h-4 w-4" />
                                            {processing ? 'Updating...' : 'Update Download'}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Status Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Visibility</span>
                                    <Badge variant={download.is_active ? 'default' : 'secondary'}>{download.is_active ? 'Active' : 'Inactive'}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Featured</span>
                                    <Badge variant={download.is_featured ? 'default' : 'outline'}>{download.is_featured ? 'Yes' : 'No'}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Category</span>
                                    <Badge variant="outline" className="capitalize">
                                        {download.category}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={route('downloads.show', download.id)}>View Details</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={route('downloads.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
