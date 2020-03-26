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

const Artists = () => {
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

  useEffect(() => {
    localStorage.setItem("artists", JSON.stringify(localArtists));
  }, [localArtists]);

  const removeArtist = artistId => {
    console.log(localArtists.filter(id => id !== artistId));
    setLocalArtists(localArtists.filter(id => id !== artistId));
  };

  return (
    <div>
      <H1>Artists</H1>
      <Green link href="/import">
        import your artists
      </Green>{" "}
      from Spotify
      {localArtists.length > 0 && (
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
      )}
    </div>
  );
};
export default Artists;
