"use client";
import { useState, useContext, useEffect } from "react";
import { courses } from "@/app/page";
import FetchedCourses from "@/store/FetchedCourses";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import MyLearningCourses from "@/Components/Courses/MyLearning/MyLearningCourses";
import { fetchCourses } from "@/Components/Fetching/fetching";
import styles from "./coursePage.module.css";

const Courses = (props) => {
  const [displayCourse, setDisplayCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    const fetchAllCourses = async () => {
      const courses = await fetchCourses();
      setAllCourses(courses);
      setDisplayCourse(courses[0]);
    };

    fetchAllCourses();
  }, []);
  const renderClickedCourse = (courseName) => {
    const clickedCourseIndex = allCourses.indexOf(courseName);
    setDisplayCourse(allCourses[clickedCourseIndex]);
  };

  const fetchedCourses = useContext(FetchedCourses);
  return (
    <main
      className={`home-container grid-2 ${styles["home-container__courses"]}`}
    >
      <MyLearningCourses
        header={"My Learning"}
        coursesSource={allCourses}
        courses={allCourses}
        getClickedCourseName={renderClickedCourse}
      />
      <CoursePreview
        displayedCourse={displayCourse}
        coursesSource={allCourses}
        reviewBtn={"REVIEW COURSE"}
        actionBtn={"CONTINUE LEARNING"}
      />
    </main>
  );
};

export default Courses;
