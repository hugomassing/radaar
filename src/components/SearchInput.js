import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { ReactComponent as SearchIcon } from "../img/search.svg";

const CustomInput = styled(Input)`
  border-radius: 20px;
  padding: 0 24px 0 48px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  padding: 8px 16px;
`;

const SearchResults = styled.ul`
  width: 100%;
  background-color: white;
  padding: 8px 0;
  margin-top: 8px;
  border-radius: 4px;
  position: absolute;
  border: 1px solid #f2f2f2;
  z-index: 10;
  max-height: 180px;
  overflow-y: auto;
`;

const SearchItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  :hover {
    background: #f2f2f2;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 240px;
  display: inline-block;
  margin-right: 16px;
`;

const SearchInput = ({
  value,
  onChange,
  onFocus,
  placeholder,
  results = null,
  onResultClick,
  className
}) => {
  return (
    <SearchWrapper className={className}>
      <StyledSearchIcon height={24} width={24} />
      <CustomInput
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={placeholder}
      />
      {results && (
        <SearchResults>
          {results.map(result => (
            <SearchItem key={result.id} onClick={() => onResultClick(result)}>
              {result.name}
            </SearchItem>
          ))}
        </SearchResults>
      )}
    </SearchWrapper>
  );
};

export default SearchInput;
