import { log } from "console";
import { OrganizationChart } from "primereact/organizationchart";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
export default function HomePage() {
  const ID = "1VF-15OLEfLkR730CHakRY5ZylnfsjDtnKzjj1vmrBOA";
  const SHAREPOINT_FILE_URL = `https://docs.google.com/spreadsheets/d/1cU6HCKqic5LIeiq7xLyWMuinTIEdtQIKxAfNPbGjg4g/edit?gid=0#gid=0`;

  const [rootManagers, setRootManagers] = useState([]); // 2 ông Manager
  // console.log("🤡 Nhi ~ HomePage ~ rootManagers:", rootManagers);
  const [treeByDepartment, setTreeByDepartment] = useState({}); // Tree theo department
  // console.log("🤡 Nhi ~ HomePage ~ treeByDepartment:", treeByDepartment);
  const [selectedTree, setSelectedTree] = useState(null); // Tree hiển thị

  const [data, setData] =
    useState <
    any >
    [
      {
        label: "Argentina",
        expanded: true,
        data: "ar",
        children: [
          {
            label: "Argentina",
            expanded: true,
            data: "ar",
            children: [
              {
                label: "Argentina",
                data: "ar",
              },
              {
                label: "Croatia",
                data: "hr",
              },
            ],
          },
          {
            label: "France",
            expanded: true,
            data: "fr",
            children: [
              {
                label: "France",
                data: "fr",
              },
              {
                label: "Morocco",
                data: "ma",
              },
            ],
          },
        ],
      },
    ];

  const fetchSheetData2 = async () => {
    try {
      const response = await fetch(SHAREPOINT_FILE_URL);
      const text = await response.text();

      // Lọc dữ liệu JSON từ Google Sheets API
      const jsonText = text
        .replace("/*O_o*/", "")
        .replace("google.visualization.Query.setResponse(", "")
        .slice(0, -2); // Loại bỏ các dữ liệu dư thừa

      const jsonData = JSON.parse(jsonText);

      // Dữ liệu bảng Google Sheets
      const rows = jsonData.table.rows.map((row) =>
        row.c.map((cell) => (cell ? cell.v : ""))
      );

      // Chuyển đổi dữ liệu thành danh sách đối tượng
      const orgData = rows.map((row) => ({
        id: row[0], // ID
        label: row[1], // Name
        position: row[2], // Position
        department: row[3], // Department
        parentId: row[4], // ParentID (null nếu trống)
        children: [], // Sẽ được gán sau
      }));

      // Tạo ánh xạ từ ID -> Node để dễ dàng tìm kiếm
      const nodeMap = new Map();
      orgData.forEach((node) => nodeMap.set(node.id, node));

      // Xây dựng danh sách các root node (những người không có parent)
      const rootManagers = [];
      const treeByDepartment = {};

      orgData.forEach((node) => {
        if (!node.parentId) {
          console.log("🤡 Nhi ~ orgData.forEach ~ node:", node);
          rootManagers.push({
            label: node.label,
            position: node.position,
            department: node.department,
          });
        } else {
          const parent = nodeMap.get(node.parentId);
          console.log("🤡 Nhi ~ orgData.forEach ~ parent:", parent);
          if (parent) {
            parent.children.push(node);
          }
        }

        // Gom nhóm theo department
        if (node.department) {
          if (!treeByDepartment[node.department]) {
            treeByDepartment[node.department] = [];
          }
          if (!node.parentId) {
            treeByDepartment[node.department].push(node);
          }
        }
      });

      setRootManagers(rootManagers);
      setTreeByDepartment(treeByDepartment);

      // setData(rootNodes); // Cập nhật dữ liệu vào state
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu từ Google Sheets:", error);
    }
  };

  useEffect(() => {
    fetchSheetData2();
  }, []);

  const nodeTemplate = (node) => {
    return (
      <div className="flex flex-column align-items-center">
        <img
          alt={node.label}
          src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png"
          className={`w-2rem shadow-2 flag flag-${node.data}`}
        />
        <div className="mt-3 font-medium text-lg">{node.label}</div>
      </div>
    );
  };

  return (
    <div className="card overflow-x-auto">
      <label htmlFor="upload">Upload File</label>
      <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
    </div>
  );
}
