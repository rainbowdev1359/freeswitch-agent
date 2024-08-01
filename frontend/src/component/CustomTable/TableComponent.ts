import styled from "styled-components";

export const ActionContainer = styled.button<{ $theme?: string, width?: string }>`
  position:relative;
  border-radius: 8px;
  border: ${(props) => props.$theme == "light" ? "1px solid #27798b" : "0px solid transparent"};
  background-color: ${(props) => props.$theme == "light" ? "#FEFEFE" : "#27798b"};
  color: ${(props) => props.$theme == "light" ? "#27798b" : "#FEFEFE"};
  display: flex;
  justify-content: center;
  width: ${(props) => props.width ?? "20px"};
  
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #2e8a9e;
  }
  &:hover {
    background-color: #2e8a9e;
  }
`;

export const ActionBtnContainer = styled.button<{ $theme?: string }>`
  position:relative;
  border-radius: 8px;
  border: ${(props) => props.$theme == "light" ? "1px solid #27798b" : "0px solid transparent"};
  background-color: ${(props) => props.$theme == "light" ? "#FEFEFE" : "#27798b"};
  color: ${(props) => props.$theme == "light" ? "#27798b" : "#FEFEFE"};
  display: flex;
  justify-content: center;
  width: 50px;
  
  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #2e8a9e;
  }
  &:hover {
    background-color: #2e8a9e;
  }
`;

export const ActionImage = styled.div`
  width: 20px;
`;
