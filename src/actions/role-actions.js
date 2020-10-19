import { FETCH } from './../helpers/types';

export const TYPE = 'ROLE';

export const setRole = role => dispatch => {
    dispatch({
        type: FETCH + TYPE,
        payload: role
    });
};