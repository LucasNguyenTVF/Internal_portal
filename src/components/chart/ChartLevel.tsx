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
            <>
              {isExpanded ? (
                <span
                  className="pi pi-angle-up cursor-pointer"
                  style={{ color: "green", fontSize: "1.5rem" }}
                  onClick={() => onToggleExpand(node.data.id)}
                ></span>
              ) : (
                <span
                  className="pi pi-angle-down cursor-pointer"
                  style={{ color: "green", fontSize: "1.5rem" }}
                  onClick={() => onToggleExpand(node.data.id)}
                ></span>
              )}
            </>
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
