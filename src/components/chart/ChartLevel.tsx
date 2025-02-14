import React, { memo, useCallback, useRef } from "react";
import InfoDetailModal, { ModalRef } from "../modal/InfoDetailModal";
import { EmployeeNode } from "../interfaces/employee";

interface ChartLevelProps {
  node: EmployeeNode;
  expandedNodeId: string | null;
  onToggleExpand: (nodeId: string) => void;
}

const ChartLevel = ({
  node,
  expandedNodeId,
  onToggleExpand,
}: ChartLevelProps) => {
  const detailModalRef = useRef<ModalRef>(null);
  const hasChildren = !!node?.children?.length;
  const isExpanded = expandedNodeId === node.data.id;

  const onClickDetail = useCallback(
    (data) => () => {
      detailModalRef?.current?.showModal(data);
    },
    []
  );

  return (
    <>
      <div className="items-center gap-3">
        <button
          onClick={onClickDetail(node)}
          className="flex items-center justify-center"
        >
          <div
            className={`flex flex-col justify-baseline rounded-md m-auto border shadow-md border-gray-600 transition-all duration-300 ${
              isExpanded
                ? "w-33 sm:w-45 lg:w-55 h-33 sm:h-45 lg:h-55"
                : "w-32 sm:w-40 lg:w-50 h-32 sm:h-40 lg:h-50"
            } bg-[linear-gradient(90deg,_#03081A_0%,_#012756_100%)]`}
          >
            <div className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 rounded-full m-auto overflow-hidden">
              <img
                src={node?.data?.image}
                alt={node?.data?.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center m-auto px-2">
              <div className="text-[10px] sm:text-sm lg:text-lg font-semibold text-white">
                {node?.data?.account}
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-[#2A88FF] mt-2">
                {node?.data?.position}
              </div>
            </div>
          </div>
        </button>

        {hasChildren && (
          <button
            onClick={() => onToggleExpand(node.data.id)}
            className=" hover:text-[#2A88FF] text-primary h-8 mt-2"
          >
            <span
              className={`text-[8px] md:text-xs ${
                isExpanded ? "text-[#ffffff]" : "text-[#184887]"
              } border-1 px-2 py-1 hover:text-[#ffffff] text-xs border-[#232323] font-semibold ${
                isExpanded ? "italic" : ""
              } `}
            >
              Show team
            </span>
          </button>
        )}
      </div>
      <InfoDetailModal ref={detailModalRef} />
    </>
  );
};

export default memo(ChartLevel);
