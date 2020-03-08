import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import useAxios from "axios-hooks";
import Track from "../components/Track";

const H1 = styled.h1`
  line-height: 40px;
  font-size: 32px;
  margin-bottom: 24px;
`;

const TrackList = styled.div`
  & > div {
    margin-top: 16px;
  }
`;

const tracks = [
  {
    name: "POWERMOVE",
    artists: ["PEEKABOO", "isoXO"],
    type: "Single",
    labelName: "Deadbeats"
  },
  {
    name: "FORCES",
    artists: ["Montell2099", "RL Grime"],
    type: "EP",
    labelName: "Sable Valley"
  },
  {
    name: "Come Thru (feat. Frisco) ",
    artists: ["AC Slater", "Frisco"],
    type: "Single",
    labelName: "Nightbass"
  }
];

const Feed = () => {
  const [tracks, setTracks] = useState([]);

  const localArtists = useMemo(
    () => JSON.parse(localStorage.getItem("artists")) || [],
    [localStorage]
  );
  useEffect(() => {
    const fetchTracks = artists => {
      Promise.all(
        artists.map(artistId =>
          axios.get(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`
            }
          })
        )
      )
        .then(responses => responses.map(res => res.data.items))
        .then(tracksRes => setTracks(tracksRes.flat()));
    };

    fetchTracks(localArtists);
  }, [localArtists, setTracks]);

  return (
    <div>
      <H1>Releases</H1>
      <TrackList>
        {tracks
          .filter(track => track.album_type !== "compilation")
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
          .slice(0, 50)
          .map(track => (
            <Track key={track.name} track={track}></Track>
          ))}
      </TrackList>
    </div>
  );
};

export default Feed;
