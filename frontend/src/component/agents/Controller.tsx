import React, { useState } from "react";
import { createAgentOptions, newAgent } from "../../data/agents";
import CenteredModal from "../modals/Modal";
import CustomInput from "../CustomInput";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { DropdownObjectButton } from "../DropDown";
import { agentLangList, genderList, voiceList } from "../../utils/lib";
import { InputRow, Input, HMod, PMode, ModalContainer, CreateButton, ParentButton, ControllerContainer, Title } from "../StyleComponents";
import services from "../../api";

export function Controller({ selected, addNewAgent }: { selected?: boolean, addNewAgent: any }) {
  const { t } = useTranslation();
  const [agentName, setAgentName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [voiceID, setVoiceID] = useState("84753c03-47d1-4f74-a72b-19df5f09f5d2");
  const [language, setLanguage] = useState("en");
  const [showCreateAgentModal, setShowCreateAgentModal] = useState(false);
  const [step, setStep] = useState(0);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [selectedInput, setSelectedInput] = useState<string[]>(createAgentOptions.map(item => item.options[0].value));
  const navigate = useNavigate();

  const handlleCreateAgent = () => {
    if (step == createAgentOptions.length - 1) {
      newAgent.name = agentName;
      const data = {
        voiceID: voiceID,
        language: language,
        agentType: selectedInput[0],
        documentType: selectedInput[1],
        methodType: selectedInput[2],
        info: [
          { title: "Agent Name", value: agentName },
          { title: "Job Title", value: jobTitle }
        ],
        prompt: "Input the Agent prompt here"
      }
      
      services.agent.createAgent(data)
        .then(() => {
          setShowCreateAgentModal(false)
          window.location.reload()
        })
        .catch(error => {
          console.log(error)
        })
      addNewAgent(newAgent)
      setShowCreateAgentModal(false);
      setStep(0);
      setAgentName("")
      setSelectedInput(createAgentOptions.map(item => item.options[0].value))

      navigate("/agent/prompt_editor", { state: { data: data } });
    } else {
      setStep(prevStep => prevStep + 1);
    }
  }

  const handleLanguageSelect = async (val: string) => {
    setLanguage(val);
  };

  const handleVoiceSelect = async (val: string) => {
    setVoiceID(val);
  };

  return (
    <>
      <ControllerContainer $selected={selected} className="d-flex gap-2 flex-wrap justify-content-between py-4">
        <div className="d-flex flex-column">
          <HMod theme={theme}>{t('Click any agent to select')}</HMod>
          <PMode>{t('Any agent selected would be displayed on the right panel')}</PMode>
        </div>
        <ParentButton $theme={theme} className="d-flex  gap-2">
          <CreateButton $theme={theme} className="" onClick={() => setShowCreateAgentModal(true)}>{t('Create new agent')} +</CreateButton>
          <CreateButton $theme={theme} className="">{t('Duplicate agent')}</CreateButton>
        </ParentButton>
      </ControllerContainer>

      <CenteredModal
        title={t(createAgentOptions[step].title)}
        size={"x2"}
        children={
          <ModalContainer className="container" width="100%">
            {step == 0 &&
              <div className="row">
                <div className="col-12 col-md-6">
                  <label htmlFor="agent_name" className="my-2">{t('Agent name')}</label>
                  <InputRow $theme={theme}>
                    <Input
                      $theme={theme}
                      id="agent_name"
                      type="text"
                      className=""
                      placeholder={t('Input agent name...')}
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                    />
                  </InputRow>
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="job_title" className="my-2">{t('Job title')}</label>
                  <InputRow $theme={theme}>
                    <Input
                      $theme={theme}
                      id="job_title"
                      type="text"
                      className=""
                      placeholder={t('Input agent job title...')}
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </InputRow>
                </div>
                <div className="col-12 col-md-6">
                  <Title theme={theme} className="my-2">{t('Agent Voice')}</Title>
                  <DropdownObjectButton color={["white", "#185968"]} options={voiceList} onSelect={handleVoiceSelect} isFull={true} defaultValue={voiceID} />
                </div>
                <div className="col-12 col-md-6">
                  <Title theme={theme} className="my-2">{t('Agent language')}</Title>
                  <DropdownObjectButton color={["white", "#185968"]} options={agentLangList} onSelect={handleLanguageSelect} isFull={true} defaultValue={language} />
                </div>
              </div>}
            <div className="d-flex gap-2 flex-column mt-2">
              <label htmlFor="paste">{t('Choose what type of document')}</label>
              <div className="row">
                {createAgentOptions[step].options.map((item, index) => (
                  <div key={index} className={`col-12 ${step == 0 && "col-md-6"} my-2`}>
                    <CustomInput
                      key={index}
                      selected={selectedInput[step]}
                      setSelected={(val: any) =>
                        setSelectedInput(prevSelectedInput => {
                          const updatedInput = [...prevSelectedInput];
                          if (step >= 0 && step < updatedInput.length) {
                            updatedInput[step] = val;
                          }
                          return updatedInput;
                        })
                      }
                      children={
                        <div className="d-flex flex-column">
                          <p className="mb-2">{t(item.title)}</p>
                          <p className="">{t(item.desc)}</p>
                        </div>
                      }
                      name="type"
                      label={item.label}
                      value={item.value}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ModalContainer>
        }
        show={showCreateAgentModal}
        btntext={t(createAgentOptions[step].btntext)}
        onHide={() => { setShowCreateAgentModal(false); setStep(0) }}
        onBack={step != 0 && (() => setStep(prevStep => prevStep - 1))}
        onContinue={() => handlleCreateAgent()}
      />
    </>
  );
}
