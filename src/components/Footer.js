import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Heart } from "../img/like-full.svg";
import { ReactComponent as Empty } from "../img/like-empty.svg";

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

const Love = styled.div`
  path {
    fill: #03da8c;
  }
  margin: 0 8px;
  cursor: pointer;
`;

const Green = styled.a`
  color: #03da8c;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  margin-left: 8px;
`;

const Footer = () => {
  const [empty, setEmpty] = useState(false);
  return (
    <FooterWrapper>
      Made with
      <Love onClick={() => setEmpty(!empty)}>
        {!empty ? (
          <Heart height="16px" width="16px" />
        ) : (
          <Empty height="16px" width="16px" />
        )}
      </Love>
      by{"  "}
      <Green
        target="_blank"
        rel="noopener"
        href="https://github.com/hugomassing"
      >
        Hugo Massing
      </Green>
    </FooterWrapper>
  );
};

export default Footer;
