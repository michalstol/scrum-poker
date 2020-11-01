import React from 'react';

interface ContainerInterface {
    flex?: 'end';
    children: any;
}

export default function Container({ children, flex }: ContainerInterface) {
    return (
        <div className="container">
            <div className="container__box" data-flex-position={flex}>
                {children}
            </div>
        </div>
    );
}
