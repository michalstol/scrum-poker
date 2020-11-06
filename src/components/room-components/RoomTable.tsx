import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { db } from './../../firebase/firebase';

import { RoomIDInterface } from './../../contexts/AppContext';
import { UserInterface } from './../../contexts/RoomContext';

import Alert from './../Alert';
import Header from './../Header';

function RecordElement({ voted, name, bet }: UserInterface) {
    return (
        <li className={`room-table__el ${!voted ? 'voting' : ''}`}>
            <div className="room-table__el-name">{name}</div>
            <div className="room-table__el-bet">
                {voted ? bet : '...voiting'}
            </div>
        </li>
    );
}

export default function RoomTable({ roomID }: RoomIDInterface) {
    const dbUsers = db.collection('rooms').doc(roomID).collection('users');

    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const dbConnection = dbUsers
            .where('role', '==', 'player')
            .onSnapshot((snap: firestore.QuerySnapshot) => {
                const updatePlayers: any = [];

                snap.forEach((doc: firestore.DocumentSnapshot) => {
                    if (doc.exists) {
                        updatePlayers.push({ ...doc.data() });
                    }
                });

                setUsers(updatePlayers);
            });

        return dbConnection;
    }, []);

    return (
        <>
            <Alert type="error" content={error} setAlert={setError} />

            <Header
                variant="header--flex-shrink"
                subtitle={'The "Pictet" room.'}
                title="Voting results:"
            />

            <div className="room-table">
                <ul className="room-table__list">
                    {users
                        .filter((record: UserInterface) => !!record.voted)
                        .map((record, index) => (
                            <RecordElement
                                key={`room-table-voted-${index}`}
                                {...record}
                            />
                        ))}
                    {users
                        .filter((record: UserInterface) => !record.voted)
                        .map((record, index) => (
                            <RecordElement
                                key={`room-table-voting-${index}`}
                                {...record}
                            />
                        ))}
                </ul>
            </div>
        </>
    );
}
