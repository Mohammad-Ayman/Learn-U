"use client";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import MyLearningCourses from "@/Components/Courses/MyLearning/MyLearningCourses";
import NoCoursesFoundMessage from "@/Components/UI/NoCoursesFoundMessage";
import {
  fetchCourses,
  fetchUserSavedCourses,
} from "@/Components/Fetching/fetching";
import LoadingPage from "@/Components/UI/LoadingPage";
import styles from "./coursePage.module.css";
import { auth } from "@/firebase";

// const NoCoursesFoundMessage = dynamic (() => {
//   import("@/Components/UI/NoCoursesFoundMessage")
// });

const Courses = () => {
  if (!auth?.currentUser?.uid) redirect("/signin");

  const [isLoading, setIsLoading] = useState(false);
  const [displayCourse, setDisplayCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchAllCourses = async () => {
      // console.log("NOT from cached courses")
      const userSavedCourses = await fetchUserSavedCourses(
        auth?.currentUser?.uid
      );
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
      sessionStorage.setItem(
        "cachedUserId",
        JSON.stringify(auth?.currentUser?.uid)
      );
      //Update states
      setAllCourses(updatedCourses);
      setDisplayCourse(updatedCourses[0]);
      setIsLoading(false);
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

  return isLoading ? (
    <LoadingPage />
  ) : allCourses.length === 0 ? (
    <NoCoursesFoundMessage message={"Enroll into"} />
  ) : (
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
