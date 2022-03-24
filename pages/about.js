import React, { useEffect, useState } from "react";

const About = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    //CHANGE THE CLIENT_ID AND SECRET_ID ASAP!!
    fetch("/api/userInfo")
      .then((r) => r.json())
      .then((client) => {
        fetch(
          `https://id.twitch.tv/oauth2/token?client_id=${client.clientId}&client_secret=${client.secretKey}&grant_type=client_credentials`,
          {
            method: "POST",
          }
        )
          .then((r) => r.json())
          .then((data) =>
            fetch(
              "https://api.twitch.tv/helix/channels?broadcaster_id=517372804",
              {
                headers: {
                  Authorization: `Bearer ${data.access_token}`,
                  "Client-Id": "05rkef9kwzbr5jdi4ahjbuj3uc83ov",
                },
              }
            )
              .then((r) => r.json())
              .then((data) => setUser(data))
          );
      });
  }, []);

  console.log(user);
  return (
    <div>
      <p>Also under construction</p>
      <div>
        <h2>NegiNeko Team</h2>
        <div>
          <h3>Negi</h3>
        </div>
        <div>
          <h3>Orange</h3>
        </div>
      </div>
      <div>
        <h3>Charity Event - Canadian Red Cross</h3>
        <p>Ukrainain Humanitarian Crisis Appeal</p>
        <p>Raised CA$2,371 to provide humanitarian relief in Ukraine</p>
      </div>
      <div></div>
    </div>
  );
};

export default About;
