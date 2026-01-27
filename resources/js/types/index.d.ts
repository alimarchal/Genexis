import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User | null;
    permissions: string[];
    roles: string[];
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string;
}

export interface MenuItem {
    id: number;
    title: string;
    url: string;
    target: string;
    icon?: string;
    cssClass?: string;
    isActive: boolean;
    hasChildren: boolean;
    isMegaMenu: boolean;
    children: MenuItem[];
}

export interface AutoBreadcrumbItem {
    label: string;
    href?: string;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string } & Record<string, unknown>;
    sidebarOpen: boolean;
    bankBranchesCount: number;
    contact_phone: string;
    contact_email: string;
    contact_address: string;
    menu: MenuItem[];
    autoBreadcrumbs: AutoBreadcrumbItem[];
    socialLinks: unknown;
    footerLinks: unknown;
    bankRates: unknown;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
