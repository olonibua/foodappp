import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDBAP2dmVE07MD4JCL9BeEB17ZYL2hYPcw",
    authDomain: "foodapp-c9631.firebaseapp.com",
    databaseURL: "https://foodapp-c9631-default-rtdb.firebaseio.com",
    projectId: "foodapp-c9631",
    storageBucket: "foodapp-c9631.appspot.com",
    messagingSenderId: "1069479063793",
    appId: "1:1069479063793:web:53b24df50425a0bc417950",
    measurementId: "G-YXK8YJ4RPL"
};


const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export const auth = getAuth();

export { app, firestore, storage };