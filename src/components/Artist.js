import React from "react";
import styled, { css } from "styled-components";

const ArtistContainer = styled.div``;

const Artist = ({ artist }) => {
  return <ArtistContainer>{artist.name}</ArtistContainer>;
};

export default Artist;
