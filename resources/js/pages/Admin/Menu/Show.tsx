import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, ExternalLink, Eye, Hash, Link as LinkIcon, Menu as MenuIcon, Plus, Settings, Users } from 'lucide-react';

interface MenuItem {
    id: number;
    title: string;
    slug: string;
    url: string | null;
    route_name: string | null;
    route_params: any;
    target: '_self' | '_blank';
    icon: string | null;
    parent_id: number | null;
    sort_order: number;
    is_active: boolean;
    is_mega_menu: boolean;
    css_class: string | null;
    created_at: string;
    updated_at: string;
    parent?: {
        id: number;
        title: string;
    };
    children?: MenuItem[];
}

interface Props {
    menu: MenuItem;
}

export default function ShowMenu({ menu }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Menus',
            href: route('admin.menus.index'),
        },
        {
            title: menu.title,
            href: route('admin.menus.show', menu.id),
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

    const getMenuUrl = () => {
        if (menu.route_name) {
            try {
                return route(menu.route_name, menu.route_params || {});
            } catch (e) {
                return menu.route_name;
            }
        }
        return menu.url || '#';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${menu.title} - Menu Details`} />

            <div className="px-4 py-6">
                <div className="mb-6 flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={route('admin.menus.index')}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Menu Items
                        </Link>
                    </Button>
                    <div className="flex gap-2">
                        {menu.url && (
                            <Button variant="outline" asChild>
                                <a href={getMenuUrl()} target={menu.target} rel="noopener noreferrer">
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Page
                                    {menu.target === '_blank' && <ExternalLink className="ml-1 h-3 w-3" />}
                                </a>
                            </Button>
                        )}
                        <Button asChild>
                            <Link href={route('admin.menus.edit', menu.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Menu Item
                            </Link>
                        </Button>
                    </div>
                </div>

                <Heading title="Menu Item Details" description="View complete information about this menu item and its configuration" />

                <div className="grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Information */}
                    <div className="space-y-6 lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MenuIcon className="h-5 w-5" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">Menu Title</p>
                                        <p className="text-lg font-medium">{menu.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Slug</p>
                                        <p className="bg-muted rounded px-2 py-1 font-mono text-sm font-medium">{menu.slug}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Display Order</p>
                                        <p className="flex items-center gap-1 font-medium">
                                            <Hash className="h-4 w-4" />
                                            {menu.sort_order}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Status</p>
                                        <Badge variant={menu.is_active ? 'default' : 'secondary'} className="mt-1">
                                            {menu.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </div>
                                </div>

                                {menu.parent && (
                                    <div className="border-t pt-4">
                                        <p className="text-muted-foreground mb-2 text-sm">Parent Menu</p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{menu.parent.title}</Badge>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={route('admin.menus.show', menu.parent.id)}>
                                                    <Eye className="mr-1 h-3 w-3" />
                                                    View Parent
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* URL/Route Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LinkIcon className="h-5 w-5" />
                                    Navigation Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <p className="text-muted-foreground text-sm">URL</p>
                                        {menu.url ? (
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium break-all">{menu.url}</p>
                                                {menu.target === '_blank' && <ExternalLink className="text-muted-foreground h-4 w-4" />}
                                            </div>
                                        ) : (
                                            <p className="text-muted-foreground">Not set</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Route Name</p>
                                        {menu.route_name ? (
                                            <p className="rounded bg-blue-50 px-2 py-1 font-mono text-sm font-medium text-blue-700">
                                                {menu.route_name}
                                            </p>
                                        ) : (
                                            <p className="text-muted-foreground">Not set</p>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Link Target</p>
                                        <Badge variant="outline">{menu.target === '_blank' ? 'New Window/Tab' : 'Same Window'}</Badge>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Generated URL</p>
                                        <p className="text-sm font-medium break-all">{getMenuUrl()}</p>
                                    </div>
                                </div>

                                {menu.route_params && Object.keys(menu.route_params).length > 0 && (
                                    <div className="border-t pt-4">
                                        <p className="text-muted-foreground mb-2 text-sm">Route Parameters</p>
                                        <pre className="bg-muted overflow-x-auto rounded p-3 text-sm">
                                            {JSON.stringify(menu.route_params, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Children Menus */}
                        {menu.children && menu.children.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Child Menu Items ({menu.children.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {menu.children.map((child) => (
                                            <div key={child.id} className="flex items-center justify-between rounded border p-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium">{child.title}</span>
                                                    <Badge variant={child.is_active ? 'default' : 'secondary'} className="text-xs">
                                                        {child.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                    <span className="text-muted-foreground text-sm">Order: {child.sort_order}</span>
                                                </div>
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={route('admin.menus.show', child.id)}>
                                                        <Eye className="mr-1 h-3 w-3" />
                                                        View
                                                    </Link>
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Timeline */}
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
                                        <p className="text-sm font-medium">{formatDate(menu.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Last Updated</p>
                                        <p className="text-sm font-medium">{formatDate(menu.updated_at)}</p>
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
                                    <Settings className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" asChild>
                                    <Link href={route('admin.menus.edit', menu.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Menu Item
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href={route('admin.menus.index')}>View All Menu Items</Link>
                                </Button>
                                {!menu.parent_id && (
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={route('admin.menus.create', { parent_id: menu.id })}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add Child Item
                                        </Link>
                                    </Button>
                                )}
                            </CardContent>
                        </Card>

                        {/* Menu Properties */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Properties</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Mega Menu</span>
                                    <Badge variant={menu.is_mega_menu ? 'default' : 'secondary'}>{menu.is_mega_menu ? 'Yes' : 'No'}</Badge>
                                </div>

                                {menu.icon && (
                                    <div>
                                        <span className="text-muted-foreground text-sm">Icon Class</span>
                                        <p className="bg-muted mt-1 rounded px-2 py-1 font-mono text-sm">{menu.icon}</p>
                                    </div>
                                )}

                                {menu.css_class && (
                                    <div>
                                        <span className="text-muted-foreground text-sm">CSS Class</span>
                                        <p className="bg-muted mt-1 rounded px-2 py-1 font-mono text-sm">{menu.css_class}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Menu ID */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Menu ID</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground font-mono text-2xl font-bold">#{menu.id.toString().padStart(4, '0')}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
