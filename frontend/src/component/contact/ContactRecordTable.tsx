/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DropdownButton } from "../DropDown";
import CenteredModal from "../modals/Modal";
import Postcall from "../modals/Postcall";
import Search from "../BlueButton";
import CustomTable from "../CustomTable/Table";
import { ContactTableType, ListTableType } from "../../types/types";
import { createColumnHelper } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ActionContainer, ActionImage } from "../CustomTable/TableComponent";
import "../CustomTable/table.css";
import CreateContactModal from "../modals/CreateContactModal";
import services from "../../api";
import "react-datepicker/dist/react-datepicker.css";
import DeleteModal from "../modals/DeleteModal";
import "./contact.css";
import CustomInput from "../CustomInput";
import TableImageRender from "../TableImageRender";
import { OutcomeDropdownButton } from "../OutcomeDropDown";
import { DurationDropdownButton } from "../DurationDropdownButton";
import CustomButton from "../import/CustomButton";
import ImageRender from "../ImageRender";
import { useTranslation } from 'react-i18next';
import { getLocale } from '../../utils/locale';
import { exportContactHeaders } from '../../utils/lib';
import { exportToCsv } from '../../utils/exportCsv';
import {
  RecordingTableContainer,
  ContactRecordTitle,
  CustomTableContainer,
  ContactRecordLinkP,
  UnderLineSpan,
  ContactRecordModalContainer,
  InputRow,
  Input,
  OverAllContainer,
  ActionDiv,
  Tab,
  RecordingTableHeader,
  SearchInputMod,
  Relative,
  SearchBtnContainer,
  DatePickerWrapper,
  DateContainer,
  DateParagraph,
} from "../StyleComponents";

