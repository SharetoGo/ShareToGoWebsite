// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Tu configuración de Firebase (la obtienes en el panel de Firebase)
const firebaseConfig = {
    apiKey: "AIzaSyC-uYp3EUCBMFDmZWhoivygMF9SBgQEsYY",
    authDomain: "share-to-go-db.firebaseapp.com",
    projectId: "share-to-go-db",
    storageBucket: "share-to-go-db.appspot.com",
    messagingSenderId: "556094605210",
    appId: "1:556094605210:web:036aa2f382e82cce5e5c23",
    measurementId: "G-Q8KW90MKPY"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
