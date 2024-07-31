import React, { useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from 'react-i18next';
import { ButtonPopupContainer } from "../StyleComponents";

function ActionPopup({ excelExport, pdfExport, statisExport, setActionModalShow, rowId }
  : { excelExport: any, pdfExport: any, statisExport: any, setActionModalShow: any, rowId: string }) {
  const { t } = useTranslation();
  const popupRef = useRef<HTMLDialogElement>(null);
  const theme = useSelector((state: RootState) => state.theme.theme);

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
    <ButtonPopupContainer $id={rowId} ref={popupRef} theme={theme}>
      <div className="d-flex gap-0 flex-column" onClick={() => excelExport()}>
        <p className="pb-2 mb-1 text-start border-bottom border-secondary">{t("Export")}</p>
      </div>
      <div className="d-flex gap-0 flex-column" onClick={() => statisExport()}>
        <p className="pb-2 mb-1 text-start border-bottom border-secondary">{t("Export Statistics")}</p>
      </div>
      <div className="d-flex gap-0 flex-column" onClick={() => pdfExport()}>
        <p className="pb-2 mb-1 text-start border-bottom border-secondary">{t("Export Overview")}</p>
      </div>
    </ButtonPopupContainer>
  );
}

export default ActionPopup;
