"use client";
import Navbar from "@/Components/NavBar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

import { useState } from "react";
import AuthContext from "@/store/AuthContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "LearnU",
  description: "Online Learning Platform",
};

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedCourses, setSavedCourses] = useState([]);
  const [myLearning, setMyLearning] = useState([]);
  const [userId, setUserId] = useState(null);
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
      <html lang="en">
        <body className={inter.className} style={{ display: "flex" }}>
          <header>
            <Navbar />
          </header>
          <main style={{ flex: 1 }}>{children}</main>
        </body>
      </html>
    </AuthContext.Provider>
  );
}
