import ColorHash from "color-hash";
import Graph from "graphology";
import { random } from "graphology-layout";
import forceAtlas2 from "graphology-layout-forceatlas2";
import PQueue from "p-queue";
import dependenciesToPackages from "./dependencies-to-packages";
import fetchPackageManifest from "./fetch-package-manifest";
import logger from "./logger";
import { Package } from "./package";
import {
  PackageGraph,
  PackageGraphEdgeAttrs,
  PackageGraphNodeAttrs,
} from "./package-graph";
import resolvePackage from "./resolve-package";

const log = logger.child({ fn: "fetchPackageGraph" });

const colorHash = new ColorHash();

const fetchPackageGraphHelper = async (
  pkg: Package,
  graph: PackageGraph,
  reqQueue: PQueue,
  parentId?: string
): Promise<void> => {
  try {
    const { id, name, version } = await resolvePackage(pkg.name, pkg.version);
    const manifest = await fetchPackageManifest(name, version);
    const [, isNewNode] = graph.mergeNode(id, {
      pkgType: pkg.type,
      id,
      name,
      version,
      // For rendering in Sigma.js
      label: id,
      size:
        (pkg.type === "root" ? 25 : 10) +
        Object.keys(manifest.dependencies).length,
      color: colorHash.hex(id),
    });
    if (parentId !== undefined) {
      graph.mergeEdgeWithKey(`${parentId}->${id}`, parentId, id, {
        // For rendering in Sigma.js
        type: "arrow",
        size: 4,
        color: colorHash.hex(parentId),
      });
    }
    if (!isNewNode) {
      return;
    }
    const depPkgs = dependenciesToPackages(manifest.dependencies);
    reqQueue.addAll(
      depPkgs.map(
        (depPkg) => () => fetchPackageGraphHelper(depPkg, graph, reqQueue, id)
      )
    );
  } catch (err) {
    log.error({ pkg, err }, "error when fetching package");
  }
};

const fetchPackageGraph = async (
  rootPackages: Package[]
): Promise<PackageGraph> => {
  const reqQueue = new PQueue({ concurrency: 25 });
  const graph = new Graph<PackageGraphNodeAttrs, PackageGraphEdgeAttrs>({
    type: "directed",
    allowSelfLoops: false,
    multi: false,
  });
  reqQueue.addAll(
    rootPackages.map(
      (pkg) => () => fetchPackageGraphHelper(pkg, graph, reqQueue)
    )
  );
  await reqQueue.onIdle();
  random.assign(graph);
  forceAtlas2.assign(graph, {
    iterations: parseInt(process.env.FORCE_ATLAS_2_ITERATIONS!, 10),
    settings: forceAtlas2.inferSettings(graph),
  });
  return graph;
};

export default fetchPackageGraph;
