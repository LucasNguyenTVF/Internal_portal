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
    <div className="w-full p-6 bg-gray-900 text-white h-fit">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg font-medium mb-6">
          People reporting to {reportTo}
        </h2>

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
      className="bg-gray-800 rounded-lg p-3 border border-gray-700 hover:bg-gray-750 transition-colors w-full sm:w-auto"
      onClick={() => onClickDetail(employee)}
    >
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-shrink-0 w-16 sm:w-auto">
          <Avatar
            src={employee.image}
            alt={employee.fullName}
            fallback={getInitials(employee.fullName)}
          />
        </div>

        <div className="min-w-0 flex-1 w-full">
          <div className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left">
            <span className="text-sm text-gray-400 truncate w-full">
              {employee.account}
            </span>
            <p className="text-xs text-gray-400 truncate w-full">
              {employee.position}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
