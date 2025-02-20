import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import ChartLevel from "./ChartLevel";
import { EmployeeNode } from "../interfaces/employee";

const findNodeRecursive = (
  nodes: EmployeeNode[],
  nodeId: string,
  parent: EmployeeNode | null = null
): { node: EmployeeNode | null; parent: EmployeeNode | null } => {
  for (const node of nodes) {
    if (node.data.id === nodeId) {
      return { node, parent };
    }
    if (node.children.length > 0) {
      const result = findNodeRecursive(node.children, nodeId, node);
      if (result.node) {
        return result;
      }
    }
  }
  return { node: null, parent: null };
};

const getNodePath = (
  nodes: EmployeeNode[],
  targetId: string,
  currentPath: string[] = []
): string[] | null => {
  for (const node of nodes) {
    const newPath = [...currentPath, node.data.id];
    if (node.data.id === targetId) {
      return newPath;
    }
    if (node.children) {
      const path = getNodePath(node.children, targetId, newPath);
      if (path) {
        return path;
      }
    }
  }
  return null;
};

const OrganizationChart = ({ data }: { data: EmployeeNode[] }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [activeChild, setActiveChild] = useState<string | null>(null);

  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpandedNodes(new Set());
    setActiveChild(null);
  }, [data]);

  const handleToggleExpand = useCallback(
    (nodeId: string) => {
      const { node, parent } = findNodeRecursive(data, nodeId);
      if (!node) return;

      setExpandedNodes((prev) => {
        const newExpanded = new Set(prev);

        if (newExpanded.has(nodeId)) {
          newExpanded.delete(nodeId);
          setActiveChild(null);
          return newExpanded;
        }

        newExpanded.add(nodeId);

        if (parent) {
          const hasSiblings = parent.children && parent.children.length > 1;
          if (hasSiblings) {
            setActiveChild(nodeId);
          }
        } else {
          setActiveChild(null);
        }

        // Scroll to new content
        setTimeout(() => {
          if (childrenRef.current) {
            const offset = 100;
            const top =
              childrenRef.current.getBoundingClientRect().top +
              window.scrollY -
              offset;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 100);

        return newExpanded;
      });
    },
    [data]
  );

  const renderNode = (node: EmployeeNode) => {
    console.log("🚀 ~ renderNode ~ node:", node);
    const isExpanded = expandedNodes.has(node.data.id);
    const { parent } = findNodeRecursive(data, node.data.id);

    // Hide inactive siblings and their children
    if (parent && activeChild && activeChild !== node.data.id) {
      if (parent.children?.some((child) => child.data.id === activeChild)) {
        return null;
      }

      if (
        parent.children?.map((child) =>
          child.children.some((c) => c.data.id === activeChild)
        )
      ) {
        return null;
      }
      // if (parent.children?.some((child) => child.data.id !== node.data.id)) {
      //   return null;
      // }
    }

    return (
      <div key={node.data.id} className="flex flex-col items-center">
        <ChartLevel
          node={node}
          expandedNodeId={isExpanded ? node.data.id : null}
          onToggleExpand={handleToggleExpand}
        />
        {isExpanded && node.children && node.children.length > 0 && (
          <div
            ref={childrenRef}
            className="flex flex-row flex-wrap justify-center items-start gap-x-2 md:gap-x-4 lg:gap-x-6 gap-y-3 md:gap-y-6 lg:gap-y-8 m-3 md:m-4 lg:m-6"
          >
            {node.children.map((child) => renderNode(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-6 md:mt-12 w-[90%] m-auto">
      <div
        className="overflow-y-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex flex-row justify-center w-fit my-6 mx-auto gap-x-2 md:gap-x-4 lg:gap-x-6">
          {data?.map((node) => renderNode(node))}
        </div>
      </div>
    </div>
  );
};

export default memo(OrganizationChart);
