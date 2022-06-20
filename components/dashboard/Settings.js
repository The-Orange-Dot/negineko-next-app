import React, { useEffect, useState } from "react";
import styles from "../../styles/settings.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Settings = ({ juiceBoxMenu }) => {
  const session = useSession();
  const [mods, setMods] = useState([]);
  const pendingModsStore = useSelector((state) => state.mods.pendingMods);
  const pendingModsArray = session.data.modsPending;
  const [pendingMods, setPendingMods] = useState(pendingModsArray);
  const username = session.data.name;
  const [pageLoaded, setPageLoaded] = useState(false);

  //Fetches mods from DB
  useEffect(
    () => {
      const fetchModData = async (username) => {
        const modsData = await fetch(`/api/users/${username}`, {
          headers: { key: "orange_is_orange" },
        });
        let mods = [];
        if (modsData) {
          const approvedMods = await modsData.json();
          mods.push(...approvedMods);
        }
        setMods(mods);
        setPageLoaded(true);
      };

      let pending;

      //Logic to hydrate pending mods for new users
      if (pendingModsArray.length < 1) {
        pending = pendingModsStore;
      } else {
        pending = pendingModsArray;
      }

      console.log(pendingModsArray);

      //Array of pending mods waiting for approval
      const pendingModsList = pending.map((mod) => {
        return (
          <span key={mod.name} className={styles.pendingModCards}>
            <Image
              src="/images/placeholder.png"
              width={50}
              height={50}
              alt="img"
              className={styles.modImage}
            />
            <p>{`${mod} (Pending)`}</p>
          </span>
        );
      });

      fetchModData(username);
      setPendingMods(pendingModsList);
      console.log("Settings Page Loaded");
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [session.data.modsPending, juiceBoxMenu]
  );

  //Array of approved mods
  const modList = mods.map((mod) => {
    return session.data.streamer ? (
      <span key={mod.name} className={styles.modCards}>
        <Image
          src={mod.image}
          width={50}
          height={50}
          alt="img"
          className={styles.modImage}
        />
        <p>{mod.name}</p>
      </span>
    ) : (
      <span key={mod.name} className={styles.streamerCard}>
        <span className={styles.streamerName}>
          <Image
            src={mod.image}
            width={200}
            height={200}
            alt="img"
            className={styles.modImage}
          />
          <p>{mod.name}</p>
        </span>
        <span>
          <p>Streamer stats will go here!</p>
        </span>
      </span>
    );
  });

  return (
    <div className={styles.settingsPageContainer}>
      <h1>Settings</h1>
      {session.data.streamer ? (
        <div className={styles.currentModsContainer}>
          <h2>Your moderators</h2>
          <div className={styles.modContainer}>
            {pageLoaded ? (
              <>
                <span className={styles.modCardsContainer}>
                  {modList}
                  {pendingMods}
                </span>
              </>
            ) : (
              <p>Fetching your mods!</p>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.currentStreamerContainer}>
          <h2>Streamer you moderate for</h2>
          <div className={styles.streamerContainer}>
            {pageLoaded ? (
              <>
                <span className={styles.streamerCardContainer}>{modList}</span>
              </>
            ) : (
              <p>Fetching streamer!</p>
            )}
          </div>
        </div>
      )}
      {/* <div>
        <p>User info here</p>
        <br />
        <p>Logic goes here</p>
        <p>1. Streamer info (if they are a streamer)</p>
        <p>2. If they are a mod</p>
        <p>2a. You are not currently a mod for any channels</p>
        <p>2b. You have not been verified as a mod for (streamer)</p>
        <p>2c. You are a mod for (streamer)</p>
      </div>
      <br />
      <div>
        <p>Mod card list</p>
        <p>Add mod</p>
        <p>Mod permissions (option to remove mod with verification)</p>
      </div> */}
    </div>
  );
};

export default Settings;
