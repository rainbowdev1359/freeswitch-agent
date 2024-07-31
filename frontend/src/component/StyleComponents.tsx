import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker from "react-datepicker";

export const DateButton = styled.div <{ color?: string, textcolor?: string }>`
    padding: 5px 16px;
    height: 40px;
    border:none;
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 4px;
    border-radius: 24px;
    color:${(props) => props.textcolor};
    background-color:${(props) => props.color}
`

export const ContinueButton = styled.div`
  background-color: rgba(16, 122, 71, 1);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
`;

export const GreenParagraph = styled.p`
  color: rgba(16, 122, 71, 1);
`;

export const EditIcon = styled.img`
  with: 10px;
`;

export const AgentContainer = styled.div<{ $isLeft?: boolean; $theme?: string }>`
  border-radius: 16px;
  padding: 12px;
  color: white;
  width: 100%;
  max-width: 400px;
  height: fit-content;
  background: ${(props) => props.$theme == "light"
    ? "linear-gradient(180deg, #E6EDEF 0%, #E3EAEC 77.4%)"
    : "linear-gradient(180deg, #092227 0%, #17434d 110.97%)"};
`;

export const Row = styled.div<{ $minute_container?: boolean; $theme?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) =>
    props.$minute_container && props.$theme == "light"
      ? "rgba(201, 213, 216, 1)"
      : !props.$minute_container ? "" : "#224D57"};
  border-radius: ${(props) => (props.$minute_container ? "20px" : "0px")};
  padding: ${(props) => (props.$minute_container ? "2px 6px" : "0px")};
`;

export const AParagraph = styled.div<{ $theme: string, $border?: boolean }>`
  background:${props => props.$border ? "#224D57" : "transparent"} ;
  padding: ${props => props.$border ? "3px 5px" : ""};
  border-radius:${props => props.$border ? "20px" : ""};
  color: ${(props) => (props.$theme == "light" ? "#0F2E35" : "#96adb3")};
  margin-bottom: 0;
`;

export const PERow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Menu = styled.div<{ $theme?: string }>`
  border-radius: 16px;
  padding: 24px;
  min-width: 394px;
  max-width: 480px;
  color: ${(props) => (props.$theme == "light" ? "#0F2E35" : "")};
  background-color: ${(props) => props.$theme == "light" ? "#C9D5D8" : "#0b2227"};
`;

export const EditorContainer = styled.div<{ $theme?: string }>`
  color: ${(props) => (props.$theme == "light" ? "#384B4F" : "white")};
`;

export const PromptContainer = styled.div`
  padding: 20px;
`;

export const Head = styled.div`
  color: #00b7df;
  font-size: 36px;
  font-weight: 600;
  line-height: 46px;
  letter-spacing: 0em;
  text-align: left;
`;

export const CallOnQueParagraph = styled.p<{ theme: string }>`
  font-size: 20px;
  color: ${(props) => props.theme == "light" ? "#0F2E35" : "rgba(201, 213, 216, 1)"};
  font-weight: 600;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
`;

export const TabButtonRow = styled.div<{ $theme?: string }>`
  display: flex;
  padding: 4px 12px;
  border-radius: 16px;
  color: ${(props) => (props.$theme == "light" ? "#0F2E35" : "#E5ECEE")};
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "#0F2E35"};
`;

export const TextAreaMod = styled.textarea<{ theme: string, border?: boolean }>`
  float: right;
  padding: 6px 6px;
  margin-top: 12px;
  border: ${(props) => props.border ? "1px solid #00B7DF" : "none"};
  font-size: 17px;
  background-color: ${(props) => props.theme === "light" ? "#E5ECEE" : "#051316"};
  outline: none;
  border-radius: 12px;
  color: ${(props) => props.theme === "light" ? "black" : "#96adb3"};
  width: 100%;
