import Graph from "graphology";
import { SerializedGraph } from "graphology-types";

export interface PackageGraphNodeAttrs {
  pkgType: string;
  id: string;
  name: string;
  version: string;
  label: string;
  size: number;
  color: string;
}

export interface PackageGraphEdgeAttrs {
  type: string;
  size: number;
  color: string;
}

export type PackageGraph = Graph<PackageGraphNodeAttrs, PackageGraphEdgeAttrs>;

export type SerializedPackageGraph = SerializedGraph<
  PackageGraphNodeAttrs,
  PackageGraphEdgeAttrs
>;
