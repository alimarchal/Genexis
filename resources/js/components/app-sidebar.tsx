import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Building,
    Calculator,
    Contact,
    Download,
    FileText,
    Folder,
    Images,
    LayoutGrid,
    MapPin,
    Menu,
    Newspaper,
    Package,
    PercentCircle,
    PieChart,
    Settings,
    TrendingUp,
    Users,
    UserCheck
} from 'lucide-react';
import AppLogo from './app-logo';

// Core Dashboard
const coreNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

// Content Management
const contentNavItems: NavItem[] = [
    {
        title: 'Management',
        href: '/managments',
        icon: Users,
    },
    {
        title: 'Board of Directors',
        href: '/board-of-directors',
        icon: UserCheck,
    },
    {
        title: 'Carousel',
        href: '/carousels',
        icon: Images,
    },
    {
        title: 'News & Announcements',
        href: '/news-announcements',
        icon: Newspaper,
    },
];

// Banking & Services
const bankingNavItems: NavItem[] = [
    {
        title: 'Bank Services',
        href: '/bank-services',
        icon: Building,
    },
    {
        title: 'Branch Services',
        href: '/branch-services',
        icon: Building,
    },
    {
        title: 'Service Attributes',
        href: '/service-attributes',
        icon: Settings,
    },
];

// Financial Management
const financialNavItems: NavItem[] = [
    {
        title: 'Financial Reports',
        href: '/financial-reports',
        icon: FileText,
    },
    {
        title: 'Annual Reports',
        href: '/annual-reports',
        icon: PieChart,
    },
    {
        title: 'Financial Highlights',
        href: '/financial-highlights',
        icon: TrendingUp,
    },
    {
        title: 'Profit Rates',
        href: '/profit-rates',
        icon: PercentCircle,
    },
    {
        title: 'Schedule of Charges',
        href: '/schedule-of-charges',
        icon: Calculator,
    },
];

// Location Management
const locationNavItems: NavItem[] = [
    {
        title: 'Regions',
        href: '/regions',
        icon: MapPin,
    },
    {
        title: 'Districts',
        href: '/districts',
        icon: MapPin,
    },
    {
        title: 'Branches',
        href: '/branches',
        icon: Building,
    },
    {
        title: 'Contacts',
        href: '/contacts',
        icon: Contact,
    },
];

// Product Management
const productNavItems: NavItem[] = [
    {
        title: 'Product Types',
        href: '/product-types',
        icon: Package,
    },
    {
        title: 'Product Type Accounts',
        href: '/product-type-accounts',
        icon: Building,
    },
    {
        title: 'Product Schemes',
        href: '/product-schemes',
        icon: Package,
    },
    {
        title: 'Product Scheme Attributes',
        href: '/product-scheme-attributes',
        icon: Settings,
    },
];

// System Management
const systemNavItems: NavItem[] = [
    {
        title: 'Downloads',
        href: '/downloads',
        icon: Download,
    },
    {
        title: 'Admin Menus',
        href: '/admin/menus',
        icon: Menu,
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
                <NavGroup title="Content Management" items={contentNavItems} />
                <NavGroup title="Banking & Services" items={bankingNavItems} />
                <NavGroup title="Financial Management" items={financialNavItems} />
                <NavGroup title="Location Management" items={locationNavItems} />
                <NavGroup title="Product Management" items={productNavItems} />
                <NavGroup title="System Management" items={systemNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
