import React, { useState, useEffect } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import DraggablePackageTable from "../CustomTable/DraggablePackageTable";
import { editPackages } from "../../data/superadmin";
import { EditPackType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PageBackButton from "../PageBackButton";
import DeleteModal from "../modals/DeleteModal";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { BHParagraph, EditPackageButton, ControllerContainer, RecordingTableContainer, MPParagraph, PackageTableContainer, Title } from "../StyleComponents";
import { useTranslation } from 'react-i18next';
import BillingModalComponent from './billingModalComponent';

const columnHelper = createColumnHelper<EditPackType>();

function ChangePlan() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cancelModalshow, setCancelModalshow] = useState(false);
  const [chooseModalshow, setChooseModalshow] = useState(false);
  const [cardModalShow, setCardModalShow] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [packageList, setPackageList] = useState<EditPackType[]>(editPackages);

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
        <BHParagraph $theme={theme} className="text-center mb-0">{packageList[props.row.id].starter}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "professional", header: () => <p className="text-center mb-0">{t('Professional Tier')}<br />{t('Scaling Your Reach')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} className="text-center mb-0">{packageList[props.row.id].professional}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "enterprise", header: () => <p className="text-center mb-0">{t('Enterprise Tier')}<br />{t('Full Spectrum AI Engagement')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} className="text-center mb-0">{packageList[props.row.id].enterprise}</BHParagraph>
      )
    }),
    columnHelper.display({
      id: "ultimate", header: () => <p className="text-center mb-0">{t('Ultimate Tier')}<br />{t('The AI Vanguard')}</p>,
      cell: (props: any) => (
        <BHParagraph $theme={theme} className="text-center mb-0">{packageList[props.row.id].ultimate}</BHParagraph>
      )
    }),
  ];

  useEffect(() => {
    setPackageList(editPackages);
  }, []);

  const cancelHandler = async () => {
    setCancelModalshow(false);
    navigate(-1);
  }


  const cancelConfirmHandler = async () => {
    setCancelModalshow(false);
    navigate(-1);
  }

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
      <ControllerContainer className="d-flex gap-2 flex-wrap justify-content-between">
        <div className="d-flex flex-column">
          <Title theme={theme}>{t('Change your plan')}</Title>
          <MPParagraph>{t("Pick another plan below, these plans are carefully curated based on your preference.")}</MPParagraph>
        </div>
        <div className="d-flex gap-2 justify-content-end mb-3">
          <EditPackageButton $theme={theme} className="" onClick={() => setCancelModalshow(true)}>{t("Cancel your plan")}</EditPackageButton>
        </div>
      </ControllerContainer>

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

      <BillingModalComponent cardModalShow={cardModalShow} setCardModalShow={setCardModalShow} />

      <DeleteModal
        onHide={cancelHandler}
        onCancel={cancelHandler}
        onContinue={cancelConfirmHandler}
        show={cancelModalshow}
        title={t("Are you sure you want to cancel your plan?")}
        subTitle={t("Your current plan will be canceled and you will not be able to access after the next billing date")}
        cancelTitle={t("No I want to keep it")}
        confirmTitle={t("Yes, I am sure")}
      />
    </RecordingTableContainer>
  );
}

export default ChangePlan;
