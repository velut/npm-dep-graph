import plur from "plur";
import { PackagePageProps } from "../lib/get-package-page-static-props";
import PackagesGrid from "./PackagesGrid";

const RootPackages = ({
  rootPackages,
}: Pick<PackagePageProps, "rootPackages">) => {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl">
        Requested {plur("Package", rootPackages.length)}
      </h2>

      <PackagesGrid packages={rootPackages} />
    </section>
  );
};

export default RootPackages;
