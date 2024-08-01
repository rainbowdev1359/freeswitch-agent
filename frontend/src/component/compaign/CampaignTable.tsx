/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from "react";
import CustomTable from "../CustomTable/Table";
import { Row } from "react-bootstrap";
import { DropdownButton } from "../DropDown";
import { OutcomeDropdownButton } from "../OutcomeDropDown";
import { DurationDropdownButton } from "../DurationDropdownButton";
import { createColumnHelper } from "@tanstack/react-table";
import MaterialDesignSwitch from "../switch";
import { CampaignTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./campaign.css";
import CenteredModal from "../modals/Modal";
import DeleteModal from "../modals/DeleteModal";
import DuplicateModal from "../modals/DuplicateModal";
import { ActionContainer, ActionImage } from "../CustomTable/TableComponent";
import CustomButton from "../import/CustomButton";
import ActionPopup from "../popup/ActionPopup";
import ImageRender from "../ImageRender";
import TableImageRender from "../TableImageRender";
import { campaignTableTypeData } from '../../data/campaign';
import services from '../../api';
import { exportToCsv } from '../../utils/exportCsv';
import { exportToPdf } from '../../utils/exportToPdf';
import { HMod, PMode, CreateButton, ControllerContainer } from "../StyleComponents";
import { useTranslation } from 'react-i18next';
import { getLocale } from '../../utils/locale';
import {
  CampaignTableContainer,
  CampaignTableHeader,
  SearchInputMod,
  Relative,
  DateContainer,
  DateParagraph,
  CustomTableContainer,
  SearchBtnContainer,
  InputRow,
  Input,
  DatePickerWrapper,
} from "../StyleComponents";

interface ContactResult {
  id: number,
  contact: string,
  Number: number,
  Campaign: string,
  Call_Date_Start: string,
  Call_Date_End: string,
  Duration: number,
  Outcome: string
}

const columnHelper = createColumnHelper<CampaignTableType>();

function CampaignTable() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const { t } = useTranslation();

  const handleChange = async () => {
    const response = await services.contacts.getAllContacts()
    const results = response.data.results
    results.forEach(async (result: ContactResult) => {
      const response = await make_call(result.Number.toString(), result.contact)
      // TODO: call knowledge base with the user id and conversation id to be saved
      console.log(response)
    })
  }

  const columns = [
    columnHelper.display({
      id: "switch",
      header: () => <span>{t("Off/On")}</span>,
      cell: () => <MaterialDesignSwitch handleChange={handleChange} />,
    }),
    columnHelper.accessor("name", {
      cell: (info) => <span>{t(info.getValue())}</span>,
      header: () => <span>{t("Campaign")}</span>,
    }),
    columnHelper.accessor((row) => row.type, {
      id: "type",
      cell: (info) => <span>{t(info.getValue())}</span>,
      header: () => <span>{t("Type")}</span>,
    }),
    columnHelper.accessor("budget", {
      header: () => <span>{t("Daily budget")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("list", {
      header: () => <span>{t("List")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("agents", {
      header: () => <span>{t("Agents")}</span>,
      cell: (info) => <span>{info.getValue().map(agent => agent.name).join(", ")}</span>,
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
    columnHelper.accessor("amount_spent", {
      header: () => <span>{t("Amount spent")}</span>,
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("outcome", {
      header: () => <span>{t("Outcomes")}</span>,
      cell: (info) => <span>{t(info.getValue())}</span>,
    }),
    columnHelper.accessor("costOutcome", {
      header: () => <span>{t("Cost / outcome")}</span>,
      cell: (info) => info.renderValue(),
    }),

    columnHelper.display({
      id: "actions",
      header: () => <span>{t("Actions")}</span>,
      cell: (props) => (
        <Row className="d-flex flex-row gap-1 w-160 justify-content-center px-2" style={{ width: "160px" }}>
          <ActionContainer $theme={theme}>
            <ActionImage onClick={() => showEditModal(props.row.id.toString())} >
              <TableImageRender light="/edit2-light.svg" dark="/edit-2.svg" />
            </ActionImage>
          </ActionContainer>
          <ActionContainer $theme={theme}>
            <ActionImage
              onClick={() => {
                setDuplicateModalshow(true);
              }}
            >
              <TableImageRender light="/table-paste-light.svg" dark="/table-paste.svg" />
            </ActionImage>
          </ActionContainer>
          <ActionContainer $theme={theme}>
            <ActionImage
              onClick={() => {
                setDeleteModalshow(true);
              }}
            >
              <TableImageRender light="/delete-light.svg" dark="/delete.svg" />
            </ActionImage>
          </ActionContainer>
          <ActionContainer $theme={theme}>
            <ActionImage
              onClick={() => {
                setActionModalshow(props.row.id);
              }}
            >
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
  const [camPaignList, setCamPaignList] = useState<string[]>([]);
  const [campaign, setCampaign] = useState("");
  const [outcome, setOutcome] = useState("");
  const [duration, setDuration] = useState("");
  const [deleteModalshow, setDeleteModalshow] = useState(false);
  const [duplicateModalshow, setDuplicateModalshow] = useState(false);
  const [actionModalshow, setActionModalshow] = useState("");
  const [campaignRecords, setCampaignRecords] = useState<CampaignTableType[]>(campaignTableTypeData)
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [showEditContactModal, setEditShowContactModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState("");

  const searchCampaigns = () => {
    const params = `?name=${campaign}&outcome=${outcome}`
    services.campaign.filterCampaigns(params).then(res => { setCampaignRecords(res.data.results) })
  }

  const showEditModal = async (sRow: string) => {
    console.log("selectedRow====>", selectedRow)
    setSelectedRow(sRow);
    setEditShowContactModal(true);
    setShowCreateCampaignModal(true)
    // const data = await GetSpecificContact(selectedRow);
    // setContactnumber(data.data.Number);
    // setCampaign(data.data.Campaign);
  };

  useEffect(() => {
    console.log(outcome);
    console.log(duration);
    console.log(campaign);
    setCamPaignList([]);
    services.campaign.getAllCampaigns()
      .then((response) => {
        const results = response.data.results
        setCampaignRecords(results)
        let campaigns: string[] = []
        results.map((result:any) => {
          campaigns.push(result.name)
        })
        setCamPaignList(campaigns)
      })
      .catch(error => {
        console.log(error)
      })
  }, []);

  const handleCampaignSelect = (value: string) => {
    setCampaign(value);
  };

  const handleOutcomeSelect = async (val: string) => {
    setOutcome(val);
  };

  const handleDurationSelect = async (val: string) => {
    setDuration(val);
  };

  const exportHandler = async (selected: number, type: string) => {
    const headers = [
      t("Campaign"),
      t("Type"),
      t("Daily budget"),
      t("List"),
      t("Agents"),
      t("Dials"),
      t("Pickups"),
      t("Failed"),
      t("Busy"),
      t("Amount spent"),
      t("Outcomes"),
      t("Cost / outcome"),
    ];

    const exportArray = campaignRecords.filter((_item, index) => index === selected);
    const rows = exportArray.map((row: any) => [
      row.name,
      row.type,
      row.budget,
      row.list,
      row.agents,
      row.dials,
      row.pickups,
      row.failed,
      row.busy,
      row.amount_spent,
      row.outcome,
      row.costOutcome,
    ]);
    if (type === "pdf") {
      await exportToPdf(rows, headers, `${exportArray[0].name}_campaign_data`);
    } else if (type === "csv") {
      exportToCsv(`${exportArray[0].name}_campaign_data.csv`, [headers, ...rows]);
    }
  }

  const onContinue = () => {
    console.log("test")
    setEditShowContactModal(false)
    setShowCreateCampaignModal(false)
  }

  const onCancleContactModal = () => {
    setEditShowContactModal(false)
    setShowCreateCampaignModal(false)
  }

  return (
    <CampaignTableContainer className="">
      <ControllerContainer className="d-flex  gap-2 flex-column flex-wrap justify-content-between py-4">
        <div className="d-flex flex-column">
          <HMod theme={theme}>{t("Campaigns")}</HMod>
          <PMode>{t("Here are the current campaigns")}</PMode>
        </div>
        <CreateButton $theme={theme} className="" onClick={() => setShowCreateCampaignModal(true)}>+ {t("Add a new campaign")}</CreateButton>
      </ControllerContainer>

      <CampaignTableHeader>
        <Relative>
          <SearchInputMod theme={theme} type="text" placeholder={t("Searching for?")}
            onChange={(e) => { setCampaign(e.target.value) }}
          />
        </Relative>

        <DropdownButton options={camPaignList} onSelect={handleCampaignSelect} placeholder={t("Campaign")} isFull={false} />
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
            onclick={searchCampaigns}
            child={
              <div className="gap-2 align-items-center d-flex px-3">
                <p className="mb-0">{t("Search")}</p>{" "}
                <ImageRender fileName="/search.svg" />
              </div>
            }
          />
        </SearchBtnContainer>
      </CampaignTableHeader>
      <CustomTableContainer className="table_container">
        <CustomTable data={campaignRecords} columns={columns} maxWidth={1430} theme={theme} />
      </CustomTableContainer>

      <DeleteModal
        onHide={() => setDeleteModalshow(false)}
        onCancel={() => setDeleteModalshow(false)}
        show={deleteModalshow}
        title={t("Are you sure you want to delete this campaign?")}
        btntext={t("Save")}
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
              <p className="mb-0 text-center" style={{ color: "#5f8086" }}>
                {t("To avoid clash please edit the campaign you would like to duplicate.")}
              </p>
            </div>
            <div className="d-flex gap-1 flex-column">
              <p className="mb-2">{t("Campaign")}</p>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t("Rename campaign...")}
                />
              </InputRow>
            </div>
          </div>
        }
      />

      <CenteredModal
        onHide={onCancleContactModal}
        onContinue={onContinue}
        onBack={onCancleContactModal}
        onBackTitle={t("Cancel")}
        show={showCreateCampaignModal}
        title={showEditContactModal ? t("Edit campaign.") : t("Add a new campaign")}
        btntext={t("Save")}
        children={
          <div className="d-flex flex-column gap-3">
            <div className="d-flex  gap-0 flex-column">
              <p className="mb-0">{t("Campaign name")}</p>
              <InputRow className="" $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t("Campaign name")}
                  value={fullname}
                  $theme={theme}
                  onChange={(event) => setFullname(event.target.value)}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <p className="mb-0">{t("Type")}</p>
              <InputRow className="p-0" $theme={theme}>
                <DropdownButton
                  color={["#E5ECEE", "#185968"]}
                  options={["Incoming", "Outcoming", "Incoming and Outcoming"]}
                  onSelect={handleCampaignSelect}
                  placeholder={t("Inbound or outbound")}
                  isFull={false}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <p className="mb-0">{t("List")}</p>
              <InputRow className="p-0" $theme={theme}>
                <DropdownButton
                  color={["#E5ECEE", "#185968"]}
                  options={[""]}
                  onSelect={handleCampaignSelect}
                  placeholder={t("List A")}
                  isFull={false}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <p className="mb-0">{t("Agent")}</p>
              <InputRow className="p-0" $theme={theme}>
                <DropdownButton
                  color={["#E5ECEE", "#185968"]}
                  options={[""]}
                  onSelect={handleCampaignSelect}
                  placeholder={t("Agent agent")}
                  isFull={false}
                />
              </InputRow>
            </div>
            <div className="d-flex gap-0 flex-column">
              <p className="mb-0">{t("Daily budget")}</p>
              <InputRow $theme={theme}>
                <Input
                  id="paste"
                  type="text"
                  className=""
                  placeholder={t("Campaign budget per day")}
                  value={contactnumber}
                  $theme={theme}
                  onChange={(event) => setContactnumber(event.target.value)}
                />
              </InputRow>
            </div>
          </div>
        }
      />
    </CampaignTableContainer>
  );
}

export default CampaignTable;
