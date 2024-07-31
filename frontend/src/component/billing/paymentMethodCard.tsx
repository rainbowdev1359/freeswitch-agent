import React, { useState } from "react";
import { paymentMethods } from "../../data/billing";
import { ActionContainer, ActionImage } from "../CustomTable/TableComponent";
import { PaymentMethodType } from "../../types/types";
import { PaymentMethodNew } from "./paymentMethodNew";
import TableImageRender from "../TableImageRender";
import DeleteModal from "../modals/DeleteModal";
import PoscallModal from "../modals/Postcall";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { LinkP, UnderLineSpan, PMParagraph, } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

export function PaymentMethodCard({ paymentMethod, isCheck }: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [paymentMethodList, setPaymentMethodList] = useState<PaymentMethodType[]>(paymentMethods);
  const [deleteModalshow, setDeleteModalshow] = useState(false);
  const [selectedCall, setSelectedCall] = useState<PaymentMethodType | null>(null);
  const [cardModalShow, setCardModalShow] = useState(false);

  const deleteCancelHandler = async () => {
    setDeleteModalshow(false);
    setSelectedCall(null);
  }

  const deleteHandler = async () => {
    const newArray = paymentMethodList.filter((item) => item !== selectedCall);
    setPaymentMethodList(newArray)
    setDeleteModalshow(false);
    setSelectedCall(null);
  }

  const editCardHandler = (paymentMethod: PaymentMethodType) => {
    setCardModalShow(true);
    setSelectedCall(paymentMethod);
  }

  const cancelCardHandler = () => {
    setCardModalShow(false);
    setSelectedCall(null);
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <img src={`/${paymentMethod.type}${theme == "light" ? "-light" : ""}.svg`} alt="" />
        </div>
        <div>
          <h6 className="fw-bold ">{paymentMethod?.name}</h6>
          <h6 className="fw-bold ">{paymentMethod?.number}</h6>
          <p>{t('Expiry on')}: {paymentMethod?.expiry}</p>
        </div>
        <div className="d-flex flex-row gap-3 align-items-center">
          <LinkP $theme={theme} className="text-lg-end text-center px-3 py-2 mb-lg-0 mb-2" onClick={() => editCardHandler(paymentMethod)}>
            <UnderLineSpan>{t('Edit details')}</UnderLineSpan>
          </LinkP>
          {isCheck && <input type="checkbox" />}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <LinkP $theme={theme} className="text-lg-end text-center px-3 py-2 mb-lg-0 mb-2" onClick={() => editCardHandler(paymentMethod)}>
          <UnderLineSpan>{t('Default')}</UnderLineSpan>
        </LinkP>
        <ActionContainer $theme={theme} onClick={() => {
          setSelectedCall(paymentMethod);
          setDeleteModalshow(true);
        }}>
          <ActionImage>
            <TableImageRender light="/delete-light.svg" dark="/delete.svg" />
          </ActionImage>
        </ActionContainer>
      </div>

      <PoscallModal
        children={<PaymentMethodNew setCardModalShow={setCardModalShow} />}
        show={cardModalShow}
        onHide={cancelCardHandler}
        title={
          <div className="d-flex flex-column gap-2 text-start" style={{ paddingLeft: "12px" }}>
            <PMParagraph $theme={theme}>{t('Add new card')}</PMParagraph>
            <p style={{ color: "#57757B", fontSize: "14px", marginBottom: "0px" }}>{t('Add your credit or debit card below. This card will be saved to your account and can be removed at any time.')}</p>
          </div>
        }
      />

      <DeleteModal
        onHide={deleteCancelHandler}
        onCancel={deleteCancelHandler}
        onContinue={deleteHandler}
        show={deleteModalshow}
        title={t("Are you sure you want to delete this credit card?")}
      />
    </>
  );
}
