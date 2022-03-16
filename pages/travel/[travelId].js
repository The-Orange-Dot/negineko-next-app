import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/travel.module.css";

const TravelId = () => {
  const [location, setLocation] = useState({});
  const router = useRouter();

  useEffect(() => {
    fetch(`../api/locations/${router.query.travelId}`)
      .then((r) => r.json())
      .then((data) => setLocation(data));
  }, [router.query.travelId]);

  //Parses the description into a clean array
  const descriptions = [];
  location.description
    ? (descriptions = location.description.split("|"))
    : null;

  return (
    <div className={styles.locationPageContainer}>
      <h1>{location.name}</h1>
      <h3>{location.caption}</h3>
      <div className={styles.locationInfoContainer}>
        <div>
          <iframe
            src="https://player.twitch.tv/?video=v40464143&parent=streamernews.example.com&autoplay=false"
            height="360"
            width="640"
            allowFullScreen={true}
          ></iframe>
        </div>
        <div>
          <ul>
            {descriptions.map((description) => {
              return <li key={description.length}>{description}</li>;
            })}
          </ul>
        </div>
      </div>
      <div className={styles.map}>
        <p>Address: {location.address}</p>
        <iframe
          src={location.map}
          width="100%"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default TravelId;
