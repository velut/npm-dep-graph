import { GetStaticPropsResult } from "next";
import buildDiagram from "./build-diagram";
import fetchPackages from "./fetch-packages";
import logger from "./logger";
import { Package } from "./package";
import packagesCanonicalRoute from "./packages-canonical-route";
import packagesSlugRoute from "./packages-slug-route";
import parseSlugPackageIds from "./parse-slug-package-ids";

export interface PackagePageProps {
  rootPackages: Package[];
  dependenciesDiagram: string;
  [key: string]: unknown;
}

const log = logger.child({ fn: "getPackagePageStaticProps" });

const getPackagePageStaticProps = async (
  slug: string[]
): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const slugIds = parseSlugPackageIds(slug);
  const { packages: rootPackages } = await fetchPackages(slugIds);
  const originalRoute = packagesSlugRoute(slug);
  const canonicalRoute = packagesCanonicalRoute(rootPackages);
  if (originalRoute !== canonicalRoute) {
    log.info(
      { originalRoute, canonicalRoute },
      "redirecting to canonical route"
    );
    return {
      redirect: {
        destination: `/package/${canonicalRoute}`,
        permanent: false,
      },
    };
  }
  const dependenciesDiagram = buildDiagram(rootPackages);
  return {
    props: {
      rootPackages,
      dependenciesDiagram,
    },
  };
};

export default getPackagePageStaticProps;
