import { Package } from "./package";

const sortPackagesById = (pkgs: Package[]): Package[] => {
  return pkgs.sort((a, b) => a.id.localeCompare(b.id));
};

export default sortPackagesById;
