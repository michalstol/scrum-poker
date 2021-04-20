import React, { useState } from 'react';
import { Frame, useCycle } from 'framer';

import { auth } from './../firebase/firebase';

import {
    RoomIDInterface,
    UpdateContextInterface,
} from './../contexts/AppContext';

import copy from './../helpers/copy';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';

import ViewStart from './settings-components/ViewStart';
import ViewCopyID from './settings-components/ViewCopyID';

interface SettingsInterface extends RoomIDInterface, UpdateContextInterface {}

export default function Settings({ roomID, updateContext }: SettingsInterface) {
    const userName = auth.currentUser?.displayName || '';
    const [alertContent, setAlertContent] = useState('');
    const [animateContainer, cycleContainer] = useCycle(
        { top: '-100%' },
        { top: 0 }
    );
    const [animateBtn, cycleBtn] = useCycle(
        { bottom: -23, color: '#272727', opacity: 0.8 },
        { bottom: 0, color: '#ffffff', opacity: 1 }
    );

    const clickHandler = (event: Event) => {
        event.preventDefault();

        const $target = event.target as HTMLElement;
        const content: any = $target.innerText?.toLocaleLowerCase();

        if (!!content) setAlertContent(copy(roomID, content));
    };

    return (
        <Frame
            top="-100%"
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
                    title="Would you like to do?"
                    subtitle={`What's up ${userName}?`.trim()}
                />

                <ViewStart setAction={() => {}} />
                {/* <ViewCopyID roomID={roomID} clickHandler={clickHandler} /> */}
            </Container>

            <Frame
                animate={animateBtn}
                transition={{
                    ease: [0.08, 0.88, 0.12, 1],
                }}
                center="x"
                bottom={-23}
                width={100}
                height={23}
                backgroundColor="transparent"
                position="absolute"
                style={{ zIndex: 9999 }}
                onTap={() => {
                    cycleBtn();
                    cycleContainer();
                }}
            >
                <div className="settings__bar"></div>
            </Frame>
        </Frame>
    );
}
