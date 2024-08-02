import React from "react";
import { Col } from "react-bootstrap";
import { ContactRecordTable } from "../component/contact/ContactRecordTable";
import AgentRow from "../component/call/AgentRow";
import Toggle from "../component/Toggle";
import { H1Styled, DivStyled, PModified, PageContainer } from "../component/StyleComponents";

export function ContactPage({ isSidebarOpened, }: { isSidebarOpened: boolean; }) {
  const user = localStorage.getItem('username')

  return (
    <Col>
      <DivStyled className="px-5  justify-content-between d-flex align-items-center py-1">
        <div>
          <H1Styled>Welcome {user}</H1Styled>
          {/* <PModified>September 12, 2024</PModified> */}
        </div>
        <Toggle />
      </DivStyled>
      <PageContainer>
        {/* {isSidebarOpened && <AgentRow />} */}
        <ContactRecordTable />
      </PageContainer>
    </Col>
  );
}
