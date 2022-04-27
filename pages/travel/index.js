//This will pre-render the locations server-side from the API fetch for faster loading
import { server } from "../../config/index";

export const getStaticProps = async () => {
  let data = [];

  await fetch(`${server}/api/locations`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
      Accept: "application/json; charset=UTF-8",
    },
    responseType: "text",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      data = res;
    });

  // const res = await fetch(`${server}/api/locations`);

  // return {
  //   props: { data: await res.json() },
  // };

  return {
    props: { data },
  };
};

//Everything below this is CSR on browser
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/travel.module.css";
import { useMediaQuery } from "react-responsive";

const Travel = ({ data }) => {
  console.log(data);
  const [locations, setLocations] = useState();
  const [pageLoaded, setPageLoaded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  useEffect(() => {
    setLocations(data);
    isMobile ? setMobile(true) : setMobile(false);
    setPageLoaded(true);
  }, [isMobile, data]);

  const travelLocations = locations?.map((location) => (
    <div
      key={location.id}
      className={
        mobile
          ? styles.mobileLocationCardContainer
          : styles.locationCardContainer
      }
    >
      <div>
        <Link href={`/travel/${location.id}`} passHref={true}>
          <h3>{location.name}</h3>
        </Link>
        <p>{location.caption}</p>
        <p>{location.address}</p>
        {pageLoaded ? (
          <div>
            {/*Website Check*/}
            {location.website ? (
              <Link href={location.website} passHref={true}>
                <button>Homepage</button>
              </Link>
            ) : null}

            {/*Twitter Check*/}
            {location.twitter ? (
              <Link
                href={`https://twitter.com/${location.twitter}`}
                passHref={true}
              >
                <button>Twitter</button>
              </Link>
            ) : null}

            {/*Instagram Check*/}
            {location.instagram ? (
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
          src={location.map}
          width="120"
          height="120"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  ));

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
