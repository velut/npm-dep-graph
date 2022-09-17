import { GetStaticPropsResult } from "next";
import fetchPackageGraph from "./fetch-package-graph";
import fetchRootPackages from "./fetch-root-packages";
import logger from "./logger";
import { Package } from "./package";
import packagesCanonicalRoute from "./packages-canonical-route";
import packagesSlugRoute from "./packages-slug-route";
import parseSlugPackageIds from "./parse-slug-package-ids";

export interface PackagePageProps {
  rootPackages: Package[];
  [key: string]: unknown;
}

const log = logger.child({ fn: "getPackagePageStaticProps" });

const getPackagePageStaticProps = async (
  slug: string[]
): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const slugIds = parseSlugPackageIds(slug);
  const rootPackages = await fetchRootPackages(slugIds);
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
  const graph = await fetchPackageGraph(rootPackages);
  return {
    props: {
      rootPackages,
      graph: graph.toJSON(),
    },
  };
};

export default getPackagePageStaticProps;
