import React, { memo, useCallback, useRef } from "react";
import InfoDetailModal, { ModalRef } from "../modal/InfoDetailModal";
import { EmployeeNode, ETypeNode } from "../interfaces/employee";
import InteractiveGradientButton from "../information/Button";
import { randomId } from "../../App";
import { DisplayEmployeeInfo, getInitials } from "../information/Employee";

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
  const hasChildren = !!node?.children?.length;
  const isExpanded = expandedNodeId === node.data.id;

  return (
    <>
      {node.type === ETypeNode.Person ? (
        <div className="items-center gap-3">
          {DisplayEmployeeInfo(node.data, getInitials)}

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
                {"Show next"}
              </span>
            </button>
          )}
        </div>
      ) : (
        <>
          <InteractiveGradientButton
            key={randomId()}
            buttonText={node.data.nameBlock}
            onClick={() => onToggleExpand(node.data.id)}
            shouldDisable={node.children.length === 0}
          />
        </>
      )}
    </>
  );
};

export default memo(ChartLevel);
