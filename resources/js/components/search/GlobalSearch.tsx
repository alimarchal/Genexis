import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface SearchResult {
    id: number;
    title: string;
    type: string;
    url: string;
    excerpt?: string;
    image?: string;
}

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const searchTimeout = setTimeout(() => {
            if (query.trim().length >= 2) {
                performSearch(query);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(searchTimeout);
    }, [query]);

    const performSearch = async (searchQuery: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`, {
                headers: {
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setResults(data.results || []);
            }
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const selectedResult = results[selectedIndex];
            if (selectedResult) {
                router.visit(selectedResult.url);
                onClose();
            }
        }
    };

    const handleResultClick = (result: SearchResult) => {
        router.visit(result.url);
        onClose();
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'news':
                return 'bg-blue-100 text-blue-800';
            case 'service':
                return 'bg-green-100 text-green-800';
            case 'product':
                return 'bg-purple-100 text-purple-800';
            case 'page':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="mx-auto mt-16 max-w-2xl px-4">
                <div className="rounded-lg bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    {/* Search Input */}
                    <div className="flex items-center border-b border-gray-200 p-4">
                        <Search className="mr-3 h-5 w-5 text-gray-400" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search for news, services, products..."
                            className="flex-1 text-lg text-gray-900 placeholder-gray-500 caret-gray-900 focus:outline-none"
                        />
                        <button onClick={onClose} className="ml-3 p-1 text-gray-400 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Results */}
                    <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                        {isLoading && (
                            <div className="p-6 text-center">
                                <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-[#4A7C59]"></div>
                                <p className="mt-2 text-gray-600">Searching...</p>
                            </div>
                        )}

                        {!isLoading && query.length >= 2 && results.length === 0 && (
                            <div className="p-6 text-center">
                                <p className="text-gray-600">No results found for "{query}"</p>
                            </div>
                        )}

                        {!isLoading && results.length > 0 && (
                            <div className="py-2">
                                {results.map((result, index) => (
                                    <div
                                        key={result.id}
                                        className={`cursor-pointer px-4 py-3 transition-colors ${
                                            index === selectedIndex ? 'bg-[#4A7C59]/10' : 'hover:bg-gray-50'
                                        }`}
                                        onClick={() => handleResultClick(result)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            {result.image && <img src={result.image} alt="" className="h-12 w-12 rounded object-cover" />}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center space-x-2">
                                                    <h3 className="truncate text-sm font-medium text-gray-900">{result.title}</h3>
                                                    <span className={`rounded-full px-2 py-1 text-xs ${getTypeColor(result.type)}`}>
                                                        {result.type}
                                                    </span>
                                                </div>
                                                {result.excerpt && <p className="line-clamp-2 text-sm text-gray-600">{result.excerpt}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {query.length > 0 && query.length < 2 && (
                            <div className="p-6 text-center">
                                <p className="text-gray-600">Type at least 2 characters to search</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 px-4 py-2 text-xs text-gray-500">Use ↑↓ to navigate, Enter to select, Esc to close</div>
                </div>
            </div>
        </div>
    );
}
