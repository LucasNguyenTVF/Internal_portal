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
import OrganizationStructure from "./org";

const linkExcel = import.meta.env.VITE_LINK_EXCEL;
const randomId = () => Math.random().toString(36).substr(2, 9);
const parseDataFromAPI = (data: EmployeeDataFromAPI): EmployeeData => {
  if (!data) {
    return {
      id: "",
      account: "",
      position: "",
      line: "",
      fullName: "",
      email: "",
      managerName: "",
    };
  }

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

const transformExcelDataToHierarchy = (excelData) => {
  if (!Array.isArray(excelData) || excelData.length === 0) {
    return { data: [], lines: [] };
  }

  const titleColumn = excelData[0];
  const headers = Object.keys(titleColumn).filter((key) => key !== "__EMPTY");
  const lines = new Set() as Set<string>;
  const departments = new Set() as Set<string>;
  const childOfDepartment = new Set() as Set<string>;
  const subChildOfDepartment = new Set() as Set<string>;

  const parsedData = excelData
    .slice(1)
    .map((row) => {
      const parsedRow = {};

      headers.forEach((key) => {
        const columnName = titleColumn[key];
        const value = row[key];
        if (value !== undefined) {
          parsedRow[columnName] = value;

          if (columnName === "Line" && value !== "None" && value !== "​") {
            lines.add(value);
          }

          if (
            columnName === "Department" &&
            value !== "None" &&
            value !== "​"
          ) {
            departments.add(value);
          }

          if (columnName === "Leader" && value === true && value !== "​") {
            childOfDepartment.add(row["B"]);
          }

          if (columnName === "Team" && value !== "None" && value !== "​") {
            subChildOfDepartment.add(value);
          }
        }
      });

      return parsedRow;
    })
    .filter((row) => Object.keys(row).length > 0) as EmployeeDataFromAPI[];

  return {
    data: parsedData,
    lines: Array.from(lines) as Array<string>,
    departments: Array.from(departments) as Array<string>,
    childOfDepartment: Array.from(childOfDepartment) as Array<string>,
    subChildOfDepartment: Array.from(subChildOfDepartment) as Array<string>,
  };
};

const Homepage = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isShow, setIsShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [employeeList, setEmployeeList] = useState<EmployeeDataFromAPI[]>([]);
  const [anotherEmploytList, setAnotherEmploytList] = useState<
    EmployeeDataFromAPI[]
  >([]);
  const [internalPortalData, setInternalPortalData] = useState<EmployeeNode[]>(
    []
  );
  const [lines, setLines] = useState<string[]>([]);
  const [leaderships, setLeaderShips] = useState<EmployeeData[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<EmployeeNode[]>(
    []
  );
  const [department, setDepartment] = useState<string[]>([]);
  const [childOfDepartment, setChildOfDepartment] = useState<string[]>([]);
  const [subChildOfDepartment, setSubChildOfDepartment] = useState<string[]>(
    []
  );
  const [projects, setProjects] = useState<string[]>([]);
  const [uniqueData, setUniqueData] = useState<EmployeeNode[]>([
    {
      expanded: true,
      type: "block",
      data: {
        nameBlock: "Global",
        id: randomId(),
      },
      children: [],
    },
  ]);

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

      setDepartment(transformedEmployeeData.departments || []);
      setChildOfDepartment(transformedEmployeeData.childOfDepartment || []);
      setSubChildOfDepartment(
        transformedEmployeeData.subChildOfDepartment || []
      );

      setAnotherEmploytList(transformedEmployeeData.data);
      adoptChildToParent();
      // const employeeHierarchy = buildEmployeeHierarchy(
      //   transformedEmployeeData.data
      // );

      // const leaderships = employeeHierarchy.leaderships.map((item) => {
      //   return parseDataFromAPI(item);
      // });

      // setLeaderShips(leaderships);
      // setInternalPortalData(employeeHierarchy.data);
    }
  }, [employeeList]);

  const adoptChildToParent = () => {
    const data = [];

    // init data department
    department.forEach((dept) => {
      const departmentNode = {
        expanded: true,
        type: "block",
        data: {
          nameBlock: dept,
          id: randomId(),
        },
        children: constructDataForDepartment(dept),
      };
      data.push(departmentNode);
    });

    setUniqueData([
      {
        expanded: true,
        type: "block",
        data: {
          nameBlock: "Global",
          id: randomId(),
        },
        children: data,
      },
    ]);
  };

  const constructDataForDepartment = (dept: string) => {
    const data = [];

    if (anotherEmploytList.length > 0) {
      anotherEmploytList.forEach((employee) => {
        if (employee["Department"] === dept && employee["Leader"] === true) {
          console.log("employee", employee);
          const employeeNode = {
            expanded: true,
            type: "person",
            data: parseDataFromAPI(employee),
            children: constructDataForTeams(employee["Team"]),
          };
          data.push(employeeNode);
        }
      });
    }

    return data;
  };

  const constructDataForTeams = (child: string) => {
    const data = [];

    subChildOfDepartment.forEach((team) => {
      if (team === child) {
        const teamNode = {
          expanded: true,
          type: "block",
          data: {
            nameBlock: team,
            id: randomId(),
          },
          children: constructDataForLines(team),
        };
        data.push(teamNode);
      }
    });
    return data;
  };

  const constructDataForLines = (project: string) => {
    const data = [];

    lines.forEach((line) => {
      if (project === "Delivery") {
        const lineNode = {
          expanded: true,
          type: "block",
          data: {
            nameBlock: line,
            id: randomId(),
          },
          children: constructDataForProjects(line),
        };
        data.push(lineNode);
      }
    });
    return data;
  };

  const constructDataForProjects = (project: string) => {
    const data = [];

    if (anotherEmploytList.length === 0) {
      return data;
    }

    anotherEmploytList.forEach((empl) => {
      if (empl["Line"] === project) {
        const projectNode = {
          expanded: true,
          type: "person",
          data: parseDataFromAPI(empl),
          children: [],
        };
        data.push(projectNode);
      }
    });
    return data;
  };

  const openSubMenu = (subMenu: any) => {
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
      <div className="min-h-screen p-4 md:p-12 overflow-auto">
        <Information
          subMenu={selectedMenu}
          openSubMenu={openSubMenu}
          lines={lines}
          leaderships={leaderships}
        />
        <OrganizationChart data={uniqueData} />
      </div>
    </div>
  );
};

export default Homepage;
