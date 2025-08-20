"use client";

import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  LogIn,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const router = useRouter();

  // Mock data
  const membershipData = {
    status: "Active",
    plan: "Premium Monthly",
    expiryDate: "2025-09-15",
    memberSince: "2024-01-15",
  };

  const paymentData = {
    nextDue: "2025-09-15",
    amount: 1200,
    currency: "BDT",
  };

  const attendanceData = {
    thisMonth: 18,
    lastCheckin: "2025-08-19 18:30",
    streak: 5,
    recentCheckins: [
      { date: "2025-08-19", time: "18:30", duration: "1h 45m" },
      { date: "2025-08-18", time: "07:15", duration: "2h 10m" },
      { date: "2025-08-16", time: "19:00", duration: "1h 30m" },
      { date: "2025-08-15", time: "06:45", duration: "2h 00m" },
    ],
  };

  const notifications = [
    {
      id: 1,
      type: "warning",
      message: "Membership expires in 26 days",
      time: "2h ago",
    },
    {
      id: 2,
      type: "info",
      message: "New workout plan assigned by trainer",
      time: "1d ago",
    },
    {
      id: 3,
      type: "success",
      message: "Payment received - Thank you!",
      time: "5d ago",
    },
  ];

  const quickActions = [
    {
      title: "Check In",
      icon: LogIn,
      href: "/check-in",
      color: "bg-green-500",
    },
    {
      title: "Book Slot",
      icon: Calendar,
      href: "/book-slot",
      color: "bg-blue-500",
    },
    {
      title: "View Plan",
      icon: Activity,
      href: "/trainer-plan",
      color: "bg-purple-500",
    },
    {
      title: "Pay Dues",
      icon: CreditCard,
      href: "/payments",
      color: "bg-orange-500",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-600 bg-green-50";
      case "expired":
        return "text-red-600 bg-red-50";
      case "pending":
        return "text-yellow-600 bg-yellow-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-blue-500" />;
    }
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(membershipData.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back! Here's your gym overview.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Membership & Payment Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Membership & Billing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Membership Status */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Status
                  </span>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      membershipData.status
                    )}`}
                  >
                    {membershipData.status}
                  </div>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {membershipData.plan}
                  </p>
                  <p className="text-sm text-gray-600">
                    Member since{" "}
                    {new Date(membershipData.memberSince).toLocaleDateString()}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Expires in</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {daysUntilExpiry} days
                  </p>
                </div>
              </div>

              {/* Next Payment */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Next Payment
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {paymentData.currency} {paymentData.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Due on {new Date(paymentData.nextDue).toLocaleDateString()}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <button
                    className="w-full bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    onClick={() => router.push("/payments")}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance & Activity Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Attendance & Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* This Month Stats */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    This Month
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">
                    {attendanceData.thisMonth} visits
                  </p>
                  <p className="text-sm text-gray-600">
                    Average:{" "}
                    {Math.round(
                      (attendanceData.thisMonth / new Date().getDate()) * 100
                    ) / 100}{" "}
                    per day
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-sm text-gray-500">Current streak</p>
                  <p className="text-lg font-semibold text-blue-600">
                    {attendanceData.streak} days
                  </p>
                </div>
              </div>

              {/* Last Check-in */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium text-gray-500">
                    Last Check-in
                  </span>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">Yesterday</p>
                  <p className="text-sm text-gray-600">
                    at {attendanceData.lastCheckin.split(" ")[1]}
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <button
                    className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                    onClick={() => router.push("/check-in")}
                  >
                    Check In Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(action.href)}
                >
                  <div
                    className={`w-10 h-10 ${action.color} rounded-full flex items-center justify-center mb-2`}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Attendance */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Attendance
              </h3>
              <a
                href="/attendance"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </a>
            </div>
            <div className="space-y-3">
              {attendanceData.recentCheckins.map((checkin, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(checkin.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-600">{checkin.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">
                      {checkin.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Notifications
              </h3>
              <a
                href="/notifications"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all
              </a>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
