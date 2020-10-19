// import { db } from '@js/firebase';
import { FETCH } from './../helpers/types';
import { TYPE } from './../actions/voted-actions';

export const initVotedState = {
    voted: false
};

export default function votedReducer(state = initVotedState, action) {
    const PATH = FETCH + TYPE;

    switch (action.type) {
        case PATH: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};