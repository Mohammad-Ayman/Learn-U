"use client";
import { useState, useEffect } from "react";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import CourseContent from "@/Components/CourseContent/CourseContent";
import {
  fetchCourseByDocumentId,
  addToMyLearningCourses,
} from "@/Components/Fetching/fetching";
import LoadingPage from "@/Components/UI/LoadingPage";
import styles from "../../courses/coursePage.module.css";

const CoursePreviews = ({ params }) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const firebase = isLocalStorageAvailable
    ? JSON.parse(
        localStorage.getItem(
          "firebase:authUser:AIzaSyAnZT6PINdbCDR7mfYMbdJS_fBv3nOadEQ:[DEFAULT]"
        )
      )
    : null;
  // const router = useRouter();
  const { displayCourse } = params;
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      const course = await fetchCourseByDocumentId(displayCourse);
      setCourseData(course);
    };

    fetchCourseData();
  }, [displayCourse]);

  return courseData ? (
    <main
      className={`home-container grid-2 ${styles["home-container__courses"]}`}
    >
      <CoursePreview displayedCourse={courseData} actionButton={true} />
      <CourseContent
        displayedCourseContent={courseData.content}
        onClick={() => {
          addToMyLearningCourses(firebase.uid, displayCourse);
        }}
      />
    </main>
  ) : (
    <LoadingPage />
  );
};

export default CoursePreviews;
