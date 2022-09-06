import pMap, { pMapSkip } from "p-map";
import fetchPackageManifest from "./fetch-package-manifest";
import logger from "./logger";
import { Package } from "./package";
import packageFromId from "./package-from-id";

const resolvePackage = async (pkgId: string): Promise<Package> => {
  const { name, version } = packageFromId(pkgId);
  const manifest = await fetchPackageManifest(name, version);
  return {
    id: manifest.id,
    name: manifest.name,
    version: manifest.version,
  };
};

const tryResolvePackage = async (
  pkgId: string
): Promise<Package | typeof pMapSkip> => {
  try {
    const pkg = await resolvePackage(pkgId);
    return pkg;
  } catch (err) {
    const log = logger.child({ fn: "tryResolvePackage" });
    log.error(err);
    return pMapSkip;
  }
};

const uniquePackages = (pkgs: Package[]) => {
  const seenIds = new Set();
  return pkgs.flatMap((pkg) => {
    if (seenIds.has(pkg.id)) {
      return [];
    }
    seenIds.add(pkg.id);
    return pkg;
  });
};

const resolvePackages = async (pkgIds: string[]): Promise<Package[]> => {
  const allPackages = await pMap(pkgIds, tryResolvePackage, {
    concurrency: 2,
  });
  return uniquePackages(allPackages).sort((a, b) => a.id.localeCompare(b.id));
};

export default resolvePackages;
