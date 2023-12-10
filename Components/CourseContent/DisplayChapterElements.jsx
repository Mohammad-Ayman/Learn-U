import ChapterElement from "./ChapterElement";

const DisplayChapterElements = (props) => {
  return props.course.map((chapter) => {
    return (
      <li style={{ marginBottom: "1rem" }} key={chapter.name}>
        {/* <details> */}
        <ChapterElement name={chapter.name} video={chapter.videos} />
        {/* </details> */}
      </li>
    );
  });
};

export default DisplayChapterElements;
