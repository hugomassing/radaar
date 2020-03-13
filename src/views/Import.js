import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Artist from "../components/Artist";

const H1 = styled.h1`
  line-height: 40px;
  font-size: 32px;
  margin-bottom: 24px;
`;

const Button = styled.button`
  padding: 16px 32px;
  background-color: #03da8c;
  color: white;
  border-radius: 32px;
  font-weight: bold;
  border: none;
  line-height: 24px;
  font-size: 16px;
  cursor: pointer;
  font: inherit;
`;

const Artists = styled.div`
  margin-top: 40px;
  position: relative;
  display: grid;
  grid: auto-flow / 1fr 1fr 1fr;
  grid-gap: 40px;
`;
const scopes = ["user-follow-read"];

const Import = ({}) => {
  const [authToken, setAuthToken] = useState(null);
  const [artists, setArtists] = useState(null);
  const [localArtists, setLocalArtists] = useState(
    JSON.parse(localStorage.getItem("artists")) || []
  );
  const token = window.location.hash
    .substr(1)
    .split("&")[0]
    .split("=")[1];

  if (token) {
    window.opener.postMessage({
      status: "auth_token",
      token: token
    });
    window.close();
  }

  useEffect(() => {
    localStorage.setItem("artists", JSON.stringify(localArtists));
  }, [localArtists]);

  useEffect(() => {
    window.addEventListener(
      "message",
      ({ data }) => {
        if (data.status === "auth_token") {
          setAuthToken(data.token);
        }
      },
      false
    );
  });

  useEffect(() => {
    if (authToken) {
      fetch("https://api.spotify.com/v1/me/following?type=artist", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setArtists(data.artists.items);
        });
    }
  }, [authToken]);

  const login = () => {
    const redirectUrl = encodeURIComponent("http://localhost:3000/import");
    window.open(
      `https://accounts.spotify.com/authorize?client_id=${
        process.env.REACT_APP_SPOTIFY_CLIENT_ID
      }&response_type=token&redirect_uri=${redirectUrl}&scope=${scopes.join(
        ","
      )}&show_dialog=true`,
      "Login with Spotify",
      "width=800,height=600"
    );
  };

  const handleArtist = artistId => {
    if (localArtists.includes(artistId)) {
      setLocalArtists(localArtists.filter(id => id !== artistId));
    } else {
      setLocalArtists([...localArtists, artistId]);
    }
  };

  return (
    <div>
      <H1>Import your artists</H1>
      {!authToken && <Button onClick={login}>Connect with Spotify</Button>}
      {artists && (
        <Artists>
          {artists.map(artist => {
            debugger;
            return (
              <Artist
                artist={artist}
                heartSelected={localArtists.includes(artist.id)}
                onHeartClick={() => handleArtist(artist.id)}
              />
            );
          })}
        </Artists>
      )}
    </div>
  );
};

export default Import;
