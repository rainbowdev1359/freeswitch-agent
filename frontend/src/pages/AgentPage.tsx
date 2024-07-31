import { Col } from "react-bootstrap";
import { Header } from "../component/agents/Header";
import { AgentProfiles } from "../component/agents/AgentProfiles";
import AgentRow from "../component/call/AgentRow";
import { AgentPageContainer, PageContainer } from "../component/StyleComponents";

// agent page
export function AgentPage({ isSidebarOpened }: { isSidebarOpened: boolean }) {
  return (
    <AgentPageContainer>
      <Col className="px-0 ">
        <Header />
        <PageContainer>
          {isSidebarOpened && <AgentRow />}
          <AgentProfiles isSidebarOpened={isSidebarOpened} />
        </PageContainer>
      </Col>
    </AgentPageContainer>
  );
}
