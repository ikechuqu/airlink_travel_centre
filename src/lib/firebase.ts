// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASfdjMNmznAJst1DJlunKgwFeY9l90B30",
  authDomain: "tradeguard-ai.firebaseapp.com",
  projectId: "tradeguard-ai",
  storageBucket: "tradeguard-ai.firebasestorage.app",
  messagingSenderId: "506293480816",
  appId: "1:506293480816:web:a13a4cee72c335363df3b5"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);

export { db };
