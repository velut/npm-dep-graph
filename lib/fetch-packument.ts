import fetch from "cross-fetch";
import urlJoin from "url-join";
import validateNpmPackageName from "validate-npm-package-name";
import logger from "./logger";
import { Packument, packumentSchema } from "./packument";
import registryApi from "./registry-api";

const log = logger.child({ fn: "fetchPackument" });

const abbreviatedOrFullPackument =
  "application/vnd.npm.install-v1+json;q=1.0,application/json;q=0.8,*/*";

const fetchPackument = async (name: string): Promise<Packument> => {
  if (!validateNpmPackageName(name).validForOldPackages) {
    log.error({ pkgName: name }, "invalid name for package");
    throw new Error(`fetchPackument: invalid name for package: ${name}`);
  }
  const res = await fetch(urlJoin(registryApi, name), {
    headers: {
      Accept: abbreviatedOrFullPackument,
    },
  });
  const data = await res.json();
  const packument = packumentSchema.parse(data);
  return packument;
};

export default fetchPackument;
