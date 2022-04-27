import React, { useState } from "react";
import { useEffect } from "react";
import styles from "../../styles/travel.module.css";

const CategoryFilter = ({ categorySelected, setCategorySelected }) => {
  useEffect(() => {
    switch (categorySelected) {
      case "food":
        setCategorySelected("food");
        break;
      case "shopping":
        setCategorySelected("shopping");
        break;
      case "recreation":
        setCategorySelected("recreation");
        break;
      case "nature":
        setCategorySelected("nature");
        break;
      default:
        setCategorySelected("");
    }
  }, [setCategorySelected, categorySelected]);

  return (
    <div className={styles.categoryContainer}>
      <p>
        <strong>Categories: </strong>
      </p>
      <div className={styles.categorySelector}>
        <span
          className={
            categorySelected === ""
              ? styles.categoryButtonSelected
              : styles.categoryButton
          }
          onClick={() => {
            setCategorySelected("");
          }}
        >
          <p>All</p>
        </span>
        <span
          className={
            categorySelected === "food"
              ? styles.categoryButtonSelected
              : styles.categoryButton
          }
          onClick={() => {
            setCategorySelected("food");
          }}
        >
          <p>Restaurants</p>
        </span>
        <span
          className={
            categorySelected === "shopping"
              ? styles.categoryButtonSelected
              : styles.categoryButton
          }
          onClick={() => {
            setCategorySelected("shopping");
          }}
        >
          <p>Shopping</p>
        </span>
        <span
          className={
            categorySelected === "recreation"
              ? styles.categoryButtonSelected
              : styles.categoryButton
          }
          onClick={() => {
            setCategorySelected("recreation");
          }}
        >
          <p>Recreation</p>
        </span>
        <span
          className={
            categorySelected === "nature"
              ? styles.categoryButtonSelected
              : styles.categoryButton
          }
          onClick={() => {
            setCategorySelected("nature");
          }}
        >
          <p>Nature</p>
        </span>
      </div>
    </div>
  );
};

export default CategoryFilter;
