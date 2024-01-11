"use client";

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

const chartColors = [
  "#3498db", // Light Blue
  "#2980b9", // Dark Blue
  "#2ecc71", // Light Green
  "#27ae60", // Dark Green
  "#e67e22", // Light Orange
  "#d35400", // Dark Orange
  "#9b59b6", // Light Purple
  "#8e44ad", // Dark Purple
  "#e74c3c", // Light Red
  "#c0392b", // Dark Red
  "#f1c40f", // Light Yellow
  "#f39c12", // Dark Yellow
];

export default function Chart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={chartData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]}>
          {chartData.map((data, index) => (
            <Cell key={`cell-${index}`} fill={chartColors[index % 20]} />
          ))}
          <Cell />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
