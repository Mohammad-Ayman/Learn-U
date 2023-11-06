import DisplayMyLearning from "@/Components/HomePage/MyLearning/DisplayMyLearning";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Link from "next/link";
import Styles from "./styles/MyLearningCourses.module.css";

const MyLearningCourses = (props) => {
  const getClickedCourse = (event) => {
    const liExist = event.target.closest("li");

    if (liExist !== null) {
      const clickedCourseID = event.target
        .closest("li")
        .getAttribute("data-courseid");

      props.coursesSource.some((course) => {
        if (course.id == clickedCourseID) {
          props.getClickedCourseName(course);
        }
      });
    } else return;
  };

  return (
    <section style={{ paddingTop: "3rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2 className="header-text">{props.header}</h2>
        <Link
          href="/statistics"
          className={Styles.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={Styles.statistics}>
            <EqualizerIcon style={{ fontSize: "2.5rem" }} />
            Statistics
          </h2>
        </Link>
      </div>
      <ul onClick={getClickedCourse} className={Styles.coursesList}>
        <DisplayMyLearning
          AllCourses={props.courses}
          isButton={props.isButton}
        ></DisplayMyLearning>
      </ul>
    </section>
  );
};

export default MyLearningCourses;
