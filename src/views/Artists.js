import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import useAxios from "axios-hooks";
import Artist from "../components/Artist";
import Green from "../components/Green";
import AuthContext from "../Auth.context";
import ReactPlaceholder from "react-placeholder";
import ArtistPlaceholder from "../components/ArtistPlaceholder";
import ArtistsLayout from "../components/ArtistsLayout";

const H1 = styled.h1`
  line-height: 40px;
  font-size: 32px;
  margin-bottom: 24px;
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

const Search = styled.div`
  position: relative;
  width: 240px;
  display: inline-block;
  margin-right: 16px;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #f2f2f2;
  padding: 0 16px;
  font: inherit;
  ::placeholder {
    color: #aaaaaa;
    font-weight: 100;
  }
  outline-color: #f2f2f2;
`;
const Feed = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [search, setSearch] = useState("");
  const { accessToken } = useContext(AuthContext);
  const [localArtists, setLocalArtists] = useState(
    JSON.parse(localStorage.getItem("artists")) || []
  );

  const [{ data: { artists } = { artists: [] }, loading }] = useAxios({
    url: `https://api.spotify.com/v1/artists/?ids=${localArtists.join(",")}`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const [
    { data: searchData, loading: searchLoading, error: searchError }
  ] = useAxios({
    url: `https://api.spotify.com/v1/search/?q=${encodeURI(
      search
    )}&type=artist&limit=10`,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  useEffect(() => {
    localStorage.setItem("artists", JSON.stringify(localArtists));
  }, [localArtists]);

  const addArtist = artist => {
    if (!localArtists.includes(artist.id))
      setLocalArtists(state => [...state, artist.id]);
    setSearch(artist.name);
    setInputFocus(false);
  };

  const removeArtist = artistId => {
    setLocalArtists(localArtists.filter(id => id !== artistId));
  };

  return (
    <div>
      <H1>Artists</H1>
      <Search>
        <SearchInput
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          onFocus={e => setInputFocus(true)}
          placeholder="search an artist"
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
      or{" "}
      <Green link href="/import">
        import your artists
      </Green>{" "}
      from Spotify
      <ArtistsLayout>
        {loading
          ? localArtists
              .slice(1, 6)
              .map(() => (
                <ReactPlaceholder customPlaceholder={<ArtistPlaceholder />} />
              ))
          : artists.map(artist => (
              <Artist
                artist={artist}
                heartSelected={true}
                onHeartClick={() => removeArtist(artist.id)}
              />
            ))}
      </ArtistsLayout>
    </div>
  );
};
export default Feed;
