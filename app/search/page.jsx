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
  const searchCtx = useContext(SearchContext);

  let checkedArray = [];
  let matchingCoursesIds = [];
  let displayedCourses = [];

  const [filter, setFilter] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredCoursesIds, setFilteredCoursesIds] = useState([]);
  let uniqueCoursesIds = [...new Set(filteredCoursesIds)];

  // Update filter state when searchInput changes
  const handleInputChange = (searchInput) => {
    setFilter(searchInput);
  };

  /*
  RATING HANDLER
*/
  const handleRating = (rateValue) => {
    // console.log(rateValue);
    const filteredRateCourses = courses.filter(
      (course) => course.rate <= rateValue
    );
    // console.log(filteredRateCourses);
    setFilteredCourses(filteredRateCourses);
  };

  /* 
  CHECKED ARRAY HANDLER
  */
  const handleCheckedArray = (categoriesCheckedArray, targetKey) => {
    const arrayToBeUsed =
      displayedCourses.length === 0 ? courses : displayedCourses;
    arrayToBeUsed.forEach((course) => {
      if (categoriesCheckedArray.includes(course[targetKey].toLowerCase())) {
        matchingCoursesIds.push(course.id);
      }
    });
    checkedArray =
      ([...checkedArray],
      arrayToBeUsed.filter((course) => matchingCoursesIds.includes(course.id)));
    // arrayToBeUsed.filter((course) => filteredCoursesIds.includes(course.id)));
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

  // useEffect(() => {
  //   setFilteredCoursesIds(prevFilteredCoursesIds => [...new Set(prevFilteredCoursesIds)]);
  // }, [filteredCoursesIds]);

  return (
    <main className="home-container">
      <SearchContext.Provider
        value={{ filteredCoursesIds, setFilteredCoursesIds }}
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
