import Denque from "denque";
import dedupeById from "./dedupe-by-id";
import fetchPackageManifest from "./fetch-package-manifest";
import fetchPackument from "./fetch-packument";
import logger from "./logger";
import maxSemverVersion from "./max-semver-version";
import { Package } from "./package";
import parsePackageId from "./parse-package-id";
import sortById from "./sort-by-id";

export interface PackagesData {
  packages: Package[];
}

const log = logger.child({ fn: "fetchPackages" });

const fetchPackages = async (ids: string[]): Promise<PackagesData> => {
  const packages: Package[] = [];
  const queue = new Denque<Package>(
    ids.map((id) => ({ type: "root", id, ...parsePackageId(id) }))
  );
  while (!queue.isEmpty()) {
    const { type, name, version } = queue.shift()!;
    try {
      const packument = await fetchPackument(name);
      const availableVersions = Object.keys(packument.versions);
      const taggedVersion = packument.distTags[version];
      const range = taggedVersion ?? version;
      const resolvedVersion = maxSemverVersion(range, availableVersions);
      if (!resolvedVersion) {
        log.error({ name, version }, "cannot resolve version");
        continue;
      }
      const manifest = await fetchPackageManifest(name, resolvedVersion);
      packages.push({
        type,
        id: manifest.id,
        name: manifest.name,
        version: manifest.version,
      });
    } catch (err) {
      log.error({ name, version, err }, "error when fetching package");
    }
  }
  return {
    packages: sortById(dedupeById(packages)),
  };
};

export default fetchPackages;
