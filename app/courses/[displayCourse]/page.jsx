"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import CourseContent from "@/Components/CourseContent/CourseContent";
import { fetchCourseByDocumentId } from "@/Components/Fetching/fetching";
import styles from "../../courses/coursePage.module.css";

const CoursePreviews = ({ params }) => {
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

  return (
    <main
      className={`home-container grid-2 ${styles["home-container__courses"]}`}
    >
      {courseData ? (
        <>
          <CoursePreview displayedCourse={courseData} actionButton={true} />
          <CourseContent displayedCourseContent={courseData.content} />
        </>
      ) : (
        <div className={styles["centered-loading"]}>
          <p>Loading...</p>
        </div>
      )}
    </main>
  );
};

export default CoursePreviews;
