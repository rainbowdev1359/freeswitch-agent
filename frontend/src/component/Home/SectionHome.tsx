import styled from "styled-components";
import { homeData } from "../../data/Home";
import { SectionModal } from "./SectionModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from 'react-i18next';
import Calendar from "../Calendar";
import { DropdownHome } from "../DropDownHome";
import { ParentButton, TabButtonRow } from "../StyleComponents";

const GridContainer = styled.div<{ $selected?: boolean }>`
  display: grid;
  flex-grow: 1;
  margin:0px;
   grid-template-columns:  repeat(2, 1fr);
   height: 720px;

  }
`;


// section
export function SectionHome() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const clearfilter = () => {

  }
  const applyFilter = (date: string, isMonthSelector: boolean) => {
    console.log(date, isMonthSelector)
  }
  return (
    <>
      <div className="d-flex px-4  justify-content-between align-items-center">
        <TabButtonRow $theme={theme}>List report</TabButtonRow>
        <ParentButton $theme={theme} className="d-flex flex-grow-1   gap-2">
          <DropdownHome action={<Calendar clearfilter={clearfilter} applyFilter={applyFilter} />} name={t("Filter by Date")} />
          <DropdownHome action={<Calendar clearfilter={clearfilter} applyFilter={applyFilter} isMonthSelector />} name={t("Filter by Month")} />
        </ParentButton>
      </div >
      <GridContainer className="gap-5 px-4 py-4">
        {homeData.map((home) => (
          <SectionModal home={home} key={home.id} />
        ))}
      </GridContainer>
    </>
  );
}
