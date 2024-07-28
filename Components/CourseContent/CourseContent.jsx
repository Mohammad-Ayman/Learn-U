"use client";
import DisplayChapterElements from "./DisplayChapterElements";
import ActionButton from "../UI/ActionButton";
import styles from "./styles/courseContent.module.css";
import { addToSavedCourses } from "../Fetching/fetching";
import { toast } from "sonner";
import { useState } from "react";
import { auth } from "@/firebase";

const CourseContent = (props) => {
  const [saved, setSaved] = useState(props.saved);

  const handleAddToSavedCourses = async (courseId, setSaved) => {
    try {
      await addToSavedCourses(auth.currentUser.uid, courseId, setSaved);
      if (!saved) toast.success("Course Saved Successfully.");
      else toast("Course Unsaved Successfully.");
    } catch (error) {
      toast.error("Error Saving Course.");
      console.error(error);
    }
  };

  return (
    <section className={`${styles["content__container"]} flex`}>
      <ul className={styles["container"]}>
        <div className={`${styles["course"]} mflex`}>
          <h2 className="header-text">Course Overview</h2>
          {auth.currentUser && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={() => {
                handleAddToSavedCourses(props.courseId, setSaved);
              }}
              className={`${styles.icon} ${saved ? styles["active-icon"] : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <DisplayChapterElements
          key={props.displayedCourseContent.name}
          course={props.displayedCourseContent}
        />
      </ul>
      <ActionButton
        action={props.courseBought ? "Remove Course" : "BUY NOW"}
        onClick={props.onClick}
      />
    </section>
  );
};

export default CourseContent;
