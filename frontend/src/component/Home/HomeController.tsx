import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import Notification from "../Notification";
import ImageRender from "../ImageRender";
import { NotificationDrop } from "../DropDownHome";
import { ParentButton, ContactRecordLinkP, UnderLineSpan } from "../StyleComponents";

const ControllerContainer = styled.div<{ $selected?: boolean }>`
  display: ${(props) => (props.$selected ? "none" : "block")};

  @media (max-width: 992px) {
    width: calc(100vw - 30px);
    padding: 0px;
  }
  @media (max-width: 500px) {
    align-items: start;
  }
  align-items: center;
  @media (min-width: 1500px) {
    flex-direction: row !important;
  }
`;

export function HomeController() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [unreadNotis, setUnreadNotis] = useState(2);

  return (
    <ControllerContainer
      $selected
      className="d-flex  gap-2 flex-row  py-4 px-2"
    >
      <ParentButton $theme={theme} className="d-flex flex-grow-1 gap-2">
        <ContactRecordLinkP $theme={theme} className=" text-center py-2" onClick={() => navigate("/ticket")}>
          <img src={"/download.svg"} alt="" />
          <UnderLineSpan>
            {t("Submit a ticket")}
          </UnderLineSpan>
        </ContactRecordLinkP>
      </ParentButton>

      <NotificationDrop action={<Notification setUnreadNotis={setUnreadNotis} />} name={
        <div className="position-relative">
          <ImageRender fileName="/notification.svg" color={theme == "light" ? "#0F2E35" : "#96ADB3"} />
          {unreadNotis > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{unreadNotis}</span>}
        </div>

      } />
    </ControllerContainer>
  );
}
