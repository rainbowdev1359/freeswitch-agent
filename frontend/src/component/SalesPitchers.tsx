import { useSelector } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";
import { RootState } from "../store";
import { ActionContainer, ActionImage } from "./CustomTable/TableComponent";
import DeleteModal from "./modals/DeleteModal";
import services from "../api";
import ImageRender from "./ImageRender";
import TableImageRender from "./TableImageRender";
import { useTranslation } from 'react-i18next';
// import {
//   ParentProgressBar,
//   ChildProgressBar
// } from "../component/StyleComponents";

const TableParent = styled.table`
  color: #c9d5d8;
`;

const TheadMade = styled.tr<{ theme: string }>`
  border-radius: 20px;
  color: #c9d5d8;
  background-color: ${(props) => props.theme === "light" ? "#C9D5D8" : "#0f2e35"};
  padding: 20px;
`;

const TRrMade = styled.tr<{ theme: string }>`
  background-color: ${(props) => (props.theme === "light" ? "" : "#0b2227")};
  color: ${(props) => (props.theme === "light" ? "#0F2E35" : "inherit")};
  border-bottom: 1px solid #0f2e35;
`;
const Th = styled.th<{ theme: string }>`
  padding: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
  }
  background-color: transparent;
  color: ${(props) => (props.theme === "dark" ? "#C9D5D8" : "#0f2e35")};
`;
const Td = styled.td`
  padding-top: 5px;
  padding-bottom: 5px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 5px;
  }
`;

export function SalesPitchers({ filelist, GetAllKnowledge }: { filelist: any; GetAllKnowledge: () => void; }) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [showmodal, setShowmodal] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const handleDelete = async () => {
    await services.knowledge.deleteKnowledge(selectedItem);
    await GetAllKnowledge();
    setShowmodal(false)
  };

  return (
    <TableParent>
      <TheadMade theme={theme}>
        <Th theme={theme}>{t("File name")}</Th>
        <Th theme={theme}></Th>
      </TheadMade>
      <tbody>
        {filelist.map((item: any) => (
          <TRrMade theme={theme} className="pt-5">
            <Td className="pt-4 pb-2"><ActionContainer className="w-full justify-content-start border-0 bg-transparent" $theme={theme}>{item.file_name}</ActionContainer></Td>
            <Td className="pt-4 pb-2 d-flex flex-wrap justify-content-center gap-3">
              <ActionContainer $theme={theme}>
                <ActionImage>
                  <ImageRender fileName='/download.svg' />
                </ActionImage>
              </ActionContainer>
              <ActionContainer onClick={() => { setSelectedItem(item.id); setShowmodal(true) }} $theme={theme}>
                <ActionImage>
                  <TableImageRender light="/delete-light.svg" dark="/delete.svg" />
                </ActionImage>
              </ActionContainer>
            </Td>
          </TRrMade>
        ))}

        <DeleteModal
          onHide={() => setShowmodal(false)}
          onCancel={() => setShowmodal(false)}
          onContinue={() => handleDelete()}
          show={showmodal}
          title={t("Are you sure you want to delete this file?")}
          btntext={t("Save")}
        />
      </tbody>
    </TableParent >
  );
}
