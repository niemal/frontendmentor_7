import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { MainContext } from "../MainBody";
import ThemeSwitch from "../ThemeSwitch";
import Tick from "../Tick";
import TodoList from "../TodoList";
import { QUERIES } from "../constants";

const Wrapper = styled.div`
  position: relative;
  padding-top: 60px;
  width: clamp(520px, 6vw, 1300px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;

  @media ${QUERIES.phoneAndSmaller} {
    padding: 48px 24px;
    width: 100%;
  }
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  font-size: ${36 / 16}rem;
  font-weight: var(--font-weight-bold);
  letter-spacing: 12px;
  color: var(--color-two-theme-1);

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${24 / 16}rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 28px;
  border-radius: 8px;
  background-color: var(--color-two-theme-${(p) => (p.darkTheme ? "2" : "1")});
  width: 100%;
  margin-top: 12px;
`;

const Input = styled.input`
  font-size: ${18 / 16}rem;
  font-weight: var(--font-weight-bold);
  font-family: var(--font-primary);
  border: none;
  height: 32px;
  line-height: ${32 / 16}rem;
  width: 100%;
  color: var(--color-three-hover-theme-${(p) => (p.darkTheme ? "2" : "1")});
  background-color: transparent;
  outline: none;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: var(--color-four-theme-${(p) => (p.darkTheme ? "2" : "1")});
  }

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${14 / 16}rem;
    line-height: ${20 / 16}rem;
  }
`;

const FooterText = styled.span`
  margin-top: 36px;
  align-self: center;
  font-size: ${15 / 16}rem;
  color: var(--color-four-theme-${(p) => (p.darkTheme ? "2" : "1")});
`;

function MainContent() {
  const inputRef = useRef(null);
  const [newEntry, setNewEntry] = useState({});
  const { darkTheme, todoList, setTodoList } = useContext(MainContext);

  return (
    <Wrapper>
      <TopRow>
        <Title darkTheme={darkTheme}>TODO</Title>
        <ThemeSwitch />
      </TopRow>

      <InputWrapper darkTheme={darkTheme}>
        <Tick
          onClick={() => {
            setTodoList([newEntry].concat(todoList));
            inputRef.current.value = "";
          }}
        />
        <Input
          ref={inputRef}
          darkTheme={darkTheme}
          placeholder={"Create a new todo"}
          onChange={(e) => {
            if (inputRef.current.value?.length > 0) {
              setNewEntry({
                id: todoList.length + 1,
                value: inputRef.current.value,
                ticked: false,
              });
            }
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setTodoList([newEntry].concat(todoList));
              inputRef.current.value = "";
            }
          }}
        />
      </InputWrapper>

      <TodoList />

      <FooterText darkTheme={darkTheme}>
        Drag and drop to reorder list
      </FooterText>
    </Wrapper>
  );
}

export default MainContent;
