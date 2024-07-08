"use client";
import React, { useState } from "react";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export default function ComboBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFrameworks = frameworks.filter((framework) =>
    framework.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative w-[200px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {selectedFramework ? selectedFramework.label : "Select framework..."}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M7 7l3-3 3 3m0 6l-3 3-3-3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <input
            type="text"
            placeholder="Search framework..."
            className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto">
            {filteredFrameworks.map((framework) => (
              <li
                key={framework.value}
                onClick={() => {
                  setSelectedFramework(framework);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                className="px-4 py-2 cursor-pointer hover:bg-blue-50"
              >
                {framework.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