`;

export const AITextShow = styled.textarea<{ $theme?: string, border?: boolean }>`
  display: flex;
  margin-top: 12px;
  min-height: 300px;
  border: ${(props) => props.border ? "1px solid #00B7DF" : "none"};
  padding: 4px 12px;
  border-radius: 12px;
  color: ${(props) => props.$theme === "light" ? "black" : "#96adb3"};
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "#051316"};
`;

export const GridContainer = styled.div<{ $selected?: boolean; $isSidebarOpened?: boolean; }>`
  display: flex;
  flex-direction:row;
  flex-wrap:wrap;
  width: 100%;
`;

export const AgentProfileContainer = styled.div`
  width: 100%;
  padding: 10px;
`;

export const AgentProfileSubContainer = styled.div<{ $selcted?: boolean; $isSidebarOpened?: boolean; }>`
  display: flex;
  width: 100%;
  @media (max-width: 1534px) {
    display: ${(props) => props.$selcted ? "none !important" : "block !important"};
    max-width: 100%;
    flex-grow: 1;
  }
  height: calc(100vh - 96px);
  overflow: auto;
`;

export const AgentProfileLeft = styled.div<{ $theme?: string }>`
  max-width: 600px;
  margin: 20px 10px 0px px;
  padding: 10px;
  border-radius: 10px;
  @media (max-width: 1534px) {
    width: 100%;
    max-width: 100%;
    flex-grow: 1;
  }
  width: 35%;
  min-width: 470px;
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "#0b2227"};
  height: calc(100vh - 129px);
`;

export const Scroll = styled.div`
  height: 100%;
  overflow: auto;
`;

export const OnGoingCall = styled.div<{ $theme?: string }>`
  background-color: ${(props) => props.$theme == "light" ? "#C9D5D8" : "#051316"};
  padding: 16px, 12px;
  border-radius: 16px;
  padding: 10px;
  gap: 64px;
  margin-bottom: 20px;
`;

export const OnGoingCallRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  gap: 10px;
  border-radius: 20px;
  padding: 10px;
  background: linear-gradient(93.55deg, #096348 13.97%, #25955f 89.16%);
`;

export const OnGoingCallRow1 = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 20px;
  padding: 10px;
  background: rgba(11, 34, 39, 1);
  border: 1px solid rgba(14, 43, 49, 1);
`;

export const GreenContainer = styled.div`
  border-radius: 16px;
  background-color: rgba(38, 246, 96, 0.15);
  padding: 4px 8px;
  display: flex;
  max-width: fit-content;
  color: rgba(16, 122, 71, 1);
  height: fit-content;
`;

export const OnGoingCallRowParagraph = styled.div`
  color: white;
`;

export const CallStep = styled.div<{ $isFirst?: boolean; $background?: string; $isLast?: boolean; }>`
  height: 39px;
  flex-grow: 1;
  padding: 6px, 12px;
  text-align: end;
  color: black;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: end;
  background-color: ${(props) => props.$background ? props.$background : "white"};
  border-top-left-radius: ${(props) => (props.$isFirst ? "20px" : "")};
  border-bottom-left-radius: ${(props) => (props.$isFirst ? "20px" : "")};
  border-top-right-radius: ${(props) => (props.$isLast ? "20px" : "")};
  border-bottom-right-radius: ${(props) => (props.$isLast ? "20px" : "")};
  gap: 8px;
`;

export const CallContainer = styled.div`
  position: relative;
  width: 25%;
  margin-top: 30px;
`;

export const CallProfile = styled.img<{ $isHidden?: boolean }>`
  position: absolute;
  top: -20px;
  right: 0px;
  width: 32px;
  height: 32px;
  border-radius: 20px;
  display: ${(props) => (!props.$isHidden ? "none" : "block")};
`;

export const SeAllButton = styled.button<{ $theme?: string }>`
  background-color: ${(props) => props.$theme == "light" ? "#C9D5D8" : "rgba(15, 46, 53, 1)"};
  border-radius: 24px;
  padding: 4px 10px;
  border: none;
  color: ${(props) => props.$theme == "light" ? "#0F2E35" : "rgba(201, 213, 216, 1)"};
  height: 37px;
