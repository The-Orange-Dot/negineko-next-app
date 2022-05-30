import React from "react";
import styles from "../../styles/settings.module.css";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

const Settings = () => {
  const session = useSession();
  const mods = session.data.mods;
  const pendingMods = session.data.pendingMods;

  // console.log(pendingMods);
  console.log(session.data.user);

  const modList = mods.map((mod) => {
    return (
      <>
        <p>{mod.name}</p>
        <Image src={mod?.image} width={100} height={100} alt="img" />
      </>
    );
  });

  return (
    <div className={styles.settingsPageContainer}>
      <h1>Settings</h1>
      <div className={styles.currentMods}>
        <h2>Your moderators</h2>
        <div>{modList}</div>
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
