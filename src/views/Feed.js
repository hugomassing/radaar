import React, { useState, useEffect, useMemo, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import ReactPlaceholder from "react-placeholder";
import isBetween from "dayjs/plugin/isBetween";
import Track from "../components/Track";
import { motion } from "framer-motion";
import TrackPlaceholder from "../components/TrackPlaceholder";
import Empty from "../components/Empty";
import AuthContext from "../Auth.context";
dayjs.extend(isBetween);

const EmptyContent = styled.div`
  display: flex;
  justify-content: center;
`;
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

const Green = styled.a`
  color: #03da8c;
`;

const DateLabel = styled.div`
  line-height: 24px;
  font-size: 16px;
  color: #aaaaaa;
`;

const dateRanges = [
  {
    label: "today",
    dateRange: [
      dayjs(),
      dayjs()
        .startOf("day")
        .subtract(1, "day")
        .add(1, "minute")
    ]
  },
  {
    label: "yesterday",
    dateRange: [
      dayjs()
        .startOf("day")
        .subtract(1, "day")
        .add(1, "minute"),
      dayjs()
        .startOf("day")
        .subtract(2, "day")
        .add(1, "minute")
    ]
  },
  {
    label: "last week",
    dateRange: [
      dayjs()
        .startOf("day")
        .subtract(2, "day")
        .add(1, "minute"),
      dayjs()
        .startOf("day")
        .subtract(1, "week")
        .add(1, "minute")
    ]
  },
  {
    label: "last month",
    dateRange: [
      dayjs()
        .startOf("day")
        .subtract(1, "week")
        .add(1, "minute"),
      dayjs()
        .subtract(1, "month")
        .add(1, "minute")
    ]
  },
  {
    label: "old af",
    dateRange: [
      dayjs()
        .startOf("day")
        .subtract(1, "month")
        .add(1, "minute"),
      dayjs("1992-02-22")
    ]
  }
];
const Feed = ({ setSelectedMenu }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useContext(AuthContext);
  const localArtists = useMemo(
    () => JSON.parse(localStorage.getItem("artists")) || [],
    []
  );
  useEffect(() => {
    const fetchTracks = artists => {
      setLoading(true);
      Promise.all(
        artists.map(artistId =>
          axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/albums?country=FR`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }
          )
        )
      )
        .then(responses => responses.map(res => res.data.items).flat())
        .then(responses =>
          Promise.all(
            responses.map(async element => {
              if (
                element.album_group === "appears_on" &&
                element.album_type !== "compilation"
              ) {
                const {
                  data: { items }
                } = await axios.get(
                  `https://api.spotify.com/v1/albums/${element.id}/tracks`,
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                  }
                );
                return {
                  ...element,
                  artists: [
                    ...element.artists,
                    ...items.map(track => track.artists).flat()
                  ].reduce(
                    (unique, item) =>
                      unique.find(({ id }) => id === item.id)
                        ? unique
                        : [...unique, item],
                    []
                  )
                };
              }
              return element;
            })
          )
        )
        .then(tracksRes => {
          setTracks(tracksRes);
          setLoading(false);
        });
    };
    fetchTracks(localArtists);
  }, [localArtists, setTracks, accessToken]);

  return localArtists.length > 0 ? (
    <div>
      <H1>Releases</H1>
      <TrackList>
        {loading ? (
          <>
            <DateLabel>
              <Green>today</Green>
            </DateLabel>
            {[0, 1, 2, 3, 4, 5, 6].map((i, index) => (
              <ReactPlaceholder customPlaceholder={<TrackPlaceholder />} />
            ))}
          </>
        ) : (
          dateRanges.map(range => {
            return tracks
              .filter(track => track.album_type !== "compilation")
              .reduce(
                (unique, item) =>
                  unique.find(({ id }) => id === item.id)
                    ? unique
                    : [...unique, item],
                []
              )
              .sort(
                (a, b) => new Date(b.release_date) - new Date(a.release_date)
              )
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
                    {index === 0 && (
                      <DateLabel>
                        {range.label === "today" ? (
                          <Green>{range.label}</Green>
                        ) : (
                          range.label
                        )}
                      </DateLabel>
                    )}
                    <Track key={track.id} track={track}></Track>
                  </>
                );
              });
          })
        )}
      </TrackList>
    </div>
  ) : (
    <EmptyContent>
      <Empty onArtistClick={() => setSelectedMenu("artists")} />
    </EmptyContent>
  );
};
export default Feed;
