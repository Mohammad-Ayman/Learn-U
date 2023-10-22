"use client";
import React, { useState, useEffect, useContext } from "react";
import DisplayCourses from "./DisplayCourses";
import styles from "./styles/featuredCourses.module.css";
import { fetchCourses } from "@/Components/Fetching/fetching";
import { getDocs, collection, addDoc, query, where } from "firebase/firestore";
import db from "@/firebase.js";
import { courses } from "@/app/page";
import FetchedCourses from "@/store/FetchedCourses";

const FeaturedCourses = () => {
  const fetchedCourses = useContext(FetchedCourses);
  // const [featuredCourses, setFeaturedCourses] = useState([]);
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const courseCollection = collection(db, "courses");
  //     const courseSnapshot = await getDocs(courseCollection);
  //     const coursesData = [];
  //     courseSnapshot.forEach((doc) => {
  //       coursesData.push({ id: doc.id, ...doc.data() });
  //       setFeaturedCourses(coursesData);
  //     });
  //     // setCourses(coursesData);
  //   };

  //   fetchCourses(); // Call the fetchCourses function when the component mounts
  // }, []);
  return (
    <section className={styles["features-container"]}>
      <h2 className="header-text">Featured Courses</h2>
      <DisplayCourses AllCourses={fetchedCourses.layoutCourses.slice(0, 5)} />
      {/* <DisplayCourses AllCourses={featuredCourses.slice(0, 5)} /> */}
    </section>
  );
};

export default FeaturedCourses;
