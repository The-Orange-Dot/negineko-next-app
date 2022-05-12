import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/travel.module.css";
import Fuse from "fuse.js";

const SearchBar = ({ data, setLocations }) => {
  const [searchInput, setSearchInput] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const keyWordOptions = {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "caption", weight: 0.4 },
      { name: "description", weight: 0.1 },
    ],
    shouldSort: true,
    threshold: 0.3,
  };

  const locationOptions = {
    keys: [
      { name: "prefecture", weight: 1 },
      { name: "city", weight: 1 },
    ],
    shouldSort: true,
    threshold: 0.3,
  };

  const searchHandler = (results) => {
    setLocations(results);
  };

  const locationFilterHandler = async (search) => {
    const results = await search.filter((location) => {
      if (location.item) {
        return (
          location?.item?.prefecture
            ?.toLowerCase()
            .includes(locationSearch.toLowerCase()) ||
          location?.item?.city
            ?.toLowerCase()
            .includes(locationSearch.toLowerCase())
        );
      } else {
        return (
          location?.prefecture
            ?.toLowerCase()
            .includes(locationSearch.toLowerCase()) ||
          location?.city?.toLowerCase().includes(locationSearch.toLowerCase())
        );
      }
    });

    searchHandler(results);
  };

  const searchOptionsHandler = (e, data) => {
    e.preventDefault();
    let fuse = new Fuse(data, keyWordOptions);
    let results;
    if (searchInput) {
      results = fuse.search(searchInput);
    } else {
      results = data;
    }

    if (locationSearch !== "") {
      locationFilterHandler(results);
    } else {
      searchHandler(results);
    }
  };

  useEffect(() => {
    setLocations(data);
    console.log("Loaded");
  }, [setLocations, data]);

  return (
    <div className={styles.searchBarContainer}>
      <form
        action=""
        onSubmit={(e) => {
          searchOptionsHandler(e, data);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Keywords (e.g. Gundam Base)"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <input
          type="text"
          name="location"
          placeholder="Place (e.g. Tokyo)"
          value={locationSearch}
          onChange={(e) => {
            setLocationSearch(e.target.value);
          }}
        />
        <input type="submit" className={styles.searchButton} />
      </form>
      <button
        className={styles.searchButton}
        onClick={() => {
          setSearchInput("");
          setLocationSearch("");
          setLocations(data);
        }}
      >
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
