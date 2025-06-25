import { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps {
        name: string;
        quote: {
            message: string;
            author: string;
        };
        auth: {
            user: {
                id: number;
                name: string;
                email: string;
                avatar?: string;
                email_verified_at: string | null;
                created_at: string;
                updated_at: string;
            } | null;
        };
        ziggy: {
            url: string;
            port: number | null;
            defaults: Record<string, unknown>; // Changed from any to unknown
            routes: Record<string, unknown>; // Changed from any to unknown
            location: string;
        } & Record<string, unknown>; // Changed from any to unknown
        sidebarOpen: boolean;
        bankBranchesCount: number;
        contact_phone: string;
        contact_email: string;
        contact_address: string;
        menu: {
            id: number;
            title: string;
            url: string;
            target: string;
            icon?: string;
            cssClass?: string;
            isActive: boolean;
            hasChildren: boolean;
            isMegaMenu: boolean;
            children: {
                id: number;
                title: string;
                url: string;
                target: string;
                icon?: string;
                cssClass?: string;
                isActive: boolean;
                hasChildren: boolean;
                isMegaMenu: boolean;
                children: unknown[];
            }[];
        }[];
        autoBreadcrumbs: {
            label: string;
            href?: string;
            isActive?: boolean;
        }[];
        socialLinks: {
            facebook: string;
            twitter: string;
            instagram: string;
            linkedin: string;
            youtube: string;
        };
        footerLinks: {
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
        };
        topNavbarMessages?: TopNavbarMessage[];

        // Add any other globally shared props here as you define them
    }
}

export interface TopNavbarMessage {
    id: number;
    type: string;
    priority: string;
    icon: string;
    text: string;
    color: string;
    bg_color: string;
    is_active: boolean;
    sort_order: number;
}

// Optional: If you want to define a global App namespace for models like Laravel does
declare namespace App.Models {
    export interface User {
        id: number;
        name: string;
        email: string;
        // other user properties
    }
}
