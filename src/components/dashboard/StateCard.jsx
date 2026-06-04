import React from "react";
import { Icon } from "@gravity-ui/uikit";

function StateCard({
  icon,
  title,
  value,
  change,
  changeType = "neutral",
}) {
  return (
    <div className="group mt-5 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Icon */}
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5120E2]/10 text-[#5120E2]">
        <Icon data={icon} size={22} />
      </div>

      {/* Title */}
      <p className="text-sm font-medium text-gray-500">
        {title}
      </p>

      {/* Value */}
      <h3 className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
        {value}
      </h3>

      {/* Change */}
      {change && (
        <p
          className={`mt-3 text-sm font-medium ${
            changeType === "positive"
              ? "text-green-600"
              : changeType === "negative"
              ? "text-red-600"
              : "text-gray-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}

export default StateCard;