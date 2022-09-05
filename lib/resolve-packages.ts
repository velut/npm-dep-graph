import pMap, { pMapSkip } from "p-map";
import fetchPackageManifest from "./fetch-package-manifest";
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
  } catch {
    return pMapSkip;
  }
};

const resolvePackages = async (pkgIds: string[]): Promise<Package[]> => {
  return Array.from(
    new Set(await pMap(pkgIds, tryResolvePackage, { concurrency: 2 }))
  ).sort((a, b) => a.id.localeCompare(b.id));
};

export default resolvePackages;
