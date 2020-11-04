import React from 'react';

interface HeaderInterface {
    title?: string;
    subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderInterface) {
    return (
        <div className="header">
            {subtitle && <div className="header-subtitle">{subtitle}</div>}
            {title && <div className="header-title">{title}</div>}
        </div>
    );
}
