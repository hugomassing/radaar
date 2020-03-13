import React from "react";
import styled, { css } from "styled-components";
import { ellipsis } from "polished";
import LikeButton from "./LikeButton";
import { motion } from "framer-motion";

const ArtistContainer = styled(motion.div)`
  background: #f2f2f2;
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  ${({ small }) =>
    small &&
    css`
      padding: 16px;
    `}
`;
const Artwork = styled.div`
  height: 256px;
  width: 256px;

  background-color: #d2d2d2;
  border-radius: 2px;
  background-image: url(${p => p.url});
  background-size: cover;
  ${({ small }) =>
    small &&
    css`
      height: 128px;
      width: 128px;
    `}
`;
const ArtistInfos = styled.div`
  height: 80px;
  margin-top: 24px;
  position: relative;
  ${({ small }) =>
    small &&
    css`
      height: 64px;
      margin-top: 16px;
    `}
`;
const ArtistName = styled.p`
  line-height: 40px;
  font-size: 32px;
  width: calc(256px - 48px + 4px);
  ${({ small }) =>
    small &&
    css`
      width: calc(128px - 24px + 4px);
      line-height: 24px;
      font-size: 16px;
    `}
`;

const Genres = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
  ${ellipsis("256px")}
  ${({ small }) =>
    small &&
    css`
      ${ellipsis("128px")}
    `}
`;

const StyledLikeButton = styled(LikeButton)`
  position: absolute;
  right: 0;
  top: 0;
`;

const Artist = ({
  artist: {
    name,
    images: [profileImageLarge, profileImageMedium],
    genres,
    external_urls
  },
  heartSelected,
  onHeartClick,
  small = false
}) => {
  return (
    <ArtistContainer
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
      small={small}
    >
      <a href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
        <Artwork
          url={profileImageMedium && profileImageMedium.url}
          small={small}
        />
      </a>
      <ArtistInfos small={small}>
        <ArtistName
          small={small}
          href={external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <a
            href={external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            {name}
          </a>
        </ArtistName>
        <Genres small={small}>
          {genres.slice(1, small ? 2 : 10).join(", ")}
        </Genres>
        <StyledLikeButton
          onClick={onHeartClick}
          active={!heartSelected}
          small={small}
        />
      </ArtistInfos>
    </ArtistContainer>
  );
};

export default Artist;
