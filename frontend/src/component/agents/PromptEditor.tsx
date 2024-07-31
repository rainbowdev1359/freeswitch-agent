import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Col } from "react-bootstrap";
import { RootState } from "../../store";
import CustomInput from "../CustomInput";
import { useSelector } from "react-redux";
import CenteredModal from "../modals/Modal";
import DragAndDrop from "../DragAndDrop";
import PoscallModal from "../modals/Postcall";
import PageBackButton from "../PageBackButton";
import { AParagraph, PERow, Menu, EditorContainer, PromptContainer, Head, InputRow, Input, CallOnQueParagraph, LinkP, TextAreaMod, AITextShow, Title } from "../StyleComponents";
import { DropdownObjectButton } from "../DropDown";
import { agentLangList, aiGenerateTypes, voiceList } from "../../utils/lib";
import { useTranslation } from 'react-i18next';
import { KnowledgePromptEditor, PoliciesPromptEditor, ObjectivesPromptEditor, RulesPromptEditor, ProductsPromptEditor, TemperaturePromptEditor } from './PromptEditorComponents';
import DragEditText from '../DragEditText';
import services from "../../api";
import { useLocation } from "react-router-dom";
import axios from 'axios';

interface DraggableTextProps {
  text: string;
  onDragStart: (e: DragEvent<HTMLDivElement>, text: string) => void;
}

interface AgentData_interface{
  id: string;
  agentType: string;
  documentType: string;
  info: string;
  prompt: string;
  voiceID: string;
  language: string;
  temperature: number;
  interruption: number;
  methodType: string;
  objectives: [];
  products: [];
}

const DraggableText: React.FC<DraggableTextProps> = ({ text, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, text)}
    className="draggable-text"
    key={text}
  >
    {text}
  </div>
);


