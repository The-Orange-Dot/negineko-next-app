import React, { useEffect, useState } from "react";
import styles from "../../styles/settings.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { fetchMods } from "../FetchMods";

const Settings = () => {
  const session = useSession();
  const [mods, setMods] = useState([]);
  const username = session.data.name;
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(
    () => {
      const fetchModData = async (username) => {
        const modsData = await fetch(`/api/users/${username}`, {
          headers: { key: "orange_is_orange" },
        });
        const mods = await modsData.json();

        setMods(mods);
        setPageLoaded(true);
      };

      fetchModData(username);
      console.log("Settings Page Loaded");
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const modList = mods.map((mod) => {
    return (
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
    );
  });

  return (
    <div className={styles.settingsPageContainer}>
      <h1>Settings</h1>
      <div className={styles.currentModsContainer}>
        <h2>Your moderators</h2>
        <div className={styles.modContainer}>
          {pageLoaded ? modList : <p>Fetching your mods!</p>}
        </div>
      </div>
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
