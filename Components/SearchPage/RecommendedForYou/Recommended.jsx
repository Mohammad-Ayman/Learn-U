"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles/recommended.module.css";

const Recommended = (props) => {
  const router = useRouter();
  const reviewBtnHandler = (e) => {
    const courseId = e.target.closest("div").getAttribute("data-courseid");
    const coursePageUrl = `/courses/${courseId}`;
    courseId ? router.push(coursePageUrl): '';
    
  };
  return (
    <section className={styles["recommended-container"]}>
      <h3 className={styles["section-title"]}>RECOMMENDED FOR YOU</h3>
      <div className={styles["course-container"]} onClick={reviewBtnHandler}>
        {props.filteredCoursesProp.map((course) => (
          <div
            className={styles["course-card"]}
            key={course.id}
            data-courseid={course._id}
          >
            <Image
              className={styles["course-image"]}
              src={course.image}
              width={1770}
              height={1180}
              alt="Course Image"
              priority
            />
            <h2 className={styles["course-title"]}>{course.name}</h2>
            <p className={styles["course-author"]}>{course.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommended;
