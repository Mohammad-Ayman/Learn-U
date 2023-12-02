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
  addToMyLearningCourses,
} from "@/Components/Fetching/fetching";
import LoadingPage from "@/Components/UI/LoadingPage";
import styles from "../courses/coursePage.module.css";

// const CoursePreview = dynamic (() => {
//   import("@/Components/Courses/Course/CoursePreview")
// });

// const MyLearningCourses = dynamic (() => {
//   import("@/Components/Courses/MyLearning/MyLearningCourses")
// });

const SavedCourses = () => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const firebase = isLocalStorageAvailable
    ? JSON.parse(
        localStorage.getItem(
          "firebase:authUser:AIzaSyAnZT6PINdbCDR7mfYMbdJS_fBv3nOadEQ:[DEFAULT]"
        )
      )
    : null;
  if (!firebase) redirect("/signin");

  const [isLoading, setIsLoading] = useState(false);
  const [displayCourse, setDisplayCourse] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchAllCourses = async () => {
      const userSavedCourses = await fetchUserSavedCourses(firebase.uid);
      const courses = await fetchCourses();
      const updatedCourses = [];
      courses.map((course) => {
        if (userSavedCourses.savedCourses.includes(course._id))
          userSavedCourses.myLearning.includes(course._id)
            ? updatedCourses.push({
                saved: true,
                ...course,
                message: "CONTINUE LEARNING",
              })
            : updatedCourses.push({
                saved: true,
                ...course,
                message: "BUY NOW",
              });
      });
      setAllCourses(updatedCourses);
      setDisplayCourse(updatedCourses[0]);
      setIsLoading(false);
    };

    fetchAllCourses();
  }, []);
  const renderClickedCourse = (courseName) => {
    const clickedCourseIndex = allCourses.indexOf(courseName);
    setDisplayCourse(allCourses[clickedCourseIndex]);
  };

  return isLoading ? (
    <LoadingPage />
  ) : allCourses.length === 0 ? (
    <NoCoursesFoundMessage message={"Save"} />
  ) : (
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
        onClick={async () => {
          addToMyLearningCourses(firebase.uid, displayCourse._id);
        }}
        reviewBtn={"PREVIEW"}
        actionBtn={displayCourse.message}
      />
    </main>
  );
};

export default SavedCourses;
