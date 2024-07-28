import Accordion from "../UI/accordion/Accordion";
import ChapterElement from "./ChapterElement";
import DisplayLessonElements from "./DisplayLessonElements";

import styles from "./styles/courseContent.module.css";

const DisplayChapterElements = (props) => {
  return props.course.map((chapter) => {
    return (
      <li style={{ marginBottom: "1rem" }} key={chapter.name}>
        <Accordion>
          <Accordion.Item
            id={chapter.name}
            className={styles["chapter__container"]}
          >
            <Accordion.Title>
              <ChapterElement name={chapter.name} video={chapter.videos} />
            </Accordion.Title>
            <Accordion.Content>
              <DisplayLessonElements />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </li>
    );
  });
};

export default DisplayChapterElements;
