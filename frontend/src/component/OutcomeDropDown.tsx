import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { outcomeTypes } from "../data/date";
import { useTranslation } from 'react-i18next';

const DropMod = styled.select <{ theme: string }>`
  background-color: ${(props) => props.theme === "light" ? "#C9D5D8" : "#27798b"};
  border: ${(props) => props.theme === "light" ? "1px solid #27798b" : "none"};
  width: 100%;
  border-radius: 8px;
  color: ${(props) => (props.theme === "light" ? "#27798b" : "#d3dcdf")};
  padding: 0 8px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "#224D57"};
    color: white;
  }
  &:active {
    background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "#224D57"};
    color: white;
  }
`;

const DropMenu = styled.option <{ theme: string }>`
  background-color: ${(props) => props.theme === "light" ? "#C9D5D8" : "#27798b"};
  color: ${(props) => (props.theme === "light" ? "#27798b" : "#d3dcdf")};
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
`;

const DropDownContainer = styled.div`
  width: 235px;
  flex-grow: 1;
`;
export function OutcomeDropdownButton({ onSelect }:
  {
    onSelect: (val: string) => void;
  }) {

  const { t } = useTranslation();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <DropDownContainer>
      <Dropdown className="">
        <DropMod theme={theme} defaultValue="" onChange={handleChange}>
          <option value="" disabled>
            {t("Outcome") || t('Select an option')}
          </option>
          {outcomeTypes.map((item, index) => (
            <DropMenu theme={theme} key={index} value={item}>
              {t(item)}
            </DropMenu>
          ))}
        </DropMod>
      </Dropdown>
    </DropDownContainer>
  );
}
