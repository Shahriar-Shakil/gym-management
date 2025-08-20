"use client";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  Copy,
  CreditCard,
  ExternalLink,
  Hash,
  Phone,
  XCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckInPage() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [userName, setUserName] = useState("");

  const handleCheckIn = () => {
    if (!userName.trim()) {
      alert("Please enter your name first");
      return;
    }

    const currentTime = new Date();
    setCheckInTime(currentTime);
    setIsCheckedIn(true);
    setCheckOutTime(null);
  };

  const handleCheckOut = () => {
    const currentTime = new Date();
    setCheckOutTime(currentTime);
    setIsCheckedIn(false);
  };

  const formatTime = (date) => {
    if (!date) return "--:--";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date) => {
    if (!date) return "--/--/----";
    return date.toLocaleDateString();
  };

  const calculateDuration = () => {
    if (!checkInTime || !checkOutTime) return "--:--";
    const diff = checkOutTime - checkInTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* User Info Card */}
        <Card className="shadow-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold">
              Check In/Out
            </CardTitle>
            <CardDescription>Track your daily attendance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Your Name</Label>
              <Input
                id="userName"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                disabled={isCheckedIn}
                className="text-center"
              />
            </div>
          </CardContent>
        </Card>

        {/* Status Card */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              {/* Status Badge */}
              <div className="flex justify-center">
                <Badge
                  variant={isCheckedIn ? "default" : "secondary"}
                  className="px-4 py-2 text-sm font-medium"
                >
                  {isCheckedIn ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Checked In
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Checked Out
                    </>
                  )}
                </Badge>
              </div>

              {/* Current Time */}
              <div className="text-2xl font-bold text-gray-900">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </div>

              <div className="text-sm text-gray-500 flex items-center justify-center">
                <CalendarDays className="w-4 h-4 mr-1" />
                {new Date().toLocaleDateString()}
              </div>

              {/* Check In/Out Button */}
              <div className="pt-4">
                {!isCheckedIn ? (
                  <Button
                    onClick={handleCheckIn}
                    className="w-full py-6 text-lg font-semibold"
                    size="lg"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Check In
                  </Button>
                ) : (
                  <Button
                    onClick={handleCheckOut}
                    variant="destructive"
                    className="w-full py-6 text-lg font-semibold"
                    size="lg"
                  >
                    <XCircle className="w-5 h-5 mr-2" />
                    Check Out
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Summary Card */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Today's Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Check In</div>
                <div className="font-semibold flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(checkInTime)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Check Out</div>
                <div className="font-semibold flex items-center justify-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTime(checkOutTime)}
                </div>
              </div>
            </div>

            {checkOutTime && (
              <div className="text-center pt-2 border-t">
                <div className="text-sm text-gray-500 mb-1">Total Duration</div>
                <div className="text-lg font-bold text-green-600">
                  {calculateDuration()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
