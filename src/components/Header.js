import React from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

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

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const Header = ({ setSelectedMenu, selectedMenu }) => (
  <HeaderContainer>
    <Logo>
      <StyledLink to="/">Radaar</StyledLink>
    </Logo>
    <Menu>
      <MenuItem>
        <StyledLink to="/">Releases</StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/artists">Artists</StyledLink>
      </MenuItem>
    </Menu>
  </HeaderContainer>
);

export default Header;
