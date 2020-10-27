import React, { useState, useEffect } from 'react';

import { auth, db } from './../firebase/firebase';

import { RoomIDInterface } from './../contexts/AppContext';

import Select from './form-component/Select';
import Button from './form-component/Button';

const scrumPoints = [0, 0.5, 1, 2, 3, 5, 8, 10, 13, 20, 40, 100];

export default function Room({ roomID }: RoomIDInterface) {
    const [bet, setBet] = useState(scrumPoints[0]);
    const [voted, setVoted] = useState(false);

    const selectHandler = (event: React.FormEvent<HTMLSelectElement>) => {
        setBet(Number(event.currentTarget.value));
    };

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();

        setVoted(true);
    };

    return (
        <>
            <form onSubmit={submitHandler}>
                <Select value={scrumPoints[0]} onChange={selectHandler}>
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
