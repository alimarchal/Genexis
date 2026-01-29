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

export interface AutoBreadcrumbItem {
    label: string;
    href?: string;
    isActive?: boolean;
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

export interface SocialLinks {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    youtube: string;
}

export interface FooterLinks {
    regulatory: {
        privacy_policy: string;
        terms: string;
        cookie_policy: string;
        accessibility: string;
        regulatory_info: string;
        security_tips: string;
        fraud_prevention: string;
        sbp: string;
        banking_mohtasib: string;
        secp: string;
        goajk: string;
        gopak: string;
        ajk_tourism: string;
        loan_calculator: string;
    };
    banking: {
        portal_login: string;
        branch_locator: string;
        atm_locator: string;
        exchange_rates: string;
        interest_rates: string;
        forms: string;
        tenders: string;
    };
    services: {
        [key: string]: string;
    };
}

export interface BankRates {
    loan: {
        house: number;
        personal: number;
        motorcycle: number;
        student: number;
        gold: number;
        home_appliances: number;
        car: number;
        business: number;
        agriculture: number;
        salary: number;
    };
    deposit: {
        savings: number;
        current: number;
        term_1year: number;
        term_2year: number;
        term_3year: number;
        term_5year: number;
        special_savings: number;
    };
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
    socialLinks: SocialLinks;
    footerLinks: FooterLinks;
    bankRates: BankRates;
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
