// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw9MC_6V2_C9XbigIQ12xY9BVvTRTso7Y",
  authDomain: "greenflags.firebaseapp.com",
  projectId: "greenflags",
  storageBucket: "greenflags.appspot.com",
  messagingSenderId: "929852583052",
  appId: "1:929852583052:web:c99958a415aa90c1a61fa9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
