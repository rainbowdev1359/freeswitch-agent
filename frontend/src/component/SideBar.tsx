import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useTranslation } from 'react-i18next';
import { filterSidebar } from "../utils/common";

const StyledLink = styled(Link) <{ theme: string }>`
  color: ${(props) => (props.theme === "light" ? "#185968" : "#d3dcdf")};
  border-radius: 20px;
  font-weight: bold;
`;

const StyledMenu = styled("img")`
  color: #d3dcdf;
  width: 40px;
  height: 40px;
  padding: 5px 0;
  cursor: pointer;
  @media (min-width: 992px) {
    display: none;
  }
`;

const Li = styled.li<{ $isSidebarOpened?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.$isSidebarOpened ? "" : "center")};
  padding-left: ${(props) => (props.$isSidebarOpened ? "20px" : "")};
  @media (max-width: 992px) {
    justify-content: start;
  }
`;

const BackImage = styled.img<{ $isVisible?: boolean }>`
  position:absolute;
  display:${(props) => (props.$isVisible ? "block" : "none")}
  top:20px;
  right:-50px;
  width:20px;
  &:hover{
    cursor:pointer;
  }
  @media (max-width: 992px){
    display:none !important;
  }
`;

export function SideBar({ activePage, isSidebarOpened, activeMobile, setActiveMobile, setIsSidebarOpen, setActivePage, }: {
  activePage: string; setActivePage: any; activeMobile: boolean; setActiveMobile: any; setIsSidebarOpen: any; isSidebarOpened: boolean;
}) {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [hovered, setHovered] = useState(activePage);
  const location = useLocation();

  const headers = [
    {
      name: <span>{t('Home')}</span>,
      icon: theme == "dark" || activePage == "/" || hovered == "/" ? "/homeIcon.svg" : "homeIcon-light.svg",
      to: "/",
    },
    {
      name: <span>{t('Agent')}</span>,
      icon: theme == "dark" || activePage == "/agent" || hovered == "/agent" ? "agentIcon.svg" : "agentIcon-light.svg",
      to: "/agent",
    },
    {
      name: <span>{t('Calls')}</span>,
      icon: theme == "dark" || activePage == "/call" || hovered == "/call" ? "/callIcon.svg" : "callIcon-light.svg",
      to: "/call",
    },
    {
      name: <span>{t('Contacts')}</span>,
      icon: theme == "dark" || activePage == "/contact" || hovered == "/contact" ? "/contactIcon.svg" : "contactIcon-light.svg",
      to: "/contact",
    },
    // {
    //   name: <span>{t('Campaign')}</span>,
    //   icon: theme == "dark" || activePage == "/campaign" || hovered == "/campaign" ? "/campaignIcon.svg" : "campaignIcon-light.svg",
    //   to: "/campaign",
    // },
    {
      name: <span>{t('RAG Model')}</span>,
      icon: theme == "dark" || activePage == "/modeltest" || hovered == "/modeltest" ? "/companyIcon.svg" : "companyIcon-light.svg",
      to: "/modeltest",
    },
    {
      name: <span>{t('Knowledge')}</span>,
      icon: theme == "dark" || activePage == "/knowledge" || hovered == "/knowledge" ? "/knowledgeIcon.svg" : "knowledgeIcon-light.svg",
      to: "/knowledge",
    },
    // {
    //   name: <span>{t('Report')}</span>,
    //   icon: theme == "dark" || activePage == "/report" || hovered == "/knowledge" ? "/report.svg" : "report-light.svg",
    //   to: "/report",
    // },
    // {
    //   name: <span>{t('Super admin')}</span>,
    //   icon: theme == "dark" || activePage == "/superadmin" || hovered == "/superadmin" ? "/superadmin.svg" : "superadmin-light.svg",
    //   to: "/superadmin",
    // },
    {
      name: <span>{t('Billing')}</span>,
      icon: theme == "dark" || activePage == "/billing" || hovered == "/billing" ? "/billing.svg" : "billing-light.svg",
      to: "/billing",
    },
    {
      name: <span>{t('Logout')}</span>,
      icon: theme == "dark" || activePage == "/logout" || hovered == "/logout" ? "/logout.svg" : "logout-light.svg",
      to: "/login",
    },
  ];
  const [menus, setMenus] = useState(headers);

  useEffect(() => { }, [window.innerWidth]);

  useEffect(() => {
    // const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
    // const _menus = filterSidebar(permissions, "billing", headers);
    // setMenus(_menus);
  }, [location]);

  return (
    <>
      <div className="mt-2 position-relative h-100">
        {isSidebarOpened && (
          <BackImage
            src="/back.svg"
            onClick={() => setIsSidebarOpen(false)}
            $isVisible={isSidebarOpened}
          />
        )}
        <ul className={`nav fixed   flex-column z-3`} id="parentM">
          <Li onClick={() => setActiveMobile(!activeMobile)}>
            <StyledMenu src="/menu.svg"/>
          </Li>
          {menus.map((header, index) => (
            <li className={`nav-item ${activeMobile ? "mobile_active" : ""}  my-1`} key={index}>
              <StyledLink
                theme={theme}
                to={header.to}
                onClick={() => {
                  setActivePage(header.to);
                }}
                className={`nav-link ${activeMobile ? "mobile_active" : ""}  ${activePage == header.to ? "active-link" : ""}`}
                onMouseEnter={() => setHovered(header.to)}
                id="link"
                aria-current="page"
              >
                <img src={header.icon} alt="" />
                {(isSidebarOpened || activeMobile) && (
                  <span className="ms-2  d-lg-inline-block ">{header.name}</span>
                )}
              </StyledLink>
            </li>
          ))}
        </ul>
        {/* {isSidebarOpened && <div className={`text-center`} style={{display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 660px)"}}>
          <img src={theme === "light" ? `/Epic Caller AI@300x.png` : `/Epic Caller AI (2).png`} style={{width: "160px", height: "134px"}}/>
        </div>} */}
      </div>
    </>
  );
}


