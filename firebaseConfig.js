// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence } from "firebase/auth";
import { initializeAuth } from "firebase/auth/cordova";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHf05snGloXxCM0A5uKMBlv8olB-Fv1Q4",
  authDomain: "fir-chat-dc362.firebaseapp.com",
  projectId: "fir-chat-dc362",
  storageBucket: "fir-chat-dc362.firebasestorage.app",
  messagingSenderId: "388537078139",
  appId: "1:388537078139:web:4d5a64e77e0745e9162dde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
    }
);

export const db = getFirestore(app);

export const userRef = collection(db, "users");
export const roomRef = collection(db, "rooms");