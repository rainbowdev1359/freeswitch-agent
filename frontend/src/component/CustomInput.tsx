import React, { ReactNode } from "react";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { FormCheck } from "react-bootstrap";
import styled from "styled-components";

const CustomCheckBox = styled.div<{ $selected?: boolean; $theme?: string }>`
  padding: 8px 15px;
  border-radius: 8px;
  background-color: ${(props) => props.$theme === "light" ? "#E5ECEE !important" : "#051316 !important"};
  color: ${(props) => (props.$theme === "light" ? "#0A2328" : "white")};
  border: ${(props) => (props.$selected ? "0.5px solid #00B7DF" : "none")};
  height: 100%;
`;

const NotiCustomCheckBox = styled.div<{ $selected?: boolean; $theme?: string }>`
  padding: 8px;
  border-radius: 8px;
  color: ${(props) => (props.$theme === "light" ? "#0A2328" : "white")};
`;

function CustomInput({
  value,
  label,
  name,
  selected,
  setSelected,
  children,
  type
}: {
  value: string;
  label: string;
  name: string;
  type?: string;
  selected: string;
  setSelected: any;
  children?: ReactNode;
}) {

  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleSelection = () => { setSelected(value); };

  return (
    <CustomCheckBox
      $theme={theme}
      $selected={selected == value}
      onClick={handleSelection}
      className={`d-flex gap-2 ${children ? "align-items-start py-3" : "align-items-center"}`}
    >
      <FormCheck
        type={type == "checkbox" ? "checkbox" : "radio"}
        name={name}
        onClick={handleSelection}
        id={name}
        checked={selected == value}
        onChange={handleSelection}
      />
      <div>
        <label htmlFor={value}>{children ? children : label}</label>
      </div>
    </CustomCheckBox>
  );
}

export default CustomInput;

export function NotiCustomInput({
  value,
  name,
  selected,
  setSelected,
  children,
  isRead,
  handleShowSelection
}: {
  value: string;
  name: string;
  isRead?: boolean;
  selected: string[];
  setSelected: any;
  children?: ReactNode;
  handleShowSelection: any
}) {

  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleSelection = () => {
    var temp = selected
    const isSelected = selected.includes(value);
    if (isSelected) {
      temp = selected.filter(item => item !== value);
    } else {
      temp = [...selected, value];
    }
    setSelected(temp);
  };

  return (
    <NotiCustomCheckBox
      $theme={theme}
      $selected={selected.includes(value)}
      className={`d-flex gap-2 align-items-start position-relative`}
    >
      <FormCheck
        type={"checkbox"}
        name={name}
        onClick={handleSelection}
        id={name}
        checked={selected.includes(value)}
        onChange={handleSelection}
      />
      {!isRead && <span className="rounded-circle" style={{ backgroundColor: "#96ADB3", width: "12px", height: "12px", margin: "auto" }} />}
      <div>
        <label htmlFor={value} style={{ borderBottom: "1px solid #0f2e35", paddingBottom: "8px" }} onClick={() => handleShowSelection(value)}>{children}</label>
      </div>
    </NotiCustomCheckBox>
  );
}
