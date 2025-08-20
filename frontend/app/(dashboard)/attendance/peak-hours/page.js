"use client";

import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock peak hours data (aggregated from all users check-in/out)
const allUsersData = [
  { hour: "06:00", allUsers: 5, user: 0 },
  { hour: "07:00", allUsers: 12, user: 1 },
  { hour: "08:00", allUsers: 18, user: 1 },
  { hour: "09:00", allUsers: 10, user: 0 },
  { hour: "17:00", allUsers: 20, user: 0 },
  { hour: "18:00", allUsers: 28, user: 0 },
  { hour: "19:00", allUsers: 35, user: 1 },
  { hour: "20:00", allUsers: 22, user: 0 },
];

// Mock user attendance breakdown
const userPieData = [
  { name: "Morning Sessions", value: 5 },
  { name: "Evening Sessions", value: 8 },
];

const COLORS = ["#2563eb", "#f59e0b"]; // Tailwind Blue + Amber

export default function PeakHoursPage() {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Peak Hours Line Chart */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>🏋️ Peak Hours vs Your Check-ins</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={allUsersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* All users line */}
                <Line
                  type="monotone"
                  dataKey="allUsers"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  name="All Users"
                />
                {/* Current user line */}
                <Line
                  type="monotone"
                  dataKey="user"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 6 }}
                  activeDot={{ r: 8 }}
                  name="You"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Attendance Pie Chart */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle>📊 Your Attendance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {userPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
