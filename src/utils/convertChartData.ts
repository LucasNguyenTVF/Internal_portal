type TreeNode = {
  children?: TreeNode[];
  [key: string]: any; // Allow other properties
};
export const traverseTree = (nodes, level = 0, levelsMap: TreeNode[] = []) => {
    if (!nodes || nodes.length === 0) return levelsMap;

    if (!levelsMap[level]) {levelsMap[level] = []};
    levelsMap[level].push(...nodes);

    nodes.forEach((node) => {
      if (node.children) {
        traverseTree(node.children, level + 1, levelsMap);
      }
    });
    return levelsMap;
  }