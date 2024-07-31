import { Col } from "react-bootstrap";
import AgentRow from "../component/call/AgentRow";
import TicketTable from "../component/ticket/TicketTable";
import TicketHeader from "../component/ticket/TicketHeader";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Toggle from "../component/Toggle";
import { H1Styled, DivStyled, PModified, PageContainer } from "../component/StyleComponents";
import PageBackButton from "../component/PageBackButton";

export function TicketPage({ isSidebarOpened }: { isSidebarOpened: boolean }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = localStorage.getItem('username')

  return (
    <Col>
      <DivStyled theme={theme} className="px-5  justify-content-between d-flex align-items-center py-1" >
        <div>
          <H1Styled theme={theme}>Welcome {user}</H1Styled>
          <PModified theme={theme}>September 12, 2024</PModified>
        </div>
        <Toggle />
      </DivStyled>
      <PageContainer>
        {isSidebarOpened && <AgentRow />}
        <div className="d-flex flex-column w-full">
          <PageBackButton />
          <TicketHeader />
          <TicketTable />
        </div>
      </PageContainer>
    </Col>
  );
}
