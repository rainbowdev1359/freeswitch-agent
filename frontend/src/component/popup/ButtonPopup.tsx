import React, { useRef, useEffect } from 'react';
import { ActionImage } from '../CustomTable/TableComponent';
import ImageRender from '../ImageRender';
import { useTranslation } from 'react-i18next';
import { ButtonPopupContainer } from "../StyleComponents";

function ButtonPopup({ setActionModalShow, rowId, exportHandler, summaryHandler, feedbackHandler }: { setActionModalShow: any, rowId: string, exportHandler: any, summaryHandler: any, feedbackHandler: any }) {
  const { t } = useTranslation();
  const popupRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setActionModalShow(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ButtonPopupContainer $id={rowId} ref={popupRef}>
      <div className="d-flex gap-0 flex-column">
        <p className="mb-3">{t("More actions")}</p>
      </div>
      <div className="d-flex justify-start gap-0 flex-row" onClick={exportHandler}>
        <ActionImage style={{ marginRight: '10px' }} >
          <ImageRender fileName='/import.svg' />
        </ActionImage>
        <span>{t("Export")}</span>
      </div>
      <div className="d-flex justify-start flex-row" onClick={summaryHandler}>
        <ActionImage style={{ marginRight: '10px' }} >
          <ImageRender fileName='/note-2.svg' />
        </ActionImage>
        <span>{t("Summary")}</span>
      </div>
      <div className="d-flex justify-start flex-row" onClick={feedbackHandler}>
        <ActionImage style={{ marginRight: '10px' }} >
          <ImageRender fileName='/messages.svg' />
        </ActionImage>
        <span>{t("Feedback")}</span>
      </div>
    </ButtonPopupContainer>
  );
}

export default ButtonPopup;
