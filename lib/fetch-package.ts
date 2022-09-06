import fetchPackageManifest from "./fetch-package-manifest";
import { Package } from "./package";
import parsePackageId from "./parse-package-id";

const fetchPackage = async (id: string): Promise<Package> => {
  const { name, version } = parsePackageId(id);
  const manifest = await fetchPackageManifest(name, version);
  return {
    id: manifest.id,
    name: manifest.name,
    version: manifest.version,
  };
};

export default fetchPackage;
