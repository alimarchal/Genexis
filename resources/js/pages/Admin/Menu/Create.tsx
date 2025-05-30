import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { Card, CardContent } from '@/components/ui/card';
import { Save } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Menus',
        href: '/admin/menus',
    },
    {
        title: 'Create',
        href: '/admin/menus/create',
    },
];

interface ParentMenu {
    id: number;
    title: string;
}

interface Props {
    parentMenus: ParentMenu[];
}

type MenuForm = {
    title: string;
    slug: string;
    url: string;
    route_name: string;
    route_params: string;
    target: '_self' | '_blank';
    icon: string;
    parent_id: string;
    sort_order: number;
    is_active: boolean;
    is_mega_menu: boolean;
    css_class: string;
};

export default function CreateMenu({ parentMenus }: Props) {
    const { data, setData, post, processing, errors } = useForm<MenuForm>({
        title: '',
        slug: '',
        url: '',
        route_name: '',
        route_params: '',
        target: '_self',
        icon: '',
        parent_id: '',
        sort_order: 0,
        is_active: true,
        is_mega_menu: false,
        css_class: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = {
            ...data,
            parent_id: data.parent_id === '' || data.parent_id === 'none' ? null : parseInt(data.parent_id),
        };

        if (data.route_params.trim()) {
            try {
                formData.route_params = JSON.parse(data.route_params);
            } catch (error) {
                formData.route_params = null;
            }
        } else {
            formData.route_params = null;
        }

        post(route('admin.menus.store'), formData);
    };

    const handleTitleChange = (value: string) => {
        setData('title', value);
        if (!data.slug || data.slug === '') {
            const slug = value.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            setData('slug', slug);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Menu Item" />

            <div className="px-4 py-6">
                <Heading title="Create Menu Item" description="Add a new menu item to your website navigation" />

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Menu Title *</Label>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => handleTitleChange(e.target.value)}
                                        required
                                        placeholder="e.g., About Us"
                                    />
                                    <InputError message={errors.title} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug">Slug *</Label>
                                    <Input
                                        id="slug"
                                        type="text"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        required
                                        placeholder="e.g., about-us"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        URL-friendly identifier (auto-generated from title)
                                    </p>
                                    <InputError message={errors.slug} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sort_order">Display Order</Label>
                                    <Input
                                        id="sort_order"
                                        type="number"
                                        value={data.sort_order}
                                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                        min="0"
                                        placeholder="0"
                                    />
                                    <InputError message={errors.sort_order} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="url">URL (Direct Link)</Label>
                                    <Input
                                        id="url"
                                        type="text"
                                        value={data.url}
                                        onChange={(e) => setData('url', e.target.value)}
                                        placeholder="e.g., /about-us or https://external.com"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Use either URL OR Route Name (not both)
                                    </p>
                                    <InputError message={errors.url} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="route_name">Route Name</Label>
                                    <Input
                                        id="route_name"
                                        type="text"
                                        value={data.route_name}
                                        onChange={(e) => setData('route_name', e.target.value)}
                                        placeholder="e.g., about.index"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Laravel route name (preferred over direct URL)
                                    </p>
                                    <InputError message={errors.route_name} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="parent_id">Parent Menu</Label>
                                    <Select
                                        value={data.parent_id}
                                        onValueChange={(value) => setData('parent_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select parent (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No Parent (Top Level)</SelectItem>
                                            {parentMenus?.map((parent) => (
                                                <SelectItem key={parent.id} value={parent.id.toString()}>
                                                    {parent.title}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.parent_id} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="target">Link Target</Label>
                                    <Select
                                        value={data.target}
                                        onValueChange={(value: '_self' | '_blank') => setData('target', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select target" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="_self">Same Window</SelectItem>
                                            <SelectItem value="_blank">New Window/Tab</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.target} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon Class</Label>
                                    <Input
                                        id="icon"
                                        type="text"
                                        value={data.icon}
                                        onChange={(e) => setData('icon', e.target.value)}
                                        placeholder="e.g., fas fa-home"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        CSS class for icon (optional)
                                    </p>
                                    <InputError message={errors.icon} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="css_class">CSS Class</Label>
                                    <Input
                                        id="css_class"
                                        type="text"
                                        value={data.css_class}
                                        onChange={(e) => setData('css_class', e.target.value)}
                                        placeholder="custom-class"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Additional CSS classes
                                    </p>
                                    <InputError message={errors.css_class} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="route_params">Route Parameters (JSON)</Label>
                                    <Textarea
                                        id="route_params"
                                        value={data.route_params}
                                        onChange={(e) => setData('route_params', e.target.value)}
                                        rows={3}
                                        placeholder='{"id": 1, "slug": "example"}'
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        JSON object for route parameters (leave empty if none)
                                    </p>
                                    <InputError message={errors.route_params} />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', !!checked)}
                                        />
                                        <Label htmlFor="is_active" className="text-sm font-medium">
                                            Active Menu Item
                                        </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="is_mega_menu"
                                            checked={data.is_mega_menu}
                                            onCheckedChange={(checked) => setData('is_mega_menu', !!checked)}
                                        />
                                        <Label htmlFor="is_mega_menu" className="text-sm font-medium">
                                            Mega Menu (Special styling for complex dropdowns)
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" asChild>
                                    <Link href={route('admin.menus.index')}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Menu Item'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}