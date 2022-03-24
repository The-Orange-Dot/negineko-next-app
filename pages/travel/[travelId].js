import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/travel.module.css";
import Link from "next/link";
import { TwitchPlayer, TwitchClip } from "react-twitch-embed";

const TravelId = () => {
  const [location, setLocation] = useState({});
  const router = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    fetch(`../api/locations/${router.query.travelId}`)
      .then((r) => r.json())
      .then((data) => {
        setLocation(data);
        setPageLoaded(true);
      });
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
        {pageLoaded ? (
          <div>
            {location.twitchVideo ? (
              <TwitchPlayer
                video={location.twitchVideo}
                className={styles.clipFrame}
                width="640px"
                height="360px"
                mute={true}
              />
            ) : (
              <TwitchClip
                clip={location.twitchClip}
                width="640px"
                height="360px"
                mute={true}
                parent={["negineko-site.herokuapp.com"]}
              />
            )}
          </div>
        ) : null}
        <div>
          <ul className={styles.descriptionList}>
            {descriptions.map((description) => {
              return (
                <li key={description.length} className={styles.descriptionItem}>
                  {description}
                </li>
              );
            })}
          </ul>
          <div className={styles.links}>
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
        </div>
      </div>

      <div className={styles.map}>
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
