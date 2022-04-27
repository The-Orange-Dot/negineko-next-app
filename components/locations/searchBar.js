import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/travel.module.css";
import Fuse from "fuse.js";

const SearchBar = ({ data, setLocations }) => {
  const [searchInput, setSearchInput] = useState("");
  const options = {
    keys: [
      { name: "name", weight: 0.7 },
      { name: "address", weight: 0.6 },
      { name: "caption", weight: 0.4 },
      { name: "description", weight: 0.1 },
    ],
    shouldSort: true,
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  useEffect(() => {
    setLocations(data);
  }, [setLocations, data]);

  const searchHandler = (e, text) => {
    e.preventDefault();
    if (text === "") {
      setLocations(data);
    } else {
      setLocations(fuse.search(text));
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <form
        action=""
        onSubmit={(e) => {
          searchHandler(e, searchInput);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="e.g. Gundam Base"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <input type="submit" className={styles.searchButton} />
        <button
          className={styles.searchButton}
          onClick={(e) => {
            searchHandler(e, "");
            setSearchInput("");
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
