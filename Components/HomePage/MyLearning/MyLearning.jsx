"use client";
import { courses } from "@/app/page";
import DisplayMyLearning from "./DisplayMyLearning";
import styles from "./styles/myLearning.module.css";

const MyLearning = () => {
  return (
    <section className={styles["myLearning-container"]}>
      <h2 className="header-text">My Learning</h2>
      <ul className={`${styles["cards-container"]} mflex`}>
        <DisplayMyLearning AllCourses={courses.slice(0, 2)}></DisplayMyLearning>
      </ul>
    </section>
  );
};

export default MyLearning;
