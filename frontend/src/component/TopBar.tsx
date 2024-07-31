import React, { useState } from "react";
import styled from "styled-components";
import ImportStep2 from "./import/ImportStep2";

import { contactEditType } from "../types/types";
import Search from "./BlueButton";
import CenteredModal from "./modals/Modal";
import ImportStep4 from "./import/ImportStep4";
import ImportStep3 from "./import/ImportStep3";

function TopBar({ isSidebarOpened, importContact }: { isSidebarOpened: boolean, importContact: any }) {
  const ModalContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    gap: 3px;
    flex-wrap: wrap;
  `;
  const CustomRow = styled.div`
    display: flex;
    align-items: start;
    gap: 10px;
    padding-top: 20px;
  `;
  const CheckBox = styled.input`
    width: 40px;
  `;
  const [activeTopBar, setActiveTopBar] = useState(1);
  const [showImportLead, setShowImportLead] = useState(false);
  const [importDatas, setImportDatas] = useState<contactEditType[]>([])

  return (
    <>
      {activeTopBar == 1 && <ImportStep2 setActiveTopBar={setActiveTopBar} uploadData={setImportDatas} />}
      {activeTopBar == 2 && <ImportStep3 isSidebarOpened={isSidebarOpened} setActiveTopBar={setActiveTopBar} importContact={importContact} importDatas={importDatas} setImportDatas={setImportDatas} />}
      {activeTopBar == 3 && <ImportStep4 importDatas={importDatas} />}

      <CenteredModal
        show={showImportLead}
        btntext="Done"
        onHide={() => setShowImportLead(false)}
        onContinue={() => {
          setShowImportLead(false);
          setTimeout(() => { }, 2000);
        }}
        children={
          <ModalContainer>
            <Search />
            <CustomRow>
              <CheckBox type="checkbox" />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                aliquam quam nesciunt quisquam iusto vel, dolorum quaerat error
                facere itaque fugiat quae, ex voluptates nisi ipsa, omnis eius
                veniam ab.
              </p>
            </CustomRow>
          </ModalContainer>
        }
        title="Select a list to import leads into"
      />

    </>
  );
}

export default TopBar;
