import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PaymentMethodCard } from "./paymentMethodCard";
import { paymentMethods } from "../../data/billing";
import { PaymentMethodType } from "../../types/types";
import PoscallModal from "../modals/Postcall";
import { PaymentMethodNew } from "./paymentMethodNew";
import CustomButton from "../import/CustomButton";
import CustomInput from "../CustomInput";
import { CreateButton, SectionParent, Title, SearchBtnContainer, LinkP, UnderLineSpan } from "../StyleComponents";
import "react-datepicker/dist/react-datepicker.css";
import "./billing.css";
import { useTranslation } from 'react-i18next';

function BillingModalComponent({ cardModalShow, setCardModalShow }: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const currentDate = new Date();
  const [selectedInput, setSelectedInput] = useState("");
  currentDate.setMonth(currentDate.getMonth() - 2);
  const [cardNewModalShow, setCardNewModalShow] = useState(false);
  const [paymentMethodList, setPaymentMethodList] = useState<PaymentMethodType[]>(paymentMethods);

  useEffect(() => {
    setPaymentMethodList(paymentMethods)
  }, [])

  const cancelCardHandler = () => {
    setCardModalShow(false);
  }

  const cancelNewCardHandler = () => {
    setCardNewModalShow(false);
  }

  const saveCardHandler = () => {
    setCardModalShow(false);
  }

  return (
    <>
      <PoscallModal
        children={
          <div className={`d-flex  flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="d-flex gap-0 flex-column">
              <div className="d-flex flex-column gap-2 justify-content-between mb-3" >
                <div className="d-flex gap-1 flex-column mb-2">
                  <Title theme={theme}>{t('Amount to pay')}</Title>
                  <Title theme={theme}>{t('$2,999')}</Title>
                </div>

                <div className="d-flex flex-wrap  align-items-center justify-content-between mb-3" >
                  <Title theme={theme}>{t('Choose payment method')}</Title>
                  <CreateButton $theme={theme} className="">{t('Pay by Wire Transfer')} <img src="/bitcoin-(btc).svg" /></CreateButton>
                </div>

                <div className="d-flex flex-wrap gap-2 align-items-center">
                  {paymentMethodList.map((paymentMethod, index) => (
                    <div key={index} className="d-flex flex-row gap-2 align-items-center">
                      <SectionParent theme={theme} className="p-4">
                        <PaymentMethodCard paymentMethod={paymentMethod} isCheck={true} />
                      </SectionParent>
                    </div>
                  ))}
                </div>

                <div className="d-flex gap-0 flex-row mt-2">
                  <LinkP className="d-flex text-lg-end text-center px-3 py-2 mb-lg-0 mb-2" onClick={() => setCardNewModalShow(true)}>
                    <UnderLineSpan>{t('Add new card')} +</UnderLineSpan>
                  </LinkP>
                </div>
              </div>

              <div className="mt-2">
                <CustomInput
                  selected={selectedInput}
                  setSelected={setSelectedInput}
                  children={
                    <div className="d-flex  flex-column">
                      <p className="">
                        {t("By checking this box I confirm that all the contacts I am importing have given me express written consent to contact them with artificial and pre-recorded voice calls. I also agree to comply with all relevant TCPA, TSR and regulatory laws/guidelines concerning my communication with these contacts.")}
                      </p>
                    </div>
                  }
                  name="type"
                  type="checkbox"
                  label={t("Sales")}
                  value="Sales"
                />
              </div>

              <SearchBtnContainer>
                <CustomButton onclick={cancelCardHandler} child={<span className="mb-0">{t('Cancel')}</span>} />
                <CustomButton onclick={saveCardHandler} child={<span className="mb-0">{t('Continue')}</span>} />
              </SearchBtnContainer>
            </div>
          </div>
        }
        show={cardModalShow}
        onHide={cancelCardHandler}
        title={
          <div className="d-flex flex-column gap-2 text-start" style={{ paddingLeft: "12px" }}>
            <Title theme={theme}>{t('Pay for Upgrade')}</Title>
            <p style={{ color: "#57757B", fontSize: "14px", marginBottom: "0px" }}>{t('Pay $2,999 to upgrade to Starter tier')}</p>
          </div>
        }
      />

      <PoscallModal
        children={<PaymentMethodNew setCardModalShow={setCardNewModalShow} />}
        show={cardNewModalShow}
        onHide={cancelNewCardHandler}
        title={
          <div className="d-flex flex-column gap-2 text-start" style={{ paddingLeft: "12px" }}>
            <Title theme={theme}>Add new card</Title>
            <p style={{ color: "#57757B", fontSize: "14px", marginBottom: "0px" }}>Add your credit or debit card below. This card will be saved to your account and can be removed at any time.</p>
          </div>
        }
      />
    </>
  );
}

export default BillingModalComponent;
