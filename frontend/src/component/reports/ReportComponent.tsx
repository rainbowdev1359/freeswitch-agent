import React, { useState } from "react";
import { PiechartComponent } from "./PiechartComponent";
import { BarChartComponent } from "./BarChartComponent";
import { ReportTableComponent } from "./ReportTableComponent";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { months } from '../../data/date';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const SectionParent = styled.div<{ theme: string }>`
    display: flex;
    justify-content: space-between;
    height: 100%;
    flex-direction: column;
    background: ${(props) => props.theme === "light" ? "linear-gradient(#E6EDEF, #EDEFE6)" : "linear-gradient(180deg, #0b2227 0%, #09181b 77.4%)"};
    border-radius: 20px;
    color: ${(props) => (props.theme === "light" ? "#0F2E35" : "#96adb3")};
    border: ${(props) => props.theme === "light" ? "1px solid #9ABCC4" : "1px solid #0f2e35"};
`;

const data = [
    { name: 'Agentsmith', value: 100, date: "March, 2024" },
    { name: 'Bard', value: 0, date: "March, 2024" },
    { name: 'Agent', value: 0, date: "March, 2024" },
    { name: 'Sandra', value: 0, date: "March, 2024" },
];

export function ReportComponent({ type, title }: any) {
    const { t } = useTranslation();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

    function getCurrentMonth() {
        return t(months[currentMonth]);
    }

    function getCurrentYear() {
        return currentYear;
    }
    return (
        <SectionParent theme={theme} className="p-3">
            {title && <p className="text-center fw-bold" style={{ fontSize: "20px" }}>{title}</p>}
            <div className="d-flex fw-bold justify-content-between">
                <img src="/chevron_back.svg" alt="Previous" onClick={() =>
                    currentMonth !== 0
                        ? setCurrentMonth(currentMonth - 1)
                        : (setCurrentMonth(11), setCurrentYear(currentYear - 1))
                } />
                {getCurrentMonth()} {getCurrentYear()}
                <img src="/chevron_next.svg" alt="Next" onClick={() =>
                    currentMonth !== 11
                        ? setCurrentMonth(currentMonth + 1)
                        : (setCurrentMonth(0), setCurrentYear(currentYear + 1))
                } />
            </div>
            {type == "pie" && <PiechartComponent data={data} />}
            {type == "bar" && <BarChartComponent />}
            {type == "table" && <ReportTableComponent />}

        </SectionParent>
    );
}
