import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { type RouteName, route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        setup: ({ App, props }) => {
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            // @ts-ignore
            global.route<RouteName> = (name, params, absolute) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                route(name, params as any, absolute, {
                    // @ts-ignore
                    ...page.props.ziggy,
                    // @ts-ignore
                    location: new URL(page.props.ziggy.location),
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any);
            /* eslint-enable @typescript-eslint/ban-ts-comment */

            return <App {...props} />;
        },
    }),
);
