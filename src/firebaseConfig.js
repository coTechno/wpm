import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBe11Jcjqmms3w8bbxpZVr3ls4OI3UNfw8",
  authDomain: "mybase-b71ac.firebaseapp.com",
  projectId: "mybase-b71ac",
  storageBucket: "mybase-b71ac.appspot.com",
  messagingSenderId: "622935003489",
  appId: "1:622935003489:web:1cd5e81f1cabd459b6b520",
  measurementId: "G-T9CSRL3XZE"
}

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
//     appId: process.env.REACT_APP_APP_ID,
//     measurementId: process.env.REACT_APP_MEASUREMENT_ID
//   };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebaseApp.firestore();

export {auth, db};

// npm install -g firebase-tools