function PromptEditor() {
  const { t } = useTranslation();

  const theme = useSelector((state: RootState) => state.theme.theme);
  const location = useLocation();
  const [currentData, setCurrentData] = useState('')
  const [promptModalShow, setPromptModalShow] = useState(false);
  const [exportModalShow, setExportModalShow] = useState(false);
  const [agentModalShow, setAgentModalShow] = useState(false);
  const [showExternalModal, setShowExternalModal] = useState("");
  const [aiModalShow, setAIModalShow] = useState(false);
  const [aiModalType, setAIModalType] = useState<string>("");
  const [aiPlaceholder, setAIPlaceholder] = useState<string>("");
  const [exportType, setExportType] = useState<string>("doc");
  const [newPrompt, setNewPrompt] = useState<string>("");
  const [newPromptValue, setNewPromptValue] = useState<string>("");
  const [editPrompts, setEditPrompts] = useState<any>([]);
  const [selectPrompt, setSelectPrompt] = useState<number | null>(null);
  const [generatePrompt, setGeneratePrompt] = useState<string>("");
  const [generatedText, setGeneratedText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [agentData, setAgentData] = useState({});
  const [prompt, setPrompt] = useState<string>("Edit prompt here");
  const [isEditable, setIsEditable] = useState(false); // Editable state
  const [agentVoice, setAgentVoice] = useState("84753c03-47d1-4f74-a72b-19df5f09f5d2");
  const [agentLanguage, setAgentLanguage] = useState("en");
  const [temperature, setTemperature] = useState(0.5);
  const [interruption, setInterruption] = useState(100);

  const openAIAPIKey = import.meta.env.VITE_OPENAI_API_KEY;

  useEffect(() => {
    const { data } = location.state || {};
    console.log("+++++++++++ 1", data);
    setEditPrompts(data.agent.info)
    setAgentData(data);
    setPrompt(data.agent.prompt)
    setCurrentData(data.agent.info[0].title)
    setAgentVoice(data.agent.voiceID);
    setAgentLanguage(data.agent.language);
    setTemperature(data.agent.temperature);
    setInterruption(data.agent.interruption);
  }, [])

  const handleData = async (val: number) => {
    setCurrentData(editPrompts[val].title);
    setNewPrompt(editPrompts[val].title);
    setNewPromptValue(editPrompts[val].value);
    setPromptModalShow(true);
    setSelectPrompt(val);
  }

  const getFileData = (fileData: File | null | undefined) => {
    console.log(fileData);
  }

  const handleLanguageSelect = async (val: string) => {
    console.log(val)
    setAgentLanguage(val)
    const data = {
      id: agentData.id,
      voiceID: agentVoice,
      language: val,
      agentType: agentData.agentType,
      documentType: agentData.documentType,
      info: agentData.info,
      prompt: agentData.prompt,
      temperature: temperature,
      interruption: interruption
    }
    services.agent.updateAgent(data).then((response: any) => {

    })
      .catch((error: any) => {
        console.log(error);
      })
  };

  const handleVoiceSelect = async (val: string) => {
    console.log(val)
    setAgentVoice(val)
    const data = {
      id: agentData.id,
      voiceID: val,
      language: agentLanguage,
      agentType: agentData.agentType,
      documentType: agentData.documentType,
      info: agentData.info,
      prompt: agentData.prompt,
      temperature: temperature,
      interruption: interruption
    }
    services.agent.updateAgent(data).then(() => {

    })
      .catch((error: any) => {
        console.log(error);
      })
  };

  const newPromptAsync = async () => {
    var updatedPrompts: any[] = [];

    // Update the state first
    await new Promise<void>((resolve) => {
        setEditPrompts((prevEditPrompts: any) => {
            if (selectPrompt != null) {
                updatedPrompts = prevEditPrompts.map((prompt: any, index: any) => {
                    if (index === selectPrompt) {
                        return { ...prompt, title: newPrompt, value: newPromptValue };
                    }
                    return prompt;
                });
            } else {
                if (newPrompt != "") {
                    updatedPrompts = [
                        ...prevEditPrompts,
                        { id: prevEditPrompts.length + 1, title: newPrompt, value: newPromptValue }
                    ];
                }
            }
            resolve();
            return updatedPrompts;
        });

        // Reset the modal and input fields
        setPromptModalShow(false);
        setSelectPrompt(null);
        setNewPrompt("");
        setNewPromptValue("");
    });

    // Now call the API with the updated state
    const data = {
      id: agentData.id,
      info: updatedPrompts
    };

    try {
        await services.agent.updateAgent(data);
    } catch (error) {
        console.log(error);
    }
  }

  const newPromptCancel = () => {
    setPromptModalShow(false)
    setSelectPrompt(null)
    setNewPrompt("")
    setNewPromptValue("")
  }

  const openAIModal = (val: number) => {
    setAIModalShow(true)
    setAIModalType(aiGenerateTypes[val].type)
    setAIPlaceholder(aiGenerateTypes[val].placeholder)
    setShowExternalModal("")
    setGeneratePrompt("");
    setGeneratedText("");
  }

  const closeAIModal = () => {
    setAIModalShow(false)
    setAIModalType("")
    setAIPlaceholder("")
  }


  const handleSave = () => {

    const text = prompt;
    // const result = text.replace(/{{(.*?)}}/g, (_, key) => {
    //   const promptItem = editPrompts.find(item => item.title === key);
    //   return promptItem ? promptItem.value : `{{${key}}}`;
    // });
    // function stripHTMLAndEntities(text) {
    //   // Create a temporary DOM element to leverage browser's HTML parsing
    //   const tempDiv = document.createElement("div");
    //   tempDiv.innerHTML = text;

    //   // Get the text content which automatically decodes HTML entities
    //   const decodedText = tempDiv.textContent || tempDiv.innerText || " ";

    //   // Remove any remaining HTML tags (although there shouldn't be any)
    //   return decodedText.replace(/<\/?[^>]+(>|$)/g, " ");
    // }
    setIsEditable(false);
    const data = {
      id: agentData.id,
      voiceID: agentVoice,
      language: agentLanguage,
      agentType: agentData.agentType,
      documentType: agentData.documentType,
      info: editPrompts,
      prompt: text,
      temperature: temperature,
      interruption: interruption
    }
    services.agent.updateAgent(data).then((response: any) => {

    })
    .catch((error: any) => {
      console.log(error);
    })
  };

  const handleDragStart = (e: any, text: string) => {
    e.dataTransfer.setData("text/plain", text);
  };

  const generateResult = async () => {
    setLoading(true);
    console.log("++++++++++++++ openAIAPIKey = ", openAIAPIKey)
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions', 
        {
          model: 'gpt-4', // Specify the model you are using
          messages: [{ role: 'user', content: generatePrompt }],
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${openAIAPIKey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setGeneratedText(response.data.choices[0].message.content);
    } catch (error) {
      setGeneratedText('Error generating text. Please try again.');
      console.error('Error generating text:', error);
    }
    setLoading(false);
  };

  return (
    <Col>
      <Header />
      <PageBackButton />
      <PromptContainer>
        <PERow className="align-items-start gap-3">
          <EditorContainer $theme={theme} className="w-full">
            <div className="d-flex justify-content-between align-items-center w-full">
              <Head>{currentData}</Head>
              <div className="d-flex flex-wrap gap-2 ">
                <LinkP $theme={theme} onClick={() => openAIModal(1)} className="d-flex">
                  <img src={theme == "light" ? "/aigenerate-light.svg" : "/aigenerate.svg"} alt="" width={20} />
                  <AParagraph $theme={theme}>{t('Generate using AI')}</AParagraph>
                </LinkP>
                <LinkP $theme={theme} onClick={() => setIsEditable(true)} >
                  <AParagraph $theme={theme}>{t('Edit')}</AParagraph>
                </LinkP>
                <LinkP $theme={theme} onClick={() => handleSave()} >
                  <AParagraph $theme={theme}>{t('Save')}</AParagraph>
                </LinkP>
                <LinkP $theme={theme} >
                  <AParagraph $theme={theme}>{t('History')}</AParagraph>
                </LinkP>
              </div>
            </div>
            <DragEditText
              isEditable={isEditable}
              prompt={prompt}
              setPrompt={setPrompt}
              editPrompts={editPrompts}
            />
          </EditorContainer>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <Menu $theme={theme}>
              <CallOnQueParagraph theme={theme}>{t('Edit prompt')}</CallOnQueParagraph>
              <div className="d-flex flex-wrap">
                {editPrompts.map((editPrompt: any, index: number) => (
                  <PERow key={index} className="justify-content-start gap-2 py-2" style={{ width: "50%" }}>
                    <img src={theme == "light" ? "/edit2-light.svg" : "/edit.svg"} alt="" width={20} onClick={() => handleData(index)} />
                    <AParagraph $theme={theme}>
                      <DraggableText key={editPrompt.title} text={editPrompt.title} onDragStart={handleDragStart} />
                    </AParagraph>
                  </PERow>
                ))}
              </div>
              <PERow className="justify-content-start gap-2 py-2 " onClick={() => setPromptModalShow(true)}>
                <img src={theme == "light" ? "/add-light.svg" : "/add.svg"} alt="" width={20} />
                <AParagraph $theme={theme}>{t('Add a prompt section')}</AParagraph>
              </PERow>
            </Menu>

            <Menu style={{ marginTop: "20px" }} $theme={theme}>
              <div className="d-flex col-12 col-md-6 mb-3 gap-0 flex-column w-full">
                <Title theme={theme}>{t('Select language')}</Title>
                <DropdownObjectButton color={["white", "#051316"]} options={agentLangList} onSelect={handleLanguageSelect} isFull={true} defaultValue={agentLanguage} />
              </div>
              <PERow className="justify-content-start gap-2 py-2 " onClick={() => setExportModalShow(true)}>
                <img src={theme == "light" ? "/export-light.svg" : "/export.svg"} alt="" width={20} />
                <AParagraph $theme={theme}>{t('Export agent database')}</AParagraph>
              </PERow>
              <PERow className="justify-content-start gap-2 py-2 " onClick={() => setAgentModalShow(true)}>
                <img src={theme == "light" ? "/changeAgent-light.svg" : "/changeAgent.svg"} alt="" width={20} />
                <AParagraph $theme={theme}>{t('Change agent Name and image and gender.')}</AParagraph>
              </PERow>
            </Menu>

            <Menu style={{ marginTop: "20px" }} $theme={theme}>
              <PERow className="justify-content-between gap-2 mb-2">
                <AParagraph $theme={theme}>{t('Temperature base focus')}</AParagraph>
                <LinkP $theme={theme} onClick={() => setShowExternalModal("Temperature")}>
                  <img src={theme == "light" ? "/maximize-light.svg" : "/maximize.svg"} alt="" width={20} />
                </LinkP>
              </PERow>
              <TemperaturePromptEditor openAIModal={() => openAIModal(4)} temperature={temperature} interruption={interruption} setTemperature={setTemperature} setInterruption={setInterruption} id = {agentData.id} />
            </Menu>

            <Menu style={{ marginTop: "20px" }} $theme={theme}>
              <PERow className="justify-content-between gap-2 mb-2">
                <AParagraph $theme={theme}>{t('Knowledge base focus')}</AParagraph>
                <LinkP $theme={theme} onClick={() => setShowExternalModal("Knowledge")}>
                  <img src={theme == "light" ? "/maximize-light.svg" : "/maximize.svg"} alt="" width={20} />
                </LinkP>
              </PERow>
              <KnowledgePromptEditor openAIModal={() => openAIModal(0)} />
            </Menu>

            <Menu style={{ marginTop: "20px" }} $theme={theme}>
              <PERow className="justify-content-between gap-2 mb-2">
                <AParagraph $theme={theme}>{t('Policies')}</AParagraph>
                <LinkP $theme={theme} onClick={() => setShowExternalModal("Policies")}>
                  <img src={theme == "light" ? "/maximize-light.svg" : "/maximize.svg"} alt="" width={20} />
                </LinkP>
              </PERow>
              <PoliciesPromptEditor openAIModal={() => openAIModal(1)} agentData={agentData.agent}/>
            </Menu>

            <Menu style={{ marginTop: "20px" }} $theme={theme}>
              <PERow className="justify-content-between gap-2 mb-2">
                <AParagraph $theme={theme}>{t('Objectives')}</AParagraph>
                <LinkP $theme={theme} onClick={() => setShowExternalModal("Objectives")}>
                  <img src={theme == "light" ? "/maximize-light.svg" : "/maximize.svg"} alt="" width={20} />
                </LinkP>
              </PERow>
              <ObjectivesPromptEditor openAIModal={() => openAIModal(2)} objectivesData={agentData.objectives} agentId={agentData?.agent?.id || 0}/>
            </Menu>

            <Menu style={{ marginTop: "20px" }} $theme={theme}>
              <PERow className="justify-content-between gap-2 mb-2">
                <AParagraph $theme={theme}>{t('Products')}</AParagraph>
                <LinkP $theme={theme} onClick={() => setShowExternalModal("Products")}>
                  <img src={theme == "light" ? "/maximize-light.svg" : "/maximize.svg"} alt="" width={20} />
                </LinkP>
              </PERow>
              <ProductsPromptEditor productsData={agentData.products} agentId={agentData?.agent?.id || 0} />
            </Menu>

            <Menu style={{ marginTop: "20px" }} $theme={theme}>
              <PERow className="justify-content-between gap-2 mb-2">
                <AParagraph $theme={theme}>{t('Rules')}</AParagraph>
                <LinkP $theme={theme} onClick={() => setShowExternalModal("Rules")}>
                  <img src={theme == "light" ? "/maximize-light.svg" : "/maximize.svg"} alt="" width={20} />
                </LinkP>
              </PERow>
              <RulesPromptEditor openAIModal={() => openAIModal(3)} agentData={agentData.agent} />
            </Menu>

          </div>
        </PERow>
      </PromptContainer>

      <CenteredModal
        children={
          <div className={`d-flex  flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="d-flex gap-0 flex-column">
              <p className="my-2">{t('Prompt name')}</p>
              <InputRow $theme={theme}>
                <Input $theme={theme} id="newnewPrompt" type="text" value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  className=""
                  placeholder={t('Rename agent...')}
                />
              </InputRow>
              <p className="my-2">{t('Prompt name')}</p>
              <InputRow $theme={theme}>
                <Input $theme={theme} id="newnewPromptValue" type="text" value={newPromptValue}
                  onChange={(e) => setNewPromptValue(e.target.value)}
                  className=""
                  placeholder={t('')}
                />
              </InputRow>
            </div>
          </div>
        }
        show={promptModalShow}
        btntext="Save"
        onHide={newPromptCancel}
        onContinue={newPromptAsync}
        title={selectPrompt != null ? t('Edit prompt') : t('New prompt')}
      />

      <CenteredModal
        children={
          <div className={`d-flex  flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <CustomInput
              selected={exportType}
              setSelected={setExportType}
              children={
                <div className="d-flex flex-column">
                  <p className="mb-2">{t('Export as word file (.doc)')}</p>
                  <p className="">{t('Export your AI Agent database into a convenient Word file with just a click! Exporting your data allows you to easily share, review, or archive your valuable information in a word format')}</p>
                </div>
              }
              name="type"
              label="doc"
              value="doc"
            />
            <CustomInput
              selected={exportType}
              setSelected={setExportType}
              children={
                <div className="d-flex flex-column">
                  <p className="mb-2">{t('Export as Text file (.txt)')}</p>
                  <p className="">{t('Export your AI Agent database into a convenient text file with just a click! Exporting your data allows you to easily share, review, or archive your valuable information in a text format')}</p>
                </div>
              }
              name="type"
              label="txt"
              value="txt"
            />
          </div>
        }
        show={exportModalShow}
        btntext="Save"
        onHide={() => setExportModalShow(false)}
        onContinue={() => setExportModalShow(false)}
        title="Export agent database"
      />

      <CenteredModal
        children={
          <div className={`d-flex row ${theme == "light" ? "light" : ""}`}>
            <div className="d-flex col-12 col-md-6 mb-3 gap-0 flex-column w-">
              <p className="my-2">{editPrompts[0]?.value}</p>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Rename agent...')}
                />
              </InputRow>
            </div>
            <div className="d-flex col-12 col-md-6 mb-3 gap-0 flex-column">
              <p className="my-2">{t('Job title')}</p>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Agent job title...')}
                />
              </InputRow>
            </div>

            <div className="d-flex col-12 col-md-6 mb-3 gap-0 flex-column">
              <Title theme={theme}>{t('Agent Voice')}</Title>
              <DropdownObjectButton color={["white", "#051316"]} options={voiceList} onSelect={handleVoiceSelect} isFull={true} defaultValue={agentVoice} />
            </div>

            <div className="d-flex col-12 col-md-6 mb-3 gap-0 flex-column">
              <Title theme={theme}>{t('Agent language')}</Title>
              <DropdownObjectButton color={["white", "#051316"]} options={agentLangList} onSelect={handleLanguageSelect} isFull={true} defaultValue={agentLanguage} />
            </div>

            <DragAndDrop
              className="w-full"
              color={theme == "light" ? "#E5ECEE" : `rgba(5, 19, 22, 1)`}
              getFileData={getFileData}
              accept={".jpg,.png"}
              subTitle={t("(only accepting jpg, png formats)")}
            />
          </div>
        }
        show={agentModalShow}
        btntext={t('Save')}
        onHide={() => setAgentModalShow(false)}
        onContinue={() => setAgentModalShow(false)}
        title={t('Change agent image and name')}
      />

      <PoscallModal
        children={
          <div className={`d-flex  flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="d-flex gap-0 flex-column">
              <div className="d-flex flex-wrap gap-2 ">
                <LinkP $theme={theme} >
                  <AParagraph $theme={theme} aria-disabled={loading} onClick={() => generateResult()}>{t('Generate')}</AParagraph>
                </LinkP>
                {["knowledge", "policies"].includes(aiModalType) ?
                  <LinkP $theme={theme} >
                    <AParagraph $theme={theme}>{t('Copy text')}</AParagraph>
                  </LinkP>
                  :
                  <>
                    <LinkP $theme={theme} >
                      <AParagraph $theme={theme}>{t('Export')}</AParagraph>
                    </LinkP>
                    <LinkP $theme={theme} >
                      <AParagraph $theme={theme}>{t('Add')}</AParagraph>
                    </LinkP>
                  </>
                }
              </div>
              <TextAreaMod style={{ minHeight: "100px" }} theme={theme} placeholder={t(aiPlaceholder)} value={generatePrompt} onChange={(e) => setGeneratePrompt(e.target.value)} />
              <AITextShow $theme={theme} value={generatedText} contentEditable="false" />
            </div>
          </div>
        }
        show={aiModalShow}
        onHide={closeAIModal}
        title={t('Generate using AI')}
      />

      <PoscallModal
        children={
          <div className={`d-flex flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            {showExternalModal == "Knowledge" && <KnowledgePromptEditor openAIModal={() => openAIModal(0)} />}
            {showExternalModal == "Policies" && <PoliciesPromptEditor openAIModal={() => openAIModal(1)} />}
            {showExternalModal == "Objectives" && <ObjectivesPromptEditor openAIModal={() => openAIModal(2)} />}
            {showExternalModal == "Products" && <ProductsPromptEditor />}
            {showExternalModal == "Rules" && <RulesPromptEditor openAIModal={() => openAIModal(3)} />}
            {showExternalModal == "Temperature" && <TemperaturePromptEditor openAIModal={() => openAIModal(4)} temperature={temperature} interruption={interruption} setTemperature={setTemperature} setInterruption={setInterruption} id = {agentData.id} />}
          </div>
        }
        show={showExternalModal !== ""}
        onHide={() => setShowExternalModal("")}
        title={t(showExternalModal)}
      />
    </Col>
  );
}

export default PromptEditor;