`;

export const ImgMod = styled.img`
  width: 23px;
  position: absolute;
  right: 8px;
  top: 18px;
`;

export const InputMod = styled.input<{ theme: string }>`
  float: right;
  padding: 8px 6px;
  border: none;
  margin: 8px 0;
  font-size: 17px;
  background-color: ${(props) => (props.theme === "light" ? "#C9D5D8" : "#0f2e35")};
  outline: none;
  border-radius: 8px;
  color: ${(props) => props.theme === "light" ? "black" : "#96adb3"};
  @media (max-width: 600px) {
    width: 100%;
  }
  border-radius: 8px;
`;

export const CallQueContainer = styled.div<{ $theme?: string }>`
  background: ${props => props.$theme == "light" ? "linear-gradient(180deg, #C9D5D8 0%, #96ADB3  77.4%)" : "linear-gradient(180deg, #0B2227 0%, #09181B 77.4%)"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid rgba(15, 46, 53, 1);
  border-radius: 10px;
`;

export const DeleteContainer = styled.div<{ $theme?: string }>`
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "rgba(10, 35, 40, 1)"};
  border: 1px solid rgba(15, 46, 53, 1);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const MoveButton = styled.div<{ $theme?: string }>`
  display: flex;
  align-items: center;
  padding: 3px 8px;
  color: ${(props) => props.$theme == "light" ? "rgba(10, 35, 40, 1)" : "white"};
  &:hover {
    cursor: pointer;
  }
  border-radius: 20px;
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "rgba(10, 35, 40, 1)"};
`;

export const HMod = styled.h5<{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "#051316" : "#c9d5d8")};
  font-weight: bold;
`;

export const PMode = styled.p`
  color: #394b4f;
`;

export const ModalContainer = styled.div <{ width?: string }>`
  width:${prop => prop.width ? prop.width : "700px"};
`

export const ControllerContainer = styled.div<{ $selected?: boolean }>`
  display: ${(props) => (props.$selected ? "none" : "block")};
  @media (min-width: 1500px) {
    flex-direction: row !important;
  }
`;

export const DropMod = styled(Dropdown.Toggle) <{ $theme?: string }>`
  background-color: ${(props) => props.$theme == "light" ? "#FEFEFE" : "#0f2e35"};
  border: none;
  border-radius: 20px;
  color: ${(props) => (props.$theme === "light" ? "#0F2E35" : "#96adb3")};
  height: 40px;
  font-size: 14px;
  &:hover {
    background-color: ${(props) => props.$theme === "light" ? "#FEFEFE" : "#00b7df"};
    color: black;
  }
  &:active {
    background-color: ${(props) => props.$theme === "light" ? "#FEFEFE" : "#00b7df"};
    color: black;
  }
`;

export const DropMenu = styled(Dropdown.Menu) <{ $theme?: string }>`
  background-color: ${(props) => props.$theme == "light" ? "##FEFEFE" : "#0f2e35"};
`;
export const DropItem = styled(Dropdown.Item) <{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "black" : "#96adb3")};
`;


export const H1Styled = styled.h4<{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "#051316" : "#96adb3")};
  font-weight: bold;
`;
export const DivStyled = styled.div<{ theme: string }>`
  border-bottom: ${(props) => props.theme === "light" ? "1px solid #9ABCC4" : "1px solid #0f2e35"};
  width: 100%;
  padding: 0px 0px 0px 50px;
  @media (max-width: 993px) {
    padding-top: 40px !important;
    padding: 0 30px;
  }
`;

export const PModified = styled.p<{ theme: string }>`
  color: ${(props) => (props.theme == "light" ? "#0F2E35" : "#384b4f")};
  font-weight: bold;
`;

export const WaveContainer = styled.div`
  display:flex;
  transform: rotate(90deg);
  width:30px;
`

export const FlexContainer = styled.div`
  width:100% !important;
  justify-content:space-between;
  align-items:start;
  display:flex;
