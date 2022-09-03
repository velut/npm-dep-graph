import pMap, { pMapSkip } from "p-map";
import fetchPackageManifest from "./fetch-package-manifest";
import packageFromId from "./package-from-id";

const resolvePackage = async (pkg: string): Promise<string> => {
  const { name, version } = packageFromId(pkg);
  const { id } = await fetchPackageManifest(name, version);
  return id;
};

const tryResolvePackage = async (
  pkg: string
): Promise<string | typeof pMapSkip> => {
  try {
    const id = await resolvePackage(pkg);
    return id;
  } catch {
    return pMapSkip;
  }
};

const resolvePackages = async (packages: string[]): Promise<string[]> => {
  return pMap(packages, tryResolvePackage, { concurrency: 2 });
};

export default resolvePackages;
