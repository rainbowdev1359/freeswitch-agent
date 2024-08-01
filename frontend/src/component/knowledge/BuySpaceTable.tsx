import React, { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DraggablePackageTable from "../CustomTable/DraggablePackageTable";
import { buySpaceData } from "../../data/superadmin";
import { BuySpaceType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import { RecordingTableContainer, BHParagraph, LinkP, AParagraph } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

const columnHelper = createColumnHelper<BuySpaceType>();

function BuySpaceTable({ onHide, isEdit = false }: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [packageList, setPackageList] = useState<BuySpaceType[]>(buySpaceData);

  const columns = [
    columnHelper.display({
      id: "description", header: () => <p className="py-2">{t('Description')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px" }}>{t(packageList[props.row.id].description)}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "starter", header: () => <p className="text-center py-2 text-black mx-2" style={{ borderRadius: "12px", background: "#d3dcdf" }}>{t('Starter Tier')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].starter}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "silver", header: () => <p className="text-center py-2 text-black mx-2" style={{ borderRadius: "12px", background: "#d3dcdf" }}>{t('Silver')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].silver}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "gold", header: () => <p className="text-center py-2 text-black mx-2" style={{ borderRadius: "12px", background: "#d3dcdf" }}>{t('Gold')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].gold}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "platinum", header: () => <p className="text-center py-2 text-black mx-2" style={{ borderRadius: "12px", background: "#d3dcdf" }}>{t('Platinum')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].platinum}</BHParagraph>
      )
    }),
  ];

  useEffect(() => {
    setPackageList(buySpaceData);
  }, []);

  const onChoose = (type: string) => {
    console.log(type)
    onHide()
  }

  return (
    <RecordingTableContainer style={{ height: "100%" }}>
      {isEdit &&
        <div className="d-flex flex-wrap gap-2 justify-content-end mb-2">
          <LinkP $theme={theme} >
            <AParagraph $theme={theme}>{t('Add a column')}</AParagraph>
          </LinkP>
          <LinkP $theme={theme} >
            <AParagraph $theme={theme}>{t('Add a row')}</AParagraph>
          </LinkP>
          <LinkP $theme={theme} >
            <AParagraph $theme={theme}>{t('Edit')}</AParagraph>
          </LinkP>
          <LinkP $theme={theme} >
            <AParagraph $theme={theme}>{t('Save')}</AParagraph>
          </LinkP>
        </div>
      }
      <DraggablePackageTable
        data={packageList}
        theme={theme}
        hideCheckbox
        hidePagination
        columns={columns}
        onChoose={onChoose}
        chooseTitle="Buy now"
      />
    </RecordingTableContainer>
  );
}

export default BuySpaceTable;
