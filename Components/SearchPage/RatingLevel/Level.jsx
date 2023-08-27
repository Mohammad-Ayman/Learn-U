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
    setLevelsChecked((prevCheckedCategories) => {
      const updatedCategories = isChecked // Get list of updated categories
        ? [...prevCheckedCategories, categoryId]
        : prevCheckedCategories.filter((id) => id !== categoryId);

      searchCtx.updateFilterOptions("level", updatedCategories);
      props.levelsCheckedArray(updatedCategories, "level");

      return updatedCategories;
    });
  };
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
