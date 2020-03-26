import { useState, useEffect } from "react";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

const isTokenExpired = expiresAt => dayjs(expiresAt).isSameOrBefore(dayjs());

const useSpotifyToken = () => {
  const [expiresAt] = useState(
    JSON.parse(localStorage.getItem("expiresAt")) || null
  );

  const [spotifyToken, setSpotifyToken] = useState(
    isTokenExpired(expiresAt)
      ? null
      : JSON.parse(localStorage.getItem("spotifyToken")) || null
  );

  useEffect(() => {}, [expiresAt]);

  const setToken = (token, expiresIn) => {
    localStorage.setItem("spotifyToken", JSON.stringify(token));
    localStorage.setItem(
      "expiresAt",
      JSON.stringify(
        dayjs()
          .add(expiresIn, "s")
          .format()
      )
    );
    setSpotifyToken(token);
  };

  return { spotifyToken: spotifyToken, setToken };
};

export default useSpotifyToken;
