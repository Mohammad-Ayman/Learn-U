import Progress from "@/Components/UI/Progress";
import MyLearningElement from "./MyLearningElement";
import Button from "@/Components/UI/Button";

const DisplayMyLearning = (props) => {
  return props.AllCourses.map((course) => {
    return (
      <MyLearningElement
        onClick={() => console.log("Course Clicked")}
        key={course.id}
        id={course.id}
        _id={course._id}
        name={course.name}
        image={course.image}
        author={course.author}
        saved={course.saved}
      >
        {props.isButton ? (
          <Button>BUY</Button>
        ) : (
          <Progress value={course.value} />
        )}
      </MyLearningElement>
    );
  });
};

export default DisplayMyLearning;
