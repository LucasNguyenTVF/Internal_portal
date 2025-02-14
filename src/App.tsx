import React, { useState } from "react";
import "./App.css";
import OrganizationChart from "./components/chart/OrganizationChart";
import Header from "./components/header/Header";
import Information from "./components/information/Information";
import { useEffect } from "react";
import * as xlsx from "xlsx";
import {
  EmployeeData,
  EmployeeDataFromAPI,
  EmployeeNode,
} from "./components/interfaces/employee";

const linkExcel = import.meta.env.VITE_LINK_EXCEL;

const transformExcelDataToHierarchy = (excelData) => {
  if (!Array.isArray(excelData) || excelData.length === 0) {
    return { data: [], lines: [] };
  }

  const titleColumn = excelData[0];
  const headers = Object.keys(titleColumn).filter((key) => key !== "__EMPTY");
  const lines = new Set() as Set<string>;

  const parsedData = excelData
    .slice(1)
    .map((row) => {
      const parsedRow = {};

      headers.forEach((key) => {
        const columnName = titleColumn[key];
        const value = row[key];
        if (value !== undefined) {
          parsedRow[columnName] = value;

          if (columnName === "Line" && value !== "None") {
            lines.add(value);
          }
        }
      });

      return parsedRow;
    })
    .filter((row) => Object.keys(row).length > 0) as EmployeeDataFromAPI[];

  return { data: parsedData, lines: Array.from(lines) as Array<string> };
};

const parseDataFromAPI = (data: EmployeeDataFromAPI): EmployeeData => {
  return {
    id: data?.ID,
    image: data?.Image,
    account: data?.Account,
    position: data?.Position,
    line: data?.Line,
    fullName: data?.Fullname,
    email: data?.Email,
    managerName: data?.ManagerName,
  };
};

const buildEmployeeHierarchy = (flatData: EmployeeDataFromAPI[]) => {
  const idMap = new Map<string, EmployeeNode>();
  const rootNodes: EmployeeNode[] = [];

  flatData.forEach((item: EmployeeDataFromAPI) => {
    idMap.set(item.ID, {
      expanded: true,
      type: "person",
      data: parseDataFromAPI(item),
      children: [],
    });
  });

  flatData.forEach((item: EmployeeDataFromAPI) => {
    const node = idMap.get(item.ID);
    if (item.ManagerId === "None") {
      if (node) {
        rootNodes.push(node);
      }
    } else {
      const parent = idMap.get(item.ManagerId);
      if (parent && node) {
        parent.children.push(node);
      }
    }
  });

  const leaderships = flatData.filter(
    (item: EmployeeDataFromAPI) => !!item.Leadership
  ) as EmployeeDataFromAPI[];

  return {
    leaderships,
    data: rootNodes,
  };
};

const Homepage = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isShow, setIsShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [employeeList, setEmployeeList] = useState<EmployeeDataFromAPI[]>([]);
  const [internalPortalData, setInternalPortalData] = useState<EmployeeNode[]>(
    []
  );
  const [lines, setLines] = useState<string[]>([]);
  const [leaderships, setLeaderShips] = useState<EmployeeData[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeNode[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(linkExcel);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = xlsx.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames;
        const listEmployee = sheetName[0];
        const worksheet = workbook.Sheets[listEmployee];
        const jsonData: EmployeeDataFromAPI[] =
          xlsx.utils.sheet_to_json(worksheet);
        setEmployeeList(jsonData);
      } catch (error) {
        console.error("Error fetching or parsing the Excel file:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (employeeList.length > 0) {
      const transformedEmployeeData =
        transformExcelDataToHierarchy(employeeList);
      const { lines } = transformedEmployeeData;
      setLines(lines);
      const employeeHierarchy = buildEmployeeHierarchy(
        transformedEmployeeData.data
      );
      const leaderships = employeeHierarchy.leaderships.map((item) => {
        return parseDataFromAPI(item);
      });
      setLeaderShips(leaderships);
      setInternalPortalData(employeeHierarchy.data);
    }
  }, [employeeList]);

  const openSubMenu = (subMenu) => {
    if (selectedMenu === subMenu) {
      setIsShow(!isShow);
      return;
    }
    setLoading(true);
    const selectedInternalPortalData = internalPortalData.filter(
      (item) => item.data.line === subMenu
    );
    if (selectedInternalPortalData.length === 0) {
      setIsShow(false);
      setLoading(false);
      return;
    }
    setSelectedEmployees(selectedInternalPortalData);
    setSelectedMenu(subMenu);
    setIsShow(true);
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen p-4 md:p-12">
        <Information
          subMenu={selectedMenu}
          openSubMenu={openSubMenu}
          lines={lines}
          leaderships={leaderships}
        />
        {isShow && !loading && <OrganizationChart data={selectedEmployees} />}
      </div>
    </div>
  );
};

export default Homepage;
