// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzRjprGos5_TC5TP80fOZjf_gjwpGYFLA",
  authDomain: "notebook-c5021.firebaseapp.com",
  projectId: "notebook-c5021",
  storageBucket: "notebook-c5021.firebasestorage.app",
  messagingSenderId: "504385306988",
  appId: "1:504385306988:web:548bcadefd82d7bcf7f349",
  measurementId: "G-LCRMY1DTKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export {app, analytics, db }