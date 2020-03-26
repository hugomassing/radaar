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

const Search = ({ search }) => {
  const { accessToken } = useContext(AuthContext);
  const [localArtists, setLocalArtists] = useState(
    JSON.parse(localStorage.getItem("artists")) || []
  );

  const [{ data, loading }] = useAxios({
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

  const addArtist = artistId => {
    if (!localArtists.includes(artistId) && artistId)
      setLocalArtists(state => [...state, artistId]);
  };

  const removeArtist = artistId => {
    setLocalArtists(localArtists.filter(id => id !== artistId));
  };

  return (
    <div>
      <H1>Results for : {search}</H1>
      <Green link href="/import">
        import your artists
      </Green>{" "}
      from Spotify
      <ArtistsLayout>
        {loading
          ? [1, 2, 3, 4, 5, 6].map(() => (
              <ReactPlaceholder customPlaceholder={<ArtistPlaceholder />} />
            ))
          : data.artists.items.map(artist => (
              <Artist
                artist={artist}
                heartSelected={localArtists.includes(artist.id)}
                onHeartClick={() =>
                  localArtists.includes(artist.id)
                    ? removeArtist(artist.id)
                    : addArtist(artist.id)
                }
              />
            ))}
      </ArtistsLayout>
    </div>
  );
};
export default Search;
