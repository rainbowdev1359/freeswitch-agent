import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";
import { months } from '../../data/date';
import { TicketHeaderData } from "../../data/tickets";
import { RootState } from "../../store";
import {
  RecordingTableContainer,
  FileCol,
  CalendarDayParagraph,
  TabButtonRow,
  H1Styled,
  AgentParagraph
  } from "../StyleComponents";
import "react-datepicker/dist/react-datepicker.css";

function RecordingTable() {
  const { t } = useTranslation();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [selectedDate, setSelectedDate] = useState(new Date().getDate())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  function getCurrentMonth() {
    return t(months[currentMonth]);
  }

  function getCurrentYear() {
    return currentYear;
  }

  function generateDays() {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  }

  const weeks = [];
  const days = generateDays();
  while (days.length > 0) {
    weeks.push(days.splice(0, 16));
  }

  return (
    <RecordingTableContainer className="">
      <div className="w-full row m-auto">
        <div className="col-12 col-md-8">
          <FileCol theme={theme} className="d-flex flex-column gap-2 p-3">
            <div className="d-flex flex-1 justify-content-start align-items-center">
              <div className="d-flex align-items-center gap-4 p-3" style={{ height: "16px" }}>
                {getCurrentMonth()} {getCurrentYear()}
                <img src="/chevron_back.svg" alt="Previous" onClick={() =>
                  currentMonth !== 0
                    ? setCurrentMonth(currentMonth - 1)
                    : (setCurrentMonth(11), setCurrentYear(currentYear - 1))
                } />
                <img src="/chevron_next.svg" alt="Next" onClick={() =>
                  currentMonth !== 11
                    ? setCurrentMonth(currentMonth + 1)
                    : (setCurrentMonth(0), setCurrentYear(currentYear + 1))
                } />
              </div>
            </div>
            <table>
              <tbody>
                {weeks.map((week, rowIndex) => (
                  <tr key={rowIndex}>
                    {week.map((day: any, colIndex) => (
                      <td key={`${rowIndex}-${colIndex}`}>
                        {day !== '' && <CalendarDayParagraph onClick={() => setSelectedDate(day)} isSelected={selectedDate == day ? true : false}>{day}</CalendarDayParagraph>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </FileCol>
        </div>

        <div className="col-12 col-md-4">
          <FileCol theme={theme} className="d-flex flex-wrap gap-4 justify-content-center align-items-center p-3">
            {TicketHeaderData.map((item: any, rowIndex) => (
              <TabButtonRow key={rowIndex} className="d-flex justify-content-center align-items-center flex-column" style={{ width: "100px", height: "100px" }}>
                <H1Styled className="mb-0">{item.value}</H1Styled>
                <AgentParagraph className="mb-0" style={{ fontSize: "13px" }}>{item.title}</AgentParagraph>
              </TabButtonRow>
            ))}
          </FileCol>
        </div>
      </div>
    </RecordingTableContainer>
  );
}

export default RecordingTable;
