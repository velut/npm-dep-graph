import urlJoin from "url-join";
import packageFromId from "./package-from-id";
import registryWeb from "./registry-web";

// See https://mermaid-js.github.io/mermaid/#/flowchart
const buildDiagram = (packages: string[]): string => {
  const nodes = packages.map((pkg, index) => {
    // Create nodes like `p0("foo")` where `p0` is the ID,
    // the parentheses `()` render rounded box corners
    // and the quotes `""` escape the package name.
    return `p${index}("${pkg}")`;
  });
  const edges: string[] = [];
  const interactions = packages.map((pkg, index) => {
    // Make nodes clickable and point them to their registry webpage.
    const { name, version } = packageFromId(pkg);
    const url = urlJoin(registryWeb, "package", name, "v", version ?? "latest");
    return `click p${index} "${url}"`;
  });
  return ["graph TB", ...nodes, ...edges, ...interactions].join("\n");
};

export default buildDiagram;