`

export const Paragraph = styled.div<{ theme: string }>`
  background: ${(props) => (props.theme === "light" ? "-webkit-linear-gradient(#17434D, #4B7681)" : "-webkit-linear-gradient(#96ADB3, #17434D)")};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 20px;
  font-weight: bold;
  font-size: 98px;
  line-height: 125px;
`;

export const CreateButton = styled.button<{ $theme?: string }>`
  border-radius: 20px;
  background-color: ${(props) => props.$theme === "light" ? "#224D57" : "#0f2e35"};
  min-width: fit-content;
  font-size: 14px;
  height: fit-content;
  padding: 8px 16px;
  color: ${(props) => (props.$theme == "light" ? "#DCDCDC" : "#96adb3")};
  border: none;
  &:hover {
    background-color: #00B7DF;
    color: black;
  }
`;

export const ParentButton = styled.div<{ $theme?: string }>`
  background-color: ${(props) => props.$theme === "light" ? "#C9D5D8" : "#0b2227"};
  height: fit-content;
  width: fit-content;
  max-width: fit-content;
  flex-wrap: wrap;
  border-radius: 20px;
  @media (max-width: 600px) {
    width: 100%;
  }
  padding: 0.5rem;
`;

export const RecordingTableContainer = styled.div`
  flex-grow: 1;
  padding: 24px 16px;
  overflow: hidden;
`;

export const SectionParent = styled.div<{ theme: string }>`
  background: ${(props) => props.theme === "light" ? "linear-gradient(#E6EDEF, #EDEFE6)" : "linear-gradient(180deg, #0b2227 0%, #09181b 77.4%)"};
  border-radius: 20px;
  min-width: 400px;
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#96adb3")};
  border: ${(props) => props.theme === "light" ? "1px solid #9ABCC4" : "1px solid #0f2e35"};
`;

export const Title = styled.div<{ theme: string }>`
  font-size: 16px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#c9d5d8")};
  padding-bottom: 8px;
  text-align: left;
`;

export const ModalTitle = styled.div<{ theme: string }>`
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#c9d5d8")};
  padding-bottom: 8px;
  text-align: left;
`;

export const InputRow = styled.div<{ $theme?: string }>`
  display: flex;
  padding: 6px 12px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.$theme == "light" ? "#FEFEFE" : "#051316"};
`;

export const Input = styled.input<{ $theme?: string }>`
  flex-grow: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.$theme == "light" ? "black" : "white"};
`;

export const SearchBtnContainer = styled.div`
  justify-content: flex-end;
  height: fit-content !important;
  display: flex;
  gap: 8px;
`;

export const LinkP = styled.button<{ $theme?: string }>`
  border: ${(props) => props.$theme == "light" ? "1px solid #0F2E35" : "0px solid transparent"};
  color: ${(props) => props.$theme == "light" ? "#0F2E35" : "rgba(201, 213, 216, 1)"};
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "#0F2E35"};
  height: fit-content;
  padding: 5px 16px;
  border-radius: 18px;
  &:hover {
    cursor: pointer;
  }
`;

export const UnderLineSpan = styled.span`
  text-decoration: none;
  font-weight: semi-bold;
`;

export const EditPackageButton = styled.button<{ $theme?: string }>`
  border-radius: 20px;
  border: ${(props) => props.$theme == "light" ? "1px solid #0F2E35" : "0px solid transparent"};
  color: ${(props) => props.$theme == "light" ? "#0F2E35" : "rgba(201, 213, 216, 1)"};
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "#0F2E35"};
  min-width: fit-content;
  font-size: 14px;
  height: fit-content;
  padding: 8px 16px;
  &:hover {
    background-color: #00B7DF;
    color: black;
  }
`;

export const BackPageButton = styled.button<{ $theme?: string }>`
  background-color: transparent;
  min-width: fit-content;
  font-size: 14px;
  height: fit-content;
  padding: 8px 16px;
  color: ${(props) => (props.$theme == "light" ? "#0f2e35" : "#96adb3")};
  border: none;
