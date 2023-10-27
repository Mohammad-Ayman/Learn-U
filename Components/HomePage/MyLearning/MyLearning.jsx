"use client";
import { courses } from "@/app/page";
import FetchedCourses from "@/store/FetchedCourses";
import DisplayMyLearning from "./DisplayMyLearning";
import styles from "./styles/myLearning.module.css";
import { useContext } from "react";

const MyLearning = () => {
  const fetchedCourses = useContext(FetchedCourses);
  return (
    <section className={styles["myLearning-container"]}>
      <h2 className="header-text">My Learning</h2>
      <ul className={`${styles["cards-container"]} mflex`}>
        <DisplayMyLearning
          // AllCourses={fetchedCourses.layoutCourses.slice(0, 2)}
          AllCourses={courses.slice(0, 2)}
        ></DisplayMyLearning>
      </ul>
    </section>
  );
};

export default MyLearning;
