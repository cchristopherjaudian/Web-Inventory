// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBeQX_prqNxQeRYpRgoq5kA1ekrWKaUhOo',
  authDomain: 'padyak-playground.firebaseapp.com',
  databaseURL: 'https://padyak-playground-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'padyak-playground',
  storageBucket: 'padyak-playground.appspot.com',
  messagingSenderId: '44865196330',
  appId: '1:44865196330:web:928a287b73cafca1210e53'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
