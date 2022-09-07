import fetch from "cross-fetch";
import urlJoin from "url-join";
import validateNpmPackageName from "validate-npm-package-name";
import {
  AbbreviatedPackument,
  abbreviatedPackumentSchema,
} from "./abbreviated-packument";
import logger from "./logger";
import registryApi from "./registry-api";

const log = logger.child({ fn: "fetchAbbreviatedPackument" });

const fetchAbbreviatedPackument = async (
  name: string
): Promise<AbbreviatedPackument> => {
  if (!validateNpmPackageName(name).validForOldPackages) {
    log.error({ name }, "invalid name for package");
    throw new Error(
      `fetchAbbreviatedPackument: invalid name for package: ${name}`
    );
  }
  const res = await fetch(urlJoin(registryApi, name), {
    headers: { Accept: "application/vnd.npm.install-v1+json" },
  });
  const data = await res.json();
  const packument = abbreviatedPackumentSchema.parse(data);
  return packument;
};

export default fetchAbbreviatedPackument;
