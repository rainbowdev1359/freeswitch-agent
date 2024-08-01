import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import CenteredModal from "./modals/Modal";
import { RootState } from "../store";

const InputContainer = styled.div<{ $theme?: string }>`
  display:flex;
  background: ${props => props.$theme == "light" ? "linear-gradient(180deg, #C9D5D8 0%, #d3dcdf  77.4%)" : "linear-gradient(180deg, #27798b 0%, #09181B 77.4%)"};
  border: 1px solid #27798b
  color: #d3dcdf;
  margin-right:10px;
  border-radius:10px;
  padding:8px;
  gap:10px;
`;

const Input = styled.input`
  flex-grow:1;
  background-color:transparent;
  font-size: 16px;
  font-weight: 500;
  line-height: 20.4px;
  color: #d3dcdf;
  border:none;
  outline:none;
`

function EditableInput({ type, value, setValue }: { type: string, value: string, setValue: any }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [showImportLead, setShowImportLead] = useState(false);
  const [inputVal, setInputVal] = useState(value)

  return (
    <>
      <InputContainer $theme={theme}>
        <Input disabled placeholder="John" value={value} />
        <img src={theme == "light" ? "/edit2-light.svg" : "/edit.svg"} alt="" width={20} onClick={() => setShowImportLead(true)} />
      </InputContainer>
      <CenteredModal
        show={showImportLead}
        btntext="Save"
        onHide={() => setShowImportLead(false)}
        onContinue={() => {
          setShowImportLead(false);
          setValue(inputVal);
        }}
        children={
          <>
            {type}
            <InputContainer $theme={theme}>
              <Input placeholder="John" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
            </InputContainer>
          </>
        }
        title="Edit field"
      />
    </>
  );
}

export default EditableInput;
