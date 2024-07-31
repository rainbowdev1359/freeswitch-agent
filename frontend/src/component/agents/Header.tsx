import React from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Toggle from "../Toggle";
import { H1Styled, DivStyled, PModified, InputMod, ImgMod } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

export function Header({ hideSearch }: { hideSearch?: boolean }) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = localStorage.getItem('username')
  return (
    <DivStyled className="px-5 py-1 d-flex flex-row justify-content-between">
      <Col >
        <H1Styled>Welcome {user}</H1Styled>
        <PModified>September 12, 2024</PModified>
      </Col>

      {!hideSearch && (
        <Col className="position-relative mx-3 ">
          <InputMod theme={theme} type="text" placeholder={t('Search')} />
          <ImgMod src="/searchIcons.png" />
        </Col>
      )}
      <Toggle />
    </DivStyled>
  );
}
