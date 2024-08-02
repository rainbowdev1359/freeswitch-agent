import React from "react";

import styled from "styled-components";
import { HomeController } from "./HomeController";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Toggle from "../Toggle";

const H1Styled = styled.h4<{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "#185968" : "#d3dcdf")};
  font-weight: bold;
`;
const DivStyled = styled.div<{ theme: string }>`
  border-bottom: ${(props) =>
    props.theme === "light" ? "1px solid #9ABCC4" : "1px solid #27798b"};
  width: 100%;
  padding: 0px 0px 0px 50px;
  @media (max-width: 993px) {
    padding-top: 40px !important;
    padding: 0 30px;
  }
`;

const PModified = styled.p<{ theme: string }>`
  color: ${(props) => (props.theme == "light" ? "#27798b" : "#5f8086")};
  font-weight: bold;
`;
const CustomRow = styled.div`
  max-width: fit-content;
`;

export function HeaderHome() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = localStorage.getItem('username')

  return (
    <DivStyled
      theme={theme}
      className="d-flex flex-wrap  align-items-center justify-content-between"
    >
      <CustomRow className="">
        <H1Styled theme={theme}>Welcome {user}</H1Styled>
        {/* <PModified theme={theme}>September 12, 2024</PModified> */}
      </CustomRow>
      <div className="d-flex flex-row gap-2 align-items-center px-3">
        <HomeController />
        <Toggle />
      </div>
    </DivStyled>
  );
}
