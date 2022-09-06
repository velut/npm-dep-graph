import { GetStaticPropsResult } from "next";
import buildDiagram from "./build-diagram";
import fetchPackages from "./fetch-packages";
import logger from "./logger";
import { Package } from "./package";
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
  const rootPackages = await fetchPackages(slugIds);
  const originalRoute = slug.join("/");
  const canonicalRoute = rootPackages.map(({ id }) => id).join(",");
  log.info({ slug, slugIds, rootPackages, originalRoute, canonicalRoute });
  if (originalRoute !== canonicalRoute) {
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
