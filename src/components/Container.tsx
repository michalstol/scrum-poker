import React from 'react';

interface ContainerInterface {
    flex?: 'end' | 'space-between';
    classes?: string;
    children: any;
}

export default function Container({
    children,
    flex,
    classes = '',
}: ContainerInterface) {
    return (
        <div className={`container ${classes}`}>
            <div className="container__box" data-flex-position={flex}>
                {children}
            </div>
        </div>
    );
}
