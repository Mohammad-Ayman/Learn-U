import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider,setPersistence,browserSessionPersistence,signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfigMohammed = {
  apiKey: "AIzaSyAnZT6PINdbCDR7mfYMbdJS_fBv3nOadEQ",
  authDomain: "learn-u-35d00.firebaseapp.com",
  projectId: "learn-u-35d00",
  storageBucket: "learn-u-35d00.appspot.com",
  messagingSenderId: "474596306123",
  appId: "1:474596306123:web:a681b3d26d5e4925f4bf4e",
  measurementId: "G-L8WR4HTGNT",
};
// Initialize Firebase
const app = initializeApp(firebaseConfigMohammed);
const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    return signInWithEmailAndPassword(auth, email, password);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
  });
const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default db;
export { auth };
