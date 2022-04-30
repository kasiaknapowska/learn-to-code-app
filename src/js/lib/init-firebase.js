// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaGb-h6VJrWDnsEC0W37_HmNIzM0Qd1Ww",
  authDomain: "learn-to-code-quiz-app.firebaseapp.com",
  projectId: "learn-to-code-quiz-app",
  storageBucket: "learn-to-code-quiz-app.appspot.com",
  messagingSenderId: "516363449402",
  appId: "1:516363449402:web:6a946eff2ffe322e1ef103",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
export const db = getFirestore(app);
