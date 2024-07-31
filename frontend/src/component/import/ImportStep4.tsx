import React from "react";
import { Row } from "react-bootstrap";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import { exportToCsv } from '../../utils/exportCsv';
import { exportContactHeaders } from '../../utils/lib';

const ImportStep4Container = styled(Row)`
  padding: 48px;
  height:calc(100vh - 200px) !important;
  margin: 0px;
  width: 100%;
  flex-grow: 1;
  gap:8px;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const SuccessImage = styled.img`
  widht:50px;
  height:50px;
`

const DownloadButton = styled.button`
  width: fit-content;
  padding:5px 20px;
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

const DownloadImage = styled.img`
  width: 30px;
`;

function ImportStep4({ importDatas }: { importDatas: any }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const exportHandler = async () => {
    const rows = importDatas.map((row: any) => [
      row.first_name,
      row.last_name,
      row.email,
      row.phone,
      row.company_name,
      row.company_address,
      row.customer_ID,
      row.comment,
    ]);
    exportToCsv(`imported_data.csv`, [exportContactHeaders, ...rows]);
  }

  return (
    <>
      <ImportStep4Container>
        <SuccessImage src="/impSuccess.svg" alt="" />
        <p className="primary-text text-center">{t("1 row was imported successfully imported")}</p>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <DownloadButton onClick={exportHandler} className="gap-2">
            <DownloadImage src="/download.svg" alt="Download" />
            <p className="primary-text mb-0 text-white">{t("Download csv with imported rows")}</p>
          </DownloadButton>
          <CustomButton onclick={() => navigate(-1)} child={<div className="d-flex gap-2">{t("Finish and go back")}</div>} />
        </div>
      </ImportStep4Container>

    </>
  );
}

export default ImportStep4;
