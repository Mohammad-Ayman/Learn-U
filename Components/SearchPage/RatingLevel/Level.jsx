"use client";
import { useState, useContext, useEffect } from "react";
import SearchContext from "@/store/search-context";

import styles from "./styles/level.module.css";
import { courses } from "@/app/page";
let category = [
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "professional", name: "Professional" },
];

const Level = (props) => {
  let coursesIds = [];
  const [levelsChecked, setLevelsChecked] = useState([]);
  const searchCtx = useContext(SearchContext);

  // Function to handle checkbox change
  const handleCheckboxChange = (event, categoryId) => {
    const isChecked = event.target.checked;
    // const arrayToBeUsed =
    //   searchCtx.filteredCoursesIds.length === 0
    //     ? courses
    //     : courses.filter((course) => {
    //         searchCtx.filteredCoursesIds.includes(course.id);
    //       });
    setLevelsChecked((prevCheckedCategories) => {
      const updatedCategories = isChecked // Get list of updated categories
        ? [...prevCheckedCategories, categoryId]
        : prevCheckedCategories.filter((id) => id !== categoryId);

      console.log("Updated filteredCoursesIds:", searchCtx.filteredCoursesIds);
      // console.log("Array to be used:", arrayToBeUsed);

      // Get filter courses ids according to updated categories
      const filteredCourseIds = courses
        .filter((course) =>
          updatedCategories.includes(course.level.toLowerCase())
        )
        .map((course) => course.id);

      searchCtx.setFilteredCoursesIds(
        isChecked
          ? (prevFilteredCourseIds) => [
              ...new Set([...prevFilteredCourseIds, ...filteredCourseIds]),
            ]
          : filteredCourseIds.filter((id) => id !== categoryId)
      );

      props.levelsCheckedArray(updatedCategories, "level");

      return updatedCategories;
    });
  };
  useEffect(() => {
    // console.log(searchCtx.filteredCoursesIds);
  }, [searchCtx.filteredCoursesIds]);
  return (
    <section>
      <h2 className={styles.header}>LEVEL</h2>
      <ul>
        {category.map((category) => (
          <li className={styles.category} key={category.id}>
            <input
              type="checkbox"
              className={styles.checkbox}
              id={category.id}
              checked={levelsChecked.includes(category.id)}
              onChange={(event) => handleCheckboxChange(event, category.id)}
            />
            <label htmlFor={category.id}>{category.name}</label>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Level;
