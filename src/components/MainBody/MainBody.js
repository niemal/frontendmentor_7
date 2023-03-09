import styled from "styled-components";
import MainContent from "../MainContent";
import { useState, createContext } from "react";
import { isMobile } from "react-device-detect";

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: var(--color-one-theme-${(p) => (p.darkTheme ? "2" : "1")});
  transition: all 0.3s ease-in-out;
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 300px;
`;

const BackgroundImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 300px;
`;

export const MainContext = createContext();

function MainBody() {
  const [darkTheme, setDarkTheme] = useState(true);
  const [todoList, setTodoList] = useState([]);

  return (
    <Wrapper darkTheme={darkTheme}>
      <BackgroundImageWrapper>
        <BackgroundImage
          src={
            darkTheme
              ? isMobile
                ? "/frontendmentor_7/bg-mobile-dark.jpg"
                : "/frontendmentor_7/bg-desktop-dark.jpg"
              : isMobile
              ? "/frontendmentor_7/bg-mobile-light.jpg"
              : "/frontendmentor_7/bg-desktop-light.jpg"
          }
          alt={"background image"}
        />
      </BackgroundImageWrapper>

      <MainContext.Provider
        value={{ darkTheme, setDarkTheme, todoList, setTodoList }}
      >
        <MainContent />
      </MainContext.Provider>
    </Wrapper>
  );
}

export default MainBody;
