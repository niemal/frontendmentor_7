import { useContext, useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import styled, { keyframes, css } from "styled-components";
import { MainContext } from "../MainBody";
import Tick from "../Tick";
import { QUERIES } from "../constants";
import { hoverSupported } from "../hoverSupported";

const Wrapper = styled.div`
  &,
  & > div:nth-child(1) {
    font-family: var(--font-primary);
    font-size: ${18 / 16}rem;
    font-weight: var(--font-weight-bold);
    position: relative;
  }

  filter: drop-shadow(0px 1px 12px var(--color-one-theme-2));
`;

const EntryWrapper = styled.div`
  cursor: pointer;
  position: relative;
  user-select: none;
  display: flex;
  padding: 24px;
  gap: 18px;
  width: 100%;
  align-items: center;
  ${(p) => (p.first ? "border-radius: 8px 8px 0px 0px;" : "")}
  background-color: var(--color-two-theme-${(p) => (p.darkTheme ? "2" : "1")});
  border-top: 1px solid
    ${(p) =>
      p.borderTop
        ? p.darkTheme
          ? "var(--color-four-theme-2);"
          : "var(--color-three-theme-1);"
        : "transparent"};
  transition: all 0.3s ease-in-out;

  ${hoverSupported(css`
    &:hover {
      background-color: var(--color-six-theme-2);
      ${(p) =>
        !p.darkTheme ? "background-color: var(--color-one-theme-1);" : ""}
    }
  `)}

  @media ${QUERIES.phoneAndSmaller} {
    padding: 20px;
  }
`;

const EntryValue = styled.span`
  color: var(--color-three-theme-2);
  ${(p) => (!p.darkTheme ? "color: var(--color-six-theme-1);" : "")}
  transition: all 0.3s ease-in-out;
  position: relative;
  ${(p) =>
    p.ticked
      ? `
  color: var(--color-four-theme-${p.darkTheme ? "2" : "1"});
  `
      : ""}

  ${hoverSupported(css`
    ${EntryWrapper}:hover & {
      color: var(--color-three-hover-theme-2);
      ${(p) => (!p.darkTheme ? "color: var(--color-three-hover-theme-1);" : "")}
    }
  `)}

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${16 / 16}rem;
  }
`;

const strikethrough = keyframes`
  0% {
    width: 0px;
    opacity: 0.35;
  }
  100% {
    opacity: 1;
    width: 100%;
  }
`;

const ValueStrikethrough = styled.span`
  height: 2.5px;
  background-color: var(--color-three-theme-2);
  ${(p) => (!p.darkTheme ? "background-color: var(--color-six-theme-1);" : "")}
  position: absolute;
  top: 7px;
  left: 0;
  animation: 0.3s ${strikethrough} ease-in-out forwards;
`;

const BottomRow = styled.div`
  width: 100%;
  padding: 24px 16px;
  background-color: var(--color-two-theme-${(p) => (p.darkTheme ? "2" : "1")});
  display: flex;
  justify-content: center;
  border-top: 1px solid
    ${(p) =>
      p.darkTheme ? "var(--color-four-theme-2)" : "var(--color-three-theme-1)"};
  border-radius: 0px 0px 6px 6px;
  transition: all 0.3s ease-in-out;
`;

const BottomEntry = styled.span`
  color: var(--color-four-theme-${(p) => (p.darkTheme ? "2" : "1")});
  font-size: ${16 / 16}rem;
  ${(p) => (p.selected ? `color: var(--color-primary);` : "")}
  transition: all 0.3s ease-in-out;

  @media ${QUERIES.phoneAndSmaller} {
    font-size: ${14 / 16}rem;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  gap: 8px;

  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;

const MobileBottom = styled.div`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: flex;
    margin-top: 40px;
    padding: 18px;
    border-radius: 8px;
    gap: 24px;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: var(
      --color-two-theme-${(p) => (p.darkTheme ? "2" : "1")}
    );
  }

  & ${BottomEntry} {
    font-size: ${18 / 16}rem;
  }
`;

const MobileCross = styled.img`
  display: none;

  @media ${QUERIES.phoneAndSmaller} {
    display: block;
    object-fit: cover;
    width: 25px;
    height: 25px;
    cursor: pointer;
    padding: 4px;
    margin-right: -4px;
    margin-left: auto;
  }
