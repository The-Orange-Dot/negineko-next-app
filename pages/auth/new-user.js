import React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/new.module.css";
import { server } from "../../config/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { storeMods, storePendingMods } from "../../redux/actions/modSlice";

const New = () => {
  const dispatch = useDispatch();
  const [streamer, setStreamer] = useState(false);
  const [modInput, setModInput] = useState("");
  const [moderator, setModerator] = useState(false);
  const [streamerInput, setStreamerInput] = useState("");
  const [modsLoaded, setModsLoaded] = useState(false);
  const [mods, setMods] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [foundStreamer, setFoundStreamer] = useState({
    username: "Streamer",
    image: "/images/placeholder.png",
  });
  const session = useSession();
  const route = useRouter();

  //Submit Handler for Registering new MODS
  const submitNewMod = async () => {
    if (streamerInput.toLowerCase() === session.data.name.toLowerCase()) {
      setFoundStreamer({
        username: "THAT'S YOUUU!!",
        image: "/images/Orange.jpeg",
      });
    } else {
      const streamerInfo = await fetch(
        `${server}/api/users/streamers/${streamerInput}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            key: "orange_is_orange",
          },
          body: JSON.stringify({
            username: session.data.name,
            streamer: foundStreamer,
          }),
        }
      );

      const streamerData = await streamerInfo.json();

      if (streamerInfo.status === 406) {
        setError(true);
        setErrorMessage(streamerData.error);
      } else {
        route.push("/juicebox");
      }
    }
  };

  //Submit Handler for Registering new STREAMERS
  const submitNewStreamer = async () => {
    const modsDataArray = await fetch(`${server}/api/users/mods`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", key: "orange_is_orange" },
      body: JSON.stringify({
        username: session.data.name,
        modRequests: mods,
      }),
    });

    const modsData = await modsDataArray.json();
    dispatch(storePendingMods(modsData));

    route.push("/juicebox");
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
      <form onSubmit={(e) => modsArrayHandler(e, modInput)}>
        <input
          type="text"
          onChange={(e) => setModInput(e.target.value)}
          placeholder="Add additional mods"
          name="mod-input"
          value={modInput}
        />
        <input type="submit" value="Add" />
      </form>
      <div>
        <button onClick={() => setStreamer(false)}>Cancel</button>
        <button onClick={() => submitNewStreamer()}>Finished</button>
      </div>
    </>
  );

  const streamerHandler = async () => {
    setModerator(false);
    setStreamer(true);
    const modList = await fetch(
      `${server}/api/users/mods/${session.data.name}`,
      {
        headers: { key: "orange_is_orange" },
      }
    );

    const modNames = await modList.json();
    const mods = await modNames.map((mod) => {
      return mod.user_name;
    });
    setMods(mods);
    setModsLoaded(true);
  };

  const moderatorHandler = async () => {
    setError(false);
    setModerator(true);
    setStreamer(false);
  };

  const findStreamerHandler = async (e) => {
    e.preventDefault();
    setError(false);

    await fetch(`${server}/api/users/streamers/${streamerInput}`, {
      headers: { key: "orange_is_orange" },
    })
      .then((res) => res.json())
      .then((data) => {
        setFoundStreamer(data);
      });
  };

  //When "I'm a moderator" is selected, this form shows up to input who they mod for
  const moderatorForm = (
    <>
      <div className={styles.cardHeader}>
        <h3>Who do you mod for?</h3>
        <p>
          This will send a request to the streamer. Once approved, then
          you&apos;re all set!
        </p>
      </div>
      {error ? (
        <div className={styles.streamerInfo}>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className={styles.streamerInfo}>
          <Image src={foundStreamer.image} alt="img" width={200} height={200} />
          <p>{foundStreamer?.username}</p>
        </div>
      )}
      <form onSubmit={(e) => findStreamerHandler(e, streamerInput)}>
        <input
          type="text"
          onChange={(e) => setStreamerInput(e.target.value)}
          placeholder="Input mod usernames"
        />
        <input type="submit" value="Find streamer" />
      </form>
      <div className={styles.submitButtons}>
        <button
          onClick={() => {
            setModerator(true);
          }}
        >
          Cancel
        </button>
        <button onClick={() => submitNewMod()}>Send Request</button>
      </div>
    </>
  );

  const modsArrayHandler = (e, input) => {
    e.preventDefault();
    setModInput("");
    setMods([...mods, input]);
  };

  if (session.status === "loading") {
    return (
      <div className={styles.newPageContainer}>
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
              onClick={() => moderatorHandler()}
            >
              {moderator ? (
                moderatorForm
              ) : (
                <button>I&apos;m a moderator</button>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  } else if (session.data === "unauthenticated") {
    console.log("Unauthorized");
    route.push("/auth/signin");
  }
};

export default New;
