// import { agentLists } from "../../data/agents";
import AgentModal from "./AgentModal";
import { useEffect, useState } from "react";
import { Controller } from "./Controller";
import { agentType } from "../../types/types";
import OngoingCallModal from "./OnGoingCall";
import CenteredModal from "../modals/Modal";
import Search from "../BlueButton";
import SuccessMessage from "./successMessage";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import services from "../../api";
import {
  PERow,
  AParagraph,
  GridContainer,
  CallOnQueParagraph,
  AgentProfileContainer,
  AgentProfileSubContainer,
  AgentProfileLeft,
  Scroll,
  OnGoingCall,
  OnGoingCallRow,
  OnGoingCallRow1,
  GreenContainer,
  OnGoingCallRowParagraph,
  CallStep,
  CallContainer,
  CallProfile,
  SeAllButton,
  ImgMod,
  InputMod
} from "../StyleComponents";
import WavesurferPlayer from '@wavesurfer/react'
import { useTranslation } from 'react-i18next';

export function AgentProfiles({ isSidebarOpened, }: { isSidebarOpened: boolean; }) {
  const { t } = useTranslation();
  const [selectedAgent, setSelectedAgent] = useState<agentType | null>(null);
  const callSteps = [
    { name: "Intro", color: "#F0B723", active: true },
    { name: "Interest", color: "#E4F15026", active: false },
    { name: "Info", color: "#00B7DF26", active: false },
    { name: "Closing", color: "#0FBC0C26", active: false },
  ];
  const [showModal, setShowModal] = useState(false);
  const [showRedirect, setShowRedirect] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null)
  const [agents, setAgents] = useState<agentType[]>([])
  const [filterAgents, setFilterAgents] = useState<agentType[]>([])
  const [whisper, setWhisper] = useState("")
  const [makeCallNumber, setMakeCallNumber] = useState("");

  useEffect(() => {
    services.agent.getAllAgents()
      .then((response) => {
        const agentList = response.data;
        const updatedResults = agentList.map((result) => {
          return { ...result,
            profile: "/agents/agent03.png",
            name: result.info[0].value,
            rateTime: 3.5,
            incomingCalls: [],
            finishedCalls: [],
            date: "2024-06-28",
            time: "0",
            client1: 0,
            client2: 0,
           }
        })
        setAgents(updatedResults)
        setFilterAgents(updatedResults)
      })
  }, [])

  const onReady = (ws: any) => {
    setWavesurfer(ws)
    setIsPlaying(isPlaying)
  }

  const onPlayPause = () => {
    //@ts-ignore
    wavesurfer && wavesurfer.playPause()
  }

  const addNewAgentHandler = (newAgent: agentType) => {
    setAgents([...agents, newAgent]);
    setFilterAgents([...filterAgents, newAgent]);
  }

  return (
    <>
      <AgentProfileContainer className="d-flex agent-profile px-4">
        <AgentProfileSubContainer
          $selcted={selectedAgent != null}
          className="d-flex agent-profile flex-column "
        >
          <Controller
            addNewAgent={addNewAgentHandler}
            selected={selectedAgent != null}
          />
          <GridContainer
            $selected={selectedAgent != null}
            $isSidebarOpened={isSidebarOpened}
            className="gap-3"
          >
            {filterAgents.map((agent, index) => (
              <AgentModal
                theme={theme}
                onclick={() => {
                  setSelectedAgent(agent);
                }}
                key={index}
                agent={agent}
              />
            ))}
          </GridContainer>
        </AgentProfileSubContainer>

        {selectedAgent != null && (
          <AgentProfileLeft $theme={theme}>
            <Scroll className="agent-profile">
              <PERow className="gap-2 w-full justify-content-end ">
                <PERow
                  className="gap-2 align-items-center cursor-pointer"
                  onClick={() => setSelectedAgent(null)}
                >
                  <AParagraph $theme={theme}>{t('Close')}</AParagraph>
                  <img src="/close.svg" alt="close" />
                </PERow>
              </PERow>
              <AgentModal
                theme={theme}
                key={selectedAgent.id}
                agent={selectedAgent}
              />
              <CallOnQueParagraph theme={theme} style={{ marginTop: "10px" }}>
                {t('Ongoing call')}
              </CallOnQueParagraph>
              <OnGoingCall $theme={theme} className="p">
                <GreenContainer className="gap-1">
                  <img src="/green-wave.svg" alt="" />
                  {t('Ongoing call with')} +18152004893
                </GreenContainer>
                <PERow className="py-2">
                  <PERow className="gap-2">
                    {theme === "light" ? (
                      <div style={{ width: "100px" }}>
                        <WavesurferPlayer
                          height={32}
                          width={300}
                          barHeight={30}
                          barGap={4}
                          waveColor="#96ADB3"
                          url="/piano.mp3"
                          onReady={onReady}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      </div>
                    ) : (
                      <div>
                        <WavesurferPlayer
                          width={300}
                          height={32}
                          barHeight={14}
                          barGap={4}
                          autoScroll
                          barRadius={100}
                          barWidth={3}
                          waveColor={"#0E2B31"}
                          progressColor="#96ADB3"
                          url="/piano.mp3"
                          onReady={onReady}
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      </div>
                    )}
                    <AParagraph $border $theme={theme}>00:40:01</AParagraph>
                  </PERow>
                </PERow>
                <div className="d-flex flex-grow-1 gap-2">
                  <OnGoingCallRow1
                    onClick={() => setShowRedirect(true)}
                    className="p-2"
                  >
                    <OnGoingCallRowParagraph>
                      {t('Redirect call')}
                    </OnGoingCallRowParagraph>
                    <img src="/forward.svg" />
                  </OnGoingCallRow1>
                  <OnGoingCallRow onClick={onPlayPause} style={{ cursor: 'pointer' }}
                    className="p-2">
                    <OnGoingCallRowParagraph>{isPlaying ? t('Stop listening') : t('Listen to call')}</OnGoingCallRowParagraph>
                    <img src={isPlaying ? "/playing.svg" : "/resume.svg"} />
                  </OnGoingCallRow>
                </div>
                <PERow>
                  {callSteps.map((item, i) => (
                    <CallContainer key={i}>
                      <CallProfile src="/userProfile.png" $isHidden={item.active} />
                      <CallStep
                        $isFirst={i == 0}
                        $isLast={i == callSteps.length - 1}
                        $background={item.color}
                      >
                        {t(item.name)}
                      </CallStep>
                    </CallContainer>
                  ))}
                </PERow>
              </OnGoingCall>
              <div className="d-flex flex-column justify-content-between mb-2">
                <CallOnQueParagraph theme={theme}>
                  {t('Whisper to agent in real time')}
                </CallOnQueParagraph>
                <div className="position-relative">
                  <InputMod
                    theme={theme}
                    type="text"
                    placeholder={t('Start typing...')}
                    className="pt-2 px-3 w-100"
                    value={whisper}
                    onChange={(e: any) => setWhisper(e.target.value)}
                  />
                  <ImgMod src="/microphone-2.svg" />
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <CallOnQueParagraph theme={theme}>
                    {t('Calls on queue')}
                  </CallOnQueParagraph>
                  <p className="primary-text">
                    {t('Drag numbers to re-arrange numbers on queue')}
                  </p>
                </div>
                <SeAllButton $theme={theme} onClick={() => setShowModal(true)}>
                  {t('See all')}
                </SeAllButton>
              </div>
            </Scroll>
          </AgentProfileLeft>
        )}
      </AgentProfileContainer>

      <OngoingCallModal show={showModal} onHide={() => setShowModal(false)} />

      <CenteredModal
        show={showRedirect}
        onHide={() => setShowRedirect(false)}
        btntext={t('Redirect call')}
        onContinue={() => {
          setShowRedirect(false);
          services.custom.makeCall({phone_number: makeCallNumber, agent_id: selectedAgent?selectedAgent.id:1})
          .then((response: any) => {
            setSuccess(true);
            console.log(makeCallNumber, " : ", response.data);
          })
          .catch((error: any) => {
            console.error(error);
          })
          setMakeCallNumber("")
        }}
        title={t('Input number to redirect call')}
        children={<Search placeholder="e.g +18152004893" onTextChange={(e: any) => setMakeCallNumber(e.target.value)}/>}
      />

      <SuccessMessage show={success} onHide={() => setSuccess(false)} />
    </>
  );
}
