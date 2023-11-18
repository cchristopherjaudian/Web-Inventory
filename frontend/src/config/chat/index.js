
import firebaseConfig from 'config/firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function setUserOnlineStatus(userId) {
    const userStatusDatabaseRef = database.ref('/status/' + userId);
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            userStatusDatabaseRef.set(true);
            userStatusDatabaseRef.onDisconnect().set(false);
        }
    });
}
function setUserOffline(userId) {
    const userStatusDatabaseRef = firebase.database().ref('/status/' + userId);
    userStatusDatabaseRef.set(false);
}

export { setUserOnlineStatus, setUserOffline };
