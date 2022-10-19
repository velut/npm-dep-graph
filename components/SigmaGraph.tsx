import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { PackagePageProps } from "../lib/get-package-page-static-props";
import LoadSigmaGraph from "./LoadSigmaGraph";

const SigmaGraph = ({
  serializedGraph,
}: Pick<PackagePageProps, "serializedGraph">) => {
  return (
    <SigmaContainer>
      <LoadSigmaGraph serializedGraph={serializedGraph} />
    </SigmaContainer>
  );
};

export default SigmaGraph;
