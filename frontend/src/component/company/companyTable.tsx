import React, { useEffect, useState } from "react";
import CustomTable from "../CustomTable/Table";
import { Col, Row } from "react-bootstrap";
import { DropdownButton } from "../DropDown";
import { OutcomeDropdownButton } from "../OutcomeDropDown";
import { DurationDropdownButton } from "../DurationDropdownButton";
import { createColumnHelper } from "@tanstack/react-table";
import { countryLists } from "../../data/country";
import MaterialDesignSwitch from "../switch";
import { CompanyTableData } from "../../data/company";
import CompanyModal from "../modals/CompanyModal";
import { CompanyTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import 'react-datepicker/dist/react-datepicker.css';
import './company.css'
import DeleteModal from "../modals/DeleteModal";
import DuplicateModal from "../modals/DuplicateModal";
import ActionPopup from "../popup/ActionPopup";
import { ActionContainer, ActionImage } from "../CustomTable/TableComponent";
import PhoneModal from "../modals/PhoneModal";
import 'react-phone-number-input/style.css';
import CustomButton from "../import/CustomButton";
import TableImageRender from "../TableImageRender";
import { exportToCsv } from '../../utils/exportCsv';
import { exportToPdf } from '../../utils/exportToPdf';
import { useTranslation } from 'react-i18next';
import { getLocale } from '../../utils/locale';
import {
  RecordingTableContainer,
  CompanyTableHeader,
  SearchInputMod,
  Relative,
  SearchBtnContainer,
  Title,
  DateContainer,
  DateParagraph,
  DatePickerWrapper,
  CustomTableContainer,
  LinkP,
  UnderLineSpan,
  InputRow,
  Input,
} from "../StyleComponents";

const columnHelper = createColumnHelper<CompanyTableType>();

function CompanyTable() {
  const { t } = useTranslation();
  const [showCreateCompany, setShowCreateCompany] = useState(false);
  const [actionModalshow, setActionModalshow] = useState("");
  const theme = useSelector((state: RootState) => state.theme.theme);

  const columns = [
    columnHelper.display({
      id: "switch",
      header: () => <span>{t("Off/On")}</span>,
      cell: () => <MaterialDesignSwitch />,
    }),
    columnHelper.accessor("companyName", {
      cell: (info) => info.getValue(),
      header: () => <span>{t("Company Name")}</span>,
    }),
    columnHelper.accessor((row) => row.emailAddress, {
      id: "emailAddress",
      cell: (info) => <span>{info.getValue()}</span>,
      header: () => <span>{t("Email Address")}</span>,
    }),
    columnHelper.accessor("phoneNumber", {
      header: () => <span>{t("Phone Number")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("registeredTime", {
      header: () => <span>{t("Registered Time")}</span>,
      cell: (info) => info.renderValue(),
    }),

    columnHelper.accessor("dials", {
      header: () => <span>{t("Dials")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("pickups", {
      header: () => <span>{t("Pickups")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("failed", {
      header: () => <span>{t("Failed")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("busy", {
      header: () => <span>{t("Busy")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("amountspent", {
      header: () => <span>{t("Amount spent")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("outcome", {
      header: () => <span>{t("Outcomes")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("costOutcome", {
      header: () => <span>{t("Cost / outcome")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span>{t("Actions")}</span>,
      cell: (props) => (
        <Row className="gap-1 justify-content-center px-2">
          <ActionContainer $theme={theme}>
            <ActionImage onClick={() => showEditModal(props.row.id.toString())} >
              <TableImageRender light="/edit2-light.svg" dark="/edit-2.svg" />
            </ActionImage>
          </ActionContainer>
          <ActionContainer $theme={theme}>
            <ActionImage onClick={() => { setDeleteModalshow(true) }} >
              <TableImageRender light="/delete-light.svg" dark="/delete.svg" />
            </ActionImage>
          </ActionContainer>
          <ActionContainer $theme={theme}>
            <ActionImage onClick={() => { setActionModalshow(props.row.id); }} >
              <TableImageRender light="/table-menu-light.svg" dark="/table-menu.svg" />
            </ActionImage>
            {actionModalshow == props.row.id && (
              <ActionPopup
                excelExport={() => exportHandler(props.row.index, "csv")}
                pdfExport={() => exportHandler(props.row.index, "pdf")}
                statisExport={() => exportHandler(props.row.index, "")}
                setActionModalShow={setActionModalshow}
                rowId={props.row.id}
              />
            )}
          </ActionContainer>
        </Row>
      ),
    }),
  ];

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [camPaignList, setCamPaignList] = useState([])
  const [campaign, setCampaign] = useState('')
  const [outcome, setOutcome] = useState('')
  const [duration, setDuration] = useState('')
  const [deleteModalshow, setDeleteModalshow] = useState(false)
  const [phoneModalshow, setPhoneModalshow] = useState(false)
  const [duplicateModalshow, setDuplicateModalshow] = useState(false)
  const [companyList, setCompanyList] = useState<CompanyTableType[]>(CompanyTableData);
  const [showEditCompanyModal, setEditShowCompanyModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  useEffect(() => {
    console.log(outcome)
    console.log(duration)
    console.log(campaign)
    setCompanyList(CompanyTableData)
    setCamPaignList([])
  }, [])

  const showEditModal = async (sRow: string) => {
    console.log("selectedRow====>", selectedRow)
    setSelectedRow(sRow);
    setEditShowCompanyModal(true);
    setShowCreateCompany(true)
    // const data = await GetSpecificContact(selectedRow);
    // setContactnumber(data.data.Number);
    // setCampaign(data.data.Campaign);
  };

  const handleCampaignSelect = async (val: string) => {
    setCampaign(val);
  }

  const handleOutcomeSelect = async (val: string) => {
    setOutcome(val);
  }

  const handleDurationSelect = async (val: string) => {
    setDuration(val);
  }

  const exportHandler = async (selected: number, type: string) => {
    const headers = [
      t("Company Name"),
      t("Email Address"),
      t("Phone Number"),
      t("Registered Time"),
      t("Dials"),
      t("Pickups"),
      t("Failed"),
      t("Busy"),
      t("Amount spent"),
      t("Outcomes"),
      t("Cost / outcome"),
    ];

    const exportArray = companyList.filter((_item, index) => index === selected);
    const rows = exportArray.map((row: any) => [
      row.companyName,
      row.emailAddress,
      row.phoneNumber,
      row.registeredTime,
      row.dials,
      row.pickups,
      row.failed,
      row.busy,
      row.amountspent,
      row.outcome,
      row.costOutcome,
    ]);
    if (type === "pdf") {
      await exportToPdf(rows, headers, `${exportArray[0].companyName}_campaign_data`);
    } else if (type === "csv") {
      exportToCsv(`${exportArray[0].companyName}_company_data.csv`, [headers, ...rows]);
    }
  }

  return (
    <>
      <RecordingTableContainer className="flex-grow-1">
        <div className="d-flex mb-3 flex-lg-row flex-column items-center justify-content-between">
          <Col>
            <Title theme={theme}>{t("Company")}</Title>
          </Col>
          <LinkP
            onClick={() => setShowCreateCompany(true)}
            className="text-lg-end text-center px-3 py-2 mb-lg-0 mb-2"
          >
            + <UnderLineSpan>{t("Add a new company")}</UnderLineSpan>
          </LinkP>
        </div>

        <CompanyTableHeader>
          <Relative>
            <SearchInputMod theme={theme} type="text" placeholder={t("Searching for?")} />
          </Relative>
          <DropdownButton
            options={camPaignList}
            onSelect={handleCampaignSelect}
            placeholder={t("Company")}
            isFull={false}
          />
          <OutcomeDropdownButton
            onSelect={handleOutcomeSelect}
          />
          <DurationDropdownButton
            onSelect={handleDurationSelect}
          />
          <DateContainer>
            <div className="input-with-icon" >
              <DatePickerWrapper
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dropdownMode="select"
                calendarStartDay={1}
                $theme={theme}
                locale={getLocale()}
              />
            </div>
            <DateParagraph $theme={theme} >{t("To")}</DateParagraph>
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

          <SearchBtnContainer >
            <CustomButton child={
              <div className="gap-2 align-items-center d-flex px-3">
                <p className="mb-0">{t("Search")}</p>
                <img style={{ width: "20px", height: "20px" }} src="/search.svg" alt="" />
              </div>}
            />
          </SearchBtnContainer>
        </CompanyTableHeader>
        <CustomTableContainer className="table_container">
          <CustomTable
            data={companyList}
            columns={columns}
            maxWidth={1430}
            theme={theme}
          />
        </CustomTableContainer>
      </RecordingTableContainer>
      {showCreateCompany && (
        <CompanyModal
          onHide={() => setShowCreateCompany(false)}
          onContinue={() => { setShowCreateCompany(false); setPhoneModalshow(true) }}
          show={showCreateCompany}
          title={showEditCompanyModal ? t("Edit company details") : t("Create a new Company")}
          btntext={t("Save")}
          children={
            <div className="d-flex flex-row gap-1 justify-content-between" >
              <div style={{ width: '470px' }}>
                <div className="d-flex gap-1 flex-column">
                  <p className="mb-0">{t("Company Name")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company Name...")}
                      $theme={theme}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Contact Name 1")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company email address...")}
                      $theme={theme}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Contact Name 2")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company phone number...")}
                      $theme={theme}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Email address 1")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company email address...")}
                      $theme={theme}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Email address 2")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company email address...")}
                      $theme={theme}
                    />
                  </InputRow>
                </div>
              </div>
              <div style={{ width: '470px' }}>
                <div className="d-flex gap-0 flex-column">
                  <div className="d-flex gap-0 flex-row justify-content-between">
                    <p className="mb-0">{t("Phone Number 1")}</p>
                    <div className="d-flex gap-0 flex-row align-items-center">
                      <p className="mb-0" style={{ marginRight: '10px' }}>{t("Get a paid phone number")}</p>
                      <MaterialDesignSwitch />
                    </div>
                  </div>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company phone number...")}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <div className="d-flex gap-0 flex-row justify-content-between">
                    <p className="mb-0">{t("Phone Number 2")}</p>
                    <div className="d-flex gap-0 flex-row align-items-center">
                      <p className="mb-0" style={{ marginRight: '10px' }}>{t("Get a paid phone number")}</p>
                      <MaterialDesignSwitch />
                    </div>
                  </div>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company phone number...")}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Company DBA")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company phone number...")}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Company Address Line 1")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company phone number...")}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Company Address Line 2")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Company phone number...")}
                    />
                  </InputRow>
                </div>
              </div>
              <div style={{ width: '470px' }}>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("City")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Input city name...")}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("State")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Input state name...")}
                    />
                  </InputRow>
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Country")}</p>
                  <DropdownButton color={["white", "#051316"]} options={countryLists.map(item => item.title)} onSelect={handleOutcomeSelect} placeholder={t("Country")} isFull={true} />
                </div>
                <div className="d-flex gap-0 flex-column">
                  <p className="mb-0">{t("Amount spent")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="number"
                      className=""
                      placeholder={t("Amount spent...")}
                    />
                  </InputRow>
                </div>
              </div>
            </div>
          }
        />
      )}
      <PhoneModal
        onHide={() => setPhoneModalshow(false)}
        onCancel={() => setPhoneModalshow(false)}
        onContinue={() => setPhoneModalshow(false)}
        show={phoneModalshow}
        title={t("Create a new Company (buy a number)")}
        children={
          <div className="d-flex flex-column gap-1">
            <div className="d-flex gap-0 flex-column">
              <p style={{ fontSize: "30px" }} className="mb-0 text-lg text-red-500">{t("Buy a number from any country of your choice")}</p>
            </div>
            {/* <div className="d-flex gap-0 flex-column">
              <p style={{ fontSize: "20px" }} className="mb-0">{t("Buy a number from any country of your choice")}</p>
            </div> */}
            <div className="d-flex gap-0 flex-row justify-content-between align-items-center mt-4">
              <div className="d-flex gap-0 flex-column">
                <div className="d-flex gap-2 flex-wrap">
                  <div className="d-flex gap-1 flex-column" style={{ width: "48%" }}>
                    <p className="mb-2">{t("Country")}</p>
                    <DropdownButton color={["white", "#051316"]} options={countryLists.map(item => item.title)} onSelect={handleOutcomeSelect} placeholder={t("Country")} isFull={true} />
                  </div>
                  <div className="d-flex gap-1 flex-column" style={{ width: "48%" }}>
                    <p className="mb-2">{t("City")}</p>
                    <InputRow $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        placeholder={t("City")}
                      />
                    </InputRow>
                  </div>
                </div>
                <div className="d-flex gap-1 flex-column">
                  <p className="mb-2">{t("Zip code")}</p>
                  <InputRow $theme={theme}>
                    <Input
                      id="paste"
                      type="text"
                      className=""
                      placeholder={t("Input zip code...")}
                    />
                  </InputRow>
                </div>
              </div>
              <div>
                <img style={{ width: '200px', height: '200px' }} src="./earth.png" />
              </div>
            </div>
          </div>
        }
      />

      <DuplicateModal
        onHide={() => setDuplicateModalshow(false)}
        onCancel={() => setDuplicateModalshow(false)}
        show={duplicateModalshow}
        title={t("Please rename the duplicate to avoid clash")}
        btntext={t("Save")}
        children={
          <div className="d-flex flex-column gap-1">
            <div className="d-flex gap-0 flex-column">
              <p className="mb-0 text-center" style={{ color: "#384b4f" }}>
                {t("To avoid clash please edit the company you would like to duplicate.")}
              </p>
            </div>
            <div className="d-flex gap-1 flex-column">
              <p className="mb-2">{t("Company")}</p>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t("Rename company...")}
                />
              </InputRow>
            </div>
          </div>
        }
      />

      <DeleteModal
        onHide={() => setDeleteModalshow(false)}
        onCancel={() => setDeleteModalshow(false)}
        show={deleteModalshow}
        title={t("Are you sure you want to delete this company?")}
        btntext={t("Save")}
      />
    </>
  );
}

export default CompanyTable;