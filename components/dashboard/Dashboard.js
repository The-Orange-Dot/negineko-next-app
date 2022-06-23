import React, { useEffect, useState } from "react";
import styles from "../../styles/dashboard.module.css";
import { useSession, signOut } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas } from "../NumberWithCommas.ts";
import { Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { stream } from "xlsx";

const Dashboard = () => {
  const connection = useSelector((state) => state.socket.connected);
  const session = useSession();
  const userData = useSelector((state) => state.user.userData);
  const [lastStreamTitle, setLastStreamTitle] = useState("");
  const [lastStreamDate, setLastStreamDate] = useState("");
  const [parsedUserData, setParsedUserData] = useState(JSON.parse(userData));
  const [streamHistory, setStreamHistory] = useState([]);

  useEffect(
    () => {
      console.log(`Server connection: ${connection}`);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [connection]
  );

  console.log(parsedUserData);

  useEffect(() => {
    if (parsedUserData.name === "Undefined") {
      setParsedUserData(JSON.parse(userData));
    }
    const parsed = JSON.parse(userData);

    if (parsed.name && parsed.name !== "Undefined") {
      const streamHistory = parsed?.streamHistory.map((stream) => {
        return (
          <Paper key={stream.id} className={styles.historyCard}>
            <Link href={stream.url} passHref={true}>
              <span className={styles.streamHistoryThumbnail}>
                <Image
                  src={stream?.thumbnail}
                  width={250}
                  height={141}
                  alt="img"
                  blurDataURL={stream?.thumbnail}
                />
              </span>
            </Link>

            <span className={styles.streamHistoryContent}>
              <h4>{stream.title}</h4>
              <p>Date: {stream.date.slice(0, 10)}</p>
              <div className={styles.streamHistoryInfo}>
                <p>Views: {numberWithCommas(stream.viewCount)}</p>
                <p>Duration: {stream.duration}</p>
              </div>
            </span>
          </Paper>
        );
      });
      setStreamHistory(streamHistory);
      setLastStreamDate(parsed.streamHistory[0].date.slice(0, 10));
    }
  }, [userData, parsedUserData.name]);

  if (parsedUserData.name !== "Undefined") {
    if (session.status === "loading") {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else if (session.status === "authenticated") {
      return (
        <div className={styles.dashboardContainer}>
          {parsedUserData?.image ? (
            <Image
              src={parsedUserData?.image}
              width={200}
              height={200}
              alt="img"
              className={styles.streamerImage}
            />
          ) : null}
          <h1>{parsedUserData?.name}</h1>

          <h3 style={{ marginBottom: 0 }}>Streamer Info</h3>
          <Paper className={styles.dashboardStreamerContainer} sx={{ m: 1 }}>
            <div>
              <div>
                <p>
                  Viewer Count: {numberWithCommas(parsedUserData?.viewCount)}
                </p>
                <p>Followers: {numberWithCommas(parsedUserData?.followers)}</p>
                <p>
                  Partnered:{" "}
                  {parsedUserData?.broadcasterType === "partner"
                    ? "Yes"
                    : "Not yet"}
                </p>
                <p>Language: {parsedUserData?.language?.toUpperCase()}</p>
              </div>
              <div>
                <p>
                  Last Streamed: {lastStreamDate} in{" "}
                  {parsedUserData?.lastStreamed}
                </p>
              </div>
            </div>
          </Paper>
          <h3 style={{ marginBottom: 0 }}>Past Streams</h3>
          <Paper sx={{ m: 1 }} className={styles.streamHistoryContainer}>
            {streamHistory}
          </Paper>
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      );
    } else if (session.status === "unauthenticated") {
      console.log("Unauthorized");
      router.push("/auth/signin");
    }
  } else {
    return <div></div>;
  }
};

export default Dashboard;
