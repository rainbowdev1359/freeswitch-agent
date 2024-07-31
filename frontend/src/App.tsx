import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { KnowledgePage } from "./pages/KnowledgePage";

import { SideBar } from "./component/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation, I18nextProvider } from "react-i18next";
import styled from "styled-components";
import { AgentPage } from "./pages/AgentPage";
import { CallPage } from "./pages/CallPage";
import { ContactPage } from "./pages/ContactPage";
import CampaignPage from "./pages/CampaignPage";
import PromptEditor from "./component/agents/PromptEditor";
import PlayCall from "./component/agents/PlayCall";
import SummaryCall from "./component/call/SummaryCall";
import { useEffect, useState } from "react";
import CompanyPage from "./pages/CompanyPage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import { SuperadminPage } from "./pages/SuperadminPage";
import { EditMinutePricesPage } from "./pages/EditMinutePricesPage";
import { TicketPage } from "./pages/TicketPage";
import { LicenseMinutePricesPage } from "./pages/LicenseMinutePricesPage";
import { EditPackagePage } from "./pages/EditPackagePage";
import { EditRolesPage } from "./pages/EditRolesPage";
import { BillingPage } from "./pages/BillingPage";
import { ChangePlanPage } from "./pages/ChangePlanPage";
import { ProtectedRoute } from './routes/protected-routes'
import ImportContact from "./pages/ImportContact";

const SideBarDiv = styled.div<{ theme: string }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#FEFEFE" : "#0b2227"};
`;
const ParentCol = styled(Col) <{ theme: string }>`
  background-color: ${(props) =>
    props.theme === "light" ? "#FEFEFE" : "#051316"};
  padding-inline: 0px;
  border-left: ${(props) =>
    props.theme === "light" ? "2px solid #96ADB3" : "2px solid #0f2e35"};
  overflow-x: hidden;
`;
const AppContainer = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;
function App() {
  const { i18n } = useTranslation();
  const pageHeaderNotShow = [
    "/login",
    "/signup",
    "/reset_password",
    "/new_password",
  ];

  const findActiveLink = () => {
    return window.location.pathname;
  };
  const [activePage, setActivePage] = useState("/");
  useEffect(() => {
    setActivePage(findActiveLink());
  }, [window.location]);
  const [isSidebarOpened, setIsSidebarOpen] = useState(false);
  const [activeMobile, setActiveMobile] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <I18nextProvider i18n={i18n}>
      <AppContainer>
        <Router>
          <Container fluid>
            {!pageHeaderNotShow.includes(activePage) && (
              <div className="d-lg-none p-0 m-0 d-block">
                <SideBar
                  activeMobile={activeMobile}
                  setIsSidebarOpen={setIsSidebarOpen}
                  setActiveMobile={setActiveMobile}
                  isSidebarOpened={isSidebarOpened}
                  activePage={activePage}
                  setActivePage={setActivePage}
                />
              </div>
            )}

            <Row>
              {!pageHeaderNotShow.includes(activePage) && (
                <SideBarDiv
                  theme={theme}
                  onMouseEnter={() => setIsSidebarOpen(true)}
                  // sm={2}
                  className="col-auto d-none d-lg-flex  flex-column justify-content-between min-vh-100 gap "
                >
                  <SideBar
                    activeMobile={activeMobile}
                    setIsSidebarOpen={setIsSidebarOpen}
                    setActiveMobile={setActiveMobile}
                    isSidebarOpened={isSidebarOpened}
                    activePage={activePage}
                    setActivePage={setActivePage}
                  />
                </SideBarDiv>
              )}

              <ParentCol theme={theme}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <HomePage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/ticket"
                    element={
                      <ProtectedRoute>
                        <TicketPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/agent"
                    element={
                      <ProtectedRoute>
                        <AgentPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/agent/prompt_editor" element={<PromptEditor />} />
                  <Route path="/playcall" element={<PlayCall />} />
                  <Route path="/summarycall" element={<SummaryCall />} />
                  <Route
                    path="/call"
                    element={
                      <ProtectedRoute>
                        <CallPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <ProtectedRoute>
                        <ContactPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/contact/import-data"
                    element={
                      <ProtectedRoute>
                        <ImportContact isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/billing/change-your-plan"
                    element={
                      <ProtectedRoute>
                        <ChangePlanPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/campaign"
                    element={
                      <ProtectedRoute>
                        <CampaignPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/company"
                    element={
                      <ProtectedRoute>
                        <CompanyPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/knowledge"
                    element={
                      <ProtectedRoute>
                        <KnowledgePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/superadmin"
                    element={
                      <ProtectedRoute>
                        <SuperadminPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/superadmin/edit-minute-prices"
                    element={
                      <ProtectedRoute>
                        <EditMinutePricesPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/superadmin/license-minute-prices"
                    element={
                      <ProtectedRoute>
                        <LicenseMinutePricesPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/superadmin/edit-roles"
                    element={
                      <ProtectedRoute>
                        <EditRolesPage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/superadmin/edit-package"
                    element={
                      <ProtectedRoute>
                        <EditPackagePage isSidebarOpened={isSidebarOpened} />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/billing"
                    element={
                      <ProtectedRoute>
                        <BillingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/reset_password" element={<ForgotPassword />} />
                  <Route path="/new_password" element={<NewPassword />} />
                </Routes>
              </ParentCol>
            </Row>
          </Container>
        </Router>
      </AppContainer>
    </I18nextProvider>
  );
}

export default App;
