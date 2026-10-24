export interface Highlight {
    value: string | null;
    label: string;
}

export default function CorporateHighlights({ highlights }: { highlights: Highlight[] }) {
    if (highlights.length === 0) {
        return null;
    }

    return (
        <section aria-labelledby="corporate-highlights" className="bg-white py-12">
            <div className="mx-auto max-w-7xl px-6">
                <h2 id="corporate-highlights" className="mb-8 text-center text-3xl font-bold text-gray-900">
                    Corporate Highlights
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {highlights.map((highlight) => (
                        <div key={highlight.label} className="rounded-xl border border-gray-100 bg-[#e9f7ef] p-6 text-center shadow-sm">
                            {highlight.value && <div className="mb-2 text-3xl font-bold text-[#4A7C59]">{highlight.value}</div>}
                            <div className="text-sm text-gray-700">{highlight.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
