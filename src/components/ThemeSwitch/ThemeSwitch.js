import { useContext, useState, useEffect } from "react";
import { MainContext } from "../MainBody";
import styled, { keyframes, css } from "styled-components";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const Wrapper = styled.div`
  padding: 8px;
  width: 35px;
  height: 35px;
  position: relative;
  display: grid;
  place-content: center;
  cursor: pointer;
  margin-top: -35px;
`;

const fadeUpOut = keyframes`
  0% {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const fadeUpIn = keyframes`
  0% {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    position: relative;
    transform: translateY(0%);
    opacity: 1;
  }
`;

const injection = (anim) => css`
  animation: 0.65s ${anim} ease-in-out forwards;
`;

const Image = styled.img`
  object-fit: cover;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  opacity: ${(p) => (p.shadow ? "0" : "1")};
  ${(p) => (p.anim ? injection(p.anim) : "")}

  transition: all 0.3s ease-in-out;
  &:focus {
    outline: 3px solid
      var(--color-one-theme-${(p) => (p.darkTheme ? "2" : "1")});
    outline-offset: 4px;
  }

  @media ${QUERIES.phoneAndSmaller} {
    width: 25px;
    height: 25px;
  }
`;

function ThemeSwitch() {
  const { darkTheme, setDarkTheme } = useContext(MainContext);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    setTrigger(false);
    const timer = setTimeout(() => {
      setTrigger(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [darkTheme]);

  return (
    <Wrapper
      trigger={trigger}
      onClick={() => {
        setDarkTheme((d) => !d);
      }}
      aria-live={"polite"}
      aria-label={`switch to ${darkTheme ? "light" : "dark"} theme `}
    >
      {trigger ? (
        darkTheme ? (
          <>
            <Image
              anim={fadeUpOut}
              src={"/frontendmentor_7/icon-moon.svg"}
              alt={"image switch moon"}
            />
            <ClickableWrapper>
              <Image
                anim={fadeUpIn}
                src={"/frontendmentor_7/icon-sun.svg"}
                alt={"image switch sun button"}
              />
            </ClickableWrapper>
          </>
        ) : (
          <>
            <Image
              anim={fadeUpOut}
              src={"/frontendmentor_7/icon-sun.svg"}
              alt={"image switch sun"}
            />

            <ClickableWrapper>
              <Image
                anim={fadeUpIn}
                src={"/frontendmentor_7/icon-moon.svg"}
                alt={"image switch moon"}
              />
            </ClickableWrapper>
          </>
        )
      ) : (
        <Image
          shadow={true}
          src={"/frontendmentor_7/icon-sun.svg"}
          alt={"shadow image"}
        />
      )}
    </Wrapper>
  );
}

export default ThemeSwitch;
