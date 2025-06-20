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
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    Building,
    Calculator,
    Contact,
    Download,
    FileText,
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
    User,
    Users,
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

// Home
const homeNavItems: NavItem[] = [
    {
        title: 'Carousel',
        href: '/carousels',
        icon: Images,
    },
    {
        title: 'Bank Services',
        href: '/bank-services',
        icon: Building,
    },
];

// About
const aboutNavItems: NavItem[] = [
    {
        title: 'Board of Directors',
        href: '/board-of-directors',
        icon: Users,
    },
    {
        title: 'Management',
        href: '/managments',
        icon: User,
    },
];

// Products
const productsNavItems: NavItem[] = [
    {
        title: 'Product Schemes',
        href: '/product-schemes',
        icon: Package,
    },
    {
        title: 'Scheme Attributes',
        href: '/product-scheme-attributes',
        icon: Settings,
    },
];

// Services
const servicesNavItems: NavItem[] = [
    {
        title: 'Services',
        href: '/services',
        icon: Settings,
    },
];

// Financial
const financialStatementsNavItems: NavItem[] = [
    {
        title: 'Financial Statements',
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
];

// Rates
const ratesNavItems: NavItem[] = [
    {
        title: 'Schedule of Charges',
        href: '/schedule-of-charges',
        icon: Calculator,
    },
    {
        title: 'Profit Rates',
        href: '/profit-rates',
        icon: PercentCircle,
    },
];

// Resources
const resourcesNavItems: NavItem[] = [
    {
        title: 'News Updates',
        href: '/news-announcements',
        icon: Newspaper,
    },
    {
        title: 'Careers',
        href: '/careers',
        icon: Briefcase,
    },
    {
        title: 'Downloads',
        href: '/downloads',
        icon: Download,
    },
];

// Banking & Services
const bankingNavItems: NavItem[] = [
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
];

// System Management
const systemNavItems: NavItem[] = [
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
                <NavGroup title="Home" items={homeNavItems} />
                <NavGroup title="About" items={aboutNavItems} />
                <NavGroup title="Products" items={productsNavItems} />
                <NavGroup title="Services" items={servicesNavItems} />
                <NavGroup title="Financial" items={financialStatementsNavItems} />
                <NavGroup title="Rates" items={ratesNavItems} />
                <NavGroup title="Resources" items={resourcesNavItems} />
                <NavGroup title="Banking & Services" items={bankingNavItems} />
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
