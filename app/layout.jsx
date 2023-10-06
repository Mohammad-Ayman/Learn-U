"use client";
import Navbar from "@/Components/NavBar/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

import { useState, useContext } from "react";
import AuthContext from "@/store/AuthContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "LearnU",
  description: "Online Learning Platform",
};

export default function RootLayout({ children }) {
  const authContext = useContext(AuthContext);
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: "flex" }}>
        <header>
          <Navbar isLoggedIn={authContext.isLoggedIn} />
        </header>
        <main style={{ flex: 1 }}>{children}</main>
      </body>
    </html>
  );
}
