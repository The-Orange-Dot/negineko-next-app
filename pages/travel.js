import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/travel.module.css";

const Travel = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("/api/locations")
      .then((r) => r.json())
      .then((locations) => {
        setLocations(locations);
      });
  }, []);

  const travelLocations = locations.map((location) => (
    <div key={location.id} className={styles.locationCardContainer}>
      <div>
        <h3>{location.name}</h3>
        <p>Category: {location.category}</p>
        <p>{location.address}</p>
        <div>
          {/*Website Check*/}
          {location.website ? (
            <Link href={location.website} passHref={true}>
              <button className={styles.homepageButton}>Homepage</button>
            </Link>
          ) : null}

          {/*Twitter Check*/}
          {location.twitter ? (
            <Link
              href={`https://twitter.com/${location.twitter}`}
              passHref={true}
            >
              <button className={styles.homepageButton}>Twitter</button>
            </Link>
          ) : null}

          {/*Instagram Check*/}
          {location.instagram ? (
            <Link
              href={`https://www.instagram.com/${location.instagram}/`}
              passHref={true}
            >
              <button className={styles.homepageButton}>Instagram</button>
            </Link>
          ) : null}
        </div>
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
