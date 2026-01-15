"use client";

import { useState } from "react";
import { Icon } from "@phosphor-icons/react";

interface ServiceCardProps {
  icon: Icon;
  title: string;
  shortTitle: string;
  description: string;
}

export function ServiceCard({
  icon: IconComponent,
  title,
  shortTitle,
  description,
}: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className="group relative border border-blue-bg-blue-950/10 dark:border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={toggleExpanded}
    >
      <div
        className={`transition-all duration-300 ${
          isExpanded
            ? "opacity-0 -translate-y-4"
            : "group-hover:opacity-0 group-hover:-translate-y-4"
        }`}
      >
        <div className="bg-primary/10 p-4 rounded-full mb-4 justify-center flex">
          <IconComponent size={92} weight="duotone" className="text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div
        className={`absolute inset-0 p-6 flex flex-col items-center justify-center bg-blue-950 text-white transition-all duration-300 ${
          isExpanded
            ? "opacity-100 scale-100"
            : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
        }`}
      >
        <h4 className="font-bold text-lg text-primary mb-2">{shortTitle}</h4>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
}
