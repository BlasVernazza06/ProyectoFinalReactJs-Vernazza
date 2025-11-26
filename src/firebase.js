// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPGolVcR2ZiDFfu1_cv2-XyleFT_khIDM",
  authDomain: "aroma-app-4ce26.firebaseapp.com",
  projectId: "aroma-app-4ce26",
  storageBucket: "aroma-app-4ce26.firebasestorage.app",
  messagingSenderId: "407444051502",
  appId: "1:407444051502:web:da60470134570a2773f1bf",
  measurementId: "G-1TKRFY5HV5"
};

// Inicializar app
const app = initializeApp(firebaseConfig);

// <<< ESTA LÍNEA ES LA MÁS IMPORTANTE
export const db = getFirestore(app);