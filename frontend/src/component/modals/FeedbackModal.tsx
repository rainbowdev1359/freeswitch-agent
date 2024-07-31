import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import { RootState } from "../../store";
import { feedbackTypes } from "../../data/date";
import { DropdownButton } from "../DropDown";
import { useSelector } from "react-redux";
import { InputMod, TextAreaMod } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

function FeedbackModal(props: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [issueType, setIssueType] = useState("");
  const [callTime, setCallTime] = useState("");
  const [context, setContext] = useState("");

  const handleIssueSelect = async (val: string) => {
    setIssueType(val);
  };

  const feedbackHandler = async () => {
    console.log(issueType)
    console.log(callTime)
    console.log(context)
    console.log(props.selectedcall)
    props.onCancel();
  }

  return (
    <Modal
      {...props}
      className={`centered_modal ${theme == "light" && "light-mode"}`}
      size="lg"
      id={props.id ? "flexible" : ""}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={`d-flex p-2  justify-content-end align-items-center`}>
        <img
          src={` ${theme == "light" ? "/close-light.svg" : "/close.svg"}`}
          alt=""
          className="cursor-pointer"
          width={26}
          height={26}
          onClick={props.onHide}
          style={{ cursor: 'pointer' }}
        />
      </div>
      <div>
        <div className={`d-flex p-2  justify-content-center align-items-center`} style={{ width: '90%', margin: 'auto' }}>
          <span
            className={`flex-grow h-fit text-center ${theme == "light" ? "modal_title_light" : "modal_title"} `}
            style={{ fontSize: '25px', lineHeight: 'normal' }}
          >
            {props.title}
          </span>
        </div>
      </div>
      <div className="pb-3">
        <div className={`d-flex p-2 flex-column`} style={{ width: '90%', margin: 'auto' }}>
          <p className={`flex-grow ${theme == "light" ? "summary_label_light" : ""} `}>
            {t("What type of issue did this call have?")}
          </p>
          <DropdownButton options={feedbackTypes} onSelect={handleIssueSelect} placeholder={t("Select an issue type")} isFull={true} />
        </div>
        <div className={`d-flex p-2 flex-column`} style={{ width: '90%', margin: 'auto' }}>
          <p className={`flex-grow ${theme == "light" ? "summary_label_light" : ""} `}>
            {t("Optional")}: <strong>{t("When in the call did this issue take place?")}</strong><br />
            ({t("The more specific you can be, the faster we can resolve the issue")})
          </p>
          <InputMod theme={theme} type="text" placeholder={`${t("Example")}: 1:20-3:35`} value={callTime} onChange={(e) => setCallTime(e.target.value)} />
        </div>
        <div className={`d-flex p-2 flex-column`} style={{ width: '90%', margin: 'auto' }}>
          <p className={`flex-grow ${theme == "light" ? "summary_label_light" : ""} `}>
            {t("Optional")}: <strong>{t("Any other additional context / notes you want to provide?")}</strong>
          </p>
          <TextAreaMod theme={theme} placeholder={t("Share additional context here ...")} value={context} onChange={(e) => setContext(e.target.value)} />
        </div>
      </div>
      <div className="d-flex gap-2 align-items-end justify-content-center pb-2 px-3 mb-4">
        <button onClick={feedbackHandler} className="modal_button">
          <div className="d-flex align-items-center px-2">
            {t("Submit")}
          </div>
        </button>
      </div>
    </Modal>
  );
}

export default FeedbackModal;
