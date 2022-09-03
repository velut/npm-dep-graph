import pMap, { pMapSkip } from "p-map";
import fetchPackageManifest from "./fetch-package-manifest";

const resolvePackage = async (pkg: string): Promise<string> => {
  const versionPrefixPos = pkg.lastIndexOf("@");
  const hasVersion = versionPrefixPos > 0;
  const name = hasVersion ? pkg.slice(0, versionPrefixPos) : pkg;
  const version = hasVersion ? pkg.slice(versionPrefixPos + 1) : undefined;
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
