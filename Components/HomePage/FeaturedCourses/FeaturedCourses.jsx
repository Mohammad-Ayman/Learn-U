"use client";
import React, { useState, useEffect } from "react";
import DisplayCourses from "./DisplayCourses";
import styles from "./styles/featuredCourses.module.css";
import { fetchLimitedCourses } from "@/Components/Fetching/fetching";
import LoadingPage from "@/Components/UI/LoadingPage";

const FeaturedCourses = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        const courses = await fetchLimitedCourses(5);
        setFeaturedCourses(courses);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);
  return (
    <section className={styles["features-container"]}>
      <h2 className="header-text">Featured Courses</h2>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <DisplayCourses AllCourses={featuredCourses} />
      )}
    </section>
  );
};

export default FeaturedCourses;
