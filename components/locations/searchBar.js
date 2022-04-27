import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/travel.module.css";
import Fuse from "fuse.js";

const SearchBar = ({ data, setLocations }) => {
  const [searchInput, setSearchInput] = useState("");
  const options = {
    keys: ["name", "caption"],
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  useEffect(() => {
    setLocations(data);
    console.log(data);
  }, [setLocations, data]);

  const searchHandler = (e, text) => {
    e.preventDefault();
    if (text === "") {
      setLocations(data);
    } else {
      setLocations(fuse.search(text));
    }
    console.log(text);
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
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default SearchBar;
