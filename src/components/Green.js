import React from "react";
import styled from "styled-components";

const GreenLink = styled.a`
  color: #03da8c;
  cursor: pointer;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;
const GreenSpan = styled.span`
  color: #03da8c;
`;

const Green = ({ children, link, ...rest }) =>
  link ? (
    <GreenLink {...rest}>{children}</GreenLink>
  ) : (
    <GreenSpan {...rest}>{children}</GreenSpan>
  );

export default Green;
