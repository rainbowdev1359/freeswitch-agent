import React, { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../CustomTable/Table";
import { editMinutePriceData } from "../../data/superadmin";
import { EditMinutePriceTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./superadmin.css";
import { useNavigate } from "react-router-dom";
import PageBackButton from "../PageBackButton";
import AgentRate from "./agentRate";
import PoscallModal from "../modals/Postcall";
import { HMod, EditPackageButton, ModalTitle, RecordingTableContainer, CustomTableContainer, } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<EditMinutePriceTableType>();

function EditMinutePrices() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [superAdminList, setSuperAdminList] = useState<EditMinutePriceTableType[]>(editMinutePriceData);
  const [cardModalShow, setCardModalShow] = useState(false);

  const columns = [
    columnHelper.accessor("code", {
      header: () => <p className="text-center mb-0">{t('Code')}</p>,
      cell: (info) => <p className="text-center mb-0">{info.getValue()}</p>,
    }),
    columnHelper.accessor("destination", {
      header: () => <p className="text-center mb-0">{t('Destination')}</p>,
      cell: (info) => <p className="text-center mb-0">{info.getValue()}</p>,
    }),
    columnHelper.accessor("increments", {
      header: () => <p className="text-center mb-0">{t('Increments')}</p>,
      cell: (info) => <p className="text-center mb-0">{info.getValue()}</p>,
    }),
    columnHelper.accessor("cost_per_minute", {
      header: () => <p className="text-center mb-0">{t('Cost per Minute')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("connect_charge", {
      header: () => <p className="text-center mb-0">{t('Connect Charge')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("additional_cost", {
      header: () => <p className="text-center mb-0">{t('Additional Cost')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("tts_cost_min", {
      header: () => <p className="text-center mb-0">{t('TTS Cost/min')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("engine_cost_min", {
      header: () => <p className="text-center mb-0">{t('Engine Cost/min')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("total_cost_min", {
      header: () => <p className="text-center mb-0" style={{ borderRadius: "12px", background: "#1f6b7a" }}>{t('Total Cost/min')}</p>,
      cell: (info) => <p className="text-center mb-0 mx-1" style={{ borderRadius: "12px", background: "#1f6b7a" }}>$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("margins_percent", {
      header: () => <p className="text-center mb-0">{t('Margins %')}</p>,
      cell: (info) => <p className="text-center mb-0">{info.getValue()}%</p>,
    }),
    columnHelper.accessor("margins_cost", {
      header: () => <p className="text-center mb-0">{t('Margins $')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("sale_price", {
      header: () => <p className="text-center mb-0 mx-2" style={{ borderRadius: "12px", background: "#1f6b7a" }}>{t('Sale Price')}</p>,
      cell: (info) => <p className="text-center mb-0 mx-2" style={{ borderRadius: "12px", background: "#1f6b7a" }}>$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("vip_price", {
      header: () => <p className="text-center mb-0 text-black mx-2" style={{ borderRadius: "12px", background: "#d3dcdf" }}>{t('VIP Price')}</p>,
      cell: (info) => <p className="text-center mb-0 text-black mx-2" style={{ borderRadius: "12px", background: "#d3dcdf" }}>$ {info.getValue()}</p>,
    }),
  ];

  useEffect(() => {
    setSuperAdminList(editMinutePriceData);
  }, []);

  return (
    <RecordingTableContainer className="">
      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between">
        <PageBackButton />
        <div className="d-flex flex-wrap gap-2">
          <EditPackageButton $theme={theme} className="" onClick={() => setCardModalShow(true)}>{t("Agent rates")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="" onClick={() => navigate("/superadmin/license-minute-prices")}>{t("Licensee prices")}</EditPackageButton>
        </div>
      </div>
      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between pb-4">
        <div className="d-flex flex-column">
          <HMod theme={theme}>{t("Call Rates Per Minute by Country")}</HMod>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <EditPackageButton $theme={theme} className="">{t("Import")}</EditPackageButton>
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

      <PoscallModal
        children={<AgentRate cancelModal={() => setCardModalShow(false)} />}
        show={cardModalShow}
        onHide={() => setCardModalShow(false)}
        title={
          <div className="d-flex flex-column gap-2 text-cemter" style={{ paddingLeft: "12px" }}>
            <ModalTitle theme={theme} className="m-auto">{t('Add to credit balance.')}</ModalTitle>
          </div>
        }
      />

    </RecordingTableContainer>
  );
}

export default EditMinutePrices;
