import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

//Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyC8ytoCD17Tlv8PAMW64jsVOqjRruyBBH4',
  authDomain: 'tb-hackathon.firebaseapp.com',
  databaseURL: 'https://tb-hackathon.firebaseio.com',
  projectId: 'tb-hackathon',
  storageBucket: 'tb-hackathon.appspot.com',
  messagingSenderId: '1025090198130',
  appId: '1:1025090198130:web:174bf0c776b70f7e8f80eb',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initialize Firestore
firebase.firestore();

//initialize storage
const storage = firebase.storage();

export { firebase, storage as default };
