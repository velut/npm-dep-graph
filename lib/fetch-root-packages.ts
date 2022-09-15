import pMap, { pMapSkip } from "p-map";
import logger from "./logger";
import { Package } from "./package";
import parsePackageId from "./parse-package-id";
import resolvePackage from "./resolve-package";

const log = logger.child({ fn: "fetchRootPackages" });

const fetchRootPackages = async (ids: string[]): Promise<Package[]> => {
  return pMap(
    ids,
    async (id) => {
      try {
        const { name, version } = parsePackageId(id);
        return {
          type: "root",
          ...(await resolvePackage(name, version)),
        };
      } catch (err) {
        log.error({ err, id });
        return pMapSkip;
      }
    },
    { concurrency: 25 }
  );
};

export default fetchRootPackages;
