import React, { memo } from "react";
import { EmployeeData } from "../interfaces/employee";

interface InformationProps {
  subMenu: string;
  openSubMenu: (buttonText: string) => void;
  lines: string[];
  leaderships: EmployeeData[];
}

const Information = ({
  subMenu,
  openSubMenu,
  lines,
  leaderships,
}: // targets,
InformationProps) => {
  return (
    <div>
      <p className="text-sm md:text-lg lg:text-xl xl:text-2xl text-white font-medium leading-7 md:leading-10 text-left w-full lg:w-[90%]">
        Welcome to the heart of D3 TECHVIFY Software, where our dedicated team
        of professionals combines technical excellence with innovative thinking
        to drive outstanding solutions and collaborations.
      </p>
      <p className="text-xs md:text-lg py-4 text-left w-[90%] text-white">
        Each member plays a crucial role in shaping our success, fostering a
        culture of creativity, expertise, and teamwork.
      </p>

      {/* <div className="flex justify-center gap-4 mb-10">
       
        <div className="bg-gray-700 text-white px-4 py-2 rounded-md">
          Man-months: 22
        </div>
        <div className="bg-gray-700 text-white px-4 py-2 rounded-md">
          Total Members: 36
        </div>
      </div> */}
      <p className="text-lg lg:text-2xl font-bold my-8 text-white">
        D3 Delivery Manager
      </p>
      <div className="flex flex-row justify-center gap-2 md:gap-6 mb-10">
        {leaderships.map((profile, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
          >
            <div className="bg-gray-200 w-32 sm:w-46 md:w-56 h-32 sm:h-46 md:56">
              <img
                src={profile.image}
                alt={profile.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-2 md:p-4 text-center">
              <p className="text-xs md:text-lg font-semibold mb-1">
                {profile.account}
              </p>
              <p className="text-xs lg:text-sm text-white">
                {profile.position}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
        {lines.map((buttonText, index) => {
          const isSelected = buttonText === subMenu;
          return (
            <button
              key={index}
              className={`z-0  ${
                isSelected ? "transform scale-120" : ""
              } px-2 sm-px-4 md:px-6 py-2 rounded-md transition duration-300 ease-in-out bg-[linear-gradient(90deg,_#0062BA_0%,_#009BDE_100%)] transform hover:scale-110`}
              onClick={() => openSubMenu(buttonText)}
            >
              <span className="text-xs sm:text-sm md:text-lg text-white">
                {buttonText}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Information);
