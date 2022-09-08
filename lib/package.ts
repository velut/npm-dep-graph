export interface Package {
  type: "root" | "dep" | "devDep";
  id: string;
  name: string;
  version: string;
}
