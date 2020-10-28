import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { auth, db } from './../../firebase/firebase';

import { RoomIDInterface } from './../../contexts/AppContext';
import { UserInterface } from './../../contexts/RoomContext';

interface RoomTableInterface extends RoomIDInterface {}

export default function RoomTable({ roomID }: RoomTableInterface) {
    const { uid }: any = auth.currentUser;
    const dbUsers = db.collection('rooms').doc(roomID).collection('users');

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const dbConnection = dbUsers.onSnapshot(
            (snap: firestore.QuerySnapshot) => {
                const updatePlayers: any = [];

                snap.forEach((doc: firestore.DocumentSnapshot) => {
                    if (doc.exists) {
                        updatePlayers.push({ ...doc.data() });
                    }
                });

                setUsers(updatePlayers);
            }
        );

        return dbConnection;
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Bet</th>
                    <th>Voted</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: UserInterface) => (
                    <tr key={`room-user-key-${user.uid}`}>
                        <td>{user.name}</td>
                        <td>{user.bet}</td>
                        <td>{user.voted ? 'true' : 'false'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
