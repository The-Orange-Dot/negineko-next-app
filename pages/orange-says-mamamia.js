import React, { useState } from "react";
import { numberWithCommas } from "../components/NumberWithCommas";
import twitch from "./twitch-income.json";
import styles from "../styles/Income.module.css";
import Link from "next/link";

const Income = () => {
  const [streamers, setStreamers] = useState(twitch);

  //Calculates Sum
  const sum = twitch.reduce((total, income) => {
    const streamerArray = income.streamer.split(" ");
    // console.log(parseInt(streamerArray[3]));
    return (total += parseInt(streamerArray[3]));
  }, 0);

  //Top 15 sum
  let top20 = 0;
  for (let i = 0; i < 20; i++) {
    const user = twitch[i];
    const income = user.streamer.split(" ");
    top20 += parseInt(income[3]);
  }

  //Next 50
  let next50 = 0;
  for (let i = 20; i < 70; i++) {
    const user = twitch[i];
    const income = user.streamer.split(" ");
    next50 += parseInt(income[3]);
  }

  //Next 100
  let next100 = 0;
  for (let i = 70; i < 170; i++) {
    const user = twitch[i];
    const income = user.streamer.split(" ");
    next100 += parseInt(income[3]);
  }

  //Next 1000
  let next1000 = 0;
  for (let i = 170; i < 1070; i++) {
    const user = twitch[i];
    const income = user.streamer.split(" ");
    next1000 += parseInt(income[3]);
  }

  //Median income
  const middleUser = twitch[twitch.length / 2];
  const median = middleUser.streamer.split(" ")[3];

  //Maps through all users and pulls their info
  const streamersArray = streamers.map((streamer) => {
    const streamerArray = streamer.streamer.split(" ");
    const rank = streamerArray[0];
    const username = streamerArray[1];
    const streamerId = streamerArray[2];
    const income = numberWithCommas(streamerArray[3]);

    return (
      <Link
        href={`https://twitchtracker.com/${username}`}
        passHref={true}
        key={rank}
      >
        <span className={styles.streamerCard}>
          <p>Rank: {numberWithCommas(rank)}</p>
          <p>
            Username: <strong>{username}</strong>
          </p>
          {/* <p>Streamer Id: {streamerId}</p> */}
          <p>Income: ${income}</p>
          <p>=======================</p>
        </span>
      </Link>
    );
  });

  const filterHandler = (e) => {
    const filteredStreamer = twitch.filter((streamer) => {
      return streamer.streamer
        .split(" ")[1]
        .toLowerCase()
        .includes(e.toLowerCase());
    });
    e === "" ? setStreamers(twitch) : setStreamers(filteredStreamer);
  };

  const medianFunction = (a, b = a) => {
    const sum =
      parseInt(twitch[a].streamer.split(" ")[3]) +
      parseInt(twitch[b].streamer.split(" ")[3]);
    return numberWithCommas(sum / 2);
  };

  return (
    <div className={styles.incomePageContainer}>
      <div className={styles.calculationsContainer}>
        <div>
          <p>Data of Twitch streamer income as of October, 2021.</p>
          <p>
            Data does not include donations, sponsors, or any income outside of
            Twitch.
          </p>
        </div>
        <div className={styles.topQuickLook}>
          <div>
            <h2>Top 20</h2>
            <h3>Total: ${numberWithCommas(top20)}</h3>
            <h3>Average: ${numberWithCommas(top20 / 20)}</h3>
            <h3>Median: ${medianFunction(9, 10)}</h3>
          </div>
          <div>
            <h2>Next 50</h2>
            <h3>Total: ${numberWithCommas(next50)}</h3>
            <h3>Average: ${numberWithCommas(next50 / 50)}</h3>
            <h3>Median: ${medianFunction(34, 35)}</h3>
          </div>
          <div>
            <h2>Next 100</h2>
            <h3>Total: ${numberWithCommas(next100)}</h3>
            <h3>Average: ${numberWithCommas(next100 / 100)}</h3>
            <h3>Median: ${medianFunction(84, 85)}</h3>
          </div>
          <div>
            <h2>Next 1,000</h2>
            <h3>Total: ${numberWithCommas(next1000)}</h3>
            <h3>Average: ${numberWithCommas(next1000 / 1000)}</h3>
            <h3>Median: ${medianFunction(584, 585)}</h3>
          </div>
        </div>
        <div>
          <div>
            <h2>Total Dataset (n = 10,000)</h2>
            <h3>Total: ${numberWithCommas(sum)}</h3>
            <h3>Average: ${numberWithCommas(sum / twitch.length)}</h3>
            <h3>Median: ${numberWithCommas(median)}</h3>
          </div>
          <form className={styles.filterform}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              onChange={(e) => filterHandler(e.target.value)}
            />
          </form>
        </div>
      </div>
      {streamers.length !== 0 ? (
        <div className={styles.incomeContainer}>{streamersArray}</div>
      ) : (
        <div className={styles.incomeContainer}>
          <p>That streamer is not on this list</p>
        </div>
      )}
    </div>
  );
};

export default Income;
