import React, { useState } from "react";
import Papa from 'papaparse';
import { Row } from "react-bootstrap";
import styled from "styled-components";
import CustomButton from "./CustomButton";
import DragAndDrop from "../DragAndDrop";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PageBackButton from "../PageBackButton";
import { useTranslation } from 'react-i18next';

const UploadContainer = styled.div<{ $theme?: string }>`
  width:500px;
  background-color: ${(props) => props.$theme == "light" ? "#C9D5D8" : "rgba(10, 35, 40, 1)"};
  border-radius: 10px;
`;

const ImportStep2Container = styled(Row)`
  padding: 0 40px;
  margin: 0;
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height:calc(100vh - 200px);
`;

interface CSVData {
  [key: string]: string;
}


function ImportStep2({ setActiveTopBar, uploadData }: { setActiveTopBar?: any, uploadData: any }) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [data, setData] = useState<CSVData[]>([]);
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const handleFileUpload = (file: any) => {
    Papa.parse<CSVData>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setData(results.data);
        uploadData(results.data);
        console.log("results==========", results)
      },
    });
  }

  return (
    <div>
      <PageBackButton />
      <ImportStep2Container>
        <UploadContainer $theme={theme} className="p-2">
          <DragAndDrop
            subTitle={t("(only accepting csv, xls, xlsx, xlsb, formats)")}
            color={theme == "light" ? "#E5ECEE" : `rgba(5, 19, 22, 1)`}
            getFileData={handleFileUpload}
          />
          <div className="justify-content-end mt-2 gap-3 flex-wrap d-flex">
            <div className="d-flex  gap-2 align-items-center px-3" style={{ backgroundColor: "#224D57", borderRadius: "20px" }}>
              <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
              <p className=" mb-0 text-white">First row is a header</p>
            </div>
            <CustomButton
              onclick={() => setActiveTopBar(2)}
              disabled={data.length == 0}
              child={
                <div className="d-flex gap-2">
                  {t("Next step")}
                  <img src="/nextIcon.svg" alt="" />
                </div>
              }
            />
          </div>
        </UploadContainer>
      </ImportStep2Container>
    </div>
  );
}

export default ImportStep2;
