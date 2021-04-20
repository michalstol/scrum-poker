import React from 'react';
import classNames from 'classnames';

interface ButtonInterface
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'active' | 'distance' | 'distance-small' | 'secondary' | 'revers';
}

/**
 *
 * @param { 'active' | 'distance' | 'distance-small' | 'secondary' | 'revers' } version - Avaiable visual versions of the component
 * @param { React.ReactNode } children - React children
 * @param { React.ButtonHTMLAttributes<HTMLButtonElement> } props - Typical properties for HTML Button Element
 * @returns { JSX.Element }
 */
export default function Button({
    variant,
    children,
    ...props
}: ButtonInterface): JSX.Element {
    return (
        <button
            className={classNames('button', {
                [`button--${variant}`]: !!variant,
            })}
            {...props}
        >
            {children}
        </button>
    );
}
