import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { SerializedPackageGraph } from "../lib/package-graph";
import LoadSigmaGraph from "./LoadSigmaGraph";

const SigmaGraph = ({
  serializedGraph,
}: {
  serializedGraph: SerializedPackageGraph;
}) => {
  return (
    <SigmaContainer>
      <LoadSigmaGraph serializedGraph={serializedGraph} />
    </SigmaContainer>
  );
};

export default SigmaGraph;
