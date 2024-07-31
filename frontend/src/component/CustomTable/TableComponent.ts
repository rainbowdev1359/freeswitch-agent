import styled from "styled-components";

export const ActionContainer = styled.button<{ $theme?: string, width?: string }>`
  position:relative;
  border-radius: 8px;
  border: ${(props) => props.$theme == "light" ? "1px solid #0F2E35" : "0px solid transparent"};
  background-color: ${(props) => props.$theme == "light" ? "#FEFEFE" : "#0f2e35"};
  color: ${(props) => props.$theme == "light" ? "#0f2e35" : "#FEFEFE"};
  display: flex;
  justify-content: center;
  width: ${(props) => props.width ?? "20px"};
  
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #17454f;
  }
  &:hover {
    background-color: #17454f;
  }
`;

export const ActionBtnContainer = styled.button<{ $theme?: string }>`
  position:relative;
  border-radius: 8px;
  border: ${(props) => props.$theme == "light" ? "1px solid #0F2E35" : "0px solid transparent"};
  background-color: ${(props) => props.$theme == "light" ? "#FEFEFE" : "#0f2e35"};
  color: ${(props) => props.$theme == "light" ? "#0f2e35" : "#FEFEFE"};
  display: flex;
  justify-content: center;
  width: 50px;
  
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #17454f;
  }
  &:hover {
    background-color: #17454f;
  }
`;

export const ActionImage = styled.div`
  width: 20px;
`;
