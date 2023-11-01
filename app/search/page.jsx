"use client";
import TopSearches from "@/Components/SearchPage/TopSearches/TopSearches";
import CategoriesSearchPage from "@/Components/SearchPage/CategoriesSearchPage/categoriesSearchPage";
import SearchBar from "@/Components/SearchPage/FindYourFav/SearchBar";
import RatingLevel from "@/Components/SearchPage/RatingLevel/RatingLevel";
import Recommended from "@/Components/SearchPage/RecommendedForYou/Recommended";

import SearchContext from "@/store/search-context";

import { useState, useEffect, useContext } from "react";
import { fetchCourses } from "@/Components/Fetching/fetching";

const Search = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  useEffect(() => {
    const fetchAllCourses = async () => {
      const courses = await fetchCourses();
      setAllCourses(courses);
      setFilteredCourses(courses);
    };

    fetchAllCourses();
  }, []);

  const [filter, setFilter] = useState("");
  const [filterOptions, setFilterOptions] = useState([
    {
      category: [],
      level: [],
      rate: 5,
    },
  ]);

  // Update filter state when searchInput changes
  const handleInputChange = (searchInput) => {
    setFilter(searchInput);
  };
  const filterSearchBar = () => {
    const filteredCourses = allCourses.filter(
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
    let filteredOptionsCourses = allCourses.filter((course) => {
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
        <Recommended
          filteredCoursesProp={filteredCourses}
          allData={allCourses}
        />
      </SearchContext.Provider>
    </main>
  );
};

export default Search;
