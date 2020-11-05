import React from 'react';

interface HeaderInterface {
    title?: string;
    subtitle?: string;
    variant?: '' | 'header--flex-shrink';
}

export default function Header({
    title,
    subtitle,
    variant = '',
}: HeaderInterface) {
    return (
        <div className={`header ${variant}`}>
            {subtitle && <div className="header-subtitle">{subtitle}</div>}
            {title && <div className="header-title">{title}</div>}
        </div>
    );
}
