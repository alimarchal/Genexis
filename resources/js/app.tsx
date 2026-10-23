import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { initializeTheme } from './hooks/use-appearance';

const fallbackAppName = 'Bank of AJK';

// The server writes the configured name into the page, so the title never depends on what the assets were built with.
const appName = document.querySelector<HTMLMetaElement>('meta[name="application-name"]')?.content || import.meta.env.VITE_APP_NAME || fallbackAppName;

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
