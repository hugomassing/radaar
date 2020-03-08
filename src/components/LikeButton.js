import React from "react";
import styled from "styled-components";
import { ReactComponent as LikeIcon } from "../img/like-empty.svg";
import { ReactComponent as LikeEmptyIcon } from "../img/like-full.svg";

const LikeContainer = styled.i`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    height: 32px;
    width: 32px;
    fill: #03da8c;
  }
`;

const LikeButton = ({ active, ...rest }) => (
  <LikeContainer {...rest}>
    {active ? <LikeIcon /> : <LikeEmptyIcon />}
  </LikeContainer>
);

export default LikeButton;
