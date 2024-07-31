import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { DropdownButton } from "../DropDown";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../CustomTable/Table";
import { defaultData } from "../../data/superadmin";
import { checkTimeRange } from "../../data/date";
import { SuperAdminTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./superadmin.css";
import { ActionContainer } from "../CustomTable/TableComponent";
import CustomButton from "../import/CustomButton";
import { useNavigate } from "react-router-dom";
import ImageRender from "../ImageRender";
import TableImageRender from "../TableImageRender";
import { HMod, EditPackageButton, RecordingTableContainer, RecordingTableHeader, SearchInputMod, Relative, MPParagraph, DatePickerWrapper, DateContainer, SearchBtnContainer, DateParagraph, CustomTableContainer, } from "../StyleComponents";
import { useTranslation } from 'react-i18next';
import { getLocale } from '../../utils/locale';

const columnHelper = createColumnHelper<SuperAdminTableType>();

function SuperAdminTable() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 2);
  const [startDate, setStartDate] = useState<Date>(currentDate);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [camPaignList, setCamPaignList] = useState([]);
  const [superAdminList, setSuperAdminList] = useState<SuperAdminTableType[]>(defaultData);
  const [search, setSearch] = useState("");
  const [license, setLicense] = useState("None");
  const [server, setServer] = useState("None");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const columns = [
    columnHelper.accessor("companyName", {
      header: () => <span>{t('Company name')}</span>,
    }),
    columnHelper.accessor("adminName", {
      header: () => <span>{t('Admin name')}</span>,
    }),
    columnHelper.accessor("email", {
      header: () => <span>{t('Email address')}</span>,
    }),
    columnHelper.accessor("registeredTime", {
      header: () => <span>{t('Registered time')}</span>,
    }),
    columnHelper.display({
      id: "package",
      header: () => <span>{t('Package')}</span>,
      cell: (_props: any) => (
        <DropdownButton options={camPaignList} onSelect={handleOutcomeSelect} placeholder="Starter Tier" isFull={false} />
      )
    }),
    columnHelper.accessor("serversRunning", {
      header: () => <span>{t('Servers running')}</span>,
    }),
    columnHelper.accessor("lastLoginDate", {
      header: () => <span>{t('Last login date')}</span>,
    }),
    columnHelper.display({
      id: "ConcurrentConversation",
      header: () => <span>{t('Concurrent conversation')}</span>,
      cell: (props: any) => (
        <Row
          style={{
            display: "flex",
            margin: "0 2px",
            width: "100%",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <ActionContainer $theme={theme}>
            <TableImageRender light="/minus-light.svg" dark="/minus.svg" />
          </ActionContainer>
          {superAdminList[props.row.id].serversRunning}
          <ActionContainer $theme={theme}>
            <TableImageRender light="/add-light.svg" dark="/add.svg" />
          </ActionContainer>
        </Row>
      ),
    }),
    columnHelper.display({
      id: "agents",
      header: () => <span>{t('Agents')}</span>,
      cell: (props: any) => (
        <Row
          style={{
            display: "flex",
            margin: "0 2px",
            width: "100%",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <ActionContainer $theme={theme}>
            <TableImageRender light="/minus-light.svg" dark="/minus.svg" />
          </ActionContainer>
          {superAdminList[props.row.id].serversRunning}
          <ActionContainer $theme={theme}>
            <TableImageRender light="/add-light.svg" dark="/add.svg" />
          </ActionContainer>
        </Row>
      ),
    }),
    columnHelper.display({
      id: "servers",
      header: () => <span>{t('Servers')}</span>,
      cell: (props: any) => (
        <Row
          style={{
            display: "flex",
            margin: "0 2px",
            width: "100%",
            gap: "4px",
            alignItems: "center",
          }}
        >
          <ActionContainer $theme={theme}>
            <TableImageRender light="/minus-light.svg" dark="/minus.svg" />
          </ActionContainer>
          {superAdminList[props.row.id].serversRunning}
          <ActionContainer $theme={theme}>
            <TableImageRender light="/add-light.svg" dark="/add.svg" />
          </ActionContainer>
        </Row>
      ),
    }),
  ];

  useEffect(() => {
    // setSuperAdminList([]);
    setCamPaignList([]);

    const userGroup = JSON.parse(localStorage.getItem("group"));
    setIsSuperAdmin(userGroup.group_name == "Super Admin");
  }, []);

  const handleOutcomeSelect = async (val: string) => {
    setLicense(val);
  };

  const handleDurationSelect = async (val: string) => {
    setServer(val);
  };

  const searchHandler = async () => {
    const newArray = defaultData.filter((item) => {
      const targetDate = new Date(item.registeredTime);
      if (search !== "" && !item.companyName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && !item.adminName.toLocaleLowerCase().includes(search.toLocaleLowerCase())) return false;
      if (license !== "None" && item.licenseName !== license) return false;
      if (server !== "None" && checkTimeRange(item.email) !== server) return false;
      if (targetDate <= startDate || targetDate >= endDate) return false;
      return true;
    });
    setSuperAdminList(newArray);
  };

  return (
    <RecordingTableContainer className="">
      <div className="d-flex gap-2 flex-wrap flex-wrap justify-content-between py-4">
        <div className="d-flex flex-column">
          <HMod theme={theme}>{t("Super admin")}</HMod>
          <MPParagraph>{t("Here are the current admins running servers on sales agent")}</MPParagraph>
        </div>
        <div className="d-flex gap-2 justify-content-end mb-3">
          {isSuperAdmin &&<EditPackageButton $theme={theme} className="" onClick={() => navigate("/superadmin/edit-roles")}>{t("Edit Roles")}</EditPackageButton>}
          <EditPackageButton $theme={theme} className="" onClick={() => navigate("/superadmin/edit-package")}>{t("Edit packages")}</EditPackageButton>
        </div>
      </div>
      <RecordingTableHeader>
        <Relative>
          <SearchInputMod theme={theme} type="text" placeholder={t("Searching for?")} value={search} onChange={(e) => setSearch(e.target.value)} />
        </Relative>
        <DropdownButton options={camPaignList} onSelect={handleOutcomeSelect} placeholder={t("License")} isFull={false} />
        <DropdownButton options={camPaignList} onSelect={handleDurationSelect} placeholder={t("Server")} isFull={false} />
        <DateContainer>
          <div className="input-with-icon">
            <DatePickerWrapper
              $theme={theme}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              dropdownMode="select"
              calendarStartDay={1}
              locale={getLocale()}
            />
          </div>
          <DateParagraph $theme={theme} className="">{t("To")}</DateParagraph>
          <div className="input-with-icon">
            <DatePickerWrapper
              $theme={theme}
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              dropdownMode="select"
              calendarStartDay={1}
              locale={getLocale()}
            />
          </div>
        </DateContainer>
        <SearchBtnContainer>
          <CustomButton
            child={
              <div className="gap-2 align-items-center d-flex px-3">
                <p className="mb-0">{t("Search")}</p>{" "}
                <ImageRender fileName="/search.svg" />
              </div>
            }
            onclick={searchHandler}
          />
        </SearchBtnContainer>
      </RecordingTableHeader>
      <CustomTableContainer className="table_container">
        <CustomTable
          data={superAdminList}
          theme={theme}
          columns={columns}
        />
      </CustomTableContainer>
    </RecordingTableContainer>
  );
}

export default SuperAdminTable;
