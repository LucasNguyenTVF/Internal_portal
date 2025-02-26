import React, { memo } from "react";
import { EmployeeData } from "../interfaces/employee";
import InteractiveGradientButton from "./Button";

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
}: InformationProps) => {
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
      <p className="text-lg lg:text-2xl font-bold my-8 text-white">
        Da Nang Delivery Excellence Center
      </p>
    </div>
  );
};

export default memo(Information);
