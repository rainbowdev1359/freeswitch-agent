import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";

const CustButton = styled.button<{ theme?: string, disabled: boolean }>`
  border-radius: 20px;
  padding: 8px 12px;
  background-color: ${(props) => (props.theme == "light" ? "#224D57" : "#27798b")};
  color:  ${(props) => (props.disabled ? "gray" : "white")};
  border: none;
`;

function CustomButton({ child, disabled = false, onclick }: { child: ReactNode, disabled?: boolean, onclick?: () => any }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return <CustButton disabled={disabled} theme={theme} onClick={onclick && onclick}>{child}</CustButton>;
}

export default CustomButton;
