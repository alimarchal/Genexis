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
                // Replace with your actual User type if available
                id: number;
                name: string;
                email: string;
                // Add other user properties you expect
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
        contact_address: string; // Add this line

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
