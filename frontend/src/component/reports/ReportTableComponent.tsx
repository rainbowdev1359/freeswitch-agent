import React from "react";
import { useTranslation } from 'react-i18next';

const COLORS = ['#16AB64', '#F0B723', '#16AB64', '#AB1616', '#16AB64', '#AB1616'];

const data = [
    { name: 'CSAT:', value: 0 },
    { name: 'Resolution rate:', value: 0 },
    { name: 'Average handling time:', value: 0 },
    { name: 'Error rate:', value: 0 },
    { name: 'Engagement rate:', value: 0 },
    { name: 'Upsell/Cross-sell success rate:', value: 0 },
];

export function ReportTableComponent() {
    const { t } = useTranslation();

    return (
        <>
            {data.map((entry: any, index: any) => (
                <div className="d-flex flex-row align-items-center justify-content-between" key={index}>
                    <span className="fw-bold">{index !== 0 ? t(entry.name) : 'CSAT:'}</span>
                    <span style={{
                        color: COLORS[index % COLORS.length],
                        border: `1px solid ${COLORS[index % COLORS.length]}`,
                        borderRadius: "4px",
                        padding: "2px"
                    }}>
                        {`${entry.value}%`}
                    </span>
                </div>
            ))}
        </>
    );
}
