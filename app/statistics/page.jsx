"use client";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import ThisWeek from "@/Components/Statistics/ThisWeek/ThisWeek";
import MyPerformance from "@/Components/Statistics/MyPerformance/MyPerformance";
import MyActivity from "@/Components/Statistics/MyActivity/MyActivity";
import LastYear from "@/Components/Statistics/LastYear/LastYear";
import Styles from "./statistics.module.css";

const Statistics = () => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const firebase = isLocalStorageAvailable
    ? JSON.parse(
        localStorage.getItem(
          "firebase:authUser:AIzaSyAnZT6PINdbCDR7mfYMbdJS_fBv3nOadEQ:[DEFAULT]"
        )
      )
    : null;
  if (!firebase) redirect("/signin");
  return (
    <main className={Styles.main}>
      <ThisWeek />
      <div className={Styles.myActivity}>
        <MyActivity />
      </div>
      <MyPerformance />
      <div className={Styles.last}>
        <LastYear />
      </div>
    </main>
  );
};

export default Statistics;
