interface BreadcrumbItem {
    title: string;
    href: string;
}

interface HeadingProps {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function Heading({ title, description }: HeadingProps) {
    return (
        <div className="mb-8 space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description && <p className="text-muted-foreground text-sm">{description}</p>}
        </div>
    );
}
