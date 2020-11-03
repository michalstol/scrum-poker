import React, { useState } from 'react';

import { auth, db } from './../firebase/firebase';

import {
    UpdateContextInterface,
    RoomIDInterface,
} from './../contexts/AppContext';
import { defaultRoomUser, roles } from './../contexts/RoomContext';

import Container from './Container';
import Form from './form-components/Form';
import Checkbox from './form-components/Checkbox';
import Fieldset from './form-components/Fieldset';
import Button from './form-components/Button';

interface SelectRoleInterface extends UpdateContextInterface, RoomIDInterface {}

export default function SelectRole({
    updateContext,
    roomID,
}: SelectRoleInterface): any {
    const [userRole, setUserRole] = useState(roles[0]);

    const { uid, displayName }: any = auth.currentUser;
    const dbRoom = db.collection('rooms').doc(roomID).collection('users');

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newRole = { role: userRole };

        dbRoom
            .doc(uid)
            .set({
                ...defaultRoomUser,
                ...newRole,
                uid,
                name: displayName,
            })
            .then(() => {
                updateContext({ ...newRole }, true);
            });
    };

    return (
        <Container flex="end">
            <Form onSubmit={submitHandler}>
                <Fieldset>
                    {roles.map((role, index) => (
                        <Checkbox
                            key={`role-option-key-${index}`}
                            value={role}
                            label={role}
                            setValue={setUserRole}
                            selected={role === userRole}
                        />
                    ))}
                </Fieldset>

                <Button variation="button--distance">Select role</Button>
            </Form>
        </Container>
    );
}
