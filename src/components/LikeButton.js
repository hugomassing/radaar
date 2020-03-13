import React from "react";
import styled, { css } from "styled-components";
import { ReactComponent as LikeIcon } from "../img/like-empty.svg";
import { ReactComponent as LikeEmptyIcon } from "../img/like-full.svg";
import { motion } from "framer-motion";

const LikeContainer = styled(motion.i)`
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
  ${({ small }) =>
    small &&
    css`
      height: 24px;
      width: 24px;
    `}
`;

const LikeButton = ({ active, small = false, ...rest }) => (
  <LikeContainer whileHover={{ scale: 1.2 }} small={small} {...rest}>
    {active ? <LikeIcon /> : <LikeEmptyIcon />}
  </LikeContainer>
);

export default LikeButton;
