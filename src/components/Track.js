import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TrackContainer = styled(motion.div)`
  width: 100%;
  background: #f2f2f2;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  opacity: 0;
`;

const Artwork = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 2px;
  padding: 4px;
  background-color: #d2d2d2;
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
  margin-top: 4px;
`;

const Misc = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
  margin-top: 4px;
`;

const Track = ({
  track: {
    name,
    artists,
    album_type,
    images: [artwork = ""]
  }
}) => (
  <TrackContainer animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <Artwork url={artwork.url} />
    <TrackInfos>
      <TrackName>{name}</TrackName>
      <Artist>
        {artists
          .map(artist => artist.name)
          .slice(0, 10)
          .join(", ")}
      </Artist>
      <Misc>{album_type}</Misc>
    </TrackInfos>
  </TrackContainer>
);

export default Track;
