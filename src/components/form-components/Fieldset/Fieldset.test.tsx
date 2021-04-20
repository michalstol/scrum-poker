import React from 'react';
import { cleanup, render } from '@testing-library/react';

import Fieldset from './Fieldset';

afterEach(cleanup);

it('Fieldset component - render a fieldset with the label', () => {
    const extraClass = 'extra-class';
    const children = 'Foo content';
    const label = 'Foo label';

    const { container } = render(
        <Fieldset className={extraClass} label={label}>
            {children}
        </Fieldset>
    );
    const { firstChild } = container;

    expect(firstChild).toHaveClass(extraClass);
    expect(firstChild).toHaveTextContent(children);
    expect(container.querySelector('label')).toHaveTextContent(label);
});
