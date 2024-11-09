import styled from "styled-components";

interface variant {
  variant: string;
}
export const StyledLandingPageBackgroundContainer = styled.section`
  position: relative;
  isolation: isolate;
`;
export const StyledLandingPageBackgroundBlur = styled.section`
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  top: -400px;
  z-index: -10;
  transform: translateZ(0);
  overflow: hidden;
  filter: blur(30px);

  @media (min-width: 640px) {
    top: -8rem;
  }
`;
export const StyledLandingPagePolygon = styled.div`
  clip-path: polygon(
    74.1% 44.1%,
    100% 61.6%,
    97.5% 26.9%,
    85.5% 0.1%,
    80.7% 2%,
    72.5% 32.5%,
    60.2% 62.4%,
    52.4% 68.1%,
    47.5% 58.3%,
    45.2% 34.5%,
    27.5% 76.7%,
    0.1% 64.9%,
    17.9% 100%,
    27.6% 76.8%,
    76.1% 97.7%,
    74.1% 44.1%
  );
  position: relative;
  left: calc(50% - 11rem);
  aspect-ratio: 1155 / 678;
  width: 36.125rem;
  transform: translateX(-50%) rotate(30deg);
  background: linear-gradient(to top right, #ff80b5, #9089fc);
  opacity: 0.3;

  @media (min-width: 640px) {
    left: calc(50% - 30rem);
    width: 72.1875rem;
  }
`;
export const StyledLandingPageInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
`;

export const StyledLandingPageInfoTitle = styled.h2`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  font-family: "Rockwell", serif;
  font-weight: bold;
  color: #3f3f46;
  font-size: 1.875rem;
  margin: 0;

  @media (min-width: 640px) {
    gap: 1.5rem;
    font-size: 2.25rem; /* 4xl */
  }

  @media (min-width: 1024px) {
    font-size: 3rem; /* 5xl */
  }
`;
export const StyledLandingPageInfoHighlight = styled.span<variant>`
  color: ${({ variant }) => (variant === "danger" ? "#EF476F" : "#16a34a")};

  @media (min-width: 640px) {
    -webkit-text-stroke: 1px
      ${({ variant }) => (variant === "danger" ? "#EF476F" : "#16a34a")};
  }
`;

export const StyledLandingPageInfoSubTitle = styled.h1`
  font-family: "Lato", sans-serif;
  font-size: 1rem;
  color: #3f3f46;
  text-align: center;
  line-height: 1.75rem;
  text-wrap: balance;
  line-height: 2;
  margin: 0;

  @media (min-width: 640px) {
    font-size: 1.5rem;
    line-height: 2;
  }
`;

export const StyledLandingPageInfoImage = styled.img`
  height: 40vh;

  margin: 0 auto;
`;
export const StyledLandingPageNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;
