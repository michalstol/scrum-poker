// import { db } from '@js/firebase';
import { FETCH, PENDING, FULFILLED, REJECTED } from './../helpers/types';
import { TYPE } from './../actions/auth-actions';

const storage = JSON.parse(localStorage.getItem('auth'));
export const initAuthState = {
    auth: {
        uid: undefined,
        email: storage ? storage.email : null,
        name: storage ? storage.name : null,
        photo: storage ? storage.photo : null,
        loggedIn: storage && storage.loggedIn ? true : false
    }
};

export default function userReducer(state = initAuthState, action) {
    const PATH = FETCH + TYPE;

    switch (action.type) {
        case PATH: {
            if (action.payload && action.payload.uid) {
                const { displayName: name, photoURL: photo, uid, email } = action.payload;
                const data = {
                    uid,
                    email,
                    name,
                    photo,
                    loggedIn: true
                }

                localStorage.setItem('auth', JSON.stringify(data));
                return data;
            } else {
                return initAuthState.auth;
            }
        }

        default: {
            return state;
        }
    }
};