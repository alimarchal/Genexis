import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, Calendar, Edit, Mail, MapPin, Phone, User } from 'lucide-react';

interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    branch_id: number;
    branch: {
        id: number;
        name: string;
        code: string;
    };
    status: 'active' | 'inactive';
    created_at: string;
    updated_at: string;
}

interface Props {
    contact: Contact;
}

export default function ShowContact({ contact }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Contacts',
            href: route('contacts.index'),
        },
        {
            title: contact.name,
            href: route('contacts.show', contact.id),
        },
    ];

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
            <Head title={`${contact.name} - Contact`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={contact.name} description="View contact details" />
                    <Button asChild>
                        <Link href={route('contacts.edit', contact.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Contact
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Full Name</p>
                                        <p className="text-lg font-semibold">{contact.name}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Status</p>
                                        <Badge variant={contact.status === 'active' ? 'default' : 'secondary'}>{contact.status}</Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                                            <Mail className="h-4 w-4" />
                                            Email Address
                                        </p>
                                        <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                                            {contact.email}
                                        </a>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                                            <Phone className="h-4 w-4" />
                                            Phone Number
                                        </p>
                                        <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800">
                                            {contact.phone}
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Work Information */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Work Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Position</p>
                                        <p className="text-lg font-semibold">{contact.position}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Department</p>
                                        <p className="text-lg font-semibold">{contact.department}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                                            <MapPin className="h-4 w-4" />
                                            Branch
                                        </p>
                                        <p className="text-lg font-semibold">
                                            {contact.branch?.name || 'N/A'}
                                            {contact.branch?.code && <span className="text-sm text-gray-500"> ({contact.branch.code})</span>}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timeline */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Created At</p>
                                        <p className="text-sm">{formatDate(contact.created_at)}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground text-sm font-medium">Last Updated</p>
                                        <p className="text-sm">{formatDate(contact.updated_at)}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button className="w-full" asChild>
                                    <Link href={route('contacts.edit', contact.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Contact
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('contacts.index')}>View All Contacts</Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href={`mailto:${contact.email}`}>
                                        <Mail className="mr-2 h-4 w-4" />
                                        Send Email
                                    </a>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <a href={`tel:${contact.phone}`}>
                                        <Phone className="mr-2 h-4 w-4" />
                                        Call
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Contact ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-mono text-2xl font-bold">#{contact.id.toString().padStart(4, '0')}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
