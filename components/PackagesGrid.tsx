import { Package } from "../lib/package";
import PackageCell from "./PackageCell";

const PackagesGrid = ({ packages }: { packages: Package[] }) => {
  return (
    <div className="grid grid-cols-1 gap-2">
      {packages.map((pkg) => (
        <PackageCell key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
};

export default PackagesGrid;
