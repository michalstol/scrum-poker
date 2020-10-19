// import { db } from '@js/firebase';
import { FETCH, PENDING, FULFILLED, REJECTED } from './../helpers/types';
import { TYPE } from './../actions/results-actions';

export const initResultsState = {
    results: {}
};

export default function resultsReducer(state = initResultsState, action) {
    const PATH = FETCH + TYPE;

    switch (action.type) {
        case PATH: {
            const {payload} = action;

            if (payload) {
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