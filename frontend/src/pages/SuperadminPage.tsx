import { Col } from "react-bootstrap";
import AgentRow from "../component/call/AgentRow";
import SuperAdminTable from "../component/superadmin/superAdminTable";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Toggle from "../component/Toggle";
import { H1Styled, DivStyled, PModified, PageContainer } from "../component/StyleComponents";

export function SuperadminPage({ isSidebarOpened }: { isSidebarOpened: boolean }) {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const user = localStorage.getItem('username')

  return (
    <Col>
      <DivStyled theme={theme} className="px-5  justify-content-between d-flex align-items-center py-1" >
        <div>
          <H1Styled theme={theme}>Welcome {user}</H1Styled>
          {/* <PModified theme={theme}>September 12, 2024</PModified> */}
        </div>
        <Toggle />
      </DivStyled>
      <PageContainer>
        {isSidebarOpened && <AgentRow />}
        <SuperAdminTable />
      </PageContainer>
    </Col>
  );
}
