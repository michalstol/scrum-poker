import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';

import { db } from './../firebase/firebase';

export default function useRoomName(roomID: undefined | string) {
    const [name, setName] = useState('');

    useEffect(() => {
        if (!roomID) return;

        db.collection('rooms')
            .doc(roomID)
            .get()
            .then((doc: firestore.DocumentSnapshot) => {
                if (!doc.exists) return;

                setName(doc.data()?.name || '');
            });
    }, [roomID]);

    return name;
}
