import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/giveaway.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [itemNameInput, setItemNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [selector, setSelector] = useState("");
  const [descriptorSelector, setDescriptorSelector] = useState("");
  const [winner, setWinner] = useState(false);
  const [shuffle, setShuffle] = useState("");
  const [videoHidden, setVideoHidden] = useState(false);
  const [keyButtons, setKeyButtons] = useState();
  const [arrays, setArrays] = useState({});
  const [descriptor, setDescriptor] = useState({});

  useEffect(() => {
    setKeyButtons(
      Object.keys(arrays).map((key) => {
        return (
          <button
            className={styles.keyButton}
            key={key}
            onClick={() => {
              selectorHandler(key);
            }}
          >
            {key}
          </button>
        );
      })
    );
    console.log("Page Loaded");
  }, [arrays]);

  const selectorHandler = (e) => {
    for (let key in arrays) {
      if (e === key) {
        setSelector(arrays[key]);
        setDescriptorSelector(descriptor[key]);
      }
    }
  };

  const router = useRouter();

  const addNewItem = (users, description) => {
    setArrays({ ...arrays, ...users });
    setDescriptor({ ...descriptor, ...description });
  };

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const shuffleHandler = (i) => {
    const result = selector[Math.floor(Math.random() * selector.length)];
    i === "reset" ? setShuffle([]) : setShuffle(result);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {winner && !videoHidden ? (
            <video
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className="winner-video"
            >
              <source src={"/images/confetti.mp4"} />
            </video>
          ) : null}
          {/* <span>
            {winner ? (
              <Image
                src={"/images/Nacchan.png"}
                alt="nacchan"
                width={400}
                height={400}
                style={{}}
              />
            ) : null}
          </span> */}
          <span className={styles.screenDisplay}>
            <h1>{descriptorSelector}</h1>
            <div>
              {winner ? <h1 style={{ lineHeight: "1rem" }}>WINNER!</h1> : null}
              <h1>{shuffle}</h1>
            </div>
          </span>
          {/* <span>
            {winner ? (
              <Image
                src={"/images/Mocchan.png"}
                alt="mocchan"
                width={400}
                height={400}
                style={{}}
              />
            ) : null}
          </span> */}
        </div>

        <div className={styles.controlsContainer}>
          {Object.keys(arrays).length ? (
            <div className={styles.keyButtons}>{keyButtons}</div>
          ) : (
            <div style={{ width: 400, textAlign: "center" }}>
              <p>Add a giveaway item on the right</p>
              <p>(9 buttons max)</p>
            </div>
          )}
          <div className={styles.controls}>
            <div style={{ margin: "10%" }}>
              <button
                onClick={async () => {
                  if (Object.keys(arrays).length && selector) {
                    setVideoHidden(false);
                    for (let i = 0; i <= 400; i++) {
                      shuffleHandler(i);
                      await delay(10);
                    }
                    for (let i = 0; i <= 100; i++) {
                      shuffleHandler(i);
                      await delay(50);
                    }
                    for (let i = 0; i <= 50; i++) {
                      shuffleHandler(i);
                      await delay(100);
                    }
                    for (let i = 0; i <= 20; i++) {
                      shuffleHandler(i);
                      await delay(500);
                    }
                    setWinner(true);
                    setTimeout(() => {
                      setVideoHidden(true);
                    }, 18000);
                  }
                }}
              >
                Shuffle
              </button>
              <button
                onClick={() => {
                  // router.reload(window.location.pathname);
                  setDescriptorSelector("");
                  shuffleHandler("reset");
                  setWinner(false);
                  setVideoHidden(true);
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div>
            <div className={styles.inputContainer}>
              <input
                type="text"
                name="name"
                placeholder="Button Name"
                onChange={(e) => {
                  setItemNameInput(e.target.value);
                }}
                maxLength="10"
                required
              />
              <input
                type="text"
                name="description"
                placeholder='Title (ex: "Gaming mouse Giveaway")'
                onChange={(e) => {
                  setDescriptionInput(e.target.value);
                }}
                maxLength="100"
                required
              />
              <textarea
                type="text"
                name="users"
                placeholder='Users - Seperate users with a space (ex: "mocchan nacchan debuneko draculabot")'
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
                rows="8"
                cols="50"
                required
              />
            </div>
            <div className={styles.submitButton}>
              <button
                onClick={() => {
                  Object.keys(arrays).length < 9
                    ? addNewItem(
                        { [`${itemNameInput}`]: userInput.split(" ") },
                        { [`${itemNameInput}`]: descriptionInput }
                      )
                    : null;
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
