"use client";

import { Check, CheckCircle2, Crown, Star, Users, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MembershipPage = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Mock current membership data
  const currentMembership = {
    id: "MB-2024-001",
    plan: "Premium Monthly",
    status: "Active",
    startDate: "2024-01-15",
    expiryDate: "2025-09-15",
    autoRenew: true,
    price: 1200,
    currency: "BDT",
  };

  // Mock available plans
  const availablePlans = [
    {
      id: "basic",
      name: "Basic",
      price: 800,
      duration: "Monthly",
      popular: false,
      features: [
        "Gym access during off-peak hours",
        "Basic equipment usage",
        "Locker facility",
        "Free fitness assessment",
      ],
      restrictions: [
        "No personal trainer sessions",
        "Limited peak hours access",
        "No group classes",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: 1200,
      duration: "Monthly",
      popular: true,
      features: [
        "24/7 gym access",
        "All equipment access",
        "Locker + towel service",
        "2 personal trainer sessions/month",
        "Group fitness classes",
        "Nutrition consultation",
        "Guest pass (2/month)",
      ],
      restrictions: [],
    },
    {
      id: "vip",
      name: "VIP Elite",
      price: 2000,
      duration: "Monthly",
      popular: false,
      features: [
        "24/7 premium gym access",
        "All equipment + VIP area",
        "Premium locker + amenities",
        "Unlimited personal trainer sessions",
        "All group classes + exclusive sessions",
        "Nutrition + meal planning",
        "Unlimited guest passes",
        "Massage therapy (2/month)",
        "Priority booking",
        "Free supplements",
      ],
      restrictions: [],
    },
  ];

  // Mock membership history
  const membershipHistory = [
    {
      id: 1,
      plan: "Premium Monthly",
      startDate: "2024-01-15",
      endDate: "2025-09-15",
      status: "Active",
      amount: 1200,
      paymentDate: "2024-08-15",
    },
    {
      id: 2,
      plan: "Basic Monthly",
      startDate: "2023-06-01",
      endDate: "2024-01-14",
      status: "Completed",
      amount: 800,
      paymentDate: "2023-12-15",
    },
    {
      id: 3,
      plan: "Premium Monthly",
      startDate: "2023-01-01",
      endDate: "2023-05-31",
      status: "Completed",
      amount: 1200,
      paymentDate: "2023-04-30",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "text-green-600 bg-green-50 border-green-200";
      case "expired":
        return "text-red-600 bg-red-50 border-red-200";
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "completed":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getPlanIcon = (planName) => {
    if (planName.toLowerCase().includes("vip"))
      return <Crown className="w-5 h-5" />;
    if (planName.toLowerCase().includes("premium"))
      return <Star className="w-5 h-5" />;
    return <Users className="w-5 h-5" />;
  };

  const daysRemaining = Math.ceil(
    (new Date(currentMembership.expiryDate) - new Date()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Membership</h1>
          <p className="text-gray-600">
            Manage your gym membership and explore available plans.
          </p>
        </div>

        {/* Current Membership Status */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Current Membership
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Membership Details */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-500">
                      Status
                    </span>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        currentMembership.status
                      )}`}
                    >
                      {currentMembership.status}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Current Plan</p>
                    <div className="flex items-center mt-1">
                      {getPlanIcon(currentMembership.plan)}
                      <p className="text-xl font-bold text-gray-900 ml-2">
                        {currentMembership.plan}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Member ID</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentMembership.id}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(
                        currentMembership.startDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Expiry Date</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(
                        currentMembership.expiryDate
                      ).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-orange-600 font-medium">
                      {daysRemaining > 0
                        ? `${daysRemaining} days remaining`
                        : "Expired"}
                    </p>
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        currentMembership.autoRenew
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-600">
                      Auto-renewal{" "}
                      {currentMembership.autoRenew ? "enabled" : "disabled"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                  onClick={() => router.push("/payments")}
                >
                  Renew Membership
                </button>
                <button
                  className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md text-sm font-medium transition-colors"
                  onClick={() => setSelectedPlan("upgrade")}
                >
                  Upgrade Plan
                </button>
                <button className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                  Toggle Auto-Renewal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Available Plans */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Available Plans
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {availablePlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative border rounded-lg p-6 transition-all hover:shadow-md ${
                  plan.popular
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-gray-200"
                } ${
                  currentMembership.plan
                    .toLowerCase()
                    .includes(plan.name.toLowerCase())
                    ? "bg-green-50 border-green-300"
                    : "bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {currentMembership.plan
                  .toLowerCase()
                  .includes(plan.name.toLowerCase()) && (
                  <div className="absolute -top-3 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Current Plan
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    {getPlanIcon(plan.name)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ৳{plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-600">
                      /{plan.duration.toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">
                      Includes:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.restrictions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">
                        Not included:
                      </h4>
                      <ul className="space-y-2">
                        {plan.restrictions.map((restriction, index) => (
                          <li key={index} className="flex items-start">
                            <X className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-500">
                              {restriction}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    currentMembership.plan
                      .toLowerCase()
                      .includes(plan.name.toLowerCase())
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
                  }`}
                  disabled={currentMembership.plan
                    .toLowerCase()
                    .includes(plan.name.toLowerCase())}
                  onClick={() =>
                    !currentMembership.plan
                      .toLowerCase()
                      .includes(plan.name.toLowerCase()) &&
                    setSelectedPlan(plan)
                  }
                >
                  {currentMembership.plan
                    .toLowerCase()
                    .includes(plan.name.toLowerCase())
                    ? "Current Plan"
                    : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Membership History */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Membership History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Duration
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-sm">
                    Last Payment
                  </th>
                </tr>
              </thead>
              <tbody>
                {membershipHistory.map((membership) => (
                  <tr
                    key={membership.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {getPlanIcon(membership.plan)}
                        <span className="ml-2 font-medium text-gray-900">
                          {membership.plan}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">
                      <div className="text-sm">
                        <p>
                          {new Date(membership.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500">
                          to {new Date(membership.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          membership.status
                        )}`}
                      >
                        {membership.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      ৳{membership.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-gray-600 text-sm">
                      {new Date(membership.paymentDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
