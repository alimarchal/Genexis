import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit } from 'lucide-react';

interface AboutUs {
    id: number;
    title: string;
    content: string;
    vision: string | null;
    mission: string | null;
    is_active: boolean;
    sort_order: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    aboutUs: AboutUs;
}

export default function ShowAboutUs({ aboutUs }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'About Us', href: route('about-us.index') },
        { title: 'View', href: route('about-us.show', aboutUs.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`About Us - ${aboutUs.title}`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title="About Us Details" description="View about us content details" />
                    <Button asChild>
                        <Link href={route('about-us.edit', aboutUs.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Content
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{aboutUs.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <div className="whitespace-pre-wrap">{aboutUs.content}</div>
                                </div>
                            </CardContent>
                        </Card>

                        {aboutUs.vision && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap">{aboutUs.vision}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {aboutUs.mission && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="prose max-w-none">
                                        <div className="whitespace-pre-wrap">{aboutUs.mission}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="mb-1 font-medium">Status</h4>
                                    <Badge variant={aboutUs.is_active ? 'default' : 'secondary'}>{aboutUs.status}</Badge>
                                </div>

                                <div>
                                    <h4 className="mb-1 font-medium">Sort Order</h4>
                                    <p className="text-muted-foreground text-sm">{aboutUs.sort_order}</p>
                                </div>

                                <div>
                                    <h4 className="mb-1 font-medium">Created</h4>
                                    <p className="text-muted-foreground text-sm">
                                        {new Date(aboutUs.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="mb-1 font-medium">Last Updated</h4>
                                    <p className="text-muted-foreground text-sm">
                                        {new Date(aboutUs.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
