import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { auth, db } from './../../firebase/firebase';

import { RoomIDInterface } from './../../contexts/AppContext';
import { UserInterface } from './../../contexts/RoomContext';

import Alert from './../Alert';
import Container from './../Container';
import Header from './../Header';

interface RoomTableInterface extends RoomIDInterface {}

export default function RoomTable({ roomID }: RoomTableInterface) {
    const dbUsers = db.collection('rooms').doc(roomID).collection('users');

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

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
        <Container classes="room-table">
            <Alert type="error" content={error} setAlert={setError} />

            <Header subtitle="Voting results:" />

            <div className="room-table__container">
                <ul className="room-table__list">
                    {users.map((record: UserInterface, index) => (
                        <li
                            key={`room-table-user-${index}`}
                            className={`room-table__el ${
                                !record.voted ? 'voting' : ''
                            }`}
                        >
                            <div className="room-table__el-name">
                                {record.name}
                            </div>
                            <div className="room-table__el-bet">
                                {record.voted ? record.bet : '...voiting'}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );
}
