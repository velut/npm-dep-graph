import dedupeById from "./dedupe-by-id";
import fetchPackage from "./fetch-package";
import { Package } from "./package";
import sortById from "./sort-by-id";

const fetchPackages = async (ids: string[]): Promise<Package[]> => {
  const res = await Promise.all(ids.map((id) => fetchPackage(id)));
  const pkgs = res.filter((pkg): pkg is Package => pkg !== undefined);
  return sortById(dedupeById(pkgs));
};

export default fetchPackages;
