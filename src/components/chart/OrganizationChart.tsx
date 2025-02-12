import React, { useMemo, useState, useCallback, memo } from "react";

import { traverseTree } from "../../utils/convertChartData";
import ChartLevel from "./ChartLevel";
import { EmployeeNode } from "../interfaces/employee";

const OrganizationChart = ({ data }: { data: EmployeeNode[] }) => {
  const levels = useMemo(() => traverseTree(data), [data]);

  const [visibleLevels, setVisibleLevels] = useState(
    Array(levels.length).fill(true)
  );
  const toggleLevel = useCallback(
    (level) => {
      const newVisibleLevels = [...visibleLevels];
      const newValue = !newVisibleLevels[level + 1];
      if (!newValue) {
        // If the current level is expanded, then collapse all levels after it
        for (let i = level + 1; i < newVisibleLevels.length; i++) {
          newVisibleLevels[i] = false;
        }
      } else {
        //if the current level is collapsed, expand only the next level
        newVisibleLevels[level + 1] = true;
      }
      setVisibleLevels(newVisibleLevels);
    },
    [visibleLevels, setVisibleLevels]
  );

  return (
    <div className="mt-12">
      <div className="flex flex-col items-center gap-16">
        {levels.map((nodes, level) => (
          <ChartLevel
            key={level}
            nodes={nodes}
            level={level}
            toggleLevel={toggleLevel}
            isVisible={visibleLevels[level]}
            hasChildren={levels[level + 1]?.length > 0}
            isShow={visibleLevels[level + 1]}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(OrganizationChart);
