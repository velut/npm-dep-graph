import clsx from "clsx";
import { Package } from "../lib/package";
import PackageExternalLinks from "./PackageExternalLinks";
import PackageInternalLink from "./PackageInternalLink";

const PackageCell = ({ pkg }: { pkg: Package }) => {
  return (
    <div
      className={clsx(
        "border rounded p-2 flex flex-col items-center gap-2",
        "border-stone-200 hover:bg-stone-100",
        "dark:border-stone-700 dark:hover:bg-stone-900"
      )}
    >
      <PackageInternalLink pkg={pkg} />
      <PackageExternalLinks pkg={pkg} />
    </div>
  );
};

export default PackageCell;
