import semver from "semver";

const maxSemverVersion = (
  range: string,
  versions: string[]
): string | undefined => {
  return semver.maxSatisfying(versions, range) ?? undefined;
};

export default maxSemverVersion;
