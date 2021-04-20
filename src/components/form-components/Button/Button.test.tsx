import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Button from './Button';

afterEach(cleanup);

it('Button component - render a button with the secondary variant', () => {
    const variant = 'secondary';
    const children = 'Text';

    const { container } = render(<Button variant={variant}>{children}</Button>);
    const { firstChild } = container;

    expect(firstChild).toHaveClass(`button--${variant}`);
    expect(firstChild).toHaveTextContent(children);
});
