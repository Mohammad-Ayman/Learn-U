"use client";
import { redirect } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import MyLearningCourses from "@/Components/Courses/MyLearning/MyLearningCourses";
import {
  fetchCourses,
  fetchUserSavedCourses,
} from "@/Components/Fetching/fetching";
import AuthContext from "@/store/AuthContext";
import styles from "./coursePage.module.css";

const Courses = () => {
  const context = useContext(AuthContext);
  if (!context.isLoggedIn) redirect("/signin");

  const [displayCourse, setDisplayCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    const fetchAllCourses = async () => {
      // console.log("NOT from cached courses")
      const userSavedCourses = await fetchUserSavedCourses(context.userId);
      const courses = await fetchCourses();
      const updatedCourses = [];
      courses.map((course) => {
        if (userSavedCourses.myLearning.includes(course._id)) {
          userSavedCourses.savedCourses.includes(course._id)
            ? (course = { saved: true, ...course })
            : (course = { saved: false, ...course });
          updatedCourses.push(course);
        }
      });
      //Cache data to session storage
      sessionStorage.setItem("updatedCourses", JSON.stringify(updatedCourses));
      sessionStorage.setItem("cachedUserId", JSON.stringify(context.userId));
      //Update states
      setAllCourses(updatedCourses);
      setDisplayCourse(updatedCourses[0]);
    };
    const cachedCourses = sessionStorage.getItem("updatedCourses");
    const cachedUserId = sessionStorage.getItem("cachedUserId");

    // if (cachedCourses) {
    //   console.log("from cached courses")
    //   // Parse the stored data
    //   const updatedCourses = JSON.parse(cachedCourses);
    //   setAllCourses(updatedCourses);
    //   setDisplayCourse(updatedCourses[0]);
    // } else {
    // }
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
