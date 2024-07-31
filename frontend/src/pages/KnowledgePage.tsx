import "./int.css";
import { SalesPitchers } from "../component/SalesPitchers";
import { useState, useEffect } from "react";
import CenteredModal from "../component/modals/Modal";
import BuySpaceTable from "../component/knowledge/BuySpaceTable";
import PoscallModal from "../component/modals/Postcall";
import CustomInput from "../component/CustomInput";
import DragAndDrop from "../component/DragAndDrop";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Toggle from "../component/Toggle";
import services from "../api";
import { useTranslation } from 'react-i18next';
import {
  H1Styled,
  KnowledgeDivStyled,
  PModified,
  FileCol,
  CircledD,
  CircledS,
  CircledA,
  CircledV,
  StyledH4,
  ComponentDiv,
  ParentProgressBar,
  ChildProgressBar,
  SalesCol,
  KnowledgePreviewDiv,
  ComponentRender,
  OnGoingCall,
  KnowledgeContainer,
  PageContainer,
  KnowledgePreviewButton,
  LinkP,
} from "../component/StyleComponents";

type FileType = 'video' | 'audio' | 'document' | 'unknown';

interface DataItem {
  Date: string;
  file: null | File;
  file_name: string;
  file_path: string;
  id: number;
  raw: string;
}

