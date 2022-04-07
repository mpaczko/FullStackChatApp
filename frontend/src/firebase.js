import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

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
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;