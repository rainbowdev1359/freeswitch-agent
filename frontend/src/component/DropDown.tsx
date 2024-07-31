import Dropdown from "react-bootstrap/Dropdown";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useTranslation } from 'react-i18next';

const DropMod = styled.select <{ theme: string, color?: string[] }>`
  background-color: ${(props) => props.theme === "light" ? props.color ? props.color[0] : "#C9D5D8" : props.color ? props.color[1] : "#0f2e35"};
  border: ${(props) => props.theme === "light" ? "1px solid #0F2E35" : "none"};
  width: 100%;
  border-radius: 8px;
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#96adb3")};
  padding: 0 8px;
  height: 42px;
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "#00b7df"};
    color: black;
  }
  &:active {
    background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "#00b7df"};
    color: black;
  }
`;

const DropMenu = styled.option <{ theme: string }>`
  background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "#0f2e35"};
  color: ${(props) => props.theme === "light" ? "black" : "#96adb3"};
`;

const DropDownContainer = styled.div <{ isfull: string }>`
  width: ${(props) => props.isfull === "true" ? "100%" : "235px"};
  flex-grow: 1;
`;

export function DropdownButton({ options, placeholder, onSelect, color, isFull = false }:
  {
    placeholder?: string;
    onSelect: (val: string) => void;
    color?: string[]
    isFull: boolean
    options: string[]
  }) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <DropDownContainer isfull={isFull.toString()}>
      <Dropdown className="">
        <DropMod color={color} theme={theme} defaultValue="" onChange={handleChange}>
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options.map((item, index) => (
            <DropMenu theme={theme} key={index} value={item}>
              {t(item)}
            </DropMenu>
          ))}
        </DropMod>
      </Dropdown>
    </DropDownContainer>
  );
}

export function DropdownObjectButton({ options, placeholder, onSelect, color, isFull = false, defaultValue }:
  {
    placeholder?: string;
    onSelect: (val: string) => void;
    color?: string[]
    isFull: boolean
    options: any[]
    defaultValue: string
  }) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelect(event.target.value);
  };

  return (
    <DropDownContainer isfull={isFull.toString()}>
      <Dropdown className="">
        <DropMod color={color} theme={theme} value={defaultValue} onChange={handleChange}>
          {placeholder && <option value="" disabled>{t('Select an option')}</option>}
          {options.map((item, index) => (
            <DropMenu theme={theme} key={index} value={item.value}>
              {item.title}
            </DropMenu>
          ))}
        </DropMod>
      </Dropdown>
    </DropDownContainer>
  );
}