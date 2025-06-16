import Heading from '@/components/heading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Award, Crown, Edit, Hash, Trophy, User, Users } from 'lucide-react';

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
    created_at: string;
    updated_at: string;
}

interface Props {
    boardOfDirector: BoardOfDirector;
}

export default function ShowBoardOfDirector({ boardOfDirector }: Props) {
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
            title: boardOfDirector.full_name,
            href: route('board-of-directors.show', boardOfDirector.id),
        },
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${boardOfDirector.full_name} - Board of Directors`} />

            <div className="px-10 py-6">
                <div className="flex items-center justify-between">
                    <Heading
                        title={`${boardOfDirector.title ? boardOfDirector.title + ' ' : ''}${boardOfDirector.full_name}`}
                        description="View board member details"
                    />
                    <Button asChild>
                        <Link href={route('board-of-directors.edit', boardOfDirector.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Member
                        </Link>
                    </Button>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <div className="flex items-start gap-6">
                                    {/* Profile Image */}
                                    {boardOfDirector.image_url && (
                                        <img
                                            src={boardOfDirector.image_url}
                                            alt={boardOfDirector.full_name}
                                            className="h-32 w-32 rounded-full border object-cover"
                                        />
                                    )}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <CardTitle className="text-2xl">
                                                {boardOfDirector.title && `${boardOfDirector.title} `}
                                                {boardOfDirector.full_name}
                                            </CardTitle>
                                            <p className="text-lg text-gray-600 mt-1">{boardOfDirector.designation}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(boardOfDirector.is_active)}
                                            {getRoleBadge(boardOfDirector.is_chairman)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Short Description */}
                                {boardOfDirector.short_description && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                            <Users className="h-5 w-5" />
                                            Overview
                                        </h3>
                                        <p className="leading-relaxed text-gray-700">{boardOfDirector.short_description}</p>
                                    </div>
                                )}

                                {/* Full Biography */}
                                {boardOfDirector.full_biography && (
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium">Biography</h3>
                                        <div className="prose max-w-none">
                                            <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{boardOfDirector.full_biography}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Experience */}
                                {boardOfDirector.experience && boardOfDirector.experience.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                            <Award className="h-5 w-5" />
                                            Experience
                                        </h3>
                                        <ul className="space-y-2">
                                            {boardOfDirector.experience.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0"></span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Achievements */}
                                {boardOfDirector.achievements && boardOfDirector.achievements.length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-medium flex items-center gap-2">
                                            <Trophy className="h-5 w-5" />
                                            Achievements
                                        </h3>
                                        <ul className="space-y-2">
                                            {boardOfDirector.achievements.map((item, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></span>
                                                    <span className="text-gray-700">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
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
                                        <p className="text-sm text-gray-600">{boardOfDirector.sort_order}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Users className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Designation</p>
                                        <p className="text-sm text-gray-600">{boardOfDirector.designation}</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <p className="text-sm font-medium">Role</p>
                                        <div className="mt-1">{getRoleBadge(boardOfDirector.is_chairman)}</div>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <div className="h-4 w-4 rounded-full bg-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium">Status</p>
                                        <div className="mt-1">{getStatusBadge(boardOfDirector.is_active)}</div>
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
                                    <span className="font-medium">Experience Items:</span>
                                    <span className="text-gray-600">
                                        {boardOfDirector.experience ? boardOfDirector.experience.length : 0}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Achievements:</span>
                                    <span className="text-gray-600">
                                        {boardOfDirector.achievements ? boardOfDirector.achievements.length : 0}
                                    </span>
                                </div>

                                <Separator />

                                <div className="flex justify-between">
                                    <span className="font-medium">Profile Image:</span>
                                    <span className="text-gray-600">
                                        {boardOfDirector.image_url ? 'Yes' : 'No'}
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
                                    <p className="text-gray-600">{new Date(boardOfDirector.created_at).toLocaleString()}</p>
                                </div>

                                <Separator />

                                <div>
                                    <p className="font-medium">Last Updated</p>
                                    <p className="text-gray-600">{new Date(boardOfDirector.updated_at).toLocaleString()}</p>
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
                                    <Link href={route('board-of-directors.edit', boardOfDirector.id)}>
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit Member
                                    </Link>
                                </Button>

                                <Button variant="outline" asChild className="w-full">
                                    <Link href={route('board-of-directors.index')}>Back to List</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}