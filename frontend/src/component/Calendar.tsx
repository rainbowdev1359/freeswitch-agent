import React, { useState } from 'react';
import styled from 'styled-components';
import { months } from '../data/date';
import { useTranslation } from 'react-i18next';
import { CalendarDateParagraph, CalendarDayParagraph, CalendarDateButton, CalendarTh } from './StyleComponents';

const CalendarContainer = styled.div`
    width: 456px;    
    padding: 24px;
    gap: 56px;
    border-radius: 12px 0px 0px 0px;
`;

function Calendar({ isMonthSelector, clearfilter, applyFilter }: { isMonthSelector?: boolean, onApplyFilter?: () => any, clearfilter: any, applyFilter: any }) {

    const { t } = useTranslation();
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
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days = [];

        // Add empty slots for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push('');
        }

        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(i);
        }

        return days;
    }

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Split days into weeks (rows)
    const weeks = [];
    const days = generateDays();
    while (days.length > 0) {
        weeks.push(days.splice(0, 7));
    }

    return (
        <CalendarContainer>
            <div className="d-flex flex-1 justify-content-between align-items-center">
                <CalendarDateParagraph>
                    {getCurrentMonth()} {getCurrentYear()}
                </CalendarDateParagraph>
                <div className="d-flex gap-2" style={{ height: "16px" }}>
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
            {!isMonthSelector && <table>
                <thead>
                    <tr>
                        {dayNames.map((dayName, index) => (
                            <CalendarTh key={index}>
                                <CalendarDayParagraph>{t(dayName)}</CalendarDayParagraph>
                            </CalendarTh>
                        ))}
                    </tr>
                </thead>
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
            </table>}

            <div className='d-flex gap-2 mt-4'>
                <CalendarDateButton textcolor='#1f6b7a' color='#d3dcdf' onClick={() => {
                    setSelectedDate(new Date().getDate())
                    clearfilter()
                }}
                >
                    {t("Clear filter")}
                </CalendarDateButton>
                <CalendarDateButton textcolor='#d3dcdf' color='#27798b' onClick={() => {
                    var month = currentMonth + 1;
                    var monthString = parseInt(month.toString(), 10) < 10 ? `0${month}` : month
                    var dateString = parseInt(selectedDate.toString(), 10) < 10 ? `0${selectedDate}` : selectedDate
                    applyFilter(isMonthSelector ? (currentYear + "-" + monthString) : (currentYear + "-" + monthString + "-" + dateString), isMonthSelector)
                }}>
                    {t("Apply filter")}
                </CalendarDateButton>
            </div>

        </CalendarContainer>
    );
}

export default Calendar;
