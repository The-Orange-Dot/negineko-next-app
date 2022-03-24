import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/travel.module.css";

const Travel = () => {
  const [locations, setLocations] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(false);
    fetch("/api/locations")
      .then((r) => r.json())
      .then(async (locations) => {
        await setLocations(locations);
        await setPageLoaded(true);
      });
  }, []);

  const travelLocations = locations.map((location) => (
    <div key={location.id} className={styles.locationCardContainer}>
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
    <div className={styles.travelPageContainer}>
      <div className={styles.locationsContainer}>{travelLocations}</div>
    </div>
  );
};

export default Travel;
