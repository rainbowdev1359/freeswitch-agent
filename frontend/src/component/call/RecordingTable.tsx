import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import { DropdownButton } from "../DropDown";
import { OutcomeDropdownButton } from "../OutcomeDropDown";
import { DurationDropdownButton } from "../DurationDropdownButton";
import { createColumnHelper } from "@tanstack/react-table";
import CustomTable from "../CustomTable/Table";
import { defaultData } from "../../data/call";
import { checkTimeRange } from "../../data/date";
import { CallTableType } from "../../types/types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "react-datepicker/dist/react-datepicker.css";
import "./call.css";
import { ActionContainer, ActionImage } from "../CustomTable/TableComponent";
import DeleteModal from "../modals/DeleteModal";
import FeedbackModal from "../modals/FeedbackModal";
import CustomButton from "../import/CustomButton";
import { useNavigate } from "react-router-dom";
import ButtonPopup from "../popup/ButtonPopup";
import ImageRender from "../ImageRender";
import TableImageRender from "../TableImageRender";
import { exportToCsv } from '../../utils/exportCsv';
import { useTranslation } from 'react-i18next';
import { getLocale } from '../../utils/locale';
import {
  RecordingTableContainer,
  RecordingTableHeader,
  SearchInputMod,
  Relative,
  DatePickerWrapper,
  DateContainer,
  SearchBtnContainer,
  DateParagraph,
  CustomTableContainer,
} from "../StyleComponents";
import services from "../../api";

const columnHelper = createColumnHelper<CallTableType>();

