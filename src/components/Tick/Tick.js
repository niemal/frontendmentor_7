import styled, { keyframes, css } from "styled-components";
import { useContext } from "react";
import { MainContext } from "../MainBody";

const tickedIn = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const tickedInInjection = css`
  animation: 0.35s ${tickedIn} ease-in-out forwards;
`;

const Wrapper = styled.div`
  background: ${(p) =>
    p.ticked
      ? `linear-gradient(140deg,
    var(--color-background-1) 0%,
    var(--color-background-2) 66%
  )`
      : "transparent"};
  ${(p) => (p.ticked ? tickedInInjection : "")}
  height: 25px;
  width: 28px;
  border: 2px solid
    var(
      ${(p) => (p.darkTheme ? "--color-five-theme-2" : "--color-three-theme-1")}
    );
  border-radius: 50%;
  display: grid;
  place-content: center;
  transition: all 0.3s ease-in-out;
`;

const Image = styled.img`
  object-fit: cover;
  width: 9px;
  height: 9px;
`;

function Tick({ ticked, ...props }) {
  const { darkTheme } = useContext(MainContext);
  return (
    <Wrapper darkTheme={darkTheme} ticked={ticked} {...props}>
      {ticked ? (
        <Image
          src={"/frontendmentor_7/icon-check.svg"}
          alt={"checkmark icon"}
        />
      ) : (
        ""
      )}
    </Wrapper>
  );
}

export default Tick;
