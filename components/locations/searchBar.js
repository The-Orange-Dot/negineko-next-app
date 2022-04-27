import React from "react";
import styles from "../../styles/travel.module.css";

const SearchBar = () => {
  return (
    <div className={styles.searchBarContainer}>
      <input type="text" name="search" placeholder="e.g. Gundam Base" />
      <button>Submit</button>
    </div>
  );
};

export default SearchBar;
