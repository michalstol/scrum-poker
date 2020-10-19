import { FETCH } from './../helpers/types';
import { db } from './../firebase';

const dbSession = db.ref('session/');
export const TYPE = 'VOTED';

export const vote = (uid, points) => dispatch => {
    if (uid) {
        dispatch({
            type: FETCH + TYPE,
            payload: dbSession.child(uid).update({points})
        });
    }
};