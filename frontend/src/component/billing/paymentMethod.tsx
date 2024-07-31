import React, { useState } from "react";
import { paymentMethods } from "../../data/billing";
import { PaymentMethodType } from "../../types/types";
import { PaymentMethodCard } from "./paymentMethodCard";
import { PaymentMethodNew } from "./paymentMethodNew";
import DeleteModal from "../modals/DeleteModal";
import PoscallModal from "../modals/Postcall";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { SectionParent, PMParagraph, LinkP } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

export function PaymentMethod() {
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

  const cancelCardHandler = () => {
    setCardModalShow(false);
    setSelectedCall(null);
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      {paymentMethodList.map((paymentMethod, index) => (
        <SectionParent theme={theme} key={index} className="p-4">
          <PaymentMethodCard paymentMethod={paymentMethod} isCheck={false} />
        </SectionParent>
      ))}

      <SectionParent theme={theme} className="p-4">
        <div className="d-flex w-full flex-column align-items-center justify-content-center">
          <LinkP $theme={theme} className="" onClick={() => setCardModalShow(true)}>{t("Add new card")} + </LinkP>
          <label className="text-center text-secondary my-3">{t("Or")}</label>
          <LinkP $theme={theme} className="">{t('Pay with WIRE')} <img src="/bitcoin-(btc).svg" /></LinkP>
        </div>
      </SectionParent>

      <PoscallModal
        children={<PaymentMethodNew setCardModalShow={setCardModalShow} />}
        show={cardModalShow}
        onHide={cancelCardHandler}
        title={
          <div className="d-flex flex-column gap-2 text-start" style={{ paddingLeft: "12px" }}>
            <PMParagraph $theme={theme}>{t("Add new card")}</PMParagraph>
            <p style={{ color: "#57757B", fontSize: "14px", marginBottom: "0px" }}>Add your credit or debit card below. This card will be saved to your account and can be removed at any time.</p>
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

    </div>
  );
}
