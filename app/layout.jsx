"use client";
import Navbar from "@/Components/NavBar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

import { useState } from "react";
import AuthContext from "@/store/AuthContext";
import FetchedCourses from "@/store/FetchedCourses";

const inter = Inter({ subsets: ["latin"] });
const metadata = {
  title: "LearnU",
  description: "Online Learning Platform",
  author: "Mohamed Ayman",
  keywords: "online learning, education, courses, tutorials",
  image: "/path/to/your/image.jpg",
  url: "https://learn-u.vercel.app/",
};

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedCourses, setSavedCourses] = useState([]);
  const [myLearning, setMyLearning] = useState([]);
  const [userId, setUserId] = useState(null);
  const [layoutCourses, setLayoutCourses] = useState([]);

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
