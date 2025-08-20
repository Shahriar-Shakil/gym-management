"use client";

import {
  Award,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Filter,
  Flame,
  Star,
  Target,
  Timer,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const AttendancePage = () => {
  const router = useRouter();
  const [filterPeriod, setFilterPeriod] = useState("thisMonth");

  // Mock attendance summary data
  const attendanceSummary = {
    thisMonth: {
      totalVisits: 18,
      totalHours: 34.5,
      currentStreak: 5,
      longestStreak: 12,
      averagePerWeek: 4.5,
      averageDuration: "1h 55m",
    },
    thisYear: {
      totalVisits: 156,
      totalHours: 298,
      currentStreak: 5,
      longestStreak: 18,
      averagePerWeek: 4.2,
      averageDuration: "1h 54m",
    },
  };

  // Mock goals and milestones
  const goals = [
    {
      id: 1,
      title: "Monthly Attendance Goal",
      description: "Visit gym 20 times this month",
      current: 18,
      target: 20,
      type: "monthly",
      icon: Target,
      color: "bg-blue-500",
      progress: 90,
    },
    {
      id: 2,
      title: "Workout Streak",
      description: "Current active streak",
      current: 5,
      target: 15,
      type: "streak",
      icon: Flame,
      color: "bg-orange-500",
      progress: 33,
    },
    {
      id: 3,
      title: "Weekly Hours",
      description: "Workout at least 8 hours per week",
      current: 8.5,
      target: 8,
      type: "hours",
      icon: Clock,
      color: "bg-green-500",
      progress: 100,
    },
  ];

  // Mock milestones/achievements
  const milestones = [
    {
      id: 1,
      title: "Consistency Champion",
      description: "Completed 10-day streak",
      achievedDate: "2025-08-10",
      icon: Trophy,
      color: "text-yellow-500",
      achieved: true,
    },
    {
      id: 2,
      title: "Century Club",
      description: "Completed 100 gym visits",
      achievedDate: "2025-07-20",
      icon: Award,
      color: "text-purple-500",
      achieved: true,
    },
    {
      id: 3,
      title: "Early Bird",
      description: "20 morning workouts (before 8 AM)",
      achievedDate: "2025-08-05",
      icon: Star,
      color: "text-blue-500",
      achieved: true,
    },
    {
      id: 4,
      title: "Marathon Master",
      description: "Complete 15-day streak",
      achievedDate: null,
      icon: Flame,
      color: "text-gray-400",
      achieved: false,
      progress: 33,
    },
  ];

  // Mock detailed attendance data
  const attendanceHistory = [
    {
      id: 1,
      date: "2025-08-19",
      checkIn: "18:30",
      checkOut: "20:15",
      duration: "1h 45m",
      workoutType: "Strength Training",
      notes: "Leg day - completed all sets",
    },
    {
      id: 2,
      date: "2025-08-18",
      checkIn: "07:15",
      checkOut: "09:25",
      duration: "2h 10m",
      workoutType: "Cardio + Upper Body",
      notes: "New personal best on bench press",
    },
    {
      id: 3,
      date: "2025-08-16",
      checkIn: "19:00",
      checkOut: "20:30",
      duration: "1h 30m",
      workoutType: "HIIT",
      notes: "High intensity interval training",
    },
    {
      id: 4,
      date: "2025-08-15",
      checkIn: "06:45",
      checkOut: "08:45",
      duration: "2h 00m",
      workoutType: "Full Body",
      notes: "Complete workout routine",
    },
    {
      id: 5,
      date: "2025-08-14",
      checkIn: "17:45",
      checkOut: "19:15",
      duration: "1h 30m",
      workoutType: "Cardio",
      notes: "Treadmill and cycling",
    },
    {
      id: 6,
      date: "2025-08-12",
      checkIn: "18:15",
      checkOut: "20:00",
      duration: "1h 45m",
      workoutType: "Upper Body",
      notes: "Focus on chest and shoulders",
    },
    {
      id: 7,
      date: "2025-08-11",
      checkIn: "07:30",
      checkOut: "09:00",
      duration: "1h 30m",
      workoutType: "Strength Training",
      notes: "Deadlifts and squats",
    },
    {
      id: 8,
      date: "2025-08-09",
      checkIn: "19:30",
      checkOut: "21:15",
      duration: "1h 45m",
      workoutType: "Lower Body",
      notes: "Leg day completed",
    },
    {
      id: 9,
      date: "2025-08-08",
      checkIn: "06:30",
      checkOut: "08:45",
      duration: "2h 15m",
      workoutType: "Full Body + Cardio",
      notes: "Extended morning session",
    },
    {
      id: 10,
      date: "2025-08-07",
      checkIn: "18:00",
      checkOut: "19:45",
      duration: "1h 45m",
      workoutType: "Core + Cardio",
      notes: "Focused on core strength",
    },
  ];

  const currentData = attendanceSummary[filterPeriod];

  const getWorkoutTypeColor = (type) => {
    const colors = {
      "Strength Training": "bg-red-100 text-red-700 border-red-200",
      Cardio: "bg-blue-100 text-blue-700 border-blue-200",
      HIIT: "bg-orange-100 text-orange-700 border-orange-200",
      "Full Body": "bg-purple-100 text-purple-700 border-purple-200",
      "Upper Body": "bg-green-100 text-green-700 border-green-200",
      "Lower Body": "bg-yellow-100 text-yellow-700 border-yellow-200",
      "Core + Cardio": "bg-pink-100 text-pink-700 border-pink-200",
      "Cardio + Upper Body": "bg-indigo-100 text-indigo-700 border-indigo-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Attendance
            </h1>
            <p className="text-gray-600">
              Track your gym visits and workout progress.
            </p>
          </div>

          <div className="flex gap-3">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="thisMonth">This Month</option>
              <option value="thisYear">This Year</option>
            </select>

            <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Attendance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Calendar className="w-5 h-5 text-blue-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-500">
                Total Visits
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {currentData.totalVisits}
            </p>
            <p className="text-sm text-gray-600">
              {filterPeriod === "thisMonth" ? "This month" : "This year"}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 text-green-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-500">Total Hours</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {currentData.totalHours}h
            </p>
            <p className="text-sm text-gray-600">
              Average: {currentData.averageDuration}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Flame className="w-5 h-5 text-orange-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-500">
                Current Streak
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {currentData.currentStreak}
            </p>
            <p className="text-sm text-gray-600">
              Best: {currentData.longestStreak} days
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-purple-500 mr-2" />
              <h3 className="text-sm font-medium text-gray-500">
                Weekly Average
              </h3>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {currentData.averagePerWeek}
            </p>
            <p className="text-sm text-gray-600">visits per week</p>
          </div>
        </div>

        {/* Goals & Milestones Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Goals */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Current Goals
            </h2>
            <div className="space-y-6">
              {goals.map((goal) => (
                <div key={goal.id} className="flex items-start space-x-4">
                  <div className={`${goal.color} p-3 rounded-lg`}>
                    <goal.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {goal.description}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {goal.current}/{goal.target}
                        {goal.type === "hours" ? "h" : ""}
                      </span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${goal.color}`}
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      ></div>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      {goal.progress >= 100
                        ? "Goal completed!"
                        : `${goal.progress}% complete`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Milestones & Achievements
            </h2>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg ${
                    milestone.achieved
                      ? "bg-green-50 border border-green-200"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      milestone.achieved ? "bg-green-100" : "bg-gray-100"
                    }`}
                  >
                    <milestone.icon className={`w-5 h-5 ${milestone.color}`} />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3
                          className={`font-semibold ${
                            milestone.achieved
                              ? "text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {milestone.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            milestone.achieved
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          {milestone.description}
                        </p>
                      </div>

                      {milestone.achieved ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        milestone.progress && (
                          <span className="text-xs text-gray-500">
                            {milestone.progress}%
                          </span>
                        )
                      )}
                    </div>

                    {milestone.achievedDate && (
                      <p className="text-xs text-gray-500 mt-1">
                        Achieved on{" "}
                        {new Date(milestone.achievedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Attendance History */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Check-ins
            </h2>
            <button
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => router.push("/attendance/peak-hours")}
            >
              View Peak Hours →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Check-in
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Check-out
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Workout Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceHistory.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          weekday: "short",
                        })}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-900">
                        {record.checkIn}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-gray-900">
                        {record.checkOut}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Timer className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="font-medium text-gray-900">
                          {record.duration}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getWorkoutTypeColor(
                          record.workoutType
                        )}`}
                      >
                        {record.workoutType}
                      </span>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p
                        className="text-sm text-gray-600 truncate"
                        title={record.notes}
                      >
                        {record.notes}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-2 rounded-md text-sm font-medium transition-colors">
              Load More Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
