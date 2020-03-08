import React from "react";
import styled, { css } from "styled-components";
import LikeButton from "./LikeButton";

const ArtistContainer = styled.div`
  background: #f2f2f2;
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
`;

const Artwork = styled.div`
  height: 280px;
  width: 280px;
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
    images: [profileImage],
    genres
  },
  heartSelected,
  onHeartClick
}) => {
  return (
    <ArtistContainer>
      <Artwork url={profileImage.url} />
      <ArtistInfos>
        <ArtistName>{name}</ArtistName>
        <Genres>{genres.join(", ")}</Genres>
        <StyledLikeButton onClick={onHeartClick} />
      </ArtistInfos>
    </ArtistContainer>
  );
};

export default Artist;
