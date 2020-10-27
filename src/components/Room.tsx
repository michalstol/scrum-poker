import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { auth, db } from './../firebase/firebase';

import { RoomIDInterface } from './../contexts/AppContext';
import { UserInterface } from './../contexts/RoomContext';

import Select from './form-component/Select';
import Button from './form-component/Button';

const scrumPoints = [0, 0.5, 1, 2, 3, 5, 8, 10, 13, 20, 40, 100];

export default function Room({ roomID }: RoomIDInterface) {
    const { uid }: any = auth.currentUser;
    const dbUsers = db.collection('rooms').doc(roomID).collection('users');
    const dbCurrentUser = dbUsers.doc(uid);

    const [bet, setBet] = useState(scrumPoints[0]);
    const [voted, setVoted] = useState(false);
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

    useEffect(() => {
        for (let i = 0; i < users.length; i++) {
            const user: any = users[i];

            if (user.uid === uid && voted && !user.voted) {
                console.log('voted false');

                setVoted(user.voted);
                setBet(scrumPoints[0]);
            }
        }
    }, [users]);

    useEffect(() => {
        if (voted) {
            dbCurrentUser.update({
                bet,
                voted,
            });
        }
    }, [voted]);

    const selectHandler = (event: React.FormEvent<HTMLSelectElement>) => {
        setBet(Number(event.currentTarget.value));
    };

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        setVoted(true);
    };

    return (
        <>
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
            <form onSubmit={submitHandler}>
                <Select value={bet} onChange={selectHandler}>
                    {scrumPoints.map(value => (
                        <option key={`scrum-point-${value}`} value={value}>
                            {value}
                        </option>
                    ))}
                </Select>

                <Button>Vote!</Button>
            </form>
        </>
    );
}
