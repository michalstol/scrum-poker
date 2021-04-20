import React from 'react';
import classNames from 'classnames';

interface FieldsetInterface
    extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    label?: string;
}

/**
 *
 * @param { React.ReactNode } children  - React children
 * @param { string } className - Class name
 * @returns { JSX.Element }
 */
export default function Fieldset({
    label,
    children,
    className,
    ...props
}: FieldsetInterface): JSX.Element {
    return (
        <fieldset className={classNames('fieldset', className)} {...props}>
            {label && <label className="fieldset-label">{label}</label>}
            {children}
        </fieldset>
    );
}
