import { ImgHTMLAttributes, SyntheticEvent, useEffect, useState } from 'react';

export type SafeImageKind = 'news' | 'carousel' | 'person' | 'service' | 'generic';

const FALLBACKS: Record<SafeImageKind, string> = {
    news: '/images/defaults/news.svg',
    carousel: '/images/defaults/carousel.svg',
    person: '/images/defaults/person.svg',
    service: '/images/defaults/service.svg',
    generic: '/images/defaults/generic.svg',
};

export function fallbackImage(kind: SafeImageKind = 'generic'): string {
    return FALLBACKS[kind];
}

interface SafeImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src?: string | null;
    kind?: SafeImageKind;
}

/**
 * <img> that never shows a broken-image icon: a missing src or a failed load
 * is replaced by a neutral built-in illustration for the given kind of content.
 */
export default function SafeImage({ src, kind = 'generic', alt = '', onError, ...props }: SafeImageProps) {
    const fallback = FALLBACKS[kind];
    const [current, setCurrent] = useState<string>(src || fallback);

    useEffect(() => {
        setCurrent(src || fallback);
    }, [src, fallback]);

    const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
        if (current !== fallback) {
            setCurrent(fallback);
        }
        onError?.(event);
    };

    return <img {...props} src={current} alt={alt} onError={handleError} />;
}
