"use client";
import Navbar from "@/Components/NavBar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import FetchedCourses from "@/store/FetchedCourses";
import AuthContext from "@/store/AuthContext";
import { handleLogout, loginStatus } from "@/store/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const metadata = {
  title: "LearnU",
  description: "Online Learning Platform",
};

export default function RootLayout({ children }) {
  const authContext = useContext(AuthContext);
  const logOut = async () => {
    const isLogged = loginStatus();
    if (isLogged) {
      try {
        await handleLogout(authContext);
        localStorage.clear();
      } catch (error) {
        // Handle any errors that occur during logout
        console.error("Logout error:", error);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("beforeunload", logOut);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", logOut);
    };
  }, []);
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
          <Head>
            <title>Learn U</title>
          </Head>
          <body className={inter.className} style={{ display: "flex" }}>
            <header>
              <Navbar />
            </header>
            {/* <main style={{ flex: 1 }}>{children}</main> */}
            <div
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                padding: "10px",
                background: "#fff",
                zIndex: 1000,
              }}
            >
              Hello
            </div>
            {children}
          </body>
        </html>
      </FetchedCourses.Provider>
    </AuthContext.Provider>
  );
}
