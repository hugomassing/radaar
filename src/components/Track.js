import React from "react";
import styled, { css } from "styled-components";

const TrackContainer = styled.div`
  width: 100%;
  background: #f2f2f2;
  border-radius: 8px;
  padding: 16px;
  display: flex;
`;

const Artwork = styled.div`
  height: 80px;
  width: 80px;
  background-color: #d2d2d2;
  border-radius: 2px;
  background-image: url(${p => p.url});
  background-size: cover;
`;

const TrackInfos = styled.div`
  margin-left: 24px;
`;

const TrackName = styled.p`
  line-height: 32px;
  font-size: 24px;
`;

const Artist = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
`;
const Misc = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
`;

const Track = ({
  track: {
    name,
    artists,
    album_type,
    release_date,
    labelName,
    images: [artwork]
  }
}) => (
  <TrackContainer>
    <Artwork url={artwork.url} />
    <TrackInfos>
      <TrackName>{name}</TrackName>
      <Artist>{artists.map(artist => artist.name).join(", ")}</Artist>
      <Misc>
        {album_type} - {release_date}
      </Misc>
    </TrackInfos>
  </TrackContainer>
);

export default Track;
