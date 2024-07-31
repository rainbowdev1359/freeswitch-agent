import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import {DropMod, DropMenu, DropItem} from "../StyleComponents";
import { RootState } from "../../store";

export function DropdownButton({ name }: { name: string }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Dropdown className="">
      <DropMod $theme={theme} className="px-3" id="dropdown-basic">
        {name}
      </DropMod>

      <DropMenu $theme={theme}>
        <DropItem href="#/action-1">Action</DropItem>
        <DropItem href="#/action-2">Another action</DropItem>
        <DropItem href="#/action-3">Something else</DropItem>
      </DropMenu>
    </Dropdown>
  );
}
