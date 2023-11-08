
const NoCoursesFoundMessage = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        No courses found.
      </p>
      <p style={{ fontSize: "1.5rem" }}>
        {props.message} courses to find them here.
      </p>
    </div>
  );
};

export default NoCoursesFoundMessage;
