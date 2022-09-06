import { GetStaticPropsResult } from "next";
import buildDiagram from "./build-diagram";
import logger from "./logger";
import { Package } from "./package";
import parseSlugPackageNames from "./parse-slug-package-names";
import resolvePackages from "./resolve-packages";

export interface PackagePageProps {
  packages: Package[];
  dependenciesDiagram: string;
  [key: string]: unknown;
}

const getPackagePageStaticProps = async (
  slug: string[]
): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const log = logger.child({ fn: "getPackagePageStaticProps" });
  const names = parseSlugPackageNames(slug);
  const packages = await resolvePackages(names);
  const originalRoute = slug.join("/");
  const canonicalRoute = packages.map(({ id }) => id).join(",");
  log.info({ slug, names, packages, originalRoute, canonicalRoute });
  if (originalRoute !== canonicalRoute) {
    return {
      redirect: {
        destination: `/package/${canonicalRoute}`,
        permanent: false,
      },
    };
  }
  const dependenciesDiagram = buildDiagram(packages);
  return {
    props: {
      packages,
      dependenciesDiagram,
    },
  };
};

export default getPackagePageStaticProps;