export function KnowledgePage() {
  const { t } = useTranslation();
  const [modalDocShow, setModalDocShow] = useState(false);
  const [modalVideoShow, setModalVideoShow] = useState(false);
  const [modalAudioShow, setModalAudioShow] = useState(false);
  const [nextModalShow, setNextModalShow] = useState(false);
  const [buySpaceModalShow, setBuySpaceModalShow] = useState(false);
  const [file, setFile] = useState<File | null | undefined>(null);
  const [Documents, setDocuments] = useState<DataItem[]>([]);
  const [Spreadsheet, setSpreadsheet] = useState<DataItem[]>([]);
  const [Audio, setAudio] = useState<DataItem[]>([]);
  const [Video, setVideo] = useState<DataItem[]>([]);
  const [filstlist, setFilstlist] = useState<DataItem[]>([]);
  const [selectedInput, setSelectedInput] = useState("sales_pitches");

  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleUploadKnowledge = async () => {
    if (file) {
        try {
            const currentDate = new Date();
            const formData = new FormData();
            formData.append('file', file);
            formData.append('file_path', '/path/to/file');
            formData.append('file_name', file.name);
            formData.append('Date', currentDate.toISOString());
            formData.append('raw', getFileType(file.name));  // Add raw data if needed

            console.log(Array.from(formData.entries()));  // Debug: log formData entries

            await services.knowledge.createNewKnowledge(formData);
            await GetAllKnowledge(); // Assuming this function fetches all knowledge data
            setFilstlist((preFilelist) => [
                ...preFilelist,
                {
                    file: file,
                    file_path: '/path/to/file',
                    file_name: file.name,
                    Date: currentDate.toISOString(),
                    raw: 'file data',
                    id: filstlist.length,
                },
            ]);
            setNextModalShow(false);
        } catch (error) {
            console.error('File upload failed.', error);  // Debug: log error details
            alert('File upload failed.');
        }
    } else {
        alert('Please upload a file.');
    }
  };

  const GetAllKnowledge = async () => {
    const results = await services.knowledge.getAllKnowledge()
    countFileTypes(results.data);
  }

  const getFileData = (fileData: File | null | undefined) => {
    setFile(fileData);
  }

  useEffect(() => {
    const fetchData = async () => {
      await GetAllKnowledge();
    };
    fetchData();
  }, []);

  function countFileTypes(data: any) {
    let documents: DataItem[] = [];
    let spreadsheet: DataItem[] = [];
    let videos: DataItem[] = [];
    let audios: DataItem[] = [];

    data.forEach((item: DataItem) => {
      const fileType = getFileType(item.file_name);
      switch (fileType) {
        case "document":
          documents.push(item);
          break;
        case "unknown":
          spreadsheet.push(item);
          break;
        case "video":
          videos.push(item);
          break;
        case "audio":
          audios.push(item);
          break;
        default:
          break;
      }
    });
    setDocuments(documents)
    setSpreadsheet(spreadsheet)
    setAudio(audios)
    setVideo(videos)
    setFilstlist([])
  }

  function getFileType(fileName: string): FileType {
    const videoExtensions = /\.(avi|mp4|mov|wmv|flv)$/i;
    const audioExtensions = /\.(mp3|wav|aac|flac)$/i;
    const documentExtensions = /\.(doc|docx|pdf|txt|xls|xlsx|ppt|pptx)$/i;


    if (videoExtensions.test(fileName)) {
      return 'video';
    } else if (audioExtensions.test(fileName)) {
      return 'audio';
    } else if (documentExtensions.test(fileName)) {
      return 'document';
    } else {
      return 'unknown';
    }
  }
  const user = localStorage.getItem('username')

  return (
    <KnowledgeContainer>
      <KnowledgeDivStyled theme={theme} className="px-5  justify-content-between d-flex align-items-center py-1" >
        <div>
          <H1Styled theme={theme}>Welcome {user}</H1Styled>
          <PModified theme={theme}>September 12, 2024</PModified>
        </div>
        <Toggle />
      </KnowledgeDivStyled>

      <PageContainer>
        <div className="w-full row m-4">
          <div className="col-12 col-md-6 col-lg-4">
            <FileCol theme={theme} className="d-flex flex-column gap-4 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <StyledH4 theme={theme}>{t("All files")}</StyledH4>
                <LinkP onClick={() => setBuySpaceModalShow(true)}>{t("Buy more space")}</LinkP>
              </div>
              {/* parental one */}
              <div className="d-flex flex-column gap-4">
                {/* one component */}
                <ComponentDiv
                  theme={theme}
                  className="d-flex  justify-content-between  pb-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFilstlist(Documents)}
                >
                  <div className="d-flex flex-row align-items-baseline gap-2">
                    <CircledD />
                    <p>{t("Documents")}</p>
                  </div>

                  <div className="d-flex flex-column gap-0 align-items-center">
                    <p className="p-0 m-0">{Documents.length} {t("documents")}</p>
                    <p className="p-0 m-0">200m {t("tokens")}</p>
                  </div>
                </ComponentDiv>
                <ComponentDiv
                  theme={theme}
                  className="d-flex  justify-content-between "
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFilstlist(Spreadsheet)}
                >
                  <div className="d-flex flex-row align-items-baseline gap-2">
                    <CircledS />
                    <p>{t("SpreadSheet")}</p>
                  </div>

                  <div className="d-flex flex-column gap-0 align-items-center">
                    <p className="p-0 m-0 text-end" style={{ width: "100%" }}>
                      {Spreadsheet.length} {t("sheets")}
                    </p>
                    <p className="p-0 m-0">200m {t("tokens")}</p>
                  </div>
                </ComponentDiv>
                <ComponentDiv
                  theme={theme}
                  className="d-flex  justify-content-between "
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFilstlist(Audio)}
                >
                  <div className="d-flex flex-row align-items-baseline gap-2">
                    <CircledA />
                    <p>{t("Audio")}</p>
                  </div>

                  <div className="d-flex flex-column gap-0 align-items-center">
                    <p className="p-0 m-0 text-end" style={{ width: "100%" }}>
                      {Audio.length} {t("files")}
                    </p>
                    <p className="p-0 m-0"> 956.5 {t("minutes")}</p>
                  </div>
                </ComponentDiv>
                <ComponentDiv
                  theme={theme}
                  className="d-flex  justify-content-between "
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFilstlist(Video)}
                >
                  <div className="d-flex flex-row align-items-baseline gap-2">
                    <CircledV />
                    <p>{t("Video")}</p>
                  </div>

                  <div className="d-flex flex-column gap-0 align-items-center">
                    <p className="p-0 m-0  text-end" style={{ width: "100%" }}>
                      {Video.length} {t("files")}
                    </p>
                    <p className="p-0 m-0 "> 956.5 {t("minutes")}</p>
                  </div>
                </ComponentDiv>
              </div>
              <div>
                <p>90/100 {t("files")}</p>
                <ParentProgressBar>
                  <ChildProgressBar percent={90} className="text-end">90%</ChildProgressBar>
                </ParentProgressBar>
              </div>
            </FileCol>
          </div>
          <div className="col-12 col-md-6 col-lg-8">
            <SalesCol theme={theme} className="d-flex flex-column gap-4 p-3">
              <div className="d-flex align-items-center justify-content-end gap-3">
                <LinkP onClick={() => setModalVideoShow(true)}>{t("Upload video")}</LinkP>
                <LinkP onClick={() => setModalAudioShow(true)}>{t("Upload audio")}</LinkP>
                <LinkP onClick={() => setModalDocShow(true)}>{t("Upload document")}</LinkP>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-wrap flex-lg-row flex-column gap-3">
                  <ComponentRender theme={theme} className="py-2 flex-grow-1 px-3" >
                    {t("Sales pitches")}
                  </ComponentRender>
                  <ComponentRender theme={theme} className="py-2  flex-grow-1 px-3" >
                    {t("Product knowledge")}
                  </ComponentRender>
                  <ComponentRender theme={theme} className="py-2 flex-grow-1 px-3" >
                    {t("Service guidelines")}
                  </ComponentRender>
                </div>
                <SalesPitchers GetAllKnowledge={GetAllKnowledge} filelist={filstlist} />
              </div>
            </SalesCol>
          </div>
          <div className="col-12 mt-4">
            <SalesCol theme={theme} className="d-flex flex-column gap-4 p-3">
              <div className="d-flex flex-column gap-3">
                <KnowledgePreviewDiv theme={theme} className="first_header d-flex flex-wrap justify-content-between">
                  <div className="my-auto">{t("File name")}</div>
                  <div className="d-flex flex-wrap gap-3">
                    <KnowledgePreviewButton $theme={theme}>{t("Edit")}</KnowledgePreviewButton>
                    <KnowledgePreviewButton $theme={theme}>{t("Save")}</KnowledgePreviewButton>
                  </div>
                </KnowledgePreviewDiv>
                <OnGoingCall style={{ minHeight: "160px", marginBottom: "0px" }} />
              </div>
            </SalesCol>
          </div>
        </div>
      </PageContainer>

      <CenteredModal
        children={
          <div className="d-flex flex-column gap-1">
            <label htmlFor="paste">{t("Choose what type of document")}</label>
            <CustomInput
              selected={selectedInput}
              setSelected={setSelectedInput}
              name="type"
              label={t("Sales pitches")}
              value="sales_pitches"
            />
            <CustomInput
              selected={selectedInput}
              setSelected={setSelectedInput}
              name="type"
              label={t("Product knowledge")}
              value="prod_knowledge"
            />
            <CustomInput
              selected={selectedInput}
              setSelected={setSelectedInput}
              name="type"
              label={t("Service guidelines")}
              value="service_guideline"
            />
          </div>
        }
        show={modalDocShow}
        btntext={t("Next")}
        onHide={() => setModalDocShow(false)}
        onContinue={() => {
          setModalDocShow(false);
          setTimeout(() => { }, 2000);
          setNextModalShow(true);
        }}
      />

      <CenteredModal
        children={
          <div className={`d-flex flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="flex-grow flex-column">
              <label htmlFor="paste" className="mb-2">{t("Paste text")}</label>
              <input
                id="paste"
                type="text"
                className="custom_input"
                placeholder={t("Paste text")}
              />
            </div>
            <label className="text-center text-secondary my-3">{t("Or")}</label>
            <div className="flex-grow flex-column">
              <div className={`${theme == "light" ? "text-dark" : "text-light"} mb-2`}>
                {t("Upload file")} <label className="text-center text-secondary">{t("(Pdf,txt,doc)")}</label>
              </div>
              <DragAndDrop
                color={theme == "light" ? "#E5ECEE" : `rgba(5, 19, 22, 1)`}
                getFileData={getFileData}
                accept={".pdf,.txt,.doc"}
              />
            </div>
          </div>
        }
        show={nextModalShow}
        btntext={t("Upload")}
        disabled={!file}
        onHide={() => setNextModalShow(false)}
        onContinue={() => handleUploadKnowledge(() => setNextModalShow(false))}
      />

      <CenteredModal
        children={
          <div className={`d-flex flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="flex-grow flex-column">
              <div className={`${theme == "light" ? "text-dark" : "text-light"} mb-2`}>
                {t("Upload file")}
              </div>
              <DragAndDrop
                color={theme == "light" ? "#E5ECEE" : `rgba(5, 19, 22, 1)`}
                subTitle={t("(MP3, WAV, AAC, Ogg, M4a)")}
                getFileData={getFileData}
                accept={".mp3,.wav,.aac,.ogg,.m4a"}
              />
            </div>
          </div>
        }
        show={modalAudioShow}
        title={t("Upload audio")}
        btntext={t("Upload and transcribe")}
        disabled={!file}
        onHide={() => setModalAudioShow(false)}
        onContinue={() => handleUploadKnowledge(() => setModalAudioShow(false))}
      />

      <CenteredModal
        children={
          <div className={`d-flex flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="flex-grow flex-column">
              <div className={`${theme == "light" ? "text-dark" : "text-light"} mb-2`}>
                {t("Upload file")}
              </div>
              <DragAndDrop
                color={theme == "light" ? "#E5ECEE" : `rgba(5, 19, 22, 1)`}
                subTitle={t("(AVCHD, AVI, MP4, MKV, WMV, H.264, HEVC, H.265)")}
                getFileData={getFileData}
                accept={".avchd,.avi,.mp4,.mkv,.wmv,.hevc"}
              />
            </div>
          </div>
        }
        show={modalVideoShow}
        title={t("Upload Video")}
        btntext={t("Upload and transcribe")}
        disabled={!file}
        onHide={() => setModalVideoShow(false)}
        onContinue={() => handleUploadKnowledge(() => setModalVideoShow(false))}
      />

      <PoscallModal
        children={<BuySpaceTable onHide={() => setBuySpaceModalShow(false)} isEdit={false} />}
        show={buySpaceModalShow}
        onHide={() => setBuySpaceModalShow(false)}
        title={t("Buy more space")}
      />
    </KnowledgeContainer>
  );
}
