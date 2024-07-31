import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { BackPageButton } from "./StyleComponents";
import { useTranslation } from 'react-i18next';

function PageBackButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <BackPageButton $theme={theme} className="mb-2 d-flex align-items-center" onClick={() => navigate(-1)}>
      <img src="/chevron_back.svg" alt="Previous" className="mr-2" />
      <span className="p-2">{t("Return")}</span>
    </BackPageButton>
  );
}

export default PageBackButton;
