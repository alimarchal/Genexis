import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlertTriangle, ArrowRight, Inbox } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

interface Stat {
    key: string;
    label: string;
    value: number;
    hint: string;
    href: string;
}

interface AttentionItem {
    key: string;
    label: string;
    count: number;
    href: string;
}

interface Messages {
    total: number;
    last_7_days: number;
    last_30_days: number;
    series: { date: string; label: string; count: number }[];
    recent: { id: number; name: string; subject: string; category: string | null; submitted_at: string | null; href: string }[];
}

interface Props {
    stats: Stat[];
    attention: AttentionItem[];
    messages: Messages | null;
}

const formatDateTime = (value: string | null) =>
    value ? new Date(value).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : '';

function MessagesChart({ series }: { series: Messages['series'] }) {
    const max = Math.max(1, ...series.map((point) => point.count));

    return (
        <div role="img" aria-label="Contact messages received per day, last 14 days" className="flex h-40 items-end gap-1.5">
            {series.map((point) => (
                <div
                    key={point.date}
                    className="group flex h-full flex-1 flex-col items-center justify-end gap-1"
                    title={`${point.label}: ${point.count}`}
                >
                    <span className="text-muted-foreground text-[10px] opacity-0 transition-opacity group-hover:opacity-100">{point.count}</span>
                    <div
                        className="bg-primary/80 group-hover:bg-primary w-full rounded-t transition-colors"
                        style={{ height: `${Math.max(point.count > 0 ? 8 : 2, (point.count / max) * 100)}%`, opacity: point.count > 0 ? 1 : 0.25 }}
                    />
                    <span className="text-muted-foreground hidden text-[10px] sm:block">{point.label.slice(0, 2)}</span>
                </div>
            ))}
        </div>
    );
}

export default function Dashboard({ stats, attention, messages }: Props) {
    const { auth } = usePage<SharedData>().props;
    const firstName = auth.user?.name?.split(' ')[0];
    const pending = attention.filter((item) => item.count > 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex min-w-0 flex-1 flex-col gap-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome back{firstName ? `, ${firstName}` : ''}</h1>
                    <p className="text-muted-foreground text-sm">A quick look at what is live on the website and what needs attention.</p>
                </div>

                {stats.length === 0 && !messages && (
                    <Card>
                        <CardContent className="text-muted-foreground py-8 text-center text-sm">
                            Your account has no content permissions yet. Ask an administrator to assign a role.
                        </CardContent>
                    </Card>
                )}

                {stats.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                        {stats.map((stat) => (
                            <Link
                                key={stat.key}
                                href={stat.href}
                                className="group focus-visible:ring-ring rounded-xl outline-none focus-visible:ring-2"
                            >
                                <Card className="group-hover:border-primary/50 h-full transition-colors">
                                    <CardHeader className="pb-2">
                                        <CardDescription>{stat.label}</CardDescription>
                                        <CardTitle className="text-3xl tabular-nums">{stat.value.toLocaleString()}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-muted-foreground text-xs">{stat.hint}</CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-3">
                    {messages && (
                        <Card className="min-w-0 lg:col-span-2">
                            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-2">
                                <div>
                                    <CardTitle>Contact form messages</CardTitle>
                                    <CardDescription>Last 14 days</CardDescription>
                                </div>
                                <Link
                                    href={route('admin.contact-submissions.index')}
                                    className="text-primary inline-flex items-center gap-1 text-sm hover:underline"
                                >
                                    Open inbox <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div>
                                        <div className="text-2xl font-semibold tabular-nums">{messages.last_7_days}</div>
                                        <div className="text-muted-foreground text-xs">Last 7 days</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-semibold tabular-nums">{messages.last_30_days}</div>
                                        <div className="text-muted-foreground text-xs">Last 30 days</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-semibold tabular-nums">{messages.total}</div>
                                        <div className="text-muted-foreground text-xs">All time</div>
                                    </div>
                                </div>

                                <MessagesChart series={messages.series} />

                                <div>
                                    <h3 className="mb-2 text-sm font-medium">Latest messages</h3>
                                    {messages.recent.length === 0 ? (
                                        <p className="text-muted-foreground flex items-center gap-2 text-sm">
                                            <Inbox className="h-4 w-4" /> No messages yet.
                                        </p>
                                    ) : (
                                        <ul className="divide-y">
                                            {messages.recent.map((message) => (
                                                <li key={message.id}>
                                                    <Link
                                                        href={message.href}
                                                        className="hover:bg-muted/50 flex items-center justify-between gap-3 rounded px-1 py-2.5"
                                                    >
                                                        <span className="min-w-0">
                                                            <span className="block truncate text-sm font-medium">{message.subject}</span>
                                                            <span className="text-muted-foreground block truncate text-xs">{message.name}</span>
                                                        </span>
                                                        <span className="flex shrink-0 items-center gap-2">
                                                            {message.category && (
                                                                <Badge variant="outline">{message.category.replace(/_/g, ' ')}</Badge>
                                                            )}
                                                            <span className="text-muted-foreground text-xs">
                                                                {formatDateTime(message.submitted_at)}
                                                            </span>
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {attention.length > 0 && (
                        <Card className={messages ? 'min-w-0' : 'min-w-0 lg:col-span-3'}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-amber-500" /> Needs attention
                                </CardTitle>
                                <CardDescription>
                                    {pending.length === 0 ? 'Everything looks good.' : `${pending.length} item(s) to review`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="divide-y">
                                    {attention.map((item) => (
                                        <li key={item.key}>
                                            <Link
                                                href={item.href}
                                                className="hover:bg-muted/50 flex items-center justify-between gap-3 rounded px-1 py-2.5 text-sm"
                                            >
                                                <span>{item.label}</span>
                                                <Badge variant={item.count > 0 ? 'default' : 'outline'} className="tabular-nums">
                                                    {item.count}
                                                </Badge>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
