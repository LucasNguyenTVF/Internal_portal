import React from "react";
import SelectionDemo from "./components/orgchart";
import ScalableDiv from "./components/hover";
import ZoomableView from "./components/view";
import { useEffect } from "react";
import * as xlsx from "xlsx";
import { useState } from "react";

const Homepage = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [targetList, setTargetList] = useState([]);
  const [data, setData] = useState([]);
  const [lines, setLines] = useState([]);
  const [bosses, setBosses] = useState([]);
  const [selection, setSelection] = useState([]);

  const linkExcel = `https://docs.google.com/spreadsheets/d/1cU6HCKqic5LIeiq7xLyWMuinTIEdtQIKxAfNPbGjg4g/edit?gid=0#gid=0`;

  const convertExcelToPrimeReactData = (excelData) => {
    if (!Array.isArray(excelData) || excelData.length === 0) {
      return { data: [], lines: [] };
    }

    const titleColumn = excelData[0];
    const headers = Object.keys(titleColumn).filter((key) => key !== "__EMPTY");
    const lines = new Set();

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
      .filter((row) => Object.keys(row).length > 0);

    return { data: parsedData, lines: Array.from(lines) };
  };

  const convertListTargetToUsableData = (listTarget) => {
    if (!Array.isArray(listTarget) || listTarget.length === 0) {
      return [];
    }

    console.log("listTarget", listTarget);
  };

  const convertToHierarchy = (flatData) => {
    const idMap = new Map();
    const rootNodes = [];

    flatData.forEach((item) => {
      idMap.set(item.ID, {
        expanded: true,
        type: "person",
        data: {
          image: item?.Image
            ? item?.Image
            : "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
          account: item.Account,
          position: item.Position,
          line: item.Line,
          fullName: item.Fullname,
          email: item.Email,
        },
        children: [],
      });
    });

    flatData.forEach((item) => {
      const node = idMap.get(item.ID);
      if (item.MemberOf === "None") {
        rootNodes.push(node);
      } else {
        const parent = idMap.get(item.MemberOf);
        if (parent) {
          parent.children.push(node);
        }
      }
    });

    const bosses = flatData.filter(
      (item) => item.Line === "None" && item.MemberOf === "None"
    );

    return {
      bosses,
      data: rootNodes,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(linkExcel);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = xlsx.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames;
        const listEmployee = sheetName[0];
        const listTarget = sheetName[1];

        const worksheetTarget = workbook.Sheets[listTarget];
        const jsonDataTarget = xlsx.utils.sheet_to_json(worksheetTarget);
        setTargetList(jsonDataTarget);
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
      // convert excel employee data to primereact data
      const afterconvert = convertExcelToPrimeReactData(employeeList);
      const afterToHierarchy = convertToHierarchy(afterconvert.data);
      console.log("🚀 ~ useEffect ~ afterToHierarchy:", afterToHierarchy);
      setBosses(afterToHierarchy.bosses);
      setData(afterToHierarchy.data);
      setLines(afterconvert.lines);

      // convert excel target data to primereact data
      const afterconvertTarget = convertListTargetToUsableData(targetList);
      console.log("🚀 ~ useEffect ~ afterconvertTarget:", afterconvertTarget);
    }
  }, [employeeList]);

  const [selectedMenu, setSelectedMenu] = React.useState("Line JP++");
  const [hide, setHide] = React.useState(false);

  const openSubMenu = (subMenu) => {
    if (selectedMenu === subMenu) {
      setHide(!hide);
      return;
    }

    // setSelection(data[])
    setSelectedMenu(subMenu);

    const filteredData = data.filter((item) => item.data.line === subMenu);
    setSelection(filteredData);

    setHide(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6">
        <div className="flex justify-center gap-4 mb-10">
          <div className="bg-gray-700 text-white px-4 py-2 rounded-md">
            Man-months: xx
          </div>
          <div className="bg-gray-700 text-white px-4 py-2 rounded-md">
            Total Members: xx
          </div>
        </div>
        <div className="flex justify-center gap-6 flex-wrap mb-10">
          {bosses.length > 0 ? (
            <>
              {bosses.map((profile, index) => (
                <div
                  key={index}
                  className="w-72 border border-gray-300 rounded-lg overflow-hidden shadow-md"
                >
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                    <img
                      src={profile.Image}
                      alt={profile.fullName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold mb-1">
                      {profile.Account}
                    </h3>
                    <p className="text-gray-600">{profile.Position}</p>
                  </div>
                </div>
              ))}{" "}
            </>
          ) : (
            <div className="text-center">No bosses found</div>
          )}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {lines.map((buttonText, index) => (
            <button
              key={index}
              className="min-w-[120px] px-6 py-2 border border-gray-900 bg-white rounded-md hover:bg-gray-100 transition"
              onClick={() => openSubMenu(buttonText)}
            >
              {buttonText}
            </button>
          ))}
        </div>

        {/* sub menu - hide on default */}
        {hide && (
          <div className="mt-3">
            <SelectionDemo data={selection} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
