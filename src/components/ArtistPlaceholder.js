import React from "react";
import styled from "styled-components";
import LikeButton from "./LikeButton";

const ArtistContainer = styled.div`
  background: #f2f2f2;
  border-radius: 8px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  filter: grayscale(1);
  p {
    background-color: #d2d2d2;
    font-size: 0;
  }
`;
const Artwork = styled.div`
  height: 256px;
  width: 256px;

  background-color: #d2d2d2;
  border-radius: 2px;
  background-size: cover;
`;
const ArtistInfos = styled.div`
  margin-top: 24px;
  position: relative;
`;
const ArtistName = styled.p`
  line-height: 40px;
  font-size: 32px;
  width: 200px;
`;
const Genres = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
  margin-top: 8px;
`;
const StyledLikeButton = styled(LikeButton)`
  position: absolute;
  right: 0;
  top: 0;
`;

const ArtistPlaceholder = () => {
  return (
    <ArtistContainer>
      <Artwork />
      <ArtistInfos>
        <ArtistName>Maazel</ArtistName>
        <Genres>Rock, hip hop, Bal-musette</Genres>
        <StyledLikeButton />
      </ArtistInfos>
    </ArtistContainer>
  );
};
export default ArtistPlaceholder;
