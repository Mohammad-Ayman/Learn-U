"use client";
import ThisWeek from "@/Components/Statistics/ThisWeek/ThisWeek";
import MyPerformance from "@/Components/Statistics/MyPerformance/MyPerformance";
import MyActivity from "@/Components/Statistics/MyActivity/MyActivity";
import LastYear from "@/Components/Statistics/LastYear/LastYear";
import Styles from "./statistics.module.css";

const Statistics = (props) => {
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
