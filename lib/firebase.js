import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCVlPATV44cZrSA7JP96eyJHX0c4Lfcfc",
    authDomain: "scheduling-demo-4c557.firebaseapp.com",
    projectId: "scheduling-demo-4c557",
    storageBucket: "scheduling-demo-4c557.appspot.com",
    messagingSenderId: "1068740818532",
    appId: "1:1068740818532:web:18a5976d2e235b40c4fd171",
    measurementId: "G-06VDVLGB6K"
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const db = getFirestore();
