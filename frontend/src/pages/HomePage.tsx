import { HeaderHome, SectionHome } from "../component/Home";
import AgentRow from "../component/call/AgentRow";
import { SectionReport } from "../component/reports/SectionReport";
import { HomeContainer, PageContainer } from "../component/StyleComponents";

export const HomePage = ({ isSidebarOpened }: { isSidebarOpened: boolean }) => {
  return (
    <HomeContainer>
      <HeaderHome />
      <PageContainer>
        {isSidebarOpened && <AgentRow />}
        <div className="d-flex flex-column">
          <SectionReport />
          <SectionHome />
        </div>
      </PageContainer>

    </HomeContainer>
  );
};
