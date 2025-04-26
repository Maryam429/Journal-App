//import the functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import JournalEntry from "src/screens/JournalEntry";

const firebaseConfig = {
  apiKey: "AIzaSyAqWarVcHPoEnJL0yaBYuIXQcYvXdjFIMQ",
  authDomain: "journaling-app-dbdb7.firebaseapp.com",
  projectId: "journaling-app-dbdb7",
  storageBucket: "journaling-app-dbdb7.firebasestorage.app",
  messagingSenderId: "521009770833",
  appId: "1:521009770833:web:a1dab43c7aa54996ae6370",
  measurementId: "G-23B8MZL593"
};
//initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
