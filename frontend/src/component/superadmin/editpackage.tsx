import React, { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DraggablePackageTable from "../CustomTable/DraggablePackageTable";
import { editPackages } from "../../data/superadmin";
import { EditPackType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import DeleteModal from "../modals/DeleteModal";
import "react-datepicker/dist/react-datepicker.css";
import "./superadmin.css";
import { useNavigate } from "react-router-dom";
import BuySpaceTable from "../knowledge/BuySpaceTable";
import PoscallModal from "../modals/Postcall";
import { EditPackageButton, ControllerContainer, Title, MPParagraph, RecordingTableContainer, PackageTableContainer, BHParagraph } from "../StyleComponents";
import { useTranslation } from 'react-i18next';
import PageBackButton from "../PageBackButton";
import BillingModalComponent from '../billing/billingModalComponent';

const columnHelper = createColumnHelper<EditPackType>();

function Editpackage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [packageList, setPackageList] = useState<EditPackType[]>(editPackages);
  const [chooseModalshow, setChooseModalshow] = useState(false);
  const [cardModalShow, setCardModalShow] = useState(false);
  const [buySpaceModalShow, setBuySpaceModalShow] = useState(false);

  const columns = [
    columnHelper.display({
      id: "description", header: () => <span>{t('Description')}</span>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px" }}>{t(packageList[props.row.id].description)}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "starter", header: () => <p className="text-center mb-0">{t('Starter Tier')}<br />{t('Your AI Odyssey Begins')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].starter}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "professional", header: () => <p className="text-center mb-0">{t('Professional Tier')}<br />{t('Scaling Your Reach')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].professional}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "enterprise", header: () => <p className="text-center mb-0">{t('Enterprise Tier')}<br />{t('Full Spectrum AI Engagement')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].enterprise}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "ultimate", header: () => <p className="text-center mb-0">{t('Ultimate Tier')}<br />{t('The AI Vanguard')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} style={{ margin: "0 2px", justifyContent: "center", textAlign: "center" }}>{packageList[props.row.id].ultimate}</BHParagraph>
      )
    }),
  ];

  useEffect(() => {
    setPackageList(editPackages);
  }, []);

  const chooseHandler = async () => {
    setChooseModalshow(false);
  }

  const chooseConfirmHandler = async () => {
    setChooseModalshow(false);
    setCardModalShow(true)
  }

  const onChoose = (type: string) => {
    console.log(type)
    setChooseModalshow(true)
  }

  return (
    <RecordingTableContainer style={{ height: "100%" }}>
      <PageBackButton />
      <ControllerContainer className="d-flex gap-2 flex-column flex-wrap justify-content-between">
        <div className="d-flex flex-column">
          <Title theme={theme}>{t('Change your plan')}</Title>
          <MPParagraph>{t("Pick another plan below; these plans are carefully curated based on your preference. If you need a custom package, contact customer support or your sales rep.")}</MPParagraph>
        </div>
        <div className="d-flex gap-2 justify-content-end mb-3">
          <EditPackageButton $theme={theme} className="" onClick={() => navigate("/superadmin/edit-minute-prices")}>{t("Edit call rates")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="" onClick={() => setBuySpaceModalShow(true)}>{t("Edit buy more space")}</EditPackageButton>
        </div>
      </ControllerContainer>
      <div className="d-flex flex-column">
        <div className="d-flex gap-2 justify-content-end mb-3">
          <EditPackageButton $theme={theme} className="" onClick={() => navigate("/superAdmin/edit-package")}>{t("Edit")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="" onClick={() => navigate("/superAdmin/edit-package")}>{t("Save")}</EditPackageButton>
          <EditPackageButton $theme={theme} className="" onClick={() => navigate("/superAdmin/edit-package")}>{t("Delete")}</EditPackageButton>
        </div>
      </div>

      <PackageTableContainer className="table_container">
        <DraggablePackageTable
          data={packageList}
          theme={theme}
          hideCheckbox
          hidePagination
          pageSize={100}
          columns={columns}
          onChoose={onChoose}
        />
      </PackageTableContainer>

      <EditPackageButton $theme={theme} className="" onClick={() => navigate("/superAdmin/edit-package")}>{t("Add feature")} +</EditPackageButton>

      <DeleteModal
        onHide={chooseHandler}
        onCancel={chooseHandler}
        onContinue={chooseConfirmHandler}
        show={chooseModalshow}
        title={t("Are you sure you want to choose this tier for $2,999?")}
        subTitle={t("If yes, the tier will be changed in the next billing cycle.")}
        cancelTitle={t("No I dont want to")}
        confirmTitle={t("Yes I want to change")}
      />

      <PoscallModal
        children={<BuySpaceTable onHide={() => setBuySpaceModalShow(false)} isEdit={true} />}
        show={buySpaceModalShow}
        onHide={() => setBuySpaceModalShow(false)}
        title={t("Buy more space")}
      />

      <BillingModalComponent cardModalShow={cardModalShow} setCardModalShow={setCardModalShow} />
    </RecordingTableContainer>
  );
}

export default Editpackage;
