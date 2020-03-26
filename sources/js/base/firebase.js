import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
    apiKey: 'AIzaSyD_Px87zTOu29vJ4uJ9skOKzv-NyX_3cIY',
    authDomain: 'play-scrum-poker.firebaseapp.com',
    databaseURL: 'https://play-scrum-poker.firebaseio.com',
    projectId: 'play-scrum-poker',
    storageBucket: 'play-scrum-poker.appspot.com',
    messagingSenderId: '505852253233',
    appId: '1:505852253233:web:e31a91079d5f48888db110'
  });

// BASE
export const auth = firebase.auth();
export const db = firebase.database();