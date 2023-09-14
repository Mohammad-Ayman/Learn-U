import { styled } from "styled-components";
import styles from "./styles/featuredCourses.module.css";
import CourseElement from "./FeaturedCourseElement";

const DisplayCourses = (props) => {

  
  return (
    <ul className={`${styles["cards-container"]} mflex`}>
      {props.AllCourses.map((course) => (
        <CourseElement
          key={course.id}
          id={course.id}
          name={course.name}
          image={course.image}
          duration={course.duration}
          rate={course.rate}
          price={course.price}
        />
      ))}
    </ul>
  );
};

export default DisplayCourses;