`;

function TodoList() {
  const { darkTheme, todoList, setTodoList } = useContext(MainContext);
  const [filterMode, setFilterMode] = useState("all");
  const [view, setView] = useState(todoList);

  useEffect(() => {
    if (filterMode === "all") {
      setView([...todoList]);
    } else if (filterMode === "completed") {
      const tmp = [];
      for (let entry of todoList) {
        if (entry.ticked) {
          tmp.push(entry);
        }
      }

      setView(tmp);
    } else if (filterMode === "active") {
      const tmp = [];
      for (let entry of todoList) {
        if (!entry.ticked) {
          tmp.push(entry);
        }
      }

      setView(tmp);
    }
  }, [todoList, filterMode]);

  const tickHandler = (item) => {
    const tmp = [];

    for (let entry of view) {
      if (entry.id === item.id) {
        entry.ticked = !entry.ticked;
      }
      tmp.push(entry);
    }

    setView(tmp);
  };

  return (
    <Wrapper>
      <Reorder.Group
        as={"div"}
        axis={"y"}
        values={view}
        onReorder={(newView) => setView(newView)}
      >
        {view.map((item, idx) => (
          <Reorder.Item
            key={item.id}
            as={"div"}
            value={item}
            whileTap={{
              scale: 1.03,
            }}
            style={{ position: "relative" }}
          >
            <EntryWrapper
              data-theme={darkTheme ? "darkTheme" : "lightTheme"}
              borderTop={idx !== 0}
              first={idx === 0}
              darkTheme={darkTheme}
            >
              <Tick ticked={item.ticked} onClick={() => tickHandler(item)} />
              <EntryValue
                darkTheme={darkTheme}
                ticked={item.ticked}
                onClick={() => tickHandler(item)}
              >
                {item.value}
                {item.ticked ? <ValueStrikethrough /> : ""}
              </EntryValue>
              <MobileCross
                src={"/frontendmentor_7/icon-cross.svg"}
                alt={"delete image"}
                onClick={() => {
                  const tmpTodo = [];
                  for (let entry of todoList) {
                    if (entry.id === item.id) {
                      continue;
                    }
                    tmpTodo.push(entry);
                  }

                  const tmpView = [];
                  for (let entry of view) {
                    if (entry.id === item.id) {
                      continue;
                    }
                    tmpView.push(entry);
                  }

                  setTodoList(tmpTodo);
                  setView(tmpView);
                }}
              />
            </EntryWrapper>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <BottomRow darkTheme={darkTheme}>
        <BottomEntry style={{ marginRight: "auto" }}>
          {view.length === 1 ? "1 item left" : ""}
          {view.length === 0 ? "0 items left" : ""}
          {view.length > 1 ? `${view.length} items left` : ""}
        </BottomEntry>
        <BottomWrapper>
          <BottomEntry
            selected={filterMode === "all"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilterMode("all");
            }}
          >
            All
          </BottomEntry>
          <BottomEntry
            selected={filterMode === "active"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilterMode("active");
            }}
          >
            Active
          </BottomEntry>
          <BottomEntry
            selected={filterMode === "completed"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setFilterMode("completed");
            }}
          >
            Completed
          </BottomEntry>
        </BottomWrapper>
        <BottomEntry
          style={{ marginLeft: "auto", cursor: "pointer" }}
          onClick={() => {
            const tmp = [];

            for (let entry of todoList) {
              if (!entry.ticked) {
                tmp.push(entry);
              }
            }

            setTodoList(tmp);
          }}
        >
          Clear Completed
        </BottomEntry>
      </BottomRow>

      <MobileBottom darkTheme={darkTheme}>
        <BottomEntry
          selected={filterMode === "all"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFilterMode("all");
          }}
        >
          All
        </BottomEntry>
        <BottomEntry
          selected={filterMode === "active"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFilterMode("active");
          }}
        >
          Active
        </BottomEntry>
        <BottomEntry
          selected={filterMode === "completed"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFilterMode("completed");
          }}
        >
          Completed
        </BottomEntry>
      </MobileBottom>
    </Wrapper>
  );
}

export default TodoList;
