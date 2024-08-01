import React from "react";
import { toggleTheme } from "../store/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import Switch from "react-switch";
import styled from "styled-components";
const DarkAndLight = styled.div<{ $theme?: string }>`
  height: fit-content;
  background-color: ${(props) =>
    props.$theme == "light" ? "#f5f6f6" : "#27798b"};
  display: flex;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 20px;
  margin-top: 4px
`;
function Toggle() {
  const dispatch = useDispatch();
  const handleTheme = () => {
    dispatch(toggleTheme());
  };
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    // <DarkAndLight $theme={theme}>
    //   {theme == "light" ? (
    //     <img src="/sun.svg" alt="" />
    //   ) : (
    //     <img src="/sun_light.svg" alt="" />
    //   )}

    //   <Switch
    //     checked={theme == "dark"}
    //     onChange={() => handleTheme()}
    //     onColor="#224D57"
    //     onHandleColor="#9ABCC4"
    //     handleDiameter={30}
    //     uncheckedIcon={false}
    //     checkedIcon={false}
    //     boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
    //     activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
    //     height={20}
    //     width={48}
    //     className="react-switch"
    //     id="material-switch"
    //   />
    //   {theme == "light" ? (
    //     <img src="/moon.svg" alt="" />
    //   ) : (
    //     <img src="/moon_light.svg" alt="" />
    //   )}
    // </DarkAndLight>
    <></>
  );
}

export default Toggle;
