import { auth, provider } from './../firebase';
import { FETCH } from './../helpers/types';

export const TYPE = 'USER';

export const fetchUser = () => dispatch => {
  auth.onAuthStateChanged(user => {
    if (user && user.uid) {
      dispatch({
        type: FETCH + TYPE,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH + TYPE,
        payload: false
      });
    }
  });
};

export const signIn = data => dispatch => {
    const {email, password} = data;

    auth
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
        console.log(error);
    });
};

export const signOut = () => dispatch => {
    auth
    .signOut()
    .then(() => {})
    .catch(error => {
        console.log(error);
    });
};