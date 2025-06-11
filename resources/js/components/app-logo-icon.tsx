import { HTMLAttributes } from 'react';

export default function AppLogoIcon(props: HTMLAttributes<HTMLImageElement>) {
    return (
        <img
            {...props}
            src="/logo.png"
            alt="Bank Logo"
            className={`${props.className || ''} object-contain`}
        />
    );
}