`;

export const UploadImageButton = styled.label<{ $theme?: string }>`
  border-radius: 20px;
  border: ${(props) => props.$theme == "light" ? "1px solid #0F2E35" : "0px solid transparent"};
  color: ${(props) => props.$theme == "light" ? "#0F2E35" : "rgba(201, 213, 216, 1)"};
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE" : "#0F2E35"};
  min-width: fit-content;
  font-size: 14px;
  height: fit-content;
  padding: 8px 16px;
  &:hover {
    background-color: #00B7DF;
    color: black;
  }
`;

export const BHParagraph = styled.div<{ $theme?: string }>`
  color: ${(props) => (props.$theme == "light" ? "#0F2E35" : "#C9D5D8")};
`;

export const CustomTableContainer = styled.div`
  height: calc(100vh - 340px) !important;
  overflow: auto;
`;

export const PackageTableContainer = styled.div`
  height: 100% !important;
  overflow: auto;
`;

export const CompanyTableContainer = styled.div<{ theme: string }>`
  flex-grow: 1;
  background-color: ${(props) => props.theme === "light" ? "#C9D5D8" : "#0A2328"};
  padding: 24px 16px;
  border-radius: 8px;
  overflow: hidden;
  flex-wrap: wrap;
`;

export const MPParagraph = styled.div`
  color: #394b4f;
  padding-bottom: 20px;
`;

export const PMParagraph = styled.div<{ $theme?: string }>`
  margin-bottom: 0px;
  font-weight: 600;
  font-size: 20px;
  color:  ${(props) => (props.$theme == "light" ? "#0F2E35" : "#96ADB3")};
`;

export const MPTitle = styled.div<{ theme: string }>`
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  color: ${(props) => (props.theme === "light" ? "" : "#c9d5d8")};
  padding-bottom: 8px;
  text-align: left;
`;

export const RecordingTableHeader = styled(Row)`
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;
`;

export const Relative = styled.div`
  position: relative;
  width: fit-content;
`;

export const DatePickerWrapper = styled(DatePicker) <{ $theme?: string }>`
  background-color: ${(props) => props.$theme == "light" ? "#C9D5D8" : "#0A2328"} !important;
  color: ${(props) => props.$theme == "light" ? "#0A2328" : "#C9D5D8"} !important;
`;

export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 5px 13px;
  width: fit-content;
  flex-wrap: wrap;
`;

export const SearchInputMod = styled.input<{ theme: string }>`
  float: right;
  padding: 6px 6px;
  border: none;
  font-size: 17px;
  background-color: ${(props) => props.theme === "light" ? "#C9D5D8" : "#0a2328"};
  outline: none;
  border-radius: 8px;
  color: ${(props) => props.theme === "light" ? "black" : "#96adb3"};
  @media (max-width: 600px) {
    width: 100%;
  }
  border-radius: 8px;
`;

export const DateParagraph = styled.p<{ $theme?: string }>`
  margin: 0px;
  color: ${(props) => props.$theme == "light" ? "#384B4F !important" : "#C9D5D8 !important"};
`;

export const BackButton = styled.button<{ $theme?: string }>`
  height: 40px;
  padding: 8px, 12px;
  border-radius: 24px;
  background-color: ${(props) => props.$theme == "light" ? "#E5ECEE !important" : "#0f2e35"};
  color: #96adb3;
  gap: 4px;
`;


export const CampaignTableContainer = styled.div`
  flex-grow: 1;
  padding: 24px 26px;
  overflow: hidden;
`;

export const CampaignTableHeader = styled(Row)`
  flex-wrap: wrap;Date & Time
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;
`;

