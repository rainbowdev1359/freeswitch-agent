import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ContinueButton, GreenParagraph } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

function SuccessMessage(props: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Modal
      {...props}
      className={`centered_modal ${theme == "light" && "light-mode"}`}
      size="lg"
      id={props.id ? "flexible" : ""}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className="d-flex p-2  justify-content-between align-items-center" />
      </div>
      <Modal.Body>
        <div className="d-flex gap-2 align-items-center justify-content-center pb-2 px-3 flex-column">
          <img src="/success.svg" />
          <GreenParagraph>{t('Call redirected successfully')}</GreenParagraph>
          <ContinueButton onClick={props.onHide}>{t('Continue')}</ContinueButton>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SuccessMessage;
