import { Package } from "./package";

const packagesCanonicalRoute = (pkgs: Package[]): string => {
  return pkgs.map(({ id }) => id).join(",");
};

export default packagesCanonicalRoute;
