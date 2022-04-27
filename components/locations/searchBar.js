import React, { useState } from "react";
import styles from "../../styles/travel.module.css";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className={styles.searchBarContainer}>
      <input type="text" name="search" placeholder="e.g. Gundam Base" />
      <button>Submit</button>
    </div>
  );
};

export default SearchBar;
