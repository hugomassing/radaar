import React from "react";
import styled, { css } from "styled-components";

const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  background-color: #03da8c;
  color: white;
  display: flex;
  align-items: center;
  padding-left: 80px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
`;

const Logo = styled.div`
  line-height: 40px;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
`;

const Menu = styled.ul`
  display: inline-flex;
  margin-left: 80px;
`;
const MenuItem = styled.li`
  position: relative;
  margin: 0 16px;
  line-height: 24px;
  font-size: 16px;
  ${({ selected }) =>
    selected &&
    css`
      :after {
        content: "";
        position: absolute;
        left: calc(50% - 8px);
        bottom: -4px;
        background-color: white;
        border-radius: 2px;
        height: 4px;
        width: 16px;
      }
    `}
`;

const Header = () => (
  <HeaderContainer>
    <Logo>Radaar</Logo>
    <Menu>
      <MenuItem selected>Releases</MenuItem>
      <MenuItem>Artists</MenuItem>
    </Menu>
  </HeaderContainer>
);

export default Header;
