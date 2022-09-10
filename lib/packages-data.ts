import { Package } from "./package";

export interface PackagesData {
  packages: Record<string, Package>;
  dependencies: Record<string, string[]>;
}
