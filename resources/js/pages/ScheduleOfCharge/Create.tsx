import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        title: 'Schedule of Charges',
        href: route('schedule-of-charges.index'),
    },
    {
        title: 'Create',
        href: '',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        from: '',
        to: '',
        attachment: null as File | null,
        description: '',
        is_active: true as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('schedule-of-charges.store'));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('attachment', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Schedule of Charge" />

            <div className="px-10 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Heading title="Create Schedule of Charge" description="Add a new schedule of charges document" />
                    <Button variant="outline" asChild>
                        <Link href={route('schedule-of-charges.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to List
                        </Link>
                    </Button>
                </div>

                <Card className="mx-auto max-w-2xl">
                    <CardHeader>
                        <CardTitle>Schedule Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter schedule title"
                                    className={errors.title ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.title} />
                            </div>

                            {/* Date Range */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="from">From Date *</Label>
                                    <Input
                                        id="from"
                                        type="date"
                                        value={data.from}
                                        onChange={(e) => setData('from', e.target.value)}
                                        className={errors.from ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.from} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="to">To Date</Label>
                                    <Input
                                        id="to"
                                        type="date"
                                        value={data.to}
                                        onChange={(e) => setData('to', e.target.value)}
                                        className={errors.to ? 'border-red-500' : ''}
                                    />
                                    <InputError message={errors.to} />
                                    <p className="text-sm text-gray-500">Leave empty if this schedule is ongoing</p>
                                </div>
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
                                <Label htmlFor="attachment">Attachment</Label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <Input
                                            id="attachment"
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className={errors.attachment ? 'border-red-500' : ''}
                                        />
                                        <InputError message={errors.attachment} />
                                        <p className="mt-1 text-sm text-gray-500">Accepted formats: PDF, JPG, PNG (Max: 20MB)</p>
                                    </div>
                                    <Upload className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Status Switch */}
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div className="space-y-0.5">
                                    <Label htmlFor="is_active" className="text-base">
                                        Active Status
                                    </Label>
                                    <p className="text-sm text-gray-500">Enable this schedule for public viewing</p>
                                </div>
                                <Switch id="is_active" checked={data.is_active} onCheckedChange={(checked) => setData('is_active', checked)} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('schedule-of-charges.index')}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Schedule'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
