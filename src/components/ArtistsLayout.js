import styled, { css } from "styled-components";

const ArtistsLayout = styled.div`
  margin-top: 40px;
  margin-bottom: 32px;
  position: relative;
  display: grid;
  grid: auto-flow / 1fr 1fr 1fr;
  grid-gap: 40px;
  justify-items: center;
  align-items: start;
  ${({ small }) =>
    small &&
    css`
      grid: auto-flow / 1fr 1fr 1fr 1fr 1fr;
      grid-gap: 16px;
    `}
`;

export default ArtistsLayout;