export const AuthenticationContainer = styled.div<{ $theme?: string | null }>`
  overflow: auto;
  gap: 21px;
  height: 100vh;
  @media (max-width: 440px) {
    width: 100%;
    padding: 40px 30px;
  }
  width: 100%;
  background: ${(props) => props.$theme == "light" ? 'url("/auth-background-large.svg")' : 'url("/auth-background-large-dark.svg")'};
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AuthenticationBox = styled.div<{ $theme?: string | null }>`
  overflow: auto;
  gap: 21px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CheckCont = styled.div<{ $theme: string | null }>`
  background-color: ${(props) => props.$theme == "light" ? "#0F2E35" : "##051316"};
`;

export const InputContainer = styled.div<{ $theme?: string | null }>`
  border-radius: 9px !important;
  border: 1px solid #0f2e35;
  color:${(props) => (props.$theme == "light" ? "#0F2E35" : "white")}
  display: flex;
  max-width: 600px;
  width: 100%;
  @media (max-width: 440px) {
    width: 100%;
  }
  padding: 12px;
  background-color: transparent;
  display: flex;
  height: 44px;
  gap: 10px;
`;

export const AutherInput = styled.input<{ $theme?: string }>`
  background-color: transparent;
  border: none;
  color: ${(props) => (props.$theme == "light" ? "#0A2328" : "#ffffff")};
  outline: none;
  flex-grow: 1;
  padding: 2px;
`;

export const AutherTitle = styled.div<{ theme?: string }>`
  display: flex;
  flex-direction: column;
`;

export const PageTitle = styled.div<{ $theme?: string | null }>`
  color: ${(props) => (props.$theme == "light" ? "#0F2E35" : "#FFFFFF")};
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
`;

export const PageDescription = styled.div<{ $theme?: string | null }>`
  color: ${(props) => (props.$theme == "light" ? "#0F2E35" : "#FFFFFF")};
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  max-width: 500px;
`;

export const GoogleButton = styled.button`
  border-radius: 8px;
  width: 422px;
  @media (max-width: 440px) {
    width: 100%;
  }
  border: none;
  height: 44px;
  background: #051316;
  padding: 10px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  text-align: center;
`;

export const Continue = styled.button<{ $theme?: string | null }>`
  width: 422px;
  @media (max-width: 440px) {
    width: 100%;
  }
  border: none;
  color: ${(props) => (props.$theme == "light" ? "white" : "#0F2E35")};
  background-color: ${(props) => props.$theme == "light" ? "#09BED7" : "white"};
  height: 44px;
  padding: 12px 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  text-align: center;
  border-radius: 6px;
`;

export const FooterContainer = styled.div<{ $theme?: string | null }>`
  display: flex;
  width: 442px;
  align-items: center;
  color: ${(props) => (props.$theme == "light" ? "#0F2E35" : "white")};
  gap: 5px;
  justify-content: center;
`;

export const AutherParagraph = styled.p`
  color: inherit !important;
`;

export const Link = styled.a`
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  text-align: right;
  color: #09bed7;
`;

export const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  padding: 9px;
  &:hover {
    cursor: pointer;
  }
`;

export const CheckBoxContainer = styled.div<{ $theme?: string }>`
  width: 422px;
  @media (max-width: 440px) {
    width: 100%;
  }
  display: flex;
  align-items: start;
  padding: 8px 8px;
  border-radius: 8px;
  color: ${(props) => props.$theme == "light" ? "#051316" : "#96adb3"};
  font-size: 14px;
  font-weight: 400;
  gap: 6px;
  height: fit-content;
  line-height: 18px;
  background-color: ${(props) => props.$theme == "light" ? "#C9D5D8" : "#051316"};
`;

export const Flex = styled.div<{ $theme?: string }>`
  @media (max-width: 440px) {
    width: 100%;
  }
  width: 422px;
  display: flex;
  color: ${(props) => (props.$theme == "light" ? "#384B4F" : "white")};
`;

export const LoginLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

export const AgentParagraph = styled.div<{ theme: string }>`
  margin-bottom: 0;
  font-size: 16px;
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#96adb3")};
`;

export const ParagraphBold = styled(AgentParagraph) <{ theme: string }>`
  font-weight: bold;
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#c9d5d8")};
`;

export const AgentEditIcon = styled.img`
  width: 20px;
