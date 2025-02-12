import { OrganizationChart } from "primereact/organizationchart";
export default function SelectionDemo({ data }) {
  const nodeTemplate = (node) => {
    if (node.type === "person") {
      return (
        <div className="w-72 border border-blue-300 rounded-lg bg-blue-50 p-6 shadow-md">
          <div className="text-lg font-bold text-purple-600">
            {node.data.position}
          </div>
          <div className="flex justify-center mt-4">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <img
                src={node.data.image}
                alt={node.data.fullName}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="text-purple-600 font-medium">
              {node.data.fullName}
            </div>
            <div className="text-gray-400 text-sm">{node.data.position}</div>
          </div>
          <div className="mt-6 text-gray-600 text-sm">{node.data.email}</div>
        </div>
      );
    }

    return node.label;
  };

  return (
    <div className="card overflow-x-auto ">
      {data.length > 0 && (
        <OrganizationChart
          value={data}
          selectionMode="multiple"
          // selection={selection}
          // onSelectionChange={(e) => setSelection(e.data)}
          onNodeSelect={(e) => console.log(e)}
          nodeTemplate={nodeTemplate}
        />
      )}
    </div>
  );
}
