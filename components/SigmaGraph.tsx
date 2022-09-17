import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { useEffect } from "react";

export const LoadGraph = ({
  serializedGraph,
}: {
  serializedGraph: unknown;
}) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    graph.import(serializedGraph as any);
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

const SigmaGraph = ({ graph }: { graph: unknown }) => {
  return (
    <SigmaContainer style={{ height: "1000px", width: "1000px" }}>
      <LoadGraph serializedGraph={graph} />
    </SigmaContainer>
  );
};

export default SigmaGraph;
