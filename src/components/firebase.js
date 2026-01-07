// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCSMDtTC0YUlUnmdzZItEOvHezh29Lchpc",
  authDomain: "website-maker-b67cf.firebaseapp.com",
  databaseURL: "https://website-maker-b67cf-default-rtdb.firebaseio.com",
  projectId: "website-maker-b67cf",
  storageBucket: "website-maker-b67cf.firebasestorage.app",
  messagingSenderId: "666875777574",
  appId: "1:666875777574:web:96d806c5445835a7044ce7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
