import fetch from "cross-fetch";
import urlJoin from "url-join";
import validateNpmPackageName from "validate-npm-package-name";
import { PackageManifest, packageManifestSchema } from "./package-manifest";

export const npmRegistry = "https://registry.npmjs.org";

const fetchPackageManifest = async (
  name: string,
  version = "latest"
): Promise<PackageManifest> => {
  if (!validateNpmPackageName(name).validForOldPackages) {
    throw new Error(`fetchPackageManifest: invalid name for package: ${name}`);
  }
  if (version === "") {
    throw new Error(`fetchPackageManifest: empty version for package: ${name}`);
  }
  const res = await fetch(urlJoin(npmRegistry, name, version));
  const data = await res.json();
  const manifest = packageManifestSchema.parse(data);
  return manifest;
};

export default fetchPackageManifest;
