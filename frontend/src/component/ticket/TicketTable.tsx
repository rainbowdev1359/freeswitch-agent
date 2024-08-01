import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../CustomTable/Table";
import PoscallModal from "../modals/Postcall";
import { defaultData, ticketStatusList } from "../../data/tickets";
import { TicketTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DropdownButton } from "../DropDown";
import { ActionContainer } from "../CustomTable/TableComponent";
import TicketActionPopup from "../popup/TicketActionPopup";
import { useTranslation } from 'react-i18next';
import {
  RecordingTableContainer,
  RecordingTableHeader,
  ControllerContainer,
  Title,
  EditPackageButton,
  CustomTableContainer,
  LinkP,
  AParagraph,
  TextAreaMod,
  InputRow,
  Input,
  AgentParagraph
} from "../StyleComponents";

const columnHelper = createColumnHelper<TicketTableType>();

function RecordingTable() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [ticketStatus, setTicketStatus] = useState(ticketStatusList[0]);
  const [detailModalShow, setDetailModalShow] = useState(false);
  const [submitModalShow, setSubmitModalShow] = useState(false);
  const [ticketList, setTicketList] = useState<TicketTableType[]>(defaultData);
  const [selectedRow, setSelectedRow] = useState("");

  const columns = [
    columnHelper.accessor("ticket_ID", {
      header: () => <span>{t('Ticket ID')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("customer_name", {
      header: () => <span>{t('Customer Name')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("company", {
      header: () => <span>{t('Company')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("phone_number", {
      header: () => <span>{t('Phone number')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("subject", {
      header: () => <span>{t('Subject')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("agent", {
      header: () => <span>{t('Agent')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("issue", {
      header: () => <span>{t('Issue')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("reported_at", {
      header: () => <span>{t('Reported at')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.accessor("reported_time", {
      header: () => <span>{t('Reported Time')}</span>,
      cell: (info) => <span>{info.getValue()}</span>,
    }),
    columnHelper.display({
      id: "details",
      header: () => <span>{t('Details')}</span>,
      cell: (props: any) => (
        <Row className="d-flex justify-content-center align-items-center mx-2" >
          <ActionContainer $theme={theme} width={"100%"} onClick={() => clickDetailModal(props.row.id.toString())} >
            {t('Details')}
          </ActionContainer>
        </Row>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span>{t('Actions')}</span>,
      cell: (props: any) => (
        <Row style={{ display: "flex", margin: "0 2px", width: "100%", gap: "4px", justifyContent: "center", alignItems: "center", }} >
          <ActionContainer $theme={theme} width={"100%"}>
            <TicketActionPopup
              rowId={props.row.id}
              actionHandler={actionHandler}
            />
          </ActionContainer>
        </Row>
      ),
    }),
  ];

  const clickDetailModal = async (sRow: string) => {
    console.log("selectedRow====>", selectedRow)
    setSelectedRow(sRow);
    setDetailModalShow(true);
  };

  useEffect(() => {
    setTicketList(defaultData);
  }, []);

  const actionHandler = async (rowId: any, value: string) => {
    console.log("rowId======>", rowId)
    console.log("value======>", value)
  }

  const closeDetailModal = () => {
    setDetailModalShow(false)
  }

  const handleSubmitModal = () => {
    setSubmitModalShow(true)
    setDetailModalShow(false)
  }

  const closeSubmitModal = () => {
    setSubmitModalShow(false)
  }

  const handleOutcomeSelect = async (val: string) => {
    console.log(val);
    console.log(ticketStatus);
    setTicketStatus(val)
  };

  return (
    <RecordingTableContainer className="">
      <RecordingTableHeader>
        <ControllerContainer className="d-flex w-full gap-2 flex-wrap justify-content-between">
          <Title theme={theme}>{t('Ticket Center')}</Title>
          <EditPackageButton $theme={theme} className="">{t("Bulk action")}</EditPackageButton>
        </ControllerContainer>
      </RecordingTableHeader>

      <CustomTable data={ticketList} theme={theme} columns={columns} />
      <CustomTableContainer className="table_container">
      </CustomTableContainer>

      <PoscallModal
        children={
          <div className={`d-flex flex-column gap-1 ${theme == "light" ? "light" : ""}`}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="d-flex gap-4 flex-column justify-content-between">
                  <AgentParagraph className="my-1">{t("Subject: Phising detection - Download EXE or Script")}</AgentParagraph>
                  <AgentParagraph className="my-1">{t("Ticket ID: 1043")}</AgentParagraph>
                  <AgentParagraph className="my-1">{t("Reported at: 21/06/2024")}</AgentParagraph>
                  <AgentParagraph className="my-1">{t("Reported by: Customer name")}</AgentParagraph>
                  <AgentParagraph className="my-1">{t("Description: A possible malicious executable content {fileName}")}</AgentParagraph>
                  <AgentParagraph className="my-1">{t("Resolution: Detection of malicious content which is related to phishing.")}</AgentParagraph>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex gap-4 flex-column justify-content-between">
                  <AgentParagraph className="my-1">{t("Company: Company name")}</AgentParagraph>
                  <AgentParagraph className="my-1">{t("Last update: 31/05/2024 : 12:24")}</AgentParagraph>
                  <div className="d-flex gap-2 flex-wrap w-full align-items-center">
                    <AgentParagraph>{t("Ticket status:")}</AgentParagraph>
                    <DropdownButton color={["white", "#185968"]} options={ticketStatusList} onSelect={handleOutcomeSelect} isFull={false} />
                  </div>
                  <Title theme={theme}>{t('Ticket history')}</Title>
                  <AgentParagraph>{t("Ticket status has changed to Escalated by SOS 23/05/2024")}</AgentParagraph>
                  <AgentParagraph>{t("Ticket has been created by SOC 21/05/2024")}</AgentParagraph>
                </div>
              </div>
            </div>

            <div className="d-flex gap-0 flex-wrap justify-content-between my-4">
              <LinkP $theme={theme} className="d-flex gap-1 justify-content-center align-items-center">
                <AParagraph $theme={theme}>{t('Attachments')}</AParagraph>
                <img src={"/download.svg"} alt="" />
              </LinkP>
              <div className="d-flex flex-wrap gap-2 ">
                <LinkP $theme={theme} onClick={handleSubmitModal}>
                  <AParagraph $theme={theme}>{t('Submit ticket')}</AParagraph>
                </LinkP>
                <LinkP $theme={theme} >
                  <AParagraph $theme={theme}>{t('Update ticket')}</AParagraph>
                </LinkP>
              </div>
            </div>
            <div className="d-flex gap-0 flex-column justify-content-between">
              <Title theme={theme}>{t('Ticket replies')}</Title>
              <div className="d-flex flex-wrap gap-2 ">
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Card not working')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Wire payment')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Currently verifying ')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Feedback issue')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Agent not working')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Add new campaign')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Upload a contact')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Create new agent')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('Create new agent')}</AParagraph></LinkP>
                <LinkP $theme={theme} ><AParagraph $theme={theme}>{t('+')}</AParagraph></LinkP>
              </div>
            </div>
            <TextAreaMod style={{ minHeight: "100px" }} theme={theme} border />
          </div>
        }
        show={detailModalShow}
        onHide={closeDetailModal}
        title={t('Ticket Details')}
      />

      <PoscallModal
        children={
          <div className={`d-flex flex-column gap-4 ${theme == "light" ? "light" : ""}`}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="d-flex gap-4 flex-column justify-content-between">
                  <div className="d-flex gap-2 flex-row align-items-center">
                    <p className="mb-0" style={{ width: "100px" }}>{t('Subject')}</p>
                    <InputRow className="w-full" $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        placeholder={t('Subject')}
                      />
                    </InputRow>
                  </div>
                  <div className="d-flex gap-2 flex-row align-items-center">
                    <p className="mb-0" style={{ width: "100px" }}>{t('Phone')}</p>
                    <InputRow className="w-full" $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        placeholder={t('What is the best phone to reach you')}
                      />
                    </InputRow>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <p className="mb-0" style={{ width: "80px" }}>{t('Ticket ID')}</p>
                    <AgentParagraph>{t("1043")}</AgentParagraph>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="d-flex gap-4 flex-column justify-content-between">
                  <div className="d-flex gap-2 flex-row align-items-center">
                    <p className="mb-0" style={{ width: "100px" }}>{t('Company')}</p>
                    <InputRow className="w-full" $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        placeholder={t('Company name')}
                      />
                    </InputRow>
                  </div>
                  <div className="d-flex gap-2 flex-row align-items-center">
                    <p className="mb-0" style={{ width: "100px" }}>{t('Email')}</p>
                    <InputRow className="w-full" $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        placeholder={t('Email address')}
                      />
                    </InputRow>
                  </div>
                  <div className="d-flex gap-2 flex-row align-items-center">
                    <p className="mb-0" style={{ width: "100px" }}>{t('Full Name')}</p>
                    <InputRow className="w-full" $theme={theme}>
                      <Input
                        id="paste"
                        type="text"
                        className=""
                        placeholder={t('Enter your full name')}
                      />
                    </InputRow>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex gap-0 flex-wrap justify-content-between mt-2">
              <Title theme={theme}>{t('Message')}</Title>
              <div className="d-flex flex-wrap gap-2 ">
                <AParagraph $theme={theme}>{t('file_name')}</AParagraph>
                <LinkP $theme={theme} className="d-flex gap-1 justify-content-center align-items-center">
                  <AParagraph $theme={theme}>{t('Attachments')}</AParagraph>
                  <img src={"/download.svg"} alt="" />
                </LinkP>
              </div>
            </div>
            <TextAreaMod style={{ minHeight: "100px" }} theme={theme} border />
            <div className="d-flex gap-0 justify-content-end mt-2">
              <LinkP $theme={theme} >
                <AParagraph $theme={theme} onClick={() => setSubmitModalShow(false)}>{t('Submit ticket')}</AParagraph>
              </LinkP>
            </div>
          </div>
        }
        show={submitModalShow}
        onHide={closeSubmitModal}
        title={t('Submit a Ticket')}
      />

    </RecordingTableContainer>
  );
}

export default RecordingTable;
