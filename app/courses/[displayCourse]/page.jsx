"use client";
import { useState, useEffect, useContext } from "react";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import CourseContent from "@/Components/CourseContent/CourseContent";
import {
  fetchCourseByDocumentId,
  addToMyLearningCourses,
} from "@/Components/Fetching/fetching";
import AuthContext from "@/store/AuthContext";
import LoadingPage from "@/Components/UI/LoadingPage";
import styles from "../../courses/coursePage.module.css";

const CoursePreviews = ({ params }) => {
  // const router = useRouter();
  const { displayCourse } = params;
  const authCtx = useContext(AuthContext);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      const course = await fetchCourseByDocumentId(displayCourse);
      setCourseData(course);
    };

    fetchCourseData();
  }, [displayCourse]);

  return (
    courseData ? (
      <main className={`home-container grid-2 ${styles["home-container__courses"]}`}>
          <CoursePreview displayedCourse={courseData} actionButton={true} />
          <CourseContent
            displayedCourseContent={courseData.content}
            onClick={() => {
              addToMyLearningCourses(authCtx.userId, displayCourse);
            }}
          />
      </main>
    ) : (
      <LoadingPage/>
    )
    
  );
};

export default CoursePreviews;
