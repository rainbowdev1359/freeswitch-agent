import React, { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../CustomTable/Table";
import { licenseMinutePriceData } from "../../data/superadmin";
import { LicenseMinutePriceTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./superadmin.css";
import DragAndDrop from "../DragAndDrop";
import Postcall from "../modals/Postcall";
import PageBackButton from "../PageBackButton";
import { HMod, EditPackageButton, RecordingTableContainer, CustomTableContainer, ContactRecordModalContainer, ContactRecordLinkP, UnderLineSpan } from "../StyleComponents";
import { useTranslation } from 'react-i18next';
import { exportToCsv } from '../../utils/exportCsv';

const columnHelper = createColumnHelper<LicenseMinutePriceTableType>();

function LicenseMinutePrices() {
  const { t } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [superAdminList, setSuperAdminList] = useState<LicenseMinutePriceTableType[]>(licenseMinutePriceData);

  const columns = [
    columnHelper.accessor("code", {
      header: () => <p className="text-center mx-2 py-2">{t('Code')}</p>,
      cell: (info) => <p className="text-center mx-2 py-2">{info.getValue()}</p>,
    }),
    columnHelper.accessor("destination", {
      header: () => <p className="text-center mx-2 py-2">{t('Destination')}</p>,
      cell: (info) => <p className="text-center mx-2 py-2">{info.getValue()}</p>,
    }),
    columnHelper.accessor("cost_min", {
      header: () => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#0A2328" }}>{t('Cost/min')}</p>,
      cell: (info) => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#0A2328" }}>$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("essential_launchpad", {
      header: () => <p className="text-center mx-2 py-2 text-black" style={{ borderRadius: "12px", background: "#A1D9FC" }}>{t('Essential Launchpad')}</p>,
      cell: (info) => <p className="text-center mx-2 py-2 text-black" style={{ borderRadius: "12px", background: "#A1D9FC" }}>$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("professional_expansion", {
      header: () => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#4094D2" }}>{t('Professional Expansion')}</p>,
      cell: (info) => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#4094D2" }}>$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("advanced_engagement", {
      header: () => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#0673DC" }}>{t('Advanced Engagement')}</p>,
      cell: (info) => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#0673DC" }}>$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("elite_performance", {
      header: () => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#0E39D3" }}>{t('Elite Performance')}</p>,
      cell: (info) => <p className="text-center mx-2 py-2" style={{ borderRadius: "12px", background: "#0E39D3" }}>$ {info.getValue()}</p>,
    }),
  ];

  useEffect(() => {
    setSuperAdminList(licenseMinutePriceData);
  }, []);

  const getFileData = (fileData: File | null | undefined) => {
    console.log(fileData);
  }

  const downloadExample = () => {
    const header = ["code", "destination", "cost_min", "essential_launchpad", "professional_expansion", "advanced_engagement", "elite_performance",]
    exportToCsv(`Licensee Minute Prices Example Data.csv`, [header, []]);
  }

  return (
    <RecordingTableContainer className="">
      <PageBackButton />
      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between pb-4">
        <div className="d-flex flex-column">
          <HMod theme={theme}>{t("Call Rates Per Minute by Country")}</HMod>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <EditPackageButton $theme={theme} className="" onClick={() => setModalShow(true)}>{t("Import")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="">{t("Export")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="">{t("Edit")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="">{t("Save")}</EditPackageButton>
        </div>
      </div>
      <CustomTableContainer className="table_container">
        <CustomTable
          headerColor={"transparent"}
          data={superAdminList}
          theme={theme}
          columns={columns}
          hideCheckbox
        />
      </CustomTableContainer>

      <Postcall
        show={modalShow}
        onHide={() => setModalShow(false)}
        children={
          <ContactRecordModalContainer>
            <div className="flex-grow flex-column w-full">
              <div className={`${theme == "light" ? "text-dark" : "text-light"} mb-2`}>
                {t("Upload file")}
              </div>
              <DragAndDrop
                color={theme == "light" ? "#E5ECEE" : `rgba(5, 19, 22, 1)`}
                getFileData={getFileData}
                accept={".csv"}
                subTitle="(CSV Comma Delimited)"
              />
            </div>

            <div className="d-flex w-full gap-2 align-items-end justify-content-end mt-3">
              <ContactRecordLinkP $theme={theme} className=" text-center py-2" onClick={downloadExample}>
                <img src={"/download.svg"} alt="" />
                <UnderLineSpan>
                  {t("Download example")}
                </UnderLineSpan>
              </ContactRecordLinkP>
              <button onClick={() => {
                setModalShow(false);
                setTimeout(() => { }, 2000);
                // navigate("/contact/import-data?type=contact");
              }} className="modal_button">
                <div className="d-flex align-items-center px-2">{t("Upload")}</div>
              </button>
            </div>
          </ContactRecordModalContainer>
        }
        title={t("Import CSV file")}
      />

    </RecordingTableContainer>
  );
}

export default LicenseMinutePrices;
