import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// palette: [open, closed]
const COLORS = ["#FF6B6B", "#4ECDC4"];

export default function StatsPanel({ tasks }) {
  const openCount   = tasks.filter(t => t.state !== "done" && t.state !=="taskproject").length;
  const closedCount = tasks.filter(t => t.state === "done" && t.state !=="taskproject").length;

 


  const data = [
    { name: "Open",  value: openCount,  fill: COLORS[0] },
    { name: "Closed",value: closedCount,fill: COLORS[1] },
  ];

  return (
    <div className="stats-panel p-3 mt-4 mb-5 text-white bg-dark rounded">
      <ul className="list-unstyled mb-4">
        <li>🟢 Open: <strong style={{color:"#FF6B6B"}}>{openCount}</strong></li>
        <li>✅ Closed: <strong style={{color:"#4ECDC4"}}>{closedCount}</strong></li>
      </ul>
      <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={60}
              paddingAngle={4}
              label
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
