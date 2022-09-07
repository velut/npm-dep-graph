import fetchPackageManifest from "./fetch-package-manifest";
import logger from "./logger";
import { Package } from "./package";
import parsePackageId from "./parse-package-id";

const log = logger.child({ fn: "fetchPackage" });

const fetchPackage = async (id: string): Promise<Package | undefined> => {
  try {
    const { name, version } = parsePackageId(id);
    const manifest = await fetchPackageManifest(name, version);
    return {
      id: manifest.id,
      name: manifest.name,
      version: manifest.version,
    };
  } catch (err) {
    log.error({ err });
    return undefined;
  }
};

export default fetchPackage;
