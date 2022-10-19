import fetch from "cross-fetch";
import ExpiryMap from "expiry-map";
import pMemoize from "p-memoize";
import urlJoin from "url-join";
import validateNpmPackageName from "validate-npm-package-name";
import logger from "./logger";
import { PackageManifest, packageManifestSchema } from "./package-manifest";
import registryApi from "./registry-api";

const log = logger.child({ fn: "fetchPackageManifest" });

const cache = new ExpiryMap(parseInt(process.env.REGISTRY_CACHE_TTL!, 10));

const _fetchPackageManifest = async (
  name: string,
  version: string
): Promise<PackageManifest> => {
  if (!validateNpmPackageName(name).validForOldPackages) {
    log.error({ pkgName: name }, "invalid name for package");
    throw new Error(`fetchPackageManifest: invalid name for package: ${name}`);
  }
  if (version === "") {
    log.error({ pkgName: name }, "empty version for package");
    throw new Error(`fetchPackageManifest: empty version for package: ${name}`);
  }
  const res = await fetch(urlJoin(registryApi, name, version));
  const data = await res.json();
  const manifest = packageManifestSchema.parse(data);
  return manifest;
};

const fetchPackageManifest = pMemoize(_fetchPackageManifest, {
  cache,
  cacheKey: (args) => JSON.stringify(args),
});

export default fetchPackageManifest;
