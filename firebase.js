import * as firebase from "firebase";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBkRV-94n6bofyX4JcU3RZXKbp1qtY1TzM",
    authDomain: "tracker-e9ea3.firebaseapp.com",
    databaseURL: "https://tracker-e9ea3.firebaseio.com",
    projectId: "tracker-e9ea3",
    storageBucket: "tracker-e9ea3.appspot.com",
    messagingSenderId: "199304637402",
    appId: "1:199304637402:web:cf827cd0a1f7aba15aeee3",
    measurementId: "G-6RR7NB6G25"
};

export const fBase = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;