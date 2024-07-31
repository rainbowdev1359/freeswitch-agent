import { Header } from "./Header";
import { Col } from "react-bootstrap";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import WavesurferPlayer from "@wavesurfer/react";
import { useEffect, useState } from "react";
import PageBackButton from "../PageBackButton";
import { PERow, WaveContainer, EditorContainer, PromptContainer, Head, GreenContainer, FlexContainer } from "../StyleComponents";
import { useLocation } from "react-router-dom";

function PlayCall() {
  const location = useLocation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null)
  const [transcripts, setTranscripts] = useState([]);
  const [recordUrl, setRecordUrl] = useState("/piano.mp3");

  useEffect(() => {
    const { data } = location.state || {};
    console.log(data.transcripts);
    setTranscripts(data.transcripts);
    setRecordUrl(data.recording_url);
  }, [])

  const onReady = (ws: any) => {
    setWavesurfer(ws)
    setIsPlaying(isPlaying)
  }
  const onPlayPause = () => {
    //@ts-ignore
    wavesurfer && wavesurfer.playPause()
  }
  return (
    <Col>
      <Header />
      <PageBackButton />
      <PromptContainer>
        <PERow className="align-items-start gap-3">
          <EditorContainer $theme={theme}>
            <Head>Raam, Adi</Head>
            <p>05/05/2024</p>
            <FlexContainer className="flex-grow-1">
              <div className="flex-grow-1">
                {
                  transcripts.map((value: any) => <div className="mb-3">
                    <div className="d-flex items-center justify-start">
                      <div className="d-flex align-items-center justify-cente" style={{ marginRight: '15px' }}>
                        <p>{new Date(value.created_at).toTimeString().substring(0, 8)}</p>
                      </div>
                      <div>
                        <p style={{ fontWeight: 'bold' }}>{value.user}</p>
                        <p>{value.text}</p>
                      </div>
                    </div>
                  </div>)
                }
              </div>
              <div className="d-flex flex-column">
                <img src="/resume.svg" alt="" onClick={onPlayPause} />
                <WaveContainer>
                  <WavesurferPlayer
                    width={590}
                    height={32}
                    barHeight={14}
                    barGap={4}
                    autoScroll
                    barRadius={100}
                    barWidth={3}
                    waveColor={"#0E2B31"}
                    progressColor="#96ADB3"
                    url={recordUrl}
                    onReady={onReady}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                </WaveContainer>
              </div>
            </FlexContainer>
          </EditorContainer>
        </PERow>
      </PromptContainer>
    </Col>
  );
}

export default PlayCall;
