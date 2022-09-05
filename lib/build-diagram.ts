import urlJoin from "url-join";
import { Package } from "./package";
import registryWeb from "./registry-web";

const buildNodes = (packages: Package[]): string[] => {
  // Create nodes like `p0("foo@1.0.0")` where `p0` is the node ID,
  // the parentheses `()` tell mermaid to render rounded box corners
  // and the quotes `""` contain the package version ID.
  return packages.map(({ id }, index) => `p${index}("${id}")`);
};

const buildEdges = (packages: Package[]): string[] => {
  return [];
};

const buildInteractions = (packages: Package[]): string[] => {
  // Make nodes clickable and point them to their registry webpage.
  return packages.map(({ name, version }, index) => {
    const url = urlJoin(registryWeb, "package", name, "v", version ?? "latest");
    return `click p${index} "${url}"`;
  });
};

// See https://mermaid-js.github.io/mermaid/#/flowchart
const buildDiagram = (packages: Package[]): string => {
  return [
    "graph TB",
    ...buildNodes(packages),
    ...buildEdges(packages),
    ...buildInteractions(packages),
  ].join("\n");
};

export default buildDiagram;
