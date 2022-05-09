import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQBe_IR5SKSX1cZcALhbQf1VKvQAAFu3I",
    authDomain: "chatapp2-ecf55.firebaseapp.com",
    projectId: "chatapp2-ecf55",
    storageBucket: "chatapp2-ecf55.appspot.com",
    messagingSenderId: "666593940495",
    appId: "1:666593940495:web:7f2a3bdf6fad083e6dff7a",
    measurementId: "G-H5MNFQH7R8"
};
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// const admin = firebase.admin();
const storage = firebase.storage();


export {auth, googleAuthProvider, facebookAuthProvider, firebaseApp, storage, db, firebase as default};
