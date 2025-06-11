import React from 'react';

interface TableProps {
    children: React.ReactNode;
    className?: string;
}

export const Table: React.FC<TableProps> = ({ children, className }) => {
    return (
        <div className="overflow-x-auto">
            <table className={`min-w-full divide-y divide-gray-200 ${className || ''}`}>{children}</table>
        </div>
    );
};

export const Thead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <thead className="bg-gray-50">{children}</thead>;
};

export const Tbody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
};

export const Tr: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <tr>{children}</tr>;
};

export const Th: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return (
        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase ${className || ''}`}>
            {children}
        </th>
    );
};

export const Td: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    return <td className={`px-6 py-4 whitespace-nowrap ${className || ''}`}>{children}</td>;
};
