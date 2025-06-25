import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Hash, MessageSquare, Palette } from 'lucide-react';

interface TopNavbarMessage {
    id: number;
    type: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    icon: string;
    text: string;
    color: string;
    bg_color: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    message: TopNavbarMessage;
}

export default function Show({ message }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'Top Navbar Messages', href: route('top-navbar-messages.index') },
        { title: message.type, href: route('top-navbar-messages.show', message.id) },
    ];

    const getPriorityColor = (priority: string) => {
        const colors = {
            low: 'bg-gray-100 text-gray-800',
            medium: 'bg-blue-100 text-blue-800',
            high: 'bg-orange-100 text-orange-800',
            urgent: 'bg-red-100 text-red-800',
        };
        return colors[priority as keyof typeof colors] || colors.medium;
    };

    const getStatusBadge = () => {
        return message.is_active ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${message.type} - Top Navbar Message`} />
            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={message.type} description="Top navbar message details" />
                    <Button asChild>
                        <Link href={route('top-navbar-messages.edit', message.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Message
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                                        <div className="text-3xl">{message.icon}</div>
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">{message.type}</CardTitle>
                                            <p className="mt-2 text-lg text-gray-600">{message.text}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge()}
                                            <Badge className={getPriorityColor(message.priority)}>{message.priority.toUpperCase()}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        <Card className="mb-6">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <Palette className="h-5 w-5 text-indigo-500" />
                                    <div>
                                        <CardTitle className="text-lg">Appearance Preview</CardTitle>
                                        <p className="mt-1 text-sm text-gray-500">How this message appears to users</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className={`rounded-lg bg-gradient-to-r p-4 ${message.bg_color}`}>
                                    <div className="flex items-center gap-3">
                                        <div className="text-lg">{message.icon}</div>
                                        <div>
                                            <div className="font-medium text-gray-800">{message.type}</div>
                                            <div className="text-sm text-gray-600">{message.text}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Text Color:</span>
                                        <code className="rounded bg-gray-100 px-2 py-1 text-xs">{message.color}</code>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium">Background Color:</span>
                                        <code className="rounded bg-gray-100 px-2 py-1 text-xs">{message.bg_color}</code>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">ID</p>
                                        <p className="text-sm text-gray-600">#{message.id}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Type</p>
                                        <p className="text-sm text-gray-600">{message.type}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Priority</p>
                                        <div className="mt-1">
                                            <Badge className={getPriorityColor(message.priority)}>{message.priority.toUpperCase()}</Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Configuration</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Active:</span>
                                    <span className="text-gray-600">{message.is_active ? 'Yes' : 'No'}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Sort Order:</span>
                                    <span className="text-gray-600">{message.sort_order}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between">
                                    <span className="font-medium">Icon:</span>
                                    <span className="text-lg">{message.icon}</span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{formatDate(message.created_at)}</p>
                                </div>
                                <Separator />
                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{formatDate(message.updated_at)}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('top-navbar-messages.edit', message.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Message
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('top-navbar-messages.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
