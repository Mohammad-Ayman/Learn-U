"use client";
import { redirect } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import MyLearningCourses from "@/Components/Courses/MyLearning/MyLearningCourses";
import { fetchCourses } from "@/Components/Fetching/fetching";
import AuthContext from "@/store/AuthContext";
import styles from "../courses/coursePage.module.css";

const SavedCourses = () => {
  const context = useContext(AuthContext);
  if (!context.isLoggedIn) redirect("/signin");

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

  return (
    <main
      className={`home-container grid-2 ${styles["home-container__courses"]}`}
    >
      <MyLearningCourses
        header={"Saved Courses"}
        coursesSource={allCourses}
        courses={allCourses}
        isButton={true}
        getClickedCourseName={renderClickedCourse}
      />
      <CoursePreview
        displayedCourse={displayCourse}
        coursesSource={allCourses}
        reviewBtn={"PREVIEW"}
        actionBtn={"BUY NOW"}
      />
    </main>
  );
};

export default SavedCourses;
