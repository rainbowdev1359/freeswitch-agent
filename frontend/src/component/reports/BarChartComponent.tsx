import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 0, },
  { name: 'Feb', value: 0, },
  { name: 'Mar', value: 0, },
  { name: 'Apr', value: 0, },
  { name: 'May', value: 0, },
  { name: 'Jun', value: 0, },
  { name: 'Jul', value: 0, },
];

export function BarChartComponent() {
  const { t } = useTranslation();

  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={25}
        >
          <XAxis dataKey="name" padding={{ left: 5, right: 5 }} />
          <Tooltip />
          <YAxis type="number" domain={[0, 100]} hide />
          <Bar dataKey="value" fill="#00B7DF" background={{ fill: '#0F2E35' }} maxBarSize={100} />
        </BarChart>
      </ResponsiveContainer>
      <div className="d-flex row">
        <div className="d-flex flex-row align-items-center justify-content-center mb-2 px-5">
          <span className="fw-bold, mx-2" style={{ color: "#16AB64", fontSize: "24px" }}>0%</span>
          <span>{t("AI performance score is 0 %")} {t("better compare to last month")}</span>
        </div>
      </div>
    </>
  );
}
