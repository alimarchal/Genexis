import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Save } from 'lucide-react';

interface Division {
    id: number;
    name: string;
    short_name: string;
}

interface Region {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    division_id: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    region: Region;
    divisions: Division[];
}

export default function Edit({ region, divisions }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Regions',
            href: route('regions.index'),
        },
        {
            title: region.name,
            href: route('regions.show', region.id),
        },
        {
            title: 'Edit',
            href: route('regions.edit', region.id),
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: region.name,
        status: region.status,
        division_id: region.division_id?.toString() || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('regions.update', region.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${region.name}`} />

            <div className="px-10 py-6">
                <Heading title={`Edit Region: ${region.name}`} description="Update region information" />

                <div className="mt-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Region Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Region Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Enter region name"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                            <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                    </div>
                                </div>

                                {/* Division - Full width */}
                                <div className="space-y-2">
                                    <Label htmlFor="division_id">Division</Label>
                                    <Select value={data.division_id} onValueChange={(value) => setData('division_id', value)}>
                                        <SelectTrigger id="division_id" className={errors.division_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select a division" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {divisions.map((division) => (
                                                <SelectItem key={division.id} value={division.id.toString()}>
                                                    {division.name} ({division.short_name})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.division_id && <p className="text-sm text-red-500">{errors.division_id}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('regions.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Region'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
