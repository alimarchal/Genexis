import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Save, Users } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface BoardMember {
    id: number;
    title: string | null;
    full_name: string;
    designation: string;
    is_active: boolean;
    is_chairman: boolean;
}

interface ManagementMember {
    id: number;
    title: string;
    full_name: string;
    designation: string;
    status: string;
}

interface BodCommittee {
    id: number;
    name: string;
    description: string | null;
    chairman_board_id: number | null;
    secretary_board_id: number | null;
    secretary_management_id: number | null;
    board_members: number[] | null;
    management_members: number[] | null;
    is_active: boolean;
    sort_order: number | null;
}

interface Props {
    bodCommittee: BodCommittee;
    boardMembers: BoardMember[];
    managementMembers: ManagementMember[];
}

export default function EditBodCommittee({ bodCommittee, boardMembers, managementMembers }: Props) {
    if (!bodCommittee) {
        return <div>Loading...</div>;
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'BOD Committees', href: route('bod-committees.index') },
        { title: 'Edit', href: route('bod-committees.edit', bodCommittee.id) },
    ];

    const { data, setData, processing, errors } = useForm({
        name: bodCommittee.name,
        description: bodCommittee.description || '',
        chairman_board_id: bodCommittee.chairman_board_id?.toString() || 'none',
        secretary_board_id: bodCommittee.secretary_board_id?.toString() || '',
        secretary_management_id: bodCommittee.secretary_management_id?.toString() || '',
        board_members: bodCommittee.board_members || [],
        management_members: bodCommittee.management_members || [],
        is_active: bodCommittee.is_active as boolean,
        sort_order: bodCommittee.sort_order || 0,
        _method: 'PUT',
    });

    const [secretaryType, setSecretaryType] = useState<'board' | 'management' | ''>(() => {
        if (bodCommittee.secretary_board_id) return 'board';
        if (bodCommittee.secretary_management_id) return 'management';
        return '';
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = {
            ...data,
            chairman_board_id: data.chairman_board_id === 'none' ? null : data.chairman_board_id,
            secretary_board_id: secretaryType === 'board' ? data.secretary_board_id : null,
            secretary_management_id: secretaryType === 'management' ? data.secretary_management_id : null,
        };

        router.post(route('bod-committees.update', bodCommittee.id), formData);
    };

    const handleSecretaryTypeChange = (type: 'board' | 'management' | '') => {
        setSecretaryType(type);
        if (type === 'board') {
            setData('secretary_management_id', '');
        } else if (type === 'management') {
            setData('secretary_board_id', '');
        } else {
            setData('secretary_board_id', '');
            setData('secretary_management_id', '');
        }
    };

    const toggleBoardMember = (memberId: number) => {
        const currentMembers = data.board_members;
        if (currentMembers.includes(memberId)) {
            setData(
                'board_members',
                currentMembers.filter((id) => id !== memberId),
            );
        } else {
            setData('board_members', [...currentMembers, memberId]);
        }
    };

    const toggleManagementMember = (memberId: number) => {
        const currentMembers = data.management_members;
        if (currentMembers.includes(memberId)) {
            setData(
                'management_members',
                currentMembers.filter((id) => id !== memberId),
            );
        } else {
            setData('management_members', [...currentMembers, memberId]);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit BOD Committee" />

            <div className="px-10 py-6">
                <Heading title="Edit BOD Committee" description="Update the committee details and members" />

                <div className="mt-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Committee Name *</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g., Human Resource Committee of BoD"
                                            className={errors.name ? 'border-red-500' : ''}
                                        />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
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

                                {/* Description */}
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Brief description of the committee's purpose and responsibilities"
                                        rows={3}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Leadership */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Committee Leadership</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Chairman */}
                                <div className="space-y-2">
                                    <Label htmlFor="chairman_board_id">Chairman (Board Member)</Label>
                                    <Select value={data.chairman_board_id} onValueChange={(value) => setData('chairman_board_id', value)}>
                                        <SelectTrigger className={errors.chairman_board_id ? 'border-red-500' : ''}>
                                            <SelectValue placeholder="Select chairman" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No Chairman</SelectItem>
                                            {boardMembers.map((member) => (
                                                <SelectItem key={member.id} value={member.id.toString()}>
                                                    {member.title && `${member.title} `}
                                                    {member.full_name}
                                                    {member.is_chairman && ' (Chairman)'}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.chairman_board_id && <p className="text-sm text-red-500">{errors.chairman_board_id}</p>}
                                </div>

                                {/* Secretary Type Selection */}
                                <div className="space-y-2">
                                    <Label>Secretary Type</Label>
                                    <div className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="no-secretary"
                                                name="secretary-type"
                                                checked={secretaryType === ''}
                                                onChange={() => handleSecretaryTypeChange('')}
                                            />
                                            <Label htmlFor="no-secretary">No Secretary</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="board-secretary"
                                                name="secretary-type"
                                                checked={secretaryType === 'board'}
                                                onChange={() => handleSecretaryTypeChange('board')}
                                            />
                                            <Label htmlFor="board-secretary">Board Member</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                id="management-secretary"
                                                name="secretary-type"
                                                checked={secretaryType === 'management'}
                                                onChange={() => handleSecretaryTypeChange('management')}
                                            />
                                            <Label htmlFor="management-secretary">Management</Label>
                                        </div>
                                    </div>
                                </div>

                                {/* Secretary from Board */}
                                {secretaryType === 'board' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="secretary_board_id">Secretary (Board Member)</Label>
                                        <Select value={data.secretary_board_id} onValueChange={(value) => setData('secretary_board_id', value)}>
                                            <SelectTrigger className={errors.secretary_board_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select secretary" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {boardMembers.map((member) => (
                                                    <SelectItem key={member.id} value={member.id.toString()}>
                                                        {member.title && `${member.title} `}
                                                        {member.full_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.secretary_board_id && <p className="text-sm text-red-500">{errors.secretary_board_id}</p>}
                                    </div>
                                )}

                                {/* Secretary from Management */}
                                {secretaryType === 'management' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="secretary_management_id">Secretary (Management)</Label>
                                        <Select
                                            value={data.secretary_management_id}
                                            onValueChange={(value) => setData('secretary_management_id', value)}
                                        >
                                            <SelectTrigger className={errors.secretary_management_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Select secretary" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {managementMembers.map((member) => (
                                                    <SelectItem key={member.id} value={member.id.toString()}>
                                                        {member.title && `${member.title} `}
                                                        {member.full_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.secretary_management_id && <p className="text-sm text-red-500">{errors.secretary_management_id}</p>}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Board Members */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    <CardTitle>Board Members</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {boardMembers.map((member) => (
                                        <div key={member.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`board-${member.id}`}
                                                checked={data.board_members.includes(member.id)}
                                                onCheckedChange={() => toggleBoardMember(member.id)}
                                            />
                                            <Label htmlFor={`board-${member.id}`} className="flex-1 text-sm">
                                                <div className="font-medium">
                                                    {member.title && `${member.title} `}
                                                    {member.full_name}
                                                    {member.is_chairman && ' (Chairman)'}
                                                </div>
                                                <div className="truncate text-xs text-gray-500">{member.designation}</div>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.board_members && <p className="mt-2 text-sm text-red-500">{errors.board_members}</p>}
                            </CardContent>
                        </Card>

                        {/* Management Members */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5" />
                                    <CardTitle>Management Members</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {managementMembers.map((member) => (
                                        <div key={member.id} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`management-${member.id}`}
                                                checked={data.management_members.includes(member.id)}
                                                onCheckedChange={() => toggleManagementMember(member.id)}
                                            />
                                            <Label htmlFor={`management-${member.id}`} className="flex-1 text-sm">
                                                <div className="font-medium">
                                                    {member.title && `${member.title} `}
                                                    {member.full_name}
                                                </div>
                                                <div className="truncate text-xs text-gray-500">{member.designation}</div>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                {errors.management_members && <p className="mt-2 text-sm text-red-500">{errors.management_members}</p>}
                            </CardContent>
                        </Card>

                        {/* Settings */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="is_active" className="text-base">
                                            Active Status
                                        </Label>
                                        <p className="text-sm text-gray-500">Make this committee visible on the website</p>
                                    </div>
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" asChild>
                                <Link href={route('bod-committees.index')}>Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update Committee'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
