import React from "react";
import styled from "styled-components";
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
  const maazelId = "4w5LgUT6bfJnNq6wSFbND7";
  const [{ data, loading, error }] = useAxios({
    url: `https://api.spotify.com/v1/artists/${maazelId}/albums`,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`
    }
  });
  console.log(data);
  return (
    <div>
      <H1>Releases</H1>
      {!loading && (
        <TrackList>
          {data.items.map(track => (
            <Track track={track}></Track>
          ))}
        </TrackList>
      )}
    </div>
  );
};

export default Feed;
