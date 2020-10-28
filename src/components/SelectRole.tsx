import React, { useState } from 'react';

import { auth, db } from './../firebase/firebase';

import {
    UpdateContextInterface,
    RoomIDInterface,
} from './../contexts/AppContext';
import { defaultRoomUser, roles } from './../contexts/RoomContext';

import Select from './form-components/Select';
import Button from './form-components/Button';

interface SelectRoleInterface extends UpdateContextInterface, RoomIDInterface {}

export default function SelectRole({
    updateContext,
    roomID,
}: SelectRoleInterface): any {
    const [userRole, setUserRole] = useState(roles[0]);

    const { uid, displayName }: any = auth.currentUser;
    const dbRoom = db.collection('rooms').doc(roomID).collection('users');

    const selectHandler = (event: React.FormEvent<HTMLSelectElement>) => {
        setUserRole(event.currentTarget.value);
    };

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
        <form onSubmit={submitHandler}>
            <Select value={userRole} onChange={selectHandler}>
                {roles.map(role => (
                    <option key={`role-option-key-${role}`} value={role}>
                        {role}
                    </option>
                ))}
            </Select>

            <Button>Select role</Button>
        </form>
    );
}
