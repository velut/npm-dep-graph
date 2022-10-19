import { useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import Graph from "graphology";
import { useEffect } from "react";
import { PackagePageProps } from "../lib/get-package-page-static-props";

export const LoadSigmaGraph = ({
  serializedGraph,
}: Pick<PackagePageProps, "serializedGraph">) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();
    graph.import(serializedGraph);
    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export default LoadSigmaGraph;
