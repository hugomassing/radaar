import React from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";
import { motion } from "framer-motion";

const ArtistContainer = styled(motion.div)`
  background: #f2f2f2;
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;
const Artwork = styled.div`
  height: 256px;
  width: 256px;

  background-color: #d2d2d2;
  border-radius: 2px;
  background-image: url(${p => p.url});
  background-size: cover;
`;
const ArtistInfos = styled.div`
  margin-top: 24px;
  position: relative;
`;
const ArtistName = styled.p`
  line-height: 40px;
  font-size: 32px;
  width: calc(100% - 48px);
`;
const Genres = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
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
    genres
  },
  heartSelected,
  onHeartClick
}) => {
  return (
    <ArtistContainer
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      <Artwork url={profileImageMedium.url} />
      <ArtistInfos>
        <ArtistName>{name}</ArtistName>
        <Genres>{genres.slice(1, 10).join(", ")}</Genres>
        <StyledLikeButton onClick={onHeartClick} active={!heartSelected} />
      </ArtistInfos>
    </ArtistContainer>
  );
};
export default Artist;
