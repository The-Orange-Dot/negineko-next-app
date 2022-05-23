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
  const session = useSession();
  const route = useRouter();

  console.log(session?.data?.user?.name);
  const submitNewUser = async () => {
    const res = await fetch(`${server}/api/users`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", key: "orange_is_orange" },
      body: JSON.stringify({
        user: session.data.user.name,
        streamer: streamer,
        mods: modsArray,
        mod: moderator,
        modFor: streamerInput,
      }),
    });
    const data = await res.json();
    console.log(data);

    // if (res.status === 201) {
    //   route.push("/dashboard");
    // }
  };

  //When "I'm a streamer" is selected, this form shows up to input mods for the channel
  const streamerModForm = (
    <>
      <h4>Channel moderators</h4>
      <form onSubmit={(e) => modsArrayHandler(e, modInput)}>
        <input
          type="text"
          onChange={(e) => setModInput(e.target.value)}
          placeholder="Input mod usernames"
          name="mod-input"
          value={modInput}
        />
        <input type="submit" value="Add" />
      </form>
      <div className={styles.modList}>
        {modsArray.map((mod) => {
          return <p key={mod}>{mod}</p>;
        })}
      </div>
    </>
  );

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
    setModsArray([...modsArray, input]);
  };

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
          <span className={styles.selector} onClick={() => setStreamer(true)}>
            <h2>I&apos;m a streamer</h2>
            {streamer ? streamerModForm : null}
          </span>
          <span className={styles.selector} onClick={() => setModerator(true)}>
            <h2>I&apos;m a moderator</h2>
            {moderator ? moderatorForm : null}
          </span>
        </div>
        <button onClick={() => submitNewUser()}>Finished</button>
      </div>
    </div>
  );
};

export default New;
