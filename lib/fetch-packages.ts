import dedupePackages from "./dedupe-packages";
import fetchPackage from "./fetch-package";
import { Package } from "./package";
import sortPackagesById from "./sort-packages-by-id";

const fetchPackages = async (ids: string[]): Promise<Package[]> => {
  const res = await Promise.all(ids.map((id) => fetchPackage(id)));
  const pkgs = res.filter((pkg): pkg is Package => pkg !== undefined);
  return sortPackagesById(dedupePackages(pkgs));
};

export default fetchPackages;
