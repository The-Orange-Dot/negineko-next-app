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
import {
  IconButton,
  Skeleton,
  Typography,
  Paper,
  Card,
  CardActionArea,
} from "@mui/material";

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
  const session = useSession();
  const user = useSelector(loginUser);

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

    mobile ? setLocations(data) : null;
  }, [isMobile, locations, categorySelected, session, mobile, data]);

  const travelLocations =
    locations?.length === 0 ? (
      <div style={{ width: "100%", textAlign: "center" }}>
        {session.status === "loading" ? (
          <div
            className={mobile ? styles.mobileLoadingText : styles.loadingText}
          >
            <h1>Loading...</h1>
          </div>
        ) : (
          <div>
            <h1>No matches found</h1>
          </div>
        )}
      </div>
    ) : (
      filteredLocations.map((location) => {
        type LocationName = string;
        let locationName: LocationName;
        locationName = location.item ? location.item.name : location.name;
        const locationNameSplit = locationName.split("(");

        return (
          <Card
            variant="outlined"
            key={location.item ? location.item.id : location.id}
            className={
              mobile
                ? styles.mobileLocationCardContainer
                : styles.locationCardContainer
            }
          >
            <div
              className={
                mobile ? styles.mobileLocationContent : styles.locationContent
              }
            >
              {mobile ? (
                <div className={styles.mobileViewTitle}>
                  <Link
                    href={`/travel/${
                      location.item ? location.item.id : location.id
                    }`}
                    passHref={true}
                  >
                    <span>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {locationNameSplit[0]}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {locationNameSplit[1]?.slice(0, -1)}
                      </Typography>
                    </span>
                  </Link>
                </div>
              ) : (
                <>
                  <div className={styles.monitorViewTitle}>
                    <Link
                      href={`/travel/${
                        location.item ? location.item.id : location.id
                      }`}
                      passHref={true}
                    >
                      {
                        <span>
                          <Typography
                            variant="h6"
                            className={styles.locationName}
                            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                          >
                            {session.status === "loading" ? (
                              <Skeleton />
                            ) : (
                              locationNameSplit[0]
                            )}
                          </Typography>
                          <Typography
                            variant="h6"
                            className={styles.locationName}
                            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
                          >
                            {session.status === "loading" ? (
                              <Skeleton />
                            ) : (
                              locationNameSplit[1]?.slice(0, -1)
                            )}
                          </Typography>
                        </span>
                      }
                    </Link>
                  </div>
                </>
              )}
              <div
                className={
                  mobile
                    ? styles.mobileCaptionContainer
                    : styles.captionContainer
                }
              >
                <Typography variant="subtitle2" className={styles.caption}>
                  {session.status === "loading" ? (
                    <>
                      <Skeleton sx={{ width: 260 }} />
                      <Skeleton sx={{ width: 260 }} />
                    </>
                  ) : location.item ? (
                    location.item.caption
                  ) : (
                    location.caption
                  )}
                </Typography>
              </div>

              <span
                className={
                  mobile ? styles.mobileCityContainer : styles.cityContainer
                }
              >
                <Typography variant="subtitle2" className={styles.locationCity}>
                  {session.status === "loading" ? (
                    <Skeleton />
                  ) : location.item ? (
                    `${location.item.prefecture}, ${location.item.city}`
                  ) : (
                    `${location.prefecture}, ${location.city}`
                  )}
                </Typography>
              </span>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {session.status === "loading" ? (
                  <Skeleton
                    variant="circular"
                    width={25}
                    height={25}
                    sx={{ m: 1 }}
                  />
                ) : (
                  <LikesCounter
                    mobile={mobile}
                    location={location}
                    id={location.item ? location.item.id : location.id}
                    likes={location.item ? location.item.likes : location.likes}
                  />
                )}
                {/*Website Check*/}
                {session.status === "loading" ? (
                  <Skeleton
                    variant="circular"
                    width={25}
                    height={25}
                    sx={{ m: 1 }}
                  />
                ) : location.item ? (
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
                {session.status === "loading" ? (
                  <Skeleton
                    variant="circular"
                    width={25}
                    height={25}
                    sx={{ m: 1 }}
                  />
                ) : location.item ? (
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
                {session.status === "loading" ? (
                  <Skeleton
                    variant="circular"
                    width={25}
                    height={25}
                    sx={{ m: 1 }}
                  />
                ) : location.item ? (
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
                {session.status === "loading" ? (
                  <Skeleton variant="rectangular" width={300} height={300} />
                ) : (
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
                      location.item
                        ? location.item.thumbnail
                        : location.thumbnail
                    }
                    priority={true}
                  />
                )}
              </div>
            </Link>
          </Card>
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
            <Paper className={styles.filterContainer} variant="outlined">
              <SearchBar data={data} setLocations={setLocations} />
              <CategoryFilter
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
              />
            </Paper>

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
