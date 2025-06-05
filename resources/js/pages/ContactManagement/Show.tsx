import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, Mail, Phone, User, Users } from 'lucide-react';

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

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('contacts.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Contacts
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={route('contacts.edit', contact.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Contact
                        </Link>
                    </Button>
                </div>

                <Heading title="Contact Details" description="View complete information about this contact" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Full Name</p>
                                        <p className="font-medium">{contact.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Position</p>
                                        <p className="font-medium">{contact.position}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Department</p>
                                        <p className="font-medium">{contact.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Branch</p>
                                        <p className="font-medium">{contact.branch.name} ({contact.branch.code})</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Email</p>
                                        <p className="font-medium flex items-center gap-1">
                                            <Mail className="h-4 w-4" />
                                            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
                                                {contact.email}
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Phone</p>
                                        <p className="font-medium flex items-center gap-1">
                                            <Phone className="h-4 w-4" />
                                            <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
                                                {contact.phone}
                                            </a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Status</p>
                                        <Badge variant={contact.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                                            {contact.status}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Timeline
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Created At</p>
                                        <p className="text-sm font-medium">{formatDate(contact.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(contact.updated_at)}</p>
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
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route('contacts.edit', contact.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Contact
                                    </Link>
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
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('contacts.index')}>View All Contacts</Link>
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
