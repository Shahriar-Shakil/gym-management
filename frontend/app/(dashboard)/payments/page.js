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

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    amount: "",
    senderNumber: "",
    referenceNumber: "",
    notes: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  // Mock payment history data
  const paymentHistory = [
    {
      id: "PAY001",
      date: "2024-08-15",
      amount: 2500,
      method: "Bkash",
      status: "completed",
      reference: "BKS23456789",
      description: "Monthly Gym Membership - August 2024",
    },
    {
      id: "PAY002",
      date: "2024-07-15",
      amount: 2500,
      method: "Bkash",
      status: "completed",
      reference: "BKS12345678",
      description: "Monthly Gym Membership - July 2024",
    },
    {
      id: "PAY003",
      date: "2024-06-20",
      amount: 1500,
      method: "Bkash",
      status: "pending",
      reference: "BKS98765432",
      description: "Personal Training Session",
    },
    {
      id: "PAY004",
      date: "2024-06-15",
      amount: 2500,
      method: "Bkash",
      status: "completed",
      reference: "BKS11223344",
      description: "Monthly Gym Membership - June 2024",
    },
    {
      id: "PAY005",
      date: "2024-05-15",
      amount: 2500,
      method: "Bkash",
      status: "failed",
      reference: "BKS55667788",
      description: "Monthly Gym Membership - May 2024",
    },
  ];

  // Bkash payment numbers
  const bkashNumbers = [
    { number: "01712-345678", name: "Main Account" },
    { number: "01823-456789", name: "Backup Account" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus("submitting");

    // Simulate API call
    setTimeout(() => {
      setSubmitStatus("success");
      setFormData({
        amount: "",
        senderNumber: "",
        referenceNumber: "",
        notes: "",
      });

      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const getStatusBadge = (status) => {
    const variants = {
      completed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };

    const icons = {
      completed: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      failed: <XCircle className="w-3 h-3" />,
    };

    return (
      <Badge className={`${variants[status]} flex items-center gap-1`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Payment Center</h1>
          <p className="text-gray-600">Manage your gym membership payments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Bkash Payment Numbers */}
            <Card className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Phone className="w-5 h-5" />
                  Bkash Payment Numbers
                </CardTitle>
                <CardDescription className="text-pink-100">
                  Send money to any of these numbers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bkashNumbers.map((account, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-lg p-4 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-lg">
                          {account.number}
                        </p>
                        <p className="text-sm text-pink-100">{account.name}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                        onClick={() => copyToClipboard(account.number)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Submit Payment Details
                </CardTitle>
                <CardDescription>
                  After sending money via Bkash, fill out this form to confirm
                  your payment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (BDT)</Label>
                      <Input
                        id="amount"
                        name="amount"
                        type="number"
                        placeholder="2500"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="senderNumber">Your Bkash Number</Label>
                      <Input
                        id="senderNumber"
                        name="senderNumber"
                        type="tel"
                        placeholder="01712-345678"
                        value={formData.senderNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referenceNumber">
                      Transaction Reference/TrxID
                    </Label>
                    <Input
                      id="referenceNumber"
                      name="referenceNumber"
                      type="text"
                      placeholder="BKS12345678"
                      value={formData.referenceNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      name="notes"
                      type="text"
                      placeholder="Monthly membership payment"
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>

                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      Payment details submitted successfully! We'll verify and
                      update your account.
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={submitStatus === "submitting"}
                  >
                    {submitStatus === "submitting"
                      ? "Submitting..."
                      : "Submit Payment Details"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Payment History */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5" />
                  Payment History
                </CardTitle>
                <CardDescription>
                  Your recent payment transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Hash className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-sm">
                          {payment.id}
                        </span>
                      </div>
                      {getStatusBadge(payment.status)}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-semibold text-lg">
                          ৳{payment.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Date:</span>
                        <span>
                          {new Date(payment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Reference:</span>
                        <span className="font-mono text-sm">
                          {payment.reference}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        {payment.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All Transactions
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
