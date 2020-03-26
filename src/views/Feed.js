import React, { useMemo } from "react";
import styled from "styled-components";
import useAxios from "axios-hooks";
import dayjs from "dayjs";
import ReactPlaceholder from "react-placeholder";
import isBetween from "dayjs/plugin/isBetween";
import Track from "../components/Track";
import TrackPlaceholder from "../components/TrackPlaceholder";
import Empty from "../components/Empty";
import Green from "../components/Green";
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
        .subtract(2, "day")
        .subtract(1, "week")
        .day(0)
        .add(1, "minute")
    ]
  },
  {
    label: "last month",
    dateRange: [
      dayjs()
        .startOf("day")
        .subtract(2, "day")
        .subtract(1, "week")
        .day(0)
        .add(1, "minute"),
      dayjs()
        .startOf("day")
        .subtract(1, "month")
        .date(1)
        .add(1, "minute")
    ]
  },
  {
    label: "old af",
    dateRange: [
      dayjs()
        .startOf("day")
        .subtract(1, "month")
        .date(1)
        .add(1, "minute"),
      dayjs("1992-02-22")
    ]
  }
];
const Feed = ({ setSelectedMenu }) => {
  const localArtists = useMemo(
    () => JSON.parse(localStorage.getItem("artists")) || [],
    []
  );

  const [{ data, loading }] = useAxios({
    url: `https://radaar-back.now.sh/api/get-tracks?ids=${localArtists.join(
      ","
    )}`
  });

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
            return data
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
