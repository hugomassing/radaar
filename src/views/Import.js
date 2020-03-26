import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Artist from "../components/Artist";
import Green from "../components/Green";
import ArtistsLayout from "../components/ArtistsLayout";

import useSpotifyToken from "../hooks/useSpotifyToken";

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

const Label = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #aaaaaa;
`;

const scopes = ["user-follow-read", "user-top-read"];

const Import = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [artists, setArtists] = useState(null);
  const { spotifyToken, setToken } = useSpotifyToken();
  const [localArtists, setLocalArtists] = useState(
    JSON.parse(localStorage.getItem("artists")) || []
  );
  const token = window.location.hash
    ?.substr(1)
    ?.split("&")[0]
    ?.split("=")[1];

  const expiresIn = window.location.hash
    ?.substr(1)
    ?.split("&")[2]
    ?.split("=")[1];

  if (token) {
    window.opener.postMessage({
      status: "auth_token",
      token: token,
      expiresIn: expiresIn
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
          setToken(data.token, data.expiresIn);
        }
      },
      false
    );
  });

  useEffect(() => {
    if (spotifyToken) {
      fetch("https://api.spotify.com/v1/me/following?type=artist&limit=50", {
        headers: {
          Authorization: `Bearer ${spotifyToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setArtists(data.artists.items);
        });
      fetch("https://api.spotify.com/v1/me/top/artists?limit=50", {
        headers: {
          Authorization: `Bearer ${spotifyToken}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setTopArtists(data.items);
        });
    }
  }, [spotifyToken]);

  const login = () => {
    const redirectUrl = encodeURIComponent(
      `${process.env.REACT_APP_DOMAIN}/import`
    );
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
      {!spotifyToken && <Button onClick={login}>Connect with Spotify</Button>}
      {artists && (
        <>
          <Label>
            Artists you are following on <Green>Spotify</Green>
          </Label>
          <ArtistsLayout small>
            {artists.map(artist => {
              return (
                <Artist
                  key={artist.id}
                  artist={artist}
                  heartSelected={localArtists.includes(artist.id)}
                  onHeartClick={() => handleArtist(artist.id)}
                  small
                />
              );
            })}
          </ArtistsLayout>
        </>
      )}
      {topArtists && (
        <>
          <Label>
            Your top artists on <Green>Spotify</Green>
          </Label>
          <ArtistsLayout small>
            {topArtists.map(artist => {
              return (
                <Artist
                  key={artist.id}
                  artist={artist}
                  heartSelected={localArtists.includes(artist.id)}
                  onHeartClick={() => handleArtist(artist.id)}
                  small
                />
              );
            })}
          </ArtistsLayout>
        </>
      )}
    </div>
  );
};

export default Import;
