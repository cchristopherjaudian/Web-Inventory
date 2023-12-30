// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDapJV9eVKWLJz4jgJ87Wbrjd8LdJIskDo',
  authDomain: 'oxiaire-65bc1.firebaseapp.com',
  projectId: 'oxiaire-65bc1',
  storageBucket: 'oxiaire-65bc1.appspot.com',
  messagingSenderId: '655113414182',
  appId: '1:655113414182:web:25a047b41b66a44217e8e7'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
