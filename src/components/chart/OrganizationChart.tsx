import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import ChartLevel from "./ChartLevel";
import { EmployeeNode } from "../interfaces/employee";

const OrganizationChart = ({ data }: { data: EmployeeNode[] }) => {
  const [expandedNodeId, setExpandedNodeId] = useState<string | null>(null);
  const [childrenData, setChildrenData] = useState<EmployeeNode[]>([]);
  const childrenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChildrenData([]);
    setExpandedNodeId(null);
  }, [data]);

  const handleToggleExpand = useCallback(
    (nodeId: string) => {
      setExpandedNodeId((prevId) => {
        if (prevId === nodeId) {
          setChildrenData([]);
          return null;
        }
        const children =
          data?.find((v) => v?.data?.id === nodeId)?.children ?? [];
        setChildrenData(children);
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
        return nodeId;
      });
    },
    [data]
  );

  return (
    <div className="mt-6 md:mt-12 w-[90%] m-auto">
      <div
        className="overflow-x-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="flex flex-row justify-center w-fit my-6 mx-auto gap-x-2 md:gap-x-4 lg:gap-x-6">
          {data?.map((nodes, level) => (
            <ChartLevel
              key={nodes?.data?.id}
              node={nodes}
              expandedNodeId={expandedNodeId}
              onToggleExpand={handleToggleExpand}
            />
          ))}
        </div>
      </div>
      {!!childrenData.length && (
        <div
          ref={childrenRef}
          className="flex flex-row flex-wrap justify-center items-start gap-x-2 md:gap-x-4 lg:gap-x-6 gap-y-3 md:gap-y-6 lg:gap-y-8 m-3 md:m-4 lg:m-6"
        >
          {childrenData?.map((child) => (
            // <div key={child?.data?.id} className="justify-center items-start gap-x-6 gap-y-15">
            <ChartLevel
              key={child?.data?.id}
              node={child}
              expandedNodeId={expandedNodeId}
              onToggleExpand={handleToggleExpand}
            />
            // </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(OrganizationChart);
