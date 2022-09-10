import Denque from "denque";
import fetchPackument from "./fetch-packument";
import logger from "./logger";
import maxSemverVersion from "./max-semver-version";
import { Package } from "./package";
import { PackagesData } from "./packages-data";
import parsePackageId from "./parse-package-id";

interface QueuePackage extends Package {
  parentId?: string;
}

const log = logger.child({ fn: "fetchPackages" });

const fetchPackages = async (ids: string[]): Promise<PackagesData> => {
  const packages: Record<string, Package> = {};
  const dependencies: Record<string, string[]> = {};
  const seenIds = new Set<string>();
  const queue = new Denque<QueuePackage>(
    ids.map((id) => ({ type: "root", id, ...parsePackageId(id) }))
  );
  while (!queue.isEmpty()) {
    const { type, name, version, parentId } = queue.shift()!;
    log.info({ type, pkgName: name, version }, "processing package");
    try {
      const packument = await fetchPackument(name);
      const availableVersions = Object.keys(packument.versions);
      const taggedVersion = packument.distTags[version];
      const range = taggedVersion ?? version;
      const resolvedVersion = maxSemverVersion(range, availableVersions);
      if (!resolvedVersion) {
        log.error({ pkgName: name, version }, "cannot resolve version");
        continue;
      }
      const resolvedId = `${name}@${resolvedVersion}`;
      if (seenIds.has(resolvedId)) {
        continue;
      }
      seenIds.add(resolvedId);
      packages[resolvedId] = {
        type,
        id: resolvedId,
        name: name,
        version: resolvedVersion,
      };
      // const manifest = await fetchPackageManifest(name, resolvedVersion);
      // packages[manifest.id] = {
      //   type,
      //   id: manifest.id,
      //   name: manifest.name,
      //   version: manifest.version,
      // };
      if (parentId !== undefined) {
        (dependencies[parentId] ??= []).push(resolvedId);
        // (dependencies[parentId] ??= []).push(manifest.id);
      }
      for (const [depName, depSemver] of Object.entries(
        packument.versions[resolvedVersion]!.dependencies
        // manifest.dependencies
      )) {
        queue.push({
          type: "dep",
          id: `${depName}@${depSemver}`,
          name: depName,
          version: depSemver,
          parentId: resolvedId,
        });
      }
    } catch (err) {
      log.error({ pkgName: name, version, err }, "error when fetching package");
    }
  }
  return {
    packages,
    dependencies,
  };
};

export default fetchPackages;
