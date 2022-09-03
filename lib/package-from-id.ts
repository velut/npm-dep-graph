const packageFromId = (id: string): { name: string; version?: string } => {
  const versionPrefixPos = id.lastIndexOf("@");
  const hasVersion = versionPrefixPos > 0;
  const name = hasVersion ? id.slice(0, versionPrefixPos) : id;
  const version = hasVersion ? id.slice(versionPrefixPos + 1) : undefined;
  return { name, version };
};

export default packageFromId;
