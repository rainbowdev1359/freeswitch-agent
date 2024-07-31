import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../CustomTable/Table";
import { defaultData } from "../../data/billing";
import { BillingHistoryType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./billing.css";
import { EditPackageButton, RecordingTableContainer, BHParagraph, CustomTableContainer } from "../StyleComponents";
import { exportToCsv } from '../../utils/exportCsv';
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<BillingHistoryType>();

export function BillingHistoryTable() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [billingHistoryList, setBillingHistoryList] = useState<BillingHistoryType[]>(defaultData);

  const columns = [
    columnHelper.accessor("id", { header: () => <span>{t('Invoice ID')}</span> }),
    columnHelper.accessor("name", { header: () => <span>{t('Name')}</span> }),
    columnHelper.accessor("companyName", { header: () => <span>{t('Company Name')}</span> }),
    columnHelper.accessor("service", { header: () => <span>{t('Service')}</span> }),
    columnHelper.accessor("date", { header: () => <span>{t('Billing date')}</span> }),
    columnHelper.accessor("email", { header: () => <span>{t('Email address')}</span> }),
    columnHelper.accessor("phone", { header: () => <span>{t('Phone number')}</span> }),
    columnHelper.accessor("amount", { header: () => <span>{t('Amount')}</span> }),
    columnHelper.display({
      id: "status",
      header: () => <span>{t('Status')}</span>,
      cell: (props: any) => (
        <Row style={{ display: "flex", margin: "0 2px", width: "100%", gap: "4px", alignItems: "center", }} >
          {t(billingHistoryList[props.row.id].status)}
        </Row>
      ),
    }),
    columnHelper.display({
      id: "action",
      header: () => <span>{t('Download')}</span>,
      cell: (props: any) => (
        <Row style={{ display: "flex", margin: "0 2px", width: "100%", gap: "4px", alignItems: "center", }} >
          <EditPackageButton $theme={theme} className="" onClick={() => exportHandler(props.row.index)}>{t('Download')}</EditPackageButton>
        </Row>
      ),
    }),
  ];

  useEffect(() => {
    setBillingHistoryList(defaultData);
  }, []);

  const headers = [
    t("Invoice ID"),
    t("Name"),
    t("Company Name"),
    t("Service"),
    t("Billing date"),
    t("Email address"),
    t("Phone number"),
    t("Amount"),
    t("Status"),
  ];
  const exportHandler = (selected: number) => {
    const exportArray = billingHistoryList.filter((_item, index) => index === selected);
    const rows = exportArray.map((row: any) => [
      row.id,
      row.name,
      row.companyName,
      row.service,
      row.date,
      row.email,
      row.phone,
      row.amount,
      row.status
    ]);
    exportToCsv(`${exportArray[0].id}_billing_history_data.csv`, [headers, ...rows]);
  }

  const exportAll = () => {
    const rows = billingHistoryList.map((row: any) => [
      row.id,
      row.name,
      row.companyName,
      row.service,
      row.date,
      row.email,
      row.phone,
      row.amount,
      row.status
    ]);
    exportToCsv("billing_history_data.csv", [headers, ...rows]);
  }

  return (
    <RecordingTableContainer className="">
      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between py-4">
        <div className="d-flex flex-column">
          <BHParagraph $theme={theme}>{t('Showing invoice for the past 12 months')}</BHParagraph>
        </div>
        <EditPackageButton $theme={theme} className="" onClick={exportAll}>{t('Download')}</EditPackageButton>
      </div>
      <CustomTableContainer className="table_container">
        <CustomTable
          data={billingHistoryList}
          theme={theme}
          columns={columns}
        />
      </CustomTableContainer>
    </RecordingTableContainer>
  );
}
