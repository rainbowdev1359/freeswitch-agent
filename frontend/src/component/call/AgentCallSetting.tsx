import { agentCalls } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import ImageRender from "../ImageRender";
import { useTranslation } from 'react-i18next';

import {
  AgentParagraph,
  ParagraphBold,
  AgentEditIcon,
  AgentCallSettingCol,
  AgentRow,
} from "../StyleComponents";

export function AgentCallSetting({ agent }: { agent: agentCalls }) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const navigate = useNavigate();

  return (
    <AgentCallSettingCol
      theme={theme}
      className="px-3 py-3 d-flex flex-column gap-4 mt-2"
    >
      <div className="d-flex flex-row justify-content-between  gap-5">
        <div className="d-flex flex-row align-items-center gap-2">
          <ParagraphBold theme={theme}>{agent.info[0].value}</ParagraphBold>
          <AgentEditIcon src="/editProfile.svg"
            onClick={(event) => {
              event.stopPropagation();
              navigate("/agent/prompt_editor", {state: { data: agent }});
            }} style={{ cursor: 'pointer' }}
            alt="" className="" />
        </div>
        <div className="d-flex flex-row gap-2">
          <ParagraphBold theme={theme}>{agent.time} {t('mins')}</ParagraphBold>
          <AgentParagraph theme={theme}>{t('Average call time')}</AgentParagraph>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between gap-5">
        <div className="d-flex flex-row align-items-center gap-3">
          <img src="/leads.svg" alt="" className=" w-50" />
          <AgentParagraph theme={theme}>{agent.message}</AgentParagraph>
        </div>

        <div className="d-flex flex-row align-items-center gap-2">
          <img src="/incoming_call.svg" alt="" className="w-50" />
          <AgentParagraph theme={theme}>{agent.receivedCalls}</AgentParagraph>
        </div>

        <div className="d-flex flex-row align-items-center gap-2">
          <img src="/finished_call.svg" alt="" className="w-50" />
          <AgentParagraph theme={theme}>{agent.missedCalls}</AgentParagraph>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-between gap-2 ">
        <AgentRow
          $minute_container
          className="d-flex flex-row align-items-center gap-2"
          theme={theme}
        >
          <ImageRender color={theme == "light" ? "#0F2E35" : "#E7E9EA"} fileName="/clockIcon.svg" />

          <AgentParagraph theme={theme}>{agent.minutesTalked}</AgentParagraph>
        </AgentRow>
        <div className="d-flex flex-row justify-content-center gap-2 py-2">
          <AgentRow
            $minute_container
            className="d-flex flex-row align-items-center gap-1"
            theme={theme}
          >
            <ImageRender color={theme == "light" ? "#0F2E35" : "#E7E9EA"} fileName="/profile_delete.svg" />
            <AgentParagraph theme={theme} className="text-bold">{agent.client1}</AgentParagraph>
          </AgentRow>

          <img src="/transfer.svg" alt="" />

          <AgentRow
            $minute_container
            theme={theme}
            className="d-flex flex-row align-items-center gap-1"
          >
            <ImageRender color={theme == "light" ? "#0F2E35" : "#E7E9EA"} fileName="/profile_checked.svg" />
            <AgentParagraph theme={theme} className="text-bold">{agent.client2}</AgentParagraph>
          </AgentRow>
        </div>
      </div>
    </AgentCallSettingCol>
  );
}