`;

export const AgentCallSettingCol = styled.div<{ theme: string }>`
  background: ${(props) =>
    props.theme === "light"
      ? "linear-gradient(#E6EDEF, #EDEFE6)"
      : "linear-gradient(to bottom, #0f2e35, #17454f)"};
  border-radius: 16px;
`;

export const AgentRow = styled.div<{ $minute_container?: boolean; theme: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) =>
    props.$minute_container
      ? props.theme == "light" ? "#C9D5D8" : "#224D57"
      : props.theme == "light" ? "#C9D5D8" : "#224D57"};
  border-radius: ${(props) => (props.$minute_container ? "20px" : "0px")};
  padding: ${(props) => (props.$minute_container ? "0px 12px" : "0px")};
`;

export const AgentRowContainer = styled.div<{ theme: string }>`
  padding: 16px 20px;
  background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "#040f12"};
  height: calc(100vh - 100px);
  overflow-y: auto;
  min-width: 360px;
  width: fit-content;
  @media (max-width: 992px) {
    width: 100%;
    min-width: fit-content;
  }
`;

export const AgentCallSettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const CompanyTableHeader = styled(Row)`
  flex-wrap: wrap;
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: row;
  padding-bottom: 10px;
`;


export const ContactRecordTitle = styled.div<{ selected?: boolean; $theme?: string }>`
  cursor: pointer;
  flex: 1;
  background: ${(props) => (props.selected ? "#224D57" : "transparent")};
  border-radius: 5px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  letter-spacing: 0em;
  color: ${(props) => (props.$theme == "light" ? (props.selected ? "white" : "#0F2E35") : "#c9d5d8")};
  padding: 8px;
  text-align: left;
`;

export const ContactRecordLinkP = styled.div<{ $theme?: string }>`
  color: #c9d5d8;
  background-color: #224D57;
  padding: 5px 16px;
  border-radius: 18px;
  display: flex;
  gap: 4px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 445px) {
    margin-bottom: 20px;
    flex-grow: 1;
    align-text: center;
  }
`;

export const ContactRecordModalContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  gap: 3px;
`;

export const OverAllContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const ActionDiv = styled.div`
  width: 180px;
`;

export const Tab = styled.div<{ $theme?: string }>`
  background-color: ${(props) =>
    props.$theme == "light" ? "#C9D5D8" : "#0A2328"};
  padding: 4px;
  display: flex;
  gap: 1px;
  border-radius: 4px;
`;

export const ButtonPopupContainer = styled.dialog<{ theme?: string, $id: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: absolute;
  padding: 12px;
  border:none;
  width: 204px;
  left: -160px;
  border-radius: 20px;
  color: #96adb3;
  z-index: 100;
  top: ${props => (parseInt(props.$id) % 10) <= 4 ? "25px" : ""};
  bottom: ${props => (parseInt(props.$id) % 10) >= 5 ? "25px" : ""};
  background-color: ${props => props.theme == "light" ? "#C9D5D8" : "#0b2227"};
  color: ${props => props.theme == "light" ? "black" : ""};
`;

export const KnowledgeDivStyled = styled.div<{ theme: string }>`
  border-bottom: ${(props) => props.theme === "light" ? "1px solid #9ABCC4" : "1px solid #0f2e35"};
  display: flex;
  @media (max-width: 600px) {
    margin-top: 40px;
  }
`;

export const FileCol = styled.div<{ theme: string }>`
  background: ${(props) => props.theme === "light" ? "linear-gradient(#E6EDEF, #EDEFE6)" : " #0b2227"};
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "white")};
  height: fit-content;
  border-radius: 10px;
  border: ${(props) => props.theme == "light" ? "1px solid #96ADB3" : "1px solid #0f2e35"};
`;

export const CircledD = styled.p`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #e4f150;
`;

export const CircledS = styled.p`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f0b723;
`;

export const CircledA = styled.p`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #f71b17;
`;