export function ContactRecordTable() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showImportLead, setShowImportLead] = useState(false);
  const [showImportList, setShowImportList] = useState(false);
  const [showCreateContact, setShowCreateContact] = useState(false);
  const [showCreateList, setShowCreateList] = useState(false);
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [showEditContactModal, setEditShowContactModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const [fullname, setFullname] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [campaign, setCampaign] = useState("");
  const [deleteModalshow, setDeleteModalshow] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");
  const [listname, setListname] = useState('');
  const [comapnyaffiliated, setComapnyaffiliated] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [camPaignList, setCamPaignList] = useState([]);
  const [outcome, setOutcome] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    console.log(outcome);
    console.log(duration);
    setCamPaignList([]);
  }, []);

  const handleuploadContact = async () => {
    await CreateNewContact({
      contact: fullname,
      Number: contactnumber,
      Campaign: campaign,
      Call_Date_Start: "2023-04-01T14:00:00Z",
      Call_Date_End: "2023-04-01T14:05:00Z",
      Duration: 300,
      Outcome: "Successful",
    });
    await GetAllcontacts();
    setShowCreateContact(false);
  };

  const GetAllcontacts = async () => {
    const response = await services.contacts.getAllContacts();
    setTableData(response.data.results);
  };

  const GetSpecificContact = async (id: string) => {
    const response = await services.contacts.getSpecificContact(id);
    return response;
  };

  const CreateNewContact = async (body: any) => {
    await services.contacts.createNewContact(body);
  };

  const UpdateContact = async (id: string, body: any) => {
    await services.contacts.updateContact(id, body);
  };

  const DeleteContact = async (id: string) => {
    await services.contacts.deleteContact(id);
  };
  const [tableData, setTableData] = useState<ContactTableType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await GetAllcontacts();
    };
    fetchData();
  }, []);

  const contactColumnHelper = createColumnHelper<ContactTableType>();
  const listColumnHelper = createColumnHelper<ListTableType>();

  const handleDeleteContact = async () => {
    await DeleteContact(selectedRow);
    await GetAllcontacts();
    setDeleteModalshow(false);
  };

  const handleupdateContact = async () => {
    await UpdateContact(selectedRow, {
      contact: fullname,
      Number: contactnumber,
      Campaign: campaign,
      Call_Date_Start: "2023-04-01T14:00:00Z",
      Call_Date_End: "2023-04-01T14:05:00Z",
      Duration: 300,
      Outcome: "Successful",
    });
    setEditShowContactModal(false);
    await GetAllcontacts();
  };

  const showEditModal = async (selectedRow: string) => {
    setSelectedRow(selectedRow);
    setEditShowContactModal(true);
    const data = await GetSpecificContact(selectedRow);
    setContactnumber(data.data.Number);
    setCampaign(data.data.Campaign);
  };

  const handleCampaignSelect = async (val: string) => {
    setCampaign(val);
  };

  const handleOutcomeSelect = async (val: string) => {
    setOutcome(val);
  };

  const handleDurationSelect = async (val: string) => {
    setDuration(val);
  };

  const contactColumn = [
    contactColumnHelper.accessor((row) => row.id, {
      id: "number",
      header: () => <span>{t('Customer ID')}</span>,
      cell: (info) => info.getValue() || 'N/A',
    }),
    contactColumnHelper.accessor("firstName", {
      header: () => <span>{t('First name')}</span>,
      cell: (info) => info.getValue() || 'N/A',
    }),
    contactColumnHelper.accessor("lastName", {
      header: () => <span>{t('Last name')}</span>,
      cell: (info) => info.getValue() || 'N/A',
    }),
    contactColumnHelper.accessor("phoneNumber", {
      header: () => <span>{t('Phone number')}</span>,
      cell: (info) => info.getValue() || 'N/A',
    }),
    contactColumnHelper.accessor("email", {
      header: () => <span>{t('E-mail')}</span>,
      cell: (info) => info.getValue() || 'N/A',
    }),
    contactColumnHelper.accessor("country", {
      header: () => <span>{t('Country')}</span>,
      cell: (info) => info.getValue() || 'N/A',
    }),
    // contactColumnHelper.accessor("companyName", {
    //   header: () => <span>{t('Company name')}</span>,
    //   cell: (info) => info.getValue() || 'N/A',
    // }),
    // contactColumnHelper.accessor("campaign", {
    //   header: () => <span>{t('Campaign')}</span>,
    //   cell: (info) => info.getValue() || 'N/A',
    // }),
    contactColumnHelper.accessor("list", {
      header: () => <span>{t('List')}</span>,
      cell: (info) => info.getValue() || 'N/A',
    }),
    contactColumnHelper.accessor("addedDate", {
      header: () => <span>{t('Date added')}</span>,
      cell: (info) => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : 'N/A',
    }),
    contactColumnHelper.display({
      id: "actions",
      header: () => <span>{t('Actions')}</span>,
      cell: ({ row }) => (
        <ActionDiv>
          <Row className="gap-1 d-flex px-2 justify-content-center">
            <ActionContainer $theme={theme}>
              <ActionImage
                onClick={() => {
                  if (typeof row.original?.id !== "undefined") {
                    showEditModal(row.original.id.toString());
                  } else {
                    console.error("ID is undefined");
                  }
                }}
              >
                <TableImageRender light="/edit2-light.svg" dark="/edit-2.svg" />
              </ActionImage>
            </ActionContainer>
            <ActionContainer $theme={theme}>
              <ActionImage
                onClick={() => {
                  if (typeof row.original?.id !== "undefined") {
                    setSelectedRow(row.original.id.toString());
                    setDeleteModalshow(true);
                  } else {
                    console.error("ID is undefined");
                  }
                }}
              >
                <TableImageRender light="/delete-light.svg" dark="/delete.svg" />
              </ActionImage>
            </ActionContainer>
          </Row>
        </ActionDiv>
      ),
    }),
  ];

  const listColumn = [
    listColumnHelper.accessor("listName", {
      header: () => <span>{t('Lists name')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    listColumnHelper.accessor("company", {
      header: () => <span>{t('Company')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    listColumnHelper.accessor("assignedAgent", {
      header: () => <span>{t('Agent assigned')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    listColumnHelper.accessor("followUp", {
      header: () => <span>{t('Follow up')}</span>,
      cell: (info) => <span> {info.getValue()}</span>,
    }),
    listColumnHelper.accessor("notInterested", {
      header: () => <span>{t('Not interested')}</span>,
      cell: (info) => <span> {info.getValue()}</span>,
    }),
    listColumnHelper.accessor("closed", {
      header: () => <span>{t('Closed')}</span>,
      cell: (info) => <span> {info.getValue()}</span>,
    }),
    listColumnHelper.accessor("notAnswered", {
      header: () => <span>{t('Not answered')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    listColumnHelper.accessor("invalidNumbers", {
      header: () => <span>{t('Invalid numbers')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    listColumnHelper.accessor("dateCreated", {
      header: () => <span>{t('Date created')}</span>,
      cell: (info) => <span> {info.getValue()}</span>,
    }),
    listColumnHelper.display({
      id: "actions",
      header: () => <span>{t('Actions')}</span>,
      cell: ({ row }) => (
        <ActionDiv>
          <Row className="gap-1 justify-content-center px-3 d-flex  ">
            <ActionContainer className="" $theme={theme}>
              <ActionImage
                onClick={() => {
                  if (typeof row.original?.id !== "undefined") {
                    showEditModal(row.original.id.toString());
                  } else {
                    console.error("ID is undefined");
                  }
                }}
              >
                <TableImageRender light="/edit2-light.svg" dark="/edit-2.svg" />
              </ActionImage>
            </ActionContainer>
            <ActionContainer $theme={theme}>
              <ActionImage
                onClick={() => {
                  if (typeof row.original?.id !== "undefined") {
                    setSelectedRow(row.original.id.toString());
                    setDeleteModalshow(true);
                  } else {
                    console.error("ID is undefined");
                  }
                }}
              >
                <TableImageRender light="/delete-light.svg" dark="/delete.svg" />
              </ActionImage>
            </ActionContainer>
          </Row>
        </ActionDiv>
      ),
    }),
  ];

  const EditOrCreateMOdal = (props: {
    show: boolean;
    setShow: (arg0: boolean) => any;
    modalTitle?: string;
  }) => {
    return (
      <CenteredModal
        onHide={() => props.setShow(false)}
        onContinue={() => handleupdateContact()}
        onBack={() => props.setShow(false)}
        onBackTitle={t("Cancel")}
        show={props.show}
        title={props.modalTitle ? props.modalTitle : t('Edit list')}
        btntext={t("Save")}
        children={
          <div className="d-flex flex-column gap-3">
            <div className="d-flex  gap-0 flex-column">
              <p className="mb-0">{t('Full Name')}</p>
              <InputRow className="" $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Input agent name...')}
                  value={fullname}
                  onChange={(event) => setFullname(event.target.value)}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <p className="mb-0">{t('Company affiliated')}</p>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t('Epic Caller AI')}
                  value={contactnumber}
                  onChange={(event) => setContactnumber(event.target.value)}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <p className="mb-0">{t('Agent assigned')}</p>
              <InputRow className="p-0" $theme={theme}>
                <DropdownButton
                  color={["#E5ECEE", "#185968"]}
                  options={[""]}
                  onSelect={handleCampaignSelect}
                  placeholder={t('Campaign')}
                  isFull={false}
                />
              </InputRow>
            </div>
          </div>
        }
      />
    );
  };

  const downloadExample = () => {
    exportToCsv(`contacts_example_data.csv`, [exportContactHeaders, []]);
  }

  return (
    <OverAllContainer className="">
      <RecordingTableContainer className="">
        <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
          <div>
            <Tab $theme={theme}>
              <ContactRecordTitle $theme={theme} selected={activeTab == 0} onClick={() => setActiveTab(0)}>{t("Contacts")}</ContactRecordTitle>
              <ContactRecordTitle $theme={theme} selected={activeTab == 1} onClick={() => setActiveTab(1)}>{t("List")}</ContactRecordTitle>
            </Tab>
          </div>
          <div className="d-flex gap-2 mb-4">
            <ContactRecordLinkP
              $theme={theme}
              className=" text-center "
              onClick={() => { activeTab == 0 ? setShowCreateContact(true) : setShowCreateList(true); }}
            >
              +{" "}
              <UnderLineSpan>
                {activeTab == 0 ? t("Add a new contact") : t("Add a new List")}
              </UnderLineSpan>
            </ContactRecordLinkP>
            <ContactRecordLinkP
              $theme={theme}
              className=" text-center "
              onClick={() => { activeTab == 0 ? setShowImportLead(true) : setShowImportList(true); }}
            >
              <img src="/import.svg" alt="import" />
              <UnderLineSpan>
                {activeTab == 0 ? t("Import contact to list") : t("Import a new list")}
              </UnderLineSpan>
            </ContactRecordLinkP>
          </div>
        </div>

        {activeTab == 0 && (
          <RecordingTableHeader>
            <Relative>
              <SearchInputMod
                theme={theme}
                type="text"
                placeholder={t("Searching for?")}
              />
            </Relative>

            {/* <DropdownButton options={camPaignList} onSelect={handleCampaignSelect} placeholder={t("Campaign")} isFull={false} /> */}
            <OutcomeDropdownButton onSelect={handleOutcomeSelect} />
            <DurationDropdownButton onSelect={handleDurationSelect} />

            <DateContainer>
              <div className="input-with-icon">
                <DatePickerWrapper
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  dropdownMode="select"
                  calendarStartDay={1}
                  $theme={theme}
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
                  <div className="gap-2 align-items-center d-flex px-2">
                    <p className="mb-0">{t("Search")}</p>{" "}
                    <ImageRender fileName="/search.svg" />
                  </div>
                }
              />
            </SearchBtnContainer>
          </RecordingTableHeader>
        )}

        <CustomTableContainer className="table_container">
          <CustomTable
            hideCheckbox={activeTab == 0 ? false : true}
            maxWidth={1600}
            data={tableData}
            columns={activeTab == 0 ? contactColumn : listColumn}
            theme={theme}
          />
        </CustomTableContainer>
      </RecordingTableContainer>

      <DeleteModal
        onHide={() => setDeleteModalshow(false)}
        onCancel={() => setDeleteModalshow(false)}
        onContinue={() => handleDeleteContact()}
        show={deleteModalshow}
        title={t("Are you sure you want to delete this contact?")}
        btntext={t("Save")}
      />

      <Postcall
        show={showImportLead}
        onHide={() => setShowImportLead(false)}
        children={
          <ContactRecordModalContainer>
            <Search />
            <div className="mt-2">
              <CustomInput
                selected={selectedInput}
                setSelected={setSelectedInput}
                children={
                  <div className="d-flex  flex-column">
                    <p className="">
                      {t("By checking this box i confirm that all the contacts i am importing have given me express written consent to contact them with artificial and pre-recorded voice calls. I also agree to comply with all relevant TCPA, TSR and regulatory laws/guidelines concerning my communication with these contacts.")}
                    </p>
                  </div>
                }
                name="type"
                type="checkbox"
                label={t("Sales")}
                value="Sales"
              />
            </div>

            <div className="d-flex w-full gap-2 align-items-end justify-content-end mt-3">
              <ContactRecordLinkP
                $theme={theme}
                className=" text-center py-2"
                onClick={() => {
                  setShowImportLead(false);
                  setShowCreateList(true);
                }}
              >
                + <UnderLineSpan>{t("Add a new List")}</UnderLineSpan>
              </ContactRecordLinkP>
              <ContactRecordLinkP $theme={theme} className=" text-center py-2" onClick={downloadExample}>
                <img src={"/download.svg"} alt="" />
                <UnderLineSpan>
                  {t("Download example")}
                </UnderLineSpan>
              </ContactRecordLinkP>
              <button onClick={() => {
                setShowImportLead(false);
                setTimeout(() => { }, 2000);
                navigate("/contact/import-data?type=contact");
              }} className="modal_button">
                <div className="d-flex align-items-center px-2">
                  {t("Import contact")}
                  <img src={` ${theme == "light" ? "/next-light.svg" : "/nextIcon.svg"}`} alt="" />
                </div>
              </button>
            </div>
          </ContactRecordModalContainer>
        }
        title={t("Select a list to import contacts into")}
      />

      <Postcall
        show={showImportList}
        onHide={() => setShowImportList(false)}
        children={
          <ContactRecordModalContainer>
            <div className="d-flex w-full gap-0 flex-column">
              <p className="mb-2">{t("List name")}</p>
              <InputRow className="" $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t("Input list name...")}
                  value={listname}
                  onChange={(event) => setListname(event.target.value)}
                  $theme={theme}
                />
              </InputRow>
            </div>
            <div className="mt-2">
              <CustomInput
                selected={selectedInput}
                setSelected={setSelectedInput}
                children={
                  <div className="d-flex  flex-column">
                    <p className="">
                      {t("By checking this box I confirm that all the contacts I am importing have given me express written consent to contact them with artificial and pre-recorded voice calls. I also agree to comply with all relevant TCPA, TSR and regulatory laws/guidelines concerning my communication with these contacts.")}
                    </p>
                  </div>
                }
                name="type"
                type="checkbox"
                label={t("Sales")}
                value="Sales"
              />
            </div>

            <div className="d-flex w-full gap-2 align-items-end justify-content-end mt-3">
              <ContactRecordLinkP $theme={theme} className=" text-center py-2" onClick={downloadExample}>
                <img src={"/download.svg"} alt="" />
                <UnderLineSpan>
                  {t("Download example")}
                </UnderLineSpan>
              </ContactRecordLinkP>
              <button onClick={() => {
                setShowImportList(false);
                setTimeout(() => { }, 2000);
                navigate("/contact/import-data?type=list");
              }} className="modal_button">
                <div className="d-flex align-items-center px-2">
                  {t("Import List")}
                  <img src={` ${theme == "light" ? "/next-light.svg" : "/nextIcon.svg"}`} alt="" />
                </div>
              </button>
            </div>
          </ContactRecordModalContainer>
        }
        title={t("Import a new list")}
      />

      {showEditContactModal && (
        <EditOrCreateMOdal
          show={showEditContactModal}
          setShow={setEditShowContactModal}
        />
      )}

      {showCreateContact && (
        <CreateContactModal
          tableData={tableData}
          setTableData={setTableData}
          show={showCreateContact}
          setShow={setShowCreateContact}
          onContinue={() => handleuploadContact()}
        />
      )}

      {showCreateList && (
        <CenteredModal
          onHide={() => setShowCreateList(false)}
          onContinue={() => handleuploadContact()}
          show={showCreateList}
          title={t("Add a new List")}
          btntext={t("Save")}
          children={
            <div className="d-flex flex-column gap-3">
              <div className="d-flex  gap-0 flex-column">
                <p className="mb-2">{t("List name")}</p>
                <InputRow className="" $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    placeholder={t("Input list name...")}
                    value={listname}
                    onChange={(event) => setListname(event.target.value)}
                    $theme={theme}
                  />
                </InputRow>
              </div>
              <div className="d-flex  gap-0 flex-column">
                <p className="mb-2">{t("Company affiliated")}</p>
                <InputRow className="" $theme={theme}>
                  <Input
                    id="paste"
                    type="text"
                    className=""
                    placeholder=""
                    value={comapnyaffiliated}
                    onChange={(event) => setComapnyaffiliated(event.target.value)}
                    $theme={theme}
                  />
                </InputRow>
              </div>
            </div>
          }
        />
      )}
    </OverAllContainer>
  );
}
