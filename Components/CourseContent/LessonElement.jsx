import React from "react";
import styles from "./styles/lessonContent.module.css";

const LessonElement = (props) => {
  return (
    <li className={styles["lesson__container"]}>
      <div className={styles["lesson-completion__container"]}>
        <input
          type="checkbox"
          checked={props.completed}
          onChange={props.onToggleComplete}
        />
      </div>
      <div className={styles["lesson-content__container"]}>
        <h3>{props.title}</h3>
        <p>{props.time}</p>
      </div>
    </li>
  );
};

export default LessonElement;
