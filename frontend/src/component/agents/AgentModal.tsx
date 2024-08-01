import React from "react";
import { useNavigate } from "react-router-dom";
import { AgentProfile } from "../../types/types";
import ImageRender from "../ImageRender";
import { EditIcon, AgentContainer, Row, AParagraph } from "../StyleComponents";
import { useTranslation } from 'react-i18next';
import services from "../../api";

function AgentModal({ agent, onclick, theme }: {
  agent: AgentProfile;
  onclick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  theme: string;
}) {
  const { t } = useTranslation();
  const currentMonth = new Date().getMonth();
  const navigate = useNavigate();

  const onEditAgentBtn = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    services.agent.getAgentDetail({ id: agent.id})
    .then((response) => {
      console.log("+++++++++++++ agent detail = ", response.data);
      navigate("/agent/prompt_editor", { state: { data: response.data }});
    })
  }

  return (
    <AgentContainer onClick={onclick} $theme={theme}>
      <Row className="d-flex flex-row">
        <div>
          <img src={agent.profile} width={130} height={130} className="rounded-4" style={{border:"3px solid #224D57"}}/>
        </div>
        <div>
          <AParagraph $theme={theme} className="text-end py-2" style={{ fontWeight: '600' }}>{agent.time} {t('mins')}</AParagraph>
          <AParagraph $theme={theme} className="text-end pb-2 ">{t('Average call time')}</AParagraph>
          <Row className="gap-2 justify-content-end">
            <img src="/rateTime.svg" />
            <span style={{ color: "#107A47", fontWeight: '600' }}>{agent.rateTime ?? 0}</span>
            <AParagraph $theme={theme} className="mb-0">{t('min yesterday')}</AParagraph>
          </Row>
        </div>
      </Row>
      <Row className="justify-content-start py-2 gap-2">
        <AParagraph $theme={theme}>{agent.name}</AParagraph>
        <EditIcon onClick={(event) => onEditAgentBtn(event)} style={{ cursor: 'pointer' }} src="/editProfile.svg" alt="" className="" />
      </Row>
      <Row>
        <AParagraph $theme={theme}>{t('Minutes talked')}</AParagraph>
        <Row $minute_container $theme={theme} className="gap-1">
          <img src="/clockIcon.svg" alt="" />
          <AParagraph $theme={theme}>{agent.minutesTalked}</AParagraph>
        </Row>
      </Row>
      <Row className="py-2 ">
        <AParagraph $theme={theme}>{t('Completed leads')}</AParagraph>
        <Row className="gap-1">
          <img src="/leads.svg" alt="" />
          <AParagraph $theme={theme}>{agent.completedLeads}</AParagraph>
        </Row>
      </Row>
      <Row className="py-2 ">
        <AParagraph $theme={theme}>{t('Incoming calls')}</AParagraph>
        <Row className="gap-1">
          <img src="/incoming_call.svg" alt="" />
          <AParagraph $theme={theme}>{currentMonth ? agent.incomingCalls[currentMonth]?.numberOfCall : agent.totalIncomingCalls}</AParagraph>
        </Row>
      </Row>
      <Row className="py-2 ">
        <AParagraph $theme={theme}>{t('Finished calls')}</AParagraph>
        <Row className="gap-1">
          <img src="/finished_call.svg" alt="" />
          <AParagraph $theme={theme}>{currentMonth ? agent.finishedCalls[currentMonth]?.numberOfCall : agent.totalFinishedCalls}</AParagraph>
        </Row>
      </Row>
      <>
        <AParagraph $theme={theme} className="text-center">{t('Follow up clients')}</AParagraph>
        <Row className="justify-content-center gap-2 py-2">
          <Row $theme={theme} $minute_container>
            <ImageRender color={theme == "light" ? "#27798b" : "#E7E9EA"} fileName="/profile_delete.svg" />
            <AParagraph $theme={theme} className="text-bold">
              21
            </AParagraph>
          </Row>
          <ImageRender color={theme == "light" ? "#27798b" : "#E7E9EA"} fileName="/transfer.svg" />
          <Row $theme={theme} $minute_container>
            <ImageRender color={theme == "light" ? "#27798b" : "#E7E9EA"} fileName="/profile_checked.svg" />
            <AParagraph $theme={theme} className="text-bold">
              21
            </AParagraph>
          </Row>
        </Row>
      </>
    </AgentContainer>
  );
}

export default AgentModal;
