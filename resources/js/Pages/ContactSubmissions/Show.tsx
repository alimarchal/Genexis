import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

interface Submission {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    district: string | null;
    tehsil: string | null;
    place: string | null;
    category: string | null;
    subject: string;
    message: string;
    submitted_at: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contact Messages', href: '/admin/contact-submissions' },
    { title: 'Message', href: '#' },
];

function Field({ label, value }: { label: string; value: string | null }) {
    return (
        <div>
            <dt className="text-muted-foreground text-xs uppercase">{label}</dt>
            <dd className="text-sm break-words">{value || '-'}</dd>
        </div>
    );
}

export default function Show({ submission }: { submission: Submission }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={submission.subject} />
            <div className="mx-auto max-w-3xl px-4 py-6 md:px-10">
                <Button asChild variant="ghost" size="sm" className="mb-4">
                    <Link href={route('admin.contact-submissions.index')}>
                        <ArrowLeft className="mr-1 h-4 w-4" /> Back to messages
                    </Link>
                </Button>
                <Heading title={submission.subject} description={submission.submitted_at ? new Date(submission.submitted_at).toLocaleString('en-GB') : ''} />

                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">
                            {submission.name}
                            {submission.category && <Badge variant="outline">{submission.category.replace(/_/g, ' ')}</Badge>}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <dl className="grid gap-4 sm:grid-cols-2">
                            <Field label="E-mail" value={submission.email} />
                            <Field label="Phone" value={submission.phone} />
                            <Field label="District" value={submission.district} />
                            <Field label="Tehsil" value={submission.tehsil} />
                            <Field label="Place" value={submission.place} />
                        </dl>
                        <div>
                            <div className="text-muted-foreground mb-1 text-xs uppercase">Message</div>
                            <p className="bg-muted/40 rounded-md p-4 text-sm leading-relaxed whitespace-pre-wrap">{submission.message}</p>
                        </div>
                        <Button asChild>
                            <a href={`mailto:${submission.email}?subject=${encodeURIComponent('Re: ' + submission.subject)}`}>Reply by e-mail</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
