import AuditInfo from '@/components/audit-info';
import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface Record {
    id: number;
    title: string;
    order: number;
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
    creator?: { name: string } | null;
    updater?: { name: string } | null;
    summary: string | null;
    content: string | null;
    image_url: string | null;
    route_map_image_url: string | null;
}

export default function ShowTouristAttraction({ attraction }: { attraction: Record }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Tourist Attractions', href: route('tourist-attractions.index') },
        { title: attraction.title, href: route('tourist-attractions.show', attraction.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={attraction.title} />

            <div className="px-10 py-6">
                <div className="flex items-start justify-between">
                    <Heading title={attraction.title} description="Display order {attraction.order}" />
                    <Button asChild>
                        <Link href={route('tourist-attractions.edit', attraction.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>

                <div className="mt-6 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                Details
                                <Badge variant={attraction.status === 'active' ? 'default' : 'secondary'}>{attraction.status}</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {attraction.summary && <p className="text-sm font-medium text-gray-700">{attraction.summary}</p>}
                            {attraction.content && <p className="text-sm whitespace-pre-line text-gray-700">{attraction.content}</p>}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {attraction.image_url && <img src={attraction.image_url} alt={attraction.title} className="w-full rounded-md object-cover" />}
                                {attraction.route_map_image_url && <img src={attraction.route_map_image_url} alt="Route map" className="w-full rounded-md object-cover" />}
                            </div>
                        </CardContent>
                    </Card>

                    <AuditInfo record={attraction} />
                </div>
            </div>
        </AppLayout>
    );
}
