import React from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Search from "./SearchInput";

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
          transition: all 0.3 ease-in-out;
        }
      `}
    :hover {
    text-decoration: none;
  }
`;

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`;

const StyledSearch = styled(Search)`
  margin-left: 32px;
`;

const Header = ({ search, setSearch }) => {
  const location = useLocation();
  return (
    <HeaderContainer>
      <Logo>
        <StyledLink to="/" onClick={() => setSearch("")}>
          Radaar
        </StyledLink>
      </Logo>

      <Menu>
        <MenuItem selected={location.pathname === "/"}>
          <StyledLink to="/" onClick={() => setSearch("")}>
            Releases
          </StyledLink>
        </MenuItem>
        <MenuItem selected={location.pathname === "/artists"}>
          <StyledLink to="/artists" onClick={() => setSearch("")}>
            My artists
          </StyledLink>
        </MenuItem>
      </Menu>
      <StyledSearch
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="search an artist"
        results={null}
      />
    </HeaderContainer>
  );
};

export default Header;
