import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { GreenContainer, CallOnQueParagraph } from "../StyleComponents";
import CallQue from "./CallQue";
import { Reorder } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useTranslation } from 'react-i18next';

function OngoingCallModal(props: any) {
  const { t } = useTranslation();
  const initialItems = [
    { id: "1", name: "Raam 1 adi", number: "+18152004893" },
    { id: "2", name: "Raam 2 adi", number: "+18152004893" },
    { id: "3", name: "Raam 3 adi", number: "+18152004893" },
    { id: "4", name: "Raam 4 adi", number: "+18152004893" },
    { id: "5", name: "Raam 5 adi", number: "+18152004893" },
  ];
  const [call, setCall] = useState(initialItems);
  const [items, setItems] = useState(initialItems.map(item => item.id))
  const theme = useSelector((state: RootState) => state.theme.theme);

  const deleteHandler = (indexToDelete: number) => {
    setCall(prevCall => prevCall.filter((_call, index) => index !== indexToDelete));
    setItems(prevItem => prevItem.filter((_item, index) => index !== indexToDelete));
  }

  return (
    <Modal
      {...props}
      className={`centered_modal ${theme == "light" && "light-mode"} modal_center`}
      size="lg"
      id={props.id ? "flexible" : ""}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="">
        <div className="d-flex p-2  justify-content-between align-items-center">
          <div className="d-flex gap-1">
            <GreenContainer className="gap-1">
              <img src="/green-wave.svg" alt="" />
              {t('Ongoing call with')} +84965482487
            </GreenContainer>
          </div>
          <img
            src="/close.svg"
            alt=""
            className="cursor-pointer"
            width={26}
            height={26}
            onClick={props.onHide}
          />
        </div>
      </div>
      <Modal.Body>
        <CallOnQueParagraph className="mb-0">
          {t('All calls on queue')}
        </CallOnQueParagraph>
        <Reorder.Group axis="y" values={items} onReorder={setItems} style={{ listStyle: "none", paddingLeft: "0px" }}>
          {items.map((item, index) => (
            <Reorder.Item key={item} value={item}>
              <CallQue key={item} callItem={call[index]} deleteHandler={() => deleteHandler(index)} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </Modal.Body>
    </Modal>
  );
}

export default OngoingCallModal;
