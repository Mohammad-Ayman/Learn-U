"use client";
import { redirect } from "next/navigation";
import ThisWeek from "@/Components/Statistics/ThisWeek/ThisWeek";
import MyPerformance from "@/Components/Statistics/MyPerformance/MyPerformance";
import MyActivity from "@/Components/Statistics/MyActivity/MyActivity";
import LastYear from "@/Components/Statistics/LastYear/LastYear";
import AuthContext from "@/store/AuthContext";
import Styles from "./statistics.module.css";

const Statistics = (props) => {
  const context = useContext(AuthContext);
  if (!context.isLoggedIn) redirect("/signin");
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
