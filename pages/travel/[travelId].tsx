import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/travel.module.css";
import Link from "next/link";
import { TwitchPlayer, TwitchClip } from "react-twitch-embed";
import { useMediaQuery } from "react-responsive";

const TravelId = () => {
  interface Location {
    id: string;
    description: string[];
    address: string;
    name: string;
    caption: string;
    twitchVideo: string;
    twitchClip: string;
    twitter: string;
    instagram: string;
    website: string;
    map: string;
  }
  const [location, setLocation] = useState<Location>({
    id: "",
    description: [],
    address: "",
    name: "",
    caption: "",
    twitchClip: "",
    twitchVideo: "",
    twitter: "",
    instagram: "",
    website: "",
    map: "",
  });

  const router = useRouter();
  const [pageLoaded, setPageLoaded] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    localStorage.setItem("travelId", router.query.travelId as string);

    fetch(`../api/locations/${localStorage.getItem("travelId")}`, {
      headers: { key: "orange_is_orange" },
    })
      .then((r) => r.json())
      .then((data) => {
        setLocation(data);
        setPageLoaded(true);
        console.log(data);
      });
    isMobile ? setMobile(true) : setMobile(false);
    console.log("loaded");
  }, [router.query.travelId, isMobile]);

  //Parses the description into a clean array
  let descriptions = [location.address, ...location.description];

  return (
    <div
      className={
        mobile
          ? styles.mobileLocationPageContainer
          : styles.locationPageContainer
      }
    >
      <h1>{location.name}</h1>
      <h3>{location.caption}</h3>
      <div
        className={
          mobile
            ? styles.mobileLocationInfoContainer
            : styles.locationInfoContainer
        }
      >
        {pageLoaded ? (
          <>
            {mobile ? (
              <div>
                {pageLoaded ? (
                  <div>
                    {location.twitchVideo ? (
                      <TwitchPlayer
                        video={location.twitchVideo}
                        className={styles.mobileClipFrame}
                        width="100%"
                        height="200px"
                        mute="true"
                      />
                    ) : (
                      <TwitchClip
                        clip={location.twitchClip}
                        width="100%"
                        height="200px"
                        mute="true"
                        parent={["negineko-site.herokuapp.com"]}
                      />
                    )}
                  </div>
                ) : null}
              </div>
            ) : (
              <div>
                {location.twitchVideo ? (
                  <TwitchPlayer
                    video={location.twitchVideo}
                    className={styles.clipFrame}
                    width="640px"
                    height="360px"
                    mute="true"
                  />
                ) : (
                  <TwitchClip
                    clip={location.twitchClip}
                    width="640px"
                    height="360px"
                    mute="true"
                    parent={["negineko-site.herokuapp.com"]}
                  />
                )}
              </div>
            )}
          </>
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

      {mobile ? null : (
        <div className={styles.map}>
          <iframe
            src={location.map}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default TravelId;
