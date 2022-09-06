import semver from "semver";

const dependenciesToPackageIds = (deps: Record<string, string>): string[] => {
  return Object.entries(deps).map(
    ([name, version]) => `${name}@${semver.minVersion(version)}`
  );
};

export default dependenciesToPackageIds;
