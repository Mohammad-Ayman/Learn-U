"use client";
import TopSearches from "@/components/SearchPage/TopSearches/TopSearches";
import CategoriesSearchPage from "@/components/SearchPage/CategoriesSearchPage/categoriesSearchPage";
import SearchBar from "@/components/SearchPage/FindYourFav/SearchBar";
import RatingLevel from "@/components/SearchPage/RatingLevel/RatingLevel";
import Recommended from "@/components/SearchPage/RecommendedForYou/Recommended";

import SearchContext from "@/store/search-context";

import { useState, useEffect } from "react";
import { courses } from "@/app/page";

const Search = () => {
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
  const filterSearchBar = () => {
    const filteredCourses = courses.filter(
      (course) =>
        course.category.toLowerCase().includes(filter.toLowerCase()) ||
        course.name.toLowerCase().includes(filter.toLowerCase()) ||
        course.description.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredCourses(filteredCourses);
  };
  useEffect(() => {
    filterSearchBar();
  }, [filter]);

  const updateFilterOptions = (filterKey, updatedOptions) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [filterKey]: updatedOptions,
    }));
  };
  const applyFilterOptions = () => {
    let filteredOptionsCourses = courses.filter((course) => {
      const categoryMatch = filterOptions.category
        ? filterOptions.category.length === 0 ||
          filterOptions.category.includes(course.category.toLowerCase())
        : course;
      const levelMatch = filterOptions.level
        ? filterOptions.level.length === 0 ||
          filterOptions.level.includes(course.level.toLowerCase())
        : course;
      const rateMatch = +course.rate <= (+filterOptions.rate || 5);

      return categoryMatch && levelMatch && rateMatch;
    });

    // Set the state with the filtered courses
    setFilteredCourses(filteredOptionsCourses);

    console.log("filteredOptionsCourses", filteredOptionsCourses);
  };
  useEffect(() => {
    applyFilterOptions();
  }, [filterOptions]);

  return (
    <main className="home-container">
      <SearchContext.Provider value={{ updateFilterOptions }}>
        <SearchBar onChange={handleInputChange} />
        <TopSearches onClick={handleInputChange} />
        <CategoriesSearchPage />
        <RatingLevel />
        <Recommended filteredCoursesProp={filteredCourses} />
      </SearchContext.Provider>
    </main>
  );
};

export default Search;
