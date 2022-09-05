import { GetStaticPropsResult } from "next";
import buildDiagram from "./build-diagram";
import parseSlugPackageNames from "./parse-slug-package-names";
import resolvePackages from "./resolve-packages";

export interface PackagePageProps {
  packages: string[];
  diagram: string;
  [key: string]: unknown;
}

const getPackagePageStaticProps = async (
  slug: string[]
): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const names = parseSlugPackageNames(slug);
  const packages = await resolvePackages(names);
  const originalRoute = slug.join("/");
  const canonicalRoute = packages.join(",");
  if (originalRoute !== canonicalRoute) {
    return {
      redirect: {
        destination: `/package/${canonicalRoute}`,
        permanent: false,
      },
    };
  }
  const diagram = buildDiagram(packages);
  return {
    props: {
      packages,
      diagram,
    },
  };
};

export default getPackagePageStaticProps;
