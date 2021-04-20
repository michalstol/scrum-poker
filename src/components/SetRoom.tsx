import React, { useState } from 'react';
import firebase from 'firebase';

import { auth, db } from './../firebase/firebase';

import { UpdateContextInterface } from './../contexts/AppContext';
import { defaultRoom } from './../contexts/RoomContext';

import Alert from './Alert';
import Container from './Container';
import Header from './Header';
import Distance from './Distance';
import Form from './form-components/Form';
import Input from './form-components/Input';
// import Button from './form-components/Button';
import Button from './form-components/Button/Button';

export default function SetRoom({
    updateContext,
}: UpdateContextInterface): any {
    const dbRooms = db.collection('rooms');

    const [preventForm, setPreventForm] = useState(false);
    const [tab, setTab] = useState(0);
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const switchTab = (id: number) => {
        if (id === tab) return;

        setTab(id);
        setContent('');
    };

    const submitHandler = (event: React.SyntheticEvent): void => {
        event.preventDefault();

        if (!content) return;
        if (preventForm) return;

        switch (tab) {
            case 0:
                setPreventForm(true);
                joinHandler();
                break;
            case 1:
                setPreventForm(true);
                createHandler();
                break;
            default:
                console.warn(
                    `SetRoom - {tab: ${tab}} is different than 0 or 1`
                );
        }
    };

    const joinHandler = () => {
        if (content.length !== 20) return;

        dbRooms
            .doc(content)
            .get()
            .then(doc => {
                if (!doc.exists) {
                    setPreventForm(false);
                    setError('Room with this ID number does not exist!');

                    return;
                }

                updateContext(
                    {
                        roomID: content,
                    },
                    true
                );
            })
            .catch((fError: firebase.firestore.FirestoreError) => {
                setPreventForm(false);
                setError(fError.message);
            });
    };
    const createHandler = () => {
        if (content.length < 3) return;

        const { uid }: any = auth.currentUser;

        dbRooms
            .add({
                ...defaultRoom,
                name: content,
                admin: uid,
                users: [],
            })
            .then(doc => {
                const { id } = doc;

                updateContext(
                    {
                        roomID: id,
                    },
                    true
                );
            })
            .catch((fError: firebase.firestore.FirestoreError) => {
                setPreventForm(false);
                setError(fError.message);
            });
    };

    return (
        <Container
            flex="end"
            classes={`set-room ${tab === 1 ? 'set-room--revers' : ''}`}
        >
            <Alert type="error" content={error} setAlert={setError} />

            <Header
                title="You can join an existing room or create a new one."
                subtitle="Select your room!"
            />

            <Form onSubmit={submitHandler}>
                {tab === 0 ? (
                    <Input
                        type="text"
                        name="room-id"
                        placeholder="Put a room ID"
                        autoComplete="new-password"
                        minLength={20}
                        maxLength={20}
                        required={true}
                        disabled={preventForm}
                        value={content}
                        setValue={setContent}
                    />
                ) : (
                    <Input
                        type="text"
                        name="room-name"
                        placeholder="Set a room name"
                        autoComplete="new-password"
                        minLength={3}
                        required={true}
                        disabled={preventForm}
                        value={content}
                        setValue={setContent}
                    />
                )}

                <Distance style={{ height: '45px' }} />

                <Button
                    type={tab === 0 ? 'submit' : 'button'}
                    variant={tab !== 0 ? 'secondary' : undefined}
                    disabled={preventForm}
                    onClick={(event: React.SyntheticEvent) => {
                        tab !== 0 && event.preventDefault();
                        switchTab(0);
                    }}
                >
                    Join
                </Button>

                <Distance
                    classes="set-room__distance"
                    content="or"
                    style={{ height: '21px', marginTop: '6px' }}
                />

                <Button
                    type={tab === 1 ? 'submit' : 'button'}
                    variant={tab !== 1 ? 'secondary' : undefined}
                    disabled={preventForm}
                    onClick={(event: React.SyntheticEvent) => {
                        tab !== 1 && event.preventDefault();
                        switchTab(1);
                    }}
                >
                    Create new
                </Button>
            </Form>
        </Container>
    );
}
