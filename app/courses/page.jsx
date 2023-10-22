"use client";
import { useState, useContext } from "react";
import { courses } from "@/app/page";
import FetchedCourses from "@/store/FetchedCourses";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import MyLearningCourses from "@/Components/Courses/MyLearning/MyLearningCourses";
import styles from "./coursePage.module.css";

const Courses = (props) => {
  const [displayCourse, setDisplayCourse] = useState(courses[0]);
  const renderClickedCourse = (courseName) => {
    const clickedCourseIndex = courses.indexOf(courseName);
    setDisplayCourse(courses[clickedCourseIndex]);
  };

  const fetchedCourses = useContext(FetchedCourses);
  return (
    <main
      className={`home-container grid-2 ${styles["home-container__courses"]}`}
    >
      <MyLearningCourses
        header={"My Learning"}
        // coursesSource={courses}
        // courses={courses /*.slice(0, 4)*/}
        coursesSource={fetchedCourses.layoutCourses}
        courses={fetchedCourses.layoutCourses.slice(0, 4)}
        getClickedCourseName={renderClickedCourse}
      />
      <CoursePreview
        displayedCourse={displayCourse}
        coursesSource={courses}
        reviewBtn={"REVIEW COURSE"}
        actionBtn={"CONTINUE LEARNING"}
      />
    </main>
  );
};

export default Courses;
