import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  apiKey: "AIzaSyBwviJG_s4-i1oJUctoGp2Uo-tdhC7AmBo",
  authDomain: "info6132w25lab04.firebaseapp.com",
  projectId: "info6132w25lab04",
  storageBucket: "info6132w25lab04.firebasestorage.app",
  messagingSenderId: "658016798881",
  appId: "1:658016798881:web:27a4e208479f5cd547c8e0",
};

const app = initializeApp(config);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);

export { auth, db };
