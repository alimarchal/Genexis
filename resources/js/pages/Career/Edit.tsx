import Heading from '@/components/heading';
import InputError from '@/components/input-error';
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
import { ArrowLeft, Download, FileText, Save, Upload } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
    {
        title: 'Careers',
        href: route('careers.index'),
    },
    {
        title: 'Edit',
        href: '',
    },
];

interface Career {
    id: number;
    title: string;
    description: string;
    requirements: string;
    location: string;
    document: string | null;
    document_url: string | null;
    closing_date: string | null;
    benefits: string | null;
    is_featured: boolean;
    is_active: boolean;
    views_count: number;
}

interface Props {
    career: Career;
}

export default function Edit({ career }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: career.title || '',
        description: career.description || '',
        requirements: career.requirements || '',
        location: career.location || '',
        document: null as File | null,
        closing_date: career.closing_date || '',
        benefits: career.benefits || '',
        is_featured: career.is_featured || false,
        is_active: career.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('careers.update', career.id));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('document', file);
    };

    const locations = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Career - ${career.title}`} />

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="Edit Career" description={`Update job posting: ${career.title}`} breadcrumbs={breadcrumbs} />
                    <div className="flex gap-2">
                        {career.document_url && (
                            <Link href={route('careers.admin-download', career.id)}>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Download Current
                                </Button>
                            </Link>
                        )}
                        <Link href={route('careers.index')}>
                            <Button variant="outline">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Careers
                            </Button>
                        </Link>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Career Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Job Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Enter job title"
                                        className={errors.title ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location">Location *</Label>
                                    <Select value={data.location} onValueChange={(value) => setData('location', value)}>
                                        <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {locations.map((location) => (
                                                <SelectItem key={location} value={location}>
                                                    {location}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.location} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="closing_date">Closing Date</Label>
                                    <Input
                                        id="closing_date"
                                        type="date"
                                        value={data.closing_date}
                                        onChange={(e) => setData('closing_date', e.target.value)}
                                        className={errors.closing_date ? 'border-red-500' : ''}
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                    <InputError message={errors.closing_date} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="document">Job Description Document (PDF)</Label>
                                    <div className="space-y-2">
                                        {career.document_url && (
                                            <div className="flex items-center gap-2 rounded-md border p-2">
                                                <FileText className="text-muted-foreground h-4 w-4" />
                                                <span className="text-sm">Current document available</span>
                                                <Link
                                                    href={route('careers.admin-download', career.id)}
                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    Download
                                                </Link>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Input
                                                id="document"
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                className={errors.document ? 'border-red-500' : ''}
                                            />
                                            <Upload className="text-muted-foreground h-4 w-4" />
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            {career.document_url
                                                ? 'Upload a new PDF to replace the current document (max 10MB)'
                                                : 'Upload a PDF document with detailed job description (max 10MB)'}
                                        </p>
                                    </div>
                                    <InputError message={errors.document} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Job Description *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Enter detailed job description"
                                    rows={6}
                                    className={errors.description ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="requirements">Requirements *</Label>
                                <Textarea
                                    id="requirements"
                                    value={data.requirements}
                                    onChange={(e) => setData('requirements', e.target.value)}
                                    placeholder="Enter job requirements and qualifications"
                                    rows={5}
                                    className={errors.requirements ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.requirements} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="benefits">Benefits & Compensation</Label>
                                <Textarea
                                    id="benefits"
                                    value={data.benefits}
                                    onChange={(e) => setData('benefits', e.target.value)}
                                    placeholder="Enter benefits, compensation, and perks"
                                    rows={4}
                                    className={errors.benefits ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.benefits} />
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked)}
                                    />
                                    <Label htmlFor="is_featured">Featured Position</Label>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Updating...' : 'Update Career'}
                                </Button>
                                <Link href={route('careers.index')}>
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="text-center">
                                <div className="text-primary text-2xl font-bold">{career.views_count}</div>
                                <div className="text-muted-foreground text-sm">Total Views</div>
                            </div>
                            <div className="text-center">
                                <div className="text-primary text-2xl font-bold">{career.is_featured ? 'Yes' : 'No'}</div>
                                <div className="text-muted-foreground text-sm">Featured</div>
                            </div>
                            <div className="text-center">
                                <div className="text-primary text-2xl font-bold">{career.is_active ? 'Active' : 'Inactive'}</div>
                                <div className="text-muted-foreground text-sm">Status</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
