import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/travel.module.css";
import Fuse from "fuse.js";
import { Button, TextField, Paper, Box, Typography } from "@mui/material";

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

  const searchOptionsHandler = (data) => {
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
    <Paper className={styles.searchBarContainer} variant="outlined">
      <Typography>Search: </Typography>
      <TextField
        type="text"
        name="search"
        label="Keywords (e.g. Gundam Base)"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        variant="standard"
        size="small"
        sx={{ m: 1 }}
      />
      <TextField
        type="text"
        name="location"
        label="Place (e.g. Tokyo)"
        value={locationSearch}
        onChange={(e) => {
          setLocationSearch(e.target.value);
        }}
        variant="standard"
        size="small"
        sx={{ m: 1 }}
      />
      <Button
        className={styles.searchButton}
        onClick={() => {
          searchOptionsHandler(data);
        }}
        variant="contained"
        color="black"
        disableElevation
        sx={{ m: 0.5 }}
      >
        Submit
      </Button>
      <Button
        className={styles.searchButton}
        onClick={() => {
          setSearchInput("");
          setLocationSearch("");
          setLocations(data);
        }}
        variant="contained"
        color="black"
        disableElevation
        sx={{ m: 0.5 }}
      >
        Clear
      </Button>
    </Paper>
  );
};

export default SearchBar;
