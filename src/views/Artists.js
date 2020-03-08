import React, { useState } from "react";
import styled from "styled-components";
import useAxios from "axios-hooks";
import Artist from "../components/Artist";

const H1 = styled.h1`
  line-height: 40px;
  font-size: 32px;
  margin-bottom: 24px;
`;

const SearchResults = styled.ul`
  background-color: white;
  padding: 8px 0;
  margin-top: 8px;
  border-radius: 4px;
  position: absolute;
  border: 1px solid #f2f2f2;
`;

const SearchItem = styled.li`
  padding: 4px 8px;
  cursor: pointer;
  :hover {
    background: #f2f2f2;
  }
`;

const Search = styled.div`
  position: relative;
`;

const Feed = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [search, setSearch] = useState("");
  const localArtists = JSON.parse(localStorage.getItem("artists")) || [];
  const [{ data, loading, error }] = useAxios({
    url: `https://api.spotify.com/v1/artists/?ids=${localArtists.join(",")}`,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`
    }
  });
  const [
    { data: searchData, loading: searchLoading, error: searchError }
  ] = useAxios({
    url: `https://api.spotify.com/v1/search/?q=${encodeURI(
      search
    )}&type=artist&limit=10`,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN}`
    }
  });

  const addArtist = artist => {
    localStorage.setItem(
      "artists",
      JSON.stringify([...localArtists, artist.id])
    );
    setSearch(artist.name);
    setInputFocus(false);
  };

  return (
    <div>
      <H1>Artists</H1>
      Search a new artist
      <Search>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={e => setInputFocus(true)}
        />
        {!searchLoading && !searchError && inputFocus && searchData && (
          <SearchResults>
            {searchData.artists.items.map(artist => (
              <SearchItem key={artist.id} onClick={() => addArtist(artist)}>
                {artist.name}
              </SearchItem>
            ))}
          </SearchResults>
        )}
      </Search>
      {!loading &&
        data &&
        data.artists.map(artist => <Artist artist={artist} />)}
    </div>
  );
};

export default Feed;
