import React, { useState, useEffect } from "react";
import { DropdownButton } from "../DropDown";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../CustomTable/Table";
import { agentRateData } from "../../data/superadmin";
import { countryLists } from "../../data/country";
import { AgentRateType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./superadmin.css";
import { HMod, EditPackageButton, Title, } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<AgentRateType>();

function AgentRates({cancelModal}: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [agentRateList, setAgentRateList] = useState<AgentRateType[]>(agentRateData);
  const [country, setCountry] = useState("");

  const columns = [
    columnHelper.accessor("amount", {
      header: () => <p className="text-center mb-0">{t('Amount')}</p>,
      cell: (info) => <p className="text-center mb-0">{info.getValue()}</p>,
    }),
    columnHelper.accessor("line_cost", {
      header: () => <p className="text-center mb-0">{t('Line Cost ')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("engine_cost", {
      header: () => <p className="text-center mb-0">{t('Engine Cost')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("total_cost", {
      header: () => <p className="text-center mb-0">{t('Total cost')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("margins", {
      header: () => <p className="text-center mb-0">{t('Margins %')}</p>,
      cell: (info) => <p className="text-center mb-0">{info.getValue()}%</p>,
    }),
    columnHelper.accessor("sale_agent", {
      header: () => <p className="text-center mb-0">{t('Sale / Agent')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
    columnHelper.accessor("vip_price", {
      header: () => <p className="text-center mb-0">{t('VIP Price')}</p>,
      cell: (info) => <p className="text-center mb-0">$ {info.getValue()}</p>,
    }),
  ];

  useEffect(() => {
    setAgentRateList(agentRateData);
  }, []);

  const handleCountrySelect = async (val: string) => {
    console.log(country)
    setCountry(val);
  };

  return (
    <>
      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between pb-4">
        <div className="d-flex flex-column">
          <HMod theme={theme}>{t("Select a Country to see agent rates")}</HMod>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <div className="d-flex gap-0 flex-column">
            <Title theme={theme}>{t('Country')}</Title>
            <DropdownButton color={["white", "#185968"]} options={countryLists.map(item => item.title)} onSelect={handleCountrySelect} placeholder={t('Country')} isFull={true} />
          </div>
        </div>
      </div>
      <CustomTable
        data={agentRateList}
        theme={theme}
        hideCheckbox
        columns={columns}
      />
      <div className="d-flex flex-wrap gap-2">
        <EditPackageButton $theme={theme} className="" onClick={cancelModal}>{t("Add row")} +</EditPackageButton>
      </div>
      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-end">
        <div className="d-flex flex-wrap gap-2">
          <EditPackageButton $theme={theme} className="" onClick={cancelModal}>{t("Cancel and go back")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="" onClick={cancelModal}>{t("Save")}</EditPackageButton>
        </div>
      </div>
    </>
  );
}

export default AgentRates;
