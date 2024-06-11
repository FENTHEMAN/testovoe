import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBP6cUfJZZ7hEpdZofP1jA-56jOaDEEhNM",
  authDomain: "testovoe-zadanie-801ac.firebaseapp.com",
  projectId: "testovoe-zadanie-801ac",
  storageBucket: "testovoe-zadanie-801ac.appspot.com",
  messagingSenderId: "1057108814796",
  appId: "1:1057108814796:web:81884390259704e5d8cb69"
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);