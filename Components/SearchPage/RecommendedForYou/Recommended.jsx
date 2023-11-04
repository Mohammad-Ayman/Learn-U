"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles/recommended.module.css";

const Recommended = (props) => {
  const router = useRouter();
  const reviewBtnHandler = (e) => {
    const courseId = e.target.closest("div").getAttribute("data-courseid");
    const coursePageUrl = `/courses/${courseId}`;
    console.log(coursePageUrl);
    router.push(coursePageUrl);
    // }
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
            {/* <img
              className={styles["course-image"]}
              src={course.image}
              alt="Picture of the author"
            /> */}
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

  //   return (
  //     <section className="max-w-full  h-1/2 pt-10 p-x-5">
  //       <h3 className="text-slate-800 text-xl font-bold">RECOMMENDED FOR YOU</h3>
  //       <div
  //         className="flex flex-row flex-wrap gap-6 p-3 ml-2"
  //         onClick={reviewBtnHandler}
  //       >
  //         {props.filteredCoursesProp.map((course) => (
  //           <div
  //             className="cursor-pointer hover:outline hover:outline-2 hover:outline-blue-600 mt-5 rounded-2xl"
  //             key={course.id}
  //             data-coureseid={course.id}
  //           >
  //             <img
  //               className="object-fill w-72 h-60 rounded-xl"
  //               src={course.image}
  //               alt="Picture of the author"
  //             />

  //             <h2 className="text-black font-bold text-xl pl-2 mt-3">
  //               {course.name}
  //             </h2>
  //             <p className="text-gray-500 text-sm pl-2">{course.author}</p>
  //           </div>
  //         ))}
  //       </div>
  //     </section>
  //   );
};

export default Recommended;
