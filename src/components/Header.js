import React from "react";
import styled, { css } from "styled-components";

const HeaderContainer = styled.div`
  height: 80px;
  width: 100%;
  background-color: #03da8c;
  color: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
`;

const Logo = styled.div`
  line-height: 40px;
  font-size: 32px;
  font-style: italic;
  font-weight: bold;
  margin-left: 80px;
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
  cursor: pointer;
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

const Header = ({ setSelectedMenu, selectedMenu }) => (
  <HeaderContainer>
    <Logo>Radaar</Logo>
    <Menu>
      <MenuItem
        selected={selectedMenu === "feed"}
        onClick={() => setSelectedMenu("feed")}
      >
        Releases
      </MenuItem>
      <MenuItem
        selected={selectedMenu === "artists"}
        onClick={() => setSelectedMenu("artists")}
      >
        Artists
      </MenuItem>
    </Menu>
  </HeaderContainer>
);

export default Header;
