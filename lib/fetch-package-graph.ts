import Graph from "graphology";
import PQueue from "p-queue";
import dependenciesToPackages from "./dependencies-to-packages";
import fetchPackageManifest from "./fetch-package-manifest";
import logger from "./logger";
import { Package } from "./package";
import resolvePackage from "./resolve-package";

const log = logger.child({ fn: "fetchPackageGraph" });

const fetchPackageGraphHelper = async (
  pkg: Package,
  graph: Graph,
  reqQueue: PQueue,
  parentId?: string
): Promise<void> => {
  try {
    const { id, name, version } = await resolvePackage(pkg.name, pkg.version);
    const manifest = await fetchPackageManifest(name, version);
    const [, isNewNode] = graph.mergeNode(id, {
      type: pkg.type,
      id,
      name,
      version,
    });
    if (parentId !== undefined) {
      graph.mergeEdgeWithKey(`${parentId}->${id}`, parentId, id);
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

const fetchPackageGraph = async (rootPackages: Package[]): Promise<Graph> => {
  console.time("fetchPackageGraph");
  const reqQueue = new PQueue({ concurrency: 25 });
  const graph = new Graph({
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
  log.info({ graph: graph.toJSON(), nodesLen: graph.order }, "final graph");
  console.timeEnd("fetchPackageGraph");
  return graph;
};

export default fetchPackageGraph;
