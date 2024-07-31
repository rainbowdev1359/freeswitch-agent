import { Modal } from 'react-bootstrap';
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { BackButton } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

function CenteredModal(props: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Modal
      {...props}
      className={`centered_modal ${theme == "light" && "light-mode"}`}
      size={"xl"}
      id={props.id ? "flexible" : ""}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div>
        <div className={`d-flex p-2  justify-content-between align-items-center mt-3`} >
          <p className={`flex-grow h-fit text-center ${theme == "light" ? "modal_title_light" : "modal_title"} `} >
            {props.title ? props.title : t("Upload document")}
          </p>
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
      </div>
      <Modal.Body>{props.children}</Modal.Body>
      <div className="d-flex gap-2 align-items-end justify-content-end pb-2 px-3 mb-3">
        {props.onBack && (
          <BackButton
            $theme={theme}
            onClick={props.onBack}
            className="modal_button back_button"
          >
            <div className="d-flex align-items-center">{t(props.onBackTitle ?? 'Go back')}</div>
          </BackButton>
        )}
        <button disabled={props.disabled} onClick={props.onContinue} className="modal_button" style={{ color: props.disabled ? "gray" : "white" }}>
          <div className="d-flex align-items-center px-2">
            {props.btntext}
            {props.btntext.toLowerCase() != "save" && (
              <img src={`${theme == "light" ? "/next-light.svg" : "/nextIcon.svg"}`} alt="" />
            )}
          </div>
        </button>
      </div>
    </Modal>
  );
}

export default CenteredModal;
