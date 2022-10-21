import clsx from "clsx";
import Link from "next/link";
import { Package } from "../lib/package";

const PackageInternalLink = ({ pkg }: { pkg: Package }) => {
  return (
    <Link href={`/package/${pkg.id}`}>
      <a
        className={clsx(
          "underline text-lg p-2",
          "text-blue-700",
          "dark:text-blue-400"
        )}
      >
        {pkg.id}
      </a>
    </Link>
  );
};

export default PackageInternalLink;
