"use client";
import Navbar from "@/Components/NavBar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { getDocs, collection } from "firebase/firestore";
import db from "@/firebase.js";

import { useState, useEffect } from "react";
import AuthContext from "@/store/AuthContext";
import FetchedCourses from "@/store/FetchedCourses";

const inter = Inter({ subsets: ["latin"] });
const metadata = {
  title: "LearnU",
  description: "Online Learning Platform",
};

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedCourses, setSavedCourses] = useState([]);
  const [myLearning, setMyLearning] = useState([]);
  const [userId, setUserId] = useState(null);
  const [layoutCourses, setLayoutCourses] = useState([]);

  // useEffect(() => {
  const fetchCourses = async () => {
    const courseCollection = collection(db, "courses");
    const courseSnapshot = await getDocs(courseCollection);
    const coursesData = [];
    courseSnapshot.forEach((doc) => {
      coursesData.push({ id: doc.id, ...doc.data() });
    });
    setLayoutCourses(coursesData);
  };

  // fetchCourses();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userId,
        setUserId,
        myLearning,
        setMyLearning,
        savedCourses,
        setSavedCourses,
      }}
    >
      <FetchedCourses.Provider
        value={{
          layoutCourses,
          setLayoutCourses,
        }}
      >
        <html lang="en">
          <body className={inter.className} style={{ display: "flex" }}>
            <header>
              <Navbar />
            </header>
            <main style={{ flex: 1 }}>{children}</main>
          </body>
        </html>
      </FetchedCourses.Provider>
    </AuthContext.Provider>
  );
}
