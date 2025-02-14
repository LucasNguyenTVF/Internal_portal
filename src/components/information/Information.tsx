import React, { memo } from "react";
import { EmployeeData } from "../interfaces/employee";

interface InformationProps {
  openSubMenu: (buttonText: string) => void;
  lines: string[];
  leaderships: EmployeeData[];
  targets: { columnName: string; value: string }[];
}

const Information = ({
  openSubMenu,
  lines,
  leaderships,
  targets,
}: InformationProps) => {
  return (
    <div>
      <div className="flex justify-center gap-4 mb-10">
        {targets.length > 0 &&
          targets.map((targetItem, index) => {
            return (
              <div
                key={index}
                className="bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                <span>
                  {targetItem.columnName}: {targetItem.value}
                </span>
              </div>
            );
          })}
      </div>
      <div className="flex justify-center gap-6 flex-wrap mb-10">
        {leaderships.map((profile, index) => (
          <div
            key={index}
            className="w-56 border border-gray-300 rounded-lg overflow-hidden shadow-md"
          >
            <div className="bg-gray-200 items-center justify-center">
              <img
                src={profile.image}
                alt={profile.fullName}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold mb-1">{profile.account}</h3>
              <p className="text-gray-600">{profile.position}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {lines.map((buttonText, index) => (
          <button
            key={index}
            className="min-w-[120px] px-6 py-2  rounded-md transition duration-300 ease-in-out bg-[linear-gradient(90deg,_#0062BA_0%,_#009BDE_100%)] transform hover:scale-110"
            onClick={() => openSubMenu(buttonText)}
          >
            <span className="text-white">{buttonText}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(Information);
