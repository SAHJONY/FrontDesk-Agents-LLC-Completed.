"use client";

import {
  CheckCircleIcon,
  XCircleIcon,
  PhoneMissedCallIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

type CallStatus = "SUCCESS" | "FAILED" | "MISSED" | "IN_PROGRESS";

type StatusStyle = {
  icon: React.ElementType;
  color: string;
  bg: string;
};

const getStatusStyle = (status: CallStatus): StatusStyle => {
  switch (status) {
    case "SUCCESS":
      return {
        icon: CheckCircleIcon,
        color: "text-green-600",
        bg: "bg-green-50",
      };
    case "FAILED":
      return {
        icon: XCircleIcon,
        color: "text-red-600",
        bg: "bg-red-50",
      };
    case "MISSED":
      return {
        icon: PhoneMissedCallIcon,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    case "IN_PROGRESS":
      return {
        icon: ClockIcon,
        color: "text-blue-600",
        bg: "bg-blue-50",
      };
    default:
      return {
        icon: ClockIcon,
        color: "text-gray-600",
        bg: "bg-gray-50",
      };
  }
};

export default function CallLogPage() {
  const calls: { id: number; status: CallStatus }[] = [
    { id: 1, status: "SUCCESS" },
    { id: 2, status: "FAILED" },
    { id: 3, status: "MISSED" },
    { id: 4, status: "IN_PROGRESS" },
  ];

  return (
    <div className="space-y-4">
      {calls.map((call) => {
        const { icon: Icon, color, bg } = getStatusStyle(call.status);

        return (
          <div
            key={call.id}
            className={`flex items-center gap-3 p-4 rounded-lg ${bg}`}
          >
            <Icon className={`h-6 w-6 ${color}`} />
            <span className="font-medium">{call.status}</span>
          </div>
        );
      })}
    </div>
  );
}
