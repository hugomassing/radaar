import React from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../img/search.svg";
import Green from "./Green";

const EmptyWrapper = styled.div`
  max-width: 640px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmptyText = styled.p`
  font-size: 32px;
  text-align: center;
  margin-top: 32px;
`;

const Empty = ({ onArtistClick }) => (
  <EmptyWrapper>
    <Search />
    <EmptyText>
      Oops! Looks like you are not following any artists. Go to the{" "}
      <Green link onClick={onArtistClick}>
        artist
      </Green>{" "}
      page to add your favorite artists.
    </EmptyText>
  </EmptyWrapper>
);

export default Empty;
