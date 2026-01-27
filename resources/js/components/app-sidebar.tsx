import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    Building,
    Calculator,
    ChevronDown,
    Contact,
    DollarSign,
    Download,
    FileEdit,
    FileText,
    FolderOpen,
    Handshake,
    Home,
    Images,
    Info,
    LayoutGrid,
    MapIcon,
    MapPin,
    Menu,
    MessageSquare,
    Newspaper,
    Package,
    Package2,
    PercentCircle,
    PieChart,
    Settings,
    Settings2,
    TrendingUp,
    User,
    Users,
    UsersRound,
    Wrench,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogo from './app-logo';

// Core Dashboard
const coreNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

// Group definitions with main icons and items
const sidebarGroups = [
    {
        title: 'Home',
        icon: Home,
        defaultExpanded: false,
        items: [
            {
                title: 'Top Navbar Messages',
                href: '/top-navbar-messages',
                icon: MessageSquare,
                permission: 'view top navbar messages',
            },
            {
                title: 'Carousel',
                href: '/carousels',
                icon: Images,
                permission: 'view carousels',
            },
            {
                title: 'Bank Services',
                href: '/bank-services',
                icon: Building,
                permission: 'view bank services',
            },
        ],
    },
    {
        title: 'About',
        icon: Info,
        defaultExpanded: false,
        items: [
            {
                title: 'About Us',
                href: '/admin-about-us',
                icon: FileEdit,
                permission: 'view about us',
            },
            {
                title: 'Board of Directors',
                href: '/board-of-directors',
                icon: Users,
                permission: 'view board of directors',
            },
            {
                title: 'BOD Committees',
                href: '/bod-committees',
                icon: UsersRound,
                permission: 'view bod committees',
            },
            {
                title: 'Management',
                href: '/managements',
                icon: User,
                permission: 'view managements',
            },
        ],
    },
    {
        title: 'Products',
        icon: Package2,
        defaultExpanded: false,
        items: [
            {
                title: 'Product Schemes',
                href: '/product-schemes',
                icon: Package,
                permission: 'view product schemes',
            },
            {
                title: 'Scheme Attributes',
                href: '/product-scheme-attributes',
                icon: Settings,
                permission: 'view product scheme attributes',
            },
        ],
    },
    {
        title: 'Services',
        icon: Settings2,
        defaultExpanded: false,
        items: [
            {
                title: 'Services',
                href: '/services',
                icon: Settings,
                permission: 'view services',
            },
        ],
    },
    {
        title: 'Financial',
        icon: DollarSign,
        defaultExpanded: false,
        items: [
            {
                title: 'Financial Statements',
                href: '/financial-reports',
                icon: FileText,
                permission: 'view financial reports',
            },
            {
                title: 'Annual Reports',
                href: '/annual-reports',
                icon: PieChart,
                permission: 'view annual reports',
            },
            {
                title: 'Financial Highlights',
                href: '/financial-highlights',
                icon: TrendingUp,
                permission: 'view financial highlights',
            },
        ],
    },
    {
        title: 'Rates',
        icon: Calculator,
        defaultExpanded: false,
        items: [
            {
                title: 'Schedule of Charges',
                href: '/schedule-of-charges',
                icon: Calculator,
                permission: 'view schedule of charges',
            },
            {
                title: 'Profit Rates',
                href: '/profit-rates',
                icon: PercentCircle,
                permission: 'view profit rates',
            },
        ],
    },
    {
        title: 'Resources',
        icon: FolderOpen,
        defaultExpanded: false,
        items: [
            {
                title: 'News Updates',
                href: '/news-announcements',
                icon: Newspaper,
                permission: 'view news announcements',
            },
            {
                title: 'Careers',
                href: '/careers',
                icon: Briefcase,
                permission: 'view careers',
            },
            {
                title: 'Downloads',
                href: '/downloads',
                icon: Download,
                permission: 'view downloads',
            },
        ],
    },
    {
        title: 'Banking & Services',
        icon: Handshake,
        defaultExpanded: false,
        items: [
            {
                title: 'Branch Services',
                href: '/branch-services',
                icon: Building,
                permission: 'view branch services',
            },
            {
                title: 'Service Attributes',
                href: '/service-attributes',
                icon: Settings,
                permission: 'view service attributes',
            },
        ],
    },
    {
        title: 'Location Management',
        icon: MapIcon,
        defaultExpanded: false,
        items: [
            {
                title: 'Regions',
                href: '/regions',
                icon: MapPin,
                permission: 'view regions',
            },
            {
                title: 'Districts',
                href: '/districts',
                icon: MapPin,
                permission: 'view districts',
            },
            {
                title: 'Branches',
                href: '/branches',
                icon: Building,
                permission: 'view branches',
            },
            {
                title: 'Contacts',
                href: '/contacts',
                icon: Contact,
                permission: 'view contacts',
            },
        ],
    },
    {
        title: 'System Management',
        icon: Wrench,
        defaultExpanded: false,
        items: [
            {
                title: 'Admin Menus',
                href: '/admin/menus',
                icon: Menu,
                permission: 'view menus',
            },
        ],
    },
    {
        title: 'User Management',
        icon: Users,
        defaultExpanded: false,
        items: [
            {
                title: 'Users',
                href: '/admin/users',
                icon: Users,
                permission: 'view users',
            },
            {
                title: 'Roles',
                href: '/admin/roles',
                icon: Handshake,
                permission: 'view roles',
            },
            {
                title: 'Permissions',
                href: '/admin/permissions',
                icon: Settings2,
                permission: 'view permissions',
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

function CollapsibleNavGroup({
    title,
    icon: Icon,
    items,
    defaultExpanded = false,
}: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: NavItem[];
    defaultExpanded?: boolean;
}) {
    const page = usePage();

    // Check if any item in this group is currently active
    const hasActiveItem = items.some((item) => item.href === page.url);

    // Determine if group should be expanded: default expanded, has active item, or user manually expanded
    const [isExpanded, setIsExpanded] = useState(defaultExpanded || hasActiveItem);

    // Update expanded state when page changes and group contains active item
    useEffect(() => {
        if (hasActiveItem) {
            setIsExpanded(true);
        }
    }, [hasActiveItem]);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarMenuItem>
                <SidebarMenuButton onClick={() => setIsExpanded(!isExpanded)} className="group/collapsible">
                    <Icon />
                    <span>{title}</span>
                    <ChevronDown className={`ml-auto transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
                {isExpanded && (
                    <SidebarMenuSub>
                        {items.map((item) => (
                            <SidebarMenuSubItem key={item.title}>
                                <SidebarMenuSubButton asChild isActive={item.href === page.url}>
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                )}
            </SidebarMenuItem>
        </SidebarGroup>
    );
}

function NavGroup({ title, items }: { title: string; items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const permissions = auth.permissions || [];
    const roles = auth.roles || [];

    const hasPermission = (item: NavItem) => {
        if (!item.permission) return true; // Public item
        if (roles.includes('super-admin')) return true; // Super admin sees all
        return permissions.includes(item.permission);
    };

    const visibleGroups = sidebarGroups
        .map((group) => ({
            ...group,
            items: group.items.filter(hasPermission),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavGroup title="Dashboard" items={coreNavItems} />

                <SidebarMenu>
                    {visibleGroups.map((group) => (
                        <CollapsibleNavGroup
                            key={group.title}
                            title={group.title}
                            icon={group.icon}
                            items={group.items}
                            defaultExpanded={group.defaultExpanded}
                        />
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
