import React from 'react';

import Button from '../form-components/Button';
import Header from '../Header';

interface ViewStartInterface {
    setAction: (action: string) => void;
}

export default function ViewStart({
    setAction,
}: ViewStartInterface): JSX.Element {
    return (
        <>
            <div className="settings__container">
                <Button
                    type="button"
                    variation="button--revers"
                    onClick={() => setAction('copy-id')}
                >
                    Share the room
                </Button>
                <Button
                    type="button"
                    variation="button--revers"
                    onClick={() => setAction('change-name')}
                >
                    Change your name
                </Button>
                <Button
                    type="button"
                    variation="button--revers"
                    onClick={() => setAction('leave')}
                >
                    Leave the room
                </Button>
            </div>
        </>
    );
}
