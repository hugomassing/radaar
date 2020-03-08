import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import groupBy from "lodash/groupBy";
import Track from "../components/Track";

dayjs.extend(isBetween);
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

const DateLabel = styled.div`
  line-height: 24px;
  font-size: 16px;
  color: #aaaaaa;
`;

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
          axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/albums?country=FR`,
            {
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`
              }
            }
          )
        )
      )
        .then(responses => responses.map(res => res.data.items))
        .then(tracksRes => setTracks(tracksRes.flat()));
    };

    fetchTracks(localArtists);
  }, [localArtists, setTracks]);

  const dateRanges = [
    { label: "today", dateRange: [dayjs(), dayjs().subtract(1, "day")] },
    {
      label: "yesterday",
      dateRange: [dayjs().subtract(1, "day"), dayjs().subtract(2, "day")]
    },
    {
      label: "last week",
      dateRange: [dayjs().subtract(2, "day"), dayjs().subtract(1, "week")]
    },
    {
      label: "last month",
      dateRange: [dayjs().subtract(1, "week"), dayjs().subtract(1, "month")]
    },
    {
      label: "old af",
      dateRange: [dayjs().subtract(1, "month"), dayjs("1992-02-22")]
    }
  ];

  return (
    <div>
      <H1>Releases</H1>
      <TrackList>
        {dateRanges.map(range => {
          return tracks
            .filter(track => track.album_type !== "compilation")
            .reduce(
              (unique, item) =>
                unique.find(({ id }) => id === item.id)
                  ? unique
                  : [...unique, item],
              []
            )
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .slice(0, 30)
            .filter(track =>
              dayjs(track.release_date).isBetween(
                range.dateRange[0],
                range.dateRange[1]
              )
            )
            .map((track, index) => {
              return (
                <>
                  {index === 0 && <DateLabel>{range.label}</DateLabel>}
                  <Track key={track.id} track={track}></Track>
                </>
              );
            });
        })}
      </TrackList>
    </div>
  );
};

export default Feed;
