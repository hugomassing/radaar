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

const Empty = () => (
  <EmptyWrapper>
    <Search />
    <EmptyText>
      Looks like you are not following any artists. You can{" "}
      <Green>search</Green> for your favorite artists and start following them.
    </EmptyText>
  </EmptyWrapper>
);

export default Empty;
