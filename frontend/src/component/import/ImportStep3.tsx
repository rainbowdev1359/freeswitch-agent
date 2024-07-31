import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import CustomButton from "./CustomButton";
import CustomTable from "../CustomTable/Table";
import { contactEditType } from "../../types/types";
import { useSelector } from "react-redux";
import { DropdownHome } from "../DropDownHome";
import { RootState } from "../../store";
import EditableInput from "../EditableInput";
import { BackPageButton } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

const DownloadButton = styled.div<{ $theme?: string }>`
  width: 100%;
  justify-content: space-between;
  height: fit-content;
  display: flex;
  background-color: rgba(10, 35, 40, 1);
  align-items: center;
  padding: 8px 16px;
  gap: 2px;
  p{
    color:white;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const ImportStep3Container = styled(Row)`
  padding: 48px 16px;
  margin: 0;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ImportStep3SubContainer = styled(Row)`
  margin: 0px;
  width: 100%;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  padding-bottom:48px;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const ButtonContainer = styled.div`
height:fit-content;
  width: fit-content;
  gap: 20px;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const TableContainer = styled.div<{ $issidebarOpened?: boolean }>`
  overflow: auto;
  width:${props => props.$issidebarOpened ? "calc(100vw - 600px) !important" : "calc(100vw - 160px) !important"};
`;

const SubContainer = styled.div`
  height:fit-content !important;
  width:100%;
  min-width:fit-content;
  overflow:auto;
`

const ParagraphTitle = styled.p<{ $theme?: string }>`
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  flex-grow: 1;
  color: ${props => props.$theme == "light" ? "#0F2E35" : "#C9D5D8"};
`;

function ImportStep3({ setActiveTopBar, isSidebarOpened, importContact, importDatas, setImportDatas }: { setActiveTopBar?: any, isSidebarOpened: boolean, importContact: any, importDatas: any, setImportDatas: any }) {
  const { t } = useTranslation();
  const columnHelper = createColumnHelper<contactEditType>();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const columns = [
    columnHelper.accessor("first_name", {
      header: () => <span>{t("First name")}</span>,
      cell: (info) => <EditableInput type="First name" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "first_name")} />,
    }),
    columnHelper.accessor("last_name", {
      header: () => <span>{t("Last name")}</span>,
      cell: (info) => <EditableInput type="Last name" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "last_name")} />,
    }),
    columnHelper.accessor((row) => row.email, {
      header: () => <span>{t("Email")}</span>,
      id: "email",
      cell: (info) => <EditableInput type="Email" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "email")} />,
    }),
    columnHelper.accessor("phone", {
      header: () => <span>{t("Phone number")}</span>,
      cell: (info) => <EditableInput type="Phone number" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "phone")} />,
    }),
    columnHelper.accessor((row) => row.company_name, {
      id: "company_name",
      header: () => <span>{t("Company name")}</span>,
      cell: (info) => <EditableInput type="Company name" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "company_name")} />,
    }),
    columnHelper.accessor((row) => row.company_address, {
      id: "company_address",
      header: () => <span>{t("Company address")}</span>,
      cell: (info) => <EditableInput type="Company address" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "company_address")} />,
    }),
    columnHelper.accessor((row) => row.customer_ID, {
      id: "customer_ID",
      header: () => <span>{t("Customer ID")}</span>,
      cell: (info) => <EditableInput type="Customer ID" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "customer_ID")} />,
    }),
    columnHelper.accessor((row) => row.comment, {
      id: "comment",
      header: () => <span>{t("Comment")}</span>,
      cell: (info) => <EditableInput type="Comment" value={info.getValue()} setValue={(val: string) => updateItem(val, info.row.index, "comment")} />,
    }),
  ];


  const updateItem = (val: string, index: number, type: string) => {
    const newArray = importDatas.map((item: any, idx: any) => {
      if (idx === index) {
        return { ...item, [type]: val, };
      }
      return item;
    });
    setImportDatas(newArray);
  }
  const bg = theme === "light" ? "#C9D5D8" : "#0A2328";

  const importingFinishHandler = async () => {
    // handle api
    console.log("importDatas========", importDatas)
    console.log("importContact========", importContact)
    setActiveTopBar(3)
  }

  return (
    <ImportStep3Container>
      <BackPageButton $theme={theme} className="mb-2 d-flex align-items-center" onClick={() => setActiveTopBar(1)}>
        <img src="/chevron_back.svg" alt="Previous" className="mr-2" />
        <span className="p-2">{t("Return")}</span>
      </BackPageButton>
      <ImportStep3SubContainer>
        <div className="d-flex flex-column flex-md-row" >
          <Col className="titles mx-0 px-0">
            <ParagraphTitle $theme={theme}>{t("Check if all columns match")}</ParagraphTitle>
          </Col>
          <ButtonContainer className="d-flex mb-2 ">
            <DropdownHome action={
              <>
                <DownloadButton $theme={theme}>
                  <p className=" mb-0">{t("List")} A</p>
                  <input type="checkbox" style={{ backgroundColor: "transparent" }} />
                </DownloadButton>
                <DownloadButton $theme={theme}>
                  <p className=" mb-0">{t("List")} B</p>
                  <input type="checkbox" style={{ backgroundColor: "transparent" }} />
                </DownloadButton>
                <DownloadButton $theme={theme}>
                  <p className=" mb-0">{t("List")} C</p>
                  <input type="checkbox" style={{ backgroundColor: "transparent" }} />
                </DownloadButton>
                <DownloadButton $theme={theme}>
                  <p className=" mb-0">{t("List")} D</p>
                  <input type="checkbox" style={{ backgroundColor: "transparent" }} />
                </DownloadButton>
              </>
            } name={t("Add to List")} />
            <CustomButton onclick={importingFinishHandler} child={<div className="d-flex gap-2">{t("Finish importing")}</div>} />
          </ButtonContainer>
        </div>
      </ImportStep3SubContainer>
      <TableContainer $issidebarOpened={isSidebarOpened} className="table_container">
        <SubContainer className="table">
          <CustomTable
            hideCheckbox={true}
            headerColor={"#051316"}
            backgroundColor={bg}
            radius={"16px"}
            hidePagination={true}
            columns={columns}
            data={importDatas}
            maxWidth={400}
            theme={theme}
          />
        </SubContainer>

      </TableContainer>
    </ImportStep3Container>
  );
}

export default ImportStep3;
