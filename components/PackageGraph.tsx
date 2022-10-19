import dynamic from "next/dynamic";
import { PackagePageProps } from "../lib/get-package-page-static-props";

const SigmaGraph = dynamic(() => import("./SigmaGraph"), {
  ssr: false,
});

const PackageGraph = ({
  serializedGraph,
}: Pick<PackagePageProps, "serializedGraph">) => {
  return (
    <div className="flex justify-center">
      <div className="relative h-96 w-full shadow">
        <SigmaGraph serializedGraph={serializedGraph} />
      </div>
    </div>
  );
};

export default PackageGraph;
