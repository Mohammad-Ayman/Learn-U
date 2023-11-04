"use client";
import { useState, useContext } from "react";
import AuthContext from "@/store/AuthContext";
import { addToSavedCourses } from "@/Components/Fetching/fetching";
import Image from "next/image";
import styles from "./styles/myLearningElement.module.css";

const MyLearningElement = (props) => {
  const [saved, setSaved] = useState(false);
  const authContext = useContext(AuthContext);
  return (
    <li
      className={`${styles["myLearning-card"]} mflex`}
      data-courseid={props.id}
    >
      <div className={styles["image-container"]}>
        {/* <img src={props.image} /> */}
        <Image
          src={props.image}
          width={1000}
          height={1000}
          alt="Picture of the author"
        />
      </div>
      <div className={`${styles.text} mflex`}>
        <div style={{ width: "100%", height: "100%" }}>
          <div className={`${styles["course"]} mflex`}>
            <h2>{props.name} </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              onClick={() => {
                addToSavedCourses(authContext.userId, props._id, setSaved);
              }}
              className={`${styles.icon} ${saved ? styles["active-icon"] : ""}`}
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className={styles["author-name"]}>{props.author} </h3>
        </div>
        {props.children}
      </div>
    </li>
  );
};

export default MyLearningElement;
