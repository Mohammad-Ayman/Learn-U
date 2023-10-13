import React, { useContext } from "react";

import db from "@/firebase";
import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: null,
  savedCourses: [],
  myLearning: [],
  setIsLoggedIn: () => {},
  setUserId: () => {},
  setMyLearning: () => {},
  setSavedCourses: () => {},
});

export default AuthContext;

export const addUserData = async (uid) => {
  try {
    console.log("Calling addUserData...");
    const userDocRef = doc(db, "users", uid);

    // Data to associate with the user
    const userData = {
      savedCourses: [],
      myLearning: [],
    };

    // Set or update user data
    await setDoc(userDocRef, userData); // Use setDoc to set the data

    console.log("Document written with ID: ", uid); // You can use 'uid' as the document ID
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const handleSignup = (email, password, setError, context, router) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password, setError)
    .then((userCredential) => {
      const user = userCredential.user;
      context.setIsLoggedIn(true);
      context.setUserId(user.uid);
      // Call the function to add user data and create "savedcourses" collection
      addUserData(user.uid);
      router.push("/home");
    })
    .catch((error) => {
      setError(
        "Incorrect email or password! Please provide valid email and password with at least 6 characters"
      );
      console.error(error);
    });
};
export const handleLogin = (email, password, setError, context, router) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password, setError)
    .then((userCredential) => {
      const user = userCredential.user;
      context.setIsLoggedIn(true);
      context.setUserId(user.uid);
      router.push("/home");
    })
    .catch((error) => {
      setError("Incorrect email or password!");
      // setError(error.code);
      console.error(error.message);
    });
};

export const handleGoogleLogin = (context, router) => {
  const auth = getAuth();
  signInWithPopup(auth, googleProvider)
    .then(() => {
      context.setIsLoggedIn(true);
      context.setUserId(user.uid);
      router.push("/home");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const handleLogout = (context) => {
  context.setIsLoggedIn(false);
  context.setUserId(null);
};
