"use client";
import React, { useState, useEffect } from "react";
import DisplayCourses from "./DisplayCourses";
import styles from "./styles/featuredCourses.module.css";
import { fetchCourses } from "@/Components/Fetching/fetching";
import { getDocs, collection, addDoc, query, where } from "firebase/firestore";
import db from "@/firebase.js";
import { courses } from "@/app/page";

const FeaturedCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      const courseCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(courseCollection);
      const coursesData = [];
      courseSnapshot.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() });
        setFeaturedCourses(coursesData);
      });
      // setCourses(coursesData);
    };

    fetchCourses(); // Call the fetchCourses function when the component mounts
  }, []); //
  // useEffect(() => {
  //   const fetchAllCourses = async () => {
  //     const courseList = await fetchCourses();
  //     console.log(courseList);
  //     setFetchedCourses(courseList);
  //   };

  //   fetchAllCourses();
  // }, []);

  return (
    <section className={styles["features-container"]}>
      <h2 className="header-text">Featured Courses</h2>
      {/* <DisplayCourses AllCourses={courses.slice(0, 5)} /> */}
      <DisplayCourses AllCourses={featuredCourses.slice(0, 5)} />
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
