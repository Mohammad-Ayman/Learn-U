"use client";
import TopSearches from "@/components/SearchPage/TopSearches/TopSearches";
import CategoriesSearchPage from "@/components/SearchPage/CategoriesSearchPage/categoriesSearchPage";
import SearchBar from "@/components/SearchPage/FindYourFav/SearchBar";
import RatingLevel from "@/components/SearchPage/RatingLevel/RatingLevel";
import Recommended from "@/components/SearchPage/RecommendedForYou/Recommended";

import SearchContext from "@/store/search-context";

import { useState, useEffect, useContext } from "react";
import { courses } from "@/app/page";

const Search = () => {
  // const searchCtx = useContext(SearchContext);
  // const [filteredCoursesIds, setFilteredCoursesIds] = useState([]);

  let checkedArray = [];
  let matchingCoursesIds = [];
  const [filterOptions, setFilterOptions] = useState([
    {
      category: [],
      level: [],
      rate: 5,
    },
  ]);

  const [filter, setFilter] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Update filter state when searchInput changes
  const handleInputChange = (searchInput) => {
    setFilter(searchInput);
  };

  /*
  RATING HANDLER
*/
  const handleRating = (rateValue) => {
    const filteredRateCourses = courses.filter(
      (course) => course.rate <= rateValue
    );
    setFilteredCourses(filteredRateCourses);
  };

  /* 
  CHECKED ARRAY HANDLER
  */
  const handleCheckedArray = (categoriesCheckedArray, targetKey) => {
    courses.forEach((course) => {
      if (categoriesCheckedArray.includes(course[targetKey].toLowerCase())) {
        matchingCoursesIds.push(course.id);
      }
    });
    checkedArray =
      ([...checkedArray],
      courses.filter((course) => matchingCoursesIds.includes(course.id)));
    setFilteredCourses([...checkedArray]);
  };

  useEffect(() => {
    const filteredCourses = courses.filter(
      (course) =>
        course.category.toLowerCase().includes(filter.toLowerCase()) ||
        course.name.toLowerCase().includes(filter.toLowerCase()) ||
        course.description.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  }, [filter]);

  const updateFilterOptions = (filterKey, updatedOptions) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filterKey]: updatedOptions,
    }));
  };
  const test = () => {
    let cat = [
      {
        category: [],
        level: ["intermediate"],
        rate: 5,
      },
    ];
    let filteredOptionsCourses = courses.filter((course) => {
      const categoryMatch =
        cat[0].category.length === 0 ||
        cat[0].category.includes(course.category.toLowerCase());
      const levelMatch =
        cat[0].level.length === 0 ||
        cat[0].level.includes(course.level.toLowerCase());
      const rateMatch = course.rate <= cat[0].rate;

      return categoryMatch && levelMatch && rateMatch;
    });

    console.log("filteredOptionsCourses", filteredOptionsCourses);
    return filteredOptionsCourses;
  };

  useEffect(() => {
    console.log(filterOptions);

    let filteredOptionsCourses = courses.filter((course) => {
      const categoryMatch =
        filterOptions[0].category.length === 0 ||
        filterOptions[0].category.includes(course.category.toLowerCase());
      const levelMatch =
        filterOptions[0].level.length === 0 ||
        filterOptions[0].level.includes(course.level.toLowerCase());
      const rateMatch = course.rate <= filterOptions[0].rate;

      return categoryMatch && levelMatch && rateMatch;
    });

    // Set the state with the filtered courses
    // setFilteredCourses(filteredOptionsCourses);

    console.log("filteredOptionsCourses", filteredOptionsCourses);
  }, [filterOptions]);

  return (
    <main className="home-container">
      <SearchContext.Provider
        value={{ filterOptions, setFilterOptions, updateFilterOptions }}
      >
        <SearchBar onChange={handleInputChange} />
        <TopSearches onClick={handleInputChange} />
        <CategoriesSearchPage categoriesCheckedArray={handleCheckedArray} />
        <RatingLevel
          levelsCheckedArray={handleCheckedArray}
          rateValueProp={handleRating}
        />
        <Recommended filteredCoursesProp={filteredCourses} />
      </SearchContext.Provider>
    </main>
  );
};

export default Search;
