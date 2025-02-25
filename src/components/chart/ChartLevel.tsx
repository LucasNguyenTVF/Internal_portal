import React, { memo, useCallback, useRef } from "react";
import InfoDetailModal, { ModalRef } from "../modal/InfoDetailModal";
import { EmployeeNode, ETypeNode } from "../interfaces/employee";
import InteractiveGradientButton from "../information/Button";
import { randomId } from "../../App";
import { DisplayEmployeeInfo, getInitials } from "../information/Employee";
import arrowIcon from "../../assets/arrow.svg";

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
            <img
              onClick={() => onToggleExpand(node.data.id)}
              src={arrowIcon}
              className={`w-4 h-4 mx-auto mt-3 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
              alt="arrow icon"
            />
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
