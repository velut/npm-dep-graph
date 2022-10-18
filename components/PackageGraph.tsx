import dynamic from "next/dynamic";
import { SerializedPackageGraph } from "../lib/package-graph";

const SigmaGraph = dynamic(() => import("./SigmaGraph"), {
  ssr: false,
});

const PackageGraph = ({
  serializedGraph,
}: {
  serializedGraph: SerializedPackageGraph;
}) => {
  return (
    <div className="flex justify-center">
      <div className="relative h-96 w-full shadow">
        <SigmaGraph serializedGraph={serializedGraph} />
      </div>
    </div>
  );
};

export default PackageGraph;
