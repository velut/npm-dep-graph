import pMap, { pMapSkip } from "p-map";

const resolvePackageId = async (pkg: string): Promise<string> => {
  const versionPrefixPos = pkg.lastIndexOf("@");
  const hasVersion = versionPrefixPos > 0;
  const name = hasVersion ? pkg.slice(0, versionPrefixPos) : pkg;
  const version = hasVersion
    ? pkg.slice(versionPrefixPos + 1)
    : // TODO: query npm registry
      await Promise.resolve("TODO");
  return `${name}@${version}`;
};

const tryResolvePackageId = async (
  pkg: string
): Promise<string | typeof pMapSkip> => {
  try {
    const id = await resolvePackageId(pkg);
    return id;
  } catch {
    return pMapSkip;
  }
};

const resolvePackages = async (packages: string[]): Promise<string[]> => {
  return pMap(packages, tryResolvePackageId, { concurrency: 2 });
};

export default resolvePackages;
