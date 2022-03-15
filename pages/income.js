import React from "react";
import { numberWithCommas } from "../components/NumberWithCommas";
import twitch from "./twitch-income.json";
import styles from "../styles/Income.module.css";

const Income = () => {
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
  for (let i = 100; i < 200; i++) {
    const user = twitch[i];
    const income = user.streamer.split(" ");
    next100 += parseInt(income[3]);
  }

  //Median income
  const middleUser = twitch[twitch.length / 2];
  const median = middleUser.streamer.split(" ")[3];

  //Maps through all users and pulls their info
  const streamers = twitch.map((streamer) => {
    const streamerArray = streamer.streamer.split(" ");
    const rank = streamerArray[0];
    const username = streamerArray[1];
    const streamerId = streamerArray[2];
    const income = numberWithCommas(streamerArray[3]);

    return (
      <div key={rank}>
        <p>Rank: {rank}</p>
        <p>
          Username: <strong>{username}</strong>
        </p>
        {/* <p>Streamer Id: {streamerId}</p> */}
        <p>Income: ${income}</p>
        <p>==================================</p>
      </div>
    );
  });

  return (
    <div className={styles.incomePageContainer}>
      <div className={styles.calculationsContainer}>
        <div>
          <h2>Total: ${numberWithCommas(sum)}</h2>
          <h2>Average: ${numberWithCommas(sum / twitch.length)}</h2>
          <h2>Median: ${numberWithCommas(median)}</h2>
        </div>
        <div>
          <h2>Top 20 Total: ${numberWithCommas(top20)}</h2>
          <h2>Top 20 Average: ${numberWithCommas(top20 / 20)}</h2>
        </div>
        <div>
          <h2>Next 50 Total: ${numberWithCommas(next50)}</h2>
          <h2>Next 50 Average: ${numberWithCommas(next50 / 50)}</h2>
        </div>
        <div>
          <h2>Next 100 Total: ${numberWithCommas(next100)}</h2>
          <h2>Next 100 Average: ${numberWithCommas(next100 / 100)}</h2>
        </div>
      </div>
      <div className={styles.incomeContainer}>{streamers}</div>
    </div>
  );
};

export default Income;
