import { Package } from "./package";

const dependenciesToPackages = (
  dependencies: Record<string, string>
): Package[] => {
  return Object.entries(dependencies).map(([depName, depVersion]): Package => {
    return {
      type: "dep",
      id: `${depName}@${depVersion}`,
      name: depName,
      version: depVersion,
    };
  });
};

export default dependenciesToPackages;
