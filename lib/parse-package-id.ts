import squash from "just-squash";

const parsePackageId = (id: string): { name: string; version: string } => {
  // Find the name and version given a package ID.
  // For example, `foo@1.0.0` => `{ name: "foo", version: "1.0.0"}`.
  const trimmedId = squash(id, true);
  const versionPrefixPos = trimmedId.lastIndexOf("@");
  const hasVersion = versionPrefixPos > 0;
  const name = hasVersion ? trimmedId.slice(0, versionPrefixPos) : trimmedId;
  const version = hasVersion
    ? trimmedId.slice(versionPrefixPos + 1) || "latest"
    : "latest";
  return { name, version };
};

export default parsePackageId;
