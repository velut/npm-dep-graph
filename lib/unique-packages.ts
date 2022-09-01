const uniquePackages = (packages: string[]): string[] => {
  return Array.from(new Set(packages));
};

export default uniquePackages;
