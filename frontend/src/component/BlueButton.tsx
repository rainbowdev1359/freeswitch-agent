import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../store";
import { useTranslation } from 'react-i18next';

const ImgMod = styled.img`
  width: 23px;
  position: absolute;
  right: 20px;
  top: 17px;
`;
const Column = styled.div`
  width: 100%;
`;

const InputMod = styled.input<{ $theme?: string }>`
  float: right;
  padding: 6px 6px;
  border: none;
  margin-top: 8px;
  width: 100%;

  font-size: 17px;
  background-color: ${(props) =>
    props.$theme == "light" ? "#E5ECEE" : "#185968"};
  outline: none;
  border-radius: 8px;
  color: #d3dcdf;
  @media (max-width: 600px) {
    width: 100%;
  }
  border-radius: 8px;
  color: #d3dcdf;
`;

function BlueButton(props: any) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <Column className="position-relative ">
      <InputMod
      $theme={theme}
      type="text"
      placeholder={props.placeholder ? t(props.placeholder) : t("Search")}
      onChange={(e) => props.onTextChange?props.onTextChange(e):null}
    />
      
      <ImgMod src={props.image?props.image:"/searchIcons.png"} />
    </Column>
  );
}

export default BlueButton;
