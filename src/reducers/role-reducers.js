// import { db } from '@js/firebase';
import { FETCH, PENDING, FULFILLED, REJECTED } from './../helpers/types';
import { TYPE } from './../actions/role-actions';

const storage = localStorage.getItem('role');
export const initRoleState = {
    role: storage ? storage : ''
};

export default function roleReducer(state = initRoleState, action) {
    const PATH = FETCH + TYPE;

    switch (action.type) {
        case PATH: {
            const {payload} = action;

            if (payload) {
                localStorage.setItem('role', payload);

                return payload;
            } else {
                return '';
            }
        }

        default: {
            return state;
        }
    }
};