const buildDiagram = (packages: string[]): string => {
  const nodes = packages.map((pkg, index) => `p${index}("${pkg}")`);
  const edges: string[] = [];
  const interactions: string[] = [];
  return ["graph TB", ...nodes, ...edges, ...interactions].join("\n");
};

export default buildDiagram;
