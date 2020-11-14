import React, { useState, useEffect } from 'react';
import { Frame, useCycle } from 'framer';

import { RoomIDInterface, UserInterface } from './../contexts/AppContext';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';
import Button from './form-components/Button';

interface SettingsInterface extends RoomIDInterface, UserInterface {}

function copy(id: string | undefined, type: 'id' | 'url'): string {
    if (!id) return '';

    const $input = document.createElement('input');

    $input.value =
        type === 'url'
            ? `${window.location.origin}?roomID=${encodeURI(id)}`
            : id;

    document.body.appendChild($input);
    $input.select();
    document.execCommand('copy');
    $input.remove();

    return `${
        type === 'id' ? 'Room ID' : 'URL address'
    } is copied to your clipboard.`;
}

export default function Settings({ roomID, userName }: SettingsInterface) {
    const [alertContent, setAlertContent] = useState('');
    const [animateContainer, cycleContainer] = useCycle(
        { top: '-100%' },
        { top: 0 }
    );
    const [animateBtn, cycleBtn] = useCycle(
        { bottom: -13, backgroundColor: '#272727', opacity: 0.8 },
        { bottom: 10, backgroundColor: '#ffffff', opacity: 1 }
    );

    const clickHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const content: any = event.currentTarget.textContent?.toLocaleLowerCase();

        if (!!content) setAlertContent(copy(roomID, content));
    };

    return (
        <Frame
            animate={animateContainer}
            transition={{
                ease: [0.08, 0.88, 0.12, 1],
            }}
            width="100%"
            height="100%"
            style={{ zIndex: 9998 }}
            position="absolute"
        >
            <Container flex="end" classes="settings">
                <Alert
                    type="success"
                    content={alertContent}
                    setAlert={setAlertContent}
                />

                <Header
                    title="Would you like to share your room? Just copy the room ID or URL address."
                    subtitle={`What's up ${userName}?`}
                />

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
            </Container>

            <Frame
                animate={animateBtn}
                center="x"
                bottom={-13}
                width={100}
                height={3}
                position="absolute"
                style={{ zIndex: 9999 }}
                onTap={() => {
                    cycleBtn();
                    cycleContainer();
                }}
            />
        </Frame>
    );
}
