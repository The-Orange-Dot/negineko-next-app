//This will pre-render the locations server-side from the API fetch for faster loading
import { loginUser } from "../../redux/actions/userLoginSlice";
import { useSelector } from "react-redux";
import { LocationType } from "../../source/types/next";

//Everything below this is CSR on browser
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/travel.module.css";
import { useMediaQuery } from "react-responsive";
import SearchBar from "../../components/locations/searchBar";
import CategoryFilter from "../../components/locations/categoryFilter";
import Image from "next/image";
import { useSession } from "next-auth/react";
import LikesCounter from "../../components/locations/likesCounter";
import { useRouter } from "next/router";
import LanguageIcon from "@mui/icons-material/Language";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Button, IconButton } from "@mui/material";
import { server } from "../../config";

const Travel = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const [categorySelected, setCategorySelected] = useState({
    category: "",
  });
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const user = useSelector(loginUser);
  const username = user?.payload?.user?.value.name;

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await fetch(`/api/locations`, {
        headers: { key: "orange_is_orange" },
      });
      const locations: LocationType[] = await data.json();
      setData(locations);
    };

    fetchLocations();
  }, [router]);

  useEffect(() => {
    isMobile ? setMobile(true) : setMobile(false);
    setPageLoaded(true);
    let filtered;
    if (categorySelected) {
      filtered = locations.filter((location) => {
        return (
          location.category === categorySelected ||
          location?.item?.category === categorySelected
        );
      });
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations(locations);
    }
    session
      ? setLoading(false)
      : pageLoaded
      ? setLoading(false)
      : setLoading(true);
    mobile ? setLocations(data) : null;
  }, [
    isMobile,
    locations,
    categorySelected,
    session,
    pageLoaded,
    mobile,
    data,
  ]);

  const travelLocations =
    locations?.length === 0 ? (
      <div style={{ width: "100%", textAlign: "center" }}>
        {mobile ? <h1>Loading...</h1> : <h1>No matches found</h1>}
      </div>
    ) : (
      filteredLocations.map((location) => {
        type LocationName = string;
        let locationName: LocationName;
        locationName = location.item ? location.item.name : location.name;
        const locationNameSplit = locationName.split("(");

        return (
          <div
            key={location.item ? location.item.id : location.id}
            className={
              mobile
                ? styles.mobileLocationCardContainer
                : styles.locationCardContainer
            }
          >
            {/* Mobile view */}
            {!mobile ? null : (
              <>
                <div className={styles.mobileViewTitle}>
                  <Link
                    href={`/travel/${
                      location.item ? location.item.id : location.id
                    }`}
                    passHref={true}
                  >
                    <span>
                      <h3>{locationNameSplit[0]}</h3>
                      <h3>{locationNameSplit[1]?.slice(0, -1)}</h3>
                    </span>
                  </Link>
                </div>
              </>
            )}
            <div
              className={
                mobile ? styles.mobileLocationContent : styles.locationContent
              }
            >
              {/* Monitor view */}
              {mobile ? null : (
                <>
                  <div className={styles.monitorViewTitle}>
                    <Link
                      href={`/travel/${
                        location.item ? location.item.id : location.id
                      }`}
                      passHref={true}
                    >
                      <span>
                        <h3>{locationNameSplit[0]}</h3>
                        <h3>{locationNameSplit[1]?.slice(0, -1)}</h3>
                      </span>
                    </Link>
                  </div>
                </>
              )}
              <p>{location.item ? location.item.caption : location.caption}</p>
              <span>
                <p>
                  {location.item
                    ? location.item.prefecture
                    : location.prefecture}
                  , {location.item ? location.item.city : location.city}
                </p>
              </span>
              {pageLoaded ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LikesCounter
                    mobile={mobile}
                    setLoading={setLoading}
                    username={username}
                    location={location}
                    id={location.item ? location.item.id : location.id}
                    likes={location.item ? location.item.likes : location.likes}
                  />
                  {/*Website Check*/}
                  {location.item ? (
                    location.item.website ? (
                      <Link href={location.item.website} passHref={true}>
                        <IconButton color="primary">
                          <LanguageIcon />
                        </IconButton>
                      </Link>
                    ) : null
                  ) : location.website ? (
                    <Link href={location.website} passHref={true}>
                      <IconButton color="primary">
                        <LanguageIcon />
                      </IconButton>
                    </Link>
                  ) : null}

                  {/*Twitter Check*/}
                  {location.item ? (
                    location.item.twitter ? (
                      <Link
                        href={`https://twitter.com/${location.item.twitter}`}
                        passHref={true}
                      >
                        <IconButton color="primary">
                          <TwitterIcon />
                        </IconButton>
                      </Link>
                    ) : null
                  ) : location.twitter ? (
                    <Link
                      href={`https://twitter.com/${location.twitter}`}
                      passHref={true}
                    >
                      <IconButton color="primary">
                        <TwitterIcon />
                      </IconButton>
                    </Link>
                  ) : null}

                  {/*Instagram Check*/}
                  {location.item ? (
                    location.item.instagram ? (
                      <Link
                        href={`https://www.instagram.com/${location.item.instagram}/`}
                        passHref={true}
                      >
                        <IconButton color="primary">
                          <InstagramIcon />
                        </IconButton>
                      </Link>
                    ) : null
                  ) : location.instagram ? (
                    <Link
                      href={`https://www.instagram.com/${location.instagram}/`}
                      passHref={true}
                    >
                      <IconButton color="primary">
                        <InstagramIcon />
                      </IconButton>
                    </Link>
                  ) : null}
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <Link
              href={`/travel/${location.item ? location.item.id : location.id}`}
              passHref={true}
            >
              <div
                className={
                  mobile
                    ? styles.mobileThumbnailContainer
                    : styles.thumbnailContainer
                }
              >
                <Image
                  className={styles.thumbnails}
                  src={
                    location.item
                      ? `https://res.cloudinary.com/demo/image/fetch/${location.item.thumbnail}`
                      : `https://res.cloudinary.com/demo/image/fetch/${location.thumbnail}`
                  }
                  alt={location.item ? location.item.name : location.name}
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL={
                    location.item ? location.item.thumbnail : location.thumbnail
                  }
                  priority={true}
                />
              </div>
            </Link>
          </div>
        );
      })
    );

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
        <>
          <div
            className={
              mobile ? styles.mobileTravelContainer : styles.travelPageContainer
            }
          >
            <div className={styles.filterContainer}>
              <SearchBar data={data} setLocations={setLocations} />
              <CategoryFilter
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
              />
            </div>

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
        </>
      )}
    </>
  );
};

// export const getStaticProps = async () => {
//   const data = await fetch(`${server}/api/locations`, {
//     headers: { key: "orange_is_orange" },
//   });

//   const locations: LocationType[] = await data.json();

//   console.log(locations);

//   return {
//     props: { data: locations },
//   };
// };

export default Travel;
