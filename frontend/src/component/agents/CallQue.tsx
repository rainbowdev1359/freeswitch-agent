import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CallQueContainer, DeleteContainer, MoveButton, GreenContainer } from "../StyleComponents";
import { useTranslation } from 'react-i18next';

function CallQue(props: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <CallQueContainer $theme={theme}>
      <div className="d-flex flex-column">
        <p>{props.callItem.name}</p>
        <div className="d-flex gap-2">
          <p>{props.callItem.number}</p>
          <GreenContainer>
            <p className="mb-0">{t('New Lead')}</p>
          </GreenContainer>
        </div>
      </div>
      <div className="d-flex gap-2">
        <DeleteContainer $theme={theme} onClick={props.deleteHandler}>
          <img src="/delete2.svg" />
        </DeleteContainer>
        <MoveButton $theme={theme} className="gap-1" >
          <p className="mb-0 ">{t('Move')}</p>
          <img src="/move.svg" />
        </MoveButton>
      </div>
    </CallQueContainer>
  );
}

export default CallQue;