function RecordingTable() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 2);
  const [startDate, setStartDate] = useState<Date>(currentDate);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [camPaignList, setCamPaignList] = useState([]);
  const [callList, setCallList] = useState<CallTableType[]>([]);
  const [search, setSearch] = useState("");
  const [campaign, setCampaign] = useState("");
  const [outcome, setOutcome] = useState("None");
  const [duration, setDuration] = useState("None");
  const [selectedCall, setSelectedCall] = useState<number | null>(null);
  const [deleteModalshow, setDeleteModalshow] = useState(false);
  const [feedbackModalshow, setFeedbackModalshow] = useState(false);
  const [actionModalshow, setActionModalshow] = useState("");

  const columns = [
    columnHelper.accessor("agent__info", {
      cell: (info) => info.getValue()[0].value,
      header: () => <span>{t('Agent')}</span>,
    }),
    columnHelper.accessor("contact", {
      cell: (info) => info.getValue(),
      header: () => <span>{t('Contact')}</span>,
    }),
    // columnHelper.accessor("variables", {
    //   cell: (info) => info.getValue().to,
    //   header: () => <span>{t('Number')}</span>,
    // }),
    // columnHelper.accessor("campaign", {
    //   header: () => <span>{t('Campaign')}</span>,
    //   cell: (info) => info.renderValue(),
    // }),
    columnHelper.accessor("inbound", {
      cell: (info) => info.getValue()?"Incoming":"Outgoing",
      header: () => <span>{t('Type')}</span>,
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => new Date(info.getValue()).toDateString(),
      header: () => <span>{t('Date initiated')}</span>,
    }),
    columnHelper.accessor("created_at", {
      cell: (info) => new Date(info.getValue()).toTimeString().substring(0, 8),
      header: () => <span>{t('Time initiated')}</span>,
    }),
    columnHelper.accessor("corrected_duration", {
      header: () => <span>{t('Duration')}</span>,
    }),
    columnHelper.accessor("outcome", {
      header: () => <span>{t('Outcome')}</span>,
    }),

    columnHelper.display({
      id: "actions",
      header: () => <span>{t('Actions')}</span>,
      cell: (props: any) => (
        <Row style={{ display: "flex", margin: "0 2px", width: "100%", gap: "4px", justifyContent: "center", alignItems: "center", }} >
          <ActionContainer $theme={theme}>
            <ActionImage onClick={() => {
              navigate("/playcall", {state: {data: props.row.original}})
              }}>
              <TableImageRender light="/resume-light.svg" dark="/resume.svg" />
            </ActionImage>
          </ActionContainer>
          <ActionContainer $theme={theme}>
            <ActionImage onClick={() => {
              setSelectedCall(props.row.index);
              setDeleteModalshow(true);
            }}>
              <TableImageRender light="/delete-light.svg" dark="/delete.svg" />
            </ActionImage>
          </ActionContainer>
          <ActionContainer $theme={theme}>
            <ActionImage
              onClick={() => {
                setSelectedCall(props.row.index);
                setActionModalshow(props.row.id);
              }}
            >
              <TableImageRender light="/table-menu-light.svg" dark="/table-menu.svg" />
            </ActionImage>
            {actionModalshow == props.row.id && (
              <ButtonPopup
                setActionModalShow={setActionModalshow}
                rowId={props.row.id}
                exportHandler={exportHandler}
                summaryHandler={() => navigate("/summarycall")}
                feedbackHandler={() => {
                  setSelectedCall(props.row.index);
                  setFeedbackModalshow(true)
                }}
              />
            )}
          </ActionContainer>
        </Row>
      ),
    }),
  ];

  useEffect(() => {
    services.calls.getAllCalls()
    .then((response: any) => {
      setCallList(response.data.logs);
    })
    .catch((error: any) => {
      console.log(error);
    })
    setCamPaignList([]);
  }, []);

  const handleCampaignSelect = async (val: string) => {
    setCampaign(val);
  };

  const handleOutcomeSelect = async (val: string) => {
    setOutcome(val);
  };

  const handleDurationSelect = async (val: string) => {
    setDuration(val);
  };

  const deleteHandler = async () => {
    const newArray = callList.filter((_item, index) => index !== selectedCall);
    setCallList(newArray)
    setDeleteModalshow(false);
    setSelectedCall(null);
  }

  const deleteCancelHandler = async () => {
    setDeleteModalshow(false);
    setSelectedCall(null);
  }

  const exportHandler = async () => {
    const exportArray = callList.filter((_item, index) => index === selectedCall);
    const headers = [
      t("Agent"),
      t("Contact"),
      t("Number"),
      t("Campaign"),
      t("Call"),
      t("Date initiated"),
      t("Time initiated"),
      t("Duration"),
      t("Outcome"),
    ];
    
    const rows = exportArray.map((row: any) => [
      row.agent,
      row.contact,
      row.number,
      row.campaign,
      row.call,
      row.Date,
      row.initiatedTime,
      row.duration,
      row.outcome
    ]);
    exportToCsv(`${exportArray[0].agent}_call_data.csv`, [headers, ...rows]);

    setSelectedCall(null);
    setActionModalshow("");
  }

  const feedbackCancelHandler = async () => {
    setFeedbackModalshow(false)
    setSelectedCall(null);
    setActionModalshow("");
  }

  const searchHandler = async () => {
    const newArray = defaultData.filter((item) => {
      const targetDate = new Date(item.Date);
      if (search !== "" && !item.contact.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && !item.number.includes(search)) return false;
      if (outcome !== t("None") && item.outcome !== outcome) return false;
      if (duration !== t("None") && checkTimeRange(item.duration) !== duration) return false;
      if (targetDate <= startDate || targetDate >= endDate) return false;
      return true;
    });
    setCallList(newArray);
  };

  return (
    <RecordingTableContainer className="">
      <RecordingTableHeader>
        <Relative>
          <SearchInputMod theme={theme} type="text" placeholder={t('Searching for?')} value={search} onChange={(e) => setSearch(e.target.value)} />
        </Relative>
        {/* <DropdownButton options={camPaignList} onSelect={handleCampaignSelect} placeholder={t('Campaign')} isFull={false} /> */}
        <OutcomeDropdownButton onSelect={handleOutcomeSelect} />
        <DurationDropdownButton onSelect={handleDurationSelect} />
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
          <DateParagraph $theme={theme} className="">To</DateParagraph>
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
                <p className="mb-0">{t('Search')}</p>{" "}
                <ImageRender fileName="/search.svg" />
              </div>
            }
            onclick={searchHandler}
          />
        </SearchBtnContainer>
      </RecordingTableHeader>

      <CustomTableContainer className="table_container">
        <CustomTable data={callList} theme={theme} columns={columns} />
      </CustomTableContainer>

      <DeleteModal
        onHide={deleteCancelHandler}
        onCancel={deleteCancelHandler}
        onContinue={deleteHandler}
        show={deleteModalshow}
        title={t('Are you sure you want to delete this call?')}
      />

      <FeedbackModal
        onHide={feedbackCancelHandler}
        onCancel={feedbackCancelHandler}
        show={feedbackModalshow}
        selectedcall={selectedCall}
        title={t('Give feedback / report this call')}
      />
    </RecordingTableContainer>
  );
}

export default RecordingTable;
