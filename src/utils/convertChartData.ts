export const traverseTree = <T extends { children?: T[] }>(
  nodes: T[],
  level = 0,
  levelsMap: T[][] = []
): T[][] => {
  if (!nodes || nodes.length === 0) return levelsMap;

  if (!levelsMap[level]) levelsMap[level] = [];
  levelsMap[level].push(...nodes);

  nodes.forEach((node) => {
    if (node.children && node.children.length > 0) {
      traverseTree(node.children, level + 1, levelsMap);
    }
  });

  return levelsMap;
};
