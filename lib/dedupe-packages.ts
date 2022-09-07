import { Package } from "./package";

const dedupePackages = (pkgs: Package[]): Package[] => {
  const seenIds = new Set<string>();
  return pkgs.flatMap((pkg) => {
    const { id } = pkg;
    if (seenIds.has(id)) {
      return [];
    }
    seenIds.add(id);
    return pkg;
  });
};

export default dedupePackages;
