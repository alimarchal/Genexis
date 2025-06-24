import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Crown, Edit, Hash, Shield, User, Users } from 'lucide-react';

interface BoardMember {
    id: number;
    title: string | null;
    full_name: string;
    designation: string;
    image_url: string | null;
    is_chairman: boolean;
    is_active: boolean;
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
    chairman_board: BoardMember | null;
    secretary_board: BoardMember | null;
    secretary_management: ManagementMember | null;
    board_members: number[] | null;
    management_members: number[] | null;
    board_members_list: BoardMember[];
    management_members_list: ManagementMember[];
    is_active: boolean;
    sort_order: number | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    bodCommittee: BodCommittee;
}

export default function ShowBodCommittee({ bodCommittee }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: route('dashboard') },
        { title: 'BOD Committees', href: route('bod-committees.index') },
        { title: bodCommittee.name, href: route('bod-committees.show', bodCommittee.id) },
    ];

    const getStatusBadge = (isActive: boolean) => {
        return isActive ? <Badge variant="default">Active</Badge> : <Badge variant="secondary">Inactive</Badge>;
    };

    const getRoleBadge = (isChairman: boolean) => {
        return isChairman ? (
            <Badge variant="destructive" className="gap-1">
                <Crown className="h-3 w-3" />
                Chairman
            </Badge>
        ) : (
            <Badge variant="outline" className="gap-1">
                <User className="h-3 w-3" />
                Director
            </Badge>
        );
    };

    const getSecretaryBadge = () => {
        if (bodCommittee.secretary_board) {
            return (
                <Badge variant="default" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Board Secretary
                </Badge>
            );
        }

        if (bodCommittee.secretary_management) {
            return (
                <Badge variant="secondary" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Management Secretary
                </Badge>
            );
        }

        return null;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${bodCommittee.name} - BOD Committee`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading title={bodCommittee.name} description="View committee details and members" />
                    <Button asChild>
                        <Link href={route('bod-committees.edit', bodCommittee.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Committee
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <CardTitle className="text-2xl">{bodCommittee.name}</CardTitle>
                                        <div className="flex items-center gap-2">{getStatusBadge(bodCommittee.is_active)}</div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {bodCommittee.description && (
                                    <div className="space-y-2">
                                        <h3 className="flex items-center gap-2 text-lg font-medium">
                                            <Users className="h-5 w-5" />
                                            Purpose & Description
                                        </h3>
                                        <p className="leading-relaxed text-gray-700">{bodCommittee.description}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Leadership */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Committee Leadership</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Chairman */}
                                {bodCommittee.chairman_board && (
                                    <div>
                                        <h4 className="mb-3 font-medium text-gray-900">Chairman</h4>
                                        <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                                            {bodCommittee.chairman_board.image_url && (
                                                <img
                                                    src={bodCommittee.chairman_board.image_url}
                                                    alt={bodCommittee.chairman_board.full_name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <div className="font-medium">
                                                    {bodCommittee.chairman_board.title && `${bodCommittee.chairman_board.title} `}
                                                    {bodCommittee.chairman_board.full_name}
                                                </div>
                                                <div className="text-sm text-gray-600">{bodCommittee.chairman_board.designation}</div>
                                            </div>
                                            {getRoleBadge(bodCommittee.chairman_board.is_chairman)}
                                        </div>
                                    </div>
                                )}

                                {/* Secretary */}
                                {(bodCommittee.secretary_board || bodCommittee.secretary_management) && (
                                    <div>
                                        <h4 className="mb-3 font-medium text-gray-900">Secretary</h4>
                                        <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                                            {bodCommittee.secretary_board?.image_url && (
                                                <img
                                                    src={bodCommittee.secretary_board.image_url}
                                                    alt={bodCommittee.secretary_board.full_name}
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <div className="font-medium">
                                                    {bodCommittee.secretary_board && (
                                                        <>
                                                            {bodCommittee.secretary_board.title && `${bodCommittee.secretary_board.title} `}
                                                            {bodCommittee.secretary_board.full_name}
                                                        </>
                                                    )}
                                                    {bodCommittee.secretary_management && (
                                                        <>
                                                            {bodCommittee.secretary_management.title && `${bodCommittee.secretary_management.title} `}
                                                            {bodCommittee.secretary_management.full_name}
                                                        </>
                                                    )}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {bodCommittee.secretary_board?.designation || bodCommittee.secretary_management?.designation}
                                                </div>
                                            </div>
                                            {getSecretaryBadge()}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Board Members */}
                        {bodCommittee.board_members_list && bodCommittee.board_members_list.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Board Members ({bodCommittee.board_members_list.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {bodCommittee.board_members_list.map((member) => (
                                            <div key={member.id} className="flex items-center gap-4 rounded-lg border p-3">
                                                {member.image_url && (
                                                    <img
                                                        src={member.image_url}
                                                        alt={member.full_name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        {member.title && `${member.title} `}
                                                        {member.full_name}
                                                    </div>
                                                    <div className="truncate text-sm text-gray-600">{member.designation}</div>
                                                </div>
                                                {member.is_chairman && getRoleBadge(true)}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Management Members */}
                        {bodCommittee.management_members_list && bodCommittee.management_members_list.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Management Members ({bodCommittee.management_members_list.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {bodCommittee.management_members_list.map((member) => (
                                            <div key={member.id} className="flex items-center gap-4 rounded-lg border p-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-green-500 font-medium text-white">
                                                    {member.full_name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium">
                                                        {member.title && `${member.title} `}
                                                        {member.full_name}
                                                    </div>
                                                    <div className="truncate text-sm text-gray-600">{member.designation}</div>
                                                </div>
                                                <Badge variant="outline">Management</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Details Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Sort Order</p>
                                        <p className="text-sm text-gray-600">{bodCommittee.sort_order || 'Not set'}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Total Members</p>
                                        <p className="text-sm text-gray-600">
                                            {(bodCommittee.board_members_list?.length || 0) + (bodCommittee.management_members_list?.length || 0)}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(bodCommittee.is_active)}</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Statistics Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Statistics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium">Board Members:</span>
                                    <span className="text-gray-600">{bodCommittee.board_members_list?.length || 0}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Management Members:</span>
                                    <span className="text-gray-600">{bodCommittee.management_members_list?.length || 0}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Has Chairman:</span>
                                    <span className="text-gray-600">{bodCommittee.chairman_board ? 'Yes' : 'No'}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Has Secretary:</span>
                                    <span className="text-gray-600">
                                        {bodCommittee.secretary_board || bodCommittee.secretary_management ? 'Yes' : 'No'}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Timestamps Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Timestamps</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 text-sm">
                                <div>
                                    <p className="font-medium">Created</p>
                                    <p className="text-gray-600">{new Date(bodCommittee.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(bodCommittee.updated_at).toLocaleString()}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button asChild className="w-full">
                                    <Link href={route('bod-committees.edit', bodCommittee.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Committee
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('bod-committees.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
