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
  box-shadow: 4px 4px 8px rgba(204, 204, 204, 0.5);
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

const TrackName = styled.a`
  line-height: 32px;
  font-size: 24px;
  color: inherit;
  text-decoration: none;
`;

const Artists = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
  margin-top: 4px;
`;

const ArtistLink = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
    text-decoration: underline;
  }
`;

const Misc = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
  margin-top: 4px;
`;

const Track = ({
  track: {
    title,
    artists,
    artworkUri,
    type,
  }
}) => (
  <TrackContainer animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <a href={artworkUri} target="_blank" rel="noopener noreferrer">
      <Artwork url={artworkUri} />
    </a>
    <TrackInfos>
      <TrackName href={artworkUri}>{title}</TrackName>
     <Artists>
        {artists.slice(0, 10).map(({artist}, index) => (
          <>
            {index !== 0 && ", "}
            <ArtistLink
              href={artist.spotifyUri}
              target="_blank"
              rel="noopener noreferrer"
            >
              {artist.name}
            </ArtistLink>
          </>
        ))}
      </Artists>
      <Misc>{type}</Misc>
    </TrackInfos>
  </TrackContainer>
);

export default Track;
