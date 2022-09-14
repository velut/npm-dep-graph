import semver from "semver";

const maxSemverVersion = (
  versionRange: string,
  versions: string[]
): string | undefined => {
  return semver.maxSatisfying(versions, versionRange) ?? undefined;
};

export default maxSemverVersion;
