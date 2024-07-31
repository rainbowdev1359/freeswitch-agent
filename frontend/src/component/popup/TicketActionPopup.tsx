import React, { useRef, useState, useEffect } from 'react';
import CustomInput from "../CustomInput";
import { useTranslation } from 'react-i18next';
import { ButtonPopupContainer } from "../StyleComponents";
import { TicketActionOptions } from "../../data/tickets";

function TicketActionPopup({ rowId, actionHandler }: { rowId: number, actionHandler: any, }) {
  const { t } = useTranslation();
  const [actionModalShow, setActionModalShow] = useState(-1);
  const popupRef = useRef<HTMLDialogElement>(null);
  const [actionType, setActionType] = useState("open");

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

  const handleSelection = (value: string) => {
    setActionModalShow(-1)
    actionHandler(rowId, value);
    setActionType(value);
  };

  const handleShowSelection = () => {
    setActionModalShow(rowId)
  };

  return (
    <>
      <div onClick={handleShowSelection} >{t(TicketActionOptions.find(item => item.value == actionType)?.title || "")}</div>
      {actionModalShow == rowId && (
        <ButtonPopupContainer $id={rowId.toString()} ref={popupRef}>
          <div className="d-flex gap-2 flex-column mt-2">
            <button className='modal_button'>{t('Confirm')}</button>
            <div className="row">
              {TicketActionOptions.map((item: any, index: any) => (
                <div className={`col-12 my-1`}>
                  <CustomInput
                    key={index}
                    selected={actionType}
                    setSelected={handleSelection}
                    children={
                      <div className="d-flex flex-column">
                        <p className="mb-0">{t(item.title)}</p>
                      </div>
                    }
                    name="type"
                    label={item.title}
                    value={item.value}
                  />
                </div>
              ))}
            </div>
          </div>
        </ButtonPopupContainer>
      )}

    </>
  );
}

export default TicketActionPopup;
