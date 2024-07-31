import { createColumnHelper } from "@tanstack/react-table";
import React from "react";
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";
import CustomTable from "../CustomTable/Table";
import CustomButton from "./CustomButton";
import { contactEditType, contactType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ParagraphTitle = styled.p<{ $theme?: string }>`
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  flex-grow: 1;
  color: ${(props) =>
    props.$theme == "light" ? "#051316" : "white"};
`;

const DownloadButton = styled.button`
  width: fit-content;
  padding: 0 12px;
  display: flex;
  background-color: rgba(10, 35, 40, 1);
  border: none;

  align-items: center;


  border-radius: 16px;
  gap: 2px;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;
const ImportStep1Container = styled(Row)`
  padding: 48px 40px;
  margin: 0;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const ImportStep1SubContainer = styled(Row)`
  width: 100%;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    min-width: 100%;

    justify-content: center;
    align-items: center;
  }
`;
const DownloadImage = styled.img`
  width: 30px;
`;


const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  
  padding: 0;
  margin: 0px;
`;
const Input = styled.input`
  background-color: transparent;
  border: none;
  color: rgba(150, 173, 179, 1);
  outline: none;
`;
function ImportStep1({ setActiveTopBar }: { setActiveTopBar?: any }) {
  const theme = useSelector((state: RootState) => state.theme.theme);

  const columnHelper = createColumnHelper<contactEditType>();

  const columns = [

    columnHelper.accessor("first_name", {
      header: () => "FirstName",
      cell: () => <Input placeholder="RAAM" />,
    }),
    columnHelper.accessor("last_name", {
      header: () => "LastName",
      cell: () => <Input placeholder="Roon" />,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "Example",
      cell: () => <Input placeholder="email@email.com" />,
      header: () => <span>Example</span>,
    }),
    columnHelper.accessor("phone", {
      cell: () => <Input placeholder="+135792468" />,
    }),


  ];



  const sampleData: contactType[] = [
    {
      columnName: "last_name",
      example: "Doe",
      list: "Long list",
      description: "Leads Last name",
    },
  ];

  const bg = theme === "light" ? "#C9D5D8" : "#0A2328"
  return (
    <ImportStep1Container>
      <ImportStep1SubContainer>
        <Col className="titles mx-0 px-0">
          <ParagraphTitle
            $theme={theme}
          >Before you import contact check the example.</ParagraphTitle>
          <p className="primary-text">
            The following columns are supported, This is an example of a contact format.
          </p>
        </Col>
      </ImportStep1SubContainer>
      <TableContainer>
        <CustomTable
          headerColor={"#051316"}
          backgroundColor={bg}
          radius={"20px"}
          hidePagination={true}
          columns={columns}
          data={sampleData}
          maxWidth={600}
          theme={theme}
        />
        <div className="justify-content-end pt-3 gap-2 d-flex">
          <DownloadButton>
            <DownloadImage src="/download.svg" alt="Download" />
            <p className="primary-text mb-0">Download example</p>
          </DownloadButton>
          <CustomButton
            onclick={() => setActiveTopBar(2)}
            child={
              <div className="d-flex gap-2 px-3">
                Import contact
                <img src="/upload-black.svg" alt="" />
              </div>
            }
          />
        </div>
      </TableContainer>
    </ImportStep1Container>
  );
}

export default ImportStep1;
