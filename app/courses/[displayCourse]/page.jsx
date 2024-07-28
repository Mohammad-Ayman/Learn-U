"use client";
import { useState, useEffect } from "react";
import CoursePreview from "@/Components/Courses/Course/CoursePreview";
import CourseContent from "@/Components/CourseContent/CourseContent";
import {
  fetchCourseByDocumentId,
  addToMyLearningCourses,
  isCourseSaved,
  isCourseInMyLearning,
  removeFromMyLearningCourses,
} from "@/Components/Fetching/fetching";
import LoadingPage from "@/Components/UI/LoadingPage";
import styles from "../../courses/coursePage.module.css";
import { toast } from "sonner";
import { auth } from "@/firebase";

const CoursePreviews = ({ params }) => {
  const { displayCourse } = params;
  const [courseData, setCourseData] = useState(null);
  const [saved, setSaved] = useState(false);
  const [courseBought, setCourseBought] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const course = await fetchCourseByDocumentId(displayCourse);
        setCourseData(course);
      } catch (error) {
        toast.error("Error displaying courses.");
        console.error(error);
      }
    };

    fetchCourseData();
  }, [displayCourse]);

  useEffect(() => {
    const checkIfCourseSaved = async () => {
      try {
        const courseSaved = await isCourseSaved(
          auth?.currentUser?.uid,
          displayCourse
        );
        setSaved(courseSaved);
      } catch (error) {
        console.error("Error checking if course is saved.", error);
      }
    };
    checkIfCourseSaved();
  }, [displayCourse, auth?.currentUser?.uid]);

  useEffect(() => {
    const checkIfCourseBought = async () => {
      try {
        const isBought = await isCourseInMyLearning(
          auth?.currentUser?.uid,
          displayCourse
        );
        setCourseBought(isBought);
      } catch (error) {
        console.error("Error checking if course is bought.", error);
      }
    };
    checkIfCourseBought();
  }, [displayCourse, auth?.currentUser?.uid]);

  const handleAddToMyLearningCourses = async (uid, course) => {
    try {
      if (courseBought) {
        await removeFromMyLearningCourses(uid, course);
        setCourseBought(false);
        toast.success("Course removed from My Learning.");
      } else {
        await addToMyLearningCourses(uid, course);
        setCourseBought(true);
        toast.success("Course added to My Learning.");
      }
    } catch (error) {
      toast.error("Error updating course in My Learning.");
      console.error(error);
    }
  };

  return courseData ? (
    <main
      className={`home-container grid-2 ${styles["home-container__courses"]}`}
    >
      <CoursePreview displayedCourse={courseData} actionButton={true} />
      <CourseContent
        displayedCourseContent={courseData.content}
        courseId={displayCourse}
        onClick={() =>
          handleAddToMyLearningCourses(auth?.currentUser?.uid, displayCourse)
        }
        saved={saved}
        courseBought={courseBought}
        key={saved + courseBought}
      />
    </main>
  ) : (
    <LoadingPage />
  );
};

export default CoursePreviews;
