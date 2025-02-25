import React, { useCallback, useRef } from "react";
import { Avatar } from "./components/Avatar";
import { EmployeeData } from "../interfaces/employee";
import InfoDetailModal, { ModalRef } from "../modal/InfoDetailModal";

interface EmployeeDirectoryProps {
  employees: EmployeeData[];
  reportTo: string;
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const EmployeeDirectory: React.FC<EmployeeDirectoryProps> = ({
  employees,
  reportTo,
}) => {
  return (
    <div className="w-full p-2 text-white h-fit">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((employee) =>
            DisplayEmployeeInfo(employee, getInitials)
          )}
        </div>
      </div>
    </div>
  );
};

export const DisplayEmployeeInfo = (
  employee: EmployeeData,
  getInitials: (name: string) => string
): React.JSX.Element => {
  const detailModalRef = useRef<ModalRef>(null);

  const onClickDetail = useCallback(
    (data: EmployeeData) => () => {
      detailModalRef?.current?.showModal(data);
    },
    []
  );

  return (
    <div
      key={employee.id}
      className="bg-[linear-gradient(90deg,_#03081A_0%,_#012756_100%)] border shadow-md border-gray-800 rounded-lg px-1.5 py-2 hover:bg-gray-750 transition-colors w-full sm:w-auto"
      onClick={() => onClickDetail(employee)}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="sm:w-auto">
          <Avatar
            src={employee.image}
            alt={employee.fullName}
            fallback={getInitials(employee.fullName)}
          />
        </div>

        <div className="min-w-0 flex-1 w-full">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-xs text-white truncate w-full">
              {employee.account}
            </span>
            <p className="text-[10px] text-[#2A88FF] truncate w-full">
              {employee.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
