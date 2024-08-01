import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";

const DropMod = styled(Dropdown.Toggle) <{ theme: string }>`
  background-color:${(props) => props.theme === "light" ? "#224D57" : "#27798b"} ;
  border: none;
  border-radius: 25px;
  color:${(props) => props.theme === "light" ? "#FEFEFE" : "#d3dcdf"};
  height: 40px;
  font-size: 14px;
  &:hover {
    background-color:${(props) => props.theme === "light" ? "#FEFEFE" : "#224D57"} ;
    color: white;
  }
  &:active {
    background-color:${(props) => props.theme === "light" ? "#FEFEFE" : "#224D57"} ;
    color: white;
  }
`;

const NotiDropMod = styled(Dropdown.Toggle) <{ theme: string }>`
  background-color:${(props) => props.theme === "light" ? "#C9D5D8" : "#27798b"} ;
  border: none;
  height: 56px;
  width: 56px;
  border-radius: 12px;
  padding: 16px;
  &:hover {
    background-color:${(props) => props.theme === "light" ? "#C9D5D8" : "#224D57"} ;
    color: white;
  }
  &:active {
    background-color:${(props) => props.theme === "light" ? "#C9D5D8" : "#224D57"} ;
    color: white;
  }
  &::after {
    display: none !important; 
  }
`;

const DropMenu = styled(Dropdown.Menu) <{ theme: string }>`
  background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "#27798b;"};
  color:black;
`;

export function DropdownHome({ name, action }: { name: string, action?: any }) {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Dropdown className="drop-down-home" >
      <DropMod theme={theme} className="px-3 flex-grow-1" id="dropdown-basic">{name}</DropMod>
      <DropMenu theme={theme}>{action && action}</DropMenu>
    </Dropdown>
  );
}

export function NotificationDrop({ name, action }: { name: any, action?: any }) {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <Dropdown className="drop-down-home" >
      <NotiDropMod theme={theme} className="px-3 flex-grow-1" id="dropdown-basic">{name}</NotiDropMod>
      <DropMenu theme={theme}>{action && action}</DropMenu>
    </Dropdown>
  );
}