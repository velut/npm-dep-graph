import Graph from "graphology";
import PQueue from "p-queue";
import fetchPackageManifest from "./fetch-package-manifest";
import fetchPackument from "./fetch-packument";
import logger from "./logger";
import maxSemverVersion from "./max-semver-version";
import { Package } from "./package";

const log = logger.child({ fn: "fetchPackageGraph" });

const jobQueue = new PQueue({ concurrency: 10 });

const fetchPackageGraphHelper = async (
  pkg: Package,
  graph: Graph,
  seenIds: Set<string>
): Promise<void> => {
  if (seenIds.has(pkg.id)) {
    return;
  }
  try {
    const packument = await fetchPackument(pkg.name);
    const availableVersions = Object.keys(packument.versions);
    const versionFromTag = packument.distTags[pkg.version];
    const versionRange = versionFromTag ?? pkg.version;
    const resolvedVersion = maxSemverVersion(versionRange, availableVersions);
    if (!resolvedVersion) {
      log.error({ pkg, availableVersions }, "cannot resolve package version");
      return;
    }
    const resolvedName = packument.name;
    const resolvedId = `${resolvedName}@${resolvedVersion}`;
    if (seenIds.has(resolvedId)) {
      return;
    }
    const manifest = await fetchPackageManifest(resolvedName, resolvedVersion);
    seenIds.add(pkg.id);
    seenIds.add(resolvedId);
    if (!graph.hasNode(manifest.id)) {
      graph.addNode(manifest.id);
    }
    const depPkgs = Object.entries(manifest.dependencies).map(
      ([depName, depVersion]): Package => ({
        type: "dep",
        id: `${depName}@${depVersion}`,
        name: depName,
        version: depVersion,
      })
    );
    jobQueue.addAll(
      depPkgs.map(
        (depPkg) => () => fetchPackageGraphHelper(depPkg, graph, seenIds)
      )
    );
  } catch (err) {
    log.error({ pkg, err }, "error when fetching package");
  }
};

const fetchPackageGraph = async (rootPackages: Package[]): Promise<Graph> => {
  console.time("fetchPackageGraph");
  const graph = new Graph({
    type: "directed",
    allowSelfLoops: false,
    multi: false,
  });
  const seenIds = new Set<string>();
  jobQueue.addAll(
    rootPackages.map(
      (pkg) => () => fetchPackageGraphHelper(pkg, graph, seenIds)
    )
  );
  await jobQueue.onIdle();
  log.info({ graph: graph.toJSON(), nodesLen: graph.order }, "final graph");
  console.timeEnd("fetchPackageGraph");
  return graph;
};

export default fetchPackageGraph;
