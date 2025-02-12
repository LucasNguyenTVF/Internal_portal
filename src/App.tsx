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

const convertListTargetToUsableData = (listTarget) => {
  if (!Array.isArray(listTarget) || listTarget.length === 0) {
    return [];
  }
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
    if (item.MemberOf === "None") {
      if (node) {
        rootNodes.push(node);
      }
    } else {
      const parent = idMap.get(item.MemberOf);
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
  const [selectedMenu, setSelectedMenu] = useState("Line JP++");
  const [isShow, setIsShow] = React.useState(false);

  const [employeeList, setEmployeeList] = useState<EmployeeDataFromAPI[]>([]);
  const [targetList, setTargetList] = useState([]);
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
        // const listTarget = sheetName[1];

        // const worksheetTarget = workbook.Sheets[listTarget];
        // const jsonDataTarget = xlsx.utils.sheet_to_json(worksheetTarget);
        // setTargetList(jsonDataTarget);
        const worksheet = workbook.Sheets[listEmployee];
        const jsonData = xlsx.utils.sheet_to_json(worksheet);

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

      // convert excel target data to primereact data
      const afterconvertTarget = convertListTargetToUsableData(targetList);
    }
  }, [employeeList]);

  const openSubMenu = (subMenu) => {
    if (selectedMenu === subMenu) {
      setIsShow(!isShow);
      return;
    }

    const selectedInternalPortalData = internalPortalData.filter(
      (item) => item.data.line === subMenu
    );

    if (selectedInternalPortalData.length === 0) {
      setIsShow(false);
      return;
    }

    setSelectedEmployees(selectedInternalPortalData);
    setSelectedMenu(subMenu);
    setIsShow(true);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen m-10 p-6">
        <Information
          openSubMenu={openSubMenu}
          lines={lines}
          leaderships={leaderships}
          // targets={targetList}
        />
        {isShow && <OrganizationChart data={selectedEmployees} />}
      </div>
    </div>
  );
};

export default Homepage;
