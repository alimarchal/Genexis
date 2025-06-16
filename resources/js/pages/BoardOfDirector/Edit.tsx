import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Minus, Plus, Save } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface BoardOfDirector {
    id: number;
    title: string | null;
    full_name: string;
    designation: string;
    short_description: string | null;
    full_biography: string | null;
    experience: string[] | null;
    achievements: string[] | null;
    image: string | null;
    image_url: string | null;
    sort_order: number;
    is_active: boolean;
    is_chairman: boolean;
}

interface Props {
    boardOfDirector: BoardOfDirector;
}

export default function EditBoardOfDirector({ boardOfDirector }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
        },
        {
            title: 'Board of Directors',
            href: route('board-of-directors.index'),
        },
        {
            title: 'Edit',
            href: route('board-of-directors.edit', boardOfDirector.id),
        },
    ];

    const { data, setData, processing, errors } = useForm({
        title: boardOfDirector.title || 'none',
        full_name: boardOfDirector.full_name,
        designation: boardOfDirector.designation,
        short_description: boardOfDirector.short_description || '',
        full_biography: boardOfDirector.full_biography || '',
        experience: boardOfDirector.experience || [],
        achievements: boardOfDirector.achievements || [],
        image: null as File | null,
        sort_order: boardOfDirector.sort_order,
        is_active: boardOfDirector.is_active as boolean,
        is_chairman: boardOfDirector.is_chairman as boolean,
        _method: 'PUT',
    });

    const [experienceItems, setExperienceItems] = useState(
        boardOfDirector.experience && boardOfDirector.experience.length > 0
            ? boardOfDirector.experience
            : ['']
    );
    const [achievementItems, setAchievementItems] = useState(
        boardOfDirector.achievements && boardOfDirector.achievements.length > 0
            ? boardOfDirector.achievements
            : ['']
    );

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Filter out empty experience and achievement items
        const filteredExperience = experienceItems.filter(item => item.trim() !== '');
        const filteredAchievements = achievementItems.filter(item => item.trim() !== '');

        router.post(route('board-of-directors.update', boardOfDirector.id), {
            ...data,
            experience: filteredExperience,
            achievements: filteredAchievements,
            _method: 'PUT',
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const addExperienceItem = () => {
        setExperienceItems([...experienceItems, '']);
    };

    const removeExperienceItem = (index: number) => {
        if (experienceItems.length > 1) {
            const newItems = experienceItems.filter((_, i) => i !== index);
            setExperienceItems(newItems);
        }
    };

    const updateExperienceItem = (index: number, value: string) => {
        const newItems = [...experienceItems];
        newItems[index] = value;
        setExperienceItems(newItems);
    };

    const addAchievementItem = () => {
        setAchievementItems([...achievementItems, '']);
    };

    const removeAchievementItem = (index: number) => {
        if (achievementItems.length > 1) {
            const newItems = achievementItems.filter((_, i) => i !== index);
            setAchievementItems(newItems);
        }
    };

    const updateAchievementItem = (index: number, value: string) => {
        const newItems = [...achievementItems];
        newItems[index] = value;
        setAchievementItems(newItems);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Board Member" />

            <div className="px-10 py-6">
                <Heading title="Edit Board Member" description="Update the details of this board member" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Current Image Preview */}
                                {boardOfDirector.image_url && (
                                    <div className="space-y-2">
                                        <Label>Current Image</Label>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={boardOfDirector.image_url}
                                                alt={boardOfDirector.full_name}
                                                className="h-20 w-20 rounded-full object-cover"
                                            />
                                            <p className="text-sm text-gray-500">Upload a new image to replace the current one</p>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Title */}
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Select value={data.title} onValueChange={(value) => setData('title', value)}>
                                            <SelectTrigger className={errors.title ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select title" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="none">No Title</SelectItem>
                                                <SelectItem value="Mr.">Mr.</SelectItem>
                                                <SelectItem value="Ms.">Ms.</SelectItem>
                                                <SelectItem value="Mrs.">Mrs.</SelectItem>
                                                <SelectItem value="Dr.">Dr.</SelectItem>
                                                <SelectItem value="Prof.">Prof.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                    </div>

                                    {/* Sort Order */}
                                    <div className="space-y-2">
                                        <Label htmlFor="sort_order">Sort Order</Label>
                                        <Input
                                            id="sort_order"
                                            type="number"
                                            min="0"
                                            value={data.sort_order}
                                            onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                            placeholder="0"
                                            className={errors.sort_order ? 'border-red-500' : ''}
                                        />
                                        {errors.sort_order && <p className="text-sm text-red-500">{errors.sort_order}</p>}
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name *</Label>
                                    <Input
                                        id="full_name"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        placeholder="Enter full name"
                                        className={errors.full_name ? 'border-red-500' : ''}
                                    />
                                    {errors.full_name && <p className="text-sm text-red-500">{errors.full_name}</p>}
                                </div>

                                {/* Designation */}
                                <div className="space-y-2">
                                    <Label htmlFor="designation">Designation *</Label>
                                    <Input
                                        id="designation"
                                        value={data.designation}
                                        onChange={(e) => setData('designation', e.target.value)}
                                        placeholder="Enter designation"
                                        className={errors.designation ? 'border-red-500' : ''}
                                    />
                                    {errors.designation && <p className="text-sm text-red-500">{errors.designation}</p>}
                                </div>

                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <Label htmlFor="image">Profile Image</Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className={errors.image ? 'border-red-500' : ''}
                                    />
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                    <p className="text-sm text-gray-500">
                                        {boardOfDirector.image_url
                                            ? 'Upload a new image to replace the current one (optional)'
                                            : 'Upload a profile photo (optional)'}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description & Biography */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Description & Biography</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Short Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="short_description">Short Description</Label>
                                    <Textarea
                                        id="short_description"
                                        value={data.short_description}
                                        onChange={(e) => setData('short_description', e.target.value)}
                                        placeholder="Brief description about the member"
                                        rows={3}
                                        className={errors.short_description ? 'border-red-500' : ''}
                                    />
                                    {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
                                </div>

                                {/* Full Biography */}
                                <div className="space-y-2">
                                    <Label htmlFor="full_biography">Full Biography</Label>
                                    <Textarea
                                        id="full_biography"
                                        value={data.full_biography}
                                        onChange={(e) => setData('full_biography', e.target.value)}
                                        placeholder="Detailed biography of the member"
                                        rows={8}
                                        className={errors.full_biography ? 'border-red-500' : ''}
                                    />
                                    {errors.full_biography && <p className="text-sm text-red-500">{errors.full_biography}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Experience */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Experience</CardTitle>
                                    <Button type="button" variant="outline" size="sm" onClick={addExperienceItem}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Experience
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {experienceItems.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => updateExperienceItem(index, e.target.value)}
                                            placeholder={`Experience ${index + 1}`}
                                            className="flex-1"
                                        />
                                        {experienceItems.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeExperienceItem(index)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {errors.experience && <p className="text-sm text-red-500">{errors.experience}</p>}
                            </CardContent>
                        </Card>

                        {/* Achievements */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Achievements</CardTitle>
                                    <Button type="button" variant="outline" size="sm" onClick={addAchievementItem}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Achievement
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {achievementItems.map((item, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            value={item}
                                            onChange={(e) => updateAchievementItem(index, e.target.value)}
                                            placeholder={`Achievement ${index + 1}`}
                                            className="flex-1"
                                        />
                                        {achievementItems.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeAchievementItem(index)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {errors.achievements && <p className="text-sm text-red-500">{errors.achievements}</p>}
                            </CardContent>
                        </Card>

                        {/* Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Make this member visible on the website</p>
                                    </div>
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_chairman" className="text-base">
                                            Chairman
                                        </Label>
                                        <p className="text-sm text-gray-500">Mark this member as the Chairman of the Board</p>
                                    </div>
                                    <Switch
                                        id="is_chairman"
                                        checked={data.is_chairman}
                                        onCheckedChange={(checked) => setData('is_chairman', checked)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('board-of-directors.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Member'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}