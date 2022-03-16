import React from "react";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  return (
    <div>
      <iframe
        src="https://clips.twitch.tv/embed?clip=VenomousAmusedGoshawkPeteZarollTie-diDSdov6AKInIMI0&parent=localhost"
        allowFullScreen={true}
        scrolling="no"
        height="378"
        width="620"
        autoPlay="true"
        mute="true"
      ></iframe>
    </div>
  );
};

export default Dashboard;
