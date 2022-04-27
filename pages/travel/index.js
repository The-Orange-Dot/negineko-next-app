//This will pre-render the locations server-side from the API fetch for faster loading
import { server } from "../../config/index";

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/locations`);
  const data = await res.json();

  return {
    props: { data },
  };
};

//Everything below this is CSR on browser
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/travel.module.css";
import { useMediaQuery } from "react-responsive";
import SearchBar from "../../components/locations/searchBar";
import CategoryFilter from "../../components/locations/categoryFilter";

const Travel = ({ data }) => {
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [categorySelected, setCategorySelected] = useState("");

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    setPageLoaded(true);
    let filtered;
    if (categorySelected !== "") {
      filtered = locations.filter((location) => {
        return location.category === categorySelected;
      });
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
  }, [isMobile, locations, categorySelected]);

  console.log(data);

  const travelLocations =
    locations.length === 0 ? (
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1>No matches found</h1>
      </div>
    ) : (
      filteredLocations.map((location) => (
        <div
          key={location.item ? location.item.id : location.id}
          className={
            mobile
              ? styles.mobileLocationCardContainer
              : styles.locationCardContainer
          }
        >
          <div>
            <Link
              href={`/travel/${location.item ? location.item.id : location.id}`}
              passHref={true}
            >
              <h3>{location.item ? location.item.name : location.name}</h3>
            </Link>
            <p>{location.item ? location.item.caption : location.caption}</p>
            <p>{location.item ? location.item.address : location.address}</p>
            {pageLoaded ? (
              <div>
                {/*Website Check*/}
                {location.item ? (
                  location.item.website ? (
                    <Link href={location.item.website} passHref={true}>
                      <button>Homepage</button>
                    </Link>
                  ) : null
                ) : location.website ? (
                  <Link href={location.website} passHref={true}>
                    <button>Homepage</button>
                  </Link>
                ) : null}

                {/*Twitter Check*/}
                {location.item ? (
                  location.item.twitter ? (
                    <Link
                      href={`https://twitter.com/${location.item.twitter}`}
                      passHref={true}
                    >
                      <button>Twitter</button>
                    </Link>
                  ) : null
                ) : location.twitter ? (
                  <Link
                    href={`https://twitter.com/${location.twitter}`}
                    passHref={true}
                  >
                    <button>Twitter</button>
                  </Link>
                ) : null}

                {/*Instagram Check*/}
                {location.item ? (
                  location.item.instagram ? (
                    <Link
                      href={`https://www.instagram.com/${location.item.instagram}/`}
                      passHref={true}
                    >
                      <button>Instagram</button>
                    </Link>
                  ) : null
                ) : location.instagram ? (
                  <Link
                    href={`https://www.instagram.com/${location.instagram}/`}
                    passHref={true}
                  >
                    <button>Instagram</button>
                  </Link>
                ) : null}
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>

          <div>
            <iframe
              src={location.item ? location.item.map : location.map}
              width="120"
              height="120"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      ))
    );

  console.log(locations);

  return (
    <>
      {mobile ? (
        <div
          className={
            mobile ? styles.mobileTravelContainer : styles.travelPageContainer
          }
        >
          <div
            className={
              mobile
                ? styles.mobileLocationContainer
                : styles.locationsContainer
            }
          >
            {travelLocations}
          </div>
        </div>
      ) : (
        <div
          className={
            mobile ? styles.mobileTravelContainer : styles.travelPageContainer
          }
        >
          {!mobile ? (
            <div className={styles.filterContainer}>
              <SearchBar
                data={data}
                setLocations={setLocations}
                categorySelected={categorySelected}
              />
              <CategoryFilter
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
              />
            </div>
          ) : null}
          <div
            className={
              mobile
                ? styles.mobileLocationContainer
                : styles.locationsContainer
            }
          >
            {travelLocations}
          </div>
        </div>
      )}
    </>
  );
};

export default Travel;
