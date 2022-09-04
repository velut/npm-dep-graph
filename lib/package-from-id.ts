const packageFromId = (id: string): { name: string; version?: string } => {
  // Find the name and version given a package ID.
  // For example, `foo@1.0.0` => `{ name: "foo", version: "1.0.0"}`.
  const versionPrefixPos = id.lastIndexOf("@");
  const hasVersion = versionPrefixPos > 0;
  const name = hasVersion ? id.slice(0, versionPrefixPos) : id;
  const version = hasVersion ? id.slice(versionPrefixPos + 1) : undefined;
  return { name, version };
};

export default packageFromId;
