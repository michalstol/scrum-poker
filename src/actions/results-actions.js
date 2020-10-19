import { auth, db } from './../firebase';
import { FETCH } from './../helpers/types';

export const TYPE = 'RESULTS';
export const dbSession = db.ref('session/');

export const getResults = () => dispatch => {
    dbSession.on('value', snapshot => {
        dispatch({
            type: FETCH + TYPE,
            payload: snapshot ? snapshot.val() : {}
        });
    });
};