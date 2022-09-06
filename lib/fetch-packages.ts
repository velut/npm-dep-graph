import fetchPackage from "./fetch-package";
import logger from "./logger";
import { Package } from "./package";

const log = logger.child({ fn: "fetchPackages" });

const fetchPackages = async (ids: string[]): Promise<Package[]> => {
  const allRes = await Promise.allSettled(ids.map((id) => fetchPackage(id)));
  const seenIds = new Set<string>();
  return allRes
    .flatMap((res) => {
      if (res.status === "rejected") {
        log.error({ err: res.reason });
        return [];
      }
      const pkg = res.value;
      if (seenIds.has(pkg.id)) {
        return [];
      }
      seenIds.add(pkg.id);
      return pkg;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
};

export default fetchPackages;
