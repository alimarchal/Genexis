import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div
            className="relative flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
            style={{
                backgroundImage: 'url(/background-dollars.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Light transparent overlay for better readability */}
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="rounded-lg border border-white/30 bg-white/90 p-8 shadow-xl">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-6">
                            <Link href={route('home')} className="flex flex-col items-center gap-3 font-medium">
                                <div className="mb-2 flex h-24 w-auto items-center justify-center">
                                    <AppLogoIcon className="h-24 w-auto max-w-xs object-contain" />
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium text-gray-900">{title}</h1>
                                <p className="text-center text-sm text-gray-600">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
