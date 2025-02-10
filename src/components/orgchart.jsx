import { useState } from "react";
import { OrganizationChart } from "primereact/organizationchart";

export default function SelectionDemo() {
  const [selection, setSelection] = useState([]);
  const [data] = useState([
    {
      expanded: true,
      type: "person",
      data: {
        image:
          "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
        name: "Amy Elsner",
        title: "CEO",
      },
      children: [
        {
          expanded: true,
          type: "person",
          data: {
            image:
              "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
            name: "Anna Fali",
            title: "CMO",
          },
          children: [
            {
              expanded: false,
              type: "person",
              data: {
                image:
                  "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
                name: "Xu Xuefeng",
                title: "Marketing Manager",
              },
            },
            {
              expanded: false,
              type: "person",
              data: {
                image:
                  "https://primefaces.org/cdn/primereact/images/avatar/ivanmagalhaes.png",
                name: "Ivan Magalhaes",
                title: "Sales Manager",
              },
            },
          ],
        },
        {
          expanded: true,
          type: "person",
          data: {
            image:
              "https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png",
            name: "Stephen Shaw",
            title: "CTO",
          },
          children: [
            {
              expanded: true,
              type: "person",
              data: {
                image:
                  "https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png",
                name: "Michael Zimmerman",
                title: "Architect",
              },
            },
          ],
        },
      ],
    },
  ]);

  const nodeTemplate = (node) => {
    if (node.type === "person") {
      return (
        <div className="w-72 border border-blue-300 rounded-lg bg-blue-50 p-6 shadow-md">
          <div className="text-lg font-bold text-purple-600">
            {node.data.title}
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <img
                src={node.data.image}
                alt={node.data.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-purple-600 font-medium">{node.data.name}</div>
            <div className="text-gray-400 text-sm">{node.data.title}</div>
          </div>
          <div className="mt-6 text-gray-600 text-sm">
            Brief description of role and responsibilities
          </div>
        </div>
      );
    }

    return node.label;
  };

  return (
    <div className="card overflow-x-auto">
      <OrganizationChart
        value={data}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data)}
        nodeTemplate={nodeTemplate}
      />
    </div>
  );
}
