import { GetStaticPropsResult } from "next";
import buildDiagram from "./build-diagram";
import fetchPackages from "./fetch-packages";
import logger from "./logger";
import packagesCanonicalRoute from "./packages-canonical-route";
import { PackagesData } from "./packages-data";
import packagesSlugRoute from "./packages-slug-route";
import parseSlugPackageIds from "./parse-slug-package-ids";

export interface PackagePageProps {
  packagesData: PackagesData;
  dependenciesDiagram: string;
  [key: string]: unknown;
}

const log = logger.child({ fn: "getPackagePageStaticProps" });

const getPackagePageStaticProps = async (
  slug: string[]
): Promise<GetStaticPropsResult<PackagePageProps>> => {
  const slugIds = parseSlugPackageIds(slug);
  const packagesData = await fetchPackages(slugIds);
  const rootPackages = Object.entries(packagesData.packages).flatMap(
    ([_, pkg]) => {
      if (pkg.type !== "root") {
        return [];
      }
      return pkg;
    }
  );
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
  const dependenciesDiagram = buildDiagram(packagesData);
  return {
    props: {
      packagesData,
      dependenciesDiagram,
    },
  };
};

export default getPackagePageStaticProps;
