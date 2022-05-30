import React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/new.module.css";
import { server } from "../../config/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const New = () => {
  const [streamer, setStreamer] = useState(false);
  const [modInput, setModInput] = useState("");
  const [modsArray, setModsArray] = useState([]);
  const [moderator, setModerator] = useState(false);
  const [streamerInput, setStreamerInput] = useState("");
  const [modsLoaded, setModsLoaded] = useState(false);
  const [mods, setMods] = useState([]);
  const session = useSession();
  const route = useRouter();

  // console.log(session?.status);
  const submitNewUser = async () => {
    const res = await fetch(`${server}/api/users`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", key: "orange_is_orange" },
      body: JSON.stringify({
        username: session.data.name,
        streamer: streamer,
        pendingMods: mods,
        mod: moderator,
        pendingModFor: streamerInput,
      }),
    });
  };

  const subtractModHandler = (e) => {
    const modName = e.target.innerText;
    const updatedMods = mods.filter((mod) => {
      return mod !== modName;
    });
    setMods(updatedMods);
  };

  //When "I'm a streamer" is selected, this form shows up to input mods for the channel
  const streamerModForm = (
    <>
      <div className={styles.cardHeader}>
        <h3>Channel moderators</h3>
        <p>
          Customize who your mods are and who you can link with. (Don&apos;t
          worry, you can change this later)
        </p>
      </div>
      <div className={styles.modList}>
        {modsLoaded ? (
          mods.map((mod) => {
            return (
              <span className={styles.modName} key={mod}>
                <p
                  onClick={(mod) => {
                    subtractModHandler(mod);
                  }}
                >
                  {mod}
                </p>
              </span>
            );
          })
        ) : (
          <div>
            <h3>Fetching your mods!</h3>
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => modsArrayHandler(e, modInput)}
        className={styles.form}
      >
        <input
          type="text"
          onChange={(e) => setModInput(e.target.value)}
          placeholder="Input mod usernames"
          name="mod-input"
          value={modInput}
        />
        <input type="submit" value="Add" />
      </form>
      <div>
        <button onClick={() => setStreamer(false)}>Cancel</button>
      </div>
    </>
  );

  const streamerHandler = async () => {
    setStreamer(!streamer);
    const modList = await fetch(`${server}/api/twitchStreamer`, {
      method: "POST",
      headers: { key: "orange_is_orange" },
      body: JSON.stringify({ username: session.data.name }),
    });

    const modNames = await modList.json();
    const mods = await modNames.map((mod) => {
      return mod.user_name;
    });
    setMods(mods);
    setModsLoaded(true);
  };

  //When "I'm a moderator" is selected, this form shows up to input who they mod for
  const moderatorForm = (
    <>
      <h4>Who do you mod for?</h4>
      <input
        type="text"
        onChange={(e) => setStreamerInput(e.target.value)}
        placeholder="Input mod usernames"
      />
    </>
  );

  const modsArrayHandler = (e, input) => {
    e.preventDefault();
    setModInput("");
    setMods([...mods, input]);
  };

  if (session.status === "loading") {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (session.status === "authenticated") {
    return (
      <div className={styles.newPageContainer}>
        <h3>Welcome to the Juice Box</h3>
        <p>
          The Juice Box provides irl streamers with tools to use with their
          streams and moderator controls to assist irl streamers
        </p>

        <h4>Notice</h4>
        <ul>
          <li>
            The Juice Box <strong>DOES NOT</strong> share any user data with
            anyone.
          </li>
          <li>
            We will <strong>NEVER</strong> ask for any user&apos;s email or
            password.
          </li>
          <li>Orange would really love your feedback and suggestions</li>
          <li>
            If you find this application useful, please credit us in your about
            section
          </li>
        </ul>
        <div className={styles.formContainer}>
          <h4>Account set-up</h4>
          <div className={styles.formSelector}>
            <span className={styles.formCards}>
              {streamer ? (
                streamerModForm
              ) : (
                <button
                  onClick={() => {
                    streamerHandler();
                  }}
                >
                  I&apos;m a streamer
                </button>
              )}
            </span>
            <span
              className={styles.formCards}
              onClick={() => setModerator(true)}
            >
              <h2>I&apos;m a moderator</h2>
              {moderator ? moderatorForm : null}
            </span>
          </div>
          <button onClick={() => submitNewUser()}>Finished</button>
        </div>
      </div>
    );
  } else if (session.data === "unauthenticated") {
    console.log("Unauthorized");
    route.push("/auth/signin");
  }
};

export default New;
