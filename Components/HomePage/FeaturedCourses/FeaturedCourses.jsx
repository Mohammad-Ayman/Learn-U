"use client";
import React, { useState, useEffect } from "react";
import DisplayCourses from "./DisplayCourses";
import styles from "./styles/featuredCourses.module.css";
import { fetchCourses } from "@/Components/Fetching/fetching";

import { courses } from "@/app/page";

const FeaturedCourses = () => {
  const [fetchedCourses, setFetchedCourses] = useState([]);

  useEffect(() => {
    const fetchAllCourses = async () => {
      const courseList = await fetchCourses();
      setFetchedCourses(courseList);
    };

    fetchAllCourses();
  }, []);

  return (
    <section className={styles["features-container"]}>
      <h2 className="header-text">Featured Courses</h2>
      <DisplayCourses AllCourses={courses.slice(0, 5)} />
    </section>
  );
};

export default FeaturedCourses;

// <ul className={`${styles["cards-container"]} mflex`}>
//   {/* {fetchedCourses && (
//     <DisplayCourses AllCourses={fetchedCourses.slice(0, 4)} />
//   )} */}
//   {courses && <DisplayCourses AllCourses={courses.slice(0, 4)} />}
// </ul>
