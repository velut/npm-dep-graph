import fetchPackument from "./fetch-packument";
import logger from "./logger";
import maxSemverVersion from "./max-semver-version";
import { Package } from "./package";

const log = logger.child({ fn: "resolvePackage" });

const resolvePackage = async (
  name: string,
  version: string
): Promise<Omit<Package, "type">> => {
  const { versions, distTags } = await fetchPackument(name);
  const availableVersions = Object.keys(versions);
  const versionFromTag = distTags[version];
  const versionRange = versionFromTag ?? version;
  const resolvedVersion = maxSemverVersion(versionRange, availableVersions);
  if (!resolvedVersion) {
    log.error({ pkg: { name, version }, availableVersions });
    throw new Error(
      `resolvePackage: cannot resolve package version: ${name}@${version}`
    );
  }
  const manifest = versions[resolvedVersion]!;
  return {
    id: manifest.id,
    name: manifest.name,
    version: manifest.version,
  };
};

export default resolvePackage;
