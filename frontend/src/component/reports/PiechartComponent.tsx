import React, { useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const COLORS = ['#E4F150', '#F0B723', '#0FBC0C', '#224D57'];

const renderActiveShape = (props: any) => {
    const theme = useSelector((state: RootState) => state.theme.theme);
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, date } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={theme === "light" ? "#27798b" : "#d3dcdf"}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <foreignObject x={ex + (cos >= 0 ? -5 : -1) * 12} y={ey - 12} width="100" height="50">
                <div style={{ background: "#185968", color: "white", textAlign: "center", borderRadius: "4px" }}>
                    <span>{`${value}% Success`}</span><br />
                    <span>{date}</span>
                </div>
            </foreignObject>
        </g>
    );
};

export function PiechartComponent({ data }: any) {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_: any, index: any) => {
        setActiveIndex(index)
    };

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={300}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={110}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {data.map((_entry: any, index: any) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            <div className="d-flex row">
                {data.map((entry: any, index: any) => (
                    <div className="d-flex flex-row align-items-center justify-content-center col-12 col-md-6 mb-2" key={index}>
                        <span className="d-flex rounded-circle" style={{ backgroundColor: COLORS[index % COLORS.length], width: "12px", height: "12px", marginRight: "8px" }} />
                        <span>{`${entry.name} ${entry.value}%`}</span>
                    </div>
                ))}
            </div>
        </>
    );
}
