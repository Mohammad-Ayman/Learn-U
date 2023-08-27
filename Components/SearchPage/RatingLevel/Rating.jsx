"use client";
import styles from "./styles/rating.module.css";
import * as React from "react";
import Rating from "@mui/material/Rating";

import { useState, useContext } from "react";
import SearchContext from "@/store/search-context";

const Rate = (props) => {
  const [value, setValue] = useState(0);
  const searchCtx = useContext(SearchContext);

  return (
    <section>
      <h2 className={styles.header}>RATING</h2>
      <Rating
        style={{ color: "rgb(46 141 255)", fontSize: "3.3rem" }}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          searchCtx.updateFilterOptions("rate", newValue);
          props.rateValueProp(newValue);
        }}
      ></Rating>
    </section>
  );
};

export default Rate;
