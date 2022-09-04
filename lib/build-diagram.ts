import urlJoin from "url-join";
import packageFromId from "./package-from-id";
import registryWeb from "./registry-web";

const buildNodes = (packages: string[]): string[] => {
  // Create nodes like `p0("foo@1.0.0")` where `p0` is the node ID,
  // the parentheses `()` tell mermaid to render rounded box corners
  // and the quotes `""` contain the package version ID.
  return packages.map((pkg, index) => `p${index}("${pkg}")`);
};

const buildEdges = (packages: string[]): string[] => {
  return [];
};

const buildInteractions = (packages: string[]): string[] => {
  // Make nodes clickable and point them to their registry webpage.
  return packages.map((pkg, index) => {
    const { name, version } = packageFromId(pkg);
    const url = urlJoin(registryWeb, "package", name, "v", version ?? "latest");
    return `click p${index} "${url}"`;
  });
};

// See https://mermaid-js.github.io/mermaid/#/flowchart
const buildDiagram = (packages: string[]): string => {
  return [
    "graph TB",
    ...buildNodes(packages),
    ...buildEdges(packages),
    ...buildInteractions(packages),
  ].join("\n");
};

export default buildDiagram;
