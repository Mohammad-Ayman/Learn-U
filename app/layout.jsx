"use client";
import Navbar from "@/Components/NavBar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import FetchedCourses from "@/store/FetchedCourses";
import AuthContext from "@/store/AuthContext";
import { handleLogout } from "@/store/AuthContext";

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
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const firebase = isLocalStorageAvailable
    ? JSON.parse(
        localStorage.getItem(
          "firebase:authUser:AIzaSyAnZT6PINdbCDR7mfYMbdJS_fBv3nOadEQ:[DEFAULT]"
        )
      )
    : null;
  const authContext = useContext(AuthContext);
  useEffect(() => {
    const logOut = async () => {
      if (firebase) {
        try {
          await handleLogout(authContext);

          localStorage.removeItem(
            "firebase:authUser:AIzaSyAnZT6PINdbCDR7mfYMbdJS_fBv3nOadEQ:[DEFAULT]"
          );
        } catch (error) {
          // Handle any errors that occur during logout
          console.error("Logout error:", error);
        }
      }
    };

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
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="author" content={metadata.author} />
            <meta name="keywords" content={metadata.keywords} />
            <meta name="url" content={metadata.url} />
          </Head>
          <body className={inter.className} style={{ display: "flex" }}>
            <header>
              <Navbar />
            </header>
            {/* <main style={{ flex: 1 }}>{children}</main> */}
            {children}
          </body>
        </html>
      </FetchedCourses.Provider>
    </AuthContext.Provider>
  );
}
