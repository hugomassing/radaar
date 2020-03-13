import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TrackContainer = styled(motion.div)`
  width: 100%;
  background: #f2f2f2;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  opacity: 0;
`;

const Artwork = styled.div`
  height: 80px;
  width: 80px;
  padding: 4px;
  background-color: #d2d2d2;
  border-radius: 2px;
  background-image: url(${p => p.url});
  background-size: cover;
`;

const TrackInfos = styled.div`
  margin-left: 24px;
  p {
    font-size: 0;
    background-color: #d2d2d2;
  }
`;

const TrackName = styled.p`
  line-height: 32px;
  font-size: 24px;
  width: 200px;
`;

const Artist = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
  width: 600px;
  margin-top: 4px;
`;

const Misc = styled.p`
  line-height: 24px;
  font-size: 16px;
  color: #838383;
  width: 300px;
  margin-top: 4px;
`;

const TrackPlaceholder = () => (
  <TrackContainer animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <Artwork />
    <TrackInfos>
      <TrackName>Name</TrackName>
      <Artist>Maazel</Artist>
      <Misc>Single</Misc>
    </TrackInfos>
  </TrackContainer>
);

export default TrackPlaceholder;
