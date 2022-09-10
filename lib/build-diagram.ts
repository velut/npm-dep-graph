import urlJoin from "url-join";
import { Package } from "./package";
import { PackagesData } from "./packages-data";
import registryWeb from "./registry-web";
import sortById from "./sort-by-id";

const getNodeIdsByPackageId = (pkgIds: string[]): Record<string, string> => {
  return pkgIds
    .sort((a, b) => a.localeCompare(b))
    .reduce((acc, id, index) => {
      acc[id] = `p${index}`;
      return acc;
    }, {} as Record<string, string>);
};

const buildNodes = (nodeIdsByPackageId: Record<string, string>): string[] => {
  // Create nodes like `p0("foo@1.0.0")` where `p0` is the node ID,
  // the parentheses `()` tell mermaid to render rounded box corners
  // and the quotes `""` contain the package version ID.
  return Object.keys(nodeIdsByPackageId)
    .sort((a, b) => a.localeCompare(b))
    .map((pkgId) => {
      const nodeId = nodeIdsByPackageId[pkgId]!;
      return `${nodeId}("${pkgId}")`;
    });
};

const buildEdges = (
  dependencies: Record<string, string[]>,
  nodeIdsByPackageId: Record<string, string>
): string[] => {
  return Object.keys(dependencies)
    .sort((a, b) => a.localeCompare(b))
    .flatMap((parentId) => {
      const parentNodeId = nodeIdsByPackageId[parentId]!;
      const deps = dependencies[parentId]!.sort((a, b) => a.localeCompare(b));
      return deps.map((depId) => {
        const depNodeId = nodeIdsByPackageId[depId];
        return `${parentNodeId}-->${depNodeId}`;
      });
    });
};

const buildInteractions = (
  packages: Package[],
  nodeIdsByPackageId: Record<string, string>
): string[] => {
  // Make nodes clickable and point them to their registry webpage.
  return sortById(packages).map(({ id, name, version }) => {
    const nodeId = nodeIdsByPackageId[id]!;
    const url = urlJoin(registryWeb, "package", name, "v", version ?? "latest");
    return `click ${nodeId} "${url}"`;
  });
};

// See https://mermaid-js.github.io/mermaid/#/flowchart
const buildDiagram = (data: PackagesData): string => {
  const nodeIdsByPackageId = getNodeIdsByPackageId(Object.keys(data.packages));
  return [
    "graph LR",
    ...buildNodes(nodeIdsByPackageId),
    ...buildEdges(data.dependencies, nodeIdsByPackageId),
    ...buildInteractions(Object.values(data.packages), nodeIdsByPackageId),
  ].join("\n");
};

export default buildDiagram;