export const CircledV = styled.p`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: #0fbc0c;
`;

export const StyledH4 = styled.h4<{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#c9d5d8")};
`;

export const ComponentDiv = styled.div<{ theme: string }>`
  border-bottom: ${(props) =>
    props.theme == "light" ? "1px solid #96ADB3" : "1px solid #0f2e35"};
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#96adb3")};
`;

export const ParentProgressBar = styled.div`
  border: 2px solid #09D799;
  border-radius: 20px;
  padding: 5px;
  width: 100%;
  min-width: 200px;
  max-width: 600px;
`;

export const ChildProgressBar = styled.div<{ percent: number }>`
  background-color: #09D799;
  border-radius: 20px;
  color: black;
  width: ${(props) => (props.percent ?? "10")}%;
  padding-inline: 5px;
`;

export const SalesCol = styled.div<{ theme: string }>`
  background: ${(props) => props.theme === "light" ? "linear-gradient(#E6EDEF, #EDEFE6)" : " #0b2227"};
  border-radius: 10px;
  border: ${(props) => props.theme == "light" ? "1px solid #96ADB3" : "1px solid #0f2e35"};
`;

export const KnowledgeLinkP = styled.p<{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#c9d5d8")};
  &:hover {
    cursor: pointer;
  }
`;

export const ComponentRender = styled.button<{ theme: string }>`
  border: 2px solid #96adb3;
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#96adb3")};
  background-color: ${(props) => props.theme === "light" ? "#FEFEFE" : "transparent"};
  border-radius: 25px;
  &:hover {
    background-color: ${(props) => props.theme === "light" ? "#0F2E35" : "#4a666c"};
    color: ${(props) => (props.theme === "dark" ? "#0F2E35" : "#96adb3")};

    border-color: #96adb3;
  }
  &:active {
    background-color: #4a666c;
    border-color: #96adb3;
  }
`;

export const KnowledgeUnderLineSpan = styled.span`
  text-decoration: underline;
`;

export const KnowledgeContainer = styled.div`
  height: 100vh;
`;

export const PageContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  @media (max-width: 625px) {
    flex-direction: column;
  }
`;
export const AgentPageContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;

export const HomeContainer = styled.div`
  height: 100vh;
  width: 100%;
`;

export const KnowledgePreviewDiv = styled.div<{ theme: string }>`
  padding: 10px;
  background-color: ${(props) => props.theme === "light" ? "#C9D5D8" : "#0f2e35"};
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
  }
  color: ${(props) => (props.theme === "dark" ? "#C9D5D8" : "#0f2e35")};
`;

export const KnowledgePreviewButton = styled.button<{ $theme?: string }>`
  background-color: ${(props) => props.$theme == "light" ? "#C9D5D8" : "#051316"};
  color: ${(props) => props.$theme == "light" ? "#051316" : "#96adb3"};
  border: none;
  padding: 6px 12px;
  border-radius: 16px;
`;

export const CalendarDateParagraph = styled.p`
    font-size: 20px;
    font-weight: 700;
    line-height: 25.5px;
    text-align: center;
    color: #96adb3;
    background-color: #0F2E35;
    margin-bottom: 0px;
    padding: 8px;
    border-radius: 12px;
`;

export const CalendarDayParagraph = styled.p<{ isSelected?: boolean }>`
    width40px;
    display:flex;
    align-items:center;
    justify-content:center;
    aspect-ratio:1;
    background-color:${props => props.isSelected ? "#0F2E35" : "0"};
    border-radius:${props => props.isSelected ? "50%" : "0"};
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: #96adb3;
`;
export const CalendarDateButton = styled.div <{ color?: string, textcolor?: string }>`
    width: 196px;
    height: 40px;
    border:none;
    display:flex;
    align-items:center;
    justify-content:center;
    gap: 4px;
    border-radius: 24px;
    color:${(props) => props.textcolor};
    background-color:${(props) => props.color}
`
export const CalendarTh = styled.th`
    background-color:transparent;
`