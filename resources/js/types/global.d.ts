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

        // Add any other globally shared props here as you define them
    }
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
