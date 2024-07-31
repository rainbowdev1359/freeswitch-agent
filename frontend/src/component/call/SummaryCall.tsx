import { Header } from "../agents/Header";
import { Col } from "react-bootstrap";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import WavesurferPlayer from "@wavesurfer/react";
import { useState } from "react";
import {
  PERow,
  WaveContainer,
  EditorContainer,
  PromptContainer,
  Head,
  FlexContainer,
} from "../StyleComponents";


function SummaryCall() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null)
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
      <PromptContainer>
        <PERow className="align-items-start gap-3">
          <EditorContainer $theme={theme}>
            <Head>Raam, Adi</Head>
            <p>05/05/2024</p>
            <FlexContainer className="flex-grow-1">
              <div className="flex-grow-1">
                <div className="mb-3">
                  <div className="d-flex flex-column items-center justify-start">
                    <p style={{ fontWeight: 'bold' }}>Hi Raam Adi</p>
                    <p>Here’s your meeting summary for IAP | NNP on 10/26/2023. Thuis summary has been auto-generated.  AI-generated content may be innacurate or misleading. Always check for accuracy.</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex flex-column items-center justify-start">
                    <p style={{ fontWeight: 'bold' }}>Summary</p>
                    <p style={{ fontWeight: 'bold' }}>Offshore port challenges and solutions</p>
                    <p>Kris and Raam discussed the challenges and potentials regarding an offshore port. Kris proposed doing an economic study to determine the port's throughput and make it profitable. Raam informed Kris that they are already working on a new analysis of the port's profitability and that it will take another 2 to 3 weeks to get the information. Kris acknowledged the need for a demand study and its cost, which is approximately half a million dollars.</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex flex-column items-center justify-start">
                    <p style={{ fontWeight: 'bold' }}>Project Approval and Budget Discussion</p>
                    <p>Raam and Kris discussed the project's approval process and budget. Raam expressed his preference to wait until the approval of the product due to the risks involved. Kris acknowledged the need for a strong business case to justify the capital expenditure. They agreed to work on the project, with Kris offering assistance in conversations with investors. Raam asked Kris to send a scope of their work and discussed the need for a new shareholder agreement between the partners. The discussion ended with the expectation that Kris will provide the needed information next week.</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex flex-column items-center justify-start">
                    <p style={{ fontWeight: 'bold' }}>Port Access and Information in Panama</p>
                    <p>Kris stated that they have access to various ports in Panama and the groups that manage them. They also mentioned having connections with the consultants and advisors who have been managing the ports for over 25 years and can provide any needed information about the ports. Kris also noted that they have relationships with the seven main families that run Panama but emphasized that the consultants and advisors are the key contacts for information about the port's necessity and potential.</p>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="d-flex flex-column items-center justify-start">
                    <p style={{ fontWeight: 'bold' }}>Port Study in Panama: Potential, Profitability, and Market Analysis</p>
                    <p>Kris and Raam discussed the plan for a study related to the port in Panama and its interaction with the broader region. Kris emphasized the need for a demand study and a business case to make the project profitable. Raam agreed on the importance of these studies and mentioned the potential for a large, unexplored market. Kris committed to providing the scope of the study next week and they would continue the discussion from there. The possibility of Chinese investment in Panama was also acknowledged as a potential opportunity.</p>
                  </div>
                </div>
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
                    url="/piano3.mp3"
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

export default SummaryCall;
