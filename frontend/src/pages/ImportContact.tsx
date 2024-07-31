import React from "react";
import { Header } from "../component/agents/Header";
import TopBar from "../component/TopBar";
import styled from "styled-components";
import AgentRow from "../component/call/AgentRow";
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ImportContactContainer = styled.div`
  height: 100vh;
`;
const PageContainer = styled.div`
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  @media (max-width: 625px) {
    flex-direction: column;
  }
`;

function ImportContact({ isSidebarOpened }: { isSidebarOpened: boolean }) {
  const query = useQuery();
  const type = query.get('type');

  return (
    <ImportContactContainer>
      <Header hideSearch={true} />
      <PageContainer>
        {isSidebarOpened && <AgentRow />}
        <div className="flex-grow-1">
          <TopBar isSidebarOpened={isSidebarOpened} importContact={type} />
        </div>
      </PageContainer>
    </ImportContactContainer>
  );
}

export default ImportContact;
