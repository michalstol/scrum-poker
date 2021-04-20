import React from 'react';
import { RoomIDInterface } from '../../contexts/AppContext';
import Button from '../form-components/Button';
import Header from '../Header';

interface ViewCopyIDInterface extends RoomIDInterface {
    clickHandler: (event: MouseEvent | TouchEvent | PointerEvent) => void;
}

export default function ViewCopyID({
    roomID,
    clickHandler,
}: ViewCopyIDInterface): JSX.Element {
    return (
        <div className="settings__container">
            <div className="settings__field-id">{roomID}</div>

            <Button
                type="button"
                variation="button--revers"
                onClick={clickHandler}
            >
                ID
            </Button>
            <Button
                type="button"
                variation="button--revers"
                onClick={clickHandler}
            >
                URL
            </Button>
        </div>
    );
}
