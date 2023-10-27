"use client";
import React, { useState, useEffect } from "react";
import DisplayCourses from "./DisplayCourses";
import styles from "./styles/featuredCourses.module.css";
import { fetchLimitedCourses } from "@/Components/Fetching/fetching";
import { courses } from "@/app/page";

const FeaturedCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      const courses = await fetchLimitedCourses(5);
      setFeaturedCourses(courses);
    };

    fetchFeaturedCourses();
  }, []);
  return (
    <section className={styles["features-container"]}>
      <h2 className="header-text">Featured Courses</h2>
      <DisplayCourses AllCourses={featuredCourses} />
    </section>
  );
};

export default FeaturedCourses;
