import { useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { useEffect } from "react";
import { SerializedPackageGraph } from "../lib/package-graph";

export const LoadSigmaGraph = ({
  serializedGraph,
}: {
  serializedGraph: SerializedPackageGraph;
}) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    graph.import(serializedGraph);
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export default LoadSigmaGraph;
