import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { PaymentMethod } from "./paymentMethod";
import { BillingHistoryTable } from "./billingHistoryTable";
import { Preferences } from "./preferences";
import { MyProfile } from "./myProfile";
import { PaymentMethodCard } from "./paymentMethodCard";
import { paymentMethods } from "../../data/billing";
import { PaymentMethodType } from "../../types/types";
import PoscallModal from "../modals/Postcall";
import { PaymentMethodNew } from "./paymentMethodNew";
import CustomButton from "../import/CustomButton";
import { HMod, Paragraph, ParentButton, RecordingTableContainer, SectionParent, Title, ModalTitle, InputRow, Input, SearchBtnContainer, LinkP, UnderLineSpan } from "../StyleComponents";
import "react-datepicker/dist/react-datepicker.css";
import "./billing.css";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { filterGrant } from "../../utils/common";

function BillingComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 2);
  const [cardModalShow, setCardModalShow] = useState(false);
  const [cardNewModalShow, setCardNewModalShow] = useState(false);
  const [paymentMethodList, setPaymentMethodList] = useState<PaymentMethodType[]>(paymentMethods);
  const [activeTab, setActiveTab] = useState("payment");
  const [grants, setGrants] = useState({ invoice: false, payment: false });

  useEffect(() => {
    const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
    const invoiceGrant = filterGrant(permissions, "View Invoices");
    const paymentGrant = filterGrant(permissions, "Process Payments");
    setGrants({
      payment: paymentGrant,
      invoice: invoiceGrant
  });
    setPaymentMethodList(paymentMethods);
    if (!invoiceGrant && !paymentGrant) {
      setActiveTab("preferences");
    }
    else if (paymentGrant) {
      setActiveTab("payment");
    }
    else if (invoiceGrant) {
      setActiveTab("history");
    }
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
    <RecordingTableContainer className="">
      <div className="d-flex w-full flex-column align-items-center justify-content-center mb-4">
        <HMod theme={theme}>{t('Your credit balance is')}</HMod>
        <Paragraph theme={theme}>$300</Paragraph>
        <ParentButton $theme={theme} className="d-flex  gap-2">
          <LinkP $theme={theme} className="" onClick={() => setCardModalShow(true)}>{t('Add to credit balance')} +</LinkP>
          <LinkP $theme={theme} className="" onClick={() => navigate("/billing/change-your-plan")}>{t('Change your plan')}</LinkP>
        </ParentButton>
      </div>
      <Tabs defaultActiveKey="payment" id="fill-tab-example" className="mb-3" fill
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "payment")}>
        {grants.payment && <Tab eventKey="payment" title={t('Payment methods')}>
          <PaymentMethod />
        </Tab>}
        {grants.invoice && <Tab eventKey="history" title={t('Billing history')}>
          <BillingHistoryTable />
        </Tab>}
        <Tab eventKey="preferences" title={t('Preferences')}>
          <Preferences />
        </Tab>
        <Tab eventKey="profile" title={t('My profile')}>
          <MyProfile isActive={activeTab === "profile"} />
        </Tab>
      </Tabs>

      <PoscallModal
        children={
          <div className={`d-flex  flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="d-flex gap-0 flex-column">
              <div className="d-flex flex-column gap-2 justify-content-between mb-3" >
                <div className="d-flex gap-1 flex-column mb-2">
                  <Title theme={theme}>{t('Amount to add')}</Title>
                  <InputRow $theme={theme}>
                    <Input id="paste" type="number" className="" placeholder="$0" $theme={theme} />
                  </InputRow>
                </div>

                <div className="d-flex flex-wrap align-items-center justify-content-between mb-3" >
                  <Title theme={theme}>{t('Choose payment method')}</Title>
                  <LinkP $theme={theme} className="">{t('Pay by Wire Transfer')} <img src="/bitcoin-(btc).svg" /></LinkP>
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
                  <LinkP $theme={theme} className="d-flex text-lg-end text-center px-3 py-2 mb-lg-0 mb-2" onClick={() => setCardNewModalShow(true)}>
                    <UnderLineSpan>{t('Add new card')} +</UnderLineSpan>
                  </LinkP>
                </div>
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
            <ModalTitle theme={theme}>{t('Add to credit balance.')}</ModalTitle>
            <p style={{ color: "#57757B", fontSize: "14px", marginBottom: "0px" }}>{t('Add money to your credit balance below.')}</p>
          </div>
        }
      />

      <PoscallModal
        children={<PaymentMethodNew setCardModalShow={setCardNewModalShow} />}
        show={cardNewModalShow}
        onHide={cancelNewCardHandler}
        title={
          <div className="d-flex flex-column gap-2 text-start" style={{ paddingLeft: "12px" }}>
            <ModalTitle theme={theme}>Add new card</ModalTitle>
            <p style={{ color: "#57757B", fontSize: "14px", marginBottom: "0px" }}>Add your credit or debit card below. This card will be saved to your account and can be removed at any time.</p>
          </div>
        }
      />
    </RecordingTableContainer>
  );
}

export default BillingComponent;
