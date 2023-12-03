import Link from "next/link";
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
      className={`home-container `}
    >
      <p style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        No courses found.
      </p>
      <Link
        href="/search"
        style={{ fontSize: "1.5rem", textDecoration: "underline" }}
      >
        {props.message} courses to find them here.
      </Link>
    </div>
  );
};

export default NoCoursesFoundMessage;